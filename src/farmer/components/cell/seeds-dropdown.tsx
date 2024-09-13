import ItemIcon from '../icons'
import { State } from '../../types'

export default function SeedsDropDown({
  possibleSeedsId,
  seeds,
  onClick,
}: {
  possibleSeedsId: string[]
  seeds: State['seeds']
  onClick: (id: string) => void
}) {
  return (
    <div className="p-2">
      <h2 className="font-bold">Seeds</h2>
      <div className="grid grid-cols-2 gap-2 w-full mt-2">
        {possibleSeedsId.map((itemId) => (
          <div
            key={itemId}
            role="button"
            tabIndex={0}
            className="w-16 relative h-16 p-2 border border-border cursor-pointer rounded-sm"
            onClick={() => onClick(itemId)}
          >
            <ItemIcon id={itemId} />
            <div className="flex items-center justify-center absolute bottom-1 text-[10px] shadow-xl shadow-foreground right-1 font-bold bg-background min-w-4 h-4 rounded-full">
              {seeds[itemId] || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
