<template>
  <div class="bg-gray-100 min-h-screen" v-if="accountStore.mainAccount && !mainStore.loading">

    <TopNav />
    <GeneralNav class="m-3 md:mx-8" />
    <main class="min-h-screen mt-10 mx-3 md:mx-8 pb-10">
      <RouterView />
    </main>

    <footer class="bg-primary text-center text-white font-bold p-5">
      <p>©2024 {{ theme().name }}</p>
    </footer>
  </div>

  <div v-else class="bg-primary min-h-screen flex items-center justify-center flex-col">
    <span class="loading loading-infinity loading-lg bg-white"></span>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/MainStore'
import { useAccountStore } from '@/stores/AccountStore'
import { UserStore } from '@/stores/UserStore'
import { theme } from '@/services/Thema'
import TopNav from '../components/TopNav.vue'
import GeneralNav from '@/components/GeneralNav.vue'


const accountStore = useAccountStore()
const mainStore = useMainStore()
const userStore = UserStore()

userStore.setAccount()

</script>
