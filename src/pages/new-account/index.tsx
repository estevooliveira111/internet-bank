import { useEffect, useState } from 'react'
import { AddCompany } from './components/company'
import { AddCompanyAddress } from './components/company-address'
import { api } from '@/lib/axios'
import { Skeleton } from '@/components/skeleton'
import { documentFormat } from '@/utils/document-format'
import { Button } from '@/components/button'
import { useNavigate } from 'react-router-dom'

interface Company {
  id: string
  hasAccount: boolean
  document: string
  name: string
  display_name: string
  account: {
    id: string
    status: string
  }
}

export default function NewAccount() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()

  useEffect(() => {
    getCompaniesAndAccounts()
    setLoading(() => false)
  }, [])

  async function getCompaniesAndAccounts() {
    try {
      const companyPromise = api
        .get('companies/show-many')
        .then((response) => response.data)

      const accountsPromise = api
        .get('accounts')
        .then((response) => response.data)

      const [companies, accounts] = await Promise.all([
        companyPromise,
        accountsPromise,
      ])

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const companyWithAccount = companies?.companies?.map((company: any) => {
        const account =
          accounts?.accounts?.find(
            (account: { internal_ref: string; id: string }) =>
              account?.internal_ref === company.id,
          ) || false

        return {
          ...company,
          hasAccount: !!account,
          account: account || {},
        }
      })

      setCompanies(() => companyWithAccount)
    } catch (err) {
      //
    } finally {
      setLoading(() => false)
    }
  }

  const [step, setStep] = useState(-1)
  const [companyId, setCompanyId] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSelectedAccount(company: any) {
    if (company?.account?.id) {
      try {
        await api.post('accounts/change', {
          accountId: company.account.id,
        })
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        navigation('/')
      } catch (err) {
        //
      }
    }
  }

  function handleCompleteCompanyData(id: string) {
    if (!id) {
      setStep(-1)
    } else {
      setCompanyId(() => id)
      setStep(1)
    }
  }

  return (
    <div className="h-full min-h-screen p-8">
      {step === -1 && (
        <div className="flow-root">
          <div className="mb-2 flex justify-between">
            <h1 className="mt-2 block text-2xl text-tx-primary">
              Minhas Empresas
            </h1>
            <Button title="Nova Empresa" onClick={() => setStep(0)} />
          </div>
          <div className="-mx-4 -my-2 overflow-x-auto p-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full rounded-md bg-white py-2 align-middle sm:px-6 lg:px-8">
              {loading && (
                <div className="p-4">
                  <Skeleton isActive={loading} repeat={4} />
                </div>
              )}
              {!loading && (
                <>
                  {companies?.length === 0 ? (
                    <div className="flex flex-col justify-center">
                      <p className="pb-2 pt-2 text-center">
                        Você ainda não possui nenhuma empresa.
                      </p>
                      <button
                        className="pb-2 pt-2 text-center"
                        onClick={() => setStep(0)}
                      >
                        Clique aqui para cadastrar uma nova empresa.
                      </button>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-300 ">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                          >
                            CNPJ
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            Razão Social
                          </th>
                          {/* <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            Nome fantasia
                          </th> */}

                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            className="relative py-3 pl-3 pr-4 sm:pr-0"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 ">
                        {companies?.map((company) => (
                          <tr key={company.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                              {documentFormat(company.document)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm ">
                              {company.name}
                            </td>
                            {/* <td className="whitespace-nowrap px-3 py-4 text-sm ">
                              {company.display_name}
                            </td> */}
                            <td className="whitespace-nowrap px-3 py-4 text-sm ">
                              {company.account?.status || 'Incompleto'}
                            </td>
                            <td>
                              <Button
                                title="Acessar"
                                onClick={() => handleSelectedAccount(company)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {step !== -1 && (
        <>
          <div className="mt-8 rounded-lg bg-main-white p-6 shadow">
            {step === 0 && (
              <AddCompany onComplete={handleCompleteCompanyData} />
            )}

            {step === 1 && (
              <AddCompanyAddress
                onComplete={(step) => setStep(step)}
                companyId={companyId}
              />
            )}

            {step === 2 && (
              <>
                <h2 className="color-tx-primary pb-4 text-2xl">Parabéns</h2>

                <div className="flex items-center">
                  <div className="flex flex-1 flex-col">
                    <p>
                      Aguarde enquanto processamos a análise dos seus dados.
                      Dentro de 24 horas, enviaremos a resposta diretamente para
                      o seu e-mail.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
