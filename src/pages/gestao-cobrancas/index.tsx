import { ChargesIcon } from '@/components/icons/charges'
import { Projections } from '../Home/components/projections'
import { Link } from 'react-router-dom'

export function GestaoCobranca() {
  return (
    <div className="h-full min-h-screen p-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <div className="flex justify-between rounded bg-white p-4">
            <div>
              {' '}
              <h2 className="text-lg">
                Gerencie seu dinheiro de forma rápida!
              </h2>
              <p className="pt-4 text-sm text-gray-500">
                Gerencie todas as suas cobranças em um só lugar
              </p>
            </div>

            <div className="relative top-[-30px]">
              <ChargesIcon
                color="var(--primary)"
                brand="var(--brand-background)"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between gap-4">
            <Link
              to="/gestao-cobrancas/resumo"
              className="flex w-1/4 cursor-pointer flex-col items-center justify-center rounded bg-white p-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.86 12.7397H2.75V18.6797H6.86V12.7397Z"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.06 9.02979H10.05V18.6798H14.06V9.02979Z"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.25 5.31982H17.14V18.6798H21.25V5.31982Z"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="pt-4">Resumo</span>
            </Link>
            <Link
              to="/gestao-cobrancas/clientes"
              className="flex w-1/4 cursor-pointer flex-col items-center justify-center rounded bg-white p-4"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.74 11.7653C14.493 11.7653 15.9141 10.3442 15.9141 8.59116C15.9141 6.83812 14.493 5.41699 12.74 5.41699C10.9869 5.41699 9.5658 6.83812 9.5658 8.59116C9.5658 10.3442 10.9869 11.7653 12.74 11.7653Z"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.32654 20.583V18.7738C6.32654 16.6613 8.03821 14.9604 10.1399 14.9604H15.849C17.9615 14.9604 19.6624 16.6721 19.6624 18.7738V20.583"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="pt-4">Clientes</span>
            </Link>
            <Link
              to="/gestao-cobrancas/invoices"
              className="flex w-1/4 cursor-pointer flex-col items-center justify-center rounded bg-white p-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.3999C10.51 8.3999 9.30005 9.2099 9.30005 10.1999C9.30005 11.1899 10.51 11.9999 12 11.9999C13.49 11.9999 14.7001 12.8099 14.7001 13.7999C14.7001 14.7899 13.49 15.5999 12 15.5999"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8.3999V15.5999"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8.3999C13 8.3999 13.87 8.7599 14.34 9.2999L12 8.3999Z"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8.4V7.5"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15.6001V16.5001"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15.6002C11 15.6002 10.13 15.2402 9.66003 14.7002L12 15.6002Z"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12C21 13.18 20.77 14.35 20.31 15.44C19.86 16.53 19.19 17.52 18.36 18.36C17.52 19.2 16.53 19.86 15.44 20.31C14.35 20.77 13.18 21 12 21C10.82 21 9.65 20.77 8.56 20.31C7.47 19.85 6.48 19.19 5.64 18.36C4.8 17.52 4.14 16.53 3.69 15.44C3.23 14.35 3 13.18 3 12C3 9.61 3.95 7.32 5.64 5.64C7.32 3.95 9.61 3 12 3C14.39 3 16.68 3.95 18.36 5.64C20.05 7.32 21 9.61 21 12Z"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="pt-4">Cobranças</span>
            </Link>
            <Link
              to="/gestao-cobrancas/invoices"
              className="flex w-1/4 cursor-pointer flex-col items-center justify-center rounded bg-[var(--primary)] p-4"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.8688 9.22607L11.9112 14.6142"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.19592 11.8989L14.5841 11.9413"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="pt-4 text-white">Gerar Cobranças</span>
            </Link>
          </div>
        </div>
        <div className="md:min-w-[350px]">
          <Projections />
        </div>
      </div>

      <div className="text-cencer flex w-full items-center justify-center pt-40">
        <h1>Ainda não há dados suficiente para gerar seu relatorio.</h1>
      </div>
    </div>
  )
}
