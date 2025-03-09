import { AcessAPI } from '@/boot/API';

class Users {

    getUsers() {
        return AcessAPI.get(`access/manager/users`);
    }

}

export default Users
