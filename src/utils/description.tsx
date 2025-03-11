/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Transaction {
  id: string
  description: string
  amount: number
  current_balance: string
  category: string
  type: 'credit' | 'debit'
  payer: string
  payer_document: string
  payer_key: string
  receiver: string
  receiver_document: string
  receiver_key: string
  bank: string
  bank_code: string
  agency: string
  account: string
  date: string
  credit?: boolean
}

export function getDescription(transaction: Transaction) {
  let description = ''
  let category = transaction.category
  if (category === 'SLIPPAYMENT') {
    category = 'Pagamento'
  }

  // saida
  if (transaction.type === 'debit') {
    if (transaction.category === 'FEE') {
      description = `Tarifa`
    } else {
      description = `${category} para ${
        transaction?.receiver || transaction?.receiver_key
      }`
    }
  }

  // entrada
  if (transaction.type === 'credit') {
    if (transaction.category === 'FEE') {
      description = `Tarifa`
    } else if (transaction.category === 'FAIL') {
      description = `Estorno de transferência ${transaction?.payer}`
    } else if (transaction.category === 'TEDREVERSAL') {
      description = `Estorno de ${transaction?.payer}`
    } else {
      description = `${transaction.category} recebido de ${transaction.payer}`
    }
  }

  return description
}
