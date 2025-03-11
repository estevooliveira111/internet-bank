import { cn } from '@utils/cn'

import { VisionEyeIcon } from '@components/icons/new/vision-eye'
import { UnVisionEyeIcon } from '@components/icons/new/unvision-eye'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  isVisible: boolean
  selected: boolean
  info: string
  setVisible: (isVisible: boolean) => void
}

export function MyAccountInputPassword({
  id,
  label,
  isVisible,
  setVisible,
  info,
  selected,
  ...props
}: Props) {
  function handleVisibility() {
    setVisible(!isVisible)
  }

  return (
    <>
      <div
        className={cn(
          'relative mb-6 mt-2 w-full max-w-sm rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0 sm:col-span-3',
          props.disabled
            ? 'cursor-not-allowed bg-gray-100/70'
            : 'bg-green-100/70',
        )}
      >
        <label
          htmlFor={id}
          className={cn('block text-base font-medium text-tx-primary', {
            'cursor-not-allowed': props.disabled,
          })}
        >
          {label}
        </label>
        <div className="flex items-center">
          <input
            name={id}
            id={id}
            type={isVisible ? 'text' : 'password'}
            className="block w-full border-0 bg-transparent p-0 text-tx-primary focus:ring-0 disabled:cursor-not-allowed"
            autoComplete="off"
            minLength={info === 'password' ? 8 : 4}
            maxLength={info === 'pin' ? 4 : 20}
            {...props}
          />
          <button
            type="button"
            onClick={handleVisibility}
            className={cn(
              'cursor-pointer border-none bg-none',
              props.disabled && 'pointer-events-none cursor-not-allowed',
            )}
          >
            {isVisible ? (
              <VisionEyeIcon className="h-5 w-5 text-primary" />
            ) : (
              <UnVisionEyeIcon className="h-5 w-5 text-primary" />
            )}
          </button>
        </div>
        {selected && (
          <p className="absolute bottom-[-70px] mt-2 h-full text-xs leading-6 text-gray-600">
            {info === 'pin' && (
              <span>
                - 4 dígitos númericos. <br />
                - Não pode conter caracteres especiais. <br />- Não podem ser
                sequênciais.
              </span>
            )}
            {info === 'password' && (
              <span>
                - Deve conter no mínimo 8 caracteres. <br />
                - Deve incluir pelo menos um caractere especial. <br />- Deve
                conter pelo menos uma letra maiúscula e uma minúscula.
              </span>
            )}
          </p>
        )}
      </div>
    </>
  )
}
