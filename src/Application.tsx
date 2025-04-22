import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '@/styles/global'

import { AppRoutes } from '@/routes'
import { useCustomer } from '@hooks/customer'

import { AuthProvider } from '@context/auth'
import { BalanceProvider } from '@context/balance'
import { NotificationProvider } from '@context/notification'
import { useEffect } from 'react'

export function Application() {
  const { customer } = useCustomer()

  const changeFavicon = (icon: string) => {
    const link = document.querySelector('link[rel="icon"]')

    if (link) {
      link.setAttribute('href', `/${icon}`)
    }
  }

  useEffect(() => {
    if (customer?.display_name === 'VF BANK DIGITAL') {
      changeFavicon('vfbank.png')
    } else if (customer?.display_name === 'AtivoBanking') {
      changeFavicon('ativobanking.png')
    } else if (customer?.display_name === 'AllBank Invest') {
      changeFavicon('allbankinvest.png')
    } else {
      changeFavicon('vite.svg')
    }
  }, [customer])

  return (
    <>
      <ThemeProvider theme={customer.colors}>
        <AuthProvider>
          <BalanceProvider>
            <NotificationProvider>
              <AppRoutes />
              <GlobalStyle />
            </NotificationProvider>
          </BalanceProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
