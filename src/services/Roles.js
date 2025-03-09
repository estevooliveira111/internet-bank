
import { AcessAPI } from '@/boot/API';

class Roles {

    async roles_all()
    {
        return AcessAPI.get(`access/roles`)
    }

}

export default Roles
