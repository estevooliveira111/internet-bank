import { X } from 'lucide-react'

interface Props {
  title: string
  onCloseModal: () => void
}

export function PixReceiptHeader({ title, onCloseModal }: Props) {
  return (
    <div className="absolute left-0 top-0 h-[4.5rem] w-full bg-dark-blue">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex w-max items-center">
          <div className="h-4 w-1 bg-primary" />
          <h1 className="ml-5 text-gray-light">{title}</h1>
        </div>
        <span
          className="mr-5 text-gray-light"
          role="button"
          onClick={onCloseModal}
        >
          <X className="h-7 w-7 text-gray-light" />
        </span>
      </div>
    </div>
  )
}
