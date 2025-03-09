import { AcessAPI } from '@/boot/API';

export default class PixService {

  async getPixs(page = 1) {
    return await AcessAPI.get("quickpay/pix/list", { params: { page } })
  }

}