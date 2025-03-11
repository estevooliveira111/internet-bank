import { TransferMoneyIcon } from '@components/icons/transfer-money'

interface Props {
  name: string
  document: string
}

export function SingleContact({ name, document }: Props) {
  return (
    <div
      role="button"
      className="flex w-full cursor-pointer items-center justify-between rounded p-4 hover:bg-gray-100"
    >
      <div className="mb-1 text-sm font-medium text-tx-primary">
        <span>{name}</span>
        <p className="text-main-gray">{document}</p>
      </div>
      <TransferMoneyIcon color="var(--primary)" />
    </div>
  )
}
