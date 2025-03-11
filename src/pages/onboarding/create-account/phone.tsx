import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api, parseError } from '../../../lib/axios'
import OnBoardingStep from '../step'

export function OnBoardingPhone() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const [loading, setLoading] = useState(false)

  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!user) {
      navigate('/u')
    }
  }, [user, navigate])

  async function handleNextStep() {
    if (step === 1) {
      try {
        hidden()
        if (!phone) {
          return
        }

        setLoading(true)
        await api.post('users/phone', {
          phone: `+55${phone.replace(/\D/g, '')}`,
        })
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

        setLoading(true)
        await api.post('users/phone/validate', {
          code,
        })

        navigate('/u/onboarding/individual')
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
              <div className="block">
                {step === 1 && (
                  <Link to={`/u/onboarding/email`}>
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
                      Cadastre seu telefone
                    </h2>

                    <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="phone"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Telefone
                      </label>
                      <InputMask
                        type="text"
                        name="phone"
                        mask="(99) 99999-9999"
                        id="phone"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={phone}
                        onChange={(input) => setPhone(input.target.value)}
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

                {step === 2 && (
                  <>
                    <h2 className="color-tx-primary pb-4 text-2xl">
                      Confirmação de telefone
                    </h2>

                    <p className="pb-4 text-sm text-[var(--text-secondary)]">
                      Nós enviamos um código para seu telefone. Insira-o abaixo
                      para continuarmos
                    </p>
                    <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="code"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Código
                      </label>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        maxLength={6}
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={code}
                        onChange={(input) => setCode(input.target.value)}
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

          <div className="hidden shrink-0 items-center justify-center bg-[var(--brand-background)] px-8 lg:flex lg:w-96">
            <OnBoardingStep current={2} />
          </div>
        </div>
      </div>
    </>
  )
}
