import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Post } from '@/lib/types'
import IndustryPageClient from './IndustryPageClient'

interface Props {
  params: { industry: string }
}

const industryInfo: Record<string, { name: string; nameZh: string; description: string; descriptionZh: string }> = {
  ecommerce: {
    name: 'E-commerce',
    nameZh: '\u7535\u5546',
    description: 'Discover how online sellers and e-commerce businesses use OpenClaw to automate customer service, manage social media, optimize listings, and scale their operations with AI agents.',
    descriptionZh: '\u4e86\u89e3\u5728\u7ebf\u5356\u5bb6\u548c\u7535\u5546\u4f01\u4e1a\u5982\u4f55\u4f7f\u7528 OpenClaw \u81ea\u52a8\u5316\u5ba2\u670d\u3001\u7ba1\u7406\u793e\u4ea4\u5a92\u4f53\u3001\u4f18\u5316\u5217\u8868\u5e76\u6269\u5c55\u8fd0\u8425\u3002',
  },
  saas: {
    name: 'SaaS',
    nameZh: 'SaaS',
    description: 'See how SaaS founders and developers leverage OpenClaw to build products faster, automate internal workflows, and deliver more value to their customers through AI-powered features.',
    descriptionZh: '\u67e5\u770b SaaS \u521b\u59cb\u4eba\u548c\u5f00\u53d1\u8005\u5982\u4f55\u5229\u7528 OpenClaw \u66f4\u5feb\u5730\u6784\u5efa\u4ea7\u54c1\u3001\u81ea\u52a8\u5316\u5185\u90e8\u5de5\u4f5c\u6d41\u3002',
  },
  content: {
    name: 'Content',
    nameZh: '\u5185\u5bb9\u521b\u4f5c',
    description: 'Learn how content creators and media teams use OpenClaw to streamline writing, research, editing, and publishing workflows across multiple platforms.',
    descriptionZh: '\u4e86\u89e3\u5185\u5bb9\u521b\u4f5c\u8005\u548c\u5a92\u4f53\u56e2\u961f\u5982\u4f55\u4f7f\u7528 OpenClaw \u7b80\u5316\u5199\u4f5c\u3001\u7814\u7a76\u3001\u7f16\u8f91\u548c\u53d1\u5e03\u5de5\u4f5c\u6d41\u3002',
  },
  marketing: {
    name: 'Marketing',
    nameZh: '\u8425\u9500',
    description: 'Explore how marketing teams and agencies use OpenClaw to automate campaigns, generate creative content, analyze performance data, and scale their outreach efforts.',
    descriptionZh: '\u63a2\u7d22\u8425\u9500\u56e2\u961f\u548c\u4ee3\u7406\u5546\u5982\u4f55\u4f7f\u7528 OpenClaw \u81ea\u52a8\u5316\u6d3b\u52a8\u3001\u751f\u6210\u521b\u610f\u5185\u5bb9\u3001\u5206\u6790\u6570\u636e\u5e76\u6269\u5c55\u89e6\u8fbe\u3002',
  },
  education: {
    name: 'Education',
    nameZh: '\u6559\u80b2',
    description: 'See how educators and ed-tech companies use OpenClaw to create personalized learning experiences, automate tutoring, and build intelligent educational tools.',
    descriptionZh: '\u67e5\u770b\u6559\u80b2\u5de5\u4f5c\u8005\u548c\u6559\u80b2\u79d1\u6280\u516c\u53f8\u5982\u4f55\u4f7f\u7528 OpenClaw \u521b\u5efa\u4e2a\u6027\u5316\u5b66\u4e60\u4f53\u9a8c\u3001\u81ea\u52a8\u5316\u8f85\u5bfc\u548c\u6784\u5efa\u667a\u80fd\u6559\u80b2\u5de5\u5177\u3002',
  },
  'real-estate': {
    name: 'Real Estate',
    nameZh: '\u623f\u5730\u4ea7',
    description: 'Discover how real estate professionals use OpenClaw to automate lead qualification, property descriptions, market analysis, and client communications.',
    descriptionZh: '\u4e86\u89e3\u623f\u5730\u4ea7\u4e13\u4e1a\u4eba\u58eb\u5982\u4f55\u4f7f\u7528 OpenClaw \u81ea\u52a8\u5316\u6f5c\u5ba2\u8d44\u8d28\u5ba1\u67e5\u3001\u623f\u4ea7\u63cf\u8ff0\u3001\u5e02\u573a\u5206\u6790\u548c\u5ba2\u6237\u6c9f\u901a\u3002',
  },
  legal: {
    name: 'Legal',
    nameZh: '\u6cd5\u5f8b',
    description: 'Learn how legal professionals use OpenClaw to automate document review, research, contract drafting, and compliance workflows.',
    descriptionZh: '\u4e86\u89e3\u6cd5\u5f8b\u4e13\u4e1a\u4eba\u58eb\u5982\u4f55\u4f7f\u7528 OpenClaw \u81ea\u52a8\u5316\u6587\u4ef6\u5ba1\u67e5\u3001\u7814\u7a76\u3001\u5408\u540c\u8d77\u8349\u548c\u5408\u89c4\u5de5\u4f5c\u6d41\u3002',
  },
  hr: {
    name: 'HR',
    nameZh: '\u4eba\u529b\u8d44\u6e90',
    description: 'Explore how HR teams use OpenClaw to streamline recruiting, onboarding, employee engagement, and administrative processes with AI agents.',
    descriptionZh: '\u63a2\u7d22 HR \u56e2\u961f\u5982\u4f55\u4f7f\u7528 OpenClaw \u7b80\u5316\u62db\u8058\u3001\u5165\u804c\u3001\u5458\u5de5\u53c2\u4e0e\u548c\u884c\u653f\u6d41\u7a0b\u3002',
  },
  finance: {
    name: 'Finance',
    nameZh: '\u91d1\u878d',
    description: 'See how finance professionals use OpenClaw to automate reporting, data analysis, compliance checks, and client communications.',
    descriptionZh: '\u67e5\u770b\u91d1\u878d\u4e13\u4e1a\u4eba\u58eb\u5982\u4f55\u4f7f\u7528 OpenClaw \u81ea\u52a8\u5316\u62a5\u544a\u3001\u6570\u636e\u5206\u6790\u3001\u5408\u89c4\u68c0\u67e5\u548c\u5ba2\u6237\u6c9f\u901a\u3002',
  },
  'data-analysis': {
    name: 'Data Analysis',
    nameZh: '\u6570\u636e\u5206\u6790',
    description: 'Discover how data teams and analysts use OpenClaw to accelerate data processing, visualization, reporting, and insight generation.',
    descriptionZh: '\u4e86\u89e3\u6570\u636e\u56e2\u961f\u548c\u5206\u6790\u5e08\u5982\u4f55\u4f7f\u7528 OpenClaw \u52a0\u901f\u6570\u636e\u5904\u7406\u3001\u53ef\u89c6\u5316\u3001\u62a5\u544a\u548c\u6d1e\u5bdf\u751f\u6210\u3002',
  },
  'developer-tools': {
    name: 'Developer Tools',
    nameZh: '\u5f00\u53d1\u5de5\u5177',
    description: 'Explore how developers use OpenClaw to build and automate developer tooling, code generation, testing, and DevOps workflows.',
    descriptionZh: '\u63a2\u7d22\u5f00\u53d1\u8005\u5982\u4f55\u4f7f\u7528 OpenClaw \u6784\u5efa\u548c\u81ea\u52a8\u5316\u5f00\u53d1\u5de5\u5177\u3001\u4ee3\u7801\u751f\u6210\u3001\u6d4b\u8bd5\u548c DevOps \u5de5\u4f5c\u6d41\u3002',
  },
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const industries = new Set(posts.map((p) => p.industry))
  return Array.from(industries).map((industry) => ({ industry }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = params.industry
  const info = industryInfo[industry]
  const name = info?.name || industry
  return {
    title: `${name} - Industry`,
    description:
      info?.description ||
      `Browse OpenClaw How cases and solutions in the ${name} industry.`,
  }
}

export default function IndustryPage({ params }: Props) {
  const industry = params.industry
  const info = industryInfo[industry]
  const name = info?.name || industry
  const nameZh = info?.nameZh || industry
  const description = info?.description || `Browse all OpenClaw How cases and solutions in the ${name} industry.`
  const descriptionZh = info?.descriptionZh || ''

  const allPosts = getAllPosts()
  const posts = allPosts.filter((p) => p.industry === industry)

  const caseCount = posts.filter((p) => p.type === 'case').length
  const sceneCount = posts.filter((p) => p.type === 'scene').length

  // Collect unique tags and tools across posts in this industry
  const allTags = new Set<string>()
  const allTools = new Set<string>()
  let totalIncome = 0
  let incomeCount = 0
  for (const p of posts) {
    p.tags.forEach((t) => allTags.add(t))
    if (p.tool) allTools.add(p.tool)
    if (p.income) {
      totalIncome += p.income
      incomeCount++
    }
  }

  // Serialize posts for client component (strip content to keep payload small)
  const serializedPosts = posts.map(({ content, contentZh, ...rest }) => rest)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-primary transition-colors mb-4 inline-block"
      >
        &larr; All Posts
      </Link>

      {/* Industry header */}
      <div className="bg-white rounded-xl p-8 mb-8 border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3">
          {name}
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-3xl mb-2">
          {description}
        </p>
        {descriptionZh && (
          <p className="text-gray-500 leading-relaxed max-w-3xl mb-6 text-sm">
            {descriptionZh}
          </p>
        )}

        {/* Stats summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-accent/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-extrabold text-accent">{caseCount}</div>
            <div className="text-xs text-gray-500 mt-1">{caseCount === 1 ? 'Case Study' : 'Case Studies'}</div>
          </div>
          <div className="bg-teal/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-extrabold text-teal">{sceneCount}</div>
            <div className="text-xs text-gray-500 mt-1">{sceneCount === 1 ? 'Solution' : 'Solutions'}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-extrabold text-purple-600">{allTools.size}</div>
            <div className="text-xs text-gray-500 mt-1">{allTools.size === 1 ? 'Tool Used' : 'Tools Used'}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-extrabold text-blue-600">{allTags.size}</div>
            <div className="text-xs text-gray-500 mt-1">Topics Covered</div>
          </div>
        </div>

        {incomeCount > 0 && (
          <p className="text-sm text-gray-500">
            Average reported income: <span className="font-semibold text-accent">${Math.round(totalIncome / incomeCount).toLocaleString()}/mo</span> across {incomeCount} {incomeCount === 1 ? 'case' : 'cases'}
          </p>
        )}
      </div>

      {/* Client component with filters and grid */}
      <IndustryPageClient posts={serializedPosts as Post[]} />
    </div>
  )
}
