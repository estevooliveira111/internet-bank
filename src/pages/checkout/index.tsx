/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNotification } from '@hooks/notification'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useCustomer } from '@/hooks/customer'
import { documentFormat } from '@/utils/document-format'
import { dateFormat } from '@/utils/date-format'
import { numberToCurrent } from '@/utils/number-to-currency'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

// const newWindow = window as any
// const Iugu = newWindow?.Iugu

export interface Pix {
  emv: string
  qrcode: string
}

export interface BankSlip {
  digitable_line: string
  barcode: string
  barcode_image: string
}

export interface Address {
  zip_code: string
  street: string
  neighborhood: string
  number: string
  complement?: string | null
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
  paid_at: string
  credited_at?: string | null
  url: string
  method: string
  payment_method: string
  total_paid: number
  pix: Pix
  bank_slip: BankSlip
  client: Client
  receiver: {
    name: string
    document: string
  }
}

interface Option {
  id: number
  title: string
  description: string
}

export function Checkout() {
  const params = useParams()
  const { showNotification } = useNotification()
  const { customer } = useCustomer()

  const [invoice, setInvoice] = useState<Invoice>({} as Invoice)
  const [mailingLists, setMailingLists] = useState<Option[]>([])

  const [selectedMailingLists, setSelectedMailingLists] = useState<Option>(
    {} as Option,
  )

  useEffect(() => {
    api
      .get(`/invoice?id=${params?.id}`)
      .then(({ data }) => {
        setInvoice(data.invoice)

        const options = []
        if (data.invoice?.method?.includes('pix')) {
          options.push({
            id: 1,
            title: 'Pix',
            description:
              'O Pix é a nova modalidade de transferências do banco central, que funcionam 24 horas por dia e possuem confirmação em tempo real.',
          })
        }
        if (data.invoice?.method?.includes('bank_slip')) {
          options.push({
            id: 2,
            title: 'Boleto Bancário',
            description: '',
          })
        }
        if (data.invoice?.method?.includes('credit_card')) {
          options.push({
            id: 3,
            title: 'Cartão de Crédito',
            description: '',
          })
        }

        setMailingLists(options)
        setSelectedMailingLists(options[1])
      })
      .catch((err) => {
        console.log(err)
        showNotification({
          type: 'error',
          title: 'Fatura não encontrada.',
          message: 'Não foi possível encontrar a fatura.',
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id])

  // const Iugu = useIugu('61323D8C24D6440598E6CF997079CEA0')

  useEffect(() => {
    // Iugu.setAccountID('61323D8C24D6440598E6CF997079CEA0')
    // Iugu.setTestMode(true)
    // Iugu.setup()
    // const cc = Iugu.CreditCard(
    //   '4111111111111111',
    //   '12',
    //   '2030',
    //   'Nome',
    //   'Sobrenome',
    //   '123',
    // )
    // Iugu.createPaymentToken(cc, function (response) {
    //   console.log(response)
    //   if (response.errors) {
    //     alert('Erro salvando cartão')
    //   } else {
    //     alert('Token criado:' + response.id)
    //   }
    // })
  }, [])

  return (
    <div className="h-full w-full bg-white pb-20">
      {invoice?.status === 'paid' && (
        <div className="flex items-center gap-x-6 bg-green-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <p className="text-sm leading-6 text-white">
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>

            <strong className="font-semibold">Fatura Paga</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
          </p>
          <div className="flex flex-1 justify-end"></div>
        </div>
      )}
      <div className="m-auto max-w-6xl px-4 pt-10">
        <img
          className="mb-10"
          src={customer.logo.dark}
          style={{ maxWidth: 120 }}
          alt={customer.display_name}
        />

        <hr />

        <div className="mt-4 flex justify-between">
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
                {documentFormat(invoice?.client?.document)}
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
          </div>

          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Fatura
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {invoice?.id}
              </p>
            </div>

            <div className="px-4 pt-2 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Vencimento
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {dateFormat(invoice?.due_date)}
              </p>
            </div>

            <div className="px-4 pt-2 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Valor
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {numberToCurrent(invoice.total)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4"></div>
        <hr />

        {invoice?.status !== 'paid' && (
          <div>
            <div className="mt-10">
              <RadioGroup
                value={selectedMailingLists}
                onChange={setSelectedMailingLists}
              >
                <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
                  <div className="flex justify-between">
                    <span>Pagar com:</span>
                    <a
                      href={invoice?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Imprimir
                    </a>
                  </div>
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  {mailingLists.map((mailingList) => (
                    <RadioGroup.Option
                      key={mailingList.id}
                      value={mailingList}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'border-[var(--brand-background)] ring-2 ring-[var(--brand-background)]'
                            : 'border-gray-300',
                          'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {mailingList.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {mailingList.description}
                              </RadioGroup.Description>
                              {/* <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {mailingList.users}
                              </RadioGroup.Description> */}
                            </span>
                          </span>
                          <CheckCircleIcon
                            className={classNames(
                              !checked ? 'invisible' : '',
                              'h-5 w-5 text-[var(--brand-background)]',
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked
                                ? 'border-[var(--brand-background)]'
                                : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-lg',
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="mt-10">
              {selectedMailingLists.id === 1 && (
                <div>
                  <h2 className="mb-4 text-xl">Pix</h2>
                  <hr />
                  <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
                    <img
                      className="rounded border-2 border-[var(--brand-background)]"
                      src={invoice?.pix?.qrcode}
                      alt=""
                      style={{ maxWidth: 250 }}
                    />
                    <p className="break-all	">{invoice?.pix?.emv}</p>
                  </div>
                </div>
              )}

              {selectedMailingLists.id === 2 && (
                <div className="pb-30 ">
                  <div className="w-4xl max-w-4xl" id="invoice-billet">
                    <h2 className="mb-4 text-xl">Boleto Bancário</h2>
                    <hr />

                    <div className="mt-4 flex w-full">
                      <div className="p-2">
                        <img
                          src={customer.logo.dark}
                          alt=""
                          className="mb-2 w-20"
                        />
                      </div>
                      <div className="flex flex-1 items-center border-b border-l p-2 text-lg tracking-wide">
                        {invoice.bank_slip.digitable_line}
                      </div>
                    </div>

                    <div className="mt-2 flex border-b border-l">
                      <div className="mr-2 flex-1 pb-2 pl-3 pt-3">
                        <span className="text-sm text-gray-400">
                          LOCAL DE PAGAMENTO
                        </span>
                        <div>Pagável em qualquer banco ou lotérica.</div>
                      </div>
                      <div className="ml-2 w-[160px] border-l border-r pb-3 pl-3 pt-3">
                        <span className="text-sm text-gray-400">
                          NOSSO NÚMERO
                        </span>
                        <div>27748123</div>
                      </div>
                    </div>

                    <div className="mt-2 flex border-b border-l">
                      <div className="flex-1 pb-2 pl-3 pt-3">
                        <div className="flex gap-10">
                          <div>
                            <span className="text-sm text-gray-400">
                              BENEFICIÁRIO
                            </span>
                            <div className="flex flex-col">
                              <span>{invoice?.receiver?.name}</span>
                              <span>
                                {documentFormat(invoice?.receiver?.document)}
                              </span>
                            </div>
                          </div>

                          <div className="pl-20">
                            <span className="text-sm text-gray-400">
                              SACADOR/AVALISTA
                            </span>
                            <div className="flex flex-col">
                              <span>{invoice?.receiver?.name}</span>
                              <span>
                                {documentFormat(invoice?.receiver?.document)}
                              </span>
                              {/* <span>
                                {invoice.client.address.street},{' '}
                                {invoice.client.address.number}
                              </span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-[160px] border-l border-r pb-3 pl-3 pt-3">
                        <span className="text-sm text-gray-400">
                          VENCIMENTO
                        </span>
                        <div>{dateFormat(invoice?.due_date)}</div>
                      </div>
                    </div>

                    <div className="mt-2 flex border-b border-l">
                      <div className="flex-1 pb-2 pl-3 pt-3">
                        <span className="text-sm text-gray-400">
                          INSTRUÇÕES
                        </span>
                        <div>Não receber após 30 dias vencido.</div>
                      </div>
                      <div className="w-[160px] border-l border-r pb-3 pl-3 pt-3">
                        <span className="text-sm text-gray-400">
                          VALOR DO DOC.
                        </span>
                        <div>{numberToCurrent(invoice?.total)}</div>
                      </div>
                    </div>

                    <div className="mt-2 flex border-b border-l">
                      <div className="flex-1 pb-2 pl-3 pt-3">
                        <span className="text-sm text-gray-400">CLIENTE</span>
                        <div className="flex flex-col">
                          <span>{invoice?.client?.name}</span>
                          <span>
                            {documentFormat(invoice?.client?.document)}
                          </span>
                        </div>
                      </div>
                      <div className="w-[160px] border-l border-r pb-3 pl-3 pt-3">
                        <span className="text-sm text-gray-400">
                          MULTA/JUROS
                        </span>
                        {/* <div>{numberToCurrent(invoice?.total)}</div> */}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center pt-2">
                      <div className="text-gray-400">
                        Use este código de barras para pagamentos no bankline
                      </div>
                      <div>{invoice.bank_slip.digitable_line}</div>
                      <img src={invoice.bank_slip.barcode_image} alt="" />
                    </div>

                    {/* <div className="flex">
                      <div className="flex-1 border-b border-l">left</div>
                      <div className="w-[100px]">right</div>
                    </div> */}
                  </div>
                </div>
              )}

              {selectedMailingLists.id === 3 && <div>Cartão</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
