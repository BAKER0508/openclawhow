export default function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
      {/* Header skeleton */}
      <div className="h-10 bg-gray-200 rounded w-80 mb-3" />
      <div className="h-5 bg-gray-200 rounded w-96 mb-8" />

      {/* Filter bar skeleton */}
      <div className="flex gap-3 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 bg-gray-200 rounded-full w-24" />
        ))}
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 border border-gray-100"
          >
            <div className="flex gap-2 mb-4">
              <div className="h-5 bg-gray-200 rounded-full w-20" />
              <div className="h-5 bg-gray-200 rounded-full w-16" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-full mb-2" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-full mb-2" />
            <div className="h-4 bg-gray-100 rounded w-5/6 mb-4" />
            <div className="flex gap-2">
              <div className="h-5 bg-gray-100 rounded-full w-14" />
              <div className="h-5 bg-gray-100 rounded-full w-14" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
