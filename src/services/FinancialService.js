import { globalVars } from '@/boot/config'
import { AcessAPI } from '@/boot/API';

export default class FinancialService {

  async getTransactions(url, data) {
    // Im using the .replace because the backend is returning an http url so I need to convert to htpps
    let url_ = url
      ? url.replace(/^http:\/\//i, 'https://') + '&'
      : `${globalVars.API_URL}consolidation/transactions?`

    if (data) {
      // NOTE: Check which values will be used

      // Add parameters if they exist in the data object
      if (data.fromDate) url_ += `fromDate=${data.fromDate}&`
      if (data.toDate) url_ += `toDate=${data.toDate}&`
      if (data.search) url_ += `search=${data.search}&`
      // if (data.filters.length > 0) url_ += `type=[${data.filters}]&` // NOTE: API accept one filter per request
      if (data.itemsPerPage) url_ += `per_page=${data.itemsPerPage}&`
    }

    // Remove trailing '&' if it exists
    url_ = url_.endsWith('&') ? url_.slice(0, -1) : url_

    return await AcessAPI.get(url_, {
      params: {
        type: JSON.parse(JSON.stringify(data.filters))
      }
    })
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