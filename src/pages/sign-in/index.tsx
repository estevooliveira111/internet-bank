/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import SignInImageDefault from '../../assets/sign-in.png'
import SignInImageVF from '../../assets/vfbank-login.jpeg'

import {
  ButtonEyeVisibility,
  ButtonSignIn,
  Container,
  Content,
  ForgetPassword,
  Input,
  InputPassword,
  Line,
  NotHaveAnAccount,
  Reference,
  Separator,
  Title,
  WrapperBackground,
  WrapperContent,
  WrapperForm,
  WrapperLogo,
} from './styles'
// import { LogoIcon } from '../../components/icons/logo'
import { VisionEyeIcon } from '../../components/icons/vision-eye'
import { UnVisionEyeIcon } from '../../components/icons/unvision-eye'
import { useCustomer } from '../../hooks/customer'
import { useAuth } from '../../hooks/auth'
import { parseError } from '../../lib/axios'
import { Loading } from '../../components/loading'
import { useNotification } from '../../hooks/notification'

export function SignIn() {
  const { customer } = useCustomer()
  const { signIn, user } = useAuth()
  const { showNotification } = useNotification()

  const [loading, setLoading] = useState(false)
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigation = useNavigate()

  useEffect(() => {
    if (user) {
      navigation('/')
    }
  }, [navigation, user])

  function handlePasswordVisibility() {
    setIsPasswordVisible((state) => !state)
  }

  async function trySignIn(e: FormEvent) {
    e.preventDefault()
    try {
      setLoading(true)
      await signIn({
        document: document.replace(/\D/g, ''),
        password,
      })
      navigation('/')
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao realizar login.',
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
          <Title>
            Bem-vindo ao internet <br />
            <b>
              banking{' '}
              {customer?.display_name !== 'VF BANK DIGITAL' && (
                <span>da {customer.display_name}.</span>
              )}
            </b>
          </Title>
          <Separator />
          <Reference>
            Preencha os campos abaixo para acessar sua conta
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
              <label htmlFor="password">
                <span>Senha:</span>
                <input
                  id="password"
                  autoComplete="off"
                  placeholder="Digite sua senha"
                  type={isPasswordVisible ? 'text' : 'password'}
                  onChange={(input) => setPassword(input.target.value)}
                  value={password}
                />
              </label>
              <ButtonEyeVisibility
                type="button"
                onClick={handlePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <VisionEyeIcon color="var(--primary)" />
                ) : (
                  <UnVisionEyeIcon color="var(--primary)" />
                )}
              </ButtonEyeVisibility>
            </InputPassword>
            <ButtonSignIn type="submit">
              {loading && <Loading isLoading={loading} />}
              Entrar
            </ButtonSignIn>
          </WrapperForm>
          <ForgetPassword to="/u/forgot">Esqueci minha senha</ForgetPassword>
          <Line />
          {customer.display_name !== 'Moncoc Bank' &&
            customer.display_name !== 'Stric' &&
            customer.display_name !== 'Umbank' && (
              <NotHaveAnAccount to="/u/account-type">
                Não tem uma conta? Abrir conta{' '}
                {customer?.display_name !== 'VF BANK DIGITAL' && (
                  <span>{customer.display_name}</span>
                )}
              </NotHaveAnAccount>
            )}
        </Content>
      </WrapperContent>
    </Container>
  )
}
