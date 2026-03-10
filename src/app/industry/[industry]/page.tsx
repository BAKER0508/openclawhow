import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface Props {
  params: { industry: string }
}

const industryInfo: Record<string, { name: string; description: string }> = {
  ecommerce: {
    name: 'E-commerce',
    description:
      'Discover how online sellers and e-commerce businesses use OpenClaw to automate customer service, manage social media, optimize listings, and scale their operations with AI agents.',
  },
  saas: {
    name: 'SaaS',
    description:
      'See how SaaS founders and developers leverage OpenClaw to build products faster, automate internal workflows, and deliver more value to their customers through AI-powered features.',
  },
  content: {
    name: 'Content',
    description:
      'Learn how content creators and media teams use OpenClaw to streamline writing, research, editing, and publishing workflows across multiple platforms.',
  },
  marketing: {
    name: 'Marketing',
    description:
      'Explore how marketing teams and agencies use OpenClaw to automate campaigns, generate creative content, analyze performance data, and scale their outreach efforts.',
  },
  education: {
    name: 'Education',
    description:
      'See how educators and ed-tech companies use OpenClaw to create personalized learning experiences, automate tutoring, and build intelligent educational tools.',
  },
  'real-estate': {
    name: 'Real Estate',
    description:
      'Discover how real estate professionals use OpenClaw to automate lead qualification, property descriptions, market analysis, and client communications.',
  },
  legal: {
    name: 'Legal',
    description:
      'Learn how legal professionals use OpenClaw to automate document review, research, contract drafting, and compliance workflows.',
  },
  hr: {
    name: 'HR',
    description:
      'Explore how HR teams use OpenClaw to streamline recruiting, onboarding, employee engagement, and administrative processes with AI agents.',
  },
  finance: {
    name: 'Finance',
    description:
      'See how finance professionals use OpenClaw to automate reporting, data analysis, compliance checks, and client communications.',
  },
  'data-analysis': {
    name: 'Data Analysis',
    description:
      'Discover how data teams and analysts use OpenClaw to accelerate data processing, visualization, reporting, and insight generation.',
  },
  'developer-tools': {
    name: 'Developer Tools',
    description:
      'Explore how developers use OpenClaw to build and automate developer tooling, code generation, testing, and DevOps workflows.',
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
  const description =
    info?.description ||
    `Browse all OpenClaw How cases and solutions in the ${name} industry.`

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
        <p className="text-gray-600 leading-relaxed max-w-3xl mb-6">
          {description}
        </p>

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

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          No posts found for this industry yet.
        </p>
      )}
    </div>
  )
}
