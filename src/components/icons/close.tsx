type Props = {
  color: string
}

export function CloseIcon({ color }: Props) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.675 10.926L1.76 17.84 0 16.08l6.914-6.914L0 2.252 1.76.492l6.915 6.913L15.589.491l1.76 1.76-6.914 6.915 6.914 6.914-1.76 1.76-6.914-6.914z"
        fill={color}
      />
    </svg>
  )
}
