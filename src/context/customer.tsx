import { createContext, ReactNode, useEffect, useState } from 'react'
import { customers } from '../../customers.json'
import { api } from '../lib/axios'

export type Colors = {
  background: string
  gray: string
  gray_light: string
  page_background: string
  primary: string
  secondary: string
  text_primary: string
  text_secondary: string
  text_white: string
}

export type Customer = {
  name: string
  document: string
  prefixDisplayName: string
  display_name: string
  email: string
  ib: string
  colors: Colors
  website: string
  logo: {
    dark: string
    white: string
  }
}

type CustomerContextData = {
  customer: Customer
}

type AuthProviderProps = {
  children: ReactNode
}

export const CustomerContext = createContext({} as CustomerContextData)

export function CustomerProvider({ children }: AuthProviderProps) {
  const [customer, setCustomer] = useState<Customer>({} as Customer)
  useEffect(() => {
    const configCustomer =
      customers.find((c) => window.location.host.includes(c.host)) ||
      customers[0]

    api
      .get('/customers', {
        headers: {
          customer: configCustomer.ref,
        },
      })
      .then(({ data }) => {
        api.defaults.headers.common.customer = configCustomer.ref
        setCustomer({
          name: data.customer.name,
          document: data.customer.document,
          prefixDisplayName: data.customer.prefixDisplayName,
          display_name: data.customer.display_name,
          email: data.data.email,
          website: data.data.website,
          ib: data.data.ib,
          logo: {
            dark: data.data.logo.dark,
            white: data.data.logo.white,
          },
          colors: {
            ...data.data.colors,
          },
        })
      })
      .catch(() => {
        setCustomer({} as Customer)
      })
  }, [])

  if (!customer?.name) {
    return null
  }

  return (
    <CustomerContext.Provider value={{ customer }}>
      {children}
    </CustomerContext.Provider>
  )
}
