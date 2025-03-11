import { Link } from 'react-router-dom'

import { ArrowRightIcon } from '@components/icons/arrow-right'
import { ChargeIcon } from '@components/icons/charge'
import { DepositIcon } from '@components/icons/deposit'
import { Skeleton } from '@components/skeleton'

import { Transaction } from '@utils/description'
import { numberToCurrent } from '@utils/number-to-currency'

import { Order } from '../styles'

interface Props {
  loading: boolean
  transactions: Transaction[]
}

export function Orders({ loading, transactions }: Props) {
  return (
    <div className="rounded-lg bg-main-white" style={{ gridArea: 'orders' }}>
      <div className="flex justify-between border-b border-gray-light px-8 py-6">
        <span className="text-base font-[var(--semiBold)] text-primary">
          Últimos lançamentos
        </span>
        <Link to="/receipt">
          <p className="text-sm font-[var(--regular)] text-primary">
            Ver extrato completo
          </p>
        </Link>
      </div>
      <div className="flex flex-col p-8">
        <Skeleton isActive={loading} repeat={3} />
        {transactions.map((transaction) => (
          <Order key={transaction.id}>
            <div className="flex items-center">
              <div className="relative mr-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-light">
                {transaction.type === 'credit' ? (
                  <DepositIcon color="var(--green)" />
                ) : (
                  <ChargeIcon color="var(--red)" />
                )}
              </div>

              <div>
                <span className="text-xs font-[var(--regular)] text-main-gray">
                  {transaction.type === 'credit' ? 'Crédito' : 'Débito'}
                </span>
                <p className="text-base font-[var(--regular)] text-tx-primary">
                  {transaction?.description || transaction.payer}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="mr-[10px] text-sm font-[var(--regular)] text-tx-primary">
                {numberToCurrent(Number(transaction.amount))}
              </p>
              <ArrowRightIcon color="var(--text-primary)" />
            </div>
          </Order>
        ))}
      </div>
    </div>
  )
}
