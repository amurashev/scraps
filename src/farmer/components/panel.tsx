import { useAppSelector } from '../hooks'

import Coin from '../icons/coin'

export default function Panel() {
  const money = useAppSelector((state) => state.money)

  return (
    <div className="flex justify-center items-center relative p-6 space-x-2">
      <div className="bg-primary/20 py-2 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <Coin size={24} />
          <div className="text-xl text-background font-bold">{money}</div>
        </div>
      </div>
    </div>
  )
}
