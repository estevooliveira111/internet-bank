import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from 'lucide-react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import { documentFormat } from '@utils/document-format'
import { numberToCurrent } from '@utils/number-to-currency'

import { PixReceiptHeader } from './pix-receipt-header'

interface Props {
  open: boolean
  name: string
  value: number
  agency: string
  number: string
  payerName: string
  payerDocument: string
  transactionId: string
  setOpen: (open: boolean) => void
}

export function PixReceipt({
  open,
  name,
  value,
  agency,
  number,
  payerName,
  payerDocument,
  transactionId,
  setOpen,
}: Props) {
  const navigate = useNavigate()

  function onCloseModal() {
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <Fragment>
                  <div>
                    <PixReceiptHeader
                      title="Transferência realizada com sucesso!"
                      onCloseModal={onCloseModal}
                    />

                    <div className="mx-auto mt-16 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 shadow">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-2">
                      <h3 className="text-lg font-medium leading-6 text-tx-primary">
                        Pagamento realizado
                        <br />
                        {numberToCurrent(value)}
                      </h3>
                      <div className="mt-2 text-left">
                        <p className="text-sm text-gray-600">
                          <h2 className="mb-5 mt-5 text-lg">
                            Dados da conta debitada
                          </h2>
                          <Fragment>
                            <h2 className="font-normal text-primary">Nome:</h2>
                            <h3>{name}</h3>
                          </Fragment>

                          <div className="mt-5 flex">
                            <div>
                              <h2 className="font-normal text-primary">
                                Agência:
                              </h2>
                              <h3>{agency}</h3>
                            </div>

                            <div className="ml-28">
                              <h2 className="font-normal text-primary">
                                Conta:
                              </h2>
                              <h3>{number}</h3>
                            </div>
                          </div>

                          <h2 className="mb-5 mt-5 text-lg">
                            Dados do pagamento
                          </h2>

                          <Fragment>
                            <h2 className="font-normal text-primary">
                              Beneficiario:
                            </h2>
                            <h3>{payerName}</h3>
                          </Fragment>

                          <div className="mt-5 flex">
                            <div className="flex">
                              <div>
                                <h2 className="font-normal text-primary">
                                  Documento:
                                </h2>
                                <h3>{documentFormat(payerDocument)}</h3>
                              </div>
                            </div>

                            <div className="ml-28">
                              <h2 className="font-normal text-primary">
                                ID da transação:
                              </h2>
                              <h3>{transactionId}</h3>
                            </div>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="mt-8 inline-flex w-full justify-center rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      onClick={() => {
                        setOpen(false)
                        navigate('/receipt')
                      }}
                    >
                      Ir para o extrato
                    </button>

                    <p className="inline-flex w-full justify-center px-4 py-2  text-base font-medium text-dark-blue focus:outline-none sm:text-sm">
                      Obs. o comprovante ficará disponível no extrato.
                    </p>
                  </div>
                </Fragment>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
