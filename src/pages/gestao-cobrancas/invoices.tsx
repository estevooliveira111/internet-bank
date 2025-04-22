import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api, parseError } from '@/lib/axios'
import { FormEvent, Fragment, useEffect, useState } from 'react'
import { Menu, Transition, Dialog, Combobox } from '@headlessui/react'
import {
  EllipsisVerticalIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'
import { numberToCurrent } from '@/utils/number-to-currency'
// import { useCustomer } from '@/hooks/customer'
import { dateFormat, formatDateToYYYYMMDD } from '@/utils/date-format'
import { useNotification } from '@/hooks/notification'
import IntlCurrencyInput from '@/components/input/react-intl-currency-input/IntlCurrencyInput'
import validateDate from '@/utils/date-validation'
import { documentFormat } from '@/utils/document-format'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export interface Pix {
  emv: string
  qrcode: string
}

export interface BankSlip {
  digitable_line: string
  barcode: string
  barcode_image: string
}

export interface Receiver {}

export interface Address {
  zip_code: string
  street: string
  neighborhood: string
  number: string
  complement?: string
  city: string
  state: string
  country: string
}

export interface Client {
  id: string
  name: string
  document: string
  address: Address
}

export interface Invoice {
  id: string
  due_date: string
  order_id: string
  ref_id: string
  total: number
  transaction_number: string
  status: string
  paid_at?: string | Date
  credited_at?: string | Date
  url: string
  method: string
  payment_method: string | null
  total_paid: number
  pix: Pix
  bank_slip: BankSlip
  receiver: Receiver
  client: Client
}

export function GestaoCobrancaInvoices() {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { showNotification, hidden } = useNotification()
  const [clients, setClients] = useState<Client[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFetched] = useState(true)
  // const { customer } = useCustomer()
  const [amount, setAmount] = useState(0)
  const [maskedValue, setMaskedValue] = useState('0,00')

  const [amountMulta, setAmountMulta] = useState(0)
  const [, setMaskedValueMulta] = useState('0,00')

  const [multa, setMulta] = useState(false)

  const [invoice, setInvoice] = useState<Invoice | null>(null)

  const [dueDate, setDueDate] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClients()
    fetchInvoices()
  }, [])

  async function fetchInvoices() {
    api
      .get('/invoices')
      .then(({ data }) => {
        setInvoices(data.invoices)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  async function fetchClients() {
    api
      .get('/invoices/clients')
      .then(({ data }) => {
        setClients(data.clients)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<Client | null>(null)

  const filteredPeople =
    query === ''
      ? clients
      : clients.filter((client) => {
          return client.name.toLowerCase().includes(query.toLowerCase())
        })

  function renderSkeleton() {
    return (
      <div role="status" className="w-full animate-pulse">
        <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-50 dark:bg-gray-700"></div>
        <div className="h-2 max-w-[360px] rounded-full bg-gray-50 dark:bg-gray-700"></div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  function getStatus(status: string) {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'paid':
        return 'Pago'
      case 'canceled':
        return 'Cancelado'
      case 'expired':
        return 'Expirado'
      default:
        return 'Pendente'
    }
  }

  function getStatusClass(status: string) {
    switch (status) {
      case 'pending':
        return 'text-yellow-500'
      case 'paid':
        return 'text-green-500'
      case 'canceled':
        return 'Cancelado'
      case 'expired':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  function handleMulta(checked: boolean) {
    setMulta(checked)
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

  const handleChangeMulta = (
    event: FormEvent,
    value: number,
    maskedValue: string,
  ) => {
    event.preventDefault()

    setAmountMulta(value)
    setMaskedValueMulta(maskedValue)
  }

  function clearForm() {
    setAmount(0)
    setSelectedPerson(null)
    setDueDate('')
  }

  async function handleGenerateInvoice(event: React.FormEvent) {
    event.preventDefault()
    hidden()

    if (!selectedPerson) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso selecionar um cliente.',
      })
      return
    }

    if (!selectedPerson?.id) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso selecionar um cliente.',
      })
      return
    }

    if (!amount || amount === 0) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso informar um valor.',
      })
      return
    }

    if (amount < 5) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'O valor precisa ser maior que R$ 5,00.',
      })
      return
    }

    if (!validateDate(dueDate)) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'É preciso informar uma data válida',
      })
      return
    }

    const raw = {
      client_id: selectedPerson.id,
      amount,
      due_date: formatDateToYYYYMMDD(dueDate),
    }

    try {
      setLoading(true)
      const { data } = await api.post(`invoices`, raw)
      setInvoice(data.invoice)
      clearForm()
      setOpen(false)
      fetchInvoices()
      setOpenModal(true)
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
      <div className="h-full min-h-screen p-8">
        <div className="mb-4 flex w-full items-center justify-end">
          <div className="pl-4">
            <Button title="Adicionar Cobrança" onClick={() => setOpen(true)} />
          </div>
        </div>

        {/* <div className="flex w-full"></div> */}

        <>
          <div className="flow-root overflow-x-auto">
            <div className="mb-8 inline-block min-w-full max-w-full align-middle">
              <table className="-mt-4 w-full border-separate border-spacing-y-4">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="by-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Fatura ID
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pb-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Cliente
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pb-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pb-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Valor
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 pb-3 text-center text-sm font-semibold text-gray-900"
                    >
                      Forma de pagamento
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pb-3 text-center text-sm font-semibold text-gray-900"
                    >
                      Vencimento
                    </th>

                    <th scope="col" className="relative pb-3.5 pl-3 pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                {isLoading && (
                  <tbody className="bg-white">
                    {[1, 2, 3, 4].map((skeleton) => (
                      <tr key={skeleton} className="shadow-md hover:shadow-lg">
                        <td className="whitespace-nowrap rounded-bl-md rounded-tl-md py-4 pl-6 text-sm font-medium text-gray-900">
                          {renderSkeleton()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {renderSkeleton()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {renderSkeleton()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {renderSkeleton()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-bold">
                          {renderSkeleton()}
                        </td>
                        <td className="relative whitespace-nowrap rounded-br-md rounded-tr-md py-4 pl-3 pr-6 text-right text-sm">
                          {renderSkeleton()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}

                {!isLoading && isFetched && (
                  <tbody className="bg-white">
                    {invoices?.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="shadow-md hover:shadow-lg"
                      >
                        <td className="whitespace-nowrap rounded-bl-md rounded-tl-md py-4 pl-4 text-sm font-medium text-gray-900">
                          {invoice.id}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                          <div>{invoice?.client?.name}</div>
                        </td>
                        <td
                          className={`whitespace-nowrap py-4 text-sm text-gray-500 ${getStatusClass(
                            invoice?.status,
                          )}`}
                        >
                          {getStatus(invoice?.status)}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                          {numberToCurrent(invoice.total)}
                        </td>

                        <td className="whitespace-nowrap py-4 text-center text-sm text-gray-500">
                          {invoice?.payment_method
                            ? invoice?.payment_method
                            : '-'}
                        </td>

                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                          {dateFormat(invoice?.due_date)}
                        </td>

                        <td className="relative whitespace-nowrap rounded-br-md rounded-tr-md py-4 pl-3 pr-6 text-right text-sm">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                <span className="sr-only">Open options</span>
                                <EllipsisVerticalIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  {/* <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href={`${customer?.ib}/u/checkout/${invoice.id}`}
                                        target="_bank"
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                        )}
                                      >
                                        Visualizar Fatura
                                      </a>
                                    )}
                                  </Menu.Item> */}

                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href={invoice?.url}
                                        target="_bank"
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                        )}
                                      >
                                        Visualizar PDF
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <form
                      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                      onSubmit={handleGenerateInvoice}
                    >
                      <div className="flex-1">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                Nova Cobrança
                              </Dialog.Title>
                              <p className="text-sm text-gray-500">
                                Cadastre um nova cobrança
                              </p>
                            </div>
                            <div className="flex h-7 items-center">
                              <button
                                type="button"
                                className="relative text-gray-400 hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Divider container */}

                        <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                          <div className="space-y-2 px-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <Combobox
                                as="div"
                                value={selectedPerson}
                                onChange={setSelectedPerson}
                              >
                                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                  <span className="text-base">
                                    Selecione o cliente
                                  </span>
                                </Combobox.Label>
                                <div className="relative mt-2">
                                  <Combobox.Input
                                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(event) =>
                                      setQuery(event.target.value)
                                    }
                                    displayValue={(person: Client) =>
                                      person?.name
                                    }
                                  />
                                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </Combobox.Button>

                                  {filteredPeople.length > 0 && (
                                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {filteredPeople.map((person) => (
                                        <Combobox.Option
                                          key={person.id}
                                          value={person}
                                          className={({ active }) =>
                                            classNames(
                                              'relative cursor-default select-none py-2 pl-8 pr-4',
                                              active
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-900',
                                            )
                                          }
                                        >
                                          {({ active, selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? 'font-semibold'
                                                    : ''
                                                }`}
                                              >
                                                {person.name}
                                              </span>

                                              {selected && (
                                                <span
                                                  className={classNames(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active
                                                      ? 'text-white'
                                                      : 'text-indigo-600',
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              )}
                                            </>
                                          )}
                                        </Combobox.Option>
                                      ))}
                                    </Combobox.Options>
                                  )}
                                </div>
                              </Combobox>
                            </div>

                            <div>
                              {/* Form */}
                              <div className="mt-6 border-b border-gray-300 pb-2">
                                <span className="block pb-2 text-base">
                                  Valor
                                </span>
                                <IntlCurrencyInput
                                  currency="BRL"
                                  className="w-full text-3xl"
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

                              <div className="mt-4">
                                <Input
                                  name="due-date"
                                  label="Vencimento"
                                  id="due-date"
                                  mask="99/99/9999"
                                  className="rounded-none border-0 border-b shadow-none"
                                  placeholder="31/12/2023"
                                  value={dueDate}
                                  onChange={(input) =>
                                    setDueDate(input.target.value)
                                  }
                                />
                              </div>

                              <fieldset>
                                <legend className="sr-only">Multa</legend>
                                <div className="space-y-5">
                                  <div className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                      <input
                                        id="comments"
                                        aria-describedby="comments-description"
                                        name="comments"
                                        type="checkbox"
                                        checked={multa}
                                        onChange={(input) =>
                                          handleMulta(input.target.checked)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                      <label
                                        htmlFor="comments"
                                        className="font-medium text-gray-900"
                                      >
                                        Multa
                                      </label>
                                      <p
                                        id="comments-description"
                                        className="text-gray-500"
                                      >
                                        Selecione se deseja aplicar multa
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {multa && (
                                  <div className="mb-3 mt-4 border-b border-gray-300 pb-2">
                                    <span className="block pb-2 text-base">
                                      Valor da multa
                                    </span>
                                    <IntlCurrencyInput
                                      currency="BRL"
                                      className="w-full text-3xl"
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
                                      value={amountMulta}
                                      onChange={(
                                        event: FormEvent<Element>,
                                        value: number,
                                        masked: string,
                                      ) =>
                                        handleChangeMulta(event, value, masked)
                                      }
                                    />
                                  </div>
                                )}
                              </fieldset>

                              <fieldset>
                                <legend className="sr-only">Pix</legend>
                                <div className="space-y-5">
                                  <div className="relative flex items-start">
                                    <div className="flex h-6 items-center">
                                      <input
                                        id="pix"
                                        aria-describedby="comments-description"
                                        name="pix"
                                        type="checkbox"
                                        checked
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                      <label
                                        htmlFor="pix"
                                        className="font-medium text-gray-900"
                                      >
                                        Habilitar Pix
                                      </label>
                                      <p
                                        id="pix-description"
                                        className="text-gray-500"
                                      >
                                        Selecione se habilitar a cobrança por
                                        Pix
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={() => setOpen(false)}
                          >
                            Cancelar
                          </button>
                          <Button
                            type="submit"
                            title="Criar Cobrança"
                            loading={loading}
                          />
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Modal */}
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3  sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-center text-base font-semibold leading-6 text-gray-900"
                      >
                        Fatura gerada com sucesso!
                      </Dialog.Title>
                      <div className="mt-2 text-center">
                        <h2>{maskedValue}</h2>
                      </div>
                      <div className="mt-2">
                        <div>
                          <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                              Cliente
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                              {invoice?.client?.name}
                            </p>
                          </div>

                          <div className="px-4 pt-2 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                              CPF/CNPJ
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                              {documentFormat(invoice?.client?.document || '')}
                            </p>
                          </div>

                          <div className="px-4 pt-2 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                              Endereço
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                              {invoice?.client?.address?.street},{' '}
                              {invoice?.client?.address?.number},{' '}
                              {invoice?.client?.address?.neighborhood},{' '}
                              {invoice?.client?.address?.city} {' - '}{' '}
                              {invoice?.client?.address?.state}
                            </p>
                          </div>

                          <div className="px-4 pt-2 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                              Link do PDF
                            </h3>
                            <CopyToClipboard
                              text={invoice?.url || ''}
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
                              <Button
                                title={'Copiar link do PDF'}
                                type="button"
                              />
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpenModal(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
