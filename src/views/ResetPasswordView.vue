<template>
  <div class="font-normal h-screen flex xl:flex-row flex-col items-center justify-center bg-primary">
    <section class="w-full flex xl:flex-row flex-col">
      <div class="card flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <h2 class="mt-2 font-semibold text-white">Resetar Senha</h2>
        <h2 class="text-4xl flex text-center items-center text-white mb-2">
          <strong>Doar Pay</strong>
        </h2>

        <div class="w-full bg-white p-5 m-5 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <form @submit.prevent="submit" class="p-6 space-y-4 md:space-y-6 sm:p-8">

            <PasswordInput v-model="form.password" placeholder="Digite sua nova senha" id="password"
              :isRequired="true" />
            <PasswordInput v-model="form.password_confirmation" placeholder="Confirme sua nova senha"
              id="confirm-password" :isRequired="true" />

            <GeneralButton text="Redefinir senha" :load="load" class="w-full" />
          </form>
        </div>

        <img src="../assets/logo.png" alt="logo-doarpay" />
      </div>
    </section>
  </div>
</template>

<script>
import Account from '../services/Account'

// components
import PasswordInput from '../components/PasswordInput.vue'
import GeneralButton from '../components/GeneralButton.vue'

import Toast from '@/boot/Toast'
export default {
  data() {
    return {
      form: {
        token: '',
        password: '',
        password_confirmation: ''
      },
      error: false,
      load: false
    }
  },
  components: { PasswordInput, GeneralButton },

  methods: {
    submit() {
      this.load = true
      this.form.token = this.$route.query.token

      const account = new Account()

      account
        .changePassword(this.form)
        .then(() => {
          return this.$router.push({ path: '/' });
        })
        .catch((error) => {
          console.error(error)
          Toast.run('error', error.response?.data?.error || error.response?.data?.message || 'Houve um erro, tente novamente mais tarde')
        })
        .finally(() => {
          this.load = false
        })
    }
  }
}
</script>
