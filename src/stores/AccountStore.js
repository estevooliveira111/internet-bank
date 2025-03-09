import { defineStore } from 'pinia'
import { FormatMonetaryValue } from '../utils/FormatMonetaryValue';

export const useAccountStore = defineStore('account', {

  state: () => ({
    isLoggedIn: false,
    balance: false,
    balanceView: false,
    mainAccount: false,
    accounts: false,
    currentAccount: false,
    tokenAccount: false,
    role: false
  }),

  actions: {

    setAccount(data) {
      const currentAccountId = localStorage.getItem('currentAccountId');
      this.isLoggedIn = true,

        this.mainAccount = {
          id: data.mainAccount.id,
          email: data.mainAccount.email,
          name: data.mainAccount.name,
          phone: data.mainAccount.phone,
          dt_birth: data.mainAccount.dt_birth,
          document: data.mainAccount.document
        }
      this.role = data.mainAccount.role
      this.accounts = data.accounts
      this.admin = data.mainAccount.roles >= 0;
      this.currentAccount = data.currentAccount.account
      this.tokenAccount = data.tokenAccount;

      if (!currentAccountId)
      {localStorage.setItem('currentAccountId', data.currentAccount.id)}
    },

    changeAccount(account) {
      const currentAccountId = localStorage.getItem('currentAccountId');

      if (!currentAccountId) {
        this.currentAccount = account;
        this.tokenAccount = account.token;
        localStorage.setItem('currentAccountId', account.id);

        console.log('currentAccountId definido como: ' + account.id);
      } else {
        console.log('currentAccountId já está definido como: ' + currentAccountId);
      }
    },

    setBalance(balance) {
      this.balance = balance
    },

    balancee() {
      if (this.balanceView) {
        return FormatMonetaryValue(this.balance)
      }
      else {
        return '******'
      }
    },

    setView() {
      this.balanceView = !this.balanceView
    },

    logout() {
      this.isLoggedIn = false,
        this.balance = false,
        this.mainAccount = false,
        this.accounts = false,
        this.currentAccount = false
      this.tokenAccount = false
    }

  }
})
