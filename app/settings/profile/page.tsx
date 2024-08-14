'use client'

import { useReducer } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import defaultState from './controller/state'
import reducer from './controller/reducers/index'
import FormField from '../components/form-field'

export default function SettingsProfilePage() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const { username, email } = state

  const saveValues = () => {
    console.warn('saveValues', state)
  }

  return (
    <div className="w-full h-full px-4 py-4 space-y-4">
      <div className="">
        <h2 className="font-bold text-2xl">Profile</h2>
      </div>
      <Separator />
      <div className="space-y-3 max-w-96">
        <FormField
          label="User name"
          description="Human-friendly label for your organization, shown in user interfaces"
        >
          <Input
            id="username"
            type="text"
            placeholder="username"
            defaultValue={username}
            onBlur={(e) => {
              dispatch({ type: 'changeName', value: e.target.value })
            }}
          />
        </FormField>

        <FormField
          label="Email"
          description="The email address associated with this account"
        >
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            defaultValue={email}
            onBlur={(e) => {
              dispatch({ type: 'changeName', value: e.target.value })
            }}
          />
        </FormField>

        <Button onClick={saveValues}>Save</Button>
      </div>
    </div>
  )
}
