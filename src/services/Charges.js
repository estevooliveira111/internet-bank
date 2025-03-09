
import { AcessAPI } from '@/boot/API';

class Charges {

  getCharges(page = 1, per_page = 10, params = {}) {
    const finalParams = {
      page,
      per_page,
      ...params
    };
    return AcessAPI.get('charges', { params: finalParams });
  }


  newCharge(data) {
    return AcessAPI.post(`charge/create`, data);
  }

  getCharge(code) {
    return AcessAPI.get(`charge?code=${code}`);
  }

  deleteCharge(code) {
    return AcessAPI.delete(`charge/delete?id=${code}`);
  }

  notifyEmails(data) {
    return AcessAPI.post('charge/notifications', data);
  }

}



export default Charges
