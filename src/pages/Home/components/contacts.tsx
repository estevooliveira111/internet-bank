import { ReactNode } from 'react'

import { HeaderContacts, HeaderWrapperContacts } from '../styles'

interface Props {
  children: ReactNode
}

export function Contacts({ children }: Props) {
  return (
    <div className="flex flex-col rounded-lg bg-main-white">
      <HeaderContacts>
        <HeaderWrapperContacts className="flex flex-col rounded-lg bg-main-white">
          <span>Contatos Frequentes</span>
        </HeaderWrapperContacts>
      </HeaderContacts>
      <div className="no-scrollbar mx-4 flex max-h-[268px] flex-col overflow-y-scroll">
        {children}
      </div>
    </div>
  )
}
