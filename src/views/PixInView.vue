<template>
  <section v-if="!responsePix" class="bg-white w-full shadow rounded p-5 md:p-10 h-auto">
    <h1 class="font-bold text-2xl mb-2">Receber PIX</h1>
    <p class="text-sm text-gray-600">
      Esta seção permite a geração de um QRCode PIX, que será utilizado pelo cliente para
      efetuar o pagamento.
    </p>

    <form @submit.prevent="gerateQrcodePix" class="mt-8">

      <div class="mb-5">
        <span class="block text-gray-700 text-sm font-bold mb-2">Valor a receber</span>
        <InputText v-model="form.amount" v-money="{ decimal: ',', thousands: '.', prefix: 'R$ ', precision: 2 }"  class="w-full" />
        <div class="label">
          <span class="label-text-alt">Valor mínimo R$ 1</span>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="pix">Nome (Opcional)</label>
        <InputText id="pix-key" type="text" class="w-full" v-model="form.name" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email (Opcional)</label>
          <InputText id="email" type="email" class="w-full" v-model="form.email" />
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Telefone (Opcional)</label>
          <InputText id="phone" type="tel" class="w-full" v-model="form.phone" />
        </div>
      </div>

      <Button type="submit" :loading="load" label="Gerar QRCode" />
    </form>
  </section>

  <div v-else class="bg-white rounded-lg shadow-xl overflow-hidden">
    <div class="bg-blue-500 p-4 text-white">
      <h2 class="text-xl font-bold text-center">Pix QR Code</h2>
    </div>
    <div class="p-6 flex flex-col items-center">
      <div class="bg-white p-3 rounded-lg shadow-md mb-4 transform hover:scale-105 transition-transform duration-300">
        <img :src="responsePix.image" class="w-48 h-48">
      </div>

      <p class="text-center">{{ responsePix.qrcode }}</p>

      <div class="w-full space-y-3 mb-6">
        <div class="bg-gray-50 p-3 rounded-md">
          <p class="text-sm text-gray-500">Nome do Pagador</p>
          <p class="font-medium">{{qrcode}}</p>
        </div>
        <div class="bg-gray-50 p-3 rounded-md">
          <p class="text-sm text-gray-500">CPF</p>
          <p class="font-medium">123.456.789-00</p>
        </div>
        <div class="bg-gray-50 p-3 rounded-md">
          <p class="text-sm text-gray-500">Chave Pix</p>
          <p class="font-medium">joao.silva@email.com</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3 w-full">
        <button
          class="bg-blue-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-300 transform hover:-translate-y-1 shadow-md">
          <span class="material-symbols-outlined">refresh</span> Gerar Novo Pix
        </button>
        <button
          class="bg-green-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors duration-300 transform hover:-translate-y-1 shadow-md">
          <span class="material-symbols-outlined">share</span> WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FinancialService from '@/services/FinancialService'
import { Button, InputText } from 'primevue'

const load = ref(false);
const responsePix = ref(false);
const classFinancial = new FinancialService();
const form = ref({
  amount: 0,
  name: '',
  document: '',
  phone: '',
  email: ''
})

async function gerateQrcodePix() {
  load.value = true;
  try {
    const amount = form.value.amount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    const { data } = await classFinancial.pixIn({ ...form.value, amount: amount });
    console.log(data.pix);
    responsePix.value = data.pix;
  } catch (error) {
    console.error(error);
  } finally {
    load.value = false;
  }
}
</script>
