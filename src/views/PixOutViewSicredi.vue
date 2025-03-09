<template>
  
  <div class="xl:grid xl:grid-cols-4 gap-1">
    
    <div class="card-section col-span-3 bg-white shadow rounded p-5 md:p-10 h-auto">

      <section v-if="!step && step <= 0" class="w-full col-span-4 space-y-4">
        <h1 class="title">Transferir PIX</h1>
        <p class="text-sm text-gray-600">Esta seção permite a transferência de valores através do PIX.</p>

        <form @submit.prevent="submit" class="mt-8">

          <label class="form-control w-full">
            <div class="label">
              <span class="text-base font-normal">Valor<span class="text-red-600">*</span> </span>
            </div>
            <CurrencyInput v-model="form.value" :options="{ currency: 'BRL' }" />
            <div class="label">
              <span v-if="form.value != null && form.value < 1.99" class="text-red-600">O valor mínimo de transfêrencia é R$ 2,00.</span>
              <span v-if="form.value != null && form.value > 20000" class="text-red-600">O valor máximo de transfêrencia é R$ 20.000,00.</span>
            </div>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="text-base font-normal capitalize">Chave PIX destino<span class="text-red-600">*</span></span>
            </div>
            <GeneralInput v-model="form.codePix" placeholder="CPF, email, celular, etc" :isRequired="true" id="pix-key"
              type="text" />
          </label>

          <GeneralButton :load="load" text="Realizar transferência" class="md:min-w-32 mt-4" />
        </form>
      </section>

      <!-- SECOND STEP -->
      <section v-else-if="step == 1" class="w-full col-span-4 space-y-4">

        <div class="w-full mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
          <h1 class="title">Confirmar transferência</h1>
          <p class="text-sm text-gray-600">Confira os dados antes de finalizar a transação. Foi enviado um email com um código para confirmar a transferência.</p>

          <div>
            <ul class="flex flex-col gap-2 mt-8">
              <li class="font-bold">Informações</li>
              <li>Valor: <span class="font-bold">{{ transactionInfo.value }}</span></li>
              <li>Nome Destino: <span class="font-bold">{{ transactionInfo.information.pix.name }}</span></li>
              <li>Banco Destino: <span class="font-bold">{{ transactionInfo.information.pix.bank }}</span></li>
              <li>Chave Pix: <span class="font-bold">{{ transactionInfo.codePix }}</span></li>
            </ul>
          </div>

          <div class="mt-4">
            <GeneralInput v-model="form.key" :isRequired="true" placeholder="Digite o código recebido no email" id="key" type="text"  />
          </div>

          <div class="mt-10 border-t-2 pt-4 border-gray-200 flex gap-2 flex-wrap">
            <GeneralButton text="Confirmar" @click="submitTransaction" :load="load" class="w-full md:w-auto" />
            <GeneralButton text="Cancelar" :load="false" @click="step = 0" class="w-full md:w-auto !bg-gray-500 hover:!bg-red-500 hover:!border-red-500" />
          </div>
        </div>
      </section>
      <!-- END SECOND STEP -->

      <section v-else-if="step == 2" class="w-full col-span-4 space-y-4">
        <div class="w-full mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">

          <h1 class="title">transferência Realizada com sucesso</h1>

          <div class="flex mt-4">
            <button @click="step = 0" class="btn-base m-1">Realizar Nova Tranfêrencia</button>
            <button class="btn-base m-1">Baixar Comprovante</button>
          </div>

        </div>
      </section>

    </div>

    <BalanceSection class="m-2 card-section row-span-2 flex justify-center items-center hover:bg-gray-300 transition ease-in-out delay-200" />

  </div>

</template>

<script>

import CurrencyInput from '../components/CurrencyInput.vue'
import GeneralButton from '@/components/GeneralButton.vue'
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
    GeneralInput
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

          new Account().balance()

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
