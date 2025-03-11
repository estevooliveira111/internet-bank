type Props = {
  color: string
  opacity?: number
}

export function ExtractIcon({ color, opacity }: Props) {
  return (
    <svg
      width={12}
      height={16}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.404 15.883l-1.4-.96-1.4.96a.666.666 0 01-.753 0l-1.404-.96-1.404.96A.666.666 0 010 15.333v-12A3.337 3.337 0 013.333 0h5.333A3.338 3.338 0 0112 3.334v12a.667.667 0 01-1.042.548l-1.4-.958-1.4.959a.664.664 0 01-.754 0zm-1.025-2.318l1.4.96 1.4-.96a.666.666 0 01.754 0l.734.501V3.334a2 2 0 00-2-2H3.332a2 2 0 00-2 2v10.732l.739-.5a.666.666 0 01.753 0l1.4.959 1.4-.96a.666.666 0 01.754 0zM3.333 9.333a.667.667 0 010-1.333h4a.667.667 0 010 1.333h-4zm0-2.666a.667.667 0 010-1.334h5.333a.666.666 0 110 1.334H3.333z"
        fill={color}
        opacity={opacity || 1}
      />
    </svg>
  )
}
