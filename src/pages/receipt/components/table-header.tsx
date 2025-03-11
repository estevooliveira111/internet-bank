/* eslint-disable @typescript-eslint/no-explicit-any */
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { Options } from '../use-receipt'

interface Props {
  id: string
  name: string
  type: string
  options: Options[]
  setFilter: (filter: any) => void
}

type Value = string | number | false | null | undefined
type Mapping = { [key: string]: Value }

function classNames(...classes: (Value | Mapping)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function TableHeader({ id, name, type, options, setFilter }: Props) {
  return (
    <Disclosure as="th" className="border-t border-gray-200 px-4 py-6">
      {({ open }) => (
        <>
          <div className="-mx-2 -my-3 flow-root w-full">
            <Disclosure.Button className="flex items-center justify-between rounded-lg bg-transparent px-2 py-3 text-base text-gray-400">
              <span className="font-medium text-primary">{name}</span>
              <span className="ml-6 flex items-center">
                <ChevronDownIcon
                  className={classNames(
                    open ? '-rotate-180' : 'rotate-0',
                    'h-5 w-5 transform',
                  )}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className="absolute z-10 mt-2 rounded-lg bg-white p-3 shadow-lg">
            <div>
              {options.map((option: Options, index: number) => (
                <div
                  key={option.label}
                  className="flex items-center rounded px-3 py-3 hover:bg-gray-100"
                >
                  <input
                    id={`filter-mobile-${id}-${index}`}
                    name={`${id}[]`}
                    type={type}
                    value={option.value}
                    onChange={setFilter}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-mobile-${id}-${index}`}
                    className="ml-3 h-full w-full text-sm text-gray-500"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
