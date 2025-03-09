<template>
  <dialog class="modal modal-bottom sm:modal-middle " ref="modal">
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-primary"
        >
          ✕
        </button>
      </form>
      <div class="flex flex-col md:flex-row items-center">
        <div>
          <h3 class="font-bold text-lg">Permitir cookies</h3>
          <p class="py-4 text-gray-600">
            Por favor, autorize o uso de cookies para desfrutar de todas as funcionalidades
            disponíveis em nossa aplicação.
          </p>
        </div>
        <Icon icon="emojione:cookie" class="h-20 flex w-full items-center justify-center" />
      </div>

      <div class="modal-action flex gap-1">
        <form @submit.prevent="closeModal">
          <GeneralButton
            type="submit"
            :load="false"
            text="Fechar"
            class="!bg-gray-500 !border-gray-500 hover:!bg-red-500 hover:!border-red-500"
          />
        </form>
        <GeneralButton @click="allowCookies" :load="false" text="Aceitar" />
      </div>
    </div>
  </dialog>
</template>

<script>
import { Icon } from '@iconify/vue'

import GeneralButton from './GeneralButton.vue'
export default {
  name: 'AllowCookies',
  components: { Icon, GeneralButton },

  mounted() {
    // WARNING: Add this line because without this validation, the application breaks in the mobile browser.
    if ('navigator' in window) {
      if (!('geolocation' in navigator)) {
        this.showModal()
      }
    }

    // WARNING: Add this line because without this validation, the application breaks in the mobile browser.
    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        this.showModal()
      }
    }
  },

  methods: {
    closeModal() {
      this.$refs.modal.close()
    },
    showModal() {
      this.$refs.modal.showModal()
    },

    getGeoLocation() {
      if ('navigator' in window) {
        const successCallback = (position) => {
          console.log(position)
        }
        const errorCallback = (error) => {
          console.log(error)
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
      }
    },

    allowNotifications() {
      if ('Notification' in window) {
        Notification.requestPermission()
      } else {
        console.error('This browser does not support notifications')
      }
    },
    allowCookies() {
      this.allowNotifications()
      this.getGeoLocation()
      this.closeModal()
    }
  }
}
</script>
