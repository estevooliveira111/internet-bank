import { FormEvent, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import IntlCurrencyInput from 'react-intl-currency-input'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button'
import { ArrowLeftIcon } from '../../components/icons/arrow-left'
import { Input } from '../../components/input'
import { useNotification } from '../../hooks/notification'
import { api, parseError } from '../../lib/axios'
import { formatDateToYYYYMMDD } from '../../utils/date-format'
import validateDate from '../../utils/date-validation'

export interface Billet {
  id: string
  user_id: string
  ref_id: string
  amount: number
  numeric_line: string
  digitableLine: string
  due_date: string
  url: string
  status: string
  paid_at: string
  created_at: string
  updated_at: string
}

export function ChargeBillet() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(0)
  const [dueDate, setDueDate] = useState('')
  const [maskedValue, setMaskedValue] = useState('0,00')
  const [loading, setLoading] = useState(false)
  const { showNotification, hidden } = useNotification()

  const [document, setDocument] = useState('')
  const [name, setName] = useState('')

  const [data, setData] = useState<Billet>({} as Billet)

  function handleBack() {
    navigate(-1)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    hidden()

    setLoading(true)
    if (!amount || amount === 0) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso informar um valor.',
      })

      setLoading(false)
      return
    }

    if (dueDate === '' || dueDate === null) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso informar uma data.',
      })

      setLoading(false)
      return
    }

    if (!validateDate(dueDate)) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'A data informada é menor que a data atual.',
      })

      setLoading(false)
      return
    }

    if (!name || !document) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'Os dados do cliente são obrigatórios',
      })

      setLoading(false)
      return
    }

    await handleGenerateBillet()
  }

  async function handleGenerateBillet() {
    try {
      const { data } = await api.post('/billets', {
        amount,
        due_date: formatDateToYYYYMMDD(dueDate),
        client_name: name,
        client_document: document.replace(/\D/g, ''),
      })

      setData(data.billet)
      setStep(2)
      setLoading(false)
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao transferir.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    event: FormEvent,
    value: number,
    maskedValue: string,
  ) => {
    event.preventDefault()

    setAmount(value)
    setMaskedValue(maskedValue)
  }

  return (
    <div className="h-full min-h-screen p-8">
      <div className="mb-6 flex items-center">
        <div
          className="mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-white hover:opacity-80"
          onClick={() => {
            step === 1 ? handleBack() : handleBack()
          }}
        >
          <ArrowLeftIcon color="var(--primary)" width={10} />
        </div>
        <div>
          <h1 className="block text-2xl text-tx-primary">
            {step === 1 ? ' Gerar nova cobrança' : 'Confirme os dados'}
          </h1>
          <span className="block">
            {step === 1
              ? 'Gere uma nova cobrança para receber de seus clientes.'
              : 'Confirme os dados abaixo para gerar o boleto'}
          </span>
        </div>
      </div>
      {step === 1 && (
        <form
          className="inline-flex w-full flex-col rounded bg-white md:w-[492px]"
          onSubmit={handleSubmit}
        >
          <div className="p-6">
            <div className="mb-6 w-full rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
              <p>Valor</p>
              <IntlCurrencyInput
                currency="BRL"
                className="text-md"
                config={{
                  locale: 'pt-BR',
                  formats: {
                    number: {
                      BRL: {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    },
                  },
                }}
                value={amount}
                onChange={(
                  event: FormEvent<Element>,
                  value: number,
                  masked: string,
                ) => handleChange(event, value, masked)}
              />
            </div>

            <Input
              full
              mask={'99/99/9999'}
              label="Data de Vencimento"
              id="dueDate"
              value={dueDate}
              onChange={(input) => setDueDate(input.target.value)}
            />

            <h3 className="mb-2 text-xl">Dados do cliente</h3>

            <Input
              full
              label="Nome"
              id="name"
              value={name}
              onChange={(input) => setName(input.target.value)}
            />

            <Input
              full
              mask={'document'}
              label="CPF/CNPJ"
              id="document"
              value={document}
              onChange={(input) => setDocument(input.target.value)}
            />
          </div>
          <div className="flex w-full flex-row justify-between bg-[#F2F2F2] pt-4">
            <Button
              className="flex w-full items-center justify-center rounded-md bg-[var(--gray-light-line)] px-3 py-3 text-center text-main-white hover:bg-main-gray md:w-auto md:min-w-[240px]"
              title={'Cancelar'}
              type="button"
              onClick={() => {
                step === 1 ? handleBack() : setStep(1)
              }}
            />
            <Button
              title={step === 1 ? 'Próximo' : 'Gerar Boleto'}
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          className="inline-flex w-full flex-col rounded bg-[#EAEAEA] p-6 md:w-[592px]"
          onSubmit={handleSubmit}
        >
          <div className="inline-flex min-w-full flex-col rounded-md rounded-bl-none rounded-br-none bg-[#eaeaea]">
            <div className=" w-full  items-center rounded-md">
              <IntlCurrencyInput
                currency="BRL"
                className="text-3xl"
                config={{
                  locale: 'pt-BR',
                  formats: {
                    number: {
                      BRL: {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    },
                  },
                }}
                value={maskedValue}
                disabled={true}
                onChange={(
                  event: FormEvent<Element>,
                  value: number,
                  masked: string,
                ) => handleChange(event, value, masked)}
              />
            </div>
            <div className="flex w-full items-center justify-between pb-4">
              <span className="font-bold text-tx-primary">
                {data.digitableLine}
              </span>
              <span className="text-primary">
                {/* {dateFormatWithHours(new Date())} */}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Vencimento</span>
              <span className="text-[var(--text-gray)]">{dueDate}</span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Linha Digitavel</span>
              <span className="text-[var(--text-gray)]">
                {data.digitableLine}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-start">
            <CopyToClipboard
              text={data.url}
              onCopy={() => {
                showNotification({
                  type: 'success',
                  title: 'Copiado',
                  message: 'Link copiado com sucesso',
                })

                setTimeout(() => {
                  hidden()
                }, 1000)
              }}
            >
              <Button title={'Copiar link do boleto'} type="button" />
            </CopyToClipboard>
          </div>
        </form>
      )}
    </div>
  )
}
