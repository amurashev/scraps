'use client'

import { useMemo } from 'react'

import { BarType } from '../types'
import Bar from './bar'

export const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const isAfterDate = (dateA: Date, dateB: Date) => dateA > dateB

const Result = ({
  birthday,
  lifeCycle,
  activeCycle,
}: {
  birthday: Date
  activeCycle: number
  lifeCycle: number
}) => {
  const weeks = useMemo(() => {
    const today = new Date()
    const endActiveCycleData = addDays(birthday, 365 * activeCycle)
    const endLifeDate = addDays(birthday, 365 * lifeCycle)

    const getItemType = (item: Date): BarType => {
      const prevItem = addDays(item, 7)
      if (isAfterDate(today, prevItem)) return 'passed'
      if (isAfterDate(endActiveCycleData, item)) return 'activeLeft'

      return 'lifeLeft'
    }

    return Array.from({
      length: (Number(endLifeDate) - Number(birthday)) / (1000 * 3600 * 24 * 7),
    }).map((_, i) => {
      const date = addDays(birthday, i * 7)
      const nextWeekDate = addDays(birthday, (i + 1) * 7)

      return {
        index: i,
        date,
        type: getItemType(date),
        isCurrent:
          Number(today) > Number(date) && Number(today) < Number(nextWeekDate),
      }
    })
  }, [birthday, activeCycle, lifeCycle])

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold space-y-4">Result</h1>

      <ul className="">
        <li className="flex items-center">
          <Bar type="lightGreen" />
          &nbsp;&ndash;&nbsp;a week of life you&apos;ve already lived
        </li>
        <li className="flex items-center">
          <Bar type="green" />
          &nbsp;&ndash;&nbsp;remaining week of active life
        </li>
        <li className="flex items-center">
          <Bar type="regular" />
          &nbsp;&ndash;&nbsp;remaining week of life
        </li>
      </ul>

      <div className="flex flex-wrap gap-0.5">
        {weeks.map((item, key) => {
          let type: 'regular' | 'lightGreen' | 'green' = 'regular'

          if (item.type === 'passed') {
            type = 'lightGreen'
          }

          if (item.type === 'activeLeft') {
            type = 'green'
          }

          return <Bar key={key} type={type} />
        })}
      </div>
    </div>
  )
}

export default Result
