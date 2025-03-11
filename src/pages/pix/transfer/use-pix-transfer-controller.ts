import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@hooks/auth'
import { useNotification } from '@hooks/notification'
import { api, parseError } from '@lib/axios'

import { SelectObject } from '@components/input/selected'

import {
  type Account,
  type PixData,
  type Output,
} from '@pages/pix/contracts/transfer'

export function usePixTransfer(): Output {
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [open, setOpen] = useState(false)
  const { user, account: userAccount, getUser } = useAuth()

  // Step One
  const [key, setKey] = useState('')
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

    if (typeKey.id === '') {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'Selecione o tipo da chave.',
      })
      return
    }

    if (!key) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso fornecer pelo menos uma chave Pix.',
      })
      return
    }

    try {
      setLoading(true)

      let keyValue

      switch (typeKey.id) {
        case 'phone': {
          keyValue = `+55${key.replace(/\D/g, '')}`
          break
        }
        case 'cpf': {
          keyValue = key.replace(/\D/g, '')
          break
        }
        case 'cnpj': {
          keyValue = key.replace(/\D/g, '')
          break
        }

        default: {
          keyValue = key
          break
        }
      }

      const { data } = await api.post('pix/info', {
        key: keyValue,
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
        type: typeKey.id,
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
      setTimeout(() => {
        getUser()
      }, 1000)
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
    key,
    loading,
    mask,
    maskedValue,
    open,
    password,
    pixInfo,
    setAddFavorite,
    setKey,
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
