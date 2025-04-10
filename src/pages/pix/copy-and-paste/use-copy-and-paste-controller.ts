import { FormEvent, useState } from 'react'

import { api, parseError } from '@lib/axios'
import { useAuth } from '@hooks/auth'
import { useNotification } from '@hooks/notification'

export interface Qrcode {
  type: string
  txId: string
  merchantName: string
  merchantCity: string
  key: string
  keyType: string
  participant: string
  branch: string
  accountNumber: string
  accountType: string
  openingDate: string
  personType: string
  document: string
  name: string
  creationDate: string
  value: number
}

interface Output {
  handleSubmit: (e: FormEvent) => Promise<void>
  handleChange: (event: FormEvent, value: number, maskedValue: string) => void
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setPixInfo: React.Dispatch<React.SetStateAction<string>>
  setAddFavorite: React.Dispatch<React.SetStateAction<boolean>>
  setPixCopyAndPasteCode: React.Dispatch<React.SetStateAction<string>>
  setStep: React.Dispatch<React.SetStateAction<number>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  addFavorite: boolean
  loading: boolean
  open: boolean
  step: number
  pixCopyAndPasteCode: string
  qrcodeData: Qrcode
  value: number
  password: string
  pixInfo: string
}

export function usePixCopyAndPaste(): Output {
  const { getUser } = useAuth()
  const { showNotification, hidden } = useNotification()

  const [password, setPassword] = useState('')
  const [pixInfo, setPixInfo] = useState('')
  const [addFavorite, setAddFavorite] = useState(false)
  const [pixCopyAndPasteCode, setPixCopyAndPasteCode] = useState('')
  const [value, setValue] = useState(0)
  const [, setMaskedValue] = useState('0,00')
  const [endToEndId, setEndToEndId] = useState('')
  const [step, setStep] = useState(1)
  const [, setKey] = useState('')
  const [qrcodeData, setQrcodeData] = useState<Qrcode>({} as Qrcode)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [, setTransactionId] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    hidden()

    if (step === 2) {
      return handleTransfer()
    }

    if (!pixCopyAndPasteCode) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'O código do pix copia e cola é obrigatório.',
      })
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data } = await api.post('/pix/read-qrcode', {
        emv: pixCopyAndPasteCode,
      })
      setQrcodeData(data.qrcode)
      setKey(data.qrcode.key)
      setValue(data?.qrcode?.amount || 0)
      setEndToEndId(data.qrcode?.endToEndId)
      setStep(2)
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao realizar o pix.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleTransfer() {
    try {
      hidden()

      setLoading(true)

      if (!value) {
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
        key: qrcodeData.key,
        amount: value,
        endToEndId,
        pin: password,
        info: pixInfo,
      })

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
    setStep,
    setPixInfo,
    setPassword,
    handleSubmit,
    handleChange,
    setAddFavorite,
    setPixCopyAndPasteCode,
    setOpen,
    addFavorite,
    loading,
    open,
    step,
    pixCopyAndPasteCode,
    password,
    pixInfo,
    qrcodeData,
    value,
  }
}
