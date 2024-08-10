'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Form = () => {
  const onSubmit = () => {
    console.warn('onSubmit')
  }

  return (
    <div className="grid gap-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="" />
      </div>

      <Button onClick={onSubmit}>Sign In with Email</Button>
    </div>
  )
}

export default Form
