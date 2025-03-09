<script setup>
import moment from 'moment'
import html2pdf from 'html2pdf.js'
import { UserStore } from '@/stores/UserStore'

import { useNotification } from 'naive-ui'
import { ref } from 'vue'


const userStore = UserStore()

const props = defineProps({
  transaction: Object,
  buttonMessage: String
})

const active = ref(false)
const notification = useNotification()

const imageSrc = ref('')

const activate = () => {
  active.value = true
}

const drawCanvas = () => {
  try {
    const element = document.getElementById('comprovante-info')
    const opt = {
      margin: 0.1,
      filename: `comprovante_${moment().format('YYYY-MM-DD_HH-mm-ss')}_${
        props.transaction.txid
      }.pdf`,
      image: { type: 'jpeg', quality: 3 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().from(element).set(opt).save()

    notification.info({
      duration: 3000,
      content: 'Arquivo Baixado com sucesso!'
    })
  } catch (error) {
    notification.error({
      duration: 3000,
      content: 'Erro ao gerar comprovante!'
    })
    console.error('Erro ao gerar comprovante: ', error)
  }
}
</script>

<template>
  <div>
    <n-button type="primary" @click="activate">{{
      buttonMessage || 'Exibir Comprovante'
    }}</n-button>

    <n-drawer v-model:show="active" :width="600" placement="right">
      <n-drawer-content>
        <div id="comprovante-info" class="comprovante-info p-5">
          <div class="flex justify-center">
            <img src="../assets/logo1.png" alt="Logo da Empresa" class="w-40 mb-4" />
          </div>

          <div class="flex justify-center">
            <h2 class="text-2xl font-bold pt-4">Comprovante de Transação {{ transaction.type.name }}</h2>
          </div>

          <div class="text-center">
            <p>{{ $moment(transaction.created_at).format('DD/MM/YY HH:MM:SS') }}</p>
          </div>


          <div class="mt-5">
              <strong v-if="transaction?.txid">ID Transação:</strong>
              {{ transaction?.txid }} <br />
              <strong v-if="transaction.type.id == 3 && transaction?.details?.chavePix">Chave Pix:</strong>
              {{ transaction?.details?.chavePix }} <br />
            </div>

          <n-divider class="border-2 border-gray-500" />

          <div>
            <label for="">{{ (transaction.type.id == 3) ? 'De:': 'Para:'}}</label>
            <div class="mb-5">
              <strong v-if="userStore.mainAccount.name">Beneficiário:</strong>
              {{ userStore.mainAccount.name }} <br />
              <strong v-if="userStore.accounts[0].document">Documento:</strong>
              {{ userStore.accounts[0].document }} <br />
              <strong v-if="userStore.mainAccount.agency">Agência:</strong>
              {{ userStore.mainAccount.agency }} -
              <strong v-if="userStore.mainAccount.account">Conta:</strong>
              {{ userStore.mainAccount.account }} <br />
            </div>

            <n-divider  v-if="transaction?.details?.nomeBeneficiario" class="border-2 border-gray-500" />

            <label v-if="transaction?.details?.nomeBeneficiario" for="">{{ (transaction.type.id == 3) ? 'Para:': 'De:'}}</label>
            <div v-if="transaction?.details?.nomeBeneficiario">
              <strong v-if="transaction?.details?.nomeBeneficiario">Beneficiário:</strong>
              {{ transaction?.details?.nomeBeneficiario }} <br />
              <strong v-if="transaction?.details?.documentoBeneficiario">Documento:</strong>
              {{ transaction?.details?.documentoBeneficiario }} <br />
              <strong v-if="transaction?.details?.agenciaBeneficiario">Agência:</strong>
              {{ transaction?.details?.agenciaBeneficiario }} -
              <strong v-if="transaction?.details?.contaBeneficiario">Conta:</strong>
              {{ transaction?.details?.contaBeneficiario }} <br />
            </div>

            <n-divider  v-if="transaction?.details?.pagador" class="border-2 border-gray-500" />
            <label v-if="transaction?.details?.pagador" for="">De:</label>
            <div v-if="transaction?.details?.pagador">
              <strong v-if="transaction?.details?.pagador.nome">Beneficiário:</strong>
              {{ transaction?.details?.pagador.nome }} <br />
              <strong v-if="transaction?.details?.pagador.document">Documento:</strong>
              {{ transaction?.details?.pagador.document }}
            </div>
            
            <n-divider  v-else-if="transaction?.json && !transaction?.details?.pagador && transaction?.json?.pagador?.document" class="border-2 border-gray-500" />
            <label v-if="transaction?.json && !transaction?.details?.pagador && transaction?.json?.pagador?.document" for="">De:</label>
            <div v-if="transaction?.json && !transaction?.details?.pagador && transaction?.json?.pagador?.document">
              <strong v-if="transaction?.json?.pagador?.nome">Beneficiário:</strong>
              {{ transaction?.json?.pagador?.nome }} <br />
              <strong v-if="transaction?.json?.pagador?.document">Documento:</strong>
              {{ transaction?.json?.pagador?.document }}
            </div>

            <n-divider class="border-2 border-gray-500" />
            <div>
              <strong>Valor:</strong>
              <n-text
                class="mx-5"
                :class="{
                  'bg-red-500/35 px-4  rounded-md py-2 font-bold text-red-500':
                    parseFloat(transaction.value) < 0,
                  'bg-green-500/25 px-4  rounded-md py-2 font-bold text-green-500':
                    parseFloat(transaction.value) > 0
                }"
                color="success"
                >{{ $amount(transaction.value) }}</n-text
              >
            </div>
          </div>
        </div>
        <n-divider />

        <div class="flex justify-end">
          <n-button @click="drawCanvas" type="info" ghost>Baixar Comprovante</n-button>
          <canvas ref="myCanvas" width="600" height="400" style="display: none"></canvas>
          <a :href="imageSrc" download="comprovante.png" v-if="imageSrc">
            <n-button type="success">Download</n-button>
          </a>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
