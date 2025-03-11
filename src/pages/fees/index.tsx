import { useState } from 'react'
import styled from 'styled-components'

import { Skeleton } from '@components/skeleton'

import { numberToCurrent } from '@utils/number-to-currency'

interface Services {
  name: string
  value: number
}

export const Fees = () => {
  const [loading] = useState(false)
  const [items] = useState<Services[]>([
    { name: 'Saque', value: 5 },
    { name: 'Depósito', value: 2 },
    { name: 'Transferência', value: 10 },
    { name: 'Extrato', value: 1 },
    { name: 'Cartão de Crédito', value: 15 },
    { name: 'Investimentos', value: 0 },
    { name: 'Poupança', value: 0 },
    { name: 'Cheque Especial', value: 20 },
    { name: 'Empréstimo', value: 50 },
    { name: 'Financiamento', value: 30 },
    { name: 'Seguro', value: 40 },
    { name: 'Consórcio', value: 25 },
    { name: 'Câmbio', value: 5 },
    { name: 'Pagamento de Contas', value: 3 },
    { name: 'Depósito Programado', value: 1 },
    { name: 'Cartão de Débito', value: 10 },
    { name: 'Internet Banking', value: 0 },
  ])

  return (
    <div style={{ height: 'calc(100vh - 80px)' }} className="bg-background">
      <div className="flex flex-col">
        <div className="mx-8 mb-8 mt-4 flex-1">
          <p className="mb-9 mt-10 text-gray-600">
            Nossos preços são simples e transparentes, sem taxas ocultas.
          </p>
          <TableWrapper>
            {!loading && items.length <= 0 && (
              <div className="p-6">
                <div className="text-center">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Nenhuma tarifa encontrada
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tente novamento mais tarde
                  </p>
                </div>
              </div>
            )}

            <Skeleton space={4} isActive={loading} repeat={5} />

            <table>
              <tbody>
                {!loading && items.length > 0 && (
                  <tr className="bg-dark-blue">
                    <th>
                      <span className="text-base font-medium text-primary">
                        Serviços
                      </span>
                    </th>
                    <th>
                      <span className="text-base font-medium text-primary">
                        Tarifa
                      </span>
                    </th>
                  </tr>
                )}

                {!loading &&
                  items.map((item) => {
                    return (
                      <tr key={item.name} className="hover:bg-green-50">
                        <td className="w-full">{item.name}</td>
                        <td>
                          <span className="text-gray-400">
                            {numberToCurrent(Number(item.value) / 100)}
                            {item.value <= 0 && (
                              <p className="text-[var(--green)]">Grátis</p>
                            )}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </TableWrapper>
        </div>
      </div>
    </div>
  )
}

const TableWrapper = styled.div`
  border-radius: 8px;
  background-color: var(--white);
  width: calc(100vw - 64px);
  overflow: auto;

  @media (min-width: 720px) {
    width: calc(100vw - 64px - 256px);
  }

  @media (min-width: 1280px) {
    width: 100%;
  }

  > table {
    width: 100%;

    > tbody {
      border-radius: 8px;
      border: none;
      border-collapse: collapse;

      > tr {
        position: relative;

        &:first-child {
          &::after {
            content: '';
            height: 16px;
            width: 4px;
            background-color: var(--cian);
            position: absolute;
            bottom: 0;
            top: 0;
            margin-top: auto;
            margin-bottom: auto;
            left: 0;
          }
        }

        border-bottom: 1px solid var(--gray-light-line);

        > th {
          text-align: start;
          font-family: var(--semiBold);
          font-size: 14px;
          color: var(--gray);
          padding: 16px;

          @media (min-width: 720px) {
            font-size: 16px;
            padding: 21px 32px;
          }
        }

        > td {
          padding: 6px 16px;
          font-family: var(--regular);
          font-size: 12px;
          color: var(--gray-light-text);
          cursor: default;

          &:last-child {
            color: var(--red);
          }

          @media (min-width: 720px) {
            font-size: 15px;
            padding: 14px 32px;
          }
        }
      }
    }
  }
`
