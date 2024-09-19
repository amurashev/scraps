import { useAppSelector, useAppDispatch } from '../hooks/redux'

import Coin from '../icons/coin'
import TransportsIcon from '../icons/transports'
import ShipmentsIcon from '../icons/shipments'
import { toggleTransportsModal, toggleShipmentModal } from '../slices/ui'

export default function Panel() {
  const dispatch = useAppDispatch()
  const money = useAppSelector((state) => state.money)

  return (
    <div className="flex justify-center items-center relative p-6 space-x-2">
      <div className="bg-primary/20 py-2 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <Coin size={24} />
          <div className="text-xl text-background font-bold">{money}</div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Transport"
        className="bg-primary/20 py-2 px-4 rounded-md cursor-pointer"
        onClick={() => dispatch(toggleTransportsModal())}
      >
        <TransportsIcon size={38} />
      </button>

      <button
        type="button"
        aria-label="Shipment"
        className="bg-primary/20 py-2 px-4 rounded-md cursor-pointer"
        onClick={() => dispatch(toggleShipmentModal())}
      >
        <ShipmentsIcon size={38} />
      </button>
    </div>
  )
}
