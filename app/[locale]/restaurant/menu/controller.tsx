'use client'

/* eslint-disable camelcase, no-underscore-dangle */
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'

import {
  RESTAURANT_CATEGORIES_QUERYResult,
  RESTAURANT_PRODUCTS_SHOTS_QUERYResult,
} from '../../../../sanity.types'
import { restaurantOrdersRoute } from '@/constants/routes'
import { postOrder } from '@/lib/endpoints/orders'

import { Products } from './components/products'
import { Categories } from './components/categories'
import { OrderList } from './components/order'
import { PaymentDrawer } from './components/payment-drawer'
import { SuccessScreen } from './components/success-screen'
import { MobileFooter } from './components/mobile-footer'

import { Order } from './types'
import { Separator } from '@/components/ui/separator'

export default function Controller({
  categories,
  products,
}: {
  categories: RESTAURANT_CATEGORIES_QUERYResult
  products: RESTAURANT_PRODUCTS_SHOTS_QUERYResult
}) {
  const router = useRouter()
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]._id
  )
  const [order, setOrder] = useState<Order>({})
  const [isPaymentStep, setIsPaymentStep] = useState(false)
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null)
  const [mobileScreen, setMobileScreen] = useState<'product' | 'order'>(
    'product'
  )

  const categoryProducts = useMemo(
    () => products.filter((item) => item.category?._id === selectedCategoryId),
    [selectedCategoryId, products]
  )

  const productsObject = useMemo(() => {
    const obj: Record<string, RESTAURANT_PRODUCTS_SHOTS_QUERYResult[0]> = {}
    products.forEach((item) => {
      obj[item._id] = item
    })
    return obj
  }, [products])

  const totalPrice = useMemo(() => {
    return Object.keys(order).reduce((sum, itemId) => {
      const newSum =
        sum + (productsObject[itemId].price || 0) * order[itemId].count
      return newSum
    }, 0)
  }, [order, productsObject])

  const addItem = (itemId: string) => {
    const newItem = order[itemId]
      ? {
          ...order[itemId],
          count: order[itemId].count + 1,
        }
      : { count: 1 }

    setOrder({ ...order, [itemId]: newItem })
  }

  const removeItem = (itemId: string) => {
    setOrder({
      ...order,
      [itemId]: {
        ...order[itemId],
        count: order[itemId].count - 1,
      },
    })
  }

  const createOrder = async (type: 'card' | 'cash') => {
    const newOrder = {
      type: type as string,
      items: Object.keys(order).map((id) => ({
        id,
        count: order[id].count,
      })),
      price: totalPrice,
    }
    setIsPaymentStep(false)
    setOrder({})

    const { data } = await postOrder(newOrder)

    if (data) {
      setSuccessOrderId(data.id)
    }
  }

  const onFinish = () => {
    router.push(restaurantOrdersRoute.getUrl())
  }

  return (
    <div className="w-full h-full md:grid md:grid-cols-12 bg-muted pb-[72px] md:pb-0">
      <div
        className={classNames('md:col-span-8 p-6 ', {
          hidden: mobileScreen !== 'product',
          'md:block': true,
        })}
      >
        <div className="flex flex-col gap-6">
          <Categories
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onClick={(id) => {
              setSelectedCategoryId(id)
            }}
          />
          <Separator />
          <Products
            categoryProducts={categoryProducts}
            onProductClick={(id) => addItem(id)}
          />
        </div>
      </div>
      <div
        className={classNames(
          'col-span-4 p-6 border-0 border-l-[1px] border-border bg-background',
          {
            hidden: mobileScreen !== 'order',
            'md:block': true,
          }
        )}
      >
        <OrderList
          order={order}
          productsObject={productsObject}
          totalPrice={totalPrice}
          onProceedClick={() => setIsPaymentStep(true)}
          onItemAdd={(itemId) => {
            addItem(itemId)
          }}
          onItemDelete={(itemId) => {
            removeItem(itemId)
          }}
          onBackClick={() => setMobileScreen('product')}
        />
      </div>

      <PaymentDrawer
        totalPrice={totalPrice}
        order={order}
        productsObject={productsObject}
        isOpen={isPaymentStep}
        onOpenChange={() => {
          setIsPaymentStep(false)
        }}
        onContinue={createOrder}
      />

      {Boolean(successOrderId) && (
        <SuccessScreen
          orderNumber={successOrderId as string}
          onFinishClick={() => onFinish()}
        />
      )}

      <div className="md:hidden">
        <MobileFooter
          totalPrice={totalPrice}
          onShowDetails={() => setMobileScreen('order')}
        />
      </div>
    </div>
  )
}
