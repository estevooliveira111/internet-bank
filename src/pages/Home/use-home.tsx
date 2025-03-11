import { useEffect, useState } from 'react'

import { Account, User } from '@context/auth'
import { Customer } from '@context/customer'
import { useAuth } from '@hooks/auth'
import { useCustomer } from '@hooks/customer'
import { api } from '@lib/axios'
import { Transaction } from '@utils/description'

interface Contact {
  id: string
  name: string
  document: string
  key: string
}

interface Output {
  account?: Account | null
  customer: Customer
  loading: boolean
  transactions: Transaction[]
  user: User
  pixContacts: Contact[]
}

export function useHome(): Output {
  const { customer } = useCustomer()
  const { user, account } = useAuth()

  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pixContacts, setPixContacts] = useState<Contact[]>([])

  useEffect(() => {
    api.get('/transactions/v2?page=1').then(({ data }) => {
      setTransactions(data.transactions.slice(0, 8))
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    api.get('/pix/favorite-contacts/show-many').then(({ data }) => {
      setPixContacts(data.contacts)
      setLoading(false)
    })
  }, [])

  return {
    account,
    customer,
    loading,
    transactions,
    user,
    pixContacts,
  }
}
