<template>

<div class="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900">Verificação de Telefone</h2>
      <p class="mt-1 text-sm text-gray-500">
        <template v-if="step === Step.PHONE_INPUT">
          Informe seu número de telefone para verificação
        </template>
        <template v-else-if="step === Step.CHANNEL_SELECTION">
          Escolha como deseja receber o código de verificação
        </template>
        <template v-else-if="step === Step.CODE_VERIFICATION">
          Digite o código de verificação recebido
        </template>
        <template v-else-if="step === Step.SUCCESS">
          Verificação concluída com sucesso
        </template>
      </p>
    </div>
    
    <div class="p-6">
      <!-- Step 1: Phone Input -->
      <form v-if="step === Step.PHONE_INPUT" @submit.prevent="handlePhoneSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="phone" class="text-sm font-medium text-gray-700">Número de Telefone</label>
          <div class="flex items-center">
            <input
              id="phone"
              type="tel"
              placeholder="+55 (11) 98765-4321"
              v-model="phone"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <p class="text-xs text-gray-500">
            Seu telefone será validado para garantir a segurança da sua conta
          </p>
        </div>
        <button type="submit" class="flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Continuar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
      </form>

      <!-- Step 2: Channel Selection -->
      <form v-if="step === Step.CHANNEL_SELECTION" @submit.prevent="handleChannelSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">Método de Verificação</label>
          <div class="space-y-3">
            <div class="flex items-center space-x-2 rounded-md border border-gray-200 p-3">
              <input 
                type="radio" 
                id="sms" 
                value="sms" 
                v-model="channel" 
                name="channel"
                disabled
                class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <label for="sms" class="flex items-center cursor-pointer ml-2 text-sm text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                SMS
              </label>
            </div>
            <div class="flex items-center space-x-2 rounded-md border border-gray-200 p-3">
              <input 
                type="radio" 
                id="whatsapp" 
                value="whatsapp" 
                v-model="channel" 
                name="channel"
                class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
              />
              <label for="whatsapp" class="flex items-center cursor-pointer ml-2 text-sm text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                WhatsApp
              </label>
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          class="flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed" 
          :disabled="loading"
        >
          <template v-if="loading">
            <svg class="animate-spin mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
            Enviando...
          </template>
          <template v-else>
            Enviar Código
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </template>
        </button>
        <button 
          type="button" 
          class="flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          @click="step = Step.PHONE_INPUT"
        >
          Voltar
        </button>
      </form>

      <!-- Step 3: Code Verification -->
      <form v-if="step === Step.CODE_VERIFICATION" @submit.prevent="handleCodeSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="code" class="text-sm font-medium text-gray-700">Código de Verificação</label>
          <input
            id="code"
            type="text"
            placeholder="123456"
            v-model="code"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-center text-lg tracking-widest"
            maxlength="6"
          />
          <p class="text-xs text-gray-500">
            Digite o código de 6 dígitos enviado para {{ phone }} via {{ channel === "sms" ? "SMS" : "WhatsApp" }}
          </p>
        </div>
        <button 
          type="submit" 
          class="flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed" 
          :disabled="loading"
        >
          <template v-if="loading">
            <svg class="animate-spin mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
            Verificando...
          </template>
          <template v-else>
            Verificar Código
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </template>
        </button>
        <button 
          type="button" 
          class="flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          @click="step = Step.CHANNEL_SELECTION"
        >
          Voltar
        </button>
      </form>

      <!-- Step 4: Success -->
      <div v-if="step === Step.SUCCESS" class="flex flex-col gap-4 items-center text-center">
        <div class="rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">Telefone Verificado</h3>
        <p class="text-sm text-gray-500">
          Seu número de telefone {{ phone }} foi verificado com sucesso.
        </p>
        <button 
          type="button" 
          class="w-full flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          @click="handleReset"
        >
          Concluir
        </button>
      </div>
    </div>
  </div>

    <main v-if="dataResponse">
        <!-- {{ dataResponse }} -->
    </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import RegisterService from '../../services/RegisterService'
import { ref, reactive } from 'vue';



// Enum for steps
const Step = reactive({
  PHONE_INPUT: 0,
  CHANNEL_SELECTION: 1,
  CODE_VERIFICATION: 2,
  SUCCESS: 3
});

// State
const step = ref(Step.PHONE_INPUT);
const phone = ref('');
const channel = ref('sms');
const code = ref('');
const loading = ref(false);
const generatedCode = ref('');

const router = useRouter();
const route = useRoute();
const classRegister = new RegisterService()
const dataResponse = ref(null)
const id = route.params.code


classRegister.getRegister(id)
.then( ({data}) => {
    console.log(data);
    phone.value = data.data.phone;
    dataResponse.value = data;
})



// Methods
const handlePhoneSubmit = () => {
  if (!phone.value) return;
  step.value = Step.CHANNEL_SELECTION;
};

const handleChannelSubmit = async () => {
  loading.value = true;
  
  try {
    const {data} = await classRegister.validPhoneAccount({
        "register_id": id,
        "phone": '5521980626968'
    })
    console.log(data);
    // await new Promise(resolve => setTimeout(resolve, 1500));
    
    // // Generate a random 6-digit code
    // generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString();
    
    // // In a real app, this would send the code via SMS or WhatsApp
    // console.log(`Code ${generatedCode.value} sent to ${phone.value} via ${channel.value}`);
    
    // // Show toast notification (in a real app)
    // alert(`Um código de verificação foi enviado para ${phone.value} via ${channel.value === "sms" ? "SMS" : "WhatsApp"}.`);
    
    step.value = Step.CODE_VERIFICATION;
  } catch (error) {
    alert("Não foi possível enviar o código. Tente novamente.");
  } finally {
    loading.value = false;
  }
};

const handleCodeSubmit = async () => {
  if (!code.value) return;
  
  loading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (code.value === generatedCode.value) {
      alert("Seu número de telefone foi verificado com sucesso.");
      step.value = Step.SUCCESS;
    } else {
      alert("Código inválido. Tente novamente.");
    }
  } catch (error) {
    alert("Erro ao verificar o código. Tente novamente.");
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  step.value = Step.PHONE_INPUT;
  phone.value = '';
  channel.value = 'sms';
  code.value = '';
  generatedCode.value = '';
};
</script>


<style>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>