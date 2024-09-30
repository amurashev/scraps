import {
  IoCaretBackOutline,
  IoCaretForwardOutline,
  IoCaretDownOutline,
  IoCaretUpOutline,
  IoRemove,
  IoAdd,
  IoPauseSharp,
} from 'react-icons/io5'

import { useAppSelector, useAppDispatch } from '../hooks/redux'

// import Coin from '../icons/coin'
import ShipmentsIcon from '../icons/shipments'
import { toggleShipmentModal } from '../slices/ui'
import { togglePause } from '../slices/time'
import {
  changePointOfView,
  increaseCellSize,
  reduceCellSize,
} from '../slices/grid'
import { cn } from '@/lib/utils'

export default function Panel() {
  const dispatch = useAppDispatch()
  // const money = useAppSelector((state) => state.money)
  const { value, isPaused } = useAppSelector((state) => state.time)

  return (
    <div className="flex justify-center items-center relative p-3 space-x-2">
      {/* <div className="bg-primary/20 py-2 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <Coin size={24} />
          <div className="text-xl text-background font-bold">{money}</div>
        </div>
      </div> */}

      {/* <button
        type="button"
        aria-label="Transport"
        title="Transport"
        className="bg-primary/20 py-2 px-4 rounded-md cursor-pointer"
        onClick={() => dispatch(toggleTransportsModal())}
      >
        <TransportsIcon size={38} />
      </button> */}

      <div className={cn('bg-primary/20 py-2 px-4 rounded-md cursor-pointer')}>
        Day: {value}
      </div>

      <button
        type="button"
        aria-label="Shipment"
        title="Shipment"
        className="bg-primary/20 py-2 px-4 rounded-md cursor-pointer"
        onClick={() => dispatch(toggleShipmentModal())}
      >
        <ShipmentsIcon size={38} />
      </button>

      <button
        type="button"
        aria-label="Left"
        title="Transport"
        className="bg-primary/20 p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(changePointOfView({ side: 'left' }))}
      >
        <IoCaretBackOutline size={38} />
      </button>

      <button
        type="button"
        aria-label="Left"
        title="Transport"
        className="bg-primary/20 p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(changePointOfView({ side: 'right' }))}
      >
        <IoCaretForwardOutline size={38} />
      </button>

      <button
        type="button"
        aria-label="Left"
        title="Transport"
        className="bg-primary/20 p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(changePointOfView({ side: 'bottom' }))}
      >
        <IoCaretDownOutline size={38} />
      </button>
      <button
        type="button"
        aria-label="Left"
        title="Transport"
        className="bg-primary/20 p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(changePointOfView({ side: 'top' }))}
      >
        <IoCaretUpOutline size={38} />
      </button>

      <button
        type="button"
        aria-label="Left"
        title="Transport"
        className="bg-primary/20 p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(increaseCellSize())}
      >
        <IoAdd size={38} />
      </button>
      <button
        type="button"
        aria-label="Left"
        title="Transport"
        className="bg-primary/20 p-2 rounded-md cursor-pointer"
        onClick={() => dispatch(reduceCellSize())}
      >
        <IoRemove size={38} />
      </button>

      <button
        type="button"
        aria-label="Left"
        title="Pause"
        className={cn('bg-primary/20 p-2 rounded-md cursor-pointer', {
          'bg-blue-500/40': isPaused,
        })}
        onClick={() => dispatch(togglePause())}
      >
        <IoPauseSharp size={38} />
      </button>
    </div>
  )
}
