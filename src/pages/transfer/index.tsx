import { FormEvent, useState } from 'react'
import { Button } from '../../components/button'
import { ArrowLeftIcon } from '../../components/icons/arrow-left'
import { Input } from '../../components/input'
import { InputSelect, SelectObject } from '../../components/input/selected'
import { banks } from '../../utils/banks'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../../hooks/notification'
import { dateFormatWithHours } from '../../utils/date-format'
import IntlCurrencyInput from 'react-intl-currency-input'
import { api, parseError } from '../../lib/axios'
import { Modal } from '../../components/modal'
import { CheckIcon } from 'lucide-react'
import { useAuth } from '../../hooks/auth'
import { documentFormat } from '../../utils/document-format'

export function Transfer() {
  const navigate = useNavigate()
  const { showNotification, hidden } = useNotification()

  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [bankSelected, setBankSelected] = useState<SelectObject>(banks[0])
  const [agency, setAgency] = useState('')
  const [account, setAccount] = useState('')

  const [password, setPassword] = useState('')

  const [value, setValue] = useState(0)
  const [maskedValue, setMaskedValue] = useState('0,00')

  const [step, setStep] = useState(1)

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const { user, account: userAccount, getUser } = useAuth()

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

    if (!name || !document || !bankSelected || !agency || !account) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'Todos os campos são obrigatórios.',
      })
      return
    }

    if (bankSelected.id === '') {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'Todos os campos são obrigatórios.',
      })
    }

    setStep(2)
  }

  async function handleTransfer() {
    try {
      hidden()
      setLoading(true)
      if (!value || value === 0) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'É preciso informar um valor.',
        })
        return
      }

      if (!password || password.length !== 4) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'É preciso informar a senha.',
        })
      }

      const { data } = await api.post('transfer', {
        accountType: 'CC',
        bank: String(bankSelected.id),
        agency,
        account,
        document: document.replace(/\D/g, ''),
        clientName: name,
        amount: value,
      })
      setTransactionId(data.transaction)
      setOpen(true)
      setStep(1)
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao transferir.',
        message: error.message,
      })
    } finally {
      setLoading(false)
      setTimeout(() => {
        getUser()
      }, 1000)
    }
  }

  function addHyphenBeforePenultimateChar(inputString: string): string {
    if (typeof inputString !== 'string' || inputString.length < 2) {
      return inputString
    }

    const penultimateIndex = inputString.length
    const modifiedString =
      inputString.slice(0, penultimateIndex - 1) +
      '-' +
      inputString.slice(penultimateIndex - 1)

    return modifiedString
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
        <h1 className="text-2xl text-[var(--text-primary)]">
          {step === 1 ? 'Dados do favorecido' : 'Confirme e transfira'}
        </h1>
      </div>
      {step === 1 && (
        <form
          onSubmit={handleSubmit}
          className="inline-flex  w-full flex-col  rounded p-8"
        >
          <div>
            <Input
              label="Nome do favorecido"
              id="name"
              onChange={(input) => setName(input.target.value)}
              value={name}
            />

            <Input
              label="CPF/CNPJ"
              id="document"
              mask="document"
              onChange={(input) => setDocument(input.target.value)}
              value={document}
            />

            <InputSelect
              label="Banco"
              selected={bankSelected}
              options={banks}
              onChange={setBankSelected}
              onSearch="Digite um banco para pesquisar"
            />

            <Input
              label="Agência"
              id="agency"
              mask="9999"
              onChange={(input) => setAgency(input.target.value)}
              value={agency}
            />
            <Input
              label="Conta com dígito (só números)"
              id="account"
              onChange={(input) => setAccount(input.target.value)}
              value={account}
            />
          </div>

          <Button
            title={step === 1 ? 'Próximo' : 'Transferir'}
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
              <span className="font-bold text-[var(--text-primary)]">
                {name}
              </span>
              <span className="text-[var(--primary)]">
                {dateFormatWithHours(new Date())}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-[var(--primary)]">CPF/CNPJ</span>
              <span className="text-[var(--text-gray)]">{document}</span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-[var(--primary)]">Banco</span>
              <span className="text-[var(--text-gray)]">
                {bankSelected.name}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-[var(--primary)]">Agência</span>
              <span className="text-[var(--text-gray)]">{agency}</span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-[var(--primary)]">Conta</span>
              <span className="text-[var(--text-gray)]">
                {addHyphenBeforePenultimateChar(account)}
              </span>
            </div>

            <div className="w-full items-center rounded-md bg-white p-4">
              <span className="mr-4 inline-block text-xl text-[var(--text-primary)]">
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
                value={value}
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
                  className="block text-xl font-medium leading-6 text-[var(--text-primary)]"
                >
                  Senha (4 dígitos)
                </label>
                <div className="relative mt-2">
                  <input
                    name="password"
                    id="password"
                    className="peer block w-full border-0 bg-gray-50 py-1.5 text-[var(--text-primary)] focus:ring-0 sm:text-sm sm:leading-6 md:p-4"
                    placeholder="****"
                    maxLength={4}
                    type="password"
                    value={password}
                    onChange={(input) => setPassword(input.target.value)}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-[var(--primary)]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              title={'Transferir'}
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
              <h3 className="text-lg font-medium leading-6 text-[var(--text-primary)]">
                Transferência realizada
                <br />
                {maskedValue}
              </h3>
              <div className="mt-2 text-left">
                <p className="text-sm text-gray-500">
                  <h2 className="mb-5 mt-5 text-lg">Dados da conta debitada</h2>
                  <div>
                    <h2>Nome</h2>
                    <h3>{user.name}</h3>
                  </div>

                  {/* <div className="mt-5">
                    <h2>Documento</h2>
                    <h3>{documentFormat(user.document)}</h3>
                  </div> */}

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

                  <h2 className="mb-5 mt-5 text-lg">Dados do favorecido</h2>

                  <div>
                    <h2>Nome</h2>
                    <h3>{name}</h3>
                  </div>

                  <div className="mt-5">
                    <h2>Documento</h2>
                    <h3>{documentFormat(document)}</h3>
                  </div>

                  <div className="mt-5">
                    <h2>Banco</h2>
                    <h3>{bankSelected.name}</h3>
                  </div>

                  <div className="mt-5 flex">
                    <div>
                      <h2>Agência</h2>
                      <h3>{agency}</h3>
                    </div>

                    <div className="ml-28">
                      <h2>Conta</h2>
                      <h3>{addHyphenBeforePenultimateChar(account)}</h3>
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
