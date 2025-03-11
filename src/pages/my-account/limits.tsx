import { FormEvent, useEffect, useState } from 'react'

import { api } from '@lib/axios'

import { MyAccountHeader } from '@pages/my-account/components/header'
import { LimitsInput } from '@pages/my-account/components/limits-input'
import { ReadOnlyInput } from '@pages/my-account/components/read-only-input'
import { SaveButton } from '@pages/my-account/components/save-button'

export interface Limits {
  pending: {
    value: number
  }
  active: {
    value: number
  }
}

export interface UpdateLimits {
  value: number
}

export interface UpdateResponse {
  data: {
    bankId: string
    accountId: string
    accountType: string
    name: string
    documentNumber: string
    limitId: string
    type: string
    service: string
    status: string
    value: number
    origin: string
    accountNumber: string
    createdAt: string
    updatedAt: string
  }[]
}

export interface Response {
  limits: Limits
}

export function Limits() {
  const [loading, setLoading] = useState(false)

  const [pixDayLimit, setPixDayLimit] = useState('')
  const [pixDayLimitNewValue, setPixDayLimitNewValue] = useState('')
  const [pixDayLimitPending, setPixDayLimitPending] = useState('')
  const [pixDayValue, setPixDayValue] = useState(0)

  const [pixNightLimit, setPixNightLimit] = useState('')
  const [pixNightLimitNewValue, setPixNightLimitNewValue] = useState('')
  const [pixNightLimitPending, setPixNightLimitPending] = useState('')
  const [pixNightValue, setPixNightValue] = useState(0)

  const [tedLimit, setTedLimit] = useState('')
  const [tedLimitNewValue, setTedLimitNewValue] = useState('')
  const [tedLimitPending, setTedLimitPending] = useState('')
  const [tedValue, setTedValue] = useState(0)

  const [bankSlipLimit, setBankSlipLimit] = useState('')
  const [bankSlipLimitNewValue, setBankSlipLimitNewValue] = useState('')
  const [bankSlipLimitPending, setBankSlipLimitPending] = useState('')
  const [bankSlipValue, setBankSlipValue] = useState(0)

  const [edit, setEdit] = useState(true)
  const [pendingLimits, setPendingLimits] = useState(false)

  const handleChangePixDayLimit = (
    event: FormEvent<Element>,
    value: number,
    masked: string,
  ) => {
    event.preventDefault()
    setPixDayValue(value)
    setPixDayLimitNewValue(masked)
  }

  const handleChangePixNightLimit = (
    event: FormEvent<Element>,
    value: number,
    masked: string,
  ) => {
    event.preventDefault()
    setPixNightValue(value)
    setPixNightLimitNewValue(masked)
  }

  const handleChangeTedLimit = (
    event: FormEvent<Element>,
    value: number,
    masked: string,
  ) => {
    event.preventDefault()
    setTedValue(value)
    setTedLimitNewValue(masked)
  }

  const handleChangeBankSlipLimit = (
    event: FormEvent<Element>,
    value: number,
    masked: string,
  ) => {
    event.preventDefault()
    setBankSlipValue(value)
    setBankSlipLimitNewValue(masked)
  }

  useEffect(() => {
    api.get<Response>('/limits?type=day_time&service=pix').then(({ data }) => {
      setPixDayLimit(data.limits.active.value.toString())
      setPixDayLimitPending(data.limits.pending.value.toString())
      setPendingLimits(!!data.limits.pending)
    })
    api
      .get<Response>('/limits?type=night_time&service=pix')
      .then(({ data }) => {
        setPixNightLimit(data.limits.active.value.toString())
        setPixNightLimitPending(data.limits.pending.value.toString())
        setPendingLimits(!!data.limits.pending)
      })
    api.get<Response>('/limits?type=day_time&service=ted').then(({ data }) => {
      setTedLimit(data.limits.active.value.toString())
      setTedLimitPending(data.limits.pending.value.toString())
      setPendingLimits(!!true)
    })
    api
      .get<Response>('/limits?type=day_time&service=bank_slip')
      .then(({ data }) => {
        setBankSlipLimit(data.limits.active.value.toString())
        setBankSlipLimitPending(data.limits.pending.value.toString())
        setPendingLimits(!!data.limits.pending)
      })
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setLoading(true)

    if (pixDayLimitNewValue) {
      api
        .post<UpdateResponse>('/limits', {
          type: 'day_time',
          amount: pixDayValue.toString(),
          service: 'pix',
        })
        .then(({ data }) => {
          setPendingLimits(!!data)
          setPixDayLimitPending(data.data[0].value.toString())
          setPixDayLimitNewValue(pixDayLimit)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (pixNightLimitNewValue) {
      api
        .post<UpdateResponse>('/limits', {
          type: 'night_time',
          amount: pixNightValue.toString(),
          service: 'pix',
        })
        .then(({ data }) => {
          setPendingLimits(!!data)
          setPixNightLimitPending(data.data[0].value.toString())
          setPixNightLimitNewValue(pixNightLimit)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (tedLimitNewValue) {
      api
        .post<UpdateResponse>('/limits', {
          type: 'day_time',
          amount: tedValue.toString(),
          service: 'ted',
        })
        .then(({ data }) => {
          setPendingLimits(!!data)
          setTedLimitPending(data.data[0].value.toString())
          setTedLimitNewValue(tedLimit)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (bankSlipLimitNewValue) {
      api
        .post<UpdateResponse>('/limits', {
          type: 'day_time',
          amount: bankSlipValue.toString(),
          service: 'bank_slip',
        })
        .then(({ data }) => {
          setPendingLimits(!!data)
          setBankSlipLimitPending(data.data[0].value.toString())
          setBankSlipLimitNewValue(bankSlipLimit)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <MyAccountHeader
            title="Gerenciamento de Limites Financeiros"
            subtitle="Visualize e atualize os limites para suas transações."
            edit={edit}
            setEdit={setEdit}
          />

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <LimitsInput
              title="Pix (Diurno)"
              value={pixDayLimitNewValue || pixDayLimit}
              disabled={edit}
              handleChange={handleChangePixDayLimit}
            />
            <LimitsInput
              title="Pix (Noturno)"
              value={pixNightLimitNewValue || pixNightLimit}
              disabled={edit}
              handleChange={(event, value, masked) =>
                handleChangePixNightLimit(event, value, masked)
              }
            />
            <LimitsInput
              title="TED"
              value={tedLimitNewValue || tedLimit}
              disabled={edit}
              handleChange={(event, value, masked) =>
                handleChangeTedLimit(event, value, masked)
              }
            />
            <LimitsInput
              title="Pagamento de contas"
              value={bankSlipLimitNewValue || bankSlipLimit}
              disabled={edit}
              handleChange={(event, value, masked) =>
                handleChangeBankSlipLimit(event, value, masked)
              }
            />
          </div>
        </div>

        {pendingLimits && (
          <div className="border-b border-gray-900/10 pb-12">
            <MyAccountHeader
              title="Limites em Processo de Aprovação"
              subtitle="Assim que o limite for aprovado, a seção 'Meus
                Limites' será atualizada automaticamente."
              noIcon
            />

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {pixDayLimitPending && (
                <ReadOnlyInput
                  title="Pix (Diurno)"
                  value={pixDayLimitPending}
                />
              )}

              {pixNightLimitPending && (
                <ReadOnlyInput
                  title="Pix (Noturno)"
                  value={pixNightLimitPending}
                />
              )}

              {tedLimitPending && (
                <ReadOnlyInput title="TED" value={tedLimitPending} />
              )}

              {bankSlipLimitPending && (
                <ReadOnlyInput
                  title="Pagamento de contas"
                  value={bankSlipLimitPending}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SaveButton loading={loading} handleSubmit={handleSubmit} />
      </div>
    </form>
  )
}
