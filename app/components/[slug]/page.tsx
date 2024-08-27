'use client'

import { Separator } from '@/components/ui/separator'

export default function Page() {
  return (
    <div className="w-full h-full px-4 py-4 space-y-4">
      <div className="">
        <h2 className="font-bold text-2xl">Profile</h2>
      </div>
      <Separator />
      <div className="max-w-96"></div>
    </div>
  )
}
