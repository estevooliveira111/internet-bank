<template>

    <!-- <button onclick="my_modal_3.showModal()" class="w-full shadow md:m-2 p-6 transition ease-in-out delay-200 flex border-2 border-gray-400 bg-slate-200 rounded-md cursor-pointer items-center hover:bg-gray-500 hover:text-white hover:border-gray-500 translate-0">
        <Icon icon="material-symbols-light:qr-code-2" class="card-icon-dash" width="48" height="48" />
        <span class="card-icon-label">Receber Pix Dinâmico</span>
    </button> -->

    <RouterLink :to="{name: 'fixed-qrcode'}" class="w-full shadow md:m-2 p-6 transition ease-in-out delay-200 flex border-2 border-gray-400 bg-slate-200 rounded-md cursor-pointer items-center hover:bg-gray-500 hover:text-white hover:border-gray-500 translate-0">
        <Icon icon="f7:qrcode-viewfinder" class="card-icon-dash" width="48" height="48" />
        <span class="card-icon-label">Receber Pix Estático</span>
    </RouterLink>

    <dialog id="my_modal_3" class="modal">
        <div class="modal-box shadow-md">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-lg">Receber Pagamento Pix!</h3>

                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
            </div>

            <hr class="my-4">

            <form @submit.prevent="submit" v-if="!hasPix" class="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="pix">Valor do Pix <span class="text-red-600">*</span> :</label>
                    <CurrencyInput v-model="formData.mount" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="pix">Nome (Opcional)</label>
                    <GeneralInput id="pix-key" type="text" :isRequired="false" v-model="formData.name" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="pix">Email (Opcional)</label>
                    <GeneralInput id="pix-key" type="text" :isRequired="false" v-model="formData.email" />
                </div>
                <GeneralButton :load="load" text="Gerar Qrcode" class="w-full mt-4" />
            </form>

            <div v-else class="flex items-center justify-center flex-col text-center gap-4 mt-10">
                <div class="max-w-2xl space-y-6">
                    <div class="relative flex items-center justify-center" id="qr-code-image">
                        <img v-if="pix.pix.image" :src="pix.pix.image" alt="qr-code-frame" class="w-64" />
                    </div>
                    <p class="text-sm break-all">{{ pix.pix.qrcode }}</p>
                    <GeneralButton :load="false" text="Copiar código" @click="copyQRCode" />
                    <GeneralButton :load="false" text="Gerar Outro Pix" @click="clear()" />
                    <div class="flex justify-center">
                        <GeneralButton :load="false" @click="copyQR()" class="p-1 rounded-lg" text="Copiar URL Online" />
                    </div>
                </div>
            </div>

        </div>
    </dialog>

</template>


<script setup>

import Toast from '@/boot/Toast'
import { Icon } from '@iconify/vue';
import GeneralButton from './GeneralButton.vue'
import CurrencyInput from '../components/CurrencyInput.vue'
import GeneralInput from './GeneralInput.vue';
import FinancialService from '../services/FinancialService'
import { ref } from 'vue';
//import { RouterLink } from 'vue-router';

const formData = ref({
    mount: '',
    email: '',
    name: ''
});
const load = ref(false);
const hasPix = ref(false);
const pix = ref({
    qrcode: '',
    image: '',
    txid: ''
});

const financialService = new FinancialService();
const copyQRCode = () => {
    const qrcodeText = pix.value.pix.qrcode
    navigator.clipboard
    .writeText(qrcodeText)
    .then(() => {
        Toast.run('success', 'Código copiado para a área de transferência')
    })
    .catch(() => {
        Toast.run('error', 'Falha ao copiar o código para a área de transferência')
    })
}

const submit = () => {
    const data = { mount: 
        formData.value.mount,
        email: formData.value.email,
        name: formData.value.name
     };
    load.value = true;

    financialService
        .pixIn(data)
        .then((response) => {
          Toast.run('success', 'Pix gerado com sucesso');

          let {data} = response;

          
          pix.value = data;
          formData.value.mount = 0
          clear();
        })
        .catch((error) => {
          if (error.response)
            Toast.run('error', error.response.data.message);
            console.log(error); 
        })
        .finally(() => (load.value = false))

}

const clear = () => {
    hasPix.value = !hasPix.value;
};

const copyQR = () => {
    const txId = pix.value.pix.txid
    const URL = `${window.location.origin}/px/${txId}`;
    console.log(pix.value.pix.txid);
    navigator.clipboard
    .writeText(URL)
    .then(() => {
        Toast.run('success', 'URL copiada para a área de transferência')
    })
    .catch(() => {
        Toast.run('error', 'Falha ao copiar a URL para a área de transferência')
    })
}

</script>



<style scoped>
.card-icon-dash {
    @apply bg-gray-300 p-2 text-gray-600 cursor-pointer rounded-3xl;
}

.card-icon-label {
    @apply uppercase m-2 font-medium
}
</style>