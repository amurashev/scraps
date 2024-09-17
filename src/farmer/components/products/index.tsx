import { memo } from 'react'

import ItemIcon from './item-icon'
import { cn } from '@/lib/utils'

export function ProductItemCount({ count = 0 }: { count: number }) {
  return (
    <div className="flex items-center justify-center absolute bottom-1 text-[10px] shadow-sm shadow-gray-200 right-1 font-bold bg-background min-w-4 px-1 h-4 rounded-sm select-none">
      x{count}
    </div>
  )
}

export default memo(function ProductItem({
  itemId,
  hasRing = false,
  children,
  onClick,
}: {
  itemId: string
  children?: React.ReactNode
  hasRing?: boolean
  onClick?: () => void
}) {
  const isClickable = Boolean(onClick)
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-[64px] h-[64px] relative p-3 bg-muted border border-border rounded-sm',
        {
          'ring ring-primary': hasRing,
          'cursor-pointer': isClickable,
          'cursor-auto': !isClickable,
        }
      )}
    >
      <ItemIcon id={itemId} />
      {children}
    </button>
  )
})
