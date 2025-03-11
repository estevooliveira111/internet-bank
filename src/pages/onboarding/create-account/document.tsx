/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadCloud } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { DocumentImageIcon } from '../../../components/icons/document-image'
import { ListIcon } from '../../../components/icons/list'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api, parseError } from '../../../lib/axios'
import OnBoardingStep from '../step'

export function OnBoardingDocument() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [loading, setLoading] = useState(false)

  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!user) {
      navigate('/u')
    }
  }, [user, navigate])

  async function handleNextStep() {
    if (step === 1) {
      setStep(2)
    }
  }

  async function handleFileSelect(event: any) {
    let type

    if (step === 2) {
      type = 'DOCUMENT_SELFIE'
    } else if (step === 3) {
      type = 'IDENTITY_CARD_FRONT'
    } else {
      type = 'IDENTITY_CARD_VERSE'
    }

    const fileType = event.target?.files[0]?.type

    if (
      fileType !== 'image/png' &&
      fileType !== 'image/jpeg' &&
      fileType !== 'image/jpg'
    ) {
      showNotification({
        type: 'error',
        title: 'Arquivo inválido.',
        message: 'Só é permitido arquivos do tipo PNG, JPG ou JPEG.',
      })
      return
    }

    try {
      setLoading(true)
      hidden()
      const formData = new FormData()
      formData.append('file', event.target?.files[0])
      await api.post(`/documents?type=${type}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const { data } = await api.get('/users')
      if (data.user.step === 'WAITING_DOCUMENTS_FRONT') {
        setStep(3)
      }

      if (data.user.step === 'WAITING_DOCUMENTS_BACK') {
        setStep(4)
      }

      if (data.user.step === 'WAITING_ANALYSYS') {
        navigate('/u/onboarding/analysis')
      }

      if (data.user.step === 'WAITING_COMPANY_DATA') {
        navigate('/u/onboarding/company')
      }

      if (data.user.step === 'IN_ANALYSIS') {
        navigate('/u/onboarding/analysis')
      }
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
    <>
      <div className="flex h-full min-h-screen flex-col">
        <div className="mx-auto w-full grow lg:flex">
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <div className="block">
                {step === 1 && (
                  <Link to={`/u/onboarding/address`}>
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
                )}

                {step === 2 && (
                  <>
                    <h2 className="color-tx-primary pb-4 text-2xl">
                      Hora da selfie
                    </h2>

                    {/* <p className="text-[var(--text-secondary)] pb-4 text-sm">
                      Nós enviamos um código para seu telefone. Insira-o abaixo
                      para continuarmos
                    </p> */}

                    <div className="flex items-start gap-5">
                      <label
                        htmlFor="photo"
                        className="hover:bg-violet-25 group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center text-zinc-500 shadow-sm hover:border-primary hover:text-primary"
                      >
                        <div className="border-6 rounded-full border-zinc-50 bg-zinc-100 p-2 group-hover:border-violet-50 group-hover:bg-violet-100">
                          <UploadCloud className="h-5 w-5 text-zinc-600 group-hover:text-primary" />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm">
                            <span className="font-semibold text-primary">
                              Clique para fazer o envio
                            </span>{' '}
                            ou arraste e solte
                          </span>
                          <span className="text-xs">PNG, JPG ou JPEG</span>
                        </div>
                      </label>

                      <input
                        type="file"
                        className="sr-only"
                        id="photo"
                        onChange={handleFileSelect}
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

                {step === 3 && (
                  <>
                    <h2 className="color-tx-primary pb-4 text-2xl">
                      Hora da CNH ou RG (Frente)
                    </h2>

                    {/* <p className="text-[var(--text-secondary)] pb-4 text-sm">
                      Nós enviamos um código para seu telefone. Insira-o abaixo
                      para continuarmos
                    </p> */}

                    <div className="flex items-start gap-5">
                      <label
                        htmlFor="photo"
                        className="hover:bg-violet-25 group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center text-zinc-500 shadow-sm hover:border-primary hover:text-primary"
                      >
                        <div className="border-6 rounded-full border-zinc-50 bg-zinc-100 p-2 group-hover:border-violet-50 group-hover:bg-violet-100">
                          <UploadCloud className="h-5 w-5 text-zinc-600 group-hover:text-primary" />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm">
                            <span className="font-semibold text-primary">
                              Clique para fazer o envio
                            </span>{' '}
                            ou arraste e solte
                          </span>
                          <span className="text-xs">PNG, JPG ou JPEG</span>
                        </div>
                      </label>

                      <input
                        type="file"
                        className="sr-only"
                        id="photo"
                        onChange={handleFileSelect}
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

                {step === 4 && (
                  <>
                    <h2 className="color-tx-primary pb-4 text-2xl">
                      Hora da CNH ou RG (Verso)
                    </h2>

                    {/* <p className="text-[var(--text-secondary)] pb-4 text-sm">
                      Nós enviamos um código para seu telefone. Insira-o abaixo
                      para continuarmos
                    </p> */}

                    <div className="flex items-start gap-5">
                      <label
                        htmlFor="photo"
                        className="hover:bg-violet-25 group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center text-zinc-500 shadow-sm hover:border-primary hover:text-primary"
                      >
                        <div className="border-6 rounded-full border-zinc-50 bg-zinc-100 p-2 group-hover:border-violet-50 group-hover:bg-violet-100">
                          <UploadCloud className="h-5 w-5 text-zinc-600 group-hover:text-primary" />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm">
                            <span className="font-semibold text-primary">
                              Clique para fazer o envio
                            </span>{' '}
                            ou arraste e solte
                          </span>
                          <span className="text-xs">PNG, JPG ou JPEG</span>
                        </div>
                      </label>

                      <input
                        type="file"
                        className="sr-only"
                        id="photo"
                        onChange={handleFileSelect}
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
            <OnBoardingStep current={4} />
          </div>
        </div>
      </div>
    </>
  )
}
