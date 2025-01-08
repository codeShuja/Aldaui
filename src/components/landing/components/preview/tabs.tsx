import { useState } from 'react'

interface TabsProps {
  items: {
    label: string
    value: string
    content: React.ReactNode
  }[]
}

export function Tabs({ items }: TabsProps) {
  const [activeTab, setActiveTab] = useState(items[0].value)

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-800">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === item.value
                  ? 'border-b-2 border-blue-400 text-blue-400'
                  : 'text-gray-400 hover:text-gray-200'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {items.find((item) => item.value === activeTab)?.content}
      </div>
    </div>
  )
}

