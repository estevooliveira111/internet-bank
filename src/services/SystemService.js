import { AcessAPI } from '@/boot/API'

export default class SystemService {
  async listPermissions() {
    return AcessAPI.get('roles')
  }

  async addPermissionToAccount(data) {
    return await AcessAPI.post('access/manager/addPermission', data)
  }

  async removePermissionFromAccount(data) {

    return await AcessAPI.post('access/manager/removePermission', data)
  }

  async addUser(data) {
    return await AcessAPI.post('account/user/add', data)
  }

  async editMainAccountInfo(data) {
    return await AcessAPI.post('xxxx/xxxx', data)
  }

  async editSubAccountInfo(data) {

    return await AcessAPI.post('xxxx/xxxx', data)
  }

}
