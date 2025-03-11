import { Pencil } from 'lucide-react'

interface Props {
  title: string
  subtitle: string
  edit?: boolean
  noIcon?: boolean
  setEdit?: (value: boolean) => void
}

export function MyAccountHeader({
  title,
  subtitle,
  edit,
  noIcon,
  setEdit,
}: Props) {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{subtitle}</p>
      </div>
      {!noIcon && (
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded bg-primary shadow-sm hover:opacity-90"
          onClick={() => setEdit!(!edit)}
        >
          <Pencil className="h-5 w-5 text-main-white" />
        </button>
      )}
    </div>
  )
}
