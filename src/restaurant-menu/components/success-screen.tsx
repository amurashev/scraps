import { Button } from '@/components/ui/button'

export function SuccessScreen({
  orderNumber,
  onFinishClick,
}: {
  orderNumber: string
  onFinishClick: () => void
}) {
  return (
    <div className="bg-green-700 text-background leading-tight text-[40px] text-center absolute top-0 left-0 right-0 bottom-0 z-50 grid items-center justify-center">
      <div>
        <div>Payment is finished!</div>
        <div>
          Your order number is <span className="font-bold">{orderNumber}</span>
        </div>
        <Button
          className="mt-8"
          variant="secondary"
          size="lg"
          onClick={onFinishClick}
        >
          Orders list
        </Button>
      </div>
    </div>
  )
}
