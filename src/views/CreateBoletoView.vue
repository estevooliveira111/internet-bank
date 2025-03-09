<template>
  <div class="bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
      <div v-if="loading" class="p-6 text-center">
        <p class="text-primary font-bold text-lg">Processando pagamento...</p>
      </div>

      <div v-else-if="paymentSuccess" class="w-full col-span-4 space-y-4">
        <div class="w-full mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
          <h1 class="title">Transferência realizada com sucesso</h1>
          <button @click="resetForm"
            class="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
            Realizar outro Pagamento
          </button>
        </div>
      </div>

      <div v-else-if="paymentError" class="p-6 text-center">
        <p class="text-red-500 font-bold text-lg">Ocorreu um erro no pagamento. Tente novamente.</p>
        <button @click="resetForm"
          class="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
          Tentar Novamente
        </button>
      </div>

      <div v-else-if="step == 1" class="p-6">
        <h2 class="text-2xl font-bold mb-2">Pagar Boleto</h2>
        <p class="text-gray-600 mb-6">Insira os dados do boleto para realizar o pagamento</p>

        <form v-if="step == 1" @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-2">
            <label for="codigoBarras" class="block text-sm font-medium text-gray-700">Código de Barras</label>
            <input id="codigoBarras" v-model="codigoBarras" type="text"
              placeholder="Digite o código de barras do boleto"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': codigoBarrasError }" required />
            <p v-if="codigoBarrasError" class="text-red-500 text-sm">O código de barras deve ter 44 dígitos e conter
              apenas números.</p>
          </div>

          <div class="space-y-2">
            <label for="valor" class="block text-sm font-medium text-gray-700">Valor do Boleto (R$)</label>
            <input id="valor" v-model="valor" type="text" placeholder="0,00" step="0.01" min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required />
          </div>

          <button type="submit"
            class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none">
            <Barcode class="inline-block w-4 h-4 mr-2" />
            Fazer Pagamento
          </button>
        </form>

      </div>

      <div v-else-if="step == 2" class="p-6">
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold mb-2">Confirma Transferência</h2>
          <Icon icon="line-md:check-all" class="h-10 w-10 fill-green-500" />
        </div>
        <p class="text-gray-600 mb-6">Confirmar transação antes de realizar</p>

        <form v-if="step == 2" class="space-y-4">
          <div class="space-y-2">
            <label for="codigoBarras" class="block text-sm font-medium text-gray-700">Código de Barras</label>
            <input id="codigoBarras" disabled v-model="codigoBarras" type="text"
              placeholder="Digite o código de barras do boleto"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': codigoBarrasError }" required />
            <p v-if="codigoBarrasError" class="text-red-500 text-sm">O código de barras deve ter 44 dígitos e conter
              apenas números.</p>
          </div>

          <div class="space-y-2">
            <label for="valor" class="block text-sm font-medium text-gray-700">Valor do Boleto (R$)</label>
            <input id="valor" disabled v-model="valor" type="text" placeholder="0,00" step="0.01" min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required />
          </div>

          <button type="button" @click="transactinSubmit"
            class="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none">
            <Barcode class="inline-block w-4 h-4 mr-2" />
            Confirma Transação
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Barcode } from 'lucide-vue-next'
import { Icon } from '@iconify/vue/dist/iconify.js';
import { AcessAPI } from '../boot/API';
import { useNotification } from 'naive-ui';

const codigoBarras = ref('')
const valor = ref('')
const step = ref(1)
const loading = ref(false)
const paymentSuccess = ref(false)
const paymentError = ref(false)
const codigoBarrasError = ref(false)
const notification = useNotification()

const handleSubmit = async () => {
  try {
    const { response } = await AcessAPI.get(`https://api.fastgivemoney.com/quickpay/barcode/validate`, {
      params: {
        barcode: codigoBarras.value
      }
    });

    console.log(response);
    notification.create({
      content: response?.data?.message,
      type: 'warning',
      duration: 2000
    })
    step.value = 2;
    return;
  } catch ({ response }) {
    notification.create({
      content: response?.data?.message,
      type: 'warning',
      title: 'Alerta',
      duration: 2000
    })
    return;
  } finally {
    loading.value = false
  }
}

const transactinSubmit = async () => {
  loading.value = true;
  paymentSuccess.value = false
  paymentError.value = false

  AcessAPI.post("quickpay/boleto-saida-sicred", {
    params: {
      codigo_barra: codigoBarras.value,
      amount: valor.value
    }
  }).then(({ response }) => {
    paymentSuccess.value = true;
    console.log(response);
  }).catch(({ response }) => {
    console.log(response);
  })


  // setTimeout(() => {
  //   loading.value = false; // Para o loading
  //   if (codigoBarras.value && valor.value) {
  //     paymentSuccess.value = true
  //   } else {
  //     paymentError.value = true
  //   }
  // }, 5000);
}

const resetForm = () => {
  codigoBarras.value = ''
  valor.value = ''
  loading.value = false
  paymentSuccess.value = false
  paymentError.value = false
  codigoBarrasError.value = false
}
</script>