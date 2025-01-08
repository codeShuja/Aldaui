import { useState, useEffect } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  const [isEven, setIsEven] = useState(true)
  const [lastTenCounts, setLastTenCounts] = useState<number[]>([])

  useEffect(() => {
    setIsEven(count % 2 === 0)
    setLastTenCounts((prev) => {
      const newCounts = [count, ...prev]
      return newCounts.slice(0, 10)
    })
  }, [count])

  const increment = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const decrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  const reset = () => {
    setCount(0)
    setLastTenCounts([])
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Count: {count}
      </h2>
      <p className="text-lg mb-4 text-gray-300">
        The number is {isEven ? 'even' : 'odd'}
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Decrement
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Increment
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2 text-white">Last 10 Counts:</h3>
        <ul className="list-disc list-inside text-gray-300">
          {lastTenCounts.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

