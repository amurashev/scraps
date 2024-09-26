import { memo } from 'react'

import { SimpleBuilding } from '../types/buildings'

import TownIcon from '../icons/buildings/town'
import ShopIcon from '../icons/buildings/shop'
import House1Icon from '../icons/buildings/house1'
import House2Icon from '../icons/buildings/house2'
import House3Icon from '../icons/buildings/house3'
import House4Icon from '../icons/buildings/house4'

import { cn } from '@/lib/utils'

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

export default memo(function SimpleBuildings({
  buildings,
  cellSize,
  onShopClick,
}: {
  cellSize: number
  buildings: SimpleBuilding[]
  onShopClick: () => void
}) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0">
      {buildings.map((item) => {
        let iconSize = 3

        if (item.type === 'hall') iconSize = 3
        if (item.type === 'shop') iconSize = 3
        return (
          <Wrapper key={item.id} position={item.position} cellSize={cellSize}>
            <div
              style={{
                width: `${iconSize * cellSize}px`,
                height: `${iconSize * cellSize}px`,
              }}
            >
              {item.type === 'shop' ? (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Shop"
                  className={cn(
                    'w-full h-full flex items-center justify-center relative p-3 focus-visible:outline-none',
                    {
                      'border border-gray-400/30 rounded-sm': true,
                      'bg-[#c6c6bf]': true,
                      'hover:bg-[#c5c4b4] cursor-pointer': true,
                    }
                  )}
                  onClick={() => {
                    onShopClick()
                  }}
                >
                  <ShopIcon />
                </div>
              ) : (
                <div
                  className={cn(
                    'w-full h-full flex items-center justify-center relative p-3 focus-visible:outline-none',
                    {
                      'border border-gray-400/30 rounded-sm': true,
                      'bg-[#c6c6bf]': true,
                      // 'hover:bg-[#c5c4b4] cursor-pointer': true,
                    }
                  )}
                >
                  {item.type === 'hall' && <TownIcon />}
                  {item.type === 'house' && item.subType === 1 && (
                    <House1Icon />
                  )}
                  {item.type === 'house' && item.subType === 2 && (
                    <House2Icon />
                  )}
                  {item.type === 'house' && item.subType === 3 && (
                    <House3Icon />
                  )}
                  {item.type === 'house' && item.subType === 4 && (
                    <House4Icon />
                  )}
                </div>
              )}
            </div>
          </Wrapper>
        )
      })}
    </div>
  )
})
