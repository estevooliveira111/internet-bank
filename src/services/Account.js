import router from '@/router'
import Toast from '@/boot/Toast'
import { useAccountStore } from '@/stores/AccountStore'
import { AcessAPI } from '@/boot/API';
import axios from 'axios';

class Account {

  async accountInformation() {
    return await AcessAPI.get('access/auth/me')
  }

  async registerAccount(data, type) {
    return AcessAPI.post('access/account-register', {
      cpf: data.cpf,
      email: data.email,
      name: data.name,
      document: data.document,
      account_type: type
    })
  }

  users() {
    return AcessAPI.get(`access/manager/users`)
  }

  async delete_user(appId) {
    return AcessAPI.delete(`access/manager/users/delete?appId=${appId}`)
  }

  async newUser(data) {
    return AcessAPI.post(`access/manager/users`, {
      "name": data.name,
      "email": data.email,
      "password": data.password,
      "document": data.document,
      "role": data.role,
      "phone": data.phone
    })
  }

  async doLogin(data) {
    try {
      const response = await AcessAPI.post('access/auth/login', {
        email: data.email,
        password: data.password
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.roles.name)
      localStorage.setItem('permissions', JSON.stringify(response.data.permissions))
      return response
    } catch (error) {
      Toast.run('error', error.response.data.message || error.response.data.error || 'Houve um erro, tente novamente mais tarde a')
      throw error
    }
  }

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
          const data = {
            mainAccount: response.data.account,
            currentAccount: response.data.account,
            accounts: response.data.accounts,
          }

          console.log(response.data.account)
          useAccountStore().setAccount(data)
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

  async balance() {
    return await AcessAPI.get('consolidation/balance')
      .then((response) => {
        useAccountStore().setBalance(response.data.balance)
      })
  }
  async sendChangePasswordLink(data) {
    return await AcessAPI.post('access/auth/forgot', {
      email: data.email
    },
      {
        headers: {
          'panel-key-id': '669537816a0e2'
        }
      })
  }

  async changePassword(data) {
    return await AcessAPI.post('access/auth/reset', {
      password: data.password,
      password_confirmation: data.password_confirmation,
      token: data.token
    })
  }

  async logout() {
    useAccountStore().logout()

    return await AcessAPI
      .post('auth/logout')
      .then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('currentAccountId')
      })
      .catch((error) => {
        Toast.run('error',
          error.repsonse.data.message ||
          error.repsonse.data.error ||
          'Houve um error, tente novamente mais tarde'
        )
      })
  }

  async permissions(accountId) {
    return await AcessAPI.get(`permissions?account=${accountId}`)
  }

  async enableFileUpload(data) {
    return await axios.post(`https://upload.hackingmake.com.br/create-user`, data)
  }

  async fetchAccounts(query) {
    try {
      const response = await AcessAPI.get("access/accounts/search", {
        params: {
          search: query
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
      throw error;
    }
  };

}

export default Account
