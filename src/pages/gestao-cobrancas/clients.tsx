import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api, parseError } from '@/lib/axios'
import { documentFormat } from '@/utils/document-format'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useNotification } from '@/hooks/notification'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

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

export function GestaoCobrancaClients() {
  const [open, setOpen] = useState(false)
  const { showNotification, hidden } = useNotification()

  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFetched] = useState(true)

  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [zipcode, setZipcode] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  useEffect(() => {
    fetchClients()
  }, [])

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

  function renderSkeleton() {
    return (
      <div role="status" className="w-full animate-pulse">
        <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-50 dark:bg-gray-700"></div>
        <div className="h-2 max-w-[360px] rounded-full bg-gray-50 dark:bg-gray-700"></div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

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

  function clearForm() {
    setName('')
    setDocument('')
    setEmail('')
    setPhone('')
    setZipcode('')
    setStreet('')
    setNumber('')
    setComplement('')
    setNeighborhood('')
    setCity('')
    setUf('')
  }

  async function handleRegisterClient(event: React.FormEvent) {
    event.preventDefault()
    hidden()

    if (!name) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'O campo Nome é obrigatório.',
      })
      return
    }

    if (!document) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'O campo CPF/CNPJ é obrigatório.',
      })
      return
    }

    if (!email) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'O campo E-mail é obrigatório.',
      })
      return
    }

    if (!zipcode) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'O campo CEP é obrigatório.',
      })
      return
    }

    if (!street || !number || !neighborhood || !city || !uf) {
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: 'Os campo de endereço são obrigatórios.',
      })
      return
    }

    try {
      setLoading(true)
      await api.post('/invoices/clients', {
        document: document.replace(/[-,_]/g, ''),
        name,
        phone: phone ? `+55${phone.replace(/\D/g, '')}` : null,
        email,
        address: {
          street,
          number,
          neighborhood,
          city,
          state: uf,
          country: 'Brasil',
          zipCode: zipcode.replace(/[-,_]/g, ''),
        },
      })

      setOpen(() => false)
      clearForm()
      showNotification({
        type: 'success',
        title: 'Cliente cadastrado com sucesso.',
        message: 'O cliente foi cadastrado com sucesso.',
      })
      fetchClients()

      setTimeout(() => {
        hidden()
      }, 2000)
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

  useEffect(() => {
    const zp = zipcode.replace(/[-,_]/g, '')
    if (zp.length === 8) {
      handleZipcode(zp)
    }
  }, [zipcode])

  return (
    <>
      <div className="h-full min-h-screen p-8">
        <div className="flex w-full items-center gap-6 pb-2">
          <div className="w-1/2">
            <Input
              id="search-client"
              full
              noBottom
              placeholder="Busque por nome, CPF ou CNPJ"
              label=""
            />
          </div>
          <div className="pl-4">
            <Button title="Adicionar cliente" onClick={() => setOpen(true)} />
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
                      Cliente
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pb-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Informações
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pb-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Grupo
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
                    {clients?.map((client) => (
                      <tr key={client.id} className="shadow-md hover:shadow-lg">
                        <td className="whitespace-nowrap rounded-bl-md rounded-tl-md py-4 pl-4 text-sm font-medium text-gray-900">
                          {client.name}
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                          <div>{documentFormat(client.document)}</div>
                        </td>
                        <td className="whitespace-nowrap py-4 text-sm text-gray-500">
                          -
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
                                  <Menu.Item>
                                    {({ active }) => (
                                      <div
                                        // to={`/users/details/${client.id}`}
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'block px-4 py-2 text-sm',
                                        )}
                                      >
                                        Nenhuma ação disponível
                                      </div>
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
                      onSubmit={handleRegisterClient}
                    >
                      <div className="flex-1">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between space-x-3">
                            <div className="space-y-1">
                              <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                Novo Cliente
                              </Dialog.Title>
                              <p className="text-sm text-gray-500">
                                Cadastre um novo cliente para gerar cobranças
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
                          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Nome
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="name"
                                label=""
                                value={name}
                                onChange={(input) =>
                                  setName(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="document"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                CPF/CNPJ
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="document"
                                label=""
                                mask="document"
                                onChange={(input) =>
                                  setDocument(input.target.value)
                                }
                                value={document}
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                E-mail
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="email"
                                label=""
                                value={email}
                                onChange={(input) =>
                                  setEmail(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Celular{' '}
                                <span className="text-xs text-gray-500">
                                  (Opcional)
                                </span>
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="phone"
                                label=""
                                mask="(99) 99999-9999"
                                value={phone}
                                onChange={(input) =>
                                  setPhone(input.target.value)
                                }
                              />
                            </div>
                          </div>

                          {/* Project description */}
                          <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                            <div>
                              <label
                                htmlFor="zipcode"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                CEP
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="zipcode"
                                label=""
                                mask="99999-999"
                                value={zipcode}
                                onChange={(input) =>
                                  setZipcode(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="street"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Logradouro
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="street"
                                label=""
                                value={street}
                                onChange={(input) =>
                                  setStreet(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="number"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Número
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="number"
                                label=""
                                value={number}
                                onChange={(input) =>
                                  setNumber(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="complement"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Complemento
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="complement"
                                label=""
                                value={complement}
                                onChange={(input) =>
                                  setComplement(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="neighborhood"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Bairro
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="neighborhood"
                                label=""
                                value={neighborhood}
                                onChange={(input) =>
                                  setNeighborhood(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Cidade
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="city"
                                label=""
                                value={city}
                                onChange={(input) =>
                                  setCity(input.target.value)
                                }
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="uf"
                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                              >
                                Estado
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <Input
                                id="city"
                                label=""
                                value={uf}
                                onChange={(input) => setUf(input.target.value)}
                              />
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
                            title="Salvar cliente"
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
    </>
  )
}
