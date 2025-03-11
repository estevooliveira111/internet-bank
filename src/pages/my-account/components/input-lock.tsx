import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { Lock } from 'lucide-react'

interface Props {
  label: string
  title: string
  isTypeDocument?: boolean
}

export function MyAccountInputLock({ label, title, isTypeDocument }: Props) {
  return (
    <div className="sm:col-span-3">
      <div className="mb-6 mt-2 max-w-sm cursor-not-allowed rounded-md border border-main-gray bg-gray-50 px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
        <div className="flex items-center justify-between">
          <label
            htmlFor="name"
            className="block cursor-not-allowed text-base font-medium text-tx-primary"
          >
            {label}
          </label>
          <Lock className="h-4 w-4 text-main-gray" />
        </div>
        {isTypeDocument && (
          <CpfCnpj
            type="text"
            name="document"
            id="document"
            disabled
            value={title}
            className="block h-auto w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0 disabled:cursor-not-allowed"
          />
        )}
        {!isTypeDocument && (
          <input
            name="name"
            id="name"
            value={title}
            disabled
            className="block h-auto w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0 disabled:cursor-not-allowed"
            autoComplete="off"
          />
        )}
      </div>
    </div>
  )
}
