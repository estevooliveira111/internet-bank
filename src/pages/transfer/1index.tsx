import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { SendIcon } from '@/components/icons/send'
// import { StricLogoNameIcon } from '@components/icons/stric-logoname'
import { ArrowRightIcon } from '@components/icons/arrow-right'
import { useCustomer } from '@/hooks/customer'

export function Transfer() {
  const { customer } = useCustomer()
  return (
    <div className="h-full min-h-screen p-8">
      <div className="flex flex-wrap gap-8 rounded">
        <Link
          to="/transfer/stric"
          className="flex w-full cursor-pointer flex-col justify-between rounded-md bg-white px-4 pb-4 pt-2 hover:opacity-75 md:h-48 md:w-64"
        >
          {/* <StricLogoNameIcon /> */}
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex w-20 text-gray-dark">
              Transferir para {customer?.display_name}
            </span>
            <ArrowRightIcon color="var(--primary)" width={21} height={21} />
          </div>
        </Link>

        <Link
          to="/transfer/other-banks"
          className="flex w-full cursor-pointer flex-col  justify-between rounded-md bg-white p-4 hover:opacity-75 md:h-48 md:w-64"
        >
          <SendIcon color="var(--primary)" width={48} height={48} />
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex w-3/4 font-medium text-gray-dark">
              Transferir para outros bancos
            </span>
            <ArrowRightIcon color="var(--primary)" width={21} height={21} />
          </div>
        </Link>

        <Link
          to="/transfer/new-beneficiary"
          className="flex w-full cursor-pointer flex-col  justify-between rounded-md bg-white pb-4 pl-2 pr-4 pt-2 hover:opacity-75 md:h-48 md:w-64"
        >
          <Plus color="var(--primary)" width={48} height={48} />
          <div className=" ml-2 mt-4 flex h-12 items-center justify-between">
            <span className="inline-flex w-3/4 font-medium text-gray-dark">
              Cadastrar Favorecido
            </span>
            <ArrowRightIcon color="var(--primary)" width={21} height={21} />
          </div>
        </Link>
      </div>
      <p className="mt-12 text-base text-gray-dark">
        Transferências solicitadas para outros bancos são processadas em até 1
        dia útil.
      </p>
    </div>
  )
}
