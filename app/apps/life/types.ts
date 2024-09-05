export type State = {
  birthday: Date
  activeCycle: number
  lifeCycle: number
}

export type Action =
  | { type: 'changeDate'; value: Date }
  | { type: 'changeLifeCycle'; value: number }
  | { type: 'changeActiveCycle'; value: number }

export type BarType = 'young' | 'passed' | 'activeLeft' | 'lifeLeft'

export type WeekType = {
  index: number
  date: Date
  type: BarType
  isCurrent: boolean
}
