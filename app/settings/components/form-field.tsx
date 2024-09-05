'use client'

import { Label } from '@/components/ui/label'

export default function FormField({
  label,
  htmlFor,
  description,
  children,
  errorMessage,
}: {
  label: string
  htmlFor: string
  description?: string
  errorMessage?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {errorMessage ? (
        <p className="text-destructive text-xs">{errorMessage}</p>
      ) : (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </div>
  )
}
