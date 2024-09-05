import { Button } from '@/components/ui/button'

export function MobileFooter({
  totalPrice,
  onShowDetails,
}: {
  totalPrice: number
  onShowDetails: () => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
      <div className="text-lg font-bold flex w-full gap-3 items-center">
        <div className="flex-grow flex justify-between">
          <span>Total:</span>
          <span>{totalPrice} $</span>
        </div>
        <Button onClick={onShowDetails}>Details</Button>
      </div>
    </div>
  )
}
