import IntlCurrencyInput from 'react-intl-currency-input'

interface Props {
  title: string
  value: string | number
}

export function ReadOnlyInput({ title, value }: Props) {
  const config = {
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
  }
  return (
    <div className="mt-2 w-full max-w-sm cursor-not-allowed items-center rounded-md border border-main-gray bg-gray-100/70 p-4 sm:col-span-3">
      <p className="mr-4 inline-block w-full text-lg text-tx-primary">
        {title}
      </p>
      <IntlCurrencyInput
        currency="BRL"
        className="cursor-not-allowed text-lg"
        config={config}
        value={value}
        disabled={true}
      />
    </div>
  )
}
