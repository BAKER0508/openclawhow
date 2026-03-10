'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Post } from '@/lib/types'
import { useLanguage, getIndustryTranslationKey } from '@/lib/i18n'

export default function PostCard({ post }: { post: Post }) {
  const isCase = post.type === 'case'
  const { lang, t } = useLanguage()
  const tagColor = isCase ? 'bg-accent' : 'bg-teal'
  const tagLabel = isCase ? t('caseStudy') : t('sceneSolution')
  const router = useRouter()

  const displayTitle = lang === 'zh' && post.titleZh ? post.titleZh : post.title
  const industryKey = getIndustryTranslationKey(post.industry)
  const displayIndustry = t(industryKey)

  return (
    <article
      onClick={() => router.push(`/posts/${post.slug}`)}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full flex flex-col cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`${tagColor} text-white text-xs font-medium px-2.5 py-1 rounded-full`}
        >
          {tagLabel}
        </span>
        <span className="text-xs text-gray-400">{displayIndustry}</span>
      </div>

      <h2 className="font-bold text-lg text-primary leading-snug mb-2 line-clamp-2">
        {displayTitle}
      </h2>

      {post.income && post.income > 0 && (
        <div className="mb-3">
          <span className="text-2xl font-extrabold text-accent">
            ${post.income.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 ml-1">{t('perMonth')}</span>
        </div>
      )}

      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
        {lang === 'zh' && post.excerptZh ? post.excerptZh : post.excerpt}
      </p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        {post.person && (
          <span className="text-xs text-gray-500">{post.person}</span>
        )}
        <div className="flex gap-1.5 flex-wrap">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-teal/10 hover:text-teal transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
