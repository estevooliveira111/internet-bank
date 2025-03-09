import { defineStore } from 'pinia'

export const useBoletoPixStore = defineStore('boletoPix', {
  state: () => ({
    boleto: false,
    pix: false,
    isBoletoCreated: false,
    isPixCreated: false
  }),
  actions: {
    setBoleto(boleto_) {
      console.log(boleto_, 'entrou aqui')

      // Note: The utilization of localStorage is necessary in this context due to the inclusion of the target="_blank" attribute within the anchor tag (<a>).
      // When users click the 'ver boleto' button, it triggers the opening of a new window, resulting in the loss of stored information.
      // Hence, the localStorage feature is employed to persist data within the browser environment.
      // Removing the target="_blank" attribute would restore the normal functionality of storage.

      localStorage.setItem('isBoletoCreated', JSON.stringify(true))
      localStorage.setItem('boleto', JSON.stringify(boleto_))

      this.isBoletoCreated = true
      this.boleto = {
        txid: boleto_.txid,
        value: boleto_.value,
        expired: boleto_.expired,
        barcode: boleto_.barcode,
        digitableLine: boleto_.digitableLine,
        created_at: boleto_.created_at
      }
    },
    setPix(pix) {
      localStorage.setItem('isPixCreated', JSON.stringify(true))
      localStorage.setItem('pix', JSON.stringify(pix))

      this.isPixCreated = true
      this.pix = {
        txid: pix.txid,
        json: pix.json,
        value: pix.value,
        qrcode: pix.qrcode,
        created_at: pix.created_at
      }
    },

    setIsPixCreatedToFalse() {
      ;(this.isPixCreated = false), (this.pix = {})
    },

    setIsBoletoCreatedToFalse() {
      localStorage.setItem('isBoletoCreated', JSON.stringify(false))

      this.isBoletoCreated = false
      this.boleto = {}
    }
  }
})
