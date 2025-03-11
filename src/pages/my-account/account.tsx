import { ChangeEvent } from 'react'

import { useAuth } from '@hooks/auth'
import { cn } from '@utils/cn'

import { MyAccountHeader } from '@pages/my-account/components/header'
import { MyAccountInput } from '@pages/my-account/components/input'
import { MyAccountInputLock } from '@pages/my-account/components/input-lock'
import { MyAccountInputPassword } from '@pages/my-account/components/input-password'
import { SaveButton } from '@pages/my-account/components/save-button'

import { useAccount } from '@pages/my-account/use-account-controller'

export function Account() {
  const { user } = useAuth()

  const {
    loading,
    editPersonal,
    email,
    phone,
    phoneCodeSent,
    phoneValidationCode,
    setEditPersonal,
    setPhone,
    setPhoneValidationCode,
    isPasswordVisible,
    ísPinVisible,
    editAddress,
    zipCode,
    setZipCode,
    state,
    setState,
    city,
    setCity,
    neighborhood,
    setNeighborhood,
    street,
    setStreet,
    number,
    setNumber,
    complement,
    setComplement,
    setEditAddress,
    editSecurity,
    setEditSecurity,
    setIsPasswordVisible,
    setIsPinVisible,
    password,
    setPassword,
    pin,
    setPin,
    isPasswordSelected,
    setIsPasswordSelected,
    isPinSelected,
    setIsPinSelected,
    handleSubmit,
  } = useAccount()

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <MyAccountHeader
            title="Dados Pessoais"
            subtitle="Dados pessoais e informações de contato."
            edit={editPersonal}
            setEdit={setEditPersonal}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <MyAccountInputLock label="Nome" title={user.name} />

            <MyAccountInputLock
              label="CPF/CNPJ"
              title={user.document}
              isTypeDocument
            />

            <MyAccountInputLock label="E-mail" title={email} />

            <div className="sm:col-span-3">
              <div
                className={cn(
                  'mt-2 max-w-sm',
                  editPersonal && 'cursor-not-allowed',
                )}
              >
                <MyAccountInput
                  mask={'99 (99) 99999-9999'}
                  id="phone"
                  label="Telefone"
                  disabled={editPersonal}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="true"
                  full
                />

                {phoneCodeSent && (
                  <MyAccountInput
                    id="phone-code"
                    label="Confirme o código :"
                    disabled={editPersonal || !phoneCodeSent}
                    value={phoneValidationCode}
                    onChange={(e) => setPhoneValidationCode(e.target.value)}
                    maxLength={6}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <MyAccountHeader
            title="Endereço"
            subtitle="Endereço de cobrança e entrega."
            edit={editAddress}
            setEdit={setEditAddress}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <MyAccountInput
              mask="99999-999"
              id="cep"
              label="CEP"
              disabled={editAddress}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              full
            />

            <MyAccountInput
              id="city"
              label="Cidade"
              disabled={editAddress}
              value={`${city} - ${state}`}
              onChange={(e) => {
                const value = e.target.value
                const [newCity, newState] = value.split(' - ')
                setCity(newCity)
                setState(newState)
              }}
              full
            />

            <MyAccountInput
              id="bairro"
              label="Bairro"
              disabled={editAddress}
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              full
            />

            <MyAccountInput
              id="rua"
              label="Rua"
              disabled={editAddress}
              value={`${street}, nº ${number}`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value
                if (value.split(', nº ').length === 2) {
                  setStreet(value.split(', nº ')[0])
                  setNumber(value.split(', nº ')[1])
                } else {
                  setStreet(value)
                }
              }}
              full
            />

            <MyAccountInput
              id="complement"
              label="Complemento"
              disabled={editAddress}
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              full
            />
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <MyAccountHeader
            title="Segurança"
            subtitle="Senha da conta e PIN transacional."
            edit={editSecurity}
            setEdit={setEditSecurity}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <MyAccountInputPassword
              id="password"
              label="Senha"
              disabled={editSecurity}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onClick={() => setIsPasswordSelected((state) => !state)}
              onBlur={() => setIsPasswordSelected(false)}
              isVisible={isPasswordVisible}
              setVisible={setIsPasswordVisible}
              selected={isPasswordSelected}
              info="password"
            />
            <MyAccountInputPassword
              id="pin"
              label="PIN"
              disabled={editSecurity}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onClick={() => setIsPinSelected((state) => !state)}
              onBlur={() => setIsPinSelected(false)}
              isVisible={ísPinVisible}
              setVisible={setIsPinVisible}
              selected={isPinSelected}
              info="pin"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SaveButton loading={loading} handleSubmit={handleSubmit} />
      </div>
    </form>
  )
}
