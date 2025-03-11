import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PrivateLayout } from '@/layout/private'
import { PublicLayout } from '@/layout/public'
import { RequireAuth } from '@/routes/auth'

import { ChargeBillet } from '@/pages/charge-billet'
import { MyAccount } from '@/pages/my-account'
import { Charges } from '@/pages/charges'
import { DepositQrCode } from '@/pages/deposit-qrcode'
import { Fees } from '@/pages/fees'
import { NotFound } from '@/pages/notfound'
import { PixCopyAndPaste } from '@/pages/pix/copy-and-paste'
import { PixKeys } from '@/pages/pix/keys'
import { PixNewKey } from '@/pages/pix/new-key'
import { Termos } from '@/pages/termos'
import NewAccount from '@/pages/new-account'
import { Transfer } from '@/pages/transfer'
import { TransferBase } from '@/pages/transfer/base'
import { CreateNewBeneficiary } from '@/pages/transfer/new-beneficiary'
import { TransferOtherBanks } from '@/pages/transfer/other-banks'
import { StricTransfer } from '@/pages/transfer/stric'
import { Home } from '@pages/Home'
import { DepositBillet } from '@pages/deposit-billet'
import { DepositList } from '@pages/deposit-list'
import { DepositTed } from '@pages/deposit-ted'
import { Extract } from '@pages/extract'
import { Forgot } from '@pages/forgot'
import { CreateAccount } from '@pages/onboarding/create-account'
import { OnBoardingAddress } from '@pages/onboarding/create-account/address'
import { OnBoardingAnalysis } from '@pages/onboarding/create-account/analysis'
import { OnBoardingCompany } from '@pages/onboarding/create-account/company'
import { OnBoardingCompanyAddress } from '@pages/onboarding/create-account/company-address'
import { OnBoardingDocument } from '@pages/onboarding/create-account/document'
import { OnBoardingEmail } from '@pages/onboarding/create-account/email'
import { OnBoardingIndividual } from '@pages/onboarding/create-account/individual'
import { OnBoardingPhone } from '@pages/onboarding/create-account/phone'
import Requirements from '@pages/onboarding/requirements'
import CreateAccountType from '@pages/onboarding/select-account-type'
import { Payment } from '@pages/payment'
import { Pix } from '@pages/pix'
import { PixTransfer } from '@/pages/pix/transfer'
import { Receipt } from '@pages/receipt'
import { ResetPassword } from '@pages/reset-password'
import { SignIn } from '@pages/sign-in'
import { SignOut } from '@pages/sign-out'
import { SignInToken } from '@pages/sign-token'
import { Checkout } from '@/pages/checkout'
import { GestaoCobranca } from '@/pages/gestao-cobrancas'
import { GestaoCobrancaClients } from '@/pages/gestao-cobrancas/clients'
import { GestaoCobrancaInvoices } from '@/pages/gestao-cobrancas/invoices'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="u" element={<PublicLayout />}>
          {/* Routes */}
          <Route index element={<SignIn />} />

          <Route path="forgot" element={<Forgot />} />

          <Route path="reset-password" element={<ResetPassword />} />

          <Route path="account-type" element={<CreateAccountType />} />
          <Route
            path="requirements-create-account/:type"
            element={<Requirements />}
          />

          <Route path="create-account/:type" element={<CreateAccount />} />

          <Route path="onboarding/email" element={<OnBoardingEmail />} />
          <Route path="onboarding/phone" element={<OnBoardingPhone />} />
          <Route
            path="onboarding/individual"
            element={<OnBoardingIndividual />}
          />

          <Route path="onboarding/address" element={<OnBoardingAddress />} />
          <Route path="onboarding/documents" element={<OnBoardingDocument />} />

          <Route path="onboarding/company" element={<OnBoardingCompany />} />
          <Route
            path="onboarding/company-address/:id"
            element={<OnBoardingCompanyAddress />}
          />

          <Route path="onboarding/analysis" element={<OnBoardingAnalysis />} />

          <Route path="signin-token/:token" element={<SignInToken />} />
          <Route
            path="temos-de-uso-e-politica-de-privacidade"
            element={<Termos />}
          />
          <Route
            path="termos-de-uso-e-politica-de-privacidade"
            element={<Termos />}
          />

          <Route path="checkout/:id" element={<Checkout />} />
        </Route>

        {/* Private */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <PrivateLayout />
            </RequireAuth>
          }
        >
          {/* Routes */}
          <Route index element={<Home />} />
          <Route path="receiptsss" element={<Extract />} />
          <Route path="receipt" element={<Receipt />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="transfer/other-banks" element={<TransferOtherBanks />} />
          <Route path="transfer/stric" element={<StricTransfer />} />
          <Route
            path="transfer/new-beneficiary"
            element={<CreateNewBeneficiary />}
          />
          <Route path="transfer/base" element={<TransferBase />} />
          <Route path="paybills" element={<Payment />} />

          <Route path="deposit" element={<DepositList />} />
          <Route path="deposit/ted" element={<DepositTed />} />
          <Route path="deposit/billet/new" element={<DepositBillet />} />
          <Route path="deposit/qrcode" element={<DepositQrCode />} />

          <Route path="pix" element={<Pix />} />
          <Route path="pix/keys/show-many" element={<PixKeys />} />

          <Route path="pix/keys/new" element={<PixNewKey />} />
          <Route path="pix/transfer" element={<PixTransfer />} />
          <Route path="charge" element={<Charges />} />
          <Route path="charge/charge-billet" element={<ChargeBillet />} />

          <Route path="account" element={<MyAccount />} />

          <Route path="new-account" element={<NewAccount />} />

          <Route
            path="pix/transfer/copy-and-paste"
            element={<PixCopyAndPaste />}
          />
          <Route path="signout" element={<SignOut />} />
          <Route path="fees" element={<Fees />} />

          <Route path="gestao-cobrancas/resumo" element={<GestaoCobranca />} />
          <Route
            path="gestao-cobrancas/clientes"
            element={<GestaoCobrancaClients />}
          />

          <Route
            path="gestao-cobrancas/invoices"
            element={<GestaoCobrancaInvoices />}
          />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
