'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

const sizes = {
  6: 'h-6 w-6',
  8: 'h-8 w-8',
  10: 'h-10 w-10',
  12: 'h-12 w-12',
  14: 'h-14 w-14',
  128: 'h-[128px] w-[128px]',
}

type Props = { size?: keyof typeof sizes; type?: 'square' | 'circle' }

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root> & Props,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & Props
>(({ className, size = 10, type = 'circle', ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex shrink-0 overflow-hidden',
      {
        'rounded-full': type === 'circle',
        'rounded-sm': type === 'square',
      },
      sizes[size],
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
