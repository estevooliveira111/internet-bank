/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AlertTriangle, UploadCloud } from 'lucide-react'

import { api, parseError } from '@lib/axios'
import { useNotification } from '@hooks/notification'
import { Loading } from '../loading'

export function UploadDocs() {
  const [open] = useState(true)
  const [loadingContractSocial, setLoadingContractSocial] = useState(false)
  const { showNotification, hidden } = useNotification()

  const [sendContractSocial, setSendContractSocial] = useState(false)

  async function handleContractSocial(event: any) {
    const fileType = event.target?.files[0]?.type

    if (
      fileType !== 'image/png' &&
      fileType !== 'image/jpeg' &&
      fileType !== 'image/jpg' &&
      fileType !== 'application/pdf'
    ) {
      showNotification({
        type: 'error',
        title: 'Arquivo inválido.',
        message: 'Só é permitido arquivos do tipo PDF, PNG, JPG ou JPEG.',
      })
    }

    try {
      setLoadingContractSocial(true)
      hidden()
      const formData = new FormData()
      formData.append('file', event.target?.files[0])
      await api.post('/documents?type=ARTICLES_OF_INCORPORATION', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setSendContractSocial(true)
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao continuar.',
        message: error.message,
      })
    } finally {
      setLoadingContractSocial(false)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {}}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-center">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="flex h-6 w-full justify-start gap-3">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Envie seus documentos
                      </Dialog.Title>
                      <AlertTriangle
                        className="pb-1 text-yellow-500"
                        stroke-width={2}
                      />
                    </div>
                    <div className="mt-2.5">
                      <p className="text-sm text-gray-500">
                        Para continuar, precisamos que você envie seus
                        documentos para análise.
                      </p>
                    </div>
                  </div>
                </div>
                {sendContractSocial && (
                  <div className="mt-5">
                    Aguarde enquanto processamos a análise dos documentos.
                    Dentro de um 2 dias úteis, enviaremos a resposta diretamente
                    para o seu e-mail.
                  </div>
                )}
                {!sendContractSocial && (
                  <div>
                    <div className="mt-5">
                      <h2 className="mb-3">Faça o upload do contrato social</h2>
                      <div className="flex items-start gap-5">
                        <label
                          htmlFor="contract-social"
                          className="hover:bg-violet-25 group flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-300 px-6 py-4 text-center text-zinc-500 shadow-sm hover:border-primary hover:text-primary"
                        >
                          <div className="border-6 rounded-full border-zinc-50 bg-zinc-100 p-2 group-hover:border-violet-50 group-hover:bg-violet-100">
                            <UploadCloud className="h-5 w-5 text-zinc-600 group-hover:text-primary" />
                            {loadingContractSocial && (
                              <Loading isLoading={loadingContractSocial} />
                            )}
                          </div>

                          {sendContractSocial ? (
                            <span className="font-semibold text-primary">
                              Documento enviado com sucesso.
                            </span>
                          ) : (
                            <>
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-sm">
                                  <span className="font-semibold text-primary">
                                    Clique para fazer o envio
                                  </span>{' '}
                                  ou arraste e solte
                                </span>
                                <span className="text-xs">
                                  PNG, JPG ou JPEG
                                </span>
                              </div>
                            </>
                          )}
                        </label>

                        <input
                          type="file"
                          className="sr-only"
                          id="contract-social"
                          disabled={sendContractSocial}
                          onChange={handleContractSocial}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
