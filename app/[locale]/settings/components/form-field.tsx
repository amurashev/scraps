'use client'

import { Label } from '@/components/ui/label'

export default function FormField({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor="email">{label}</Label>
      {children}
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  )
}
