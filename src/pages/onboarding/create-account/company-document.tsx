/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios'
import { useEffect, useState } from 'react'
// import InputMask from 'react-input-mask'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api, parseError } from '../../../lib/axios'
import OnBoardingStep from '../step'
import { UploadCloud } from 'lucide-react'
// import { DocumentImageIcon } from '../../../components/icons/document-image'
// import { ListIcon } from '../../../components/icons/list'

export function OnBoardingCompanyDocument() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()
  const params = useParams()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/u')
    }
  }, [user, navigate])

  async function handleFileSelect(event: any) {
    // const fileType = event.target?.files[0]?.type

    try {
      setLoading(true)
      hidden()
      const formData = new FormData()
      formData.append('file', event.target?.files[0])
      await api.post(`/documents?type=ARTICLES_OF_INCORPORATION`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const { data } = await api.get('/users')

      if (data.user.step === 'WAITING_ANALYSYS') {
        navigate('/u/onboarding/analysis')
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
                <Link to={`/u/onboarding/company-address/${params.id}`}>
                  <ArrowLeftIcon color="var(--primary)" />
                </Link>
              </div>

              <div className="mt-20 pl-4 pr-4 md:pl-20 md:pr-20">
                <h1 className="color-tx-primary text-3xl font-thin">
                  Documento da empresa
                </h1>
                <div className="my-4 h-[4px] w-[42px] bg-primary" />

                <h2 className="color-tx-primary pb-4 text-2xl">
                  Envie uma versão digitalizada do documento
                </h2>

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
                    onClick={() => {}}
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-center text-main-white md:w-auto md:min-w-[300px]"
                    type="button"
                  >
                    {loading && <Loading isLoading={loading} />}
                    Avançar
                  </button>
                </div>
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
