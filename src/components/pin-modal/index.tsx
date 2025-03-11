import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AlertTriangle } from 'lucide-react'

import { api, parseError } from '@lib/axios'
import { useNotification } from '@hooks/notification'

export function PinModal() {
  const [pinValue, setPinValue] = useState('')
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  const { showNotification } = useNotification()

  async function handleValidatePin() {
    try {
      setLoading(true)
      if (!pinValue || pinValue.length !== 4) {
        showNotification({
          type: 'error',
          title: 'Erro ao continuar.',
          message: 'É preciso informar a senha.',
        })
        return
      }
      await api.post('/users/pin', {
        pin: pinValue,
      })

      setOpen(false)
    } catch (err) {
      const error = parseError(err)
      showNotification({
        type: 'error',
        title: 'Erro ao cadastrar pin.',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
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
                        Cadastre o seu pin!
                      </Dialog.Title>
                      <AlertTriangle
                        className="pb-1 text-yellow-500"
                        stroke-width={2}
                      />
                    </div>
                    <div className="mt-2.5">
                      <p className="text-sm text-gray-500">
                        Para realizar transações, cadastre uma senha de 4
                        dígitos. Essa senha vai manter suas operações seguras e
                        fáceis de acessar!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 pt-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={handleValidatePin}
                    disabled={loading}
                  >
                    Cadastrar
                  </button>
                  <input
                    type="password"
                    maxLength={4}
                    className="w-full rounded-lg bg-gray-100 px-3 py-2"
                    placeholder="Digite sua senha de 4 dígitos aqui!"
                    value={pinValue}
                    onChange={(e) => setPinValue(e.target.value)}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
