<template>
  <input
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="border-gray-100 focus:border-gray-400 focus:outline-primary input input-bordered bg-gray-100 text-black w-full"
    :type="type"
    :id="id"
    :required="isRequired"
  />
</template>

<script>
export default {
  name: 'GeneralInput',
  props: {
    modelValue: {
      required: true
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    isRequired: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>
