<template>
  <div class="relative">
    <div
      class="absolute right-0 inset-y-0 flex items-center pr-3"
      @click="TogglePasswordVisibility"
    >
      <Icon
        :icon="isPasswordVisible ? 'tabler:eye' : 'tabler:eye-off'"
        height="24"
        class="text-zinc-500 hover:text-primary cursor-pointer"
      />
    </div>

    <input
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border-gray-100 focus:border-gray-400 focus:outline-primary input input-bordered bg-gray-100 text-black w-full pr-10"
      :type="isPasswordVisible ? 'text' : 'password'"
      :id="id"
      :required="isRequired"
    />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'PasswordInput',
  data() {
    return {
      isPasswordVisible: false
    }
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
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
  emits: ['update:modelValue'],
  components: { Icon },
  methods: {
    TogglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    }
  }
}
</script>
