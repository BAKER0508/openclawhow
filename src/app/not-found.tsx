import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-7xl font-extrabold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold text-primary mb-4">
        Page not found
      </h2>
      <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
        The page you are looking for does not exist or may have been moved.
        Try browsing our cases and solutions instead.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          Browse all posts
        </Link>
        <Link
          href="/tags"
          className="inline-block px-6 py-3 border border-gray-300 text-primary font-semibold rounded-lg hover:border-teal hover:text-teal transition-colors"
        >
          Explore tags
        </Link>
      </div>
    </div>
  )
}
