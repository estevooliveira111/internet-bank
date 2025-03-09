
import { AcessAPI } from '@/boot/API';

class Settings {

    async getSplit()
    {
        return AcessAPI.get(`v1/admin/split`)
    }

    async updateSplit(accounts)
    {
        return AcessAPI.post(`v1/admin/split`, {
            accounts: accounts
        })
    }

}

export default Settings
