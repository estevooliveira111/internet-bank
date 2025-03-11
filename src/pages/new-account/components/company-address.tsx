import axios from 'axios'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../../components/icons/arrow-left'
import { Loading } from '../../../components/loading'
import { useAuth } from '../../../hooks/auth'
import { useNotification } from '../../../hooks/notification'
import { api, parseError } from '../../../lib/axios'

interface Props {
  onComplete: (id: number) => void
  companyId: string
}

export function AddCompanyAddress({ onComplete, companyId }: Props) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [zipcode, setZipcode] = useState('')
  const [street, setStreet] = useState('')

  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const [errorNumber, setErrorNumber] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/u')
    }
  }, [user, navigate])

  async function handleZipcode(zipcode: string) {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipcode}/json/`,
      )

      setStreet(data?.logradouro || '')
      setZipcode(zipcode)
      setNeighborhood(data?.bairro || '')
      setCity(data?.localidade || '')
      setUf(data?.uf || '')
    } catch {}
  }

  useEffect(() => {
    const zp = zipcode.replace(/[-,_]/g, '')
    if (zp.length === 8) {
      handleZipcode(zp)
    }
  }, [zipcode])

  async function handleNextStep() {
    try {
      hidden()
      setErrorNumber(false)
      if (!zipcode || !street || !neighborhood || !city || !uf) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'Preencha todos os campos.',
        })
        return
      }

      if (!number) {
        setErrorNumber(true)
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'O número é obrigatório.',
        })
        return
      }

      setLoading(true)
      await api.post(`/company-address/${companyId}`, {
        address_type: 'OFFICE',
        zip_code: zipcode.replace(/[-,_]/g, ''),
        state: uf.toUpperCase(),
        city,
        neighborhood,
        street,
        number,
        complement,
      })

      // navigate('/u/onboarding/analysis')
      onComplete(2)
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
                <span onClick={() => onComplete(0)}>
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
                  Todos os dados a seguir devem ser obrigatoriamente do titular
                  da conta
                </p>

                <>
                  <h2 className="color-tx-primary pb-4 text-2xl">
                    Endereço da empresa
                  </h2>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="zipcode"
                      className="block text-base font-medium text-tx-primary"
                    >
                      CEP
                    </label>
                    <InputMask
                      type="text"
                      name="zipcode"
                      mask="99999-999"
                      id="zipcode"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={zipcode}
                      onChange={(input) => setZipcode(input.target.value)}
                    />
                  </div>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="street"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Logradouro
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={street}
                      onChange={(input) => setStreet(input.target.value)}
                    />
                  </div>

                  <div className="flex flex-row gap-4">
                    <div
                      className={`mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0 ${
                        errorNumber ? 'border-red-400' : ''
                      }`}
                    >
                      <label
                        htmlFor="number"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Número
                      </label>
                      <input
                        type="text"
                        name="number"
                        id="number"
                        className="block border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={number}
                        onChange={(input) => setNumber(input.target.value)}
                      />
                    </div>

                    <div className="mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="complement"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complement"
                        id="complement"
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={complement}
                        onChange={(input) => setComplement(input.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-6 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                    <label
                      htmlFor="neighborhood"
                      className="block text-base font-medium text-tx-primary"
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      id="neighborhood"
                      className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                      value={neighborhood}
                      onChange={(input) => setNeighborhood(input.target.value)}
                    />
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className="mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="city"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="block border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={city}
                        onChange={(input) => setCity(input.target.value)}
                      />
                    </div>

                    <div className="mb-6 flex flex-1 flex-col rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
                      <label
                        htmlFor="uf"
                        className="block text-base font-medium text-tx-primary"
                      >
                        Estado
                      </label>
                      <input
                        type="text"
                        name="uf"
                        id="uf"
                        maxLength={2}
                        className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0"
                        value={uf}
                        onChange={(input) => setUf(input.target.value)}
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
