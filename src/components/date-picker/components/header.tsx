interface Props {
  title: string
}

export function Header({ title }: Props) {
  return (
    <>
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
    </>
  )
}
