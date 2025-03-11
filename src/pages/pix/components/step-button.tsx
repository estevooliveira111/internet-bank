import { ComponentProps } from 'react'

import { cn } from '@utils/cn'

import { Loading } from '@components/loading'

interface Props extends ComponentProps<'button'> {
  loading?: boolean
}

export function StepButton({
  className,
  loading,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        'flex w-full items-center justify-center self-end rounded-md bg-primary px-3 py-3 text-center text-main-white md:w-auto md:min-w-[240px]',
        className,
      )}
    >
      {loading && <Loading isLoading={loading} />}
      {children}
    </button>
  )
}
