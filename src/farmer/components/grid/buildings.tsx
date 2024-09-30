import Farm from '../buildings/farm'
import Warehouse from '../buildings/warehouse'
import Shop from '../buildings/shop'

import { cn } from '@/lib/utils'

import buildings from '../../data/buildings'
import {
  Farm as FarmType,
  SimpleBuilding,
  Warehouse as WarehouseType,
} from '../../types/buildings'
import Wrapper from './wrapper'

import TownIcon from '../../icons/buildings/town'
import House1Icon from '../../icons/buildings/house1'
import House2Icon from '../../icons/buildings/house2'
import House3Icon from '../../icons/buildings/house3'
import House4Icon from '../../icons/buildings/house4'

const houseTypes = {
  '1': <House1Icon size="65%" />,
  '2': <House2Icon size="65%" />,
  '3': <House3Icon size="65%" />,
  '4': <House4Icon size="65%" />,
}

export default function Buildings({
  farms,
  warehouses,
  simpleBuildings,
  cellSize,
  day,
  onWarehouseClick,
  onFarmClick,
  onShopClick,
}: {
  farms: FarmType[]
  warehouses: WarehouseType[]
  simpleBuildings: SimpleBuilding[]
  cellSize: number
  day: number
  onWarehouseClick: (id: string) => void
  onFarmClick: (id: string) => void
  onShopClick: (id: string) => void
}) {
  return (
    <>
      {farms.map((item) => (
        <Wrapper
          key={item.id}
          position={item.position}
          cellSize={cellSize}
          size={buildings.farm.size}
        >
          <Farm day={day} farm={item} onClick={() => onFarmClick(item.id)} />
        </Wrapper>
      ))}
      {warehouses.map((item) => (
        <Wrapper
          key={item.id}
          position={item.position}
          cellSize={cellSize}
          size={buildings.warehouse.size}
        >
          <Warehouse item={item} onClick={() => onWarehouseClick(item.id)} />
        </Wrapper>
      ))}

      {simpleBuildings.map((item) => {
        let iconSize = 3

        if (item.type === 'hall') iconSize = buildings.hall.size
        if (item.type === 'shop') iconSize = buildings.hall.size
        if (item.type === 'house') iconSize = buildings.house.size

        return (
          <Wrapper
            key={item.id}
            position={item.position}
            cellSize={cellSize}
            size={iconSize}
          >
            {item.type === 'shop' ? (
              <Shop onClick={() => onShopClick(item.id)} />
            ) : (
              <div
                className={cn(
                  'w-full h-full flex items-center justify-center relative focus-visible:outline-none',
                  {
                    'border border-gray-400/30 rounded-sm bg-[#c6c6bf]': true,
                  }
                )}
              >
                {item.type === 'hall' && <TownIcon size="65%" />}
                {item.type === 'house' &&
                  houseTypes[
                    item.subType?.toString() as keyof typeof houseTypes
                  ]}
              </div>
            )}
          </Wrapper>
        )
      })}
    </>
  )
}
