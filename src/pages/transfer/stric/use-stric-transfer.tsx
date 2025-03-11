import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api, parseError } from '@lib/axios'
import { User } from '@/context/auth'
import { useAuth } from '@hooks/auth'
import { useNotification } from '@hooks/notification'

import { SelectObject } from '@components/input/selected'

export interface Account {
  documentNumber: string
  name: string
  agency: string
  number: string
  personType: string
  accountType: string
}

export interface Bank {
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

interface Output {
  addFavorite: boolean
  data: PixData
  handleChange: (event: FormEvent, value: number, maskedValue: string) => void
  handleBack: () => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  account: string
  loading: boolean
  mask: string
  maskedValue: string
  open: boolean
  password: string
  pixInfo: string
  setAddFavorite: (addFavorite: boolean) => void
  setAccount: (key: string) => void
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

export function usePixTransfer(): Output {
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [open, setOpen] = useState(false)
  const { user, account: userAccount } = useAuth()

  // Step One
  const [account, setAccount] = useState('')
  const [mask, setMask] = useState('')
  const [step, setStep] = useState(1)
  const [typeKey, setTypeKey] = useState<SelectObject>({
    id: '',
    name: 'Selecione o tipo de chave',
    hidden: 'Selecione o tipo de chave',
  })

  // Step Two
  const [maskedValue, setMaskedValue] = useState('0,00')
  const [password, setPassword] = useState('')
  const [pixInfo, setPixInfo] = useState('')
  const [addFavorite, setAddFavorite] = useState(false)
  const [value, setValue] = useState(0)

  const [transactionId, setTransactionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PixData>({} as PixData)

  function handleBack() {
    navigate(-1)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    hidden()

    if (step === 2) {
      handleTransfer()
      return
    }

    if (!account) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message:
          'É preciso fornecer pelo menos a conta ou CPF/CNPJ do favorecido.',
      })
      return
    }

    try {
      setLoading(true)

      const { data } = await api.post('pix/info', {
        account: account.replace(/\D/g, ''),
      })

      setData(data)
      setStep(2)
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao transferir.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    switch (typeKey?.id) {
      case 'phone': {
        setMask('(99) 99999-9999')
        break
      }
      case 'cpf': {
        setMask('999.999.999-99')
        break
      }
      case 'cnpj': {
        setMask('99.999.999/9999-99')
        break
      }
    }
  }, [typeKey])

  async function handleTransfer() {
    try {
      hidden()

      setLoading(true)

      if (!value || value === 0) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'É preciso informar um valor.',
        })
        return
      }

      if (!password || password.length !== 4) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'É preciso informar a senha.',
        })

        return
      }

      const { data: response } = await api.post('/pix/transfer', {
        key: data.key,
        amount: value,
        pin: password,
        info: pixInfo,
      })

      if (addFavorite) {
        try {
          await api.post('/pix/favorite-contacts', {
            account: data.account.number,
            account_type: data.account.accountType,
            agency: data.account.agency,
            code: data.bank.code,
            contact_name: data.account.name,
            document: data.account.documentNumber,
            bank_name: data.bank.longName,
            pix_key: data.key,
          })
        } catch (err) {
          //
        }
      }

      setTransactionId(response.transaction)
      setOpen(true)
      setStep(1)
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao transferir.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    event: FormEvent,
    value: number,
    maskedValue: string,
  ) => {
    event.preventDefault()
    setValue(value)
    setMaskedValue(maskedValue)
  }

  return {
    addFavorite,
    data,
    handleChange,
    handleBack,
    handleSubmit,
    account,
    loading,
    mask,
    maskedValue,
    open,
    password,
    pixInfo,
    setAddFavorite,
    setAccount,
    setOpen,
    setPassword,
    setPixInfo,
    setStep,
    setTypeKey,
    step,
    transactionId,
    typeKey,
    user,
    userAccount: userAccount as unknown as Account,
    value,
  }
}
