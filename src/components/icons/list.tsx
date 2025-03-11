type Props = {
  color: string
}

export function ListIcon({ color }: Props) {
  return (
    <svg
      width={32}
      height={16}
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={12} cy={4} r={4} fill={color} />
      <circle cx={2} cy={4} r={2} fill={color} />
    </svg>
  )
}
