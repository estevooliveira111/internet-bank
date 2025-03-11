import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface Props {
  step: number
  setStep: (step: number) => void
  pageTitle?: string
  pageTwoTitle?: string
}

export function GoBack({ step, setStep, pageTitle, pageTwoTitle }: Props) {
  const navigate = useNavigate()

  return (
    <div className="mb-6 flex items-center ">
      <div
        onClick={() => {
          step === 1 ? navigate(-1) : setStep(1)
        }}
        className="mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-white shadow-sm hover:opacity-80"
      >
        <ChevronLeft className="h-7 w-7 text-primary" strokeWidth={2.2} />
      </div>
      <h1 className="mt-1 text-2xl text-tx-primary">
        {step === 1 ? pageTitle : pageTwoTitle}
      </h1>
    </div>
  )
}
