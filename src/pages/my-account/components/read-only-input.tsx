import IntlCurrencyInput from "@/components/input/react-intl-currency-input/IntlCurrencyInput";

interface Props {
  title: string;
  value: string | number;
}

export function ReadOnlyInput({ title, value }: Props) {
  return (
    <div className="mt-2 w-full max-w-sm cursor-not-allowed items-center rounded-md border border-main-gray bg-gray-100/70 p-4 sm:col-span-3">
      <p className="mr-4 inline-block w-full text-lg text-tx-primary">
        {title}
      </p>
      <IntlCurrencyInput
        currency="BRL"
        className="cursor-not-allowed text-lg"
        config={{
          locale: "pt-BR",
          formats: {
            number: {
              BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            },
          },
        }}
        value={Number(value)}
        disabled={true}
      />
    </div>
  );
}
