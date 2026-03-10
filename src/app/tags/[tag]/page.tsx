import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface Props {
  params: { tag: string }
}

// Tag descriptions for SEO - bilingual
const tagDescriptions: Record<string, { en: string; zh: string }> = {
  automation: {
    en: 'Explore cases and solutions using AI-powered automation to streamline workflows, reduce manual tasks, and increase efficiency for businesses of all sizes.',
    zh: '\u63a2\u7d22\u4f7f\u7528 AI \u81ea\u52a8\u5316\u7b80\u5316\u5de5\u4f5c\u6d41\u3001\u51cf\u5c11\u4eba\u5de5\u4efb\u52a1\u3001\u63d0\u9ad8\u5404\u79cd\u89c4\u6a21\u4f01\u4e1a\u6548\u7387\u7684\u6848\u4f8b\u548c\u89e3\u51b3\u65b9\u6848\u3002',
  },
  'customer-service': {
    en: 'Discover how AI agents handle customer inquiries, support tickets, and service automation to deliver faster, more consistent customer experiences.',
    zh: '\u4e86\u89e3 AI \u667a\u80fd\u4f53\u5982\u4f55\u5904\u7406\u5ba2\u6237\u54a8\u8be2\u3001\u5de5\u5355\u548c\u670d\u52a1\u81ea\u52a8\u5316\uff0c\u63d0\u4f9b\u66f4\u5feb\u3001\u66f4\u4e00\u81f4\u7684\u5ba2\u6237\u4f53\u9a8c\u3002',
  },
  'social-media': {
    en: 'Learn how creators and businesses use AI to manage social media accounts, generate content, grow followers, and monetize their online presence.',
    zh: '\u4e86\u89e3\u521b\u4f5c\u8005\u548c\u4f01\u4e1a\u5982\u4f55\u4f7f\u7528 AI \u7ba1\u7406\u793e\u4ea4\u5a92\u4f53\u8d26\u53f7\u3001\u751f\u6210\u5185\u5bb9\u3001\u589e\u52a0\u7c89\u4e1d\u5e76\u5b9e\u73b0\u53d8\u73b0\u3002',
  },
  'content-creation': {
    en: 'Browse content creation workflows powered by AI: blog posts, videos, newsletters, course materials, and more produced at scale with OpenClaw.',
    zh: '\u6d4f\u89c8 AI \u9a71\u52a8\u7684\u5185\u5bb9\u521b\u4f5c\u5de5\u4f5c\u6d41\uff1a\u535a\u5ba2\u3001\u89c6\u9891\u3001\u901a\u8baf\u3001\u8bfe\u7a0b\u6750\u6599\u7b49\u89c4\u6a21\u5316\u751f\u4ea7\u3002',
  },
  saas: {
    en: 'See how indie developers and teams build SaaS products with AI-powered features, from MVP to revenue using OpenClaw agents.',
    zh: '\u67e5\u770b\u72ec\u7acb\u5f00\u53d1\u8005\u548c\u56e2\u961f\u5982\u4f55\u4f7f\u7528 AI \u529f\u80fd\u6784\u5efa SaaS \u4ea7\u54c1\uff0c\u4ece MVP \u5230\u521b\u6536\u3002',
  },
  ecommerce: {
    en: 'Discover e-commerce automation cases: product listing optimization, customer service bots, inventory management, and sales growth strategies.',
    zh: '\u53d1\u73b0\u7535\u5546\u81ea\u52a8\u5316\u6848\u4f8b\uff1a\u4ea7\u54c1\u5217\u8868\u4f18\u5316\u3001\u5ba2\u670d\u673a\u5668\u4eba\u3001\u5e93\u5b58\u7ba1\u7406\u548c\u9500\u552e\u589e\u957f\u7b56\u7565\u3002',
  },
  'data-analysis': {
    en: 'Explore how AI agents process, analyze, and visualize data to generate actionable business insights and automate reporting workflows.',
    zh: '\u63a2\u7d22 AI \u667a\u80fd\u4f53\u5982\u4f55\u5904\u7406\u3001\u5206\u6790\u548c\u53ef\u89c6\u5316\u6570\u636e\uff0c\u751f\u6210\u53ef\u64cd\u4f5c\u7684\u5546\u4e1a\u6d1e\u5bdf\u5e76\u81ea\u52a8\u5316\u62a5\u544a\u5de5\u4f5c\u6d41\u3002',
  },
  'lead-generation': {
    en: 'Find proven methods for using AI to identify, qualify, and nurture leads across various channels for consistent sales pipeline growth.',
    zh: '\u627e\u5230\u4f7f\u7528 AI \u5728\u5404\u6e20\u9053\u8bc6\u522b\u3001\u8d44\u8d28\u5ba1\u67e5\u548c\u57f9\u80b2\u6f5c\u5728\u5ba2\u6237\u7684\u6210\u719f\u65b9\u6cd5\u3002',
  },
  freelance: {
    en: 'Case studies of freelancers using AI tools to deliver more value, serve more clients, and increase their hourly rates through automation.',
    zh: '\u81ea\u7531\u804c\u4e1a\u8005\u4f7f\u7528 AI \u5de5\u5177\u63d0\u4f9b\u66f4\u591a\u4ef7\u503c\u3001\u670d\u52a1\u66f4\u591a\u5ba2\u6237\u5e76\u901a\u8fc7\u81ea\u52a8\u5316\u63d0\u9ad8\u5c0f\u65f6\u8d39\u7387\u7684\u6848\u4f8b\u7814\u7a76\u3002',
  },
  'no-code': {
    en: 'Discover no-code AI automation setups that anyone can build without programming skills, perfect for non-technical entrepreneurs.',
    zh: '\u53d1\u73b0\u65e0\u4ee3\u7801 AI \u81ea\u52a8\u5316\u8bbe\u7f6e\uff0c\u65e0\u9700\u7f16\u7a0b\u6280\u80fd\u5373\u53ef\u642d\u5efa\uff0c\u975e\u5e38\u9002\u5408\u975e\u6280\u672f\u80cc\u666f\u7684\u521b\u4e1a\u8005\u3002',
  },
  marketing: {
    en: 'Marketing automation cases: email campaigns, ad copy generation, SEO optimization, and growth hacking with AI agents.',
    zh: '\u8425\u9500\u81ea\u52a8\u5316\u6848\u4f8b\uff1a\u90ae\u4ef6\u8425\u9500\u3001\u5e7f\u544a\u6587\u6848\u751f\u6210\u3001SEO \u4f18\u5316\u548c AI \u589e\u957f\u9ed1\u5ba2\u3002',
  },
  education: {
    en: 'Educational use cases: AI tutoring, course creation, homework assistance, and personalized learning path generation.',
    zh: '\u6559\u80b2\u7528\u4f8b\uff1aAI \u8f85\u5bfc\u3001\u8bfe\u7a0b\u521b\u5efa\u3001\u4f5c\u4e1a\u8f85\u52a9\u548c\u4e2a\u6027\u5316\u5b66\u4e60\u8def\u5f84\u751f\u6210\u3002',
  },
  workflow: {
    en: 'End-to-end workflow automation examples showing how to connect multiple AI agents for complex business processes.',
    zh: '\u7aef\u5230\u7aef\u5de5\u4f5c\u6d41\u81ea\u52a8\u5316\u793a\u4f8b\uff0c\u5c55\u793a\u5982\u4f55\u8fde\u63a5\u591a\u4e2a AI \u667a\u80fd\u4f53\u5904\u7406\u590d\u6742\u4e1a\u52a1\u6d41\u7a0b\u3002',
  },
  'real-estate': {
    en: 'Real estate AI applications: property descriptions, lead qualification, market analysis, and client follow-up automation.',
    zh: '\u623f\u5730\u4ea7 AI \u5e94\u7528\uff1a\u623f\u4ea7\u63cf\u8ff0\u3001\u6f5c\u5ba2\u8d44\u8d28\u5ba1\u67e5\u3001\u5e02\u573a\u5206\u6790\u548c\u5ba2\u6237\u8ddf\u8fdb\u81ea\u52a8\u5316\u3002',
  },
  finance: {
    en: 'Financial automation with AI: reporting, compliance checks, data reconciliation, and client communication workflows.',
    zh: 'AI \u91d1\u878d\u81ea\u52a8\u5316\uff1a\u62a5\u544a\u3001\u5408\u89c4\u68c0\u67e5\u3001\u6570\u636e\u5bf9\u8d26\u548c\u5ba2\u6237\u6c9f\u901a\u5de5\u4f5c\u6d41\u3002',
  },
  legal: {
    en: 'Legal tech AI solutions: contract review, legal research, document drafting, and compliance workflow automation.',
    zh: '\u6cd5\u5f8b\u79d1\u6280 AI \u89e3\u51b3\u65b9\u6848\uff1a\u5408\u540c\u5ba1\u67e5\u3001\u6cd5\u5f8b\u7814\u7a76\u3001\u6587\u4ef6\u8d77\u8349\u548c\u5408\u89c4\u5de5\u4f5c\u6d41\u81ea\u52a8\u5316\u3002',
  },
  hr: {
    en: 'HR and recruiting automation: resume screening, candidate outreach, onboarding workflows, and employee engagement tools.',
    zh: 'HR \u548c\u62db\u8058\u81ea\u52a8\u5316\uff1a\u7b80\u5386\u7b5b\u9009\u3001\u5019\u9009\u4eba\u8054\u7cfb\u3001\u5165\u804c\u5de5\u4f5c\u6d41\u548c\u5458\u5de5\u53c2\u4e0e\u5de5\u5177\u3002',
  },
  healthcare: {
    en: 'Healthcare AI applications: patient communication, appointment scheduling, medical data processing, and clinical workflow automation.',
    zh: '\u533b\u7597 AI \u5e94\u7528\uff1a\u60a3\u8005\u6c9f\u901a\u3001\u9884\u7ea6\u8c03\u5ea6\u3001\u533b\u7597\u6570\u636e\u5904\u7406\u548c\u4e34\u5e8a\u5de5\u4f5c\u6d41\u81ea\u52a8\u5316\u3002',
  },
  'developer-tools': {
    en: 'AI-powered developer tools and automation: code generation, testing, CI/CD pipelines, and DevOps workflow optimization.',
    zh: 'AI \u9a71\u52a8\u7684\u5f00\u53d1\u8005\u5de5\u5177\u548c\u81ea\u52a8\u5316\uff1a\u4ee3\u7801\u751f\u6210\u3001\u6d4b\u8bd5\u3001CI/CD \u6d41\u6c34\u7ebf\u548c DevOps \u5de5\u4f5c\u6d41\u4f18\u5316\u3002',
  },
  agency: {
    en: 'Agency and service business models using AI to scale client delivery, automate project management, and increase profit margins.',
    zh: '\u4f7f\u7528 AI \u6269\u5c55\u5ba2\u6237\u4ea4\u4ed8\u3001\u81ea\u52a8\u5316\u9879\u76ee\u7ba1\u7406\u548c\u63d0\u9ad8\u5229\u6da6\u7387\u7684\u4ee3\u7406\u548c\u670d\u52a1\u4e1a\u52a1\u6a21\u5f0f\u3002',
  },
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  const desc = tagDescriptions[tag]
  return {
    title: `#${tag} - Tagged Posts`,
    description: desc?.en || `Browse all OpenClaw How cases and solutions tagged with "${tag}".`,
  }
}

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag)
  const allPosts = getAllPosts()
  const posts = allPosts.filter((p) => p.tags.includes(tag))
  const desc = tagDescriptions[tag]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/tags"
        className="text-sm text-gray-500 hover:text-primary transition-colors mb-4 inline-block"
      >
        &larr; All Tags
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">
        <span className="text-teal">#</span>{tag}
      </h1>

      {/* SEO description */}
      {desc && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed mb-1">{desc.en}</p>
          <p className="text-sm text-gray-500 leading-relaxed">{desc.zh}</p>
        </div>
      )}

      <p className="text-gray-600 mb-8">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with &quot;{tag}&quot;
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          No posts found with this tag.
        </p>
      )}
    </div>
  )
}
