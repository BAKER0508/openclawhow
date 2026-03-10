#!/usr/bin/env node

/**
 * OpenClaw Auto Content Pipeline
 *
 * Fetches posts from Reddit, Hacker News, Dev.to, and Product Hunt,
 * filters for OpenClaw/AI-related case studies,
 * generates bilingual MDX files with proper frontmatter.
 *
 * Data sources (all free, no API key needed):
 * - Reddit: JSON API (append .json to any URL)
 * - Hacker News: Algolia API (free, no auth)
 * - Dev.to: Public API (free, no auth)
 */

import fs from 'fs'
import path from 'path'

// --- Configuration ---
const CONTENT_DIR = path.join(process.cwd(), 'src/content')
const CASES_DIR = path.join(CONTENT_DIR, 'cases')
const SCENES_DIR = path.join(CONTENT_DIR, 'scenes')
const STATE_FILE = path.join(process.cwd(), 'scripts/.content-state.json')

// Keywords to search for
const KEYWORDS = [
  'openclaw', 'ai agent', 'ai automation', 'chatgpt money',
  'ai side hustle', 'ai freelance', 'ai business', 'making money with ai',
  'ai saas', 'ai tool revenue', 'ai startup revenue', 'gpt business',
  'claude business', 'llm monetize', 'ai agency', 'ai consulting',
  'prompt engineering income', 'ai workflow automation'
]

// OpenAI API for content generation (or compatible API)
const AI_API_URL = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions'
const AI_API_KEY = process.env.OPENAI_API_KEY || ''
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini'

// --- State Management ---
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
    }
  } catch {}
  return { processedUrls: [], lastRun: null }
}

function saveState(state) {
  const dir = path.dirname(STATE_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  // Keep only last 500 URLs to avoid unbounded growth
  state.processedUrls = state.processedUrls.slice(-500)
  state.lastRun = new Date().toISOString()
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

function getExistingSlugs() {
  const slugs = new Set()
  for (const dir of [CASES_DIR, SCENES_DIR]) {
    if (!fs.existsSync(dir)) continue
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.mdx') || f.endsWith('.md')) {
        slugs.add(f.replace(/\.(mdx|md)$/, ''))
      }
    }
  }
  return slugs
}

// --- Data Source Fetchers ---

async function fetchWithTimeout(url, options = {}, timeout = 15000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timer)
    return res
  } catch (e) {
    clearTimeout(timer)
    throw e
  }
}

async function fetchReddit() {
  const subreddits = [
    'SideProject', 'Entrepreneur', 'artificial', 'ChatGPT',
    'OpenAI', 'LocalLLaMA', 'MachineLearning', 'startups'
  ]
  const posts = []

  for (const sub of subreddits) {
    try {
      // Search for AI money-making posts
      const query = encodeURIComponent('ai money OR ai revenue OR ai income OR ai business OR ai agency OR ai freelance')
      const url = `https://www.reddit.com/r/${sub}/search.json?q=${query}&sort=new&t=week&limit=10`
      const res = await fetchWithTimeout(url, {
        headers: { 'User-Agent': 'OpenClawBot/1.0' }
      })

      if (!res.ok) continue
      const data = await res.json()

      for (const child of (data?.data?.children || [])) {
        const d = child.data
        if (!d || d.score < 5) continue // Minimum quality threshold

        posts.push({
          source: 'reddit',
          sourceUrl: `https://reddit.com${d.permalink}`,
          title: d.title,
          body: d.selftext || '',
          score: d.score,
          subreddit: d.subreddit,
          author: d.author,
          created: new Date(d.created_utc * 1000).toISOString(),
        })
      }

      // Rate limit: wait 2s between subreddits
      await new Promise(r => setTimeout(r, 2000))
    } catch (e) {
      console.log(`Reddit r/${sub} fetch failed: ${e.message}`)
    }
  }

  return posts
}

async function fetchHackerNews() {
  const posts = []
  const queries = ['ai business', 'ai revenue', 'ai side project', 'making money ai', 'ai agency']

  for (const query of queries) {
    try {
      const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story&numericFilters=points>10&hitsPerPage=10`
      const res = await fetchWithTimeout(url)
      if (!res.ok) continue
      const data = await res.json()

      for (const hit of (data?.hits || [])) {
        posts.push({
          source: 'hackernews',
          sourceUrl: `https://news.ycombinator.com/item?id=${hit.objectID}`,
          title: hit.title || '',
          body: hit.story_text || '',
          score: hit.points,
          author: hit.author,
          created: hit.created_at,
        })
      }

      await new Promise(r => setTimeout(r, 1000))
    } catch (e) {
      console.log(`HN fetch failed: ${e.message}`)
    }
  }

  return posts
}

