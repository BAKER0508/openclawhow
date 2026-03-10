import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about OpenClaw How - a community-driven platform showcasing real-world AI agent cases and solutions.',
}

export default function AboutPage() {
  const posts = getAllPosts()
  const caseCount = posts.filter((p) => p.type === 'case').length
  const sceneCount = posts.filter((p) => p.type === 'scene').length
  const industryCount = new Set(posts.map((p) => p.industry)).size
  const tagCount = new Set(posts.flatMap((p) => p.tags)).size

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6">
        About OpenClaw How
      </h1>

      <div className="prose max-w-none mb-12">
        <p>
          <strong>OpenClaw How</strong> is a community-driven platform that
          collects and showcases real-world cases and ready-to-use scene
          solutions built with OpenClaw AI agents. We believe the best way to
          learn is from real examples with real numbers.
        </p>
      </div>

      {/* By the Numbers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">By the Numbers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-accent">{caseCount}</span>
            <p className="text-sm text-gray-500 mt-1">Case Studies</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-teal">{sceneCount}</span>
            <p className="text-sm text-gray-500 mt-1">Solutions</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-primary">{industryCount}</span>
            <p className="text-sm text-gray-500 mt-1">Industries</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-primary">{tagCount}</span>
            <p className="text-sm text-gray-500 mt-1">Topics</p>
          </div>
        </div>
      </section>

      {/* What You Will Find */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">What You Will Find Here</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
              <span className="text-accent font-bold text-lg">C</span>
            </div>
            <h3 className="font-bold text-primary mb-2">Case Studies</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Real stories from makers who used OpenClaw to automate workflows,
              build SaaS products, grow social media, and generate revenue. Each
              case includes income data, replicability ratings, and the tools used.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-3">
              <span className="text-teal font-bold text-lg">S</span>
            </div>
            <h3 className="font-bold text-primary mb-2">Scene Solutions</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ready-to-deploy blueprints for common business scenarios like
              customer service automation, content creation workflows, and
              developer tool integrations.
            </p>
          </div>
        </div>
      </section>

      {/* How We Source Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">How We Source Content</h2>
        <div className="bg-white rounded-xl p-8 border border-gray-100">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Discovery</h3>
                <p className="text-sm text-gray-600">
                  We scan community forums, social media, indie hacker platforms,
                  and open-source projects for real-world OpenClaw success stories.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Verification</h3>
                <p className="text-sm text-gray-600">
                  Every case is verified for accuracy. We cross-reference income
                  claims, check tool usage, and confirm the workflow is real and
                  reproducible.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Write-Up</h3>
                <p className="text-sm text-gray-600">
                  Cases are written up with clear structure: the business model,
                  automation pipeline, tools used, results, and a replicability
                  rating so you know what to expect.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Community Review</h3>
                <p className="text-sm text-gray-600">
                  Published cases are open for community feedback. Readers can
                  suggest corrections, share their own results, or add follow-up
                  context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Your Story */}
      <section className="mb-12">
        <div className="bg-primary rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Submit Your Story</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">
            Have a success story or a useful workflow? We would love to feature
            it. Help the community learn from your experience.
          </p>
          <a
            href="https://github.com/openclaw/openclawhow/issues/new?template=submit-case.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-colors"
          >
            Submit via GitHub
          </a>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">Contact</h2>
        <div className="prose max-w-none">
          <p>
            Reach out on{' '}
            <a
              href="https://x.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              Twitter / X
            </a>{' '}
            or open an issue on{' '}
            <a
              href="https://github.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
