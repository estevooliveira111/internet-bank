import { Skeleton } from '@components/skeleton'

interface Props {
  title: string
  value: string
  color: string
  text?: string
}

export function Card({ title, value, color, text = '#fff' }: Props) {
  return (
    <div
      style={{
        backgroundColor: color,
        color: text,
      }}
      className="relative flex h-24 flex-1 flex-col justify-between rounded-lg px-4 py-3 after:absolute after:left-0 after:h-6 after:w-1 after:bg-black after:bg-opacity-30 after:content-[''] md:h-32"
    >
      <p className="desktop:text-lg text-base font-light md:text-xs lg:text-sm lg:font-light">
        {title}
      </p>
      <span className="desktop:text-[32px] text-3xl font-semibold md:text-2xl lg:text-[28px]">
        {value !== '' ? value : <Skeleton slim={true} isActive={true} />}
      </span>
    </div>
  )
}
