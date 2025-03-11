import { ChargeIcon } from '@components/icons/charge'
import { ExtractIcon } from '@components/icons/extract'
import { FeesIcon } from '@components/icons/fees'
import { HomeIcon } from '@components/icons/home'
import { PaymentIcon } from '@components/icons/payment'
import { PixIcon } from '@components/icons/pix'
import { TransferIcon } from '@components/icons/transfer'

interface IconSwitchProps {
  name: string | undefined
}

export function IconSwitch({ name }: IconSwitchProps) {
  switch (name) {
    case 'BankMoney':
      return <TransferIcon color="var(--primary)" />
    case 'BillIcon':
      return <PaymentIcon color="var(--primary)" />
    case 'DepositIcon':
      return <ChargeIcon color="var(--primary)" />
    case 'FeesIcon':
      return <FeesIcon color="var(--primary)" />
    case 'HomeIcon':
      return <HomeIcon color="var(--primary)" />
    case 'PixIconSVG':
      return <PixIcon color="var(--primary)" />
    case 'ReceiptIcon':
      return <ExtractIcon color="var(--primary)" />

    default:
      return <HomeIcon color="var(--primary)" />
  }
}
