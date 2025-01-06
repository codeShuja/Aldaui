import { useState } from 'react'
import { useResizeObserver } from './hooks/useResizeObserver'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'

interface AreaChartProps {
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

export function AreaChart({ data, title, subtitle }: AreaChartProps) {
    const [containerRef, { width }] = useResizeObserver<HTMLDivElement>()
    const [hoveredPoint, setHoveredPoint] = useState<{
      x: number
      y: number
      value: number
      label: string
      datasetLabel: string
    } | null>(null)
  
    const height = 200
    const padding = 20
    const chartHeight = height - padding * 2
  
    const maxValue = Math.max(...data.datasets.flatMap(d => d.data))
  
    const createAreaPath = (dataset: typeof data.datasets[0]) => {
      const points = dataset.data.map((value, i) => ({
        x: padding + (i * (width - padding * 2)) / (data.labels.length - 1),
        y: padding + chartHeight * (1 - value / maxValue)
      }))
  
      const path = `M ${points[0].x},${padding + chartHeight} L ${points[0].x},${points[0].y} ${points.map((p) => `L ${p.x},${p.y}`).join(' ')} L ${points[points.length - 1].x},${padding + chartHeight} Z`
  
      return { path, points }
    }
  
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
          <CardDescription className="text-xs sm:text-sm">{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={containerRef} className="relative" style={{ height: `${height}px` }}>
            {hoveredPoint && (
              <div 
                className="absolute z-10 bg-gray-900 text-white px-2 py-1 rounded text-xs transform -translate-x-1/2 -translate-y-full pointer-events-none"
                style={{
                  left: `${hoveredPoint.x}px`,
                  top: `${hoveredPoint.y}px`
                }}
              >
                <p className="font-bold">{hoveredPoint.value.toLocaleString()}</p>
                <p className="text-gray-300">{hoveredPoint.datasetLabel}</p>
                <p className="text-gray-300">{hoveredPoint.label}</p>
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
  
              {data.datasets.map((dataset) => {
                const { path, points } = createAreaPath(dataset)
                return (
                  <g key={dataset.label}>
                    <path
                      d={path}
                      fill={dataset.color}
                      fillOpacity="0.2"
                      className="transition-all duration-200"
                    />
                    <polyline
                      points={points.map(p => `${p.x},${p.y}`).join(' ')}
                      fill="none"
                      stroke={dataset.color}
                      strokeWidth="1.5"
                    />
                    {points.map((point, j) => (
                      <circle
                        key={j}
                        cx={point.x}
                        cy={point.y}
                        r={3}
                        fill={dataset.color}
                        className="transition-all duration-200 cursor-pointer"
                        onMouseEnter={() => setHoveredPoint({
                          x: point.x,
                          y: point.y,
                          value: dataset.data[j],
                          label: data.labels[j],
                          datasetLabel: dataset.label
                        })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    ))}
                  </g>
                )
              })}
  
              {data.labels.map((label, i) => (
                <text
                  key={i}
                  x={padding + (i * (width - padding * 2)) / (data.labels.length - 1)}
                  y={height - padding / 3}
                  textAnchor="middle"
                  className="text-[8px] sm:text-xs text-gray-500"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>
  
          <div className="flex flex-wrap gap-2 mt-1 justify-center"> {/* Margen reducido */}
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
  
