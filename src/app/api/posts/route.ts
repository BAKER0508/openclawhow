import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  // Strip content from list response
  const list = posts.map(({ content, ...rest }) => ({
    ...rest,
  }))
  return NextResponse.json(list)
}
