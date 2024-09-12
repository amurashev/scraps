import { cn } from '@/lib/utils'

import Carrot from './icons/carrot'
import Cabbage from './icons/cabbage'
import Pumpkin from './icons/pumpkin'
import Corn from './icons/corn'

import { GridState } from '../types'

const mapItemIcon = {
  '1': <Carrot size={64} />,
  '2': <Cabbage size={64} />,
  '3': <Pumpkin size={52} />,
  '4': <Corn size={58} />,
}

function SmallCell({
  isActive,
  size,
  children,
}: {
  isActive: boolean
  size: number
  children: React.ReactNode
}) {
  return (
    <div
      className={cn('h-full cursor-pointer flex items-center justify-center', {
        'bg-[#92766c] hover:bg-[#92766c]/80': isActive,
        // 'bg-gray-200/40': !isActive,
      })}
      style={{
        width: `${size}%`,
        height: `100%`,
      }}
    >
      {children}
    </div>
  )
}

function BigCell({ isActive, state }: { isActive: boolean; state: GridState }) {
  const rowsArray = [0, 1, 2]
  const size = 100 / rowsArray.length
  const size1 = 300

  return (
    <div
      className={cn('relative border-0 border-gray-300 flex flex-col', {
        'divide-y-8 divide-[#b4937e]': isActive,
        // 'opacity-10': !isActive,
        // 'hover:outline outline-foreground rounded-sm': !isActive
      })}
      style={{
        width: `${size1}px`,
        height: `${size1}px`,
      }}
    >
      {rowsArray.map((row) => (
        <div
          className={cn('w-full flex flex-row', {
            'divide-x-8 divide-[#b4937e]': isActive,
          })}
          style={{
            height: `${size}%`,
          }}
        >
          {rowsArray.map((col) => {
            const cellState = state[`${row},${col}`]

            return (
              <SmallCell key={col} size={size} isActive={isActive}>
                {cellState
                  ? mapItemIcon[cellState.itemId as keyof typeof mapItemIcon]
                  : null}
              </SmallCell>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default function Grid({ state }: { state: GridState }) {
  // const rowsArray = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="flex h-full justify-center items-center relative p-5">
      <div className="flex flex-col divide-y-0 divide-[#b4937e] border-8 border-[#b4937e]">
        {[0].map((row) => (
          <div className="flex flex-row divide-x-0 divide-[#b4937e]">
            {[0].map((col) => (
              <div>
                <BigCell isActive={row === 0 && col === 0} state={state} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
