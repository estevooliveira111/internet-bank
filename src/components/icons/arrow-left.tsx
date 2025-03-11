type Props = {
  color: string
  width?: number
  height?: number
}

export function ArrowLeftIcon({ color, width, height }: Props) {
  return (
    <svg
      width={width || 14}
      height={height || 24}
      viewBox="0 0 14 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.474 10.425l9.95-9.95a1.62 1.62 0 112.292 2.291L3.912 11.57l8.804 8.804a1.62 1.62 0 01-2.292 2.291l-9.95-9.95A1.615 1.615 0 010 11.57c0-.414.158-.83.474-1.145z"
        fill={color}
      />
    </svg>
  )
}
