import { ChevronRight, Copy } from 'lucide-react'
import { Link } from 'react-router-dom'

import { QrcodeIcon } from '@components/icons/new/qrcode'
import { PixIcon } from '@components/icons/new/pix'
import { PixKeyIcon } from '@components/icons/new/pix-key'
import { useCustomer } from '@/hooks/customer'

export function Pix() {
  const { customer } = useCustomer()

  return (
    <div className="h-full min-h-screen p-8">
      <div className="flex flex-wrap gap-6 rounded">
        <Link
          to="/pix/transfer"
          className="flex w-full cursor-pointer flex-col justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
        >
          <PixIcon className="h-12 w-12 text-primary" />
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex w-20 self-end">Transferir</span>
            <ChevronRight className="h-8 w-8 text-primary" strokeWidth={2.2} />
          </div>
        </Link>

        {customer.display_name !== 'BANDEC' && (
          <Link
            to="/pix/keys/show-many"
            className="flex w-full cursor-pointer flex-col justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
          >
            <PixKeyIcon className="h-12 w-12 text-primary" />
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex w-3/4 self-end">Minhas Chaves</span>
              <ChevronRight
                className="h-8 w-8 text-primary"
                strokeWidth={2.2}
              />
            </div>
          </Link>
        )}

        <Link
          to="/deposit/qrcode"
          className="flex w-full cursor-pointer flex-col justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
        >
          <QrcodeIcon className="h-12 w-12 text-primary" />
          <div className="mt-4 flex items-end justify-between">
            <span className="inline-flex text-tx-primary">
              Cobrar por QR Code
            </span>
            <ChevronRight className="h-8 w-8 text-primary" strokeWidth={2.2} />
          </div>
        </Link>

        <Link
          to="/pix/transfer/copy-and-paste"
          className="flex w-full cursor-pointer flex-col  justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
        >
          <Copy className="h-12 w-12 text-primary" />
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex w-3/4 self-end">Pix Copia e Cola</span>
            <ChevronRight className="h-8 w-8 text-primary" strokeWidth={2.2} />
          </div>
        </Link>
      </div>
    </div>
  )
}
