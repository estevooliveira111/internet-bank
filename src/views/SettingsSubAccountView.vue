<template>
  <div>
    <div class="md:grid md:grid-cols-6 gap-4">
      <InternalNav :links="links" class="col-span-2" />

      <section class="mt-5 md:mt-0 col-span-4">
        <div class="bg-white shadow rounded p-5 md:p-10 h-auto">
          <h1 class="font-bold text-2xl mb-2">
            {{ form.selectedAccount && form.selectedAccount.name ? form.selectedAccount.name : '' }}
          </h1>
          <p class="text-sm text-gray-600">Esta seção permite o gerenciamento da sau conta.</p>
        </div>

        <div class="bg-white shadow rounded p-5 md:p-10 h-auto mt-4">
          <h2 class="font-bold text-2xl mb-2">Permissões da conta</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 my-8" v-if="permissions">
            <div v-for="permission in permissions" :key="permission.id">
              <label class="flex gap-2 whitespace-nowrap">
                <input
                  type="checkbox"
                  :id="permission.id"
                  :value="permission.id"
                  v-model="form.permissions"
                />
                {{ permission.name }}
              </label>
            </div>
          </div>
          <GeneralButton
            @click="checkPermissionDifferences"
            text="Alterar Permissões"
            :load="load"
          />
        </div>

        <div class="bg-white shadow rounded p-5 md:p-10 h-auto mt-4">
          <h2 class="font-bold text-2xl mb-2">Informações da conta</h2>

          <form @submit.prevent="submit" class="flex flex-col gap-4 mt-8">
            <GeneralInput
              type="text"
              v-model="form1.name"
              id="name"
              :isRequired="true"
              placeholder="Nome"
              :disabled="!edition1"
            />
            <GeneralInput
              type="text"
              v-model="form1.phone"
              id="phone"
              :isRequired="true"
              placeholder="Telefone"
              v-mask="'(##) # ####-####'"
              :disabled="!edition1"
            />
            <GeneralInput
              type="email"
              v-model="form1.email"
              id="email"
              :isRequired="true"
              placeholder="E-mail"
              :disabled="!edition1"
            />

            <GeneralInput
              type="text"
              v-model="form1.dt_birth"
              id="dt_birth"
              :isRequired="true"
              placeholder="Data de nascimento"
              v-mask="'##/##/####'"
              :disabled="!edition1"
            />

            <div class="flex flex-col gap-4 mt-8">
              <h2>Configurações de transferência</h2>
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">Valor mínimo para  PIX</span>
                </div>
                <GeneralInput
                  type="text"
                  v-model="form1.min_pix_in"
                  id="dt_birth"
                  :isRequired="true"
                  v-mask="'##/##/####'"
                  :disabled="!edition1"
                  v-if="!edition1"
                />
                <CurrencyInput v-else v-model="form1.min_pix_in" placeholder="min_pix_in" />
              </label>

              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">Valor máximo para PIX</span>
                </div>
                <GeneralInput
                  type="text"
                  v-model="form1.max_pix_out"
                  id="dt_birth"
                  :isRequired="true"
                  v-mask="'##/##/####'"
                  :disabled="!edition1"
                  v-if="!edition1"
                />
                <CurrencyInput v-else v-model="form1.max_pix_out" placeholder="min_pix_in" />
              </label>

              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">Valor mínimo para recebimento via Boleto</span>
                </div>
                <GeneralInput
                  type="text"
                  v-model="form1.min_boleto_in"
                  id="dt_birth"
                  :isRequired="true"
                  v-mask="'##/##/####'"
                  :disabled="!edition1"
                  v-if="!edition1"
                />
                <CurrencyInput v-else v-model="form1.min_boleto_in" placeholder="min_pix_in" />
              </label>
            </div>

            <GeneralButton text="Salvar" :load="load1" @click="submit" v-if="edition1" />
            <GeneralButton text="Editar" :load="load1" @click="edition1 = true" v-else />
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import InternalNav from '@/components/InternalNav.vue'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import SystemService from '@/services/SystemService'
import { useAccountStore } from '@/stores/AccountStore'
import GeneralButton from '@/components/GeneralButton.vue'
import Toast from '@/boot/Toast'
import GeneralInput from '@/components/GeneralInput.vue'
import CurrencyInput from '@/components/CurrencyInput.vue'
export default {
  name: 'PixInView',
  components: {
    InternalNav,
    GeneralButton,
    GeneralInput,
    CurrencyInput
  },

  setup() {
    const accountStore = useAccountStore()
    return {
      accountStore,
      FormatMonetaryValue
    }
  },
  data() {
    return {
      form: {
        accountId: false,
        selectedAccount: false,
        permissionsCache: false,
        permissions: []
      },
      form1: {
        email: '',
        name: '',
        phone: '',
        dt_birth: '',

        min_pix_in: '',
        max_pix_out: '',
        tax_pix_out: '',
        min_boleto_in: ''
      },
      load1: false,
      edition1: false,
      load: false,
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
  created() {
    this.getSystemPermissions()
    this.accountId = this.$route.query.account

    this.form.selectedAccount = this.accountStore.accounts.filter(
      (item) => item.id === parseInt(this.accountId)
    )[0]
    console.log(this.form.selectedAccount)

    this.form1.email = this.form.selectedAccount.detalhes.email
    this.form1.name = this.form.selectedAccount.detalhes.name
    this.form1.phone = this.form.selectedAccount.detalhes.phone
    this.form1.dt_birth = this.form.selectedAccount.detalhes.dt_birth

    this.form1.min_pix_in = parseFloat(this.form.selectedAccount.detalhes.min_pix_in)
    this.form1.max_pix_out = parseFloat(this.form.selectedAccount.detalhes.max_pix_out)
    this.form1.tax_pix_out = parseFloat(this.form.selectedAccount.detalhes.tax_pix_out)
    this.form1.min_boleto_in = parseFloat(this.form.selectedAccount.detalhes.min_boleto_in)

    console.log(this.form1)
    const _selectedAccountPermissions = this.form.selectedAccount.permissions.map((item) => {
      if (item.status) {
        return item.id
      }
    })

    this.form.permissions = _selectedAccountPermissions

    this.form.permissionsCache = _selectedAccountPermissions
  },

  methods: {
    submit() {
      this.load = true
      Toast.run('warning', 'Em desenvolvimento')
      this.load = false

      return
      // this.load1 = true
      // const data = {
      //   email: this.form1.email,
      //   name: this.form1.name,
      //   phone: this.form1.phone ? this.form1.phone.replace(/[^\d]/g, '') : '',
      //   dt_birth: this.form1.dt_birth ? this.form1.dt_birth.replace(/[^\d]/g, '') : ''
      // }

      // const systemService = new SystemService()
      // systemService
      //   .editSubAccountInfo(data)
      //   .then((response) => {
      //     console.log(response)
      //     Toast.run('success', response.data.message || 'Informações editadas com sucesso!')
      //     this.edition = false
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     Toast.run(
      //       'error',
      //       error.response.data.message ||
      //         error.response.data.error ||
      //         'Houve um error, tente novamente mais tarde'
      //     )
      //   })
      //   .finally(() => {
      //     this.load = false
      //   })
    },
    checkPermissionDifferences() {
      this.load = true

      const removedItems = this.form.permissionsCache.filter(
        (item) => !this.form.permissions.includes(item)
      )

      const addedItems = this.form.permissions.filter(
        (item) => !this.form.permissionsCache.includes(item)
      )

      const systemService = new SystemService()

      const addPermissions = async (idUser, idPermission) => {
        const data = {
          idUser,
          idPermission
        }
        systemService
          .addPermissionToAccount(data)
          .then((response) => {
            console.log(response)
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

      const removePermission = async (idUser, idPermission) => {
        const data = {
          idUser,
          idPermission
        }
        systemService
          .removePermissionFromAccount(data)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
            console.log(error.response.data.message)
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

      if (removedItems.length === 0 && addedItems.length === 0) {
        Toast.run('error', 'Não há nada para ser alterado')
      }

      if (removedItems.length > 0) {
        removedItems.forEach((item) => {
          removePermission(this.accountId, item)
        })
      }

      if (addedItems.length > 0) {
        addedItems.forEach((item) => {
          addPermissions(this.accountId, item)
        })
      }
    },

    getSystemPermissions() {
      const systemService = new SystemService()
      systemService
        .listPermissions()
        .then((response) => {
          this.permissions = response.data.permission
          this.profiles = response.data.profile
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
