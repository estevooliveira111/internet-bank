import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

interface Props {
  password: string
  setPassword: (password: string) => void
  pixInfo: string
  setPixInfo: (pixInfo: string) => void
  addFavorite: boolean
  setAddFavorite: (addFavorite: boolean) => void
  disabled?: boolean
}

export function PasswordInput({
  password,
  setPassword,
  pixInfo,
  setPixInfo,
  addFavorite,
  setAddFavorite,
  disabled,
}: Props) {
  return (
    <div className="w-full bg-white">
      <div className="p-6">
        <textarea
          value={pixInfo}
          onChange={(input) => setPixInfo(input.target.value)}
          className="mb-6 h-36 w-full rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm outline-none ring-0"
          placeholder="Descrição (opcional)"
        />
        <div className="flex justify-between">
          <div className="w-[300px]">
            <label
              htmlFor="password"
              className="block text-xl font-medium leading-6 text-tx-primary"
            >
              Senha (4 dígitos)
            </label>
            <div className="relative mt-2">
              <input
                name="password"
                id="password"
                className="block w-full rounded-lg border-0 bg-gray-50 py-1.5 text-tx-primary focus:ring-0 sm:text-sm sm:leading-6 md:p-4"
                placeholder="****"
                maxLength={4}
                type="password"
                value={password}
                onChange={(input) => setPassword(input.target.value)}
              />
              <div
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-primary"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="flex w-3/5 items-center justify-end gap-1 pt-8">
            <Checkbox.Root
              className="flex h-6 w-6 appearance-none items-center justify-center rounded border border-gray-300 bg-gray-100 shadow focus:shadow-lg disabled:cursor-not-allowed"
              id="check"
              disabled={disabled}
              onClick={() => setAddFavorite(!addFavorite)}
            >
              <Checkbox.Indicator className="text-dark-blue">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className="flex cursor-not-allowed flex-wrap pl-3 leading-none"
              htmlFor="check"
            >
              Deseja salvar como favorito?
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
