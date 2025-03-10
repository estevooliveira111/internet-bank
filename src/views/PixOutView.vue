<template>

  <PageHeader name="Fazer Transferência (Chave Pix)" :links="[
    { name: 'Dashboard', routerName: 'dashboard' },
    { name: 'Fazer Transferência', routerName: 'pix-out' }
  ]" />

  <div class="xl:grid xl:grid-cols-4 gap-1">

    <div class="card-section col-span-3 bg-white shadow rounded p-5 md:p-10 w-full">

      <section v-if="transferData.step == 1">
        <h2 class="text-xl font-semibold mb-4">Fazer Transferência de Pix</h2>

        <form @submit.prevent="submitTransaction" class="space-y-4">

          <div>
            <label for="cpfCnpj" class="block text-sm font-medium text-gray-700">Documento do destinatário(CPF/CNPJ)<span class="text-red-600">*</span></label>
            <InputText v-mask="['###.###.###-##', '##.###.###/####-##']" v-model="formData.cpfCnpj" type="text" id="cpfCnpj" placeholder="Digite seu CPF ou CNPJ" class="w-full" required />
          </div>

          <div>
            <label for="valor" class="block text-sm font-medium text-gray-700">Valor<span
                class="text-red-600">*</span></label>
            <InputText v-model="formData.mount" v-money="{
              decimal: ',',
              thousands: '.',
              prefix: 'R$ ',
              precision: 2,
              masked: false
            }" id="valor" placeholder="Digite o valor" class="w-full" required />
          </div>

          <div>
            <label for="typeKey" class="block text-sm font-medium text-gray-700">Tipo de Chave Pix<span
                class="text-red-600">*</span></label>
            <Select v-model="formData.typeKey" required :options="[
              { name: 'E-mail', code: 'email' },
              { name: 'CPF', code: 'cpf' },
              { name: 'CNPJ', code: 'cnpj' },
              { name: 'Telefone', code: 'phone' },
              { name: 'Aleatório', code: 'aleatorio' }
            ]" optionLabel="name" class="w-full" />
          </div>

          <div v-if="formData.typeKey" class="space-y-2">
            <label for="chavePix" class="block text-sm font-medium text-gray-700">Chave Pix<span
                class="text-red-600">*</span> ({{ formData.typeKey.name }}) </label>
            <InputText type="email" v-if="formData.typeKey.code == 'email'" v-model="formData.keyPix" id="chavePix"
              placeholder="Digite a Chave Pix Email" class="w-full" required />
            <InputText v-mask="['###.###.###-##']" v-if="formData.typeKey.code == 'cpf'" v-model="formData.keyPix"
              type="text" id="chavePix" placeholder="Digite a chave Pix CPF" class="w-full" required />
            <InputText v-mask="['##.###.###/####-##']" v-if="formData.typeKey.code == 'cnpj'" v-model="formData.keyPix"
              type="text" id="chavePix" placeholder="Digite a chave Pix CNPJ" class="w-full" required />
            <InputText v-mask="['(##) # ####-####']" v-if="formData.typeKey.code == 'phone'" v-model="formData.keyPix"
              type="text" id="chavePix" placeholder="Digite a chave Pix Telefone" class="w-full" required />
            <InputText v-if="formData.typeKey.code == 'aleatorio'" v-model="formData.keyPix" type="text" id="chavePix"
              placeholder="Digite a chave" class="w-full" required />
          </div>

          <Message v-if="formData.message" severity="error">{{ formData.message }}</Message>

          <div class="flex justify-between items-center">
            <Button type="submit" class="w-full" label="Confirmar Transação" />
          </div>

        </form>
      </section>

      <section v-if="transferData.step == 2">
        <h1 class="text-2xl font-semibold">Transferência Realizada com Sucesso</h1>

        <div class="space-y-4 mt-4">
          <p><strong>Valor Transferido:</strong> {{ $amount(transferDataTransaction.details.valorPagamento) }}</p>
          <p><strong>Chave Pix:</strong> {{ transferDataTransaction.details.chavePix }}</p>
          <p><strong>CPF/CNPJ do Recebedor:</strong> {{ transferDataTransaction.details.documentoBeneficiario }}</p>
        </div>

        <div class="flex mt-4">
          <Button @click="clearForm()">
            Realizar Nova Transferência
          </Button>
        </div>
      </section>



    </div>

  </div>

  <Dialog v-model:visible="formData.showModal" modal header="Confirmar Dados de Transferência"
    :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="rounded-lg shadow-lg bg-white p-6">
    <div class="space-y-4">
      <p class="text-lg font-semibold"><strong>CPF/CNPJ:</strong> {{ formData.cpfCnpj }}</p>
      <p class="text-lg font-semibold"><strong>Valor:</strong> <span class="px-3 py-1 text-green-500">{{ formData.mount
      }}</span></p>
      <p class="text-lg font-semibold"><strong>Tipo de Chave:</strong> <span
          class="bg-gray-500 uppercase px-3 py-1 rounded-full text-white">{{ formData.typeKey?.code }}</span> </p>
      <p class="text-lg font-semibold"><strong>Chave Pix:</strong> {{ formData.keyPix }}</p>
    </div>

    <div class="flex justify-end gap-4 mt-6">
      <Button @click="confirmTransaction" severity="success" :disabled="transferData.loading"
        label="Confirmar Transfência" class="px-6 py-2 text-base font-medium rounded-md" />
      <Button @click="clearForm()" label="Cancelar" severity="danger"
        class="px-6 py-2 text-base font-medium rounded-md" />
    </div>
  </Dialog>

