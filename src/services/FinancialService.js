import { AcessAPI } from '@/boot/API';

export default class FinancialService {

  async getTransactions(params = {}) {
    return await AcessAPI.get('consolidation/transactions', {params})
  }

  async getTransactionsTypes() {
    return await AcessAPI.get("consolidation/transaction-types")
  }

  async createBoleto(data) {
    return await AcessAPI.post("boleto/create", data)
  }

  async getDashboardData() {
    return await AcessAPI.get("consolidation/transactions/totals")
  }

  pixIn(data) {
    return AcessAPI.post("quickpay/pix/qrcode-fixo", data)
  }

  async sendPixOutVerificationCode(data) {
    return await AcessAPI.post('solicit-validation',
      {
        value: data.mount,
        codePix: data.codePix,
        account: data.accountId
      }
    )
  }

  async pixOut(data) {
    return await AcessAPI.post('withdraw',
      {
        key: data.key,
        account: data.accountId
      }
    )
  }

  async boletoSaida(data) {
    return await AcessAPI.post('quickpay/boleto-saida-sicred', data)
  }

  async getFixedQRCode() {
    return AcessAPI.get(`quickpay/pix/image`)
  }

  async pixOutSicred(data) {
    return AcessAPI.post(`quickpay/saida-sicred`, {
      "mount": data.mount,
      "keyPix": data.keyPix,
      "documentoBeneficiario": data.documentoBeneficiario,
    })
  }

}