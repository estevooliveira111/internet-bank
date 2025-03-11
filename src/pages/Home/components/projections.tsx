import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import { endOfMonth, format } from 'date-fns'

import { useBalance } from '@hooks/balance'

import { DepositIcon } from '@components/icons/new/deposit'
import { ChargeIcon } from '@components/icons/new/charge'

import { cn } from '@utils/cn'

export function Projections() {
  const { isBalanceVisible } = useBalance()

  const [index, setIndex] = useState(0)
  const days = [7, 14, 21, 30]

  const handleButtonClick = () => {
    setIndex((prevState) => (prevState + 1) % days.length)
  }

  const input = '***'
  const output = '***'
  // const inputNumber = parseFloat(input.replace('.', '').replace(',', '.'))
  // const outputNumber = parseFloat(output.replace('.', '').replace(',', '.'))

  // const result = inputNumber - outputNumber

  // const formattedResult = new Intl.NumberFormat('pt-BR', {
  //   style: 'currency',
  //   currency: 'BRL',
  // }).format(result)

  const now = new Date()
  const lastDayOfMonth = endOfMonth(now)
  const formatted = format(lastDayOfMonth, 'dd/MM')

  return (
    <div className="flex w-full flex-col rounded-lg bg-main-white">
      <div className="relative after:absolute after:bottom-0 after:top-0 after:mb-auto after:mt-auto after:h-4 after:w-1 after:bg-primary after:content-['']">
        <div className="flex justify-between border-b border-gray-light px-8 py-6">
          <span className="text-base font-semibold text-tx-primary">
            Projeção
          </span>
          <button onClick={handleButtonClick} className="flex items-center">
            <p className="mr-2 text-sm font-regular text-main-gray">
              {days[index]} dias
            </p>
            <ArrowDownUp className="mb-0.5 h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
      <div className="mx-4 flex flex-1 flex-col justify-between ">
        <div>
          <div
            role="button"
            className="group flex cursor-pointer items-center justify-between rounded p-4 hover:bg-gray-50"
          >
            <div>
              <span className="text-sm font-[var(--regular)] text-tx-primary">
                Recebimentos Futuros
              </span>
              <p className="text-sm font-[var(--regular)] text-primary">
                R$ {isBalanceVisible ? input : '***'}
              </p>
            </div>
            <div className="relative mr-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-light group-hover:border-green-400/70">
              <DepositIcon className="h-5 w-5 text-main-green" />
            </div>
          </div>

          <div className="h-px w-full border-b border-l-gray-light " />

          <div
            role="button"
            className="group flex cursor-pointer items-center justify-between rounded px-4 py-4 hover:bg-gray-50"
          >
            <div>
              <span className="text-sm font-[var(--regular)] text-tx-primary">
                Pagamentos Futuros
              </span>
              <p className="text-sm font-[var(--regular)] text-primary">
                R$ {isBalanceVisible ? output : '***'}
              </p>
            </div>
            <div className="relative mr-4 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-light group-hover:border-red-300/70">
              <ChargeIcon className="h-5 w-5 text-red-400/70" />
            </div>
          </div>
        </div>

        <div
          role="button"
          className="mb-4 cursor-pointer rounded p-4 hover:bg-gray-100"
        >
          <span
            className={cn(
              'text-xl font-[var(--regular)] text-primary',
              // result >= 0 ? 'text-green-400/90' : 'text-red-400/90',
              !isBalanceVisible && '!text-primary',
            )}
          >
            {isBalanceVisible ? '***' : '***'}
          </span>
          <p className="text-xs font-regular text-main-gray">
            Saldo previsto para o dia {formatted}
          </p>
        </div>
      </div>
    </div>
  )
}
