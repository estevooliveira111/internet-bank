<template>
  <RouterView />
</template>



<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { datePtBR, ptBR } from 'naive-ui';
import { AcessAPI } from '@/boot/API';


AcessAPI.get('banking/customers').
then(({ data }) => {
  console.log(data.customer
  );
})
</script>
