<template>

  <div class="font-normal h-screen flex xl:flex-row flex-col items-center justify-center fi-body bg-primary">

    <section class="w-full flex xl:flex-row flex-col">
      <div class="card flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <h2 class="mt-2 font-semibold text-white">Acessar minha conta</h2>
        <h2 class="text-4xl flex text-center items-center text-white mb-2">
          <strong>{{ theme.name }}</strong>
        </h2>

        <div class="w-full bg-white p-5 m-5 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <form @submit.prevent="submit" class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <!-- ALERT -->
            <div v-if="error" role="alert" class="alert alert-error text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ error }}</span>
            </div>
            <!-- END ALERT -->
            <GeneralInput v-model="form.email" placeholder="Digite seu e-mail" id="email" type="email"
              :isRequired="true" />
            <PasswordInput v-model="form.password" placeholder="Digite sua senha" id="password" :isRequired="true" />

            <GeneralButton text="Fazer Login" :load="load" class="w-full" />

            <button onclick="reset_password.showModal()" type="button"
              class="text-black w-full flex items-center justify-center text-sm hover:underline underline-offset-2 cursor-pointer decoration-zinc-600">
              Esqueci minha senha
            </button>
          </form>
        </div>

        <img v-if="theme.titleFull === 'cobrancaAlebank'" :src="theme.logo" class="w-1/4" alt="logo-doarpay" />
        <img v-else :src="theme.logo" alt="logo-doarpay" />

      </div>
    </section>

  </div>

  <dialog id="reset_password" ref="reset_password" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button id="clone-btn"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-primary">✕</button>
      </form>

      <h3 class="font-bold text-lg">Esqueceu sua senha?</h3>
      <div v-if="isResetLinkSent">
        <p class="py-2 text-gray-600">Não se preocupe, insira seu endereço de e-mail e enviaremos um link para que você
          possa redefini-la</p>
        <form @submit.prevent="submitResetPassword" class="space-y-4 md:space-y-6 mt-4">
          <GeneralInput v-model="resetPasswordForm.email" placeholder="Digite seu e-mail" id="email-verification"
            type="email" :isRequired="true" />
          <GeneralButton text="Enviar link" :load="load" class="w-full" />
        </form>
      </div>

      <div v-else class="pt-6">
        <p>Um link foi enviado para o seu e-mail</p>
        <div class="flex justify-between items-center mt-10">
          <button @click="isResetLinkSent = !isResetLinkSent" type="button"
            class="btn hover:border-primary text-white border-gray-200 focus:border-gray-400 focus:outline-primary bg-primary hover:bg-blue-700 disabled:bg-primary">
            <Icon icon="iconamoon:arrow-left-2" class="w-5 h-5" />
            Voltar
          </button>
          <button type="button" @click="submitResetPassword"
            class="text-gray-600 flex items-center justify-center hover:underline underline-offset-2 cursor-pointer decoration-zinc-600">
            Reenviar link
          </button>
        </div>
      </div>
    </div>
  </dialog>

</template>

<script>
import Account from '../services/Account'
import PasswordInput from '../components/PasswordInput.vue'
import GeneralInput from '../components/GeneralInput.vue'
import GeneralButton from '../components/GeneralButton.vue'
import { Icon } from '@iconify/vue'
import Toast from '../boot/Toast'
import { theme } from '../services/Thema';
import { UserStore } from '../stores/UserStore'

export default {
  data() {
    return {
      theme: theme(),
      error: false,
      load: false,
      isResetLinkSent: true,
      form: {
        email: '',
        password: ''
      },
      resetPasswordForm: {
        email: ''
      }
    }
  },
  components: { PasswordInput, GeneralInput, GeneralButton, Icon },
  methods: {


    submitResetPassword() {
      this.load = true
      const account = new Account()

      account
        .sendChangePasswordLink(this.resetPasswordForm)
        .then((response) => {
          document.getElementById('clone-btn').click();
          this.clearForm()
          Toast.run('success', response.data.message)
          this.isResetLinkSent = true
        })
        .catch((error) => {
          this.clearForm();
          document.getElementById('clone-btn').click();
          Toast.run(
            'error',
            error.response.data.message ||
            error.response.data.error ||
            'Houve um error, tente novamente mais tarde'
          )
        })
        .finally(() => {
          this.load = false
        })
    },


    submit() {
      this.load = true

      const data = {
        email: this.form.email,
        password: this.form.password
      }

      localStorage.removeItem('currentAccountId')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('permissions')
       
      UserStore().login(data)
        .then(() => {
          console.log(data);
          localStorage.setItem('expires_at', data.time)


          return this.$router.push({ name: 'home' })
        })
        .finally(() => {
          this.load = false
        })
    },

    clearForm() {
      this.resetPasswordForm = {
        email: ''
      };
      this.form = {
        email: '',
        password: ''
      };
    }
  }
}

</script>