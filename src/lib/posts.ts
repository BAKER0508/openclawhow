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
    const excerpt = content.trim().slice(0, 200).replace(/[#*_\n]/g, ' ').trim()

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
      content,
      excerpt,
      excerptZh: data.excerptZh || '',
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
