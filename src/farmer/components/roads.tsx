import { useMemo, memo } from 'react'

import { cn } from '@/lib/utils'
import { Point } from '../types/grid'

function Wrapper({
  position,
  cellSize,
  children,
}: {
  position: number[]
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
  mode = 'regular',
  onRoadClick,
}: {
  roads: number[][]
  cellSize: number
  mode: 'regular' | 'edit'
  onRoadClick: (point: Point) => void
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

        const borderLeft = !hasLeft && (hasTop || hasBottom)
        const borderTop = !hasTop && (hasLeft || hasRight)
        const borderRight = !hasRight && (hasTop || hasBottom)
        const borderBottom = !hasBottom && (hasLeft || hasRight)

        return (
          <Wrapper key={flatPoint} position={item} cellSize={cellSize}>
            <div
              role="button"
              aria-label="Road"
              tabIndex={0}
              className={cn('bg-slate-500 border-gray-100', {
                'border-l': borderLeft,
                'border-r': borderRight,
                'border-t': borderTop,
                'border-b': borderBottom,
                'hover:bg-red-500': mode === 'edit',
                'flex items-center justify-center py-[1px] px-[1px]': true,
              })}
              style={{
                width: `${1 * cellSize}px`,
                height: `${1 * cellSize}px`,
              }}
              title={`${x}:${y}`}
              onClick={() => onRoadClick(item)}
            >
              <span
                className={cn({
                  'w-[1px] h-full border-l border-background border-dashed':
                    isVertical && !isHorizontal,
                  'w-full h-[1px] border-t border-background border-dashed':
                    isHorizontal && !isVertical,
                  'w-[1px] h-[1px] border-t border-background border-dashed':
                    (!isHorizontal && !isVertical) ||
                    (isHorizontal && isVertical),
                })}
              />
            </div>
          </Wrapper>
        )
      })}
    </div>
  )
})
