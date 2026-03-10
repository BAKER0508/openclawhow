import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white/60 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              <span className="text-accent">Open</span>Claw{' '}
              <span className="text-teal text-sm font-normal">How</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Real-world cases and scene solutions for building with OpenClaw AI
              agents.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-teal transition-colors">
                  All Cases
                </Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-teal transition-colors">
                  Browse Tags
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Industries</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/industry/ecommerce" className="hover:text-teal transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/industry/saas" className="hover:text-teal transition-colors">
                  SaaS
                </Link>
              </li>
              <li>
                <Link href="/industry/content" className="hover:text-teal transition-colors">
                  Content
                </Link>
              </li>
              <li>
                <Link href="/industry/marketing" className="hover:text-teal transition-colors">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/openclaw/openclawhow/issues/new?template=submit-case.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  Submit a Case
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} OpenClaw How. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
