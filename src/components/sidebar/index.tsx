import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HomeIcon } from '../icons/home'
import { SidebarIcon } from '../icons/sidebar-icon'
import { VisionEyeIcon } from '@components/icons/new/vision-eye'
import { OptionSidebar } from './optionSidebar'
import { Service } from './service'

import { ExtractIcon } from '../icons/extract'
import {
  // StricLogo,
  Arrowicon,
  Container,
  OptionsWrapper,
  SideFix,
  WrapperHeader,
} from './styles'
// import { ReceiptIcon } from '../icons/receipt'
import { ChargeIcon } from '../icons/charge'
import { DepositIcon } from '../icons/deposit'
import { PaymentIcon } from '../icons/payment'
import { PixIcon } from '../icons/pix'
import { TransferIcon } from '../icons/transfer'
// import { EditIcon } from '../icons/edit'
// import { HelpIcon } from '../icons/help'
import { UnVisionEyeIcon } from '@components/icons/new/unvision-eye'
import { useTheme } from 'styled-components'
import { useAuth } from '../../hooks/auth'
import { useCustomer } from '../../hooks/customer'
import { numberToCurrent } from '../../utils/number-to-currency'
import { LogoutIcon } from '../icons/logout'
import { Skeleton } from '../skeleton'
// import { ReceiptIcon } from '../icons/receipt'
// import { HelpIcon } from '../icons/help'
// import { EditIcon } from '../icons/edit'
// import { ShareIcon } from '../icons/share'
import { useBalance } from '@hooks/balance'

interface Props {
  isactive: boolean
}

