import { AcessAPI } from '@/boot/API';

export default class ClientsService {

  async getClients(page = 1, search = null) {
    const url = search ? `?page=${page}&search=${encodeURIComponent(search)}` : `?page=${page}`;
    return await AcessAPI.get('clients' + url);
  }

  async getClient(code) {
    return await AcessAPI.get(`client?code=${code}`);
  }

  async createClient(data) {
    return await AcessAPI.post("client/create", data)
  }

  async updateClient(code, data) {
    return await AcessAPI.post(`client/edit?code=${code}`, data)
  }

  async pixIn(data) {
    return await AcessAPI.post("quickpay/pix/qrcode-fixo", data)
  }

}