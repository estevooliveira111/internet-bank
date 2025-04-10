import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/auth'
import OnBoardingStep from '../step'

export function OnBoardingRejected() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/u')
    }
  }, [user, navigate])

  return (
    <>
      <div className="flex h-full min-h-screen flex-col">
        <div className="mx-auto w-full grow lg:flex">
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              <div className="mt-20 pl-4 pr-4 md:pl-20 md:pr-20">
                {/* <h1 className="color-tx-primary text-3xl font-thin">
                  Você está a poucos passos de <br /> uma nova{' '}
                  <span className="font-semibold">experiência financeira</span>
                </h1> */}
                <div className="my-4 h-[4px] w-[42px] bg-primary" />
                <p className="pb-4 text-[var(--text-secondary)]">
                  Todos os dados a seguir devem ser obrigatoriamente do titular
                  da conta
                </p>

                <>
                  <h2 className="color-tx-primary pb-4 text-2xl">
                    Conta não aprovada!
                  </h2>

                  <div className="flex items-center">
                    <div className="flex flex-1 flex-col">
                      <p>
                        Infelizmente não conseguimos aprovar sua conta. Você
                        pode tentar novamente dentro de 90 dias.
                      </p>
                    </div>
                  </div>

                  <div className="my-8 mt-40 flex items-center justify-center">
                    <button
                      onClick={() => {
                        signOut()
                      }}
                      className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-center text-main-white md:w-auto md:min-w-[300px]"
                      type="button"
                    >
                      Sair
                    </button>
                  </div>
                </>
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center justify-center bg-[var(--brand-background)] px-8 lg:flex lg:w-96">
            <OnBoardingStep current={5} />
          </div>
        </div>
      </div>
    </>
  )
}
