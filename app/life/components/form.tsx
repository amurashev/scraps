'use client'

import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const Form = ({
  date,
  lifeCycle,
  activeCycle,
  onChangeDate,
  onChangeActiveCycle,
  onChangeLifeCycle,
}: {
  date: Date
  activeCycle: number
  lifeCycle: number
  onChangeDate: (value: Date) => void
  onChangeLifeCycle: (value: number) => void
  onChangeActiveCycle: (value: number) => void
}) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="space-y-2 flex flex-col flex-1">
        <Label htmlFor="password">Date of Birth</Label>
        <DatePicker
          value={date}
          onChange={onChangeDate}
          fromYear={1950}
          toYear={2016}
        />
      </div>

      <div className="space-y-2 flex flex-col flex-1">
        <Label htmlFor="password">Expected life expectancy</Label>
        <div className="flex items-center h-[40px]">
          <Slider
            defaultValue={[lifeCycle]}
            max={100}
            step={1}
            onValueChange={(value) => onChangeLifeCycle(value[0])}
          />
        </div>
      </div>

      <div className="space-y-2 flex flex-col flex-1">
        <Label htmlFor="password">Expected number of active years</Label>
        <div className="flex items-center h-[40px]">
          <Slider
            defaultValue={[activeCycle]}
            max={100}
            step={1}
            onValueChange={(value) => onChangeActiveCycle(value[0])}
          />
        </div>
      </div>
    </div>
  )
}

export default Form
