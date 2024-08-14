export type Message = {
  id: string
  date: number
  text: string
  type: 'text'
  senderId: string
}

export type State = {
  data: Message[]
  areFetched: boolean
}

export type Action =
  | { type: 'addMessage'; payload: Message }
  | { type: 'updateMessage'; payload: Message; id: string }
