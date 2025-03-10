<template>
  <section v-if="step == 1" class="w-full col-span-4 space-y-4">
    <!-- Formulário de entrada de dados -->
    <div class="w-full mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
      <h1 class="text-2xl font-semibold">Fazer Transferência</h1>
      <p class="text-sm text-gray-600">Confira os dados antes de finalizar a transação</p>

      <form @submit.prevent="nextStep" class="mt-4">
        <label class="form-control w-full mt-1">
          <div class="label">
            <span class="text-base font-normal">Valor<span class="text-red-600">*</span> </span>
          </div>
          <input
            v-model="form.value"
            v-money="{
              decimal: ',',
              thousands: '.',
              prefix: 'R$ ',
              precision: 2,
              masked: false
            }"
            type="text"
            class="input w-full mt-1 border border-red-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="R$ 0,00"
          />
          <div class="label">
            <span v-if="form.value != null && form.value < 1.99" class="text-red-600"
              >O valor mínimo de transferência é R$ 2,00.</span
            >
            <span v-if="form.value != null && form.value > 25000" class="text-red-600"
              >O valor máximo de transferência é R$ 25.000,00.</span
            >
          </div>
        </label>

        <label class="form-control w-full mt-1">
          <div class="label">
            <span class="text-base font-normal"
              >Tipo de Chave Pix<span class="text-red-600">*</span>
            </span>
          </div>
          <select
            v-model="form.keyType"
            class="input w-full mt-1 border border-red-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="" disabled selected>Selecione o tipo de chave</option>
            <option value="email">E-mail</option>
            <option value="cpf">CPF</option>
            <option value="cnpj">CNPJ</option>
            <option value="phone">Celular</option>
            <option value="random">Chave Aleatória</option>
          </select>
        </label>

        <label class="form-control w-full mt-1">
          <div class="label">
            <span class="text-base font-normal"
              >Chave Pix (Email, CNPJ, CPF, Aleatória)<span class="text-red-600">*</span></span
            >
          </div>
          
          <input
            v-model="form.codePix"
            v-if="form.keyType == 'email' || form.keyType == 'random'"
            require
            :placeholder="placeh"
            type="text"
            class="input w-full mt-1 border border-red-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
           <input
            v-model="form.codePix"
            v-else
            require
            v-mask="mask"
            :placeholder="placeh"
            type="text"
            class="input w-full mt-1 border border-red-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>

        <div class="mt-10 border-t-2 pt-4 border-gray-200 flex justify-end">
          <button
            type="submit"
            :disabled="load"
            class="bg-red-600 text-white px-6 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-700 disabled:bg-red-300"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  </section>

  <!-- Etapa de Confirmação -->
  <section v-else-if="step == 2" class="w-full col-span-4 space-y-4">
    <div class="w-full mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
      <h1 class="text-2xl font-semibold">Revise os dados da Transferência</h1>
      <p class="text-sm text-gray-600">
        Confirme se os dados estão corretos antes de enviar a transação.
      </p>

      <div class="space-y-4 mt-4">
        <p><strong>Valor:</strong> {{ form.value }}</p>
        <p><strong>Chave Pix:</strong> {{ form.codePix }}</p>
        <label class="form-control w-full mt-1">
          <div class="label">
            <span class="text-base font-normal"
              >CPF/CNPJ do Recebedor<span class="text-red-600">*</span>
            </span>
          </div>
          <input
            v-model="form.receiverCode"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            placeholder="CPF, CNPJ"
            type="text"
            class="input w-full mt-1 border border-red-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </label>
      </div>

      <div class="mt-10 border-t-2 pt-4 border-gray-200 flex justify-between">
        <button
          @click="setForm"
          class="bg-gray-500 text-white px-6 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-gray-600 hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          @click="submit"
          :disabled="load"
          class="bg-red-600 text-white px-6 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-700 disabled:bg-red-300"
        >
          Confirmar Transação
        </button>
      </div>
    </div>
  </section>

  <section v-else-if="step == 3" class="w-full col-span-4 space-y-4">
  <div class="w-full mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
    <h1 class="text-2xl font-semibold">Transferência Realizada com Sucesso</h1>

    <div class="space-y-4 mt-4">
      <p><strong>Valor Transferido:</strong> {{ form.value }}</p>
      <p><strong>Chave Pix:</strong> {{ form.codePix }}</p>
      <p><strong>Tipo de Chave:</strong> {{ form.keyType }}</p>
      <p><strong>CPF/CNPJ do Recebedor:</strong> {{ form.receiverCode }}</p>
    </div>

    <div class="flex mt-4">
      <button @click="setForm" class="bg-red-600 text-white px-6 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-700">
        Realizar Nova Transferência
      </button>
    </div>
  </div>
</section>
</template>



<script>
import Toast from '@/boot/Toast'
import FinancialService from '../services/FinancialService'
import { useBalanceStore } from '@/stores/BalanceStore'

export default {
  name: 'PixInView',

  data() {
    return {
      step: 1,
      load: false,
      form: {
        value: '',
        keyType: '',
        codePix: '',
        receiverCode: ''
      },
      pixout: {
        name: '',
        document: '',
        beneficiario: '',
        keyType: '',
        cod: ''
      }
    }
  },
  methods: {
    nextStep() {
      if (this.form.value && this.form.codePix && this.form.keyType && this.form.value.replace(',', '.').replace('R$ ', '')) {
        this.step = 2
      } else {
        Toast.run('error', 'Por favor, preencha todos os campos corretamente.')
      }
    },

    submit() {
      this.load = true
      const financialService = new FinancialService()

      let codePix = this.form.codePix;

      if (this.form.keyType == 'cpf' || this.form.keyType == 'cnpj') {      
        codePix = this.form.codePix.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
      }
      if (this.form.keyType == 'phone') {
        codePix = '+55' + this.form.codePix.replace(/\D/g, '');
      }

      console.log(this.form.value);

      const data = {
        keyPix: codePix,
        documentoBeneficiario: this.form.receiverCode.replace(/\D/g, ''),
        mount: this.form.value.replace('R$ ', '').replace('.', '').replace(',', '.'),
      }

      financialService
        .pixOutSicred(data)
        .then(({ data }) => {
          this.step++
          this.pixout = data
          const balanceStore = useBalanceStore()
          balanceStore.setBalance()
        })
        .catch((error) => {
          console.log(error)
          Toast.run(
            'error',
            error?.response?.data?.details ||
              error.response?.data?.error ||
              'Houve um erro, tente novamente mais tarde'
          )
        })
        .finally(() => (this.load = false))
    },

    setForm() {
      this.step = 1
      this.pixout = {}
      this.form = {}
    }
  },
  computed: {
    mask() {
      switch (this.form.keyType) {
        case 'cpf':
          return '###.###.###-##'; 
        case 'cnpj':
          return '##.###.###/####-##'; 
        case 'phone':
          return '(##) #####-####';
        case 'random':
          return ''; 
        default:
          return ''; 
      }
    },

    placeh() {
      switch (this.form.keyType) {
        case 'cpf':
          return '###.###.###-##'; 
        case 'cnpj':
          return '##.###.###/####-##'; 
        case 'phone':
          return '(##) #####-####'; 
        case 'email':
          return 'chavePix@email.com'; 
        case 'random':
          return ''; 
        default:
          return ''; 
      }
    }


  }
}
</script>
