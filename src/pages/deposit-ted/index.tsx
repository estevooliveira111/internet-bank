import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '../../components/icons/arrow-left'
import { useAuth } from '../../hooks/auth'
import { useCustomer } from '../../hooks/customer'
import { documentFormat } from '../../utils/document-format'

export function DepositTed() {
  const navigate = useNavigate()
  const { customer } = useCustomer()
  const { user, account } = useAuth()

  function handleBack() {
    navigate(-1)
  }
  return (
    <div className="h-full min-h-screen p-8">
      <div className="mb-6 flex items-center ">
        <div
          onClick={handleBack}
          className="mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-white hover:opacity-80"
        >
          <ArrowLeftIcon color="var(--primary)" width={10} />
        </div>
        <div>
          <h1 className="block text-2xl text-tx-primary">
            Dados para transferência
          </h1>
          <span className="block">
            Use os dados abaixo para fazer um TED para sua conta
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 rounded">
        <div className="flex w-full flex-col rounded-md bg-white p-8 md:w-96">
          <span className="text-xl">{user.name}</span>

          <div className="mt-4">
            <span className="text-main-gray">CPF:</span>
            <span className="pl-2 text-tx-primary">
              {documentFormat(user.document)}
            </span>
          </div>

          <div className="mt-4">
            <span className="text-main-gray">Banco:</span>
            <span className="pl-2 text-tx-primary">
              {account?.bank} ({customer.display_name})
            </span>
          </div>

          <div className="mt-4">
            <span className="text-main-gray">Agência:</span>
            <span className="pl-2 text-tx-primary">{account?.agency}</span>
          </div>

          <div className="mt-4">
            <span className="text-main-gray">Conta:</span>
            <span className="pl-2 text-tx-primary">{account?.number}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
