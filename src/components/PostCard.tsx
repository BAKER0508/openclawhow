import Link from 'next/link'
import { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  const isCase = post.type === 'case'
  const tagColor = isCase ? 'bg-accent' : 'bg-teal'
  const tagLabel = isCase ? 'Case' : 'Solution'

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`${tagColor} text-white text-xs font-medium px-2.5 py-1 rounded-full`}
          >
            {tagLabel}
          </span>
          <span className="text-xs text-gray-400">{post.industry}</span>
        </div>

        <h2 className="font-bold text-lg text-primary leading-snug mb-2 line-clamp-2">
          {post.title}
        </h2>

        {post.income && (
          <div className="mb-3">
            <span className="text-2xl font-extrabold text-accent">
              ${post.income.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1">/mo</span>
          </div>
        )}

        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          {post.person && (
            <span className="text-xs text-gray-500">{post.person}</span>
          )}
          <div className="flex gap-1.5 flex-wrap">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
