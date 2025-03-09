<template>
  <nav>
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <template v-for="(link, key) in menus" :key="key">
        <router-link
          v-if="link.active == 1"
          :to="{ name: `${link.routePath}` }"
          :title="link.title"
          class="gap-2 px-4 py-6 bg-white hover:text-primary w-full shadow flex items-center justify-center rounded"
        >
          <Icon :icon="link.iconName" class="w-8 h-8 md:w-6 md:h-6" />
          <p class="fo, active: 1,nt-bold text-sm md:text-md">{{ link.title }}</p>
        </router-link>

        <div
          v-else-if="link.status == 2"
          class="cursor-not-allowed gap-2 px-4 py-6 w-full flex items-center justify-center rounded bg-gray-400 text-white"
        >
          <Icon :icon="link.iconName" class="cursor-not-allowed w-8 h-8 md:w-6 md:h-6" />
          <p class="fo active: 1,nt-bold text-sm md:text-md">{{ link.title }}</p>
        </div>
      </template>
    </ul>
  </nav>
</template>


<script setup>
import { Icon } from '@iconify/vue'

const menus = [
  {
    id: 0,
    routePath: 'dashboard',
    title: 'Dashboard',
    iconName: 'mi:home',
    active: 1
  },
  {
    id: 1,
    title: 'Extrato',
    routePath: 'extract',
    iconName: 'fluent:document-text-extract-20-regular',
    active:
      localStorage.getItem('role') === 'undefined' || localStorage.getItem('role') === 'Funcionario'
        ? false
        : true
  },
  {
    id: 2,
    title: 'Receber PIX',
    routePath: 'pix-in',
    iconName: 'uil:money-withdraw',
    active: 1
  },
  {
    id: 2,
    title: 'QRCode Fixo',
    routePath: 'fixed-qrcode',
    iconName: 'ic:baseline-qrcode',
    active: 0
  },
  {
    id: 5,
    title: 'Transferir PIX',
    routePath: 'pix-out',
    iconName: 'uil:money-insert',
    active:
      localStorage.getItem('role') === 'undefined' || localStorage.getItem('role') === 'Funcionario'
        ? false
        : true
  },
  //{
  //  id: 6,
  //  title: 'Suporte',
  //  routePath: 'support',
  //  iconName: 'bx:support',
  //  active: 1,
  //},
  {
    id: 7,
    title: 'Boletos',
    routePath: 'boletos',
    iconName: 'jam:newspaper',
    active: 0
  },
  {
    id: 7,
    title: 'Cobranças',
    routePath: 'cobrancas',
    iconName: 'fluent:building-retail-money-20-filled',
    active: true //hasPermission('COBRANCA_VER_TODOS')
  },
  {
    id: 7,
    title: 'QR Code Estático',
    routePath: 'fixed-qrcode',
    iconName: 'material-symbols-light:qr-code-2',
    active: 0
  },
  {
    id: 7,
    title: 'Clientes',
    routePath: 'client',
    iconName: 'mage:users',
    active: 0
  }
]
</script>

<style scoped>
.router-link-active {
  @apply text-primary;
}
</style>
