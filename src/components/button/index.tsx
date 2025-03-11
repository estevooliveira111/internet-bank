import { Loading } from '../loading'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  loading?: boolean
}
export function Button({ title, loading = false, ...props }: Props) {
  return (
    <div className="flex items-center">
      <button
        disabled={loading}
        className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2.5 text-center text-main-white md:w-auto md:min-w-[240px]"
        type="button"
        {...props}
      >
        {loading && <Loading isLoading={loading} />}
        {title}
      </button>
    </div>
  )
}
