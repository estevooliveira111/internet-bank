import dayjs from 'dayjs'
import { CheckIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'
import IntlCurrencyInput from 'react-intl-currency-input'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button'
import { ArrowLeftIcon } from '../../components/icons/arrow-left'
import { Input } from '../../components/input'
import { Modal } from '../../components/modal'
import { useAuth } from '../../hooks/auth'
import { useNotification } from '../../hooks/notification'
import { api, parseError } from '../../lib/axios'
import { documentFormat } from '../../utils/document-format'
import { numberToCurrent } from '../../utils/number-to-currency'


export interface PaymentData {
  allowChangeTotalValue: boolean
  allowPartialPayment: boolean
  barCode: string
  beneficiaryCorporateName: string
  digitLine: string
  discont: number
  discountValue: number
  expirationDate: string
  paymentLimitDate: string
  fees: number
  fine: number
  maximumValue: number
  minimumValue: number
  payerDocument: string
  payerName: string
  rebateValue: number
  receiverDocument: string
  receiverName: string
  totalValue: number
  value: number
  receiveAuthorizationValueDivergentType: string
  diversePaymentType: string
  validateDuplicity: boolean
  enableMP: boolean
  slipConsultTime: string
  type: string

  digitableLine: string;
  beneficiary: string;
  dueDate: string;
  payer: string;
  documentPayer: string;
}

export function Payment() {
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [barcode, setBarcode] = useState('')

  const [password, setPassword] = useState('')

  const [token, setToken] = useState('')
  const [data, setData] = useState<PaymentData>({} as PaymentData)

  const [value, setValue] = useState(0)
  const [, setMaskedValue] = useState('0,00')

  const [step, setStep] = useState(1)

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const { user, account: userAccount } = useAuth()

  const [transactionId, setTransactionId] = useState('')

  function handleBack() {
    navigate(-1)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    hidden()

    if (step === 2) {
      handleTransfer()
      return
    }

    if (!barcode) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'Código de barras é obrigatório.',
      })
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data } = await api.post('/payments/read-bank-slip', {
        barcode: barcode.replace(/\D/g, ''),
      })
      setToken(data.payments.token)
      setData(data.payments.data)
      setValue(data.payments.data.totalValue)
      setStep(2)
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

  async function handleTransfer() {
    try {
      hidden()
      setLoading(true)

      if (!password || password.length !== 4) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'É preciso informar a senha.',
        })
        return
      }

      const response = await api.post('/payments/payment', {
        token,
        amount: value,
        pin: password,
        beneficiary: data.beneficiary,
        digitable: data.digitableLine,
        dueDate: data.dueDate,
        payer: data.payer,
        documentPayer: data.documentPayer,
      })
      setTransactionId(response.data.payment.controlNumber)
      setOpen(true)
      setStep(1)
      setBarcode('')
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao efetuar o pagamento.',
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

    setValue(value)
    setMaskedValue(maskedValue)
  }

  return (
    <div className="h-full min-h-screen p-8">
      <div className="mb-6 flex items-center ">
        <div
          onClick={() => {
            step === 1 ? handleBack() : setStep(1)
          }}
          className="mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-white hover:opacity-80"
        >
          <ArrowLeftIcon color="var(--primary)" width={10} />
        </div>
        <h1 className="text-2xl text-tx-primary">
          {step === 1
            ? 'Realizar Pagamento de Boleto '
            : 'Confirme os Dados do Pagamento'}
        </h1>
      </div>
      {step === 1 && (
        <form
          onSubmit={handleSubmit}
          className="inline-flex w-full flex-col rounded bg-white  p-8 md:w-3/4"
        >
          <h1 className="text-xl">Realizar pagamento de Boleto</h1>
          <span className="mb-6 mt-2 text-tx-primary">
            Insira os dados do boleto
          </span>
          <div>
            <Input
              full
              label="Código de barras"
              id="barcode"
              onChange={(input) => setBarcode(input.target.value)}
              value={barcode}
            />
          </div>

          <Button
            title={step === 1 ? 'Próximo' : 'Pagar'}
            type="submit"
            disabled={loading}
            loading={loading}
          />
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="md:max-w-[620px]">
          <div className='className="inline-flex min-w-full flex-col rounded-md rounded-bl-none rounded-br-none bg-[#eaeaea] p-6 md:min-w-[520px]'>
            <div className="flex w-full items-center justify-between pb-4">
              <span className="font-bold text-tx-primary">
                {data.digitLine}
              </span>
              <span className="text-primary">
                {/* {dateFormatWithHours(new Date())} */}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Vencimento</span>
              <span className="text-[var(--text-gray)]">
                {dayjs(data.expirationDate).format('DD/MM/YYYY')}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Pagamento</span>
              <span className="text-[var(--text-gray)]">
                {dayjs(new Date()).format('DD/MM/YYYY')}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Beneficiário</span>
              <span className="text-[var(--text-gray)]">
                {data.receiverName}{' '}
                {data.receiverDocument && (
                  <>{documentFormat(data.payerDocument)}</>
                )}
              </span>
            </div>

            <div className="w-full items-center rounded-md bg-white p-4">
              <span className="mr-4 inline-block text-xl text-tx-primary">
                Valor
              </span>
              <IntlCurrencyInput
                currency="BRL"
                className="text-2xl"
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
                value={data.totalValue}
                disabled={true}
                onChange={(
                  event: FormEvent<Element>,
                  value: number,
                  masked: string,
                ) => handleChange(event, value, masked)}
              />
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="p-6">
              <div className="w-[300px]">
                <label
                  htmlFor="password"
                  className="block text-xl font-medium leading-6 text-tx-primary"
                >
                  Senha (4 dígitos)
                </label>
                <div className="relative mt-2">
                  <input
                    name="password"
                    id="password"
                    className="peer block w-full border-0 bg-gray-50 py-1.5 text-tx-primary focus:ring-0 sm:text-sm sm:leading-6 md:p-4"
                    placeholder="****"
                    maxLength={4}
                    type="password"
                    value={password}
                    onChange={(input) => setPassword(input.target.value)}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-primary"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              title={'Pagar'}
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>
      )}

      <Modal open={open} setOpen={setOpen}>
        <div>
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 text-tx-primary">
                Pagamento realizado
                <br />
                {numberToCurrent(value)}
              </h3>
              <div className="mt-2 text-left">
                <p className="text-sm text-gray-500">
                  <h2 className="mb-5 mt-5 text-lg">Dados da conta debitada</h2>
                  <div>
                    <h2>Nome</h2>
                    <h3>{user.name}</h3>
                  </div>

                  <div className="mt-5 flex">
                    <div>
                      <h2>Agência</h2>
                      <h3>{userAccount?.agency}</h3>
                    </div>

                    <div className="ml-28">
                      <h2>Conta</h2>
                      <h3>{userAccount?.number}</h3>
                    </div>
                  </div>

                  <h2 className="mb-5 mt-5 text-lg">Dados do pagamento</h2>

                  <div>
                    <h2>Linha Digitável</h2>
                    <h3>{data.digitLine}</h3>
                  </div>

                  <div className="mt-5">
                    <h2>Vencimento</h2>
                    <h3>{dayjs(data.expirationDate).format('DD/MM/YYYY')}</h3>
                  </div>

                  <div className="mt-5">
                    <h2>Beneficiario</h2>
                    <h3>{data.payerName}</h3>
                  </div>

                  <div className="mt-5 flex">
                    <div>
                      <h2>Documento</h2>
                      <h3>{documentFormat(data.payerDocument)}</h3>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2>ID da transação</h2>
                    <h3>{transactionId}</h3>
                  </div>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
              onClick={() => {
                setOpen(false)
                navigate('/receipt')
              }}
            >
              Ir para o extrato
            </button>

            <button
              type="button"
              className="py-2text-base mt-5 inline-flex w-full justify-center rounded-md border border-transparent px-4 font-medium text-black  shadow-sm sm:text-sm"
            >
              Comprovante disponível no extrato
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
