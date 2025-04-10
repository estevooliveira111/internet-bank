// import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import { BellMessage } from './bellMessage'
// import { ClientInfoAccount } from './clientInfoAccount'
import { ChevronRight } from 'lucide-react'

import { IconSwitch } from './SwitchIcon'

import { CloseIcon } from '../icons/close'
import { SidebarIcon } from '../icons/sidebar-icon'
// import { BellIcon } from '../icons/bell'

import {
  // BellNotifications,
  // BellWrapper,
  // Box,
  // BoxNotifications,
  // BoxWrapper,
  // ButtonBell,
  // ClientInfo,
  Container,
  HeaderWrapper,
  // OtherAccounts,
  SidebarButton,
  // BankMoney,
  // HomeIcon,
  // ReceiptIcon,
  // ArrowPageRightIcon,
  // ArrowUpIcon,
} from './styles'
import { useAuth } from '../../hooks/auth'

type props = {
  handleSidebarFunction: () => void
  sidebarisactive: boolean
}

export const Header: React.FC<props> = ({
  handleSidebarFunction,
  sidebarisactive,
}) => {
  const { user } = useAuth()
  const routes = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (
      user.step === 'WAITING_EMAIL' ||
      user.step === 'WAITING_EMAIL_CONFIRMATION'
    ) {
      navigate('/u/onboarding/email')
    } else if (
      user.step === 'WAITING_PHONE' ||
      user.step === 'WAITING_PHONE_CONFIRMATION'
    ) {
      navigate('/u/onboarding/phone')
    } else if (
      user.step === 'WAITING_INDIVIDUAL' ||
      user.step === 'WAITING_INDIVIDUAL_BIRTHDATE' ||
      user.step === 'WAITING_INDIVIDUAL_DOCUMENT' ||
      user.step === 'WAITING_INDIVIDUAL_PARENTS_NAME' ||
      user.step === 'WAITING_INDIVIDUAL_INCOME' ||
      user.step === 'WAITING_INDIVIDUAL_PUBLICLY_EXPOSED_PERSON' ||
      user.step === 'WAITING_NATIONALITY' ||
      user.step === 'WAITING_NATIONALITY'
    ) {
      navigate('/u/onboarding/individual')
    } else if (user.step === 'WAITING_ADDRESS') {
      navigate('/u/onboarding/address')
    } else if (
      user.step === 'WAITING_DOCUMENTS' ||
      user.step === 'WAITING_DOCUMENTS_SELFIE' ||
      user.step === 'WAITING_DOCUMENTS_FRONT' ||
      user.step === 'WAITING_DOCUMENTS_BACK' ||
      user.step === 'RESEND_DOCUMENTS'
    ) {
      navigate('/u/onboarding/documents')
    } else if (user.step === 'WAITING_COMPANY_DATA') {
      navigate('/u/onboarding/company')
    } else if (user.step === 'WAITING_COMPANY_ADDRESS') {
      // precisa do company_id
      navigate('/u/onboarding/company-address/ID')
    } else if (user.step === 'WAITING_COMPANY_DOCUMENT') {
      // precisa do company_id
      navigate('/u/onboarding/company-document/ID')
    } else if (user.step === 'WAITING_ANALYSYS') {
      navigate('/u/onboarding/analysis')
    } else if (user.step === 'REJECTED_KYC') {
      navigate('/u/onboarding/rejected')
    } else if (user.step === 'IN_ANALYSIS') {
      navigate('/u/onboarding/analysis')
    } else if (user.step === 'PRE_APPROVED') {
      if (
        user?.docs === 'ACCOUNT_CREATED' ||
        user?.docs === 'ACCOUNT_CONFIRMED' ||
        user?.docs === 'KYC_PENDING'
      ) {
        // navigate('/onboarding/documents')
      } else {
        navigate('/u/onboarding/analysis')
      }
    } else if (user.step === 'REJECTED') {
      navigate('/u/onboarding/rejected')
    }
  }, [user, navigate])

  const routesNames = useMemo(() => {
    return [
      {
        path: '/',
        name: 'Início',
        iconName: 'HomeIcon',
      },
      {
        path: '/receipt',
        name: 'Extrato da conta',
        iconName: 'ReceiptIcon',
      },
      {
        path: '/extract',
        name: 'Comprovates',
        iconName: 'BankMoney',
      },
      {
        path: '/deposit',
        name: 'Depositar',
        iconName: 'DepositIcon',
      },
      {
        path: '/deposit/ted',
        name: 'Depositar',
        subname: 'TED ou DOC',
        iconName: 'DepositIcon',
      },
      {
        path: '/deposit/billet/new',
        name: 'Depositar',
        subname: 'Boleto',
        iconName: 'DepositIcon',
      },
      {
        path: '/deposit/invoice',
        name: 'Depositar',
        subname: 'Boleto',
        iconName: 'DepositIcon',
      },
      {
        path: '/deposit/invoice/confirm',
        name: 'Depositar',
        subname: 'Boleto',
        iconName: 'DepositIcon',
      },
      {
        path: '/deposit/invoices-list',
        name: 'Depositar',
        subname: 'Boleto',
        iconName: 'DepositIcon',
      },
      {
        path: '/deposit/pixmykeys',
        name: 'Depositar',
        subname: 'Minhas Chaves',
        iconName: 'DepositIcon',
      },
      {
        path: '/charge',
        name: 'Gestão de cobrança',
        iconName: 'ChargeIcon',
      },
      {
        path: '/pix',
        name: 'Área pix',
        iconName: 'PixIconSVG',
      },
      {
        path: '/pix/list',
        name: 'Área pix',
        iconName: 'PixIconSVG',
      },
      {
        path: '/pix/transfer',
        name: 'Área pix',
        iconName: 'PixIconSVG',
      },
      {
        path: '/pix/keys/show-many',
        name: 'Área pix',
        subname: 'Minhas chaves',
        iconName: 'PixIconSVG',
      },
      {
        path: '/pix/keys/new',
        name: 'Área pix',
        subname: 'Nova Chave',
        iconName: 'PixIconSVG',
      },
      {
        path: '/paybills',
        name: 'Pagar contas',
        iconName: 'BillIcon',
      },
      {
        path: '/paybills/invoice',
        name: 'Pagar contas',
        subname: 'Pagamento de boleto',
        iconName: 'BillIcon',
      },
      {
        path: '/paybills/info-invoice',
        name: 'Pagar contas',
        subname: 'Pagamento de boleto',
        iconName: 'BillIcon',
      },
      {
        path: '/paybills/ticket',
        name: 'Pagar contas',
        subname: 'Pagamento de boleto',
        iconName: 'BillIcon',
      },
      {
        path: '/paybills/confirm-invoice',
        name: 'Pagar contas',
        subname: 'Pagamento de boleto',
        iconName: 'BillIcon',
      },
      {
        path: '/paybills/subscribe',
        name: 'Pagar contas',
        subname: 'Cadastrar favorecido',
        iconName: 'BillIcon',
      },
      {
        path: '/paybills/schedule-payments',
        name: 'Pagar contas',
        subname: 'Pagamentos agendados',
        iconName: 'BillIcon',
      },
      {
        path: '/extract',
        name: 'Pagar contas',
        subname: 'Pagamento de boleto',
        iconName: 'ChargeIcon',
      },
      {
        path: '/transfer',
        name: 'Transferir TED/DOC',
        iconName: 'BankMoney',
      },
      {
        path: '/transfer/other-banks',
        name: 'Transferir TED/DOC ',
        subname: 'Para outros Bancos',
        previousPath: '/transfer',
        iconName: 'BankMoney',
      },
      {
        path: '/transfer/stric',
        name: 'Transferir TED/DOC ',
        subname: 'Outra conta STRIC',
        previousPath: '/transfer',
        iconName: 'BankMoney',
      },
      {
        path: '/transfer/new-beneficiary',
        name: 'Transferir TED/DOC',
        subname: 'Cadastrar Favorecido',
        iconName: 'BankMoney',
      },
      {
        path: '/transfer/confirm',
        name: 'Transferir TED/DOC',
        iconName: 'BankMoney',
      },
      {
        path: '/transfer/list',
        name: 'Transferir TED/DOC',
        iconName: 'BankMoney',
      },
      {
        path: '/transfer/subscribe',
        name: 'Transferir TED/DOC',
        subname: 'Cadastrar favorecido',
        iconName: 'BankMoney',
      },
      {
        path: '/account',
        name: 'Minha Conta',
        iconName: 'TaxIcon',
      },
      {
        path: '/new-account',
        name: 'Criar Conta',
        iconName: 'TaxIcon',
      },
    ]
  }, [])

  const currentRouteInfo = useMemo(() => {
    const foundRoute = routesNames.find(
      (route) => routes.pathname === route.path,
    )
    return foundRoute || null
  }, [routes.pathname, routesNames])

  // const [BellBoxMessageisactive, setBoxMessageisactive] = useState(false)
  // const [otherAccountsisactive, setOtherAccountsisactive] = useState(false)

  // const HandleBoxMessageToggle = () => {
  //   setBoxMessageisactive((state) => !state)
  // }

  // const HandleOtherAccountsToggle = () => {
  //   setOtherAccountsisactive((state) => !state)
  // }

  return (
    <Container>
      <SidebarButton onClick={handleSidebarFunction}>
        {sidebarisactive ? (
          <CloseIcon color="var(--primary)" />
        ) : (
          <SidebarIcon color="var(--primary)" />
        )}
      </SidebarButton>
      <HeaderWrapper>
        <div className="flex items-center">
          <div className="flex items-center">
            <IconSwitch name={currentRouteInfo?.iconName || ''} />
            <span className="ml-4 mt-0.5 self-end text-lg font-[var(--regular)]">
              {currentRouteInfo?.name}
            </span>
          </div>

          {currentRouteInfo?.subname && (
            <div className="flex items-center">
              <ChevronRight className="mx-3 h-6 w-6 text-primary" />
              <span className="mt-0.5 text-lg font-[var(--regular)]">
                {currentRouteInfo?.subname}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          {/* <BellWrapper>
            <ButtonBell onClick={HandleBoxMessageToggle}>
              <BellIcon color="var(--primary)" />
            </ButtonBell>
            <div className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded bg-main-red">
              <p className="text-[10px] font-[var(--regular)] text-main-white">
                2
              </p>
            </div>
            <AnimatePresence>
              {BellBoxMessageisactive && (
                <BoxWrapper
                  initial={{ opacity: 0, y: '-10%' }}
                  animate={{ opacity: 1, y: '0%' }}
                  exit={{ opacity: 0, y: '-10%' }}
                  transition={{ duration: 0.2 }}
                >
                  <Box>
                    <span></span>
                    <BoxNotifications>
                      <BellMessage
                        title="Transferência Recebida"
                        link="#"
                        desc="Você recebeu uma transferência de ROSANGELA ANTUNES FERREIRA no valor de R$ 1.245,23"
                      />
                      <BellMessage
                        title="Transferência Recebida"
                        link="#"
                        desc="Você recebeu uma transferência de ROSANGELA ANTUNES FERREIRA no valor de R$ 1.245,23"
                      />
                      <BellMessage
                        title="Transferência Recebida"
                        link="#"
                        desc="Você recebeu uma transferência de ROSANGELA ANTUNES FERREIRA no valor de R$ 1.245,23"
                      />
                    </BoxNotifications>
                  </Box>
                </BoxWrapper>
              )}
            </AnimatePresence>
          </BellWrapper> */}
          {/* <ClientInfo>
            <ClientInfoAccount
              handleFunction={HandleOtherAccountsToggle}
              selected={true}
              name={'Martin Ferramentas'}
              id={'32.241.521/0001-23'}
            />
            <AnimatePresence>
              {otherAccountsisactive && (
                <OtherAccounts
                  initial={{ opacity: 0, y: '-10px' }}
                  animate={{ opacity: 1, y: '0px' }}
                  exit={{ opacity: 0, y: '-10px' }}
                  transition={{ duration: 0.2, type: 'tween' }}
                >
                  <ClientInfoAccount
                    selected={false}
                    name={'Martin Ferramentas'}
                    id={'32.241.521/0001-23'}
                  />
                  <ClientInfoAccount
                    selected={false}
                    name={'Martin Ferramentas'}
                    id={'32.241.521/0001-23'}
                  />
                </OtherAccounts>
              )}
            </AnimatePresence>
          </ClientInfo> */}
        </div>
      </HeaderWrapper>
    </Container>
  )
}
