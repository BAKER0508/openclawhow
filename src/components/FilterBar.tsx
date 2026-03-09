'use client'

interface FilterBarProps {
  activeType: string
  onTypeChange: (type: string) => void
}

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Cases', value: 'case' },
  { label: 'Solutions', value: 'scene' },
]

export default function FilterBar({ activeType, onTypeChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onTypeChange(f.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeType === f.value
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
