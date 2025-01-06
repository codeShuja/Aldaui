import { useState } from 'react'
import { useResizeObserver } from './hooks/useResizeObserver'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'

interface BarChartProps {
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      color: string
    }>
  }
  title: string
  subtitle: string
}

export function BarChart({ data, title, subtitle }: BarChartProps) {
  const [containerRef, { width }] = useResizeObserver<HTMLDivElement>()
  const [hoveredBar, setHoveredBar] = useState<{
    datasetIndex: number
    index: number
    value: number
    label: string
    x: number
    y: number
  } | null>(null)

  const height = 200
  const padding = 20
  const chartHeight = height - padding * 2

  const maxValue = Math.max(
    ...data.datasets.map(dataset =>
      Math.max(...dataset.data.map((_, i) =>
        data.datasets.reduce((sum, d) => sum + d.data[i], 0)
      ))
    )
  )

  const barWidth = width ? (width - padding * 2) / (data.labels.length * data.datasets.length * 1.5) : 0

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="relative" style={{ height: `${height}px` }}>
          {hoveredBar && (
            <div 
              className="absolute z-10 bg-gray-900 text-white px-2 py-1 rounded text-xs transform -translate-x-1/2 -translate-y-full pointer-events-none"
              style={{
                left: `${hoveredBar.x}px`,
                top: `${hoveredBar.y}px`
              }}
            >
              <p className="font-bold">{hoveredBar.value.toLocaleString()}</p>
              <p className="text-gray-300">{data.datasets[hoveredBar.datasetIndex].label}</p>
              <p className="text-gray-300">{hoveredBar.label}</p>
            </div>
          )}

          <svg width={width} height={height}>
            {Array.from({ length: 4 }).map((_, i) => (
              <line
                key={i}
                x1={padding}
                y1={padding + (chartHeight * i) / 3}
                x2={width - padding}
                y2={padding + (chartHeight * i) / 3}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {data.labels.map((label, i) => (
              data.datasets.map((dataset, j) => {
                const x = padding + (width - padding * 2) * (i / data.labels.length) + barWidth * j
                const y = padding + chartHeight * (1 - dataset.data[i] / maxValue)
                const height = chartHeight * (dataset.data[i] / maxValue)

                return (
                  <rect
                    key={`${i}-${j}`}
                    x={x}
                    y={y}
                    width={barWidth * 0.8}
                    height={height}
                    fill={dataset.color}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredBar({
                      datasetIndex: j,
                      index: i,
                      value: dataset.data[i],
                      label,
                      x: x + barWidth * 0.4,
                      y
                    })}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                )
              })
            ))}

            {data.labels.map((label, i) => (
              <text
                key={i}
                x={padding + (width - padding * 2) * (i / data.labels.length) + (barWidth * data.datasets.length) / 2}
                y={height - padding / 3}
                textAnchor="middle"
                className="text-[8px] sm:text-xs text-gray-500"
              >
                {label}
              </text>
            ))}
          </svg>
        </div>

        <div className="flex flex-wrap gap-2 mt-1 justify-center"> 
          {data.datasets.map((dataset, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dataset.color }} />
              <span className="text-[10px] sm:text-xs text-gray-600">{dataset.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
