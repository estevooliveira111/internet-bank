<template>
  <div>
    <div class="md:grid md:grid-cols-6 gap-4">
      <InternalNav class="col-span-2" />

      <section class="mt-5 md:mt-0 col-span-4">
        <div class="bg-white shadow rounded p-5 md:p-10 h-auto">

          <div class="flex justify-between">
            <div>
              <h1 class="font-bold text-2xl mb-2">Gestão de Funcionários</h1>
              <p class="text-sm text-gray-600">
                Esta seção permite que você veja as informações sua conta.
              </p>
            </div>

            <button class="btn" onclick="new_user.showModal()">Novo Usuário</button>
          </div>

          <!-- TABLE -->
          <div class="relative overflow-x-auto mt-10">
            <table class="w-full text-left rtl:text-right text-gray-500" id="table">

              <thead class="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">#</th>
                  <th scope="col" class="px-6 py-3">Nome</th>
                  <th scope="col" class="px-6 py-3">Cargo</th>
                  <th scope="col" class="px-6 py-3">CPF</th>
                  <th scope="col" class="px-6 py-3 text-center">Email</th>
                  <th scope="col" class="px-6 py-3 text-center">Contato</th>
                  <th scope="col" class="px-6 py-3 text-center"></th>
                </tr>
              </thead>

              <tbody v-if="!load && account && account.data">

                <tr class="bg-white border-b" v-for="(user, index) in account.data" :key="index">
                  <td class="px-6 py-4">{{ user.id || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.name || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.role || 'N/A' }}</td>
                  <!-- <td class="px-6 py-4 whitespace-nowrap">{{ user.permissions || 'N/A' }}</td> -->
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.document || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.email || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ user.phone || 'N/A' }}</td>

                  <td class="px-6 py-4 text-center whitespace-nowrap">
                    <button @click="deleteUser(user.appId)"
                      class="bg-red-600 rounded px-4 py-2 font-medium text-white hover:cursor-pointer">Apagar</button>
                  </td>

                </tr>
              </tbody>

              <tbody v-if="!load && accountStore.accounts && accountStore.accounts.length === 0"
                class="border-separate border-spacing-2">
                <tr class="bg-white border-b">
                  <td class="p-6"></td>
                  <td class="p-6">
                    <span class="whitespace-nowrap">Nenhum registro encontrado</span>
                  </td>
                </tr>
              </tbody>

              <tbody v-if="load" class="border-separate border-spacing-2">
                <tr v-for="index in parseInt(form.itemsPerPage) || 10" :key="index" class="bg-red border-b">
                  <td class="p-4">
                    <span class="skeleton w-full bg-gray-200 h-5 flex"></span>
                  </td>
                  <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                  <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                  <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                  <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                  <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                  <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


    </div>
  </div>


  <dialog id="new_user" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg">Novo Usuário</h3>

      <form autocomplete="off" @submit.prevent="createUser">
        <label class="mt-3 form-control w-full">
          <div class="label">
            <span class="text-base font-normal capitalize">Nome<span class="text-red-600">*</span></span>
          </div>
          <GeneralInput v-model="form.name" :isRequired="true" id="name" type="text" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="text-base font-normal capitalize">Email<span class="text-red-600">*</span></span>
          </div>
          <GeneralInput v-model="form.email" :isRequired="true" id="email" type="text" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="text-base font-normal capitalize">CPF/CNPJ<span class="text-red-600">*</span></span>
          </div>
          <GeneralInput v-model="form.document" placeholder="CPF/CNPJ" id="document"
            v-mask="['###.###.###-##', '##.###.###/####-##']" :isRequired="true" type="text" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="text-base font-normal capitalize">Contato<span class="text-red-600">*</span></span>
          </div>
          <GeneralInput v-model="form.phone" :isRequired="true" v-mask="['(##)# ####-####']" id="phone" type="text" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="text-base font-normal capitalize">Senha para Acesso<span class="text-red-600">*</span></span>
          </div>
          <PasswordInput v-model="form.password" placeholder="Digite sua senha" id="password" :isRequired="true" />
        </label>

        <label v-if="roles" class="form-control w-full">
          <div class="label">
            <span class="text-base font-normal capitalize">Cargo<span class="text-red-600">*</span></span>
          </div>
          <select v-model="form.role" class="select select-bordered w-full">
            <option disabled selected>Selecione o Cargo?</option>
            <template v-for="(role, index) in roles" :key="index">
              <option :value="role.id">{{ role.name }}</option>
            </template>
          </select>
        </label>

        <span v-if="formErrors.role" class="mt-5 text-red-500 text-sm">
          {{ formErrors.role.join(', ') }}
        </span>

        <GeneralButton text="Salvar Usuário" :load="load" class="mt-3 w-full" />

      </form>

    </div>
  </dialog>


</template>

<script>
import InternalNav from '@/components/InternalNavCopy.vue';
import { UserStore } from '@/stores/UserStore';
import GeneralInput from '../components/GeneralInput.vue'
import PasswordInput from '../components/PasswordInput.vue'
import Account from '@/services/Account'
import GeneralButton from '../components/GeneralButton.vue'
import Roles from '@/services/Roles';
import Toast from '@/boot/Toast'

export default {

  components: {
    InternalNav, GeneralInput, PasswordInput, GeneralButton
  },

  setup() {
    const accountStore = UserStore()
    return {
      accountStore
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        document: '',
        phone: '',
        password: '',
        role: ''
      },
      load: false,
      edition: false,
      formErrors: {},

      account: null,
      roles: []
    }
  },

  created() {
    new Account().users()
      .then((response) => {
        console.log(response);
        this.account = response.data;
      })

    new Roles().roles_all()
      .then(({ data }) => {
        this.roles = data.data;
      })
  },

  // antonialaviniapeixoto@casabellavidros.com.br
  // estevoonascimento1@icloud.com

  methods: {

    createUser() {
      this.load = true;

      console.log('Dados do formulário:', this.form);
      new Account().newUser(this.form).then((response) => {
        new Account().users()
          .then((response) => {
            console.log(response);
            this.account = response.data;
          })
        document.querySelector("#new_user > div > form:nth-child(1) > button").click();
        Toast.run('success', response.data.message)
      })
        .catch((error) => {
          if (error.response && error.response.data) {
            let errorMessage = '';

            if (error.response.data.details) {
              for (const field in error.response.data.details) {
                const fieldErrors = error.response.data.details[field];
                fieldErrors.forEach(msg => {
                  if (!this.formErrors[field]) {
                    this.formErrors[field] = [];
                  }
                  this.formErrors[field].push(msg);
                  errorMessage += `${msg}\n`;
                });
              }
            }

            Toast.run('error', errorMessage.trim() || 'Houve um erro, tente novamente mais tarde.');
          }

        })

        .finally(() => this.load = false)

    },

    deleteUser(appId) {
      new Account().delete_user(appId)
        .then((response) => {
          Toast.run('success', response.data.message)
          new Account().account(this.accountStore.mainAccount.id)
            .then((response) => {
              this.account = response.data;
            })
        })
        .catch((error) => {
          Toast.run(
            'error',
            error.response.data.message ||
            error.response.data.error ||
            'Houve um erro, tente novamente mais tarde'
          )
        })
        .finally(() => this.load = false)

    }

  }

}
</script>
