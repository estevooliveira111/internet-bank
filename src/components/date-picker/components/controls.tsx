import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

interface Props {
  previousMonth: () => void
  nextMonth: () => void
}

export function Controls({ previousMonth, nextMonth }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={previousMonth}
        className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Último mês</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={nextMonth}
        className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Próximo mês</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  )
}
