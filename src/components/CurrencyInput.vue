<template>
  <div class="relative">
    <p class="absolute left-3 inset-y-0 flex items-center pr-3">R$ </p>
    <input
    ref="inputRef"
    type="text"
    class="pl-10 border-gray-100 focus:border-gray-400 focus:outline-primary input input-bordered bg-gray-100 text-black w-full"
  />
  </div>
  
</template>

<script>
// Code from the oficial documentation: https://dm4t2.github.io/vue-currency-input/guide.html#use-the-custom-component
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: [String, Number],
  },
  setup() {
    const { inputRef } = useCurrencyInput({ currency: 'BRL', currencyDisplay: 'hidden' })
    return { inputRef }
  }
}
</script>
