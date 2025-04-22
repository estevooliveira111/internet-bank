import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../components/icons/arrow-right'
import { DepositIcon } from '../../components/icons/deposit'
import { PaymentIcon } from '../../components/icons/payment'
import { PixIcon } from '../../components/icons/pix'
import { useCustomer } from '@/hooks/customer'

export function DepositList() {
  const { customer } = useCustomer()
  return (
    <div className="h-full min-h-screen p-8">
      <div className="flex flex-wrap gap-6 rounded">
        {customer.display_name !== 'BANDEC' && (
          <Link
            to="/pix/keys/show-many"
            className="flex w-full cursor-pointer flex-col justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
          >
            <PixIcon color="var(--primary)" width={48} height={48} />
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex w-20">Depósito por Pix</span>
              <ArrowRightIcon color="var(--primary)" width={21} height={21} />
            </div>
          </Link>
        )}

        {customer.display_name !== 'BANDEC' && (
          <Link
            to="/deposit/ted"
            className="flex w-full cursor-pointer flex-col  justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
          >
            <DepositIcon color="var(--primary)" width={48} height={48} />
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex w-3/4">Depósito por TED ou DOC</span>
              <ArrowRightIcon color="var(--primary)" width={21} height={21} />
            </div>
          </Link>
        )}

        {customer.display_name !== 'BANDEC' && (
          <Link
            to="/deposit/billet/new"
            className="flex w-full cursor-pointer flex-col justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
          >
            <PaymentIcon color="var(--primary)" width={48} height={48} />
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex w-20 text-tx-primary">
                Depósito por Boleto
              </span>
              <ArrowRightIcon color="var(--primary)" width={21} height={21} />
            </div>
          </Link>
        )}

        <Link
          to="/deposit/qrcode"
          className="flex w-full cursor-pointer flex-col justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
        >
          <PaymentIcon color="var(--primary)" width={48} height={48} />
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex w-[100px] text-tx-primary">
              Depósito por QR Code
            </span>
            <ArrowRightIcon color="var(--primary)" width={21} height={21} />
          </div>
        </Link>
      </div>
    </div>
  )
}
