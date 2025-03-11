type Props = {
  color: string
  opacity?: number
  width?: number
  height?: number
}

export function ChargeIcon({ color, opacity, width, height }: Props) {
  return (
    <svg
      width={width || 16}
      height={height || 14}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        opacity={opacity || 1}
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
      >
        <path d="M13.166 14h-1.667a.834.834 0 01-.833-.834v-3h-1.5a.5.5 0 01-.353-.853l3.166-3.167a.5.5 0 01.708 0l3.166 3.167a.5.5 0 01-.353.853H14v3c0 .46-.375.834-.834.834zm-1.5-1h1.333V9.666a.5.5 0 01.5-.5h.793l-1.96-1.959-1.959 1.96h.793a.5.5 0 01.5.5V13z" />
        <path d="M7.5 12H1.833A1.835 1.835 0 010 10.167V1.833C0 .822.822 0 1.833 0h12.333C15.177 0 16 .822 16 1.833v4.334h-1V1.833A.834.834 0 0014.166 1H1.833A.834.834 0 001 1.833v8.334c0 .459.374.833.833.833H7.5v1z" />
        <path d="M4.833 8.667H.5a.5.5 0 01-.5-.5V3.834a.5.5 0 01.5-.5h4.333c1.011 0 1.833.822 1.833 1.833v1.667a1.835 1.835 0 01-1.833 1.833zM1 7.667h3.833c.46 0 .833-.374.833-.833V5.167a.834.834 0 00-.833-.833H1v3.333z" />
        <path d="M3.333 6.667a.667.667 0 100-1.333.667.667 0 000 1.333z" />
      </g>
    </svg>
  )
}
