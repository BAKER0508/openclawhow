import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import ShareButton from './ShareButton'
import {
  PostTypeLabel,
  PostTitleDisplay,
  PostMetaBar,
  PostSourceLink,
  BackToAllLink,
  RelatedPostLabel,
} from '@/components/PostDetailClient'

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

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function markdownToHtml(content: string): string {
  const lines = content.split('\n')
  const htmlLines: string[] = []
  let inList = false
  let inCodeBlock = false
  let codeContent = ''

  for (const line of lines) {
    // Fenced code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        htmlLines.push(`<pre><code>${codeContent}</code></pre>`)
        codeContent = ''
        inCodeBlock = false
      } else {
        if (inList) {
          htmlLines.push('</ul>')
          inList = false
        }
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeContent +=
        line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;') + '\n'
      continue
    }

    // Close list if the current line is not a list item
    if (inList && !line.startsWith('- ') && !line.startsWith('* ') && !line.match(/^\d+\.\s/)) {
      htmlLines.push('</ul>')
      inList = false
    }

    // Headings
    if (line.startsWith('#### ')) {
      htmlLines.push(`<h4>${applyInline(line.slice(5))}</h4>`)
    } else if (line.startsWith('### ')) {
      htmlLines.push(`<h3>${applyInline(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      htmlLines.push(`<h2>${applyInline(line.slice(3))}</h2>`)
    } else if (line.startsWith('# ')) {
      htmlLines.push(`<h1>${applyInline(line.slice(2))}</h1>`)
    }
    // Blockquote
    else if (line.startsWith('> ')) {
      htmlLines.push(`<blockquote>${applyInline(line.slice(2))}</blockquote>`)
    }
    // Unordered list
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        htmlLines.push('<ul>')
        inList = true
      }
      htmlLines.push(`<li>${applyInline(line.slice(2))}</li>`)
    }
    // Ordered list
    else if (line.match(/^\d+\.\s/)) {
      if (!inList) {
        htmlLines.push('<ul>')
        inList = true
      }
      htmlLines.push(`<li>${applyInline(line.replace(/^\d+\.\s/, ''))}</li>`)
    }
    // Horizontal rule
    else if (line.trim() === '---' || line.trim() === '***') {
      htmlLines.push('<hr/>')
    }
    // Empty line
    else if (line.trim() === '') {
      htmlLines.push('')
    }
    // Paragraph
    else {
      htmlLines.push(`<p>${applyInline(line)}</p>`)
    }
  }

  if (inList) htmlLines.push('</ul>')
  if (inCodeBlock) {
    htmlLines.push(`<pre><code>${codeContent}</code></pre>`)
  }

  return htmlLines.join('\n')
}

function applyInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const isCase = post.type === 'case'
  const tagColor = isCase ? 'bg-accent' : 'bg-teal'

  const readingTime = estimateReadingTime(post.content)
  const htmlContent = markdownToHtml(post.content)

  // Related posts: same industry, excluding current, up to 3
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.industry === post.industry && p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-primary transition-colors mb-6 inline-block"
      >
        <BackToAllLink />
      </Link>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span
          className={`${tagColor} text-white text-xs font-medium px-3 py-1 rounded-full`}
        >
          <PostTypeLabel isCase={isCase} />
        </span>
        <span className="text-sm text-gray-400">{post.industry}</span>
        <span className="text-sm text-gray-400">{post.date}</span>
        <span className="text-sm text-gray-400">{readingTime} min read</span>
      </div>

      <PostTitleDisplay title={post.title} titleZh={post.titleZh} />

      <PostMetaBar
        income={post.income}
        person={post.person}
        replicability={post.replicability}
      />

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-teal/10 hover:text-teal transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Share & source */}
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <ShareButton />
        {post.source && (
          <PostSourceLink source={post.source} />
        )}
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-primary mb-6">
            More from {post.industry}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/posts/${rp.slug}`}
                className="block bg-white rounded-lg p-4 border border-gray-100 hover:border-teal hover:shadow-sm transition-all"
              >
                <span
                  className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${
                    rp.type === 'case'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-teal/10 text-teal'
                  }`}
                >
                  <RelatedPostLabel isCase={rp.type === 'case'} />
                </span>
                <h3 className="text-sm font-semibold text-primary leading-snug line-clamp-2">
                  {rp.title}
                </h3>
                {rp.income && (
                  <p className="text-xs text-accent font-semibold mt-1">
                    ${rp.income.toLocaleString()}/mo
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
