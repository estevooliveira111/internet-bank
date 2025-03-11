import { FormEvent } from 'react'
import IntlCurrencyInput from 'react-intl-currency-input'

import { Input } from '@components/input'
import { Button } from '@components/button'
import { InputSelect } from '@components/input/selected'
import { ArrowLeftIcon } from '@components/icons/arrow-left'

import { PasswordInput } from '@components/pix/password-input'
import { PixTransferReceipt } from '@pages/pix/components/pix-transfer-receipt'
import { usePixTransfer } from '@pages/pix/transfer/use-pix-transfer-controller'

import { documentFormat } from '@utils/document-format'
import { dateFormatWithHours } from '@utils/date-format'
import { addHyphenBeforePenultimateChar } from '@utils/format-account'

export function PixTransfer() {
  const {
    addFavorite,
    data,
    handleChange,
    handleBack,
    handleSubmit,
    key,
    loading,
    mask,
    maskedValue,
    open,
    password,
    pixInfo,
    setAddFavorite,
    setKey,
    setOpen,
    setPassword,
    setPixInfo,
    setStep,
    setTypeKey,
    step,
    transactionId,
    typeKey,
    userAccount,
    value,
  } = usePixTransfer()

  return (
    <div className="h-full min-h-screen p-8">
      <div className="mb-6 flex items-center ">
        <div
          onClick={() => {
            step === 1 ? handleBack() : setStep(1)
          }}
          className="mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-white hover:opacity-80"
        >
          <ArrowLeftIcon color="var(--primary)" width={10} />
        </div>
        <h1 className="text-2xl text-tx-primary">
          {step === 1 ? 'Dados do favorecido' : 'Confirme e transfira'}
        </h1>
      </div>
      {step === 1 && (
        <form
          onSubmit={handleSubmit}
          className="inline-flex  w-full flex-col rounded bg-white p-8"
        >
          <div>
            <InputSelect
              label="Tipo de chave"
              options={[
                { id: 'evp', name: 'Chave Aleatória', hidden: 'EVP' },
                { id: 'cpf', name: 'CPF', hidden: 'CPF' },
                { id: 'cnpj', name: 'CNPJ', hidden: 'CNPJ' },
                { id: 'email', name: 'E-mail', hidden: 'E-mail' },
                { id: 'phone', name: 'Celular', hidden: 'Celular' },
              ]}
              selected={typeKey}
              onChange={setTypeKey}
            />
          </div>

          <div>
            <Input
              mask={mask ?? undefined}
              label="Chave Pix"
              id="key"
              onChange={(input) => setKey(input.target.value)}
              value={key}
            />
          </div>

          <Button
            title={step === 1 ? 'Próximo' : 'Transferir'}
            type="submit"
            disabled={loading}
            loading={loading}
          />
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="md:max-w-[620px]">
          <div className='className="inline-flex min-w-full flex-col rounded-md rounded-bl-none rounded-br-none bg-[#eaeaea] p-6 md:min-w-[520px]'>
            <div className="flex w-full items-center justify-between pb-4">
              <span className="font-bold text-tx-primary">
                {data.account.name}
              </span>
              <span className="text-primary">
                {dateFormatWithHours(new Date())}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">CPF/CNPJ</span>
              <span className="text-[var(--text-gray)]">
                {documentFormat(data.account.documentNumber)}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Banco</span>
              <span className="text-[var(--text-gray)]">
                {data.bank.shortName}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Agência</span>
              <span className="text-[var(--text-gray)]">
                {data.account.agency}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Conta</span>
              <span className="text-[var(--text-gray)]">
                {addHyphenBeforePenultimateChar(data.account.number)}
              </span>
            </div>

            <div className="flex w-full items-center gap-4 pb-4">
              <span className="text-primary">Chave</span>
              <span className="text-[var(--text-gray)]">{data.key}</span>
            </div>

            <div className="w-full items-center rounded-md bg-white p-4">
              <span className="mr-4 inline-block text-lg text-tx-primary">
                Valor
              </span>
              <IntlCurrencyInput
                currency="BRL"
                className="text-lg"
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
                value={value}
                onChange={(
                  event: FormEvent<Element>,
                  value: number,
                  masked: string,
                ) => handleChange(event, value, masked)}
              />
            </div>
          </div>
          <PasswordInput
            pixInfo={pixInfo}
            setPixInfo={setPixInfo}
            password={password}
            setPassword={setPassword}
            addFavorite={addFavorite}
            setAddFavorite={setAddFavorite}
          />

          <div className="mt-6 flex justify-end">
            <Button
              title={'Transferir'}
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>
      )}
      <PixTransferReceipt
        open={open}
        setOpen={setOpen}
        name={data?.account?.name}
        agency={userAccount?.agency}
        number={userAccount?.number}
        bankName={`${data?.bank?.longName} - ${data?.bank?.code}`}
        docment={data?.account?.documentNumber}
        value={maskedValue}
        transactionId={transactionId}
      />
    </div>
  )
}
