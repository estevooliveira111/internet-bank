<template>
  <nav>
    <ul class="flex flex-col gap-2">
      <template v-for="link in links" :key="link.id">
        <router-link v-if="link.active" :to="{ name: `${link.routePath}` }" :title="link.title" exact
          active-class="text-primary"
          class="gap-2 px-4 py-6 bg-white hover:text-primary w-full shadow flex items-center justify-center rounded">
          <Icon :icon="link.iconName" class="w-8 h-8 md:w-6 md:h-6" v-if="link.iconName !== ''" />
          <p class="font-bold text-sm md:text-md">{{ link.title }}</p>
        </router-link>
      </template>
    </ul>
  </nav>
</template>
<script setup>
import { Icon } from '@iconify/vue'
import { useAccountStore } from '@/stores/AccountStore'

const accountStore = useAccountStore()

const links = [
  {
    id: 0,
    routePath: 'pix-in',
    title: 'Receber PIX',
    iconName: '',
    active: true
  },
  {
    id: 1,
    routePath: 'fixed-qrcode',
    title: 'QRCode Fixo',
    iconName: '',
    active: true
  },
  {
    id: 2,
    routePath: 'pix-out',
    title: 'Transferir PIX',
    iconName: '',
    active: false, //accountStore.accounts[0].roles.length > 0 ? true : false
  }
];

</script>



<style scoped>
.router-link-active {
  @apply bg-white
}
</style>