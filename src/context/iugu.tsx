/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'

interface IuguInstance {
  setAccountID(token: string): void
  setTestMode(mode: boolean): void
  createPaymentToken(form: any, throwOnError?: any): Promise<any>
}

interface IuguModule {
  impl: () => IuguInstance
  setAccountToken(token: string): void
  setTestMode(mode: boolean): void
  createPaymentToken(form: any, throwOnError?: boolean): Promise<any>
}

const Iugu: IuguModule = {
  impl() {
    if (!(window as any).Iugu) {
      throw new Error('Iugu script has not been loaded yet.')
    }

    return (window as any).Iugu
  },

  setAccountToken(token) {
    this.impl().setAccountID(token)
  },
  setTestMode(mode) {
    this.impl().setTestMode(mode)
  },

  createPaymentToken(form, throwOnError = false) {
    return new Promise((resolve, reject) => {
      this.impl().createPaymentToken(form, (response: any) => {
        if (response.errors && throwOnError) {
          return reject(response)
        }

        resolve(response)
      })
    })
  },
}

export default function useIugu(accountId: string) {
  useEffect(() => {
    if (document.getElementById('iugu-script')) {
      Iugu.setAccountToken(accountId)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.iugu.com/v2'
    script.id = 'iugu-script'

    script.onload = () => {
      Iugu.setAccountToken(accountId)
    }

    document.head.appendChild(script)

    return () => {
      const scriptElement = document.getElementById('iugu-script')
      if (scriptElement) {
        scriptElement.remove()
      }
    }
  }, [accountId])

  return Iugu
}
