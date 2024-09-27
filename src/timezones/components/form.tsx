'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

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
  isSamePosition,
  onChangeTime,
  onChangePositionParam,
}: {
  start: string
  end: string
  isSamePosition: boolean
  onChangeTime: (key: 'start' | 'end', value: string) => void
  onChangePositionParam: (value: boolean) => void
}) {
  return (
    <div className="space-x-6 flex items-center justify-end">
      <div className="flex items-center space-x-2">
        <div className="font-bold">Same position:</div>
        <Switch
          checked={isSamePosition}
          onCheckedChange={(e) => onChangePositionParam(e)}
        />
      </div>
      <div className="space-x-2 flex items-center">
        <div className="font-bold">Time:</div>
        <FormSelect value={start} onChange={(v) => onChangeTime('start', v)} />
        <FormSelect value={end} onChange={(v) => onChangeTime('end', v)} />
      </div>
    </div>
  )
}
