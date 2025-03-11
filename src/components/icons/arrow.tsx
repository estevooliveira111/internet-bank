type Props = {
  color: string
}
export function ArrowIcon({ color }: Props) {
  return (
    <svg
      width={12}
      height={7}
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.575 6.526L.548 1.42a.84.84 0 010-1.176.81.81 0 011.158 0l4.448 4.518L10.602.244a.81.81 0 011.158 0c.32.324.32.85 0 1.176L6.733 6.526a.81.81 0 01-1.158 0z"
        fill={color}
      />
    </svg>
  )
}
