<template>
  <div>
    <div class="md:grid md:grid-cols-6 gap-4">
      <InternalNav :links="links" class="col-span-2" />
      <section class="mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
        <PixAreaHeader v-if="this.shareMessage !== ''"
          :shareMessage="shareMessage"
          @previousStep="previousStep"
          @copyQRCode="copyQRCode"
          :backArrow="false"
        />
        <h1 class="font-bold text-2xl mb-2">QRCode Fixo</h1>
        <p class="text-sm text-gray-600">Esta página permite a transferência de valores através do PIX usando um QR Code fixo.</p>

        <!-- QRCODE AREA -->
        <div class="flex items-center justify-center flex-col text-center gap-4 mt-10">
          <div class="max-w-2xl space-y-6">
            <div class="relative flex items-center justify-center" id="qr-code-image">
              <div v-if="theme().titleFull === 'doarPay'" class="w-64 bg-gray-100 h-96 skeleton">
                <img src="../assets/qr-code-frame.jpg" alt="qr-code-frame" class="w-64" />
              </div>

              <div v-else class="w-64 bg-gray-100 h-96 skeleton">
                <img src="../assets/qr-code-frame-default.jpg" alt="qr-code-frame" class="w-64" />
              </div>

              <div class="absolute mt-9">
                <qr-code :value="qrCode" :size="180" v-if="qrCode"></qr-code>
                <div class="w-[180px] h-[180px] bg-gray-100 skeleton rounded-none" v-else></div>
              </div>
            </div>

            <p class="text-sm break-all">{{ qrCode }}</p>
            <GeneralButton :load="false" text="Copiar código" @click="copyQRCode" v-if="qrCode" />
          </div>
        </div>
        <!-- END QRCODE AREA -->
      </section>
    </div>
  </div>
</template>
<script>
//components
import InternalNav from '@/components/InternalNav.vue'
import GeneralButton from '@/components/GeneralButton.vue'
import QrcodeVue from 'qrcode.vue'


import { theme } from '../services/Thema';

// utils/services
import Toast from '@/boot/Toast'
import FinancialService from '../services/FinancialService'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import PixAreaHeader from '@/components/PixAreaHeader.vue'
import { ShareMessageQRCodeOnly } from '../utils/ShareMessages'
import { useAccountStore } from '@/stores/AccountStore'
export default {
  name: 'PixInView',
  components: {
    InternalNav,
    GeneralButton,
    PixAreaHeader,
    'qr-code': QrcodeVue
  },
  setup() {
    const accountStore = useAccountStore()
    return {
      FormatMonetaryValue,
      ShareMessageQRCodeOnly,
      accountStore,
      theme
    }
  },
  data() {
    return {
      qrCode: '',
      // qrCodeImage: '',
      load: false,
      shareMessage: '',
      links: [
        {
          id: 0,
          routePath: 'pix-in',
          title: 'Receber PIX',
          iconName: ''
        },
        {
          id: 1,
          routePath: 'fixed-qrcode',
          title: 'QRCode Fixo',
          iconName: ''
        },
        {
          id: 2,
          routePath: 'pix-out',
          title: 'Transferir PIX',
          iconName: ''
        }
      ]
    }
  },
  mounted() {
    this.getQRCode()
  },
  methods: {
    getQRCode() {
      const financialService = new FinancialService()
        financialService
          .getFixedQRCode()
          .then(({data}) => { 
            this.qrCode = data.data.payload;
            this.shareMessage = ShareMessageQRCodeOnly(this.qrCode)
          })
          .catch((error) => {
            Toast.run(
              'error',
              error.response.data.message ||
                error.response.data.error ||
                'Houve um erro, tente novamente mais tarde'
            )
          })
    },
    previousStep() {},
    copyQRCode() {
      navigator.clipboard
        .writeText(this.qrCode)
        .then(() => {
          Toast.run('success', 'Código copiado para a área de transferência')
        })
        .catch(() => {
          Toast.run('error', 'Falha ao copiar o código para a área de transferência')
        })
    }
  }
}
</script>
