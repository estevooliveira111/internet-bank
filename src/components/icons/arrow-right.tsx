type Props = {
  color: string
  width?: number
  height?: number
}

export function ArrowRightIcon({ color, width, height }: Props) {
  return (
    <svg
      width={width || 4}
      height={height || 7}
      viewBox="0 0 4 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.675 3.533L.911 6.297a.45.45 0 11-.637-.637L2.72 3.214.274.77A.45.45 0 01.911.132l2.764 2.764a.449.449 0 010 .637z"
        fill={color}
      />
    </svg>
  )
}
