import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'
import { clsx } from 'clsx'
import InputMask from 'react-input-mask'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  mask?: string
  full?: boolean
  bg?: boolean
  noBottom?: boolean
  className?: string
}
export function Input({
  full,
  bg,
  id,
  label,
  mask,
  noBottom,
  className,
  ...props
}: Props) {
  return (
    <div
      className={`${
        noBottom ? 'mb-0' : 'mb-6'
      } rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0
      ${full ? 'w-full' : 'max-w-sm'}
      ${bg ? 'bg-gray-100' : 'bg-transparent'}
      ${className || ''}
      `}
    >
      <label
        htmlFor={id}
        className={clsx(
          'block text-base font-medium text-tx-primary',
          props.disabled && 'cursor-not-allowed',
        )}
      >
        {label}
      </label>
      {mask ? (
        <>
          {mask === 'document' ? (
            <CpfCnpj
              type="text"
              name="document"
              id="document"
              className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0 disabled:cursor-not-allowed"
              {...props}
            />
          ) : (
            <InputMask
              mask={mask}
              maskChar={''}
              name={id}
              id={id}
              className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0 disabled:cursor-not-allowed"
              {...props}
            />
          )}
        </>
      ) : (
        <input
          name={id}
          id={id}
          className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0 disabled:cursor-not-allowed"
          autoComplete="off"
          {...props}
        />
      )}
    </div>
  )
}
