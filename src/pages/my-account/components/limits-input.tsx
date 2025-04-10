import { clsx } from 'clsx'
import { FormEvent, InputHTMLAttributes } from 'react'

import IntlCurrencyInput from '@/components/input/react-intl-currency-input/IntlCurrencyInput'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  value: string | number
  handleChange: (
    event: FormEvent<Element>,
    value: number,
    masked: string,
  ) => void
}

export function LimitsInput({ title, value, handleChange, ...props }: Props) {
  return (
    <div
      className={clsx(
        'mt-2 w-full max-w-sm items-center rounded-md border border-main-gray p-4 sm:col-span-3',
        props.disabled
          ? 'cursor-not-allowed bg-gray-100/70'
          : 'bg-green-100/70',
      )}
    >
      <p className="mr-4 inline-block w-full text-lg text-tx-primary">
        {title}
      </p>
      <IntlCurrencyInput
        currency="BRL"
        className="text-lg disabled:cursor-not-allowed"
        config={{
          locale: 'pt-BR',
          formats: {
            number: {
              BRL: {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            },
          },
        }}
        value={Number(value)}
        onChange={handleChange}
        disabled={props.disabled}
      />
    </div>
  )
}
