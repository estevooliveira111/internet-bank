import { Fragment, useEffect, useState } from 'react'

import { useCustomer } from '@hooks/customer'
import { api } from '@lib/axios'

import { Skeleton } from '@components/skeleton'

import { dateFormat } from '@utils/date-format'
import { Transaction } from '@utils/description'
import { numberToCurrent } from '@utils/number-to-currency'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  ChevronDownIcon,
  FunnelIcon,
} from '@heroicons/react/20/solid'

const filters = {
  price: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '25', label: '$25 - $50', checked: false },
    { value: '50', label: '$50 - $75', checked: false },
    { value: '75', label: '$75+', checked: false },
  ],
  color: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
  size: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  category: [
    { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
    { value: 'tees', label: 'Tees', checked: false },
    { value: 'objects', label: 'Objects', checked: false },
    { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
    { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
  ],
}
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

const days = [
  {
    date: 'Últimas transações',
    dateTime: '2023-03-22',
    transactions: [
      {
        id: 1,
        invoiceNumber: '00012',
        href: '#',
        amount: '$7,600.00 USD',
        tax: '$500.00',
        status: 'Paid',
        client: 'Reform',
        description: 'Website redesign',
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: '00011',
        href: '#',
        amount: '$10,000.00 USD',
        status: 'Withdraw',
        client: 'Tom Cook',
        description: 'Salary',
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: '00009',
        href: '#',
        amount: '$2,000.00 USD',
        tax: '$130.00',
        status: 'Overdue',
        client: 'Tuple',
        description: 'Logo design',
        icon: ArrowPathIcon,
      },
    ],
  },
]

export function Extract() {
  const { customer } = useCustomer()

  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    document.title = `Extrato | ${customer.display_name}`

    api.get('/transactions/show-many?page=1').then(({ data }) => {
      setTransactions(data.rows)
      setLoading(false)
    })
  }, [customer])

  return (
    <div className="flex h-full min-h-screen p-8">
      <div className="w-full rounded bg-white p-4">
        <div>
          <Skeleton isActive={loading} repeat={5} />
          {!loading && (
            <div className="mt-6 overflow-hidden border-t border-gray-100">
              {/* Filters */}
              <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className="grid items-center border-b border-t border-gray-200"
              >
                <h2 id="filter-heading" className="sr-only">
                  Filters
                </h2>
                <div className="relative col-start-1 row-start-1 py-4">
                  <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                    <div>
                      <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                        <FunnelIcon
                          className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        2 Filters
                      </Disclosure.Button>
                    </div>
                    <div className="pl-6">
                      <button type="button" className="text-gray-500">
                        Clear all
                      </button>
                    </div>
                  </div>
                </div>
                <Disclosure.Panel className="border-t border-gray-200 py-10">
                  <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                    <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                      <fieldset>
                        <legend className="block font-medium">Price</legend>
                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                          {filters.price.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center text-base sm:text-sm"
                            >
                              <input
                                id={`price-${optionIdx}`}
                                name="price[]"
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                              />
                              <label
                                htmlFor={`price-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="block font-medium">Color</legend>
                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                          {filters.color.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center text-base sm:text-sm"
                            >
                              <input
                                id={`color-${optionIdx}`}
                                name="color[]"
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                              />
                              <label
                                htmlFor={`color-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                    <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                      <fieldset>
                        <legend className="block font-medium">Size</legend>
                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                          {filters.size.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center text-base sm:text-sm"
                            >
                              <input
                                id={`size-${optionIdx}`}
                                name="size[]"
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                              />
                              <label
                                htmlFor={`size-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="block font-medium">Category</legend>
                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                          {filters.category.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center text-base sm:text-sm"
                            >
                              <input
                                id={`category-${optionIdx}`}
                                name="category[]"
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                              />
                              <label
                                htmlFor={`category-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </Disclosure.Panel>
                <div className="col-start-1 row-start-1 py-4">
                  <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
                    <Menu as="div" className="relative inline-block">
                      <div className="flex">
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({ active }) => (
                                  <a
                                    href={option.href}
                                    className={classNames(
                                      option.current
                                        ? 'font-medium text-gray-900'
                                        : 'text-gray-500',
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm',
                                    )}
                                  >
                                    {option.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </Disclosure>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <thead className="sr-only">
                      <tr>
                        <th>Amount</th>
                        <th className="hidden sm:table-cell">Client</th>
                        <th>More details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day) => (
                        <Fragment key={day.dateTime}>
                          <tr className="text-sm leading-6 text-gray-900">
                            <th
                              scope="colgroup"
                              colSpan={3}
                              className="relative isolate py-2 font-semibold"
                            >
                              <time dateTime={day.dateTime}>{day.date}</time>
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                            </th>
                          </tr>
                          {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="relative py-5 pr-6">
                                <div className="flex gap-x-6">
                                  {transaction.type === 'credit' ? (
                                    <ArrowUpCircleIcon
                                      className="hidden h-6 w-5 flex-none text-green-400 sm:block"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ArrowDownCircleIcon
                                      className="hidden h-6 w-5 flex-none text-red-400 sm:block"
                                      aria-hidden="true"
                                    />
                                  )}
                                  <div className="flex-auto">
                                    <div className="flex items-start gap-x-3">
                                      <div className="text-sm font-medium leading-6 text-gray-900">
                                        {dateFormat(transaction.date)}
                                      </div>
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-gray-500">
                                      {/* {numberToCurrent(
                                        Number(transaction.amount) / 100,
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                              </td>
                              <td className="hidden py-5 pr-6 sm:table-cell">
                                <div className="text-sm leading-6 text-gray-900">
                                  {transaction?.description ||
                                    transaction.payer}
                                  {/* {getDescription(transaction)} */}
                                </div>
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  {transaction.description}
                                </div>
                              </td>
                              <td className="py-5 text-right">
                                {/* <div className="flex justify-end">
                                  <a
                                    href={transaction.description}
                                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                  >
                                    View
                                    <span className="hidden sm:inline">
                                      {' '}
                                      transaction
                                    </span>
                                    <span className="sr-only">
                                      , invoice #{transaction.description},{' '}
                                      {transaction.description}
                                    </span>
                                  </a>
                                </div> */}
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  {numberToCurrent(Number(transaction.amount))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
