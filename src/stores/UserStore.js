import Toast from '@/boot/Toast'
import { defineStore } from 'pinia'
import { AcessAPI } from '@/boot/API';
import { useBalanceStore } from '@/stores/BalanceStore';
import router from '@/router';

export const UserStore = defineStore('UserStore', {

  state: () => ({
    isLoggedIn: false,
    mainAccount: false,
    loadMainAccount: false,

    balance: null,
    balanceView: false,

    user: null,
    accounts: false,
    role: false
  }),

  actions: {

    async login(data) {
      try {
        const response = await AcessAPI.post('access/auth/login', {
          email: data.email,
          password: data.password
        })

        localStorage.setItem('token', response.data.token)

        this.user = response.data.user;
        this.role = response?.data?.roles?.name;
        this.mainAccount = response.data.account;

        this.me()

        return response
      } catch (error) {
        console.log(error);
        Toast.run('error', error?.response?.data.message || error?.response?.data?.error || 'Houve um erro, tente novamente mais tarde a')
        throw error
      }
    },

    setAccount() {
      this.loadMainAccount = true;
      AcessAPI.get("access/auth/me")
        .then(({ data }) => {

          this.accounts = data.accounts.map((accounts) => {
            const account = accounts.account;
            return { ...account };
          });

          const currentAccountId = parseInt(localStorage.getItem('currentAccountId'))
          const account = this.accounts.find((account) => account.id === currentAccountId) ? this.accounts.find((account) => account.id === currentAccountId) : this.accounts[0].account;


          console.log(data);
          console.log(currentAccountId);
          console.log(account);

          this.mainAccount = {
            id: data.id,
            email: data.email,
            token: data.token,
            agency: account.agency,
            account: account.account,
            name: account.name,
            phone: data.phone,
            dt_birth: data.dt_birth,
            document: data.document,
          }
          this.isLoggedIn = false;
        })
        .catch((repsonse) => { this.isLoggedIn = true; console.log(repsonse) })
        .finally(() => this.loadMainAccount = false)
    },

    changeAccount(account) {
      // this.currentAccount = account
      // this.tokenAccount = account.token
      // console.log(account);

      console.log(account);
      localStorage.setItem('currentAccountId', account.id)

      const balanceStore = useBalanceStore()
      balanceStore.setBalance()
      this.setAccount()

      // reload the url
      window.location.reload();
    },

    logout() {
      this.isLoggedIn = true;
      AcessAPI.post('access/auth/logout')
        .then(() => {
          this.isLoggedIn = true;
          localStorage.removeItem('token')
          localStorage.removeItem('currentAccountId')
          router.push({ name: 'login' })
          window.location.reload();
        })
        .catch((error) => {
          Toast.run('error', error.repsonse.data.message || error.repsonse.data.error || 'Houve um error, tente novamente mais tarde')
        })
    },

    async balance() {
      return await AcessAPI.get('consolidation/balance')
        .then((response) => {
          this.balance = response.data.balance;
        })
    },

    async me() {
      const token = localStorage.getItem('token')
      const currentAccountId = parseInt(localStorage.getItem('currentAccountId'))
      console.log(currentAccountId)
      if (!token) {
        return router.push({ name: 'login' })
      }

      await AcessAPI
        .get("access/auth/me")
        .then((response) => {

          if (response.data.accounts.length === 0) {
            throw new Error('Este usuário não está associado a nenhuma conta')
          }

          if (response.data) {
            this.mainAccount = response.data.account;
            this.accounts = response.data.accounts;
            this.balance()
          } else {
            throw new Error('Error retrieving account information')
          }

          return response
        })
        .catch((error) => {
          throw error
        })


    }

  }
})
