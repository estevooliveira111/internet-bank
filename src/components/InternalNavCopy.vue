<template>
  <nav :class="class">
    <ul class="flex flex-col gap-2">
      <template v-for="link in links" :key="link.id">
        <router-link v-if="link.active" :to="{ name: `${link.routePath}` }" :title="link.title" exact
          active-class="text-primary"
          class="gap-2 px-4 py-6 bg-white hover:text-primary w-full shadow flex items-center justify-center rounded">
          <Icon :icon="link.iconName" class="w-8 h-8 md:w-6 md:h-6" v-if="link.iconName" />
          <p class="font-bold text-sm md:text-md">{{ link.title }}</p>
        </router-link>
      </template>
    </ul>
  </nav>

</template>

<script>
import { Icon } from '@iconify/vue'
import { useAccountStore } from '@/stores/AccountStore'
import { hasPermission } from '@/mixins/permissions';

export default {
  name: 'InternalNav',
  components: { Icon },
  props: ['class'],

  setup() {
    const mainStore = useAccountStore()
    return { mainStore }
  },

  data() {
    return {
      links: [
        {
          id: 0,
          routePath: 'settings-main-account',
          title: 'Minha Conta',
          iconName: 'ic:outline-verified-user',
          active: true
        },
        {
          id: 1,
          routePath: 'settings-sub-accounts',
          title: 'Gestão de Funcionários',
          iconName: 'ic:outline-supervised-user-circle',
          active: true
        },
        {
          id: 2,
          routePath: 'settings-add-accounts',
          title: 'Fazer Integrações',
          iconName: 'system-uicons:message',
          active: false
        },
        {
          id: 3,
          routePath: 'settings-split',
          title: 'Configuração de Splits',
          iconName: 'fluent:arrow-circle-down-split-20-filled',
          active: true
        },
        {
          id: 3,
          routePath: 'split-reports',
          title: 'RELATÓRIOS DE SPLITS',
          iconName: 'mdi:file-chart',
          active: true
        },
        {
          id: 4,
          routePath: 'pixs-list',
          title: 'Pix Gerados',
          iconName: 'ic:sharp-pix',
          active: false
        }
      ],
    }
  }

}
</script>


<style scoped>
.router-link-active {
  @apply bg-white
}
</style>