import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface Props {
  params: { tag: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  return {
    title: `#${tag} - Tagged Posts`,
    description: `Browse all OpenClaw How cases and solutions tagged with "${tag}".`,
  }
}

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag)
  const allPosts = getAllPosts()
  const posts = allPosts.filter((p) => p.tags.includes(tag))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/tags"
        className="text-sm text-gray-500 hover:text-primary transition-colors mb-4 inline-block"
      >
        &larr; All Tags
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">
        <span className="text-teal">#</span>{tag}
      </h1>
      <p className="text-gray-600 mb-8">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with &quot;{tag}&quot;
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          No posts found with this tag.
        </p>
      )}
    </div>
  )
}
