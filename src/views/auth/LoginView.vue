<template>

  <div class="flex w-screen flex-wrap text-slate-800">
    <div class="flex w-full flex-col md:w-1/2">
      <div class="flex justify-center pt-12 md:justify-start md:pl-12">
        <a href="#" class="text-2xl font-bold text-red-600"> Odara. </a>
      </div>
      <div class="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
        <p class="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
          Bem-vindo de volta a <span class="text-red-600">Odara</span>
        </p>
        <p class="mt-6 text-center font-medium md:text-left">Entre na sua conta abaixo.</p>

        <form @submit.prevent="submit" class="flex flex-col items-stretch pt-3 md:pt-8">
          <div class="flex flex-col pt-4">
            <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-red-600">
              <InputText v-model="form.email" type="email" id="login-email" class="w-full" placeholder="Email" />
            </div>
          </div>
          <div class="mb-4 flex flex-col pt-4">
            <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-red-600">
              <InputText v-model="form.password" type="password" id="login-password" class="w-full"
                placeholder="Password" />
            </div>
          </div>
          <a href="#" class="mb-6 text-center text-sm font-medium text-gray-600 md:text-left">Esqueceu sua senha?</a>
          <Button :loading="loading" type="submit"
            class="rounded-lg bg-red-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-red-500 ring-offset-2 transition hover:bg-red-700 focus:ring-2 md:w-32">Entrar</button>
        </form>
        <div class="py-12 text-center">
          <p class="text-gray-600">
            Não tem uma conta?
            <router-link :to="{ name: 'register' }"
              class="whitespace-nowrap font-semibold text-gray-900 underline underline-offset-4">Cadastre-se
              gratuitamente.</router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="relative hidden h-screen select-none bg-red-600 bg-gradient-to-br md:block md:w-1/2">
      <div class="py-16 px-8 text-white xl:w-[40rem]">
        <span class="rounded-full bg-white px-3 py-1 font-medium text-red-600">New Feature</span>
        <p class="my-6 text-3xl font-semibold leading-10">Create animations with <span
            class="abg-white whitespace-nowrap py-2 text-cyan-300">drag and drop</span>.</p>
        <p class="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt necessitatibus nostrum
          repellendus ab totam.</p>
        <a href="#" class="font-semibold tracking-wide text-white underline underline-offset-4">Learn More</a>
      </div>
      <img class="ml-8 w-11/12 max-w-lg rounded-lg object-cover"
        src="https://componentland.com/images/aaFKzowNcgxqSdxMw11na.png" />
    </div>
  </div>


</template>

<script setup>
import { Button, InputText, useToast } from 'primevue'
import { ref } from 'vue'
import Auth from '@/services/Auth.js'

const form = ref({
  email: '',
  password: '',
})

const toast = useToast()
const loading = ref(false)

const submit = async () => {
  loading.value = true
  await new Auth()
    .doLogin({
      email: form.value.email,
      password: form.value.password,
    })
    .then(({ data }) => {
      console.log(data)

      toast.add({
        severity: 'success',
        summary: 'Bem Vindo',
        life: 3000,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('expires_at', data.expires_at)

      return (window.location.href = '/dashboard')
    })
    .catch(({ response }) => {
      toast.add({
        severity: 'error',
        summary: 'Falha ao fazer login',
        detail: response?.data?.error,
        life: 3000,
      })
    })
    .finally(() => (loading.value = false))
}

</script>