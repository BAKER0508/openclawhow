'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [search, setSearch] = useState('')

  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold whitespace-nowrap flex items-center gap-2">
          <span className="text-accent">Open</span>
          <span>Claw</span>
          <span className="text-teal text-sm font-normal">How</span>
        </Link>

        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search cases & solutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-teal"
          />
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-teal transition-colors">
            Cases
          </Link>
          <Link href="/about" className="hover:text-teal transition-colors">
            About
          </Link>
          <button className="px-3 py-1 rounded border border-white/30 text-xs hover:bg-white/10 transition-colors">
            EN / ZH
          </button>
        </nav>
      </div>
    </header>
  )
}
