'use client'

import * as ToastPrimitives from '@radix-ui/react-toast'

import { cn } from '@/lib/utils'

import { useToast } from '../../hooks/use-toast'

import { ProductIcon } from '../cards/product'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastPrimitives.Provider>
      {toasts.map(function ({ id, additional = {}, messageType, ...props }) {
        return (
          <ToastPrimitives.Toast
            key={id}
            {...props}
            className={cn(
              'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-2 px-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
              'border bg-background text-foreground'
            )}
          >
            {messageType === 'productMovedToWarehouse' && (
              <div className="flex gap-2 items-center">
                {additional.productId && (
                  <div className="w-4 h-4">
                    <ProductIcon id={additional.productId} />
                  </div>
                )}

                <div>
                  {additional.productName && (
                    <div className="text-base">
                      <strong className="font-bold">
                        {additional.productName} x{additional.productCount}
                      </strong>{' '}
                      is placed to{' '}
                      <strong className="font-bold">
                        {additional.warehouseName}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            )}
            <ToastPrimitives.Close
              className={cn(
                'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600'
              )}
            />
          </ToastPrimitives.Toast>
        )
      })}
      <ToastPrimitives.Viewport className="fixed top-0 z-[100] flex max-h-screen flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] space-y-2 w-auto" />
    </ToastPrimitives.Provider>
  )
}
