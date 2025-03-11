import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'

import { api } from '@lib/axios'
import { useAuth } from '@hooks/auth'
import { useNotification } from '@hooks/notification'

interface AddressResponse {
  id: string
  street: string
  state: string
  number: string
  complement: string
  neighborhood: string
  city: string
  zip_code: string
}

interface Address {
  address: AddressResponse
}

interface Output {
  loading: boolean
  editPersonal: boolean
  email: string
  phone: string
  phoneCodeSent: boolean
  phoneValidationCode: string
  setEditPersonal: Dispatch<SetStateAction<boolean>>
  setPhone: Dispatch<SetStateAction<string>>
  setPhoneValidationCode: Dispatch<SetStateAction<string>>
  editAddress: boolean
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
  editSecurity: boolean
  isPasswordVisible: boolean
  ísPinVisible: boolean
  password: string
  pin: string
  setEditAddress: Dispatch<SetStateAction<boolean>>
  setZipCode: Dispatch<SetStateAction<string>>
  setState: Dispatch<SetStateAction<string>>
  setCity: Dispatch<SetStateAction<string>>
  setNeighborhood: Dispatch<SetStateAction<string>>
  setStreet: Dispatch<SetStateAction<string>>
  setNumber: Dispatch<SetStateAction<string>>
  setComplement: Dispatch<SetStateAction<string>>
  setEditSecurity: Dispatch<SetStateAction<boolean>>
  setIsPasswordVisible: Dispatch<SetStateAction<boolean>>
  setIsPinVisible: Dispatch<SetStateAction<boolean>>
  setPassword: Dispatch<SetStateAction<string>>
  setPin: Dispatch<SetStateAction<string>>
  isPasswordSelected: boolean
  setIsPasswordSelected: Dispatch<SetStateAction<boolean>>
  isPinSelected: boolean
  setIsPinSelected: Dispatch<SetStateAction<boolean>>
  handleSubmit: (e: FormEvent<Element>) => void
}

export function useAccount(): Output {
  const { user } = useAuth()
  const { showNotification } = useNotification()

  const [loading, setLoading] = useState(false)

  const [editPersonal, setEditPersonal] = useState(true)

  const oldPhone = user.phone
  const [phone, setPhone] = useState(user.phone)
  const [phoneCodeSent, setPhoneCodeSent] = useState(false)
  const [phoneValidationCode, setPhoneValidationCode] = useState('')
  // const oldEmail = user.email
  const [email] = useState(user.email)
  // const [emailCodeSent, setEmailCodeSent] = useState(false)
  // const [emailValidationCode, setEmailValidationCode] = useState('')

  const [editAddress, setEditAddress] = useState(true)

  const [zipCode, setZipCode] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')

  const [validationDone, setValidationDone] = useState(false)

  const [editSecurity, setEditSecurity] = useState(true)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [ísPinVisible, setIsPinVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [pin, setPin] = useState('')
  const [isPasswordSelected, setIsPasswordSelected] = useState(false)
  const [isPinSelected, setIsPinSelected] = useState(false)

  async function handleUpdatePersonal() {
    setLoading(true)

    let phoneToSend = phone.replace(/\D+/g, '')
    phoneToSend = '+' + phoneToSend

    console.log({ phone: phoneToSend })

    api
      .put('/users/new-phone', {
        phone: phoneToSend,
      })
      .then(({ data }) => {
        setPhone(data.phone)
        setPhoneCodeSent(true)
      })
      .catch((err) => {
        console.error(err)
        setPhone(oldPhone)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function handleUpdateAddress() {
    setLoading(true)
    api
      .post<Address>('/individuals/addresses/save', {
        address_type: 'HOME',
        zip_code: zipCode,
        state,
        city,
        neighborhood,
        street,
        number,
        complement,
      })
      .then(({ data }) => {
        setZipCode(data.address.zip_code)
        setState(data.address.state)
        setCity(data.address.city)
        setNeighborhood(data.address.neighborhood)
        setStreet(data.address.street)
        setNumber(data.address.number)
        setComplement(data.address?.complement || 'Não informado')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function handleUpdateSecurity() {
    setLoading(true)
    try {
      if (password.length > 0) {
        api
          .post('/users/password', {
            password,
          })
          .then(() => {
            setPassword('')
          })
          .catch(() => {
            showNotification({
              type: 'error',
              title: 'Erro na alteração de senha.',
              message: 'Nova senha inválida, siga o padrão específicado.',
            })
          })
      }
      if (pin.length > 0) {
        api
          .post('/users/pin', {
            pin,
          })
          .then(() => {
            setPin('')
          })
          .catch(() => {
            showNotification({
              type: 'error',
              title: 'Erro na alteração do pin.',
              message: 'Novo pin inválido, siga o padrão específicado.',
            })
          })
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!editPersonal) {
      await handleUpdatePersonal()
    } else if (!editAddress) {
      await handleUpdateAddress()
    } else {
      await handleUpdateSecurity()
    }
  }

  useEffect(() => {
    if (phoneValidationCode.length === 6 && !validationDone) {
      setValidationDone(true)

      console.log({ code: phoneValidationCode })

      api
        .put('/users/new-phone/validate', {
          code: phoneValidationCode,
        })
        .then(() => {
          setPhoneValidationCode('')
          setPhoneCodeSent(false)
        })
        .catch((err) => {
          console.error(err)
          setPhoneCodeSent(false)
          setPhone(oldPhone)
          showNotification({
            type: 'error',
            title: 'Erro na validação.',
            message: 'Código inválido.',
          })
        })
    }
  }, [oldPhone, phoneValidationCode, showNotification, validationDone])

  useEffect(() => {
    api.get<Address>('/individuals/addresses/show-main').then(({ data }) => {
      setZipCode(data.address.zip_code)
      setState(data.address.state)
      setCity(data.address.city)
      setNeighborhood(data.address.neighborhood)
      setStreet(data.address.street)
      setNumber(data.address.number)
      setComplement(data.address?.complement || 'Não informado')
    })
  }, [])

  return {
    loading,
    editPersonal,
    email,
    phone,
    phoneCodeSent,
    phoneValidationCode,
    editAddress,
    zipCode,
    state,
    city,
    neighborhood,
    street,
    number,
    complement,
    editSecurity,
    isPasswordVisible,
    ísPinVisible,
    password,
    pin,
    isPasswordSelected,
    isPinSelected,
    setEditPersonal,
    setPhone,
    setPhoneValidationCode,
    setEditAddress,
    setZipCode,
    setState,
    setCity,
    setNeighborhood,
    setStreet,
    setNumber,
    setComplement,
    setEditSecurity,
    setIsPasswordVisible,
    setIsPinVisible,
    setPassword,
    setPin,
    setIsPasswordSelected,
    setIsPinSelected,
    handleSubmit,
  }
}
