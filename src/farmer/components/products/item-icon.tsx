import { memo } from 'react'

import Carrot from '../../icons/products/carrot'
import Cabbage from '../../icons/products/cabbage'
import Pumpkin from '../../icons/products/pumpkin'
import Corn from '../../icons/products/corn'

const mapItemIcon = {
  '1': Carrot,
  '2': Cabbage,
  '3': Corn,
  '4': Pumpkin,
}

export default memo(function ItemIcon({
  size = '100%',
  id,
}: {
  id: string
  size?: string
}) {
  const IconComponent = mapItemIcon[id as keyof typeof mapItemIcon]
  return IconComponent ? <IconComponent size={size} /> : <div>null</div>
})
