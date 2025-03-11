import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api, parseError } from '@lib/axios'
import { useNotification } from '@hooks/notification'

import { SelectObject } from '@components/input/selected'

interface Output {
  step: number
  loading: boolean
  needsValidation: boolean
  setStep: Dispatch<SetStateAction<number>>
  setTypeKey: Dispatch<SetStateAction<SelectObject>>
  setKeyValue: Dispatch<SetStateAction<string>>
  handleSubmit: (e: FormEvent) => Promise<void>
  setConfirmationCodeValue: Dispatch<SetStateAction<string>>
  typeKey: SelectObject
  keyValue: string
  mask?: string
  confirmationCodeValue: string
}

export function useNewPixKey(): Output {
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [step, setStep] = useState(1)
  const [mask, setMask] = useState('')
  const [needsValidation, setNeedsValidation] = useState(false)
  const [keyValue, setKeyValue] = useState('')
  const [confirmationCodeValue, setConfirmationCodeValue] = useState('')

  const [loading, setLoading] = useState(false)
  const [typeKey, setTypeKey] = useState<SelectObject>({
    id: '',
    name: 'Selecione o tipo de chave',
    hidden: 'Selecione o tipo de chave',
  })

  let keyToSend: string

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    hidden()

    if (typeKey.id === '') {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso selecionar o tipo de chave.',
      })
      setLoading(false)
      return
    } else if (typeKey.id !== 'evp' && keyToSend === '') {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso digitar a chave antes de continuar.',
      })
      setLoading(false)
      return
    }

    switch (typeKey.id) {
      case 'phone': {
        keyToSend = `${keyValue.replace(/\D/g, '').substring(2)}`
        break
      }
      case 'cpf': {
        keyToSend = keyValue.replace(/\D/g, '')
        break
      }
      case 'cnpj': {
        keyToSend = keyValue.replace(/\D/g, '')
        break
      }
    }

    if ((typeKey.id === 'phone' || typeKey.id === 'email') && step === 2) {
      handleValidateKey()
    }
    if (step !== 2) {
      handleNewKey()
    }
  }

  async function handleValidateKey() {
    try {
      if (confirmationCodeValue === '') {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message:
            'É preciso digitar o código de confirmação antes de continuar.',
        })
        setLoading(false)
        return
      }
      hidden()
      setLoading(true)
      await api.post('/pix/keys/validate', {
        key: keyToSend,
        confirmation_code: confirmationCodeValue,
      })
      navigate('/pix/keys/show-many')
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao enviar código de validação da chave.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleNewKey() {
    try {
      hidden()
      setLoading(true)

      await api.post('/pix/keys/create', {
        type: typeKey.id,
        key: keyToSend,
      })

      if (typeKey.id === 'phone' || typeKey.id === 'email') {
        setNeedsValidation(true)
        setStep(2)
      } else {
        navigate('/pix/keys/show-many')
      }
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao registrar uma nova chave.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    switch (typeKey?.id) {
      case 'phone': {
        setMask('+55 (99) 99999-9999')
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
  }, [typeKey.id])

  return {
    step,
    mask,
    loading,
    typeKey,
    keyValue,
    needsValidation,
    confirmationCodeValue,
    setStep,
    setTypeKey,
    setKeyValue,
    handleSubmit,
    setConfirmationCodeValue,
  }
}