async function fetchDevTo() {
  const posts = []
  try {
    const url = 'https://dev.to/api/articles?tag=ai&top=7&per_page=20'
    const res = await fetchWithTimeout(url)
    if (!res.ok) return posts
    const articles = await res.json()

    for (const article of articles) {
      if (article.positive_reactions_count < 10) continue

      // Fetch full article body
      try {
        const fullRes = await fetchWithTimeout(`https://dev.to/api/articles/${article.id}`)
        const full = await fullRes.json()

        posts.push({
          source: 'devto',
          sourceUrl: article.url,
          title: article.title,
          body: full.body_markdown || article.description || '',
          score: article.positive_reactions_count,
          author: article.user?.username || '',
          created: article.published_at,
          tags: article.tag_list || [],
        })
      } catch {}

      await new Promise(r => setTimeout(r, 500))
    }
  } catch (e) {
    console.log(`Dev.to fetch failed: ${e.message}`)
  }

  return posts
}

// --- AI Content Filter & Generator ---

async function callAI(messages, temperature = 0.7) {
  if (!AI_API_KEY) {
    console.log('No AI API key configured, skipping AI processing')
    return null
  }

  try {
    const res = await fetchWithTimeout(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages,
        temperature,
        max_tokens: 4000,
      }),
    }, 60000)

    if (!res.ok) {
      console.log(`AI API error: ${res.status}`)
      return null
    }

    const data = await res.json()
    return data.choices?.[0]?.message?.content || null
  } catch (e) {
    console.log(`AI call failed: ${e.message}`)
    return null
  }
}

async function filterAndScore(post) {
  const prompt = `Analyze this post and determine if it describes a real, specific case of someone making money or solving a business problem using AI tools (ChatGPT, Claude, AI agents, automation, etc.).

Title: ${post.title}
Body (first 1000 chars): ${(post.body || '').slice(0, 1000)}
Source: ${post.source} (score: ${post.score})

Respond in JSON only:
{
  "relevant": true/false,
  "type": "case" or "scene",
  "confidence": 0-100,
  "reason": "brief reason",
  "estimatedIncome": number or null,
  "industry": "one of: ecommerce, marketing, education, finance, healthcare, legal, saas, consulting, freelance, content-creation, automation, customer-service, hr, real-estate, other",
  "difficulty": "low" or "medium" or "high"
}`

  const result = await callAI([
    { role: 'system', content: 'You are a content curator for openclawhow.com, a site collecting real-world AI money-making cases. Be strict: only mark as relevant if the post describes a specific, real case with concrete details (not just discussion or opinions). Respond in valid JSON only.' },
    { role: 'user', content: prompt },
  ], 0.3)

  if (!result) return null

  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonStr = result.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  } catch {
    console.log('Failed to parse AI filter response')
    return null
  }
}

async function generateMDX(post, analysis) {
  const prompt = `Based on this community post, write a detailed bilingual case study article for openclawhow.com.

Original post:
Title: ${post.title}
Body: ${(post.body || '').slice(0, 3000)}
Source: ${post.source} (${post.sourceUrl})
Author: ${post.author}

Analysis: ${JSON.stringify(analysis)}

Generate the COMPLETE content in this exact format:

---FRONTMATTER---
title: "English title (compelling, specific, include numbers if possible)"
titleZh: "Chinese title"
excerptZh: "Chinese excerpt (1-2 sentences)"
type: "${analysis.type}"
tool: "openclaw"
industry: "${analysis.industry}"
${analysis.estimatedIncome ? `income: ${analysis.estimatedIncome}` : ''}
person: "${post.author || 'Anonymous'}"
source: "${post.sourceUrl}"
date: "${new Date().toISOString().split('T')[0]}"
replicability: 3
tags: [relevant tags]
difficulty: "${analysis.difficulty}"
model: "service"
targetAudience: "solo"
sourceType: "public-post"
verified: false
---END FRONTMATTER---

---ENGLISH CONTENT---
## Background
(2-3 paragraphs about the person and context)

## What Was Built
(2-3 paragraphs about the specific solution)

## Results & Revenue
(concrete numbers, growth trajectory)

## Key Takeaways
(actionable insights for readers wanting to replicate)
---END ENGLISH---

---CHINESE CONTENT---
(Full Chinese translation of the above, same structure with ## headings)
---END CHINESE---

Rules:
- Be factual, based on the source material
- Add reasonable detail but don't fabricate specific numbers not in the source
- If income isn't mentioned, estimate conservatively or omit
- Make it compelling but honest
- Chinese should be natural, not machine-translated`

  const result = await callAI([
    { role: 'system', content: 'You are a professional bilingual content writer for openclawhow.com. Write detailed, engaging case studies based on real community posts. Always maintain factual accuracy.' },
    { role: 'user', content: prompt },
  ], 0.7)

  return result
}

