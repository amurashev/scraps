import { createContext, useContext } from 'react'

type ContextProps = {
  opponent?: {
    id: string
    firstName: string
    lastName: string
    isOnline: boolean
    lastOnlineDate: string
    avatarUrl: string
  }
}

/* istanbul ignore next */
export const MessengerPageContext = createContext<ContextProps>(
  {} as ContextProps
)

/* istanbul ignore next */
export const useMessengerPageContext = (): ContextProps =>
  useContext(MessengerPageContext)
