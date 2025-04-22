/* eslint-disable @typescript-eslint/no-explicit-any */
import { XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { DocumentImageIcon } from '../../../components/icons/document-image'
import { ListIcon } from '../../../components/icons/list'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api } from '../../../lib/axios'
import OnBoardingStep from '../step'

const MAX_RETRIES = 100

export function OnBoardingDocument() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const [loading, setLoading] = useState(false)
  const [celCoinUrl, setCelCoinUrl] = useState('')
  const [retries, setRetries] = useState(0)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!user) {
      navigate('/u')
    }
  }, [user, navigate])

  async function handleNextStep() {
    setLoading(true)
    api
      .get('/users/get-kyc')
      .then(({ data }) => {
        if (data.status === 'WAITING_DOCUMENTS' && !data.url) {
          if (retries < MAX_RETRIES) {
            timeoutRef.current = setTimeout(() => {
              handleNextStep()
            }, 5000)
            setRetries(retries + 1)
          } else {
            throw new Error('Max retries reached')
          }
        } else if (data.status === 'REJECTED') {
          navigate('/u/onboarding/rejected')
        } else if (data.url) {
          setCelCoinUrl(data.url)
          setStep(2)
          setLoading(false)
        } else {
          showNotification({
            title: 'Erro',
            type: 'error',
            message: 'Erro ao carregar ambiente de verificação de documentos',
          })
        }
      })
      .catch(() => {
        showNotification({
          title: 'Erro',
          type: 'error',
          message: 'Erro ao carregar ambiente de verificação de documentos',
        })
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex h-full min-h-screen flex-col">
        <div className="mx-auto flex w-full grow">
          <div className="flex flex-1">
            <div className="flex-1 px-4 py-6 sm:px-6 lg:pl-8 xl:pl-6">
              <div className="flex justify-between gap-4">
                {step === 1 && (
                  <Link to={`/u/onboarding/address`}>
                    <ArrowLeftIcon color="var(--primary)" />
                  </Link>
                )}

                {step === 2 && (
                  <>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex items-center text-primary"
                      >
                        <ArrowLeftIcon color="var(--primary)" />
                      </button>
                      <div className="text-xl">
                        Realize a verificação de documentos no ambiente abaixo:
                      </div>
                    </div>
                  </>
                )}
                <button onClick={() => signOut()}>
                  <XIcon color="var(--primary)" />
                </button>
              </div>
              {step === 1 && (
                <div className="mt-20 pl-4 pr-4 md:pl-20 md:pr-20">
                  <h1 className="color-tx-primary text-3xl font-thin">
                    Você está a poucos passos de <br /> uma nova{' '}
                    <span className="font-semibold">
                      experiência financeira
                    </span>
                  </h1>
                  <div className="my-4 h-[4px] w-[42px] bg-primary" />
                  <p className="pb-4 text-[var(--text-secondary)]">
                    Todos os dados a seguir devem ser obrigatoriamente do
                    titular da conta
                  </p>

                  <>
                    <h2 className="color-tx-primary pb-4 text-2xl">
                      Envio de documentos
                    </h2>

                    <div className="flex items-center">
                      <div className="flex flex-1 flex-col">
                        <div className="mb-6 flex gap-4">
                          <ListIcon color="var(--primary)" />
                          <span className="text-base">
                            Tire a foto em um local com boa iluminação
                          </span>
                        </div>

                        <div className="mb-6 flex gap-4">
                          <ListIcon color="var(--primary)" />
                          <span className="text-base">
                            É necessário documento um documento válido
                          </span>
                        </div>

                        <div className="mb-6 flex gap-4">
                          <ListIcon color="var(--primary)" />
                          <span className="text-base">
                            Retire o documento do plástico
                          </span>
                        </div>

                        <div className="mb-6 flex gap-4">
                          <ListIcon color="var(--primary)" />
                          <span className="text-base">
                            Envie primeiro a frente e depois o verso
                          </span>
                        </div>
                      </div>
                      <div>
                        <DocumentImageIcon color="var(--primary)" />
                      </div>
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
                </div>
              )}

              {step === 2 && (
                <div className="flex h-full w-full flex-1 pt-8">
                  <iframe
                    className="w-full"
                    src={celCoinUrl}
                    allow="fullscreen; geolocation; microphone; camera; midi; encrypted-media; clipboard-write; autoplay; picture-in-picture; web-share"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-downloads allow-top-navigation"
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          <div className="hidden shrink-0 items-center justify-center bg-[var(--brand-background)] px-8 lg:flex lg:w-96">
            <OnBoardingStep current={4} />
          </div>
        </div>
      </div>
    </>
  )
}
