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
  contentZh?: string
  excerpt: string
  excerptZh?: string
  // New structured fields
  difficulty?: 'low' | 'medium' | 'high'
  teamSize?: string
  timeframe?: string
  model?: string  // business model: service/saas/content/agency/automation
  targetAudience?: string  // solo/small-team/enterprise
  sourceType?: string  // interview/user-submitted/public-post/blog/video
  verified?: boolean
}
