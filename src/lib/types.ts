export interface Post {
  slug: string
  title: string
  titleZh: string
  type: 'case' | 'scene'
  tool: string
  industry: string
  income?: number
  person?: string
  source?: string
  date: string
  replicability?: number
  tags: string[]
  content: string
  excerpt: string
  excerptZh?: string
}
