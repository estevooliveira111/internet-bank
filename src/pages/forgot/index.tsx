/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import SignInImageDefault from '../../assets/sign-in.png'
import SignInImageVF from '../../assets/vfbank-login.jpeg'

import {
  ButtonSignIn,
  Container,
  Content,
  ForgetPassword,
  Input,
  InputPassword,
  Line,
  NotHaveAnAccount,
  // NotHaveAnAccount,
  Reference,
  Separator,
  Title,
  WrapperBackground,
  WrapperContent,
  WrapperForm,
  WrapperLogo,
} from './styles'
// import { LogoIcon } from '../../components/icons/logo'
import { useCustomer } from '../../hooks/customer'
import { useAuth } from '../../hooks/auth'
import { api, parseError } from '../../lib/axios'
import { Loading } from '../../components/loading'
import { useNotification } from '../../hooks/notification'

export function Forgot() {
  const { customer } = useCustomer()
  const { user } = useAuth()
  const { hidden, showNotification } = useNotification()

  const [loading, setLoading] = useState(false)
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')

  const navigation = useNavigate()

  useEffect(() => {
    if (user) {
      navigation('/')
    }
  }, [navigation, user])

  async function trySignIn(e: FormEvent) {
    e.preventDefault()
    hidden()
    try {
      setLoading(true)
      await api.post('/users/forgot-password-code', {
        document: document.replace(/\D/g, ''),
        email,
      })

      showNotification({
        type: 'success',
        title: 'Confira seu e-mail.',
        message: 'Enviamos as instruções para recuperar sua senha por e-mail.',
      })
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <WrapperBackground
        image={
          customer?.display_name === 'VF BANK DIGITAL'
            ? SignInImageVF
            : SignInImageDefault
        }
      />
      <WrapperContent>
        <Content>
          <WrapperLogo>
            {/* <LogoIcon /> */}
            <img
              src={customer.logo.white}
              alt={customer.display_name}
              style={{ maxWidth: 120 }}
            />
          </WrapperLogo>
          <Title>Recuperar a senha</Title>
          <Separator />
          <Reference>
            Preencha os campos abaixo para recuperar sua senha
          </Reference>
          <WrapperForm onSubmit={trySignIn}>
            <Input htmlFor="document">
              <span>CPF/CNPJ</span>
              <CpfCnpj
                id="document"
                autoComplete="off"
                placeholder="Digite seu CPF/CNPJ"
                type="text"
                onChange={(input: any) => setDocument(input.target.value)}
                value={document}
              />
            </Input>
            <InputPassword>
              <label htmlFor="email">
                <span>E-mail:</span>
                <input
                  id="email"
                  placeholder="Digite seu e-mail"
                  type={'text'}
                  onChange={(input) => setEmail(input.target.value)}
                  value={email}
                />
              </label>
            </InputPassword>
            <ButtonSignIn type="submit">
              {loading && <Loading isLoading={loading} />}
              Continuar
            </ButtonSignIn>
          </WrapperForm>
          <ForgetPassword to="/u">Voltar para o Login</ForgetPassword>
          <Line />
          {customer.display_name === 'AllBank Invest' && (
            <NotHaveAnAccount to="/u/account-type">
              Não tem uma conta? Abrir conta {customer.display_name}
            </NotHaveAnAccount>
          )}
        </Content>
      </WrapperContent>
    </Container>
  )
}
