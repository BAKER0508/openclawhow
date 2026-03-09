import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const isCase = post.type === 'case'
  const tagColor = isCase ? 'bg-accent' : 'bg-teal'
  const tagLabel = isCase ? 'Case Study' : 'Scene Solution'

  // Simple markdown-to-html: handle headings, bold, lists, paragraphs
  const htmlContent = post.content
    .split('\n')
    .map((line) => {
      if (line.startsWith('### '))
        return `<h3>${line.slice(4)}</h3>`
      if (line.startsWith('## '))
        return `<h2>${line.slice(3)}</h2>`
      if (line.startsWith('# '))
        return `<h1>${line.slice(2)}</h1>`
      if (line.startsWith('- '))
        return `<li>${line.slice(2)}</li>`
      if (line.startsWith('> '))
        return `<blockquote>${line.slice(2)}</blockquote>`
      if (line.trim() === '') return '<br/>'
      return `<p>${line}</p>`
    })
    .join('\n')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-primary transition-colors mb-6 inline-block"
      >
        &larr; Back to all posts
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span
          className={`${tagColor} text-white text-xs font-medium px-3 py-1 rounded-full`}
        >
          {tagLabel}
        </span>
        <span className="text-sm text-gray-400">{post.industry}</span>
        <span className="text-sm text-gray-400">{post.date}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 leading-tight">
        {post.title}
      </h1>

      {post.titleZh && (
        <p className="text-lg text-gray-500 mb-6">{post.titleZh}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        {post.income && (
          <div>
            <span className="text-3xl font-extrabold text-accent">
              ${post.income.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1">/mo</span>
          </div>
        )}
        {post.person && (
          <span className="text-sm text-gray-600">by {post.person}</span>
        )}
        {post.replicability && (
          <span className="text-sm text-gray-500">
            Replicability: {post.replicability}/5
          </span>
        )}
      </div>

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {post.source && (
        <div className="mt-6">
          <a
            href={post.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal hover:underline"
          >
            View original source &rarr;
          </a>
        </div>
      )}
    </div>
  )
}
