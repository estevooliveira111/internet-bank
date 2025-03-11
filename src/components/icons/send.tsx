type Props = {
  color: string
  opacity?: number
  width?: number
  height?: number
}

export function SendIcon({
  color,
  opacity = 1,
  width = 16,
  height = 16,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="evenodd" clipRule="evenodd" fill={color} opacity={opacity}>
        <path
          d="M1.137 0a1.18 1.18 0 0 0-1.05 1.622l5.717 14.103L.087 29.827a1.18 1.18 0 0 0 1.62 1.498L30.798 16.78a1.18 1.18 0 0 0 0-2.11L1.707.124A1.18 1.18 0 0 0 1.137 0Zm2.31 3.631 24.188 12.094L3.447 27.817l4.426-10.914h10.605a1.18 1.18 0 1 0 0-2.359H7.873L3.447 3.631Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  )
}
