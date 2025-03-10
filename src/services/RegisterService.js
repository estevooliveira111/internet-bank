import { AcessAPI } from '@/boot/API';

export default class RegisterService {

  async getRegister(id) {
    return await AcessAPI.get("access/register", {
      params: {"register_id": id}
    })
  }

  async createRegister(data) {
    return await AcessAPI.post("access/register", data)
  }

  async registerEmailAccount(data) {
    return await AcessAPI.get("access/register/create-email", data)
  }

  async ValidEmailAccount(data) {
    return await AcessAPI.get("access/register/validate-email", data)
  }

  async registerPhoneAccount(data) {
    return await AcessAPI.get("access/register/create-phone", data)
  }

  async validPhoneAccount(data) {
    return await AcessAPI.post("access/register/validate-phone", data)
  }

}