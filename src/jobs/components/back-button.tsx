import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="default"
      className="space-x-2"
    >
      <ChevronLeft />
      <span>Back to list</span>
    </Button>
  )
}
