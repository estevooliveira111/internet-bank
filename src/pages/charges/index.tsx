import { documentFormat } from '@/utils/document-format'
import dayjs from 'dayjs'
import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import { Skeleton } from '../../components/skeleton'
import { useNotification } from '../../hooks/notification'
import { api, parseError } from '../../lib/axios'
import { numberToCurrent } from '../../utils/number-to-currency'

export interface Billet {
  id: string
  user_id: string
  ref_id: string
  amount: number
  numeric_line: string
  due_date: string
  url: string
  status: string
  paid_at: string
  client_name: string
  client_document: string
  created_at: string
  updated_at: string
}

export function Charges() {
  const [loading, setLoading] = useState(true)
  const [billets, setBillets] = useState<Billet[]>([])
  const { showNotification, hidden } = useNotification()

  useEffect(() => {
    fetchBilltes()
  }, [])

  async function fetchBilltes() {
    try {
      const { data } = await api.get('/billets')
      setBillets(data.billets)
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

  return (
    <div className="w-full p-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex h-32 flex-1 flex-col justify-between rounded-lg bg-[var(--green)] px-[16px] py-[14px]">
          <p className="text-white">Pagos</p>
          <span className="text-3xl text-white">R$ **</span>
        </div>
        <div className="flex h-32 flex-1 flex-col justify-between rounded-lg bg-main-red px-[16px] py-[14px]">
          <p className="text-white">Atrasados</p>
          <span className="text-3xl text-white">R$ **</span>
        </div>
        <div className="flex h-32 flex-1 flex-col justify-between rounded-lg bg-[var(--yellow)] px-[16px] py-[14px]">
          <p className="text-white">Em Aberto</p>
          <span className="text-3xl text-white">R$ **</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Link to="/charge/charge-billet">
          <button className="rounded-lg bg-primary px-4 py-2 text-white">
            Nova cobrança
          </button>
        </Link>
      </div>

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
                      Vencimento
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Cliente
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Valor
                    </th>

                    <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {billets.map((billet) => (
                    <tr key={billet.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                        {dayjs(billet.due_date).format('DD/MM/YYYY')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm ">
                        {billet.client_name ? (
                          <span>{billet.client_name}</span>
                        ) : (
                          <span>-</span>
                        )}

                        {billet.client_document && (
                          <span>
                            {' | '}
                            {documentFormat(billet.client_document)}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm ">
                        {billet.status === 'UNPAID' ? 'Em Aberto' : 'Pago'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm ">
                        {numberToCurrent(billet.amount)}
                      </td>

                      <td className="relative flex whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <CopyToClipboard
                          text={billet.url}
                          onCopy={() => {
                            showNotification({
                              type: 'success',
                              title: 'Copiado',
                              message: 'Link do PDF copiado com sucesso',
                            })

                            setTimeout(() => {
                              hidden()
                            }, 1000)
                          }}
                        >
                          <Copy className="w-4 cursor-pointer text-primary" />
                        </CopyToClipboard>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
