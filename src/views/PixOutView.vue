<template>
  
  <div class="xl:grid xl:grid-cols-4 gap-1">
    
    <div class="card-section col-span-3 bg-white shadow rounded p-5 md:p-10 h-auto">
      <PixOutSicred />
    </div>

    <BalanceSection class="m-2 card-section row-span-2 flex justify-center items-center hover:bg-gray-300 transition ease-in-out delay-200" />

  </div>

</template>

<script>

import CurrencyInput from '../components/CurrencyInput.vue'
import GeneralButton from '@/components/GeneralButton.vue'
import PixOutSicred from '@/components/PixOutSicred.vue'
import Toast from '@/boot/Toast'
import GeneralInput from '@/components/GeneralInput.vue'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import FinancialService from '../services/FinancialService'
import { useAccountStore } from '@/stores/AccountStore'
import BalanceSection from '@/components/BalanceSection.vue';
import Account from '@/services/Account'

export default {
  name: 'PixInView',
  components: {
    CurrencyInput,
    GeneralButton,
    BalanceSection,
    GeneralInput,
    PixOutSicred
  },

  setup() {
    const accountStore = useAccountStore()
    return {
      accountStore,
      FormatMonetaryValue
    }
  },

  data() {
    return {
      step: 0,
      form: {},
      isCodeSent: false,
      load: false,
      transactionInfo:{}
    }
  },

  methods: {
    sendVerificationCode() {
      this.load = true

      const financialService = new FinancialService()
      financialService
        .sendPixOutVerificationCode()
        .then((response) => {
          Toast.run('success', response.data.message)
          this.isCodeSent = true
        })
        .catch((error) => {
          Toast.run(
            'error',
            error.response.data.message ||
            error.response.data.error ||
            'Houve um erro, tente novamente mais tarde'
          )
        })
        .finally(() => {
          this.load = false
        })
    },

    submit() {
      this.load = true;
      const financialService = new FinancialService();

      if (!this.form.value) {
        Toast.run('error', 'Insira uma quantia válida')
        this.load = false
        return
      }

      let data = {
        mount: this.form.value,
        codePix: this.form.codePix,
        accountId: useAccountStore().currentAccount.id
      }

      
      financialService.sendPixOutVerificationCode(data)
        .then((response) => {
          let { data } = response;
          console.log(response);
          this.step++;

          this.transactionInfo.isTransactionCreated = true
          this.transactionInfo.value = this.form.value;
          this.transactionInfo.codePix = this.form.codePix;
          this.transactionInfo.information = data;
          const account = new Account();
          account.balance();

          Toast.run('success', data.message);
        })
        .catch((error) => {
          console.log(error);
          Toast.run('error',
            error.response.data.message ||
            error.response.data.error ||
            'Houve um erro, tente novamente mais tarde');
        })
        .finally(() => { this.load = false; this.form = {}; })

    },

    submitTransaction() {
      const financialService = new FinancialService()

      let form = {
        key: this.form.key,
        accountId: useAccountStore().currentAccount.id,
      };

      financialService.pixOut(form)
        .then((response) => {
          console.log(response);
          this.step++;

          this.form = {};
          Toast.run('success', response.data.message || response.data.error || 'Transação realizada com sucesso!')
        })
        .catch((error) => {
          console.log(error);
          Toast.run('error', error.response.data.message || error.response.data.error || 'Houve um erro, tente novamente mais tarde')
        })
        .finally(() => { this.load = false; this.form = {}; })

    }
  }
}

</script>
