<template>
  <div class="relative w-[50rem]">
    <div class="absolute left-[19.5rem] top-[24rem]" v-if="qrCode">
      <qr-code :value="qrCode" :size="200"></qr-code>
    </div>
    <div class="absolute left-[19.5rem] top-[24rem] skeleton bg-gray-100 h-[200px] w-[200px]" v-else>
    </div>
    <h1 class="absolute left-[8rem] top-[51.5rem] w-[34rem] break-words text-center" v-if="qrCode">
      {{ qrCode }}
    </h1>

    <h1 class="absolute left-[8rem] top-[51.5rem] w-[34rem] break-words text-center h-20 skeleton bg-gray-100" v-else>
    </h1>


    
    <img src="https://i.ibb.co/nm8XLNV/fixed-qrcode-template-v0.png" />
    <div class="flex justify-between">
      <p>{{ accountStore.currentAccount.detalhes ? accountStore.currentAccount.detalhes.name : '' }}</p>
      <p>
        {{ accountStore.currentAccount.detalhes ? accountStore.currentAccount.detalhes.account : '' }}
      </p>
    </div>
  </div>
</template>
<script>
//components
import QrcodeVue from 'qrcode.vue'

// utils/services
import Toast from '@/boot/Toast'
import FinancialService from '../services/FinancialService'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import { useAccountStore } from '@/stores/AccountStore'

// import Account from '@/services/Account'

export default {
  name: 'PixInView',
  components: {
    'qr-code': QrcodeVue
  },
  setup() {
    const accountStore = useAccountStore()
    return {
      FormatMonetaryValue,
      accountStore
    }
  },
  data() {
    return {
      qrCode: '',
      load: false
    }
  },
  beforeCreate() {
    // const account = new Account()
    // account.me().catch((error) => {
    //   console.log(error)
    //   if (error.response)
    //     if (error.response.status === 401) this.$router.push({ name: 'login' })
    //     else {
    //       console.log(error)
    //     }
    // })
  },

  created() {
    this.getQRCode()
  },

  methods: {
    getQRCode() {
      // Check if the token account is not available in the user store
      if (!this.accountStore.tokenAccount) {
        // If token account is not available, schedule a retry after 1 second
        // NOTE: This delay is necessary due to security measures where the token account is not stored in local storage.
        // As a result, each time the user reloads or enters the page, the .me function needs to be executed,
        // which takes some time to retrieve the token account. This validation ensures that the QR code generation
        // is deferred until the token account is available.

        setTimeout(() => {
          this.getQRCode()
        }, 1000)
      } else {
        // If token account is available
        const financialService = new FinancialService()
        financialService
          .getFixedQRCode()
          .then((response) => {
            console.log(response)
            let fixe = `00020126580014BR.GOV.BCB.PIX0136b165bcfe-490c-43bd-a126-991b4e99c8545204000053039865802BR5907DoarPay6009Sao Paulo62180514conta01doarpay6304035D`;
            this.qrCode = fixe;

            setTimeout(() => {
              window.print()
            }, 500)
          })
          .catch((error) => {
            Toast.run(
              'error',
              error.response.data.message ||
                error.response.data.error ||
                'Houve um erro, tente novamente mais tarde'
            )
          })
      }
    }
  }
}
</script>
