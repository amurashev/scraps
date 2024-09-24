import buildings from '../data/buildings'
import { Point } from '../types/grid'

import { Warehouse } from '../types/buildings'

export const getWarehouseRoadPoint = (point: Warehouse['position']): Point => {
  const [x, y] = point
  const warehouseSize = buildings.warehouse.size

  return [x + 1, y + warehouseSize]
}
