import { AcessAPI } from '@/boot/API';

export default class Accounts {

  async doLogin(data) {
    return await AcessAPI.post('access/auth/login', data);
  }

  async me() {
    return await AcessAPI.get('access/auth/me');
  }

  async logout() {
    return await AcessAPI.post('access/auth/logout');
  }
}