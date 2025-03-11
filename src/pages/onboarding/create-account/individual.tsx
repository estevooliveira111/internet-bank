import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api, parseError } from '../../../lib/axios'
import OnBoardingStep from '../step'

export function OnBoardingIndividual() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [birthdate, setBirthdate] = useState('')
  const [rgnumber, setRgnumber] = useState('')
  const [issue, setIssue] = useState('')
  const [uf, setUf] = useState('')
  const [dateIssue, setDateIssue] = useState('')
  const [motherName, setMotherName] = useState('')

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
      if (
        !birthdate ||
        !rgnumber ||
        !issue ||
        !uf ||
        !dateIssue ||
        !motherName
      ) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'Preencha todos os campos.',
        })
        return
      }

      setLoading(true)
      await api.post('/individuals', {
        birthdate: converterData(birthdate),
      })

      await api.post('/individuals/document', {
        document_type: 'RG',
        document_number: rgnumber,
        document_uf: uf,
        document_issuing: issue,
        document_date_issue: converterData(dateIssue),
      })

      await api.post('/individuals/parents-name', {
        mother_name: motherName,
      })

      navigate('/u/onboarding/address')
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
                <Link to={`/u/onboarding/phone`}>
                  <ArrowLeftIcon color="var(--primary)" />
                </Link>
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

                <>
                  <h2 className="color-tx-primary pb-4 text-2xl">
                    Dados pessoais
                  </h2>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="birthdate"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Data de nascimento
                    </label>
                    <InputMask
                      type="text"
                      name="birthdate"
                      mask="99/99/9999"
                      id="birthdate"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={birthdate}
                      onChange={(input) => setBirthdate(input.target.value)}
                    />
                  </div>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="rgnumber"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Número do RG
                    </label>
                    <input
                      type="text"
                      name="rgnumber"
                      id="rgnumber"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={rgnumber}
                      onChange={(input) => setRgnumber(input.target.value)}
                    />
                  </div>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="issue"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Orgão emissor
                    </label>
                    <input
                      type="text"
                      name="issue"
                      id="issue"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={issue}
                      onChange={(input) => setIssue(input.target.value)}
                    />
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className="mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="uf"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Estado emissor
                      </label>
                      <input
                        type="text"
                        name="uf"
                        id="uf"
                        maxLength={2}
                        className="block border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={uf}
                        onChange={(input) => setUf(input.target.value)}
                      />
                    </div>

                    <div className="mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="dateIssue"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Data de expedição
                      </label>
                      <InputMask
                        type="text"
                        name="dateIssue"
                        id="dateIssue"
                        mask="99/99/9999"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={dateIssue}
                        onChange={(input) => setDateIssue(input.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="motherName"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Nome da mãe
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      id="motherName"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={motherName}
                      onChange={(input) => setMotherName(input.target.value)}
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