export function Sidebar({ isactive }: Props) {
  const { isBalanceVisible, setIsBalanceVisible } = useBalance()

  const route = useLocation()
  const theme = useTheme()
  const { customer } = useCustomer()
  const { account } = useAuth()

  const [bankServicesopened, setBankServicesopened] = useState(true)
  const [gestaoServicesopened, setGestaoServicesopened] = useState(true)
  const [myAccountopened, setMyAccountopened] = useState(true)

  const handleBankServiceToggle = () => {
    setBankServicesopened((state) => !state)
  }

  const handleGestaoServiceToggle = () => {
    setGestaoServicesopened((state) => !state)
    if (customer.display_name === 'Alle Bank') {
      window.location.href = 'https://allebank.hackingmake.com.br/'
    }
  }

  const handleMyAccountoggle = () => {
    setMyAccountopened((state) => !state)
  }

  return (
    <Container isactive={isactive}>
      <WrapperHeader>
        <SidebarIcon color={theme.primary} />
        <div style={{ marginLeft: '16px' }}>
          <img
            src={customer.logo.white}
            style={{
              maxWidth: customer.display_name === 'Banco MSM' ? 60 : 80,
            }}
            alt={customer.display_name}
          />
        </div>
      </WrapperHeader>
      <div className="flex h-24 flex-col justify-center border-b border-[var(--line)] p-6">
        <p className="text-base font-[var(--light)] text-primary">
          Saldo na conta
        </p>
        <div className="flex items-start justify-between">
          <p className="w-full text-2xl font-semibold text-main-white">
            {isBalanceVisible ? (
              <>
                {account?.balance === undefined ? (
                  <div className="w-3/4 pt-1">
                    <Skeleton slim={true} isActive={true} />
                  </div>
                ) : (
                  <>{numberToCurrent(account?.balance)}</>
                )}
              </>
            ) : (
              'R$ ***'
            )}
          </p>
          <button
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            className="cursor-pointer border-none bg-none"
          >
            {!isBalanceVisible ? (
              <VisionEyeIcon className="h-5 w-5 text-primary" />
            ) : (
              <UnVisionEyeIcon className="h-5 w-5 text-primary" />
            )}
          </button>
        </div>
      </div>
      <SideFix>
        <OptionSidebar
          selected={route.pathname === '/'}
          linkTo={'/'}
          title={'Inicio'}
          Icon={
            <HomeIcon
              opacity={route.pathname === '/' ? 1 : 0.3}
              color={route.pathname === '/' ? 'var(--primary)' : 'var(--white)'}
            />
          }
        />

        <OptionSidebar
          selected={route.pathname === '/receipt'}
          linkTo={'/receipt'}
          title={'Extrato'}
          Icon={
            <ExtractIcon
              opacity={route.pathname.startsWith('/receipt') ? 1 : 0.3}
              color={
                route.pathname === '/receipt'
                  ? 'var(--primary)'
                  : 'var(--white)'
              }
            />
          }
        />

        {/* <OptionSidebar
          selected={route.pathname === '/extract'}
          linkTo={'/extract'}
          title={'Comprovantes'}
          Icon={
            <ReceiptIcon
              opacity={route.pathname.startsWith('/extract') ? 1 : 0.3}
              color={
                route.pathname === '/extract'
                  ? 'var(--primary)'
                  : 'var(--white)'
              }
            />
          }
        /> */}
      </SideFix>
      <Service
        handleOption={handleBankServiceToggle}
        opened={bankServicesopened}
        Icon={Arrowicon}
        title="Serviços Bancários"
      />
      <AnimatePresence>
        {bankServicesopened && (
          <OptionsWrapper>
            <OptionSidebar
              selected={route.pathname.startsWith('/deposit')}
              linkTo={'/deposit'}
              title={'Depositar'}
              Icon={
                <DepositIcon
                  opacity={route.pathname.startsWith('/deposit') ? 1 : 0.3}
                  color={
                    route.pathname === '/deposit'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            />

            {/* <OptionSidebar
              selected={route.pathname === '/charge'}
              linkTo={'/charge'}
              title={'Cobrar'}
              Icon={
                <ChargeIcon
                  opacity={route.pathname.startsWith('/charge') ? 1 : 0.3}
                  color={
                    route.pathname === '/charge'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            /> */}

            <OptionSidebar
              selected={route.pathname.startsWith('/pix')}
              linkTo={'/pix'}
              title={'PIX'}
              Icon={
                <PixIcon
                  opacity={route.pathname.startsWith('/pix') ? 1 : 0.3}
                  color={
                    route.pathname === '/pix'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            />

            <OptionSidebar
              selected={route.pathname.startsWith('/paybills')}
              linkTo={'/paybills'}
              title={'Pagar Contas'}
              Icon={
                <PaymentIcon
                  opacity={route.pathname.startsWith('/paybills') ? 1 : 0.3}
                  color={
                    route.pathname === '/paybills'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            />

            <OptionSidebar
              selected={route.pathname.startsWith('/transfer')}
              linkTo={'/transfer'}
              title={'Transferir TED/DOC'}
              Icon={
                <TransferIcon
                  opacity={route.pathname.startsWith('/transfer') ? 1 : 0.3}
                  color={
                    route.pathname === '/transfer'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            />
          </OptionsWrapper>
        )}
      </AnimatePresence>

      {(customer.display_name === 'Umbank' ||
        customer.display_name === 'Alle Bank' ||
        customer.display_name === 'Educação Bank' ||
        customer.display_name === 'Stric' ||
        customer.display_name === 'AllBank Invest') && (
        <>
          <Service
            handleOption={handleGestaoServiceToggle}
            opened={gestaoServicesopened}
            Icon={Arrowicon}
            title="Gestão de Cobranças"
          />

          <AnimatePresence>
            {gestaoServicesopened && (
              <OptionsWrapper>
                <OptionSidebar
                  selected={route.pathname.startsWith(
                    '/gestao-cobrancas/resumo',
                  )}
                  linkTo={'/gestao-cobrancas/resumo'}
                  title={'Resumo'}
                  Icon={
                    <DepositIcon
                      opacity={
                        route.pathname.startsWith('/gestao-cobrancas/resumo')
                          ? 1
                          : 0.3
                      }
                      color={
                        route.pathname === '/gestao-cobrancas/resumo'
                          ? 'var(--primary)'
                          : 'var(--white)'
                      }
                    />
                  }
                />

                <OptionSidebar
                  selected={route.pathname === '/gestao-cobrancas/clientes'}
                  linkTo={'/gestao-cobrancas/clientes'}
                  title={'Clientes'}
                  Icon={
                    <ChargeIcon
                      opacity={
                        route.pathname.startsWith('/gestao-cobrancas/clientes')
                          ? 1
                          : 0.3
                      }
                      color={
                        route.pathname === '/gestao-cobrancas/clientes'
                          ? 'var(--primary)'
                          : 'var(--white)'
                      }
                    />
                  }
                />

                <OptionSidebar
                  selected={route.pathname.startsWith(
                    '/gestao-cobrancas/invoices',
                  )}
                  linkTo={'/gestao-cobrancas/invoices'}
                  title={'Cobranças'}
                  Icon={
                    <PixIcon
                      opacity={
                        route.pathname.startsWith('/gestao-cobrancas/invoices')
                          ? 1
                          : 0.3
                      }
                      color={
                        route.pathname === '/gestao-cobrancas/invoices'
                          ? 'var(--primary)'
                          : 'var(--white)'
                      }
                    />
                  }
                />
              </OptionsWrapper>
            )}
          </AnimatePresence>
        </>
      )}

      <Service
        handleOption={handleMyAccountoggle}
        opened={myAccountopened}
        Icon={Arrowicon}
        title="Minha Conta"
      />
      <AnimatePresence>
        {bankServicesopened && (
          <OptionsWrapper>
            <OptionSidebar
              selected={route.pathname === '/account'}
              linkTo={'/account'}
              title={'Minha Conta'}
              Icon={
                <ExtractIcon
                  opacity={route.pathname.startsWith('/account') ? 1 : 0.3}
                  color={
                    route.pathname === '/account'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            />

            <OptionSidebar
              selected={route.pathname === '/new-account'}
              linkTo={'/new-account'}
              title={'Conta PJ'}
              Icon={
                <ExtractIcon
                  opacity={route.pathname.startsWith('/new-account') ? 1 : 0.3}
                  color={
                    route.pathname === '/new-account'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            />

            <OptionSidebar
              selected={route.pathname === '/signout'}
              linkTo={'/signout'}
              title={'Sair'}
              Icon={
                <LogoutIcon
                  opacity={route.pathname.startsWith('/signout') ? 1 : 0.3}
                  color={
                    route.pathname === '/signout'
                      ? 'var(--primary)'
                      : 'var(--white)'
                  }
                />
              }
            />
          </OptionsWrapper>
        )}
      </AnimatePresence>
    </Container>
  )
}
