type Props = {
  color: string
}

export function BellIcon({ color }: Props) {
  return (
    <svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.632 14.755l-1.221-1.757a1.428 1.428 0 01-.257-.814V7.142a7.142 7.142 0 00-14.283 0v5.042c-.001.29-.09.575-.257.814L.392 14.755A1.428 1.428 0 001.45 17.14h4.064a3.57 3.57 0 006.999 0h4.063a1.428 1.428 0 001.057-2.386zm-8.62 3.813a2.142 2.142 0 01-2.014-1.428h4.028a2.142 2.142 0 01-2.014 1.428zM1.45 15.711a.58.58 0 00.086-.1l1.25-1.8a2.856 2.856 0 00.514-1.627V7.142a5.713 5.713 0 0111.427 0v5.042c.001.582.18 1.15.514 1.628l1.25 1.8c.024.036.053.07.085.1H1.45z"
        fill={color}
      />
    </svg>
  )
}
