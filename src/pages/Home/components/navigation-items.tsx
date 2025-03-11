import { Link } from 'react-router-dom'

import { ChargeIcon } from '@/components/icons/charge'
import { PaymentIcon } from '@/components/icons/payment'
import { TransferIcon } from '@/components/icons/transfer'

import { Items, Action } from '../styles'

export function NavigationItems() {
  return (
    <Items>
      <Link to="charge">
        <Action>
          <div className="mb-5 text-base font-[var(--semiBold)] text-primary">
            Cobrar
          </div>
          <ChargeIcon color="var(--primary)" width={64} height={56} />
        </Action>
      </Link>
      <Link to="/paybills">
        <Action>
          <div className="mb-5 text-base font-[var(--semiBold)] text-primary">
            Pagar contas
          </div>
          <PaymentIcon color="var(--primary)" width={64} height={56} />
        </Action>
      </Link>

      <Link to="/transfer">
        <Action>
          <div className="mb-5 text-base font-[var(--semiBold)] text-primary">
            Transferir
          </div>
          <TransferIcon color="var(--primary)" width={64} height={56} />
        </Action>
      </Link>
    </Items>
  )
}
