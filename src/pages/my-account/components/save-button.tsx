import { FormEvent } from 'react'

import { Loading } from '@components/loading'

interface Props {
  loading: boolean
  handleSubmit: (e: FormEvent<Element>) => void
}

export function SaveButton({ loading, handleSubmit }: Props) {
  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-3 text-center text-main-white hover:opacity-90 md:w-auto md:min-w-[240px]"
    >
      {loading && <Loading isLoading={loading} />}
      Salvar
    </button>
  )
}
