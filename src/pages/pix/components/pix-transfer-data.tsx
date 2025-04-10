import { FormEvent } from "react";
import IntlCurrencyInput from "@/components/input/react-intl-currency-input/IntlCurrencyInput";

import { documentFormat } from "@utils/document-format";
import { dateFormatWithHours } from "@utils/date-format";
import { addHyphenBeforePenultimateChar } from "@utils/format-account";

interface Props {
  value: number;
  agency: string;
  number: string;
  payerKey: string;
  document: string;
  bankName: string;
  accountName: string;
  handleChange: (
    event: FormEvent<Element>,
    value: number,
    maskedValue: string,
  ) => void;
}

export function PixTransferData({
  value,
  agency,
  number,
  payerKey,
  document,
  bankName,
  accountName,
  handleChange,
}: Props) {
  return (
    <div className='className="inline-flex min-w-full flex-col rounded-md rounded-bl-none rounded-br-none bg-[#eaeaea] p-6 md:min-w-[520px]'>
      <div className="flex w-full items-center justify-between pb-4">
        <span className="font-bold text-tx-primary">{accountName}</span>
        <span className="text-primary">{dateFormatWithHours(new Date())}</span>
      </div>

      <div className="flex w-full items-center gap-4 pb-4">
        <span className="text-primary">CPF/CNPJ</span>
        <span className="text-[var(--text-gray)]">
          {documentFormat(document)}
        </span>
      </div>

      <div className="flex w-full items-center gap-4 pb-4">
        <span className="text-primary">Banco</span>
        <span className="text-[var(--text-gray)]">{bankName}</span>
      </div>

      <div className="flex w-full items-center gap-4 pb-4">
        <span className="text-primary">Agência</span>
        <span className="text-[var(--text-gray)]">{agency}</span>
      </div>

      <div className="flex w-full items-center gap-4 pb-4">
        <span className="text-primary">Conta</span>
        <span className="text-[var(--text-gray)]">
          {addHyphenBeforePenultimateChar(number)}
        </span>
      </div>

      <div className="flex w-full items-center gap-4 pb-4">
        <span className="text-primary">Chave</span>
        <span className="text-[var(--text-gray)]">{payerKey}</span>
      </div>

      <div className="w-full items-center rounded-md bg-white p-4">
        <span className="mr-4 inline-block text-lg text-tx-primary">Valor</span>
        <IntlCurrencyInput
          currency="BRL"
          className="text-lg"
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
          value={value}
          onChange={(
            event: FormEvent<Element>,
            value: number,
            masked: string,
          ) => handleChange(event, value, masked)}
        />
      </div>
    </div>
  );
}
