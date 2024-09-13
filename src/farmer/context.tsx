import { createContext, useContext } from 'react'
import { State } from './types'

type ContextProps = State

/* istanbul ignore next */
export const StateContext = createContext<ContextProps>({} as ContextProps)

/* istanbul ignore next */
export const useStateContext = (): ContextProps => useContext(StateContext)
