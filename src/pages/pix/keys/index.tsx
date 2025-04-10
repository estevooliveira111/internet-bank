import dayjs from 'dayjs'
import { Copy, Delete } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { NavButtons } from '@pages/pix/components/nav-buttons'
import { RemovePixKey } from '@pages/pix/components/remove-pix-key'
import { usePixKeys } from '@pages/pix/keys/use-pix-keys-controller'

import { useNotification } from '@hooks/notification'

import { Skeleton } from '@components/skeleton'

export function PixKeys() {
  const { showNotification, hidden } = useNotification()

  const {
    pixKeys,
    openConfirmDelete,
    navigate,
    loading,
    handleDelete,
    setOpenConfirmDelete,
    setPixDelete,
  } = usePixKeys()

  return (
    <div className="h-full min-h-screen p-8">
      <NavButtons navigate={navigate} />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto p-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full rounded-md bg-white py-2 align-middle sm:px-6 lg:px-8">
            {loading && (
              <div className="p-4">
                <Skeleton isActive={loading} repeat={4} />
              </div>
            )}
            {!loading && (
              <table className="min-w-full divide-y divide-gray-300 ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                    >
                      Data
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Chave
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Tipo de Chave
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Status
                    </th>

                    <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {pixKeys.map((key) => (
                    <tr key={key.key}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
                        {dayjs(key?.updated_at).format('DD/MM/YYYY')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm ">
                        {key.key}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm ">
                        {key.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm ">
                        {key.status === 'CONFIRMED' ? 'ativa' : 'pendente'}
                      </td>

                      <td className="relative flex whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <CopyToClipboard
                          text={key.key}
                          onCopy={() => {
                            showNotification({
                              type: 'success',
                              title: 'Copiado',
                              message: 'Chave copiada com sucesso',
                            })

                            setTimeout(() => {
                              hidden()
                            }, 1000)
                          }}
                        >
                          <Copy className="w-4 cursor-pointer text-primary" />
                        </CopyToClipboard>

                        <Delete
                          className="ml-4 w-4 cursor-pointer text-main-red"
                          onClick={() => {
                            setPixDelete(key)
                            setOpenConfirmDelete(true)
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <RemovePixKey
        loading={loading}
        handleDelete={handleDelete}
        openConfirmDelete={openConfirmDelete}
        setOpenConfirmDelete={setOpenConfirmDelete}
      />
    </div>
  )
}
