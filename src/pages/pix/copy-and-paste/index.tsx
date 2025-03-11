import { HelpCircle } from 'lucide-react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { useAuth } from '@/hooks/auth'

import { Input } from '@components/input'
import { Button } from '@components/button'
import { GoBack } from '@components/go-back'
import { PasswordInput } from '@components/pix/password-input'

import { PixReceipt } from '@pages/pix/components/pix-receipt'
import { PixTransferData } from '@pages/pix/components/pix-transfer-data'
import { usePixCopyAndPaste } from '@pages/pix/copy-and-paste/use-copy-and-paste-controller'

export function PixCopyAndPaste() {
  const { user } = useAuth()

  const {
    addFavorite,
    handleChange,
    handleSubmit,
    loading,
    open,
    setAddFavorite,
    setPassword,
    setPixCopyAndPasteCode,
    setPixInfo,
    setStep,
    step,
    pixCopyAndPasteCode,
    password,
    pixInfo,
    qrcodeData,
    setOpen,
    value,
  } = usePixCopyAndPaste()

  return (
    <div className="h-full min-h-screen p-8">
      <GoBack
        step={step}
        setStep={setStep}
        pageTitle="Realizar Pix Copia e Cola"
        pageTwoTitle="Confirme os Dados do Pagamento"
      />

      {step === 1 && (
        <form
          onSubmit={handleSubmit}
          className="inline-flex w-full flex-col rounded bg-white  p-8 md:w-3/4"
        >
          <h1 className="text-xl">Realizar Pix</h1>

          <ReactTooltip
            anchorSelect="#question"
            className="custom-tooltip flex flex-wrap p-2"
          >
            O código costuma se parecer com este:
            <br />
            <br />
            00020101021226850014br.gov.bcb.pix0136[CHAVE_PIX]
            <br />
            52040000530398654040.005802BR5908[TITULAR]
            <br />
            6008[CIDADE]62070503***6304[CRCC]
          </ReactTooltip>
          <div className="flex items-start">
            <span className="mb-6 mt-2 text-tx-primary">
              Insira o código do Pix Copia e Cola
            </span>
            <HelpCircle
              id="question"
              className="ml-2 mt-2 h-5 w-5 cursor-pointer text-gray-600 outline-none"
            />
          </div>

          <div>
            <Input
              full
              label="Cole o código aqui!"
              id="pix-copy-and-paste-code"
              onChange={(input) => setPixCopyAndPasteCode(input.target.value)}
              value={pixCopyAndPasteCode}
            />
          </div>

          <Button
            title={step === 1 ? 'Próximo' : 'Pagar'}
            type="submit"
            disabled={loading}
            loading={loading}
          />
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="md:max-w-[620px]">
          <PixTransferData
            payerKey={qrcodeData.key}
            value={value}
            agency={qrcodeData.branch}
            number={qrcodeData.accountNumber}
            document={qrcodeData.document}
            bankName={qrcodeData.merchantName}
            accountName={qrcodeData.name}
            handleChange={handleChange}
          />

          <PasswordInput
            password={password}
            setPassword={setPassword}
            pixInfo={pixInfo}
            setPixInfo={setPixInfo}
            addFavorite={addFavorite}
            setAddFavorite={setAddFavorite}
            disabled={true}
          />

          <div className="mt-6 flex justify-end">
            <Button
              title={'Pagar'}
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>
      )}

      <PixReceipt
        open={open}
        setOpen={setOpen}
        name={qrcodeData.name}
        value={qrcodeData.value}
        agency={''}
        number={qrcodeData.accountNumber}
        payerName={user.name}
        transactionId={qrcodeData.txId}
        payerDocument={qrcodeData.document}
      />
    </div>
  )
}
