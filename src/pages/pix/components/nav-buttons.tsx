import { Link } from 'react-router-dom'

import { Button } from '@components/button'
import { ArrowLeftIcon } from '@components/icons/arrow-left'

interface Props {
  navigate: (value: number) => void
}

export function NavButtons({ navigate }: Props) {
  return (
    <div className="mb-6 flex">
      <div
        onClick={() => {
          navigate(-1)
        }}
        className="mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-white hover:opacity-80"
      >
        <ArrowLeftIcon color="var(--primary)" width={10} />
      </div>
      <div className="w-full">
        <h1 className="block text-2xl text-tx-primary">Minhas Chaves Pix</h1>
        <span className="block w-full">
          {/* Use os dados abaixo para fazer um TED para sua conta */}
          <Link to="/pix/keys/new" className="flex justify-end">
            <Button title="Nova Chave" />
          </Link>
        </span>
      </div>
    </div>
  )
}
