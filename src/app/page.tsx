'use client'

import { Suspense, useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { Post } from '@/lib/types'

const industries = [
  { label: 'All', value: 'all' },
  { label: 'E-commerce', value: 'ecommerce' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Content', value: 'content' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Education', value: 'education' },
  { label: 'Real Estate', value: 'real-estate' },
  { label: 'Legal', value: 'legal' },
  { label: 'HR', value: 'hr' },
  { label: 'Finance', value: 'finance' },
  { label: 'Data Analysis', value: 'data-analysis' },
  { label: 'Developer Tools', value: 'developer-tools' },
]

const typeFilters = [
  { label: 'All', value: 'all' },
  { label: 'Cases', value: 'case' },
  { label: 'Solutions', value: 'scene' },
]

function HomeContent() {
  const [posts, setPosts] = useState<Post[]>([])
  const [activeType, setActiveType] = useState('all')
  const [activeIndustry, setActiveIndustry] = useState('all')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

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

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return result
  }, [posts, activeType, activeIndustry, searchQuery])

  const caseCount = posts.filter((p) => p.type === 'case').length
  const sceneCount = posts.filter((p) => p.type === 'scene').length
  const industryCount = new Set(posts.map((p) => p.industry)).size

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Discover How People{' '}
            <span className="text-accent">Make Money</span> with{' '}
            <span className="text-teal">OpenClaw</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Real cases, proven solutions, updated daily
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
            <div className="text-center">
              <span className="text-3xl font-extrabold text-accent">{caseCount}+</span>
              <p className="text-sm text-white/60 mt-1">Cases</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-3xl font-extrabold text-teal">{sceneCount}+</span>
              <p className="text-sm text-white/60 mt-1">Solutions</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-3xl font-extrabold text-white">{industryCount}</span>
              <p className="text-sm text-white/60 mt-1">Industries</p>
            </div>
          </div>

          <a
            href="#posts"
            className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-colors text-lg shadow-lg shadow-accent/25"
          >
            Browse Cases &amp; Solutions
          </a>
        </div>
      </section>

      {/* Industry quick-filter chips */}
      <section className="bg-white border-b border-gray-200 sticky top-[64px] z-40">
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
                {ind.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div id="posts" className="max-w-6xl mx-auto px-4 py-10">
        {/* Search indicator */}
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Search results for &quot;{searchQuery}&quot;
            </span>
            <a
              href="/"
              className="text-sm text-accent hover:underline"
            >
              Clear
            </a>
          </div>
        )}

        {/* Type filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
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
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 self-center">
            {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {filtered.length === 0 && posts.length > 0 && (
          <p className="text-center text-gray-400 py-12">
            No posts found for this filter.
          </p>
        )}
      </div>
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
