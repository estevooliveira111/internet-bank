type Props = {
  color: string
  opacity?: number
}

export function HelpIcon({ color, opacity }: Props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={opacity || 1}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.579 0 0 3.578 0 8c0 1.403.366 2.774 1.06 3.982L.03 15.183a.625.625 0 00.787.787l3.2-1.03A7.982 7.982 0 008 16c4.421 0 8-3.578 8-8 0-4.421-3.578-8-8-8zm0 14.75a6.73 6.73 0 01-3.573-1.023.625.625 0 00-.523-.065l-2.31.744.744-2.31a.625.625 0 00-.065-.523A6.732 6.732 0 011.25 8 6.758 6.758 0 018 1.25 6.758 6.758 0 0114.75 8 6.758 6.758 0 018 14.75zM8.781 8A.781.781 0 117.22 8 .781.781 0 018.78 8zm3.125 0a.781.781 0 11-1.562 0 .781.781 0 011.562 0zm-6.25 0a.781.781 0 11-1.562 0 .781.781 0 011.562 0z"
        fill={color}
      />
    </svg>
  )
}