</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import { Dialog, Button, InputText, Select, useToast, Message } from 'primevue';
import FinancialService from '@/services/FinancialService'
import { useBalanceStore } from '@/stores/BalanceStore'

const toast = useToast();
const financialService = new FinancialService();
const transferData = ref({
  loading: false,
  step: 1,

  name: '',
  document: '',
  beneficiario: '',
  keyType: '',
  cod: ''
});
const transferDataTransaction = ref({});
const formData = ref({
  cpfCnpj: "",
  mount: "",
  typeKey: "",
  keyPix: "",
  showModal: false,
  message: ''
})

function submitTransaction() {
  formData.value.message = null;
  const amount = formData.value.mount.replace(',', '.').replace('R$ ', '');
  console.log(amount);

  if (formData.value.cpfCnpj.length !== 14 && formData.value.cpfCnpj.length !== 18) {
    const message = 'Documento do destinatário não foi preenchido corretamente...';
    toast.add({ severity: 'error', summary: 'Erro ao fazer transferência', detail: message, life: 3150 });
    formData.value.message = message;
    return;
  }

  if (
    !formData.value.cpfCnpj ||
    !formData.value.mount ||
    !formData.value.typeKey ||
    !formData.value.keyPix ||
    !amount
  ) {
    const message = 'Preencha todos os campos...';
    toast.add({ severity: 'error', summary: 'Erro ao fazer transferência', detail: message, life: 3150 });
    formData.value.message = message;
    return;
  }

  formData.value.showModal = true;
}

function confirmTransaction() {
  transferData.value.loading = true;


  const amount = formData.value.mount.replace('R$ ', '').replace('.', '').replace(',', '.');

  const keyPix = (formData.value.typeKey.code === 'cpf' || formData.value.typeKey.code === 'cnpj') 
    ? formData.value.keyPix.replace(/\D/g, '')
    : formData.value.keyPix;

  const data = {
    keyPix: keyPix,
    documentoBeneficiario: formData.value.cpfCnpj.replace(/\D/g, ''),
    mount: amount
  }

  financialService.pixOutSicred(data)
    .then(({ data }) => {

      const balanceStore = useBalanceStore();
      balanceStore.setBalance();

      transferData.value.step = 2;

      formData.value.showModal = false;
      transferDataTransaction.value = { ...data };
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message || error?.response?.data?.details || error.response?.data?.error || 'Houve um erro, tente novamente mais tarde';
      toast.add({ severity: 'error', summary: errorMessage, detail: errorMessage, life: 3150 });
      formData.value.message = errorMessage;
      formData.value.showModal = false;
    })
    .finally(() => (transferData.value.loading = false))
}


function clearForm() {
  Object.keys(formData.value).forEach(key => {
    delete formData.value[key];
  });
  transferData.value.step = 1;
}

</script>