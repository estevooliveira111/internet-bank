import { defineStore } from 'pinia'
import { AcessAPI } from '@/boot/API';
import { FormatMonetaryValue } from '../utils/FormatMonetaryValue';

export const useBalanceStore = defineStore('balance', {
  
  state: () => ({
    balance: 0,
    balanceView: false,
    loadBalance: false,
  }),

  actions: {

    balancee() {
      if (this.balanceView)
        return FormatMonetaryValue(this.balance)
      return '******'
    },

    setBalance() {
      this.loadBalance = true;
      AcessAPI.get('consolidation/balance')
      .then( ({data}) => {
        this.balance = data.balance
        this.balanceView = localStorage.getItem('balanceView')
      })
      .finally( () => this.loadBalance = true )
    },

    setView() {
      localStorage.setItem('balanceView', !this.balanceView)
      this.balanceView = !this.balanceView
    }

  }
})
