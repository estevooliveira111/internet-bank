import { AcessAPI } from '@/boot/API';

class Transaction {

    getTransactions() {
        return AcessAPI.get(`v1/admin/transactions`);
    }

}

export default Transaction
