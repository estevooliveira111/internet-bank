import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

interface ObjectInputSelectProps {
  label: string
  selected: any
  options: any[]
  onChange: (select: any) => void
  onSearch?: string
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export function PixKeyInputSelect({
  label,
  selected,
  options,
  onChange,
  onSearch,
}: ObjectInputSelectProps) {
  const [search, setSearch] = useState('')
  const [searchOptions, setSearchOptions] = useState(options)

  useEffect(() => {
    if (search.length >= 2) {
      const newOptions = options.filter((op) =>
        op.hidden.includes(String(search).toLowerCase()),
      )
      setSearchOptions(newOptions)
    } else {
      setSearchOptions(options)
    }
  }, [search, options])

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <div className="mb-6 w-full max-w-[490px] rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
          <Listbox.Label className="block text-base text-tx-primary">
            {label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className=" relative w-full  cursor-default rounded-md py-2 pl-3 pr-10 text-left focus:outline-none">
              <span className="block truncate">{selected.key}</span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {onSearch && (
                  <input
                    name="b"
                    placeholder={onSearch}
                    value={search}
                    autoFocus
                    onChange={(input) => setSearch(input.target.value)}
                    className="block w-full border-0 bg-transparent p-0 px-3 py-3 text-tx-primary focus:ring-0"
                  />
                )}

                {searchOptions.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {option.key}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}
