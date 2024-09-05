/* eslint-disable camelcase, no-underscore-dangle */

import classNames from 'classnames'

import { Card, CardTitle } from '@/components/ui/card'

import { Order } from '../types'

export function OrderItem({
  item,
  isSelected,
  isFinished,
  onClick,
}: {
  item: Order
  isSelected: boolean
  isFinished: boolean
  onClick: () => void
}) {
  const { id } = item || {}

  const fixedId = (id + 10000).toString().slice(-4)

  return (
    <Card
      onClick={!isFinished ? onClick : () => {}}
      className={classNames(
        'flex items-center justify-center w-[100px] h-[100px]',
        {
          'ring ring-2 ring-ring': isSelected,
          'opacity-50': isFinished,
          'cursor-pointer': !isFinished,
        }
      )}
    >
      <CardTitle className="text-3xl font-bold">{fixedId}</CardTitle>
    </Card>
  )
}
