type Props = {
  color: string
  opacity?: number
}

export function LogoutIcon({ color, opacity }: Props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        opacity={opacity || 1}
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
      >
        <path d="M15.193 6.118L12.61 3.537a.665.665 0 10-.94.94l2.58 2.582c.078.079.145.166.2.26-.01 0-.018-.005-.027-.005l-10.439.021a.666.666 0 000 1.331l10.434-.021c.02 0 .034-.01.052-.01a1.33 1.33 0 01-.222.307l-2.582 2.581a.665.665 0 10.942.941l2.581-2.581a2.662 2.662 0 000-3.765h.003z" />
        <path d="M4.659 14.655H3.328A1.997 1.997 0 011.33 12.66V3.34c0-1.102.894-1.996 1.997-1.996h1.33a.666.666 0 000-1.331h-1.33A3.332 3.332 0 000 3.34v9.318a3.332 3.332 0 003.328 3.327h1.33a.666.666 0 000-1.33z" />
      </g>
    </svg>
  )
}
