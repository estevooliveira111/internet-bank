interface Props {
  className?: string
}

export function SidebarIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 13"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.977 12.746v-1.812H17v1.812H8.977zM.954 7.128V5.316H17v1.812H.953zm0-5.316V0H17v1.812H.954z"
        fill="currentColor"
      />
    </svg>
  )
}
