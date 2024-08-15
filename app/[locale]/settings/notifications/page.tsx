'use client'

import { Separator } from '@/components/ui/separator'

import Form from './components/form'

export default function SettingsNotificationPage() {
  const defaultState = {
    communication: true,
    marketing: false,
  }

  return (
    <div className="w-full h-full px-4 py-4 space-y-4">
      <div className="">
        <h2 className="font-bold text-2xl">Notifications</h2>
      </div>
      <Separator />

      <Form
        communication={defaultState.communication}
        marketing={defaultState.marketing}
      />
    </div>
  )
}
