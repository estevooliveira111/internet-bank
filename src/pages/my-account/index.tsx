import { useState } from 'react'

import { Account } from '@pages/my-account/account'
import { Limits } from '@pages/my-account/limits'
import { cn } from '@utils/cn'

export function MyAccount() {
  const [tabs, setTabs] = useState([
    { name: 'Minha Conta', href: 'account', current: true },
    { name: 'Meus Limites', href: 'limits', current: false },
  ])

  const [currentTab, setCurrentTab] = useState(tabs[0])

  function changeTab(name: string) {
    const oldTabs = tabs.map((tab) => {
      if (tab.name === name) {
        tab.current = true
        setCurrentTab(tab)
      } else {
        tab.current = false
      }
      return tab
    })

    setTabs(oldTabs)
  }

  return (
    <div className="h-full min-h-screen p-8">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={currentTab.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <span
              key={tab.name}
              onClick={() => changeTab(tab.name)}
              className={cn(
                tab.current
                  ? 'bg-primary text-dark-blue hover:opacity-90'
                  : 'border border-main-gray text-gray-dark hover:bg-gray-light hover:text-gray-700',
                'cursor-pointer rounded-md px-3 pb-1.5 pt-2 text-sm font-medium',
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </span>
          ))}
        </nav>
      </div>

      <div className="mt-8 rounded-lg bg-main-white p-6 shadow-sm">
        {currentTab.href === 'account' && <Account />}

        {currentTab.href === 'limits' && <Limits />}
      </div>
    </div>
  )
}
