import { cn } from '@/lib/utils'

import { useAppSelector, useAppDispatch } from '../hooks/redux'

import RoadIcon from '../icons/buildings/road'
import FarmIcon from '../icons/buildings/farm'
import WarehouseIcon from '../icons/buildings/warehouse'

import { toggleEditModeForItem } from '../slices/editMode'

function MenuButton({
  title,
  isActive,
  children,
  onClick,
}: {
  title: string
  isActive: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      className={cn(
        'bg-primary/20 w-[48px] h-[48px] p-2 rounded-md cursor-pointer flex items-center justify-center',
        {
          'bg-primary/20': !isActive,
          'bg-blue-600/40': isActive,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function EditPanel() {
  const dispatch = useAppDispatch()
  const { createItem } = useAppSelector((state) => state.editMode)

  return (
    <div className="flex flex-col justify-center items-center relative p-3 space-y-2">
      <MenuButton
        title="Roads"
        isActive={createItem === 'road'}
        onClick={() => dispatch(toggleEditModeForItem('road'))}
      >
        <RoadIcon size={38} fill="#333333" />
      </MenuButton>

      <MenuButton
        title="Warehouse"
        isActive={createItem === 'warehouse'}
        onClick={() => dispatch(toggleEditModeForItem('warehouse'))}
      >
        <WarehouseIcon size={38} />
      </MenuButton>

      <MenuButton
        title="Farm"
        isActive={createItem === 'farm'}
        onClick={() => dispatch(toggleEditModeForItem('farm'))}
      >
        <FarmIcon size={38} />
      </MenuButton>
    </div>
  )
}
