import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export function dateFormat(dataISO: string | number | Date): string {
  const data = new Date(dataISO)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()

  return `${dia}/${mes}/${ano}`
}

dayjs.extend(customParseFormat)
dayjs.locale('pt-br')

export function dateFormatWithHours(inputDate: Date | string): string {
  const date = dayjs(inputDate, { format: 'YYYY-MM-DD HH:mm' })
  const formattedDate = date.format('DD MMM YYYY - HH:mm')
  return formattedDate
}

/* Este metodo recebe a data dd/mm/aaaa e devolve aaaa-mm-dd */
export function formatDateToYYYYMMDD(inputDate: string): string {
  const parts = inputDate.split('/')

  const day = parts[0]
  const month = parts[1]
  const year = parts[2]
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
    2,
    '0',
  )}`
  return formattedDate
}
