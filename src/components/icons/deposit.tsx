type Props = {
  color: string
  opacity?: number
  width?: number
  height?: number
}

export function DepositIcon({ color, opacity, width, height }: Props) {
  return (
    <svg
      width={width || 16}
      height={height || 18}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        opacity={opacity || 1}
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
      >
        <path d="M15.421 7.238H14.1V5.034a.44.44 0 00-.441-.44h-1.763a.44.44 0 000 .88h1.322v1.763H1.762a.881.881 0 110-1.762h2.204a.44.44 0 100-.881H1.761C.79 4.594.001 5.384 0 6.356v9.694c.001.973.79 1.761 1.762 1.762h13.66a.44.44 0 00.44-.44V7.678a.44.44 0 00-.44-.44zM1.762 16.93a.882.882 0 01-.88-.881V7.874c.266.158.57.243.88.245h13.219v2.643h-3.085a.44.44 0 00-.44.441v2.644c0 .243.197.44.44.44h3.085v2.644H1.762zm13.219-3.525h-2.644v-1.762h2.644v1.762z" />
        <path d="M7.656 6.26c.16.128.39.128.55 0l2.203-1.763a.44.44 0 10-.55-.688l-1.487 1.19V.63a.44.44 0 10-.882 0v4.37l-1.487-1.19a.44.44 0 10-.55.688L7.656 6.26z" />
      </g>
    </svg>
  )
}
