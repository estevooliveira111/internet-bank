import { Dispatch, FormEvent, SetStateAction } from 'react'

import { User } from '@context/auth'

import { SelectObject } from '@components/input/selected'

export interface Account {
  documentNumber: string
  name: string
  agency: string
  number: string
  personType: string
  accountType: string
}

interface Bank {
  ispb: string
  code: string
  shortName: string
  longName: string
}

export interface PixData {
  account: Account
  bank: Bank
  key: string
  status: string
  type: string
}

export interface Output {
  addFavorite: boolean
  data: PixData
  handleChange: (event: FormEvent, value: number, maskedValue: string) => void
  handleBack: () => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  key: string
  loading: boolean
  mask: string
  maskedValue: string
  open: boolean
  password: string
  pixInfo: string
  setAddFavorite: (addFavorite: boolean) => void
  setKey: (key: string) => void
  setOpen: (open: boolean) => void
  setPassword: (password: string) => void
  setPixInfo: (pixInfo: string) => void
  setStep: (step: number) => void
  setTypeKey: Dispatch<SetStateAction<SelectObject>>
  step: number
  transactionId: string
  typeKey: SelectObject
  user: User
  userAccount: Account
  value: number
}
