import { createContext, useContext } from 'react'

type ContextProps = {
  actualUser?: {
    id: string
  }
}

/* istanbul ignore next */
export const MessengerPageContext = createContext<ContextProps>(
  {} as ContextProps
)

/* istanbul ignore next */
export const useMessengerPageContext = (): ContextProps =>
  useContext(MessengerPageContext)
