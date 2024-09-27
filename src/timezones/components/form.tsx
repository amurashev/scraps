'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const hours = Array.from({ length: 24 }, (_, i) => i)

function FormSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[86px] font-bold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-[110px]">
        <SelectGroup>
          {hours.map((item) => (
            <SelectItem value={item.toString()}>{`${item}:00`}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function Form({
  start,
  end,
  onChangeTime,
}: {
  start: string
  end: string
  onChangeTime: (key: 'start' | 'end', value: string) => void
}) {
  return (
    <div className="space-x-2 flex items-center justify-end">
      <div className="font-bold">Time:</div>
      <FormSelect value={start} onChange={(v) => onChangeTime('start', v)} />
      <FormSelect value={end} onChange={(v) => onChangeTime('end', v)} />
    </div>
  )
}
