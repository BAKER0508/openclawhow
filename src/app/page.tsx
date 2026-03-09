'use client'

import { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard'
import FilterBar from '@/components/FilterBar'
import { Post } from '@/lib/types'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [activeType, setActiveType] = useState('all')

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  const filtered =
    activeType === 'all' ? posts : posts.filter((p) => p.type === activeType)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3">
          Real Cases & Solutions
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          See how people use OpenClaw to automate workflows, build products, and
          grow revenue. Find a solution for your scenario.
        </p>
      </section>

      <FilterBar activeType={activeType} onTypeChange={setActiveType} />

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
  )
}
