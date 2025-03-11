type Props = {
  color: string
  opacity?: number
}

export function ShareIcon({ color, opacity }: Props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity || 1}
        fill={color}
        fillRule="evenodd"
        d="M12.892 9.775a3.103 3.103 0 00-2.557 1.348L6.001 9.166a3.045 3.045 0 00.003-2.323l4.329-1.967a3.103 3.103 0 10-.551-1.76c.003.176.02.35.053.523L5.234 5.73a3.108 3.108 0 10-.01 4.547l4.613 2.083c-.032.172-.05.347-.052.522a3.108 3.108 0 103.107-3.107zm0-8.435a1.776 1.776 0 11.001 3.552 1.776 1.776 0 01-.001-3.552zM3.125 9.775a1.776 1.776 0 110-3.552 1.776 1.776 0 010 3.552zm9.767 4.883a1.776 1.776 0 110-3.552 1.776 1.776 0 010 3.552z"
        clipRule="evenodd"
      />
    </svg>
  )
}
