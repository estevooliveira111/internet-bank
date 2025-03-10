<template>
  <nav class="bg-primary">
    <div class="flex items-center justify-between px-4">
      <div class="relative z-50 px-3 py-5 md:w-auto w-full flex justify-between gap-4">
        <img :src="theme.logo" alt="logo-doarpay" class="h-10 md:h-10 md:cursor-pointer" />

        <div v-if="theme.titleFull === 'cobrancaAlebank'" class="flex items-center text-white">
          <a class="ml-5 link" href="https://www.allepay.com.br/u">Ir para Painel Bank</a>
        </div>

        <div class="flex items-center justify-center gap-2">
         

          <button
            class="text-white md:hidden flex items-center justify-center space-x-4"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Icon
              :icon="isMenuOpen ? 'eva:close-fill' : 'heroicons-solid:menu-alt-3'"
              class="text-2xl"
            />
          </button>
        </div>
      </div>

      <!-- DESKTOP -->
      <ul class="md:flex hidden items-center gap-2 text-red-700">
        <!-- BALANCE -->
        <li class="group relative bg-white rounded mr-0 px-3 mb-1">
          <div v-if="isRole" class="flex w-full py-2 justify-between gap-6">
            <div class="flex items-center text-primary gap-2">
              <Icon icon="bx:coin-stack" height="1.5rem" />
              <div>
                <p class="text-xs text-primary">Saldo</p>
                <h2 class="font-bold text-sm">{{ balanceStore.balancee() }}</h2>
              </div>
              <Icon
                @click="balanceStore.setView()"
                :icon="!balanceStore.balanceView ? 'tabler:eye' : 'tabler:eye-off'"
                class="ml-2 w-6 h-6"
              />
            </div>
          </div>
        </li>
        <!-- END BALANCE -->

        <!-- ACCOUNT -->
        <li
          class="group relative bg-white mr-0 px-3 mb-1"
          :class="!isAccountOptionsOpen ? 'rounded' : 'rounded-t'"
          id="accounts"
        >
          <div class="flex w-full py-2 justify-between gap-6">
            <div class="flex items-center gap-2 text-primary">
              <Icon icon="lets-icons:user" height="1.5rem" />
              <div v-if="!userStore.loadMainAccount">
                <h2 class="font-bold text-sm">{{ userStore.mainAccount.name }}</h2>
                <div class="flex gap-3">
                  <p class="text-xs">Ag {{ userStore.mainAccount.agency }}</p>
                  <p class="text-xs">Cc: {{ userStore.mainAccount.account }}</p>
                </div>
              </div>
              <div v-else class="flex flex-col gap-2">
                <h2 class="skeleton bg-gray-200 w-32 h-4"></h2>
                <div class="flex gap-3 justify-between">
                  <h2 class="skeleton bg-gray-200 w-14 h-3"></h2>
                  <h2 class="skeleton bg-gray-200 w-14 h-3"></h2>
                </div>
              </div>
            </div>

            <button
              class="flex items-center text-primary hover:text-red-500"
              @click="isAccountOptionsOpen = !isAccountOptionsOpen"
              title="Trocar conta"
            >
              <Icon
                :icon="
                  isAccountOptionsOpen ? 'iconamoon:arrow-up-2-bold' : 'iconamoon:arrow-down-2-bold'
                "
                class="w-5 h-5"
              />
            </button>
          </div>

          <!-- ACCOUNT SELECTION DESKTOP-->

          <div
            class="w-full rounded-b bg-white shadow"
            :class="isAccountOptionsOpen ? 'absolute left-0' : 'hidden'"
          >
            <div class="bg-white gap-10" v-if="userStore.accounts.length > 0">
              <div v-for="(account, index) in userStore.accounts" :key="account.id">
                <div
                  class="text-sm my-1 w-full"
                  :class="
                    userStore.accounts.length - 1 === index ? '' : 'border-b-2 border-gray-100'
                  "
                >
                  <button
                    @click="changeAccount(account)"
                    class="flex justify-between w-full hover:text-primary p-5"
                  >
                    <p class="hover:text-primary">{{ account.name }}</p>
                    <span>Cc: {{ account.account }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- END ACCOUNT SELECTION  -->
        </li>
        <!-- END ACCOUNT -->

        <li>
          <router-link
            :to="{ name: 'settings-main-account' }"
            title="Configurações"
            class="flex items-center p-4 gap-2 rounded mb-1 hover:text-red-500 text-white hover:bg-white transition"
          >
            <Icon icon="ion:settings-outline" class="w-5 h-5" />
          </router-link>
        </li>

        <li>
          <button
            @click="userStore.logout()"
            title="Sair"
            class="flex items-center p-4 gap-2 rounded mb-1 hover:text-red-600 text-white hover:bg-white transition"
          >
            <Icon icon="ic:round-logout" class="w-5 h-5" />
          </button>
        </li>
      </ul>

      <!-- MOBILE MENU -->
      <ul
        class="md:hidden bg-gray-100 fixed w-full top-20 overflow-y-auto bottom-0 py-4 pl-5 duration-500"
        :class="isMenuOpen ? 'right-0' : 'right-[-100%]'"
      >
        <!-- BALANCE -->
        <li class="group relative bg-white mr-4 px-3 rounded mb-1">
          <div class="flex w-full py-3 justify-between items-center">
            <div class="flex items-center gap-4">
              <Icon icon="bx:coin-stack" height="2rem" />

              <div>
                <p class="md:text-sm text-xs">Saldo disponível</p>
                <h2 class="font-bold">
                  {{ balanceStore.balancee() }}
                </h2>
              </div>
            </div>
            <Icon
              @click="balanceStore.setView()"
              :icon="!balanceStore.balanceView ? 'tabler:eye' : 'tabler:eye-off'"
              class="w-6 h-6 cursor-pointer hover:text-primary"
            />
          </div>
        </li>
        <!-- END BALANCE -->

        <!-- ACCOUNT -->
        <li class="group relative bg-white mr-4 px-3 rounded mb-1" id="accounts">
          <div class="flex w-full py-3 justify-between">
            <div class="flex items-center gap-4">
              <Icon icon="lets-icons:user" height="2rem" />
              <div v-if="!userStore.loadMainAccount">
                <h2 class="font-bold">{{ userStore.mainAccount.name }}</h2>
                <div class="flex gap-3">
                  <p class="md:text-sm text-xs">Ag {{ userStore.mainAccount.agency }}</p>
                  <p class="md:text-sm text-xs">Cc: {{ userStore.mainAccount.account }}</p>
                </div>
              </div>
            </div>
            <button
              class="flex items-center gap-2"
              @click="isAccountOptionsOpen = !isAccountOptionsOpen"
              v-if="userStore.accounts.length > 1"
            >
              <p class="text-xs">Trocar conta</p>
              <Icon
                :icon="
                  isAccountOptionsOpen ? 'iconamoon:arrow-up-2-bold' : 'iconamoon:arrow-down-2-bold'
                "
                class="w-5 h-5"
              />
            </button>
          </div>

          <!-- ACCOUNT SELECTION MOBILE-->
          <div
            :class="isAccountOptionsOpen ? '' : 'hidden'"
            class="group-hover:md:block hover:md-block w-full rounded"
            v-if="userStore.accounts.length > 1"
          >
            <div class="bg-white gap-10" v-if="userStore.accounts.length > 0">
              <ul v-for="(account, index) in userStore.accounts" :key="account.id">
                <li
                  class="text-sm text-gray-600 my-2.5 w-full"
                  :class="
                    userStore.accounts.length - 1 === index ? '' : 'border-b-2 border-gray-100'
                  "
                >
                  <button
                    class="flex justify-between w-full hover:text-primary p-5"
                    @click="changeAccount(account)"
                  >
                    <p class="hover:text-primary">{{ account.name }}</p>
                    <span>Cc: {{ account.account }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <!-- END ACCOUNT SELECTION -->
        </li>
        <!-- END ACCOUNT -->

        <li class="mr-4">
          <router-link
            :to="{ name: 'settings-main-account' }"
            class="flex items-center bg-white p-3 gap-2 rounded mb-1 hover:text-primary"
          >
            <Icon icon="ion:settings-outline" class="w-5 h-5" />
            Configurações
          </router-link>
        </li>
        <li class="mr-4">
          <button
            type="button"
            @click="userStore.logout()"
            class="flex w-full items-center gap-2 bg-white p-3 rounded mb-1 hover:text-red-800"
          >
            <Icon icon="ic:round-logout" class="w-5 h-5" />
            Sair
          </button>
        </li>
      </ul>
      <!-- END MOBILE MENU -->
    </div>
  </nav>

</template>

<script>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useBalanceStore } from '@/stores/BalanceStore'
import { UserStore } from '@/stores/UserStore'
import { theme } from '@/services/Thema'

export default {
  name: 'TopNav',
  components: { RouterLink, Icon },

  setup() {
    const balanceStore = useBalanceStore()

    const isRole =
      localStorage.getItem('role') === 'undefined' || localStorage.getItem('role') === 'Funcionario'
        ? false
        : true

    balanceStore.setBalance()

    return {
      theme: theme(),
      userStore: UserStore(),
      balanceStore,
      isRole
    }
  },

  data() {
    return {
      isMenuOpen: false,
      isAccountOptionsOpen: false,
      isBalanceVisible: true
    }
  },

  methods: {
    async changeAccount(account_) {
      this.isAccountOptionsOpen = !this.isAccountOptionsOpen
      this.userStore.changeAccount(account_)
    }
  }
}
</script>



<style scoped>
.router-link-active {
  @apply bg-white text-red-500;
}
</style>