<template>
    <div class="relative">
        <input :value="modelValue" @input="updateValue" :type="type" :id="id" required
            class="w-full bg-white bg-opacity-20 text-white placeholder-gray-200 border-0 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-white"
            :placeholder="placeholder" />
        
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { User, Mail, FileText, Lock, Phone } from 'lucide-vue-next'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: String,
    id: String,
    type: String,
    icon: String,
    placeholder: String,
})

const emit = defineEmits(['update:modelValue'])

const iconMap = { User, Mail, FileText, Lock, Phone }

const iconComponent = computed(() => iconMap[props.icon])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}
</script>