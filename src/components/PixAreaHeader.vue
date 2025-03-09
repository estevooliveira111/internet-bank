<template>
  <!-- HEADER  -->
  <div
    class="mb-5 flex items-center text-gray-600 justify-between"
  >
    <button
      @click="$emit('previousStep')"
      class="flex items-center gap-2 hover:text-primary"
      v-if="backArrow"
    >
      <Icon icon="formkit:arrowleft" class="w-5 h-5 xl:h-6 xl:w-6" />
      <p class=" ">Voltar</p>
    </button>

    <router-link
    
    v-else
      :to="{ name: 'fixed-qrcode-download' }"
      class="flex items-center hover:text-primary"
      title="Baixar"
      target="_blank"
    >
      <Icon icon="material-symbols:download" class="w-6 h-6" />
      <p class="text">Baixar</p>
    </router-link>

    <!-- SOCIAL / DOWNLOAD BUTTON -->
    <div class="flex items-center justify-center gap-2">
      
      <a
        :href="shareLinks.whatsapp"
        target="_blank"
        class="flex items-center gap-2 hover:text-primary"
        title="Compartilhar no whatsapp"
      >
        <Icon icon="ic:baseline-whatsapp" class="w-6 h-6" />
      </a>
      <button
        @click="this.$refs.modal.showModal()"
        class="flex items-center gap-2 hover:text-primary"
        title="Compartilhar "
      >
        <Icon icon="material-symbols:share-outline" class="w-6 h-6" />
      </button>
    </div>
    <!-- END SOCIAL / DOWNLOAD BUTTON -->
  </div>

  <!-- END HEADER  -->

  <!-- SHARE MODAL -->
  <dialog class="modal modal-bottom sm:modal-middle" id="share_modal" ref="modal">
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-primary"
        >
          ✕
        </button>
      </form>
      <div>
        <h3 class="font-bold text-lg">Compartilhar</h3>
        <div class="flex flex-wrap items-end gap-3 mt-2 px-2 py-5">
          <a
            :href="shareLinks.whatsapp"
            target="_blank"
            class="flex flex-col items-center gap-1 hover:text-primary text-sm"
            title="Whatapp "
          >
            <Icon icon="logos:whatsapp-icon" class="w-8 h-8" />
            Whatsapp
          </a>
          <!-- <a
                :href="shareLinks.facebook"
                target="_blank"
                class="flex flex-col items-center gap-1 hover:text-primary text-sm"
                title="Facebook"
              >
                <Icon icon="logos:facebook" class="w-8 h-8" />
                Facebook
              </a> -->

          <a
            :href="shareLinks.email"
            target="_blank"
            class="flex flex-col items-center gap-1 hover:text-primary text-sm"
            title="Email"
          >
            <Icon icon="twemoji:e-mail" class="w-8 h-8" />
            Email
          </a>
          <button
            @click="$emit('copyQRCode')"
            target="_blank"
            class="flex flex-col items-center gap-0 hover:text-primary text-sm"
            title="Copiar código"
          >
            <Icon icon="ph:copy-simple-bold" class="w-8 h-8 text-gray-600" />
            Copiar código
          </button>
        </div>
      </div>
    </div>
  </dialog>
  <!-- END SHARE MODAL -->
</template>
<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'PixAreaHeader',
  components: { Icon },
  emits: ['previousStep', 'copyQRCode'],
  data() {
    return {
      shareLinks: {}
    }
  },
  created() {
    this.initializeShareLinks()
  },
  props: {
    backArrow: {
      type: Boolean,
      required: true
    },
    shareMessage: {
      type: String,
      required: true
    },
  
  },
  methods: {
    initializeShareLinks() {
      const message = this.shareMessage
      const encodedMessage = encodeURIComponent(message)
      this.shareLinks = {
        // facebook: `https://www.facebook.com/example?message=${encodedMessage}`,
        // instagram: `https://www.instagram.com/example?text=${encodedMessage}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,
        email: `mailto:?body=${encodedMessage}`
      }
    }
  }
}
</script>
