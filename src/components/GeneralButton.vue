<template>
  <button
    :disabled="load"
    class="btn hover:border-primary border-gray-200 focus:border-gray-400 focus:outline-primary bg-primary hover:bg-red-700 disabled:bg-primary"
    :class="load ? 'btn-disabled' : ''"
  >
    <span v-if="!load" class="text-white">{{ text }}</span>
    <span v-else class="loading loading-spinner loading-xs text-white"> </span>
  </button>
</template>
<script>
export default {
  name: 'GeneralButton',
  props: {
    load: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
