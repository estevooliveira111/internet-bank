import { CheckIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}
interface Props {
  current: 1 | 2 | 3 | 4 | 5
}

export default function OnBoardingStep({ current }: Props) {
  const [steps, setSteps] = useState([
    {
      name: 'Informações básicas',
      description: 'Coletamos dados essenciais para conhecer você melhor.',
      href: '#',
      status: 'current',
      id: 1,
    },
    {
      name: 'Dados pessoais',
      description:
        'Garanta que sua conta seja única e segura fornecendo informações pessoais importantes.',
      href: '#',
      status: 'upcoming',
      id: 2,
    },
    {
      name: 'Endereço',
      description:
        'Essa informação é importante para personalizar nossos serviços de acordo com sua localização.',
      href: '#',
      status: 'upcoming',
      id: 3,
    },
    {
      name: 'Documentos',
      description:
        'Para garantir a segurança e evitar fraudes, solicitamos que você faça o envio de documentos de identificação válidos.',
      href: '#',
      status: 'upcoming',
      id: 4,
    },
  ])

  useEffect(() => {
    const newSteps = steps.map((step) => {
      if (step.id === current) {
        return { ...step, status: 'current' }
      } else if (step.id < current) {
        return { ...step, status: 'complete' }
      } else {
        return { ...step, status: 'upcoming' }
      }
    })

    setSteps(newSteps)
  }, [current])

  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pb-10' : '',
              'relative',
            )}
          >
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-white"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary group-hover:bg-primary">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-white">
                      {step.name}
                    </span>
                    <span className="text-sm text-white">
                      {step.description}
                    </span>
                  </span>
                </a>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-main-gray"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="group relative flex items-start"
                  aria-current="step"
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-main-white">
                      {step.name}
                    </span>
                    <span className="text-sm text-main-white">
                      {step.description}
                    </span>
                  </span>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium text-main-white">
                      {step.name}
                    </span>
                    <span className="text-sm text-main-white">
                      {step.description}
                    </span>
                  </span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
