import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ApplyDialog({
  isOpen,
  companyName,
  jobTitle,
  onClose,
  onApply,
}: {
  jobTitle: string
  companyName: string
  isOpen: boolean
  onClose: () => void
  onApply: (text: string) => void
}) {
  const [text, setText] = useState('')

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[525px]"
        onClose={onClose}
        onEscapeKeyDown={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        <DialogHeader>
          <DialogTitle>Apply to {jobTitle}</DialogTitle>
          <DialogDescription>
            Start a conversation with the team at {companyName}. Share something
            about you, what you&apos;re looking for, or why {companyName}
            interests you.
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="space-y-1">
            <Label htmlFor="coverLetter">Cover letter</Label>
            <Textarea
              id="coverLetter"
              rows={8}
              onBlur={(e) => setText(e.target.value)}
              placeholder="Hi! My name is [UserName] and here's a little bit about me and what I'm looking for..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={() => onApply(text)}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
