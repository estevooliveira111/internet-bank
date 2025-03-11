import clsx from 'clsx'
import InputMask from 'react-input-mask'
import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  mask?: string
  full?: boolean
}

export function MyAccountInput({ full, id, label, mask, ...props }: Props) {
  return (
    <div
      className={clsx(
        'mb-6 mt-2 max-w-sm rounded-md border border-main-gray  px-3 pb-1.5 pt-2.5 shadow-sm ring-0 sm:col-span-3',
        props.disabled
          ? 'cursor-not-allowed bg-gray-100/70'
          : 'bg-green-100/70',
        { 'w-full': full },
      )}
    >
      <label
        htmlFor={id}
        className={clsx('block text-base font-medium text-tx-primary', {
          'cursor-not-allowed': props.disabled,
        })}
      >
        {label}
      </label>
      {mask ? (
        mask === 'document' ? (
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
        )
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
