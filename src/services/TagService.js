import { AcessAPI } from '@/boot/API'

export default class TagService {

  async listTags(page = 1, search = null) {
    const url = search ? `?page=${page}&search=${encodeURIComponent(search)}` : `?page=${page}`;
    return AcessAPI.get('tags' + url);
  }

  async addTag(data) {
    return await AcessAPI.post('tag/create', data)
  }

  async updateTag(id, data) {
    return await AcessAPI.put('tag/update?tagId=' + id, data);
  }

  async getTag(code) {
    return await AcessAPI.get('tag?code=' + code)
  }

  async deteleTag(code) {

    return await AcessAPI.delete('tag/delete?tagId=' + code)
  }

  async addUser(data) {
    return await AcessAPI.post('account/user/add', data)
  }

  async editMainAccountInfo(data) {
    return await AcessAPI.post('xxxx/xxxx', data)
  }

  async getInfos(params = null) {
    const url = 'tag/split?';
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return await AcessAPI.get(url + queryString);
  }

}
