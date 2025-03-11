import {
  type ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

interface AuthContextValue {
  isBalanceVisible: boolean
  setIsBalanceVisible: Dispatch<SetStateAction<boolean>>
}

export const BalanceContext = createContext({} as AuthContextValue)

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false)

  return (
    <BalanceContext.Provider value={{ isBalanceVisible, setIsBalanceVisible }}>
      {children}
    </BalanceContext.Provider>
  )
}
