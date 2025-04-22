import { Fragment } from 'react'

import { Card } from '@components/card'
import { Skeleton } from '@components/skeleton'

import { PinModal } from '@/components/pin-modal'
import { Contacts } from './components/contacts'
import { NavigationItems } from './components/navigation-items'
import { Orders } from './components/orders'
import { Projections } from './components/projections'
import { SingleContact } from './components/single-contact'

import { useBalance } from '@hooks/balance'

import { documentFormat } from '@utils/document-format'
import { numberToCurrent } from '@utils/number-to-currency'

import { useHome } from './use-home'

import { AccountStats, Transactions } from './styles'
// import { UploadDocs } from '@/components/pin-modal/upload-docs'

export function Home() {
  const { isBalanceVisible } = useBalance()
  const { account, customer, loading, transactions, user, pixContacts } =
    useHome()

  return (
    <div className="h-screen">
      {/* {(user?.docs === 'ACCOUNT_CREATED' ||
        user?.docs === 'ACCOUNT_CONFIRMED' ||
        user?.docs === 'KYC_PENDING') && <UploadDocs />} */}
      <div className="flex flex-col">
        <AccountStats>
          <Card
            title="Saldo na conta"
            value={isBalanceVisible ? numberToCurrent(account?.balance) : '***'}
            color={'var(--primary)'}
          />
          <Card
            title="Rentabilidade do Mês"
            value={isBalanceVisible ? '***' : '***'}
            color={'var(--primary)'}
          />
          <Card
            title="Boletos em aberto"
            value={isBalanceVisible ? '***' : '***'}
            color={'#fff'}
            text={'var(--text-primary)'}
          />
          <div className="md: hidden max-h-[128px] items-center rounded-lg bg-[var(--primary)] px-8 py-3 md:flex md:flex-col md:justify-center">
            <div className="w-full">
              {account?.number === undefined ? (
                <Skeleton isActive={true} slim={true} repeat={2} />
              ) : (
                <div className="text-xs text-main-white desktop:text-sm">
                  <p className="whitespace-nowrap font-bold">{user.name}</p>
                  <p className="font-light">{documentFormat(user.document)}</p>
                  <p className="font-light">
                    Banco {customer.display_name}:{' '}
                    <strong className="font-bold">{account?.bank}</strong>
                  </p>
                  <p className="font-light">
                    Agência:{' '}
                    <strong className="font-bold">{account?.agency}</strong>
                  </p>
                  <p className="font-light">
                    Conta:{' '}
                    <strong className="font-bold">{account?.number}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </AccountStats>

        {user?.has_pin === false &&
          user?.docs !== 'ACCOUNT_CONFIRMED' &&
          user?.docs !== 'KYC_PENDING' &&
          user?.docs !== 'ACCOUNT_CREATED' && <PinModal />}

        <Transactions>
          <Orders loading={loading} transactions={transactions} />
          <Projections />
          <Contacts>
            {pixContacts.map((contact, index) => {
              return (
                <Fragment key={contact.id}>
                  <SingleContact
                    name={contact.name}
                    document={documentFormat(contact.document)}
                  />
                  {index !== pixContacts.length - 1 && (
                    <div className="h-px w-full border-b border-l-gray-light " />
                  )}
                </Fragment>
              )
            })}
          </Contacts>
          <NavigationItems />
        </Transactions>
      </div>
    </div>
  )
}
