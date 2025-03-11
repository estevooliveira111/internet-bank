import axios, { isAxiosError } from 'axios'

const api = axios.create({
  baseURL: 'https://production.stric.com.br/banking',
  // baseURL: 'http://localhost:3333/banking',,
})

interface ResponseError {
  code: string
  error: string
  message: string
  data: unknown
}

export function parseError(err: unknown): ResponseError {
  if (isAxiosError(err)) {
    return {
      code: err.response?.data?.code,
      error: err.response?.data?.error,
      message: err.response?.data?.message,
      data: [],
    }
  }

  return {
    code: '',
    error: '',
    message: '',
    data: [],
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      // console.log(error.response?.data)
      // console.log(error.config?.headers)
      // console.log(error.config?.url)
      // console.log(error.response?.status)
      // if (error.response?.status === 403 || error.response?.status === 401) {
      //   window.location.href = '/signout'
      //   return Promise.resolve()
      // }
    }
    return Promise.reject(error)
  },
)

export { api }
