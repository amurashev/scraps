import { useMemo, memo } from 'react'

import { cn } from '@/lib/utils'

function Wrapper({
  position,
  cellSize,
  children,
}: {
  position: [number, number]
  cellSize: number
  children: React.ReactNode
}) {
  const [x = 0, y = 0] = position || []
  return (
    <div
      className="absolute"
      style={{
        left: `${x * cellSize}px`,
        top: `${y * cellSize}px`,
      }}
    >
      {children}
    </div>
  )
}

export default memo(function Roads({
  cellSize,
  roads,
  possibleRoads,
}: {
  roads: [number, number][]
  cellSize: number
  possibleRoads: Record<string, number[][]>
}) {
  const roadsToObject = useMemo(() => {
    const obj: Record<string, boolean> = {}
    roads.forEach((item) => {
      obj[item.join(':')] = true
    })
    return obj
  }, [roads])

  // console.warn('Roads', possibleRoads)

  return (
    <div>
      {roads.map((item) => {
        const [x, y] = item
        const flatPoint = item.join(':')
        const hasTop = Boolean(roadsToObject[[x, y - 1].join(':')])
        const hasBottom = Boolean(roadsToObject[[x, y + 1].join(':')])
        const hasLeft = Boolean(roadsToObject[[x - 1, y].join(':')])
        const hasRight = Boolean(roadsToObject[[x + 1, y].join(':')])

        const isVertical = !hasLeft && !hasRight
        const isHorizontal = !hasTop && !hasBottom

        return (
          <Wrapper key={flatPoint} position={item} cellSize={cellSize}>
            <div
              className={cn('bg-slate-500 border-gray-100', {
                'border-l': !hasLeft,
                'border-r': !hasRight && !hasLeft,
                'border-t': !hasTop && !hasBottom,
                'border-b': !hasBottom,
                'flex items-center justify-center py-[1px] px-[1px]': true,
              })}
              style={{
                width: `${1 * cellSize}px`,
                height: `${1 * cellSize}px`,
              }}
              title={`${x}:${y}`}
            >
              <span
                className={cn({
                  'w-[1px] h-full border-l border-background border-dashed':
                    isVertical,
                  'w-full h-[1px] border-t border-background border-dashed':
                    isHorizontal,
                })}
              />
            </div>
          </Wrapper>
        )
      })}

      {Object.keys(possibleRoads).map((path) => {
        const points = possibleRoads[path]

        return (
          <div key={path}>
            {points.map((point, i) => {
              const nextPoint = points[i + 1]
              const [x1, y1] = point

              const cellCenter = cellSize / 2 - 2

              // if (!nextPoint) {
              //   return null
              // }

              const [x2, y2] = nextPoint || point

              if (x1 === x2) {
                // Vertical line
                return (
                  <div
                    key={`${path}:${x1}:${y1}`}
                    title={`${path}:${x1}:${y1}`}
                    className="absolute w-[4px] h-[4px] bg-red-600 rounded-full"
                    style={{
                      left: `${x1 * cellSize + cellCenter}px`,
                      top: `${y1 * cellSize + cellCenter}px`,
                      // height: `${1 * cellSize}px`,
                    }}
                  />
                )
              }

              if (y1 === y2) {
                // Horizontal line
                return (
                  <div
                    key={`${path}:${x1}:${y1}`}
                    title={`${path}:${x1}:${y1}`}
                    className="absolute h-[4px] w-[4px] bg-red-600 rounded-full"
                    style={{
                      left: `${x1 * cellSize + cellCenter}px`,
                      top: `${y1 * cellSize + cellCenter}px`,
                      // width: `${1 * cellSize}px`,
                    }}
                  />
                )
              }

              return null
            })}
          </div>
        )
      })}
    </div>
  )
})
