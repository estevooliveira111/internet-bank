type Props = {
  className?: string
}

export function SignoutIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="m15.193 6.118-2.581-2.581a.665.665 0 1 0-.941.94l2.581 2.582c.077.079.144.166.2.26-.01 0-.018-.005-.028-.005l-10.438.021a.666.666 0 0 0 0 1.331l10.434-.021c.019 0 .034-.01.052-.01a1.33 1.33 0 0 1-.222.307l-2.582 2.581a.665.665 0 1 0 .941.941l2.582-2.581a2.662 2.662 0 0 0 0-3.765h.002Z" />
        <path d="M4.659 14.655H3.328A1.997 1.997 0 0 1 1.33 12.66V3.34c0-1.102.894-1.996 1.997-1.996h1.33a.666.666 0 0 0 0-1.331h-1.33A3.332 3.332 0 0 0 0 3.34v9.318a3.332 3.332 0 0 0 3.328 3.327h1.33a.666.666 0 0 0 0-1.33Z" />
      </g>
    </svg>
  )
}
