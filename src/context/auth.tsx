import React, { createContext, useCallback, useEffect, useState } from 'react'

import { api } from '../lib/axios'

import { useCustomer } from '../hooks/customer'

export interface User {
  id: string
  name: string
  document: string
  status: string
  step: string
  email: string
  phone: string
  has_pin?: boolean
  docs?: string | null
}

export interface Account {
  id: string
  balance: number
  bank: string
  agency: string
  number: string
  status: string
}

interface AuthState {
  token: string
  user: User
  account?: Account | null
}

interface SignInCredentials {
  document: string
  password: string
}

export interface AuthContextData {
  user: User
  account?: Account | null
  signIn(credentials: SignInCredentials): Promise<void>
  signInWithToken(token: string): Promise<void>
  signOut(): void
  getUser(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { customer } = useCustomer()

  const KEY_TOKEN = String('@' + customer.display_name + ':token')
    .replace(/\s/g, '')
    .toLowerCase()
  const KEY_USER = String('@' + customer.display_name + ':user')
    .replace(/\s/g, '')
    .toLowerCase()

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(KEY_TOKEN)
    const user = localStorage.getItem(KEY_USER) as string

    if (token && user) {
      const userData = JSON.parse(user)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      getUser()

      return { token, user: userData }
    }

    return {} as AuthState
  })

  const signIn = useCallback(
    async ({ document, password }: SignInCredentials) => {
      const response = await api.post('/users/authenticate', {
        document,
        password,
      })

      const { token, user, accounts } = response.data

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      localStorage.setItem(KEY_TOKEN, token)
      localStorage.setItem(KEY_USER, JSON.stringify(user))

      setData({ token, user, account: accounts?.[0] || null })
    },
    [KEY_TOKEN, KEY_USER],
  )

  const signInWithToken = useCallback(
    async (token: string) => {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      const { data } = await api.get('/users')

      const { data: response } = await api.get('/accounts/selected')

      localStorage.setItem(KEY_TOKEN, token)
      localStorage.setItem(KEY_USER, JSON.stringify(data.user))

      setData({ token, user: data.user, account: response.account || null })
    },
    [KEY_TOKEN, KEY_USER],
  )

  const signOut = useCallback(() => {
    localStorage.removeItem(KEY_TOKEN)
    localStorage.removeItem(KEY_USER)

    setData({} as AuthState)
  }, [KEY_TOKEN, KEY_USER])

  async function getUser() {
    try {
      const { data } = await api.get('/users')
      const { data: response } = await api.get('/accounts/selected')
      if (response?.account) {
        setData((state) => ({
          ...state,
          user: data.user,
          account: response.account,
        }))
      } else {
        setData((state) => ({ ...state, user: data.user, account: null }))
      }
    } catch (err) {
      signOut()
    }
  }

  async function getSelected() {
    try {
      const { data: response } = await api.get('/accounts/selected')
      if (response?.account) {
        setData((state) => ({
          ...state,
          account: response.account,
        }))
      } else {
        setData((state) => ({ ...state, account: null }))
      }
    } catch (err) {
      // signOut()
    }
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (data.user && data.token) {
        getSelected()
      }
    }, 30000)

    return () => {
      clearInterval(intervalo)
    }
  }, [data.user, data.token])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        account: data.account ?? null,
        signIn,
        signInWithToken,
        signOut,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
