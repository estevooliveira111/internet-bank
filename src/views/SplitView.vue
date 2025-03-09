<template>
  <main class="w-full h-full rounded-lg border bg-white text-card-foreground shadow-sm" data-v0-t="card">
    <header class="flex flex-col space-y-4 p-6">
      <div class="flex justify-between">
        <h3 class="text-2xl font-semibold leading-tight tracking-tight">Configuração de Splits (Tags)</h3>
        <div class="flex">
          <n-button :strong="true" size="large" @click="() => router.push({ name: 'settings-split-new' })"
            v-if="!hasPermission('TAG_CRIAR')" class="mt-1 w-full bg-primary text-white">
            Criar Nova Tag
          </n-button>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">
        O split de pagamentos é um recurso utilizado para dividir um valor total de uma transação entre
        diferentes contas de forma automática.
        Esse recurso é especialmente útil em situações onde o pagamento precisa ser distribuído entre várias
        partes envolvidas, como sócios, parceiros,
        fornecedores, entre outros. A seguir, explicamos como o split de pagamentos funciona e suas principais
        características.
      </p>

      <!-- Campo de Pesquisa Adicionado -->
      <div class="flex items-center space-x-2">
        <input v-model="searchTerm" type="text" placeholder="Pesquisar por nome ou código..."
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        <n-button @click="fetchTags(1)" class="bg-primary text-white">
          Buscar
        </n-button>
      </div>
    </header>

    <div v-if="dataPayments && dataPayments.data && !load"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      <div v-for="payment in dataPayments.data" :key="payment.id"
        class="max-w-sm p-4 border border-gray-300 rounded-xl shadow-sm bg-white flex flex-col h-full">
        <div class="flex justify-between">
          <h1 class="font-bold text-xl">{{ payment.name }}</h1>
        </div>
        <p class="text-gray-700 text-xs">Criado Em: {{ new Date(payment.created_at).toLocaleString() }}</p>
        <p class="text-gray-900 text-xs mb-2">{{ payment.code }}</p>
        <p v-if="payment.webhook && false" class="text-gray-700 text-base mb-2">Webhook: {{ payment.webhook }}</p>
        <div v-if="Array.isArray(payment.split)">
          <h3 class="text-lg font-semibold mb-2">Divisões:</h3>
          <ul class="list-disc list-inside">
            <div v-if="payment.split.length > 0">
              <li class="mt-1" v-for="(split, index) in payment.split" :key="index">
                Conta: <span class="rounded-xl bg-gray-200 p-1">{{ split.account_name ?? split.account }}</span> - {{
                  split.percentage }}</li>
            </div>
            <div v-else>
              Nenhum Split
            </div>
          </ul>
        </div>


        <div class="mt-auto flex w-full">
          <router-link :to="{ name: 'settings-split-info', params: { code: payment.code } }" class="w-1/2 m-1">
            <n-button size="small" class="w-full py-2 px-4" type="primary">
              Editar
            </n-button>
          </router-link>

          <n-popconfirm v-if="!hasPermission('TAG_DELETE')" @positive-click="deleteTag(payment)">
            <template #trigger>
              <n-button :loading="loadDelete" size="small" class="w-1/2 m-1" type="error">
                Apagar
              </n-button>
            </template>
            Tem certeza? Não é possível recuperar.
          </n-popconfirm>
        </div>


      </div>
    </div>

    <div v-else class="text-center py-6">
      <span class="loading loading-dots loading-lg"></span>
    </div>

    <div v-if="!load && dataPayments" class="flex justify-center p-6 items-center">
      <TailwindPagination :limit="1" v-if="!load && dataPayments" :data="dataPayments"
        @pagination-change-page="fetchTags" />
    </div>
  </main>
</template>

<script>
import { Icon } from '@iconify/vue'
import Toast from '@/boot/Toast';
import { hasPermission } from '@/mixins/permissions';
import router from '@/router';
import TagService from '@/services/TagService';
import { TailwindPagination } from 'laravel-vue-pagination';
import { debounce } from 'lodash'; // Importando debounce para otimizar a busca

export default {
  setup() {
    return {
      router,
      Icon
    }
  },
  components: {
    TailwindPagination
  },
  data() {
    return {
      load: true,
      loadDelete: false,
      dataPayments: {},
      searchTerm: '',
    };
  },

  created() {
    this.fetchTags();
  },

  watch: {
    searchTerm: debounce(function (newTerm) {
      this.fetchTags(1, newTerm);
    }, 500)
  },

  methods: {

    async fetchTags(page = 1, search = null) {
      this.load = true;
      try {
        const { data } = await new TagService().listTags(page, search);
        console.log(data);
        this.dataPayments = data;
      } catch (error) {
        console.log(error);
      } finally {
        this.load = false;
      }
    },

    async deleteTag(payment) {
      this.loadDelete = true;
      try {
        console.log(payment);
        const dataDelete = await new TagService().deleteTag(payment.code);
        console.log(dataDelete);
        await this.fetchTags(this.currentPage, this.searchTerm); // Atualiza a lista após deletar
        Toast.run('success', 'Apagado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar tag:', error);
        Toast.run('error', error.response?.data?.message || error.response?.data?.error || 'Houve um erro, tente novamente mais tarde');
      } finally {
        this.loadDelete = false;
      }
    },

    hasPermission
  }
};
</script>
