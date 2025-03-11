type Props = {
  color: string
}

export function SidebarIcon({ color }: Props) {
  return (
    <svg
      width={17}
      height={13}
      viewBox="0 0 17 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.977 12.746v-1.812H17v1.812H8.977zM.954 7.128V5.316H17v1.812H.953zm0-5.316V0H17v1.812H.954z"
        fill={color}
      />
    </svg>
  )
}
