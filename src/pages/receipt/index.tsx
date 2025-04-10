/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import { Download, PrinterIcon, XIcon } from 'lucide-react'
import { Fragment } from 'react'
import styled from 'styled-components'

import { useAuth } from '@hooks/auth'
import { useCustomer } from '@hooks/customer'

import { DatePicker } from '@/components/date-picker'
import { ArrowLeftIcon } from '@components/icons/arrow-left'
import { ArrowRightIcon } from '@components/icons/arrow-right'
import { Skeleton } from '@components/skeleton'

import { TableHeader } from './components/table-header'

import { Transaction } from '@utils/description'
import { documentFormat } from '@utils/document-format'
import { numberToCurrent } from '@utils/number-to-currency'

import { useReceipt } from './use-receipt'

export const Receipt = () => {
  const { user } = useAuth()
  const { customer } = useCustomer()

  const {
    open,
    setOpen,
    items,
    current,
    setExportType,
    loading,
    setCurrent,
    handlePrevious,
    handleNext,
    exportUrl,
    handleDownload,
    sortOptions,
    handleTypeChange,
    classNames,
    handleCategoryChange,
    datePickerOpen,
    setDatePickerOpen,
    setEndDate,
    currentPage,
    setStartDate,
    showTransaction,
  } = useReceipt()

  return (
    <>
      <Container>
        <div className="flex flex-col">
          <DatePicker
            open={datePickerOpen}
            setOpen={setDatePickerOpen}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <p>{exportUrl}</p>
          <div className="flex-1 px-8 pb-8 pt-4">
            <Disclosure as="div" aria-labelledby="filter-heading">
              <div className="mb-9 mt-6 flex">
                <Menu as="div" className="relative inline-block">
                  <div className="flex">
                    <Menu.Button className="flex w-max items-end rounded-md border border-dark-blue bg-[var(--brand-background)] p-2 text-primary shadow">
                      <Download className="mr-[10px] text-primary" />
                      <span className="pr-1">Exportar</span>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute top-9 z-10 ml-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option}>
                            {({ active }) => (
                              <a
                                role="button"
                                onClick={() => setExportType(option)}
                                className={classNames(
                                  option
                                    ? 'divide-y font-semibold tracking-widest text-gray-900'
                                    : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm',
                                )}
                              >
                                {option}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </Disclosure>

            <TableWrapper>
              {!loading && items.length <= 0 && (
                <div className="p-6">
                  <div className="text-center">
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Nenhum lançamento para o período selecionado
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Selecione outro período ou faça uma transferência e comece
                      a usar agora mesmo
                    </p>
                  </div>
                </div>
              )}

              <Skeleton space={4} isActive={loading} repeat={5} />

              <table className="w-full">
                <tbody className="border-collapse rounded-lg border-none">
                  {!loading && items.length > 0 && (
                    <tr className="relative bg-[var(--brand-background)]">
                      <th>
                        <button
                          className="flex items-center justify-between rounded-lg bg-transparent px-2 py-3 text-base text-gray-400"
                          onClick={() => setDatePickerOpen(!datePickerOpen)}
                        >
                          <span className="font-medium text-primary">Data</span>
                          <span className="ml-6 flex items-center">
                            <ChevronDownIcon
                              className="h-5 w-5 transform"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      </th>
                      <TableHeader
                        id="types"
                        name="Tipo"
                        type="radio"
                        options={[
                          { value: '', label: 'Nenhum' },
                          { value: 'credit', label: 'Lucros' },
                          { value: 'debit', label: 'Despesas' },
                        ]}
                        setFilter={handleTypeChange}
                      />
                      <TableHeader
                        id="categories"
                        name="Categoria"
                        type="radio"
                        options={[
                          { value: 'pix', label: 'Pix' },
                          { value: 'ted', label: 'TED ' },
                          { value: 'tev', label: 'TEV' },
                          { value: 'fail', label: 'Incompletas' },
                          {
                            value: 'slippayment',
                            label: 'Pagamento de boletos',
                          },
                          {
                            value: 'bank-slipreceipt',
                            label: 'Recebimento de boletos',
                          },
                          { value: 'PIX-reversal', label: 'Estorno de Pix' },
                          { value: 'ted-reversal', label: 'Estorno de TED' },
                        ]}
                        setFilter={handleCategoryChange}
                      />
                      <th>
                        <span className="text-base font-medium text-primary">
                          Valor
                        </span>
                      </th>
                    </tr>
                  )}

                  {!loading &&
                    items.map((item) => {
                      return (
                        <tr
                          className="relative"
                          key={item.id}
                          onClick={() =>
                            showTransaction(item as unknown as Transaction)
                          }
                        >
                          <td>{dayjs(item.date).format('DD/MM/YYYY')}</td>
                          <td>
                            {item.type === 'credit' ? 'Crédito' : 'Débito'}
                          </td>
                          <td>
                            {item?.description || item.payer}

                            {/* {getDescription(item)} */}
                          </td>
                          <td>
                            <span
                              style={{
                                color:
                                  item.type === 'credit'
                                    ? 'var(--green)'
                                    : 'var(--red)',
                              }}
                            >
                              {numberToCurrent(Number(item.amount))}
                            </span>

                            <span
                              style={{
                                marginLeft: '25px',
                                display:
                                  item.type === 'credit' ? 'none' : 'inline',
                              }}
                            >
                              <PrinterIcon
                                color="var(--gray)"
                                className="inline h-4 w-4"
                              />
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </TableWrapper>
          </div>
          `
          <div className="flex w-[280px] items-center justify-between self-center p-8">
            <span
              onClick={handlePrevious}
              className="font[var(--regular)] cursor-pointer text-base text-gray-light"
            >
              <ArrowLeftIcon color="var(--primary)" width={16} height={16} />
            </span>

            <span className="font[var(--regular)] text-base text-gray-light">
              Página {currentPage}
            </span>

            <span
              onClick={handleNext}
              className="font[var(--regular)] cursor-pointer text-base text-gray-light"
            >
              <ArrowRightIcon color="var(--primary)" width={16} height={16} />
            </span>
          </div>
        </div>
      </Container>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen(false)
            setCurrent({} as Transaction)
          }}
        >
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            <div className="ml-4 flex-shrink-0">
                              <span
                                onClick={() => handleDownload()}
                                className="flex cursor-pointer items-center font-medium"
                              >
                                {/* {isExporting && (
                                  <CircleNotch
                                    weight="bold"
                                    className="w-5 h-5 animate-spin mr-2"
                                  />
                                )} */}
                                Fazer download do comprovante{' '}
                                <Download className="ml-2" />
                              </span>
                            </div>
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="relative mt-6 flex-1 px-4 sm:px-6"
                        id="comprovante"
                      >
                        {current ? (
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div
                              className="h-full border-2 border-dashed border-gray-200"
                              aria-hidden="true"
                            >
                              <div>
                                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                  <div className="flex justify-between">
                                    <h2 className="px-6 py-4 text-lg font-medium text-gray-900">
                                      Comprovante
                                    </h2>
                                    <img
                                      src={customer.logo.dark}
                                      width="120"
                                      alt="Bank"
                                      className="px-6 py-4"
                                    />
                                  </div>

                                  <div className="px-4 py-5 sm:px-6">
                                    <span>De</span>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                      {user.name}
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                      {documentFormat(user.document)}
                                    </p>
                                  </div>
                                  <div className="px-4 py-5 sm:px-6">
                                    <span>Para</span>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                      {current?.payer || current?.receiver}
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                      {documentFormat(
                                        current.payer_document ||
                                          current.receiver_document ||
                                          '',
                                      )}
                                    </p>
                                  </div>
                                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                      <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                          Nome
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                          {current.payer || current.receiver}
                                        </dd>
                                      </div>
                                      <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                          Documento
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                          {documentFormat(
                                            current.payer_document ||
                                              current.receiver_document ||
                                              '',
                                          )}
                                        </dd>
                                      </div>
                                      <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                          {current.category === 'PIX'
                                            ? 'Pix'
                                            : 'Banco'}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                          {current.receiver_key ||
                                            current.bank_code +
                                              ' ' +
                                              current.bank +
                                              ' ' +
                                              '(Qr Code)' ||
                                            current.bank_code ||
                                            '324'}
                                        </dd>
                                      </div>
                                      <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                          Agência/Conta
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                          {current.agency}/{current.account}
                                        </dd>
                                      </div>
                                      <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                          Data
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                          {dayjs(current.date).format(
                                            'DD/MM/YYYY',
                                          )}
                                        </dd>
                                      </div>
                                      <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                          Valor
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                          {numberToCurrent(
                                            Math.abs(Number(current.amount)),
                                          )}
                                        </dd>
                                      </div>
                                    </dl>
                                    <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8">
                                      <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                          Identificador:
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                          {current.id}
                                        </dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>
                              </div>

                              {/* Comprovante */}
                              {/* <div className="border-t border-gray-200 px-4 py-5 sm:px-6 sm:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Comprovante (PDF)</dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                      <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                      <span className="ml-2 flex-1 w-0 truncate">comprovante.pdf</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 print:hidden">
                                      <span onClick={() => handleDownload("1")} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                                      {isExporting && <CircleNotch weight="bold" className="w-5 h-5 animate-spin mr-2"/>} Fazer download
                                      </span>
                                    </div>
                                  </li>
                                </ul>
                              </dd>
                        </div> */}
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

const Container = styled.div`
  height: calc(100vh - 80px);
  background-color: var(--background);
`

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
          cursor: pointer;

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
