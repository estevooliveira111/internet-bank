<template>
  <div>
    <div class="md:grid md:grid-cols-6 gap-4">
      <InternalNav :links="links" class="col-span-2" />

      <section class="mt-5 md:mt-0 col-span-4 bg-white shadow rounded p-5 md:p-10 h-auto">
        <div>
          <h1 class="font-bold text-2xl mb-2">Adicionar usuários</h1>
          <p class="text-sm text-gray-600">Esta seção permite o gerenciamento da sua conta.</p>
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-4 mt-8">
          <GeneralInput
            type="text"
            v-model="form.name"
            id="name"
            :isRequired="true"
            placeholder="Nome"
          />
          <GeneralInput
            type="email"
            v-model="form.email"
            id="email"
            :isRequired="true"
            placeholder="E-mail"
          />

          <GeneralInput
            type="text"
            v-model="form.document"
            id="document"
            :isRequired="true"
            placeholder="Documento"
          />
          <PasswordInput
            v-model="form.password"
            id="password"
            :isRequired="true"
            placeholder="Senha"
          />
          <GeneralInput
            type="text"
            v-model="form.account"
            id="account"
            :isRequired="true"
            placeholder="Conta"
          />

          <GeneralInput
            type="text"
            v-model="form.profile"
            id="profile"
            :isRequired="true"
            placeholder="Perfil"
          />
          <GeneralInput
            type="text"
            v-model="form.phone"
            id="phone"
            :isRequired="true"
            placeholder="Telefone"
            v-mask="'(##) # ####-####'"
          />
          <GeneralButton text="Adicionar" :load="load" />
        </form>
      </section>
    </div>
  </div>
</template>
<script>
import InternalNav from '@/components/InternalNav.vue'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import GeneralButton from '@/components/GeneralButton.vue'
import GeneralInput from '@/components/GeneralInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import SystemService from '@/services/SystemService'
import Toast from '@/boot/Toast'

export default {
  name: 'PixInView',
  components: {
    InternalNav,
    GeneralButton,
    GeneralInput,
    PasswordInput
  },

  setup() {
    // const accountStore = useAccountStore()
    return {
      // accountStore,
      FormatMonetaryValue
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        document: '',
        name: '',
        account: '',
        profile: '',
        phone: ''
      },
      load: false,
      accounts: false,
      permissions: false,
      profiles: false,
      links: [
        {
          id: 0,
          routePath: 'settings-main-account',
          title: 'Conta Principal',
          iconName: ''
        },
        {
          id: 1,
          routePath: 'settings-sub-accounts',
          title: 'Contas Vinculadas',
          iconName: ''
        },
        {
          id: 2,
          routePath: 'settings-add-accounts',
          title: 'Adicionar Nova Conta',
          iconName: ''
        }
      ]
    }
  },

  methods: {
    submit() {
      this.load = true
      const data = {
        account: this.form.account,
        document: this.form.document,
        email: this.form.email,
        name: this.form.name,
        password: this.form.password,
        phone: this.form.phone.replace(/[^\d]/g, ''),
        profile: this.form.profile
      }

      const systemService = new SystemService()
      systemService
        .addUser(data)
        .then((response) => {
          Toast.run('error', response.data.message || 'Usuário criado com sucesso!')
        })
        .catch((error) => {
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
    }
  }
}
</script>
