import { useContext } from 'react'

import { BalanceContext } from '@context/balance'

export function useBalance() {
  return useContext(BalanceContext)
}
