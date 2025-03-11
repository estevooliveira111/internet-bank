function validateDate(dateString: string): boolean {
  const currentDate = new Date()
  const [day, month, year] = dateString.split('/').map(Number)

  // Verificar se os valores de dia, mês e ano são válidos
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day <= 0 ||
    day > 31 ||
    month <= 0 ||
    month > 12 ||
    year <= 0
  ) {
    return false
  }

  const inputDate = new Date(year, month - 1, day)

  // Comparar com a data atual
  return inputDate >= currentDate
}

export default validateDate
