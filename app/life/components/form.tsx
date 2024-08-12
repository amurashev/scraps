'use client'

import { DatePicker } from '@/components/ui/date-picker'
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

      <div className="space-y-2 flex flex-col flex-1 gap-1">
        <Label htmlFor="password">Expected life expectancy</Label>
        <div>
          <div className="flex items-center h-[24px]">
            <Slider
              id="lifeCycle"
              defaultValue={[lifeCycle]}
              max={100}
              min={18}
              step={1}
              onValueCommit={(value) => onChangeLifeCycle(value[0])}
            />
          </div>
          <div className="flex justify-between">
            <span className="font-bold">18</span>
            <span className="font-bold">100</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 flex flex-col flex-1">
        <Label htmlFor="password">Expected number of active years</Label>
        <div>
          <div className="flex items-center h-[24px]">
            <Slider
              id="lifeCycle"
              defaultValue={[activeCycle]}
              max={100}
              min={18}
              step={1}
              onValueCommit={(value) => onChangeActiveCycle(value[0])}
            />
          </div>
          <div className="flex justify-between">
            <span className="font-bold">18</span>
            <span className="font-bold">100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
