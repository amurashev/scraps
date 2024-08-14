'use client'

import { useReducer } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import defaultState from './controller/state'
import reducer from './controller/reducers/index'
import SwitchField from '../components/switch-field'

export default function SettingsNotificationPage() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const { communication, marketing } = state

  const saveValues = () => {
    console.warn('saveValues', state)
  }

  return (
    <div className="w-full h-full px-4 py-4 space-y-4">
      <div className="">
        <h2 className="font-bold text-2xl">Notifications</h2>
      </div>
      <Separator />

      <div className="space-y-3">
        <h2 className="font-bold text-xl">Email Notifications</h2>

        <div className="space-y-3 max-w-full">
          <div className="space-y-3">
            <SwitchField
              label="Communication emails"
              description="Receive emails about your account activity."
              checked={communication}
              onChange={(value) => {
                dispatch({ type: 'changeValue', index: 'communication', value })
              }}
            />
            <Separator />
            <SwitchField
              label="Marketing emails"
              description="Receive emails about new products, features, and more."
              checked={marketing}
              onChange={(value) => {
                dispatch({ type: 'changeValue', index: 'marketing', value })
              }}
            />
          </div>
        </div>
        <Button onClick={saveValues}>Save</Button>
      </div>
    </div>
  )
}
