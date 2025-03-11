import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api, parseError } from '../../../lib/axios'

interface Props {
  onComplete: (id: string) => void
}

export function AddCompany({ onComplete }: Props) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [document, setDocument] = useState('')
  const [name, setName] = useState('')
  const [trade, setTrade] = useState('')
  const [openDate, setOpenDate] = useState('')
  const [phone, setPhone] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/u')
    }
  }, [user, navigate])

  function converterData(data: string): string {
    const partes = data.split('/')
    const dataFormatada =
      partes[2] +
      '-' +
      partes[1].padStart(2, '0') +
      '-' +
      partes[0].padStart(2, '0')
    return dataFormatada
  }

  async function handleNextStep() {
    try {
      hidden()
      if (!document || !name || !trade || !openDate || !phone) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'Preencha todos os campos.',
        })
        return
      }

      setLoading(true)
      const { data } = await api.post('/company', {
        document: document.replace(/\D/g, ''),
        name,
        display_name: trade,
        date_start_company: converterData(openDate),
        phone: `+55${phone.replace(/\D/g, '')}`,
      })

      // navigate(`/u/onboarding/company-address/${data.company.id}`)
      onComplete(data.company.id)
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
                <span onClick={() => onComplete('')}>
                  <ArrowLeftIcon color="var(--primary)" />
                </span>
              </div>

              <div className="mt-20 pl-4 pr-4 md:pl-20 md:pr-20">
                <h1 className="color-tx-primary text-3xl font-thin">
                  Você está a poucos passos de <br /> uma nova{' '}
                  <span className="font-semibold">experiência financeira</span>
                </h1>
                <div className="my-4 h-[4px] w-[42px] bg-primary" />
                <p className="pb-4 text-[var(--text-secondary)]">
                  Todos os dados a seguir devem ser obrigatoriamente do empresa
                </p>

                <>
                  <h2 className="color-tx-primary pb-4 text-2xl">
                    Dados da empresa
                  </h2>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="document"
                      className="block text-base font-medium text-tx-primary"
                    >
                      CNPJ
                    </label>
                    <CpfCnpj
                      type="text"
                      name="document"
                      id="document"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      onChange={(input: React.ChangeEvent<HTMLInputElement>) =>
                        setDocument(input.target.value)
                      }
                      value={document}
                    />
                  </div>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="name"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Razão social
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
                      htmlFor="trade"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Nome fantasia
                    </label>
                    <input
                      type="text"
                      name="trade"
                      id="trade"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={trade}
                      onChange={(input) => setTrade(input.target.value)}
                    />
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className="mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="open"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Data de abertura
                      </label>
                      <InputMask
                        type="text"
                        name="open"
                        id="open"
                        mask="99/99/9999"
                        className="block border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={openDate}
                        onChange={(input) => setOpenDate(input.target.value)}
                      />
                    </div>

                    <div className="mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="phone"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Telefone
                      </label>
                      <InputMask
                        type="text"
                        name="phone"
                        id="phone"
                        mask="(99) 99999-9999"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={phone}
                        onChange={(input) => setPhone(input.target.value)}
                      />
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
