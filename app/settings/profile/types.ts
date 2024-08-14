export type State = {
  username: string
  email: string
}

export type Action =
  | { type: 'changeName'; value: string }
  | { type: 'changeEmail'; value: string }
