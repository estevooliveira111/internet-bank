import { Input } from '@/components/input'
import { Skeleton } from '@/components/skeleton'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const fakeData = [
  {
    nome: 'João Silva',
    cpf_cnpj: '123.456.789-00',
    banco: 'Banco do Brasil',
    agencia: '1234',
    conta: '56789',
  },
  {
    nome: 'Maria Santos',
    cpf_cnpj: '987.654.321-00',
    banco: 'Itaú',
    agencia: '5678',
    conta: '12345',
  },
  {
    nome: 'Ana Oliveira',
    cpf_cnpj: '111.222.333-44',
    banco: 'Caixa',
    agencia: '9101',
    conta: '11223',
  },
  {
    nome: 'Carlos Souza',
    cpf_cnpj: '555.666.777-88',
    banco: 'Bradesco',
    agencia: '1213',
    conta: '14151',
  },
  {
    nome: 'Fernanda Lima',
    cpf_cnpj: '999.888.777-66',
    banco: 'Santander',
    agencia: '1617',
    conta: '18191',
  },
  {
    nome: 'Roberto Alves',
    cpf_cnpj: '252.525.252-52',
    banco: 'Nubank',
    agencia: '2021',
    conta: '22232',
  },
  {
    nome: 'Luciana Costa',
    cpf_cnpj: '353.535.353-53',
    banco: 'Inter',
    agencia: '2324',
    conta: '25262',
  },
  {
    nome: 'Paulo Nunes',
    cpf_cnpj: '454.545.454-54',
    banco: 'C6 Bank',
    agencia: '2627',
    conta: '28292',
  },
  {
    nome: 'Clara Melo',
    cpf_cnpj: '565.656.565-65',
    banco: 'Original',
    agencia: '2920',
    conta: '30313',
  },
  {
    nome: 'Ricardo Dias',
    cpf_cnpj: '676.767.676-76',
    banco: 'Neon',
    agencia: '3132',
    conta: '34353',
  },
]

export function TransferOtherBanks() {
  return (
    <div className="h-full min-h-screen p-8">
      <div className="flex justify-between pb-2">
        <div>
          <h2 className="mb-8 max-w-[600px]">
            Transferência solicitada após às 15:00 só será processada no próximo
            dia útil. Número de transferências sem taxa remanescentes: 2/2
          </h2>

          <Input
            id="x"
            placeholder="Pesquisar por nome, conta ou CPF/CNPJ"
            label=""
          />
        </div>
        <Link to="/transfer/new-beneficiary">
          <button
            type="button"
            className="h-10 rounded-lg bg-dark-blue px-8 py-1 text-gray-light"
          >
            Cadastrar Favorecido
          </button>
        </Link>
      </div>

      <TableWrapper>
        {fakeData.length <= 0 && (
          <div className="p-6">
            <div className="text-center">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhum lançamento para o período selecionado
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Selecione outro período ou faça uma transferência e comece a
                usar agora mesmo
              </p>
            </div>
          </div>
        )}
        <Skeleton space={4} repeat={5} />
        <table className="w-full">
          <tbody className="border-collapse rounded-lg border-none">
            {fakeData.length > 0 && (
              <tr className="relative bg-dark-blue">
                <th className="w-[22%] text-start font-medium text-primary">
                  Nome
                </th>
                <th className="w-[22%] text-start font-medium text-primary">
                  CPF/CNPJ
                </th>
                <th className="w-1/5 text-start font-medium text-primary">
                  Banco
                </th>
                <th className="w-[11%] text-start font-medium text-primary">
                  Agência
                </th>
                <th className="w-[11%] text-start font-medium text-primary">
                  Conta
                </th>
                <th className="w-1/5 text-start font-medium text-primary"></th>
              </tr>
            )}

            {fakeData.map((item) => {
              return (
                <tr className="relative hover:bg-gray-50" key={item.nome}>
                  <td className="cursor-pointer px-8 py-4 font-[var(--regular)]">
                    {item.nome}
                  </td>
                  <td className="cursor-pointer px-8 py-4 font-[var(--regular)]">
                    {item.cpf_cnpj}
                  </td>
                  <td className="cursor-pointer px-8 py-4 font-[var(--regular)]">
                    {item.banco}
                  </td>
                  <td className="cursor-pointer px-8 py-4 font-[var(--regular)]">
                    {item.agencia}
                  </td>
                  <td className="cursor-pointer px-8 py-4 font-[var(--regular)]">
                    {item.conta}
                  </td>
                  <td className="flex cursor-pointer items-center gap-4 px-8 py-4 text-primary">
                    Transferir <MoveRight className="h-5 w-5" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </TableWrapper>
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
    > tbody {
      > tr {
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
          padding: 16px;

          @media (min-width: 720px) {
            font-size: 16px;
            padding: 21px 32px;
          }
        }
      }
    }
  }
`
