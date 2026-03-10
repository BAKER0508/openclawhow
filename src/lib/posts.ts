import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from './types'

const contentDir = path.join(process.cwd(), 'src/content')

function getFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath))
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

export function getAllPosts(): Post[] {
  const files = getFilesRecursively(contentDir)
  const posts = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const slug = path.basename(filePath, path.extname(filePath))

    const contentParts = content.split('<!-- zh -->')
    const contentEn = contentParts[0].trim()
    const contentZh = contentParts.length > 1 ? contentParts[1].trim() : ''

    const excerpt = contentEn.slice(0, 200).replace(/[#*_\n]/g, ' ').trim()

    return {
      slug,
      title: data.title || '',
      titleZh: data.titleZh || '',
      type: data.type || 'case',
      tool: data.tool || '',
      industry: data.industry || '',
      income: data.income,
      person: data.person,
      source: data.source,
      date: data.date || '',
      replicability: data.replicability,
      tags: data.tags || [],
      content: contentEn,
      contentZh,
      excerpt,
      excerptZh: data.excerptZh || '',
      // New structured fields
      difficulty: data.difficulty,
      teamSize: data.teamSize,
      timeframe: data.timeframe,
      model: data.model,
      targetAudience: data.targetAudience,
      sourceType: data.sourceType,
      verified: data.verified,
    } as Post
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug)
}
