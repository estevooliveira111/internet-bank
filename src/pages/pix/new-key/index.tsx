import { Button } from '@components/button'
import { Input } from '@components/input'
import { InputSelect } from '@components/input/selected'
import { GoBack } from '@components/go-back'

import { useNewPixKey } from '@pages/pix/new-key/use-new-key-controller'

export function PixNewKey() {
  const {
    step,
    mask,
    setStep,
    loading,
    typeKey,
    keyValue,
    setTypeKey,
    setKeyValue,
    handleSubmit,
    // needsValidation,
    // confirmationCodeValue,
    // setConfirmationCodeValue,
  } = useNewPixKey()

  // const isValidKey = false // needsValidation

  return (
    <div className="h-full min-h-screen p-8">
      <GoBack
        setStep={setStep}
        step={step}
        pageTitle="Registrar nova chave Pix"
      />

      <form
        onSubmit={handleSubmit}
        className="inline-flex w-full flex-col rounded bg-white  p-8 md:w-3/4"
      >
        <h1 className="text-xl">Escolha o tipo de chave</h1>
        <div>
          <InputSelect
            label="Tipo de chave :"
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
          {typeKey.id !== '' && typeKey.id !== 'evp' && (
            <Input
              id={typeKey.id.toString()}
              mask={mask ?? undefined}
              label="Digite a chave :"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
            />
          )}
          {/* {isValidKey && (
            <Input
              id={typeKey.id.toString()}
              label="Código de confirmação :"
              maxLength={4}
              value={confirmationCodeValue}
              onChange={(e) => setConfirmationCodeValue(e.target.value)}
            />
          )} */}
        </div>
        <Button
          title={step === 1 ? 'Registrar' : 'Registrar'}
          type="submit"
          disabled={loading}
          loading={loading}
        />
      </form>
    </div>
  )
}
