import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about OpenClaw How - a community-driven platform showcasing real-world AI agent cases and solutions.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6">
        About OpenClaw How
      </h1>

      <div className="prose max-w-none">
        <p>
          <strong>OpenClaw How</strong> is a community-driven platform that
          collects and showcases real-world cases and ready-to-use scene
          solutions built with OpenClaw AI agents.
        </p>

        <h2>What You Will Find Here</h2>
        <ul>
          <li>
            <strong>Case Studies</strong> &mdash; Real stories from makers who
            used OpenClaw to automate workflows, build SaaS products, grow social
            media, and generate revenue. Each case includes income data,
            replicability ratings, and the tools used.
          </li>
          <li>
            <strong>Scene Solutions</strong> &mdash; Ready-to-deploy blueprints
            for common business scenarios like customer service automation,
            content creation workflows, and developer tool integrations.
          </li>
        </ul>

        <h2>Why We Built This</h2>
        <p>
          The AI agent ecosystem is growing fast, but it can be hard to know
          where to start. We believe the best way to learn is from real examples.
          Every post on this site is based on a real person&apos;s experience or a
          tested workflow.
        </p>

        <h2>Contributing</h2>
        <p>
          Have a success story or a useful workflow? We would love to feature it.
          Submit your case or solution through our GitHub repository, and help
          the community learn from your experience.
        </p>

        <h2>Contact</h2>
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
    </div>
  )
}
