'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SwitchField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="space-x-1 flex w-full items-center">
      <div className="flex-grow">
        <Label htmlFor="email">{label}</Label>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>

      <Switch checked={checked} onCheckedChange={(e) => onChange(e)} />
    </div>
  )
}
