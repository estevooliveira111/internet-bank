import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  ButtonEyeVisibility,
  ButtonSignIn,
  Container,
  Content,
  ForgetPassword,
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
import { useCustomer } from '../../hooks/customer'
import { useAuth } from '../../hooks/auth'
import { api, parseError } from '../../lib/axios'
import { Loading } from '../../components/loading'
import { useNotification } from '../../hooks/notification'
import { VisionEyeIcon } from '../../components/icons/vision-eye'
import { UnVisionEyeIcon } from '../../components/icons/unvision-eye'

export function ResetPassword() {
  const { customer } = useCustomer()
  const { user } = useAuth()
  const { hidden, showNotification } = useNotification()

  const navigation = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const token = searchParams.get('token')
  const code = searchParams.get('code')

  const [loading, setLoading] = useState(false)

  const [password, setPassword] = useState('')

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function handlePasswordVisibility() {
    setIsPasswordVisible((state) => !state)
  }

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
      await api.post('/users/forgot-password', {
        token,
        code,
        password,
      })

      setPassword('')
      showNotification({
        type: 'success',
        title: 'Senha redefinida.',
        message: 'Sua senha foi redefinida com sucesso.',
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
      <WrapperBackground />
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
          <Title>Informe sua nova senha</Title>
          <Separator />
          <Reference>
            Preencha os campos abaixo para criar uma nova senha
          </Reference>
          <WrapperForm onSubmit={trySignIn}>
            <InputPassword>
              <label htmlFor="password">
                <span>Senha:</span>
                <input
                  id="password"
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
              Redefinir senha
            </ButtonSignIn>
          </WrapperForm>
          <ForgetPassword to="/u">Voltar para o Login</ForgetPassword>
          <Line />
          {customer.display_name !== 'Moncoc Bank' &&
            customer.display_name !== 'Stric' &&
            customer.display_name !== 'Umbank' && (
              <NotHaveAnAccount to="/u/account-type">
                Não tem uma conta? Abrir conta {customer.display_name}
              </NotHaveAnAccount>
            )}
        </Content>
      </WrapperContent>
    </Container>
  )
}
