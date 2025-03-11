import { Input } from '@/components/input'
import { InputSelect, SelectObject } from '@/components/input/selected'
import { banks } from '@/utils/banks'
import { ChevronLeft, MoveRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function CreateNewBeneficiary() {
  const [bankSelected, setBankSelected] = useState<SelectObject>(banks[0])
  const [accountTypeSelected, setAccountTypeSelected] = useState<
    | {
        id: string
        name: string
        hidden: string
      }
    | SelectObject
  >({
    id: 'none',
    name: '- Selecione o tipo da conta -',
    hidden: 'none',
  })

  return (
    <div className="h-full min-h-screen p-8">
      <div className="flex h-auto max-w-[400px] items-center gap-6">
        <Link to="/transfer">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-main-white shadow">
            <ChevronLeft className="h-5 w-5 text-primary" strokeWidth={3} />
          </div>
        </Link>
        <h2 className="self-end text-2xl font-semibold">
          Selecione uma das opções
        </h2>
      </div>
      <div className="flex gap-8">
        <button className="mt-10 flex w-max rounded-lg bg-main-white px-8 pb-5 pt-8 shadow">
          <h3 className="mr-3 w-32 text-start text-gray-dark">
            Transferir para Pessoa Física
          </h3>
          <MoveRight className="self-end text-primary" strokeWidth={3} />
        </button>
        <button className="mt-10 flex w-max rounded-lg bg-main-white px-8 pb-5 pt-8 shadow">
          <h3 className="mr-3 w-32 text-start text-gray-dark">
            Transferir para Pessoa Jurídica
          </h3>
          <MoveRight className="self-end text-primary" strokeWidth={3} />
        </button>
      </div>
      <div className="mt-9 flex w-full max-w-[488px] flex-col rounded-lg bg-main-white p-4 shadow">
        <h3 className="mb-6 w-max text-2xl font-semibold">Complete os dados</h3>
        <InputSelect
          label="Nome do banco"
          selected={bankSelected}
          options={banks}
          onChange={setBankSelected}
          onSearch="Digite um banco para pesquisar"
          bg
        />
        <Input
          placeholder="Digite o nome da pessoa"
          label="Nome :"
          id="contactName"
          full
          bg
        />
        <Input
          placeholder="CPF ou CNPJ do titular"
          label="CPF/CNPJ :"
          id="document"
          full
          bg
        />
        <Input
          placeholder="Código do banco (apenas números)"
          label="Código do banco :"
          id="code"
          full
          bg
        />
        <Input
          placeholder="Digite apeans os números da agência"
          label="Agência :"
          id="agency"
          full
          bg
        />
        <Input
          placeholder="Conta com dígito (apenas números)"
          label="Conta :"
          id="account"
          full
          bg
        />
        <InputSelect
          label="Tipo de chave"
          options={[
            { id: 'cc', name: 'CC', hidden: 'CC' },
            { id: 'ci', name: 'CI', hidden: 'CI' },
          ]}
          selected={accountTypeSelected}
          onChange={setAccountTypeSelected}
          bg
        />
        <button
          type="button"
          className="h-10 w-max rounded-lg bg-dark-blue px-8 py-1 text-gray-light"
        >
          Cadastrar Favorecido
        </button>
      </div>
    </div>
  )
}
