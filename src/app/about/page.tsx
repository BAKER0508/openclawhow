import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about OpenClaw How - a community-driven platform showcasing real-world AI agent cases and solutions.',
}

export default function AboutPage() {
  const posts = getAllPosts()
  const caseCount = posts.filter((p) => p.type === 'case').length
  const sceneCount = posts.filter((p) => p.type === 'scene').length
  const industryCount = new Set(posts.map((p) => p.industry)).size
  const tagCount = new Set(posts.flatMap((p) => p.tags)).size

  return (
    <AboutContent
      caseCount={caseCount}
      sceneCount={sceneCount}
      industryCount={industryCount}
      tagCount={tagCount}
    />
  )
}
