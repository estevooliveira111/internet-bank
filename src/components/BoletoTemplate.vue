<template>
  <div v-if="!checkingUser">
    <div class="flex w-full items-end justify-end">
      <GeneralButton :load="false" @click="download" text="Fazer Download" />
    </div>
    <div class="m-2" id="element-to-convert">
      <div class="w-[58rem]">
      
        <div class="flex justify-between items-end">
          <div class="flex items-end gap-2">
            <div class="h-10 pb-1">
              <img src="../assets/logo1.png" alt="DoarPay logo" class="h-[100%]" />
            </div>
          </div>
          <p>{{ boleto ? boleto.digitableLine : '' }}</p>
        </div>

        <div class="grid grid-cols-6">
          <div class="border-2 border-r-0 px-2 border-black space-y-.5 col-span-4">
            <span class="text-xs">Local de pagamento</span>
            <p class="font-medium">Pagável em qualquer banco ou lotérica até o vencimento.</p>
          </div>
          <div class="border-2 px-2 border-black space-y-.5 col-span-2">
            <span class="text-xs">Vencimento</span>
            <p class="font-bold text-end">
              {{ boleto ? boleto.expired : '' }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-6">
          <div class="col-span-4 ">
            <div class="border-2 border-r-0 px-2 border-t-0 border-black space-y-.5 ">
              <span class="text-xs">Beneficiário</span>
              <p class="font-medium">{{accountStore.currentAccount && accountStore.currentAccount && accountStore.currentAccount.name ? accountStore.currentAccount.name : "N/A"}}</p>
          </div>
        
          
          </div>
          <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
            <span class="text-xs">CPF/CNPJ do Beneficiário</span>
            <p class="font-medium text-end">{{accountStore.currentAccount && accountStore.currentAccount && accountStore.currentAccount.document ? accountStore.currentAccount.document : "N/A"}}</p>
          </div>
        </div>

      

        <div class="grid grid-cols-6">
          <div class="col-span-4 grid grid-cols-9">
            <div class="border-2 border-r-0 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">Uso do Banco</span>
              <p class="font-medium"></p>
            </div>
            <div class="border-2 px-2 border-t-0 border-r-0 border-black space-y-.5 col-span-1">
              <span class="text-xs">Carteira</span>
              <p class="font-medium">1</p>
            </div>
            <div class="border-2 px-2 border-t-0 border-r-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">Espécie Moeda</span>
              <p class="font-medium">R$</p>
            </div>
            <div class="border-2 px-2 border-t-0 border-r-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">Quantidade Moeda</span>
              <p class="font-medium"></p>
            </div>
            <div class="border-2 px-2 border-t-0 border-r-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">(x) Valor</span>
              <p class="font-medium"></p>
            </div>
          </div>
          <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
            <span class="text-xs">(=) Valor do Documento</span>
            <p class="font-bold text-end">
              {{ isBoletoCreated ? parseFloat(boleto.value).toFixed(2) : '000000000000' }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-6">
          <div class="col-span-4 border-2 border-t-0 border-r-0 border-black flex gap-2 justify-between">
            <div >
              <div class="p-2">
                <p class="text-xs">Pagador</p>
                <p class="font-medium">{{accountStore.currentAccount && accountStore.currentAccount && accountStore.currentAccount.name ? accountStore.currentAccount.name : "N/A"}}</p>
  
              </div>
              <div class="p-2">
                <p class="text-xs">CPF/CNPJ do Pagador</p>
                <p class="font-medium">{{accountStore.currentAccount && accountStore.currentAccount && accountStore.currentAccount.document ? accountStore.currentAccount.document : "N/A"}}</p>
              </div>
            </div>
            <div  v-if="isPixCreated && pix.qrcode" class="flex items-center flex-col mr-4 place-self-end mb-4">
              <p class="text-sm">Pix QRCode</p>
              <qr-code :value="pix.qrcode" :size="125"></qr-code>

            </div>
            
          </div>
         
          <div class="col-span-2">
            <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">(-) Desconto</span>
              <p class="font-medium text-end">‎</p>
            </div>

            <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">(-) Outras Deduções/Abatimentos</span>
              <p class="font-medium text-end">‎</p>
            </div>
            <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">(+) Mora/Multa/Juros</span>
              <p class="font-medium text-end">‎</p>
            </div>
            <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">(+) Outros Acréscimos</span>
              <p class="font-medium text-end">‎</p>
            </div>
            <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">(=) Valor cobrado</span>
              <p class="font-medium text-end">‎</p>
            </div>

            <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">Nosso número</span>
              <p class="font-medium text-end">
                {{ (Math.floor(Math.random() * 10010) * 50402) }}
              </p>
            </div>

            <div class="border-2 px-2 border-t-0 border-black space-y-.5 col-span-2">
              <span class="text-xs">Data do Documento</span>
              <p class="font-medium text-end">
                {{
                  isBoletoCreated ? boleto.created_at : 'dd/mm/aaaa'
                }}
              </p>
            </div>
          </div>
        </div>

      
        <vue-barcode
          :value="isBoletoCreated ? boleto.barcode : 'N/A'"
          :options="{ displayValue: false }"
          class="w-[32rem] mt-8"
        ></vue-barcode>

        <div class="border border-dashed border-black my-4"></div>
      </div>
    </div>
  </div>
  <div v-else class="bg-primary min-h-screen flex items-center justify-center flex-col">
    <img :src="theme.logo" alt="foto" />
    <span class="loading loading-infinity loading-lg bg-white"></span>
  </div>
</template>

<script>
import { theme } from '@/services/Thema';
import GeneralButton from './GeneralButton.vue'

import { useAccountStore } from '@/stores/AccountStore'

import QrcodeVue from 'qrcode.vue'

export default {
  components: { GeneralButton, 'qr-code': QrcodeVue },
  setup() {
    const accountStore = useAccountStore()
    return {
      accountStore,
      theme: theme()
    }
  },
  data() {
    return {
      checkingUser: false,
      isBoletoCreated: false,
      boleto: false,
      isPixCreated: false,
      pix: false,

    }
  },
  
  created() {
    this.boleto = localStorage.getItem('boleto');
    this.isBoletoCreated = localStorage.getItem('isBoletoCreated');

    this.pix = localStorage.getItem('pix');
    this.isPixCreated = localStorage.getItem('isPixCreated');
  },

  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        window.print()
      })
    }, 3000)
  },
  methods: {
    download() {
      window.print()
    }
  }
}
</script>