function parseMDXOutput(aiOutput) {
  if (!aiOutput) return null

  try {
    // Extract frontmatter
    const fmMatch = aiOutput.match(/---FRONTMATTER---\n([\s\S]*?)---END FRONTMATTER---/)
    const enMatch = aiOutput.match(/---ENGLISH CONTENT---\n([\s\S]*?)---END ENGLISH---/)
    const zhMatch = aiOutput.match(/---CHINESE CONTENT---\n([\s\S]*?)---END CHINESE---/)

    if (!fmMatch || !enMatch) return null

    const frontmatter = fmMatch[1].trim()
    const englishContent = enMatch[1].trim()
    const chineseContent = zhMatch ? zhMatch[1].trim() : ''

    // Build the MDX file
    let mdx = `---\n${frontmatter}\n---\n\n${englishContent}`

    if (chineseContent) {
      mdx += `\n\n<!-- zh -->\n\n${chineseContent}`
    }

    // Extract title for slug generation
    const titleMatch = frontmatter.match(/title:\s*"([^"]*)"/)
    const title = titleMatch ? titleMatch[1] : ''

    // Extract type
    const typeMatch = frontmatter.match(/type:\s*"([^"]*)"/)
    const type = typeMatch ? typeMatch[1] : 'case'

    return { mdx, title, type }
  } catch (e) {
    console.log(`Failed to parse MDX output: ${e.message}`)
    return null
  }
}

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-$/, '')
}

// --- Main Pipeline ---

async function main() {
  console.log('=== OpenClaw Auto Content Pipeline ===')
  console.log(`Time: ${new Date().toISOString()}`)

  const state = loadState()
  const existingSlugs = getExistingSlugs()
  const processedUrls = new Set(state.processedUrls)

  console.log(`\nExisting content: ${existingSlugs.size} articles`)
  console.log(`Previously processed URLs: ${processedUrls.size}`)

  // Step 1: Fetch from all sources
  console.log('\n--- Fetching from sources ---')

  const [redditPosts, hnPosts, devtoPosts] = await Promise.all([
    fetchReddit(),
    fetchHackerNews(),
    fetchDevTo(),
  ])

  const allPosts = [...redditPosts, ...hnPosts, ...devtoPosts]
  console.log(`Fetched: Reddit(${redditPosts.length}) HN(${hnPosts.length}) Dev.to(${devtoPosts.length}) = ${allPosts.length} total`)

  // Step 2: Filter out already processed
  const newPosts = allPosts.filter(p => !processedUrls.has(p.sourceUrl))
  console.log(`New posts to evaluate: ${newPosts.length}`)

  if (newPosts.length === 0) {
    console.log('No new posts to process. Done.')
    saveState(state)
    return
  }

  // Step 3: AI Filter & Score (process top posts by score first)
  console.log('\n--- AI Filtering ---')
  const sortedPosts = newPosts.sort((a, b) => (b.score || 0) - (a.score || 0))
  const toEvaluate = sortedPosts.slice(0, 20) // Max 20 per run to save API costs

  const relevant = []
  for (const post of toEvaluate) {
    state.processedUrls.push(post.sourceUrl)

    const analysis = await filterAndScore(post)
    if (!analysis) continue

    if (analysis.relevant && analysis.confidence >= 60) {
      relevant.push({ post, analysis })
      console.log(`  ✓ [${analysis.confidence}%] ${post.title.slice(0, 60)}...`)
    } else {
      console.log(`  ✗ [${analysis?.confidence || 0}%] ${post.title.slice(0, 60)}...`)
    }

    // Rate limit AI calls
    await new Promise(r => setTimeout(r, 1000))
  }

  console.log(`\nRelevant posts found: ${relevant.length}`)

  if (relevant.length === 0) {
    console.log('No relevant content found this run. Done.')
    saveState(state)
    return
  }

  // Step 4: Generate MDX files (max 5 per run)
  console.log('\n--- Generating MDX ---')
  const toGenerate = relevant.slice(0, 5)
  let generated = 0

  for (const { post, analysis } of toGenerate) {
    console.log(`\nGenerating: ${post.title.slice(0, 60)}...`)

    const aiOutput = await generateMDX(post, analysis)
    const parsed = parseMDXOutput(aiOutput)

    if (!parsed) {
      console.log('  Failed to generate/parse MDX')
      continue
    }

    const slug = titleToSlug(parsed.title)
    if (existingSlugs.has(slug)) {
      console.log(`  Slug already exists: ${slug}`)
      continue
    }

    const targetDir = parsed.type === 'scene' ? SCENES_DIR : CASES_DIR
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })

    const filePath = path.join(targetDir, `${slug}.mdx`)
    fs.writeFileSync(filePath, parsed.mdx, 'utf-8')
    existingSlugs.add(slug)
    generated++

    console.log(`  ✓ Created: ${filePath}`)

    await new Promise(r => setTimeout(r, 2000))
  }

  console.log(`\n=== Done: ${generated} new articles created ===`)
  saveState(state)
}

main().catch(e => {
  console.error('Pipeline failed:', e)
  process.exit(1)
})
