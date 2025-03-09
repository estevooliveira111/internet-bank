<template>
  <div v-if="isRole" :class="props.class">
    <div v-if="isRole">
      <div class="flex justify-center items-center">
        <span class="text-xs font-normal text-primary">Saldo:</span>
      </div>
      <div class="flex justify-center items-center">
        <div>
          <span class="text-3xl font-normal text-primary">{{ balanceStore.balancee() }}</span>
        </div>
        <Icon
          @click="balanceStore.setView()"
          :icon="!balanceStore.balanceView ? 'tabler:eye' : 'tabler:eye-off'"
          class="text-primary ml-2 w-6 h-6"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import { useBalanceStore } from '@/stores/BalanceStore.js'
const props = defineProps(['class'])

const balanceStore = useBalanceStore()

const isRole =
  localStorage.getItem('role') === 'undefined' || localStorage.getItem('role') === 'Funcionario'
    ? false
    : true
</script>
