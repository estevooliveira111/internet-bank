import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api, parseError } from '../../../lib/axios'
import { useCustomer } from '@/hooks/customer'

export function CreateCorretor() {
  const { signIn } = useAuth()
  const params = useParams()
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [name, setName] = useState('')
  const [document, setDocument] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const [step, setStep] = useState(1)

  const location = useLocation()
  const { customer } = useCustomer()

  // const code = searchParams.get('code')

  const isPF =
    location.pathname.includes('pf&location=app') || params.type === 'pf'
  const isLocationApp = location.pathname.includes('&location=app')

  function handleDocument(doc: string) {
    if (doc.length <= 14) {
      setDocument(doc)
    }
  }

  // function renderError() {
  //   return (
  //     <div className="mt-1 pl-2 rounded flex items-center mb-4">
  //       <ExclamationCircleIcon color="var(--red)" className="w-4 h-4" />
  //       <p className="pl-2 text-main-red text-sm">
  //         Nome completo como está no documento
  //       </p>
  //     </div>
  //   )
  // }

  async function handleNextStep() {
    if (step === 1) {
      try {
        hidden()
        if (!name || !document) {
          return
        }

        setLoading(true)
        const documentFormatted = document.replace(/\D/g, '')
        await api.get(`users/can-register?document=${documentFormatted}`)
        setStep(2)
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

    if (step === 2) {
      try {
        hidden()

        if (password !== passwordConfirm) {
          showNotification({
            type: 'error',
            title: 'Erro ao continuar.',
            message: 'As senhas não conferem.',
          })
          return
        }

        setLoading(true)
        const documentFormatted = document.replace(/\D/g, '')
        await api.post('users', {
          name,
          document: documentFormatted,
          password,
          init_type: isPF ? 'pf' : 'pj',
        })

        await signIn({
          document: documentFormatted,
          password,
        })
        navigate('/u/onboarding/email')
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
  }

  return (
    <>
      <div className="flex h-full min-h-screen flex-col">
        <div className="mx-auto w-full grow lg:flex">
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {!isLocationApp && (
                <div className="block">
                  {step === 1 && (
                    <Link to={`/u/requirements-create-account/${params.type}`}>
                      <ArrowLeftIcon color="var(--primary)" />
                    </Link>
                  )}

                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center text-primary"
                    >
                      <ArrowLeftIcon color="var(--primary)" />
                    </button>
                  )}
                </div>
              )}

              <div className="mt-20 pl-4 pr-4 md:pl-20 md:pr-20">
                <h1 className="color-tx-primary text-3xl font-thin">
                  Você está a poucos passos de <br /> uma nova{' '}
                  <span className="font-semibold">experiência financeira</span>
                </h1>
                <div className="my-4 h-[4px] w-[42px] bg-primary" />
                <p className="pb-4 text-[var(--text-secondary)]">
                  Todos os dados a seguir devem ser obrigatoriamente do titular
                  da conta
                </p>

                {step === 1 && (
                  <>
                    <h2 className="color-tx-primary pb-4 text-2xl">
                      Informações básicas
                    </h2>

                    <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="name"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Nome completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={name}
                        onChange={(input) => setName(input.target.value)}
                      />
                    </div>

                    <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="document"
                        className="block text-base font-medium text-tx-primary"
                      >
                        CPF
                      </label>
                      <CpfCnpj
                        type="text"
                        name="document"
                        id="document"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        onChange={(
                          input: React.ChangeEvent<HTMLInputElement>,
                        ) => handleDocument(input.target.value)}
                        value={document}
                      />
                    </div>

                    {customer.name === 'Umbank' && (
                      <>
                        <div className="mb-6 rounded-md border border-[var(--gray)] px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                          <label
                            htmlFor="document"
                            className="block text-base font-medium text-[var(--text-primary)]"
                          >
                            Polo Indicação
                          </label>
                          <input
                            type="text"
                            name="polo"
                            id="polo"
                            className="block w-full border-0 bg-transparent p-0 text-[var(--text-primary)] focus:ring-0"
                            // value={name}
                            // onChange={(input) => setName(input.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div className="my-8 flex items-center justify-center">
                      <button
                        onClick={handleNextStep}
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-center text-main-white md:w-auto md:min-w-[300px]"
                        type="button"
                      >
                        {loading && <Loading isLoading={loading} />}
                        Avançar
                      </button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="color-tx-primary pb-4 text-2xl">
                      Deixe sua conta mais segura
                    </h2>

                    <p className="pb-4 text-sm text-[var(--text-secondary)]">
                      Sua senha deve conter 8 dígitos entre letras, números e
                      símbolos ( ! @ # $ % ^ & * ). Evite números em sequência.
                    </p>
                    <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="password"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Senha
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={password}
                        onChange={(input) => setPassword(input.target.value)}
                      />
                    </div>

                    <div className="rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="password_confirm"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Confirme sua senha
                      </label>
                      <input
                        type="password"
                        name="password_confirm"
                        id="password_confirm"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={passwordConfirm}
                        onChange={(input) =>
                          setPasswordConfirm(input.target.value)
                        }
                      />
                    </div>

                    <div className="my-8 flex items-center justify-center">
                      <button
                        onClick={handleNextStep}
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-center text-main-white md:w-auto md:min-w-[300px]"
                        type="button"
                      >
                        {loading && <Loading isLoading={loading} />}
                        Avançar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center justify-center bg-[var(--brand-background)] px-8 lg:flex lg:w-64">
            {/* <OnBoardingStep current={1} /> */}
          </div>
        </div>
      </div>
    </>
  )
}
