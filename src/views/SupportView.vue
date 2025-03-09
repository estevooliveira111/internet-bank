<template>
  <div>
    <div class="md:grid md:grid-cols-6 gap-4">
      <section class="col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
        <h1 class="font-bold text-2xl mb-2">Suporte</h1>
        <p class="text-sm text-gray-600">
          Encontrou um problema? Entre em contato conosco para receber assistência e resolver seu
          problema.
        </p>

        <form action="mailto:suporte@doarpay.com.br" method="post" enctype="text/plain" class="mt-8">
          <div class="space-y-4 md:space-y-0 md:flex md:gap-5">
            <div class="space-y-4">
              <GeneralInput
                v-model="form.name" model="name"
                placeholder="Nome completo"
                :isRequired="true"
                id="name"
                type="text"
              />
              <GeneralInput
                v-model="form.cpf" model="cpf"
                placeholder="CPF"
                :isRequired="true"
                id="cpf"
                type="text"
                v-mask="'###.###.###-##'"
              />
              <GeneralInput
                v-model="form.email" model="email"
                placeholder="Email"
                :isRequired="true"
                id="email"
                type="email"
              />
              <GeneralInput
                v-model="form.number" model="number"
                placeholder="Número de telefone"
                :isRequired="true"
                id="number"
                type="text"
                v-mask="'(##) #####-####'"
              />
            </div>

            <textarea
              id="message"
              v-model="form.message" model="message"
              rows="4"
              class="block p-2.5 w-full border-gray-100 focus:border-gray-400 focus:outline-primary rounded-lg bg-gray-100 text-black"
              placeholder="Digite sua mensagem..."
            ></textarea>
          </div>

          <GeneralButton :load="load" text="Enviar mensagem" class="md:min-w-32 mt-4" />
        </form>
      </section>
      <div class="mt-5 md:mt-0  col-span-2 bg-white shadow rounded p-5 md:p-10 h-auto">
        <h1 class="font-bold text-lg mb-2">Canais para contato</h1>

        <ul class="flex flex-col gap-5 mt-8">
          <!-- <li class="flex items-center gap-2">
            <Icon class="w-6 h-6 text-primary" icon="ph:phone" /> <span>3003-6910</span>
          </li> -->
          <li class="flex items-center gap-2">
            <Icon class="w-6 h-6 text-primary" icon="ic:outline-email" />
            <span>suporte@doarpay.com.br</span>
          </li>
          <!-- <li class="flex items-center gap-2">
            <Icon class="w-6 h-6 text-primary" icon="ic:baseline-whatsapp" />
            <span>(11) 98765-1234</span>
          </li> -->
        </ul>
      </div>
     
    </div>
  </div>
</template>
<script>
import { Icon } from '@iconify/vue'
import GeneralInput from '@/components/GeneralInput.vue'
import GeneralButton from '@/components/GeneralButton.vue'
import Toast from '@/boot/Toast'

export default {
  components: { Icon, GeneralInput, GeneralButton },
  data() {
    return {
      load: false,
      form: {
        name: '',
        cpf: '',
        email: '',
        number: '',
        message: ''
      }
    }
  },
  methods: {
    submit(){
        this.load=true
        if(!this.form.message){
          return  Toast.run('error', 'Digite uma mensagem')
        }

        // Remove caracteres especiais do CPF
         this.form.cpf = this.form.cpf.replace(/[^\d]/g, '')

        // Remove caracteres especiais do número de telefone
        this.form.number = this.form.number.replace(/[^\d]/g, '')
        Toast.run('warning', 'Em desenvolvimento')
        this.load=false
    },
  }
}
</script>
