'use client'

import { useState, useMemo } from 'react'
import PostCard from '@/components/PostCard'
import { Post } from '@/lib/types'
import { useLanguage } from '@/lib/i18n'

const difficultyFilters = [
  { value: 'all', key: 'difficultyAll' },
  { value: 'low', key: 'difficultyLow' },
  { value: 'medium', key: 'difficultyMedium' },
  { value: 'high', key: 'difficultyHigh' },
]

const targetFilters = [
  { value: 'all', key: 'targetAll' },
  { value: 'solo', key: 'targetSolo' },
  { value: 'small-team', key: 'targetSmallTeam' },
  { value: 'enterprise', key: 'targetEnterprise' },
]

export default function IndustryPageClient({ posts }: { posts: Post[] }) {
  const { t } = useLanguage()
  const [activeDifficulty, setActiveDifficulty] = useState('all')
  const [activeTarget, setActiveTarget] = useState('all')

  const filtered = useMemo(() => {
    let result = posts
    if (activeDifficulty !== 'all') {
      result = result.filter((p) => p.difficulty === activeDifficulty)
    }
    if (activeTarget !== 'all') {
      result = result.filter((p) => p.targetAudience === activeTarget)
    }
    return result
  }, [posts, activeDifficulty, activeTarget])

  return (
    <>
      {/* Quick Filters */}
      <div className="mb-8 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-sm font-bold text-primary mb-3">{t('quickFilters')}</h3>
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="text-xs font-semibold text-gray-500 block mb-2">{t('difficulty')}</span>
            <div className="flex gap-1.5 flex-wrap">
              {difficultyFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveDifficulty(f.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeDifficulty === f.value
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {t(f.key)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-500 block mb-2">{t('target')}</span>
            <div className="flex gap-1.5 flex-wrap">
              {targetFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveTarget(f.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeTarget === f.value
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {t(f.key)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          {t('noPostsIndustry')}
        </p>
      )}
    </>
  )
}
