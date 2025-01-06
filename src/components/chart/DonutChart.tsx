import { useState } from 'react'
import { useResizeObserver } from './hooks/useResizeObserver'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'

interface DonutChartProps {
  data: Array<{
    label: string
    value: number
    color: string
  }>
  title: string
  subtitle: string
  centerText: string
  centerSubtext: string
}

export function DonutChart({ data, title, subtitle, centerText, centerSubtext }: DonutChartProps) {
  const [containerRef, { width }] = useResizeObserver<HTMLDivElement>()
  const [hoveredSegment, setHoveredSegment] = useState<{
    label: string
    value: number
    percentage: number
  } | null>(null)

  const height = 200
  const radius = Math.min(width, height) / 3
  const centerX = width / 2
  const centerY = height / 2

  const total = data.reduce((sum, d) => sum + d.value, 0)

  const createArc = (startAngle: number, endAngle: number) => {
    const x1 = centerX + radius * Math.cos(startAngle)
    const y1 = centerY + radius * Math.sin(startAngle)
    const x2 = centerX + radius * Math.cos(endAngle)
    const y2 = centerY + radius * Math.sin(endAngle)

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

    return `
      M ${centerX} ${centerY}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    `
  }

  let currentAngle = -Math.PI / 2

  return (
    <div className="flex justify-center"> 
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div ref={containerRef} className="relative" style={{ height: `${height}px` }}>
            {hoveredSegment && (
              <div 
                className="absolute z-10 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm transform -translate-x-1/2 translate-y-1/2 pointer-events-none"
                style={{
                  left: '50%',
                  bottom: '50%'
                }}
              >
                <p className="font-bold">{hoveredSegment.value.toLocaleString()}</p>
                <p className="text-gray-300">{hoveredSegment.label}</p>
                <p className="text-gray-300">{hoveredSegment.percentage.toFixed(1)}%</p>
              </div>
            )}

            <svg width={width} height={height}>
              {data.map((segment, i) => {
                const angle = (2 * Math.PI * segment.value) / total
                const path = createArc(currentAngle, currentAngle + angle)
                currentAngle += angle

                return (
                  <path
                    key={i}
                    d={path}
                    fill={segment.color}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredSegment({
                      label: segment.label,
                      value: segment.value,
                      percentage: (segment.value / total) * 100
                    })}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                )
              })}

              <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="white" />

              <text
                x={centerX}
                y={centerY - 10}
                textAnchor="middle"
                className="text-2xl font-bold"
              >
                {centerText}
              </text>
              <text
                x={centerX}
                y={centerY + 10}
                textAnchor="middle"
                className="text-sm text-gray-500"
              >
                {centerSubtext}
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {data.map((segment, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="text-sm text-gray-600">{segment.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
