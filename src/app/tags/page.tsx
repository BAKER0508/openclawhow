import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'All Tags',
  description:
    'Browse all tags across OpenClaw How cases and solutions. Find content by topic.',
}

export default function TagsIndexPage() {
  const posts = getAllPosts()

  // Build a map of tag -> count
  const tagCounts: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    }
  }

  // Sort by count descending
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3">
        All Tags
      </h1>
      <p className="text-gray-600 mb-8">
        Browse {sortedTags.length} tags across all cases and solutions.
      </p>

      <div className="flex flex-wrap gap-3">
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-teal hover:text-teal transition-colors group"
          >
            <span className="text-sm font-medium text-primary group-hover:text-teal transition-colors">
              #{tag}
            </span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {count}
            </span>
          </Link>
        ))}
      </div>

      {sortedTags.length === 0 && (
        <p className="text-center text-gray-400 py-12">No tags found.</p>
      )}
    </div>
  )
}
