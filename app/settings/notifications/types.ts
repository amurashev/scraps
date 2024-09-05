export type State = {
  communication: boolean
  marketing: boolean
}

export type Action = { type: 'changeValue'; value: boolean; index: keyof State }
