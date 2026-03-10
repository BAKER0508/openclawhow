'use client'

import { Suspense, useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { Post } from '@/lib/types'
import { useLanguage, getIndustryTranslationKey } from '@/lib/i18n'

const industries = [
  { value: 'all', key: 'all' },
  { value: 'ecommerce', key: 'ecommerce' },
  { value: 'saas', key: 'saas' },
  { value: 'content', key: 'content' },
  { value: 'marketing', key: 'marketing' },
  { value: 'education', key: 'education' },
  { value: 'real-estate', key: 'realEstate' },
  { value: 'legal', key: 'legal' },
  { value: 'hr', key: 'hr' },
  { value: 'finance', key: 'finance' },
  { value: 'data-analysis', key: 'dataAnalysis' },
  { value: 'developer-tools', key: 'developerTools' },
]

const typeFilters = [
  { value: 'all', key: 'all' },
  { value: 'case', key: 'filterCases' },
  { value: 'scene', key: 'filterSolutions' },
]

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

function HomeContent() {
  const [posts, setPosts] = useState<Post[]>([])
  const [activeType, setActiveType] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [activeDifficulty, setActiveDifficulty] = useState('all')
  const [activeTarget, setActiveTarget] = useState('all')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const { lang, t } = useLanguage()

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  const filtered = useMemo(() => {
    let result = posts

    if (activeType !== 'all') {
      result = result.filter((p) => p.type === activeType)
    }

    if (activeIndustry !== 'all') {
      result = result.filter((p) => p.industry === activeIndustry)
    }

    if (activeDifficulty !== 'all') {
      result = result.filter((p) => p.difficulty === activeDifficulty)
    }

    if (activeTarget !== 'all') {
      result = result.filter((p) => p.targetAudience === activeTarget)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.titleZh && p.titleZh.toLowerCase().includes(q)) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return result
  }, [posts, activeType, activeIndustry, activeDifficulty, activeTarget, searchQuery])

  const caseCount = posts.filter((p) => p.type === 'case').length
  const sceneCount = posts.filter((p) => p.type === 'scene').length
  const caseIndustries = new Set(posts.filter((p) => p.type === 'case').map((p) => p.industry)).size
  const sceneIndustries = new Set(posts.filter((p) => p.type === 'scene').map((p) => p.industry)).size
  const allIndustrySet = new Set(posts.map((p) => p.industry))
  const industryCount = allIndustrySet.size

  // Latest update date
  const latestDate = posts.length > 0 ? posts[0].date : ''

  // Featured: top 3 highest-income cases
  const featuredCases = useMemo(() => {
    return [...posts]
      .filter((p) => p.type === 'case' && p.income && p.income > 0)
      .sort((a, b) => (b.income || 0) - (a.income || 0))
      .slice(0, 3)
  }, [posts])

  // Latest 3 posts
  const latestPosts = useMemo(() => posts.slice(0, 3), [posts])

  // Quick start: low difficulty posts
  const quickStartPosts = useMemo(() => {
    return posts.filter((p) => p.difficulty === 'low').slice(0, 3)
  }, [posts])

  // Industry grid data
  const industryGridData = useMemo(() => {
    const map: Record<string, number> = {}
    for (const p of posts) {
      map[p.industry] = (map[p.industry] || 0) + 1
    }
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([industry, count]) => ({ industry, count }))
  }, [posts])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            {t('heroSubtitle')}
          </p>

          {/* Stats bar - exact numbers */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-4">
            <div className="text-center">
              <span className="text-3xl font-extrabold text-accent">{caseCount}</span>
              <p className="text-sm text-white/60 mt-1">{t('cases')}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-3xl font-extrabold text-teal">{sceneCount}</span>
              <p className="text-sm text-white/60 mt-1">{t('solutions')}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-3xl font-extrabold text-white">{industryCount}</span>
              <p className="text-sm text-white/60 mt-1">{t('industries')}</p>
            </div>
          </div>
          {latestDate && (
            <p className="text-xs text-white/40 mb-8">{t('lastUpdated')}: {latestDate}</p>
          )}

          <a
            href="#posts"
            className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-colors text-lg shadow-lg shadow-accent/25"
          >
            {t('browseCTA')}
          </a>
        </div>
      </section>

      {/* Two Big Entry Points */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="#posts"
            onClick={() => { setActiveType('case'); setActiveIndustry('all') }}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center cursor-pointer"
          >
            <div className="text-4xl mb-3">{'\ud83d\udd25'}</div>
            <h2 className="text-xl font-bold text-primary mb-2">{t('viewRealCases')}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {caseCount} {t('casesCount')} / {caseIndustries} {t('industriesCount')}
            </p>
            <span className="inline-block px-6 py-2 bg-accent/10 text-accent font-semibold rounded-full text-sm">
              {t('browseCases')}
            </span>
          </a>
          <a
            href="#posts"
            onClick={() => { setActiveType('scene'); setActiveIndustry('all') }}
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 text-center cursor-pointer"
          >
            <div className="text-4xl mb-3">{'\ud83d\udccb'}</div>
            <h2 className="text-xl font-bold text-primary mb-2">{t('findSolutions')}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {sceneCount} {t('solutionsCount')} / {sceneIndustries} {t('industriesCount')}
            </p>
            <span className="inline-block px-6 py-2 bg-teal/10 text-teal font-semibold rounded-full text-sm">
              {t('browseSolutions')}
            </span>
          </a>
        </div>
      </section>

      {/* Featured / Editor's Picks */}
      {featuredCases.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">{t('editorsPicks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCases.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Updates */}
      {latestPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">{t('latestUpdates')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Quick Start - low difficulty */}
      {quickStartPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold text-primary mb-2">{t('quickStart')}</h2>
          <p className="text-sm text-gray-500 mb-6">{t('quickStartDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStartPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Industry Grid */}
      {industryGridData.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">{t('industryGrid')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {industryGridData.map(({ industry, count }) => {
              const key = getIndustryTranslationKey(industry)
              return (
                <Link
                  key={industry}
                  href={`/industry/${industry}`}
                  className="bg-white rounded-lg p-4 border border-gray-100 hover:border-teal hover:shadow-sm transition-all text-center"
                >
                  <div className="font-semibold text-primary text-sm">{t(key)}</div>
                  <div className="text-xs text-gray-400 mt-1">{count} {t('posts')}</div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Industry quick-filter chips (sticky) */}
      <section className="bg-white border-b border-gray-200 sticky top-[64px] z-40 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {industries.map((ind) => (
              <button
                key={ind.value}
                onClick={() => setActiveIndustry(ind.value)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0 ${
                  activeIndustry === ind.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t(ind.key)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content / Filter + Grid */}
      <div id="posts" className="max-w-6xl mx-auto px-4 py-10">
        {/* Search indicator */}
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {t('searchResults')} &quot;{searchQuery}&quot;
            </span>
            <a
              href="/"
              className="text-sm text-accent hover:underline"
            >
              {t('clear')}
            </a>
          </div>
        )}

        {/* Type filter bar */}
        <div className="flex flex-wrap gap-2 mb-4">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveType(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeType === f.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t(f.key)}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 self-center">
            {filtered.length} {filtered.length === 1 ? t('post') : t('posts')}
          </span>
        </div>

        {/* Enhanced filters: Difficulty + Target */}
        <div className="flex flex-wrap gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
          {/* Difficulty filter */}
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
          {/* Target filter */}
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

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {filtered.length === 0 && posts.length > 0 && (
          <p className="text-center text-gray-400 py-12">
            {t('noResults')}
          </p>
        )}
      </div>

      {/* Email Subscription CTA */}
      <section className="bg-primary/5 border-t border-gray-200 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
            {t('subscribeCTA')}
          </h2>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('subscribeEmail')}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-accent"
            />
            <button className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors text-sm whitespace-nowrap">
              {t('subscribeButton')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomeContent />
    </Suspense>
  )
}
