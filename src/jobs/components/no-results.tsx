import { Button } from '@/components/ui/button'

export default function NoResult({
  onResetClick,
}: {
  onResetClick: () => void
}) {
  return (
    <div className="flex flex-col w-full justify-center items-center h-[400px] space-y-2">
      <p className="text-muted-foreground text-xl">
        Sorry, we couldn&apos;t find any results.
      </p>
      <Button size="sm" onClick={onResetClick}>
        Reset filter
      </Button>
    </div>
  )
}
