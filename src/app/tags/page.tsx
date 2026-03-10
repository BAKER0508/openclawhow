import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'All Tags',
  description:
    'Browse all tags across OpenClaw How cases and solutions. Find content by topic.',
}

// Deterministic color palette for tag badges
const tagColors = [
  { bg: 'bg-accent/15', text: 'text-accent', border: 'border-accent/30' },
  { bg: 'bg-teal/15', text: 'text-teal', border: 'border-teal/30' },
  { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
  { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
  { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
]

function getTagColor(index: number) {
  return tagColors[index % tagColors.length]
}

function getTagSize(count: number, maxCount: number) {
  const ratio = count / maxCount
  if (ratio > 0.7) return 'text-lg px-5 py-2.5'
  if (ratio > 0.4) return 'text-base px-4 py-2'
  return 'text-sm px-3 py-1.5'
}

export default function TagsIndexPage() {
  const posts = getAllPosts()

  const tagCounts: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    }
  }

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])
  const maxCount = sortedTags.length > 0 ? sortedTags[0][1] : 1

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3">
        All Tags
      </h1>
      <p className="text-gray-600 mb-10">
        Browse {sortedTags.length} tags across {posts.length} cases and
        solutions. Larger tags have more posts.
      </p>

      <div className="flex flex-wrap gap-3 items-center">
        {sortedTags.map(([tag, count], index) => {
          const color = getTagColor(index)
          const sizeClass = getTagSize(count, maxCount)
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className={`inline-flex items-center gap-2 ${sizeClass} ${color.bg} ${color.text} border ${color.border} rounded-full font-medium hover:shadow-md hover:scale-105 transition-all duration-200`}
            >
              <span>#{tag}</span>
              <span className="bg-white/60 text-xs px-1.5 py-0.5 rounded-full font-semibold">
                {count}
              </span>
            </Link>
          )
        })}
      </div>

      {sortedTags.length === 0 && (
        <p className="text-center text-gray-400 py-12">No tags found.</p>
      )}
    </div>
  )
}
