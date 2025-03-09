<template>
  <div>
    <div>
      <section class="bg-white shadow rounded p-5 md:p-10 h-auto">
        <!-- HEADER -->
        <div class="mb-10 md:mb-5">
          <div class="flex justify-between items-start flex-wrap mb-5 md:mb-0">
            <h1 class="font-bold text-2xl mb-2">Últimos Recebimentos</h1>
            <button @click="exportTableToCSV" class="btn" v-if="!load && transactions && transactions.data.length > 0">
              Exportar para CSV
            </button>
          </div>
          <p class="text-sm text-gray-600">
            Esta seção permite a visualização dos seus últimos recebimentos.
          </p>
        </div>
        <!-- END HEADER -->

        <!-- TABLE -->
        <div class="relative overflow-x-auto mt-10">
          <table class="w-full text-left rtl:text-right text-gray-500" id="table">

            <thead class="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">#</th>
                <th scope="col" class="px-6 py-3">Descrição</th>
                <th scope="col" class="px-6 py-3 text-center">Tipo</th>
                <th scope="col" class="px-6 py-3 text-center">Valor</th>
                <th scope="col" class="px-6 py-3 text-center">Data</th>
                <th scope="col" class="px-6 py-3 text-center"></th>
              </tr>
            </thead>

            <tbody v-if="!load && transactions && transactions.data.length > 0">
              <tr class="bg-white border-b" v-for="(transaction, index) in transactions.data" :key="index">
                <td class="px-6 py-4">{{ transaction.id }}</td>

                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ transaction?.details?.pagador?.nome }} ||
                  {{ transaction?.details?.pagador?.documento }}
                </td>

                <td class="px-6 py-4 text-center whitespace-nowrap">{{ transaction.type.name }}</td>
                <!-- NOTE: I'm using parseFloat because the numbers are coming as "1.00" or "2.00" -->
                <td class="px-6 py-4 text-center whitespace-nowrap">
                  {{ FormatMonetaryValue(parseFloat(transaction.value)) }}
                </td>

                <td class="px-6 py-4 text-center whitespace-nowrap">
                  {{ $moment(transaction.created_at).format('DD/MM/YYYY') }} |
                  {{ $moment(transaction.created_at).format('HH:mm:ss') }}
                </td>
                <td class="px-6 py-4 text-center whitespace-nowrap">
                  <button @click="showAditionalInformation(transaction)" class="btn-base">Ver detalhes</button>
                </td>
              </tr>
            </tbody>

            <tbody v-if="!load && transactions && transactions.data.length === 0"
              class="border-separate border-spacing-2">
              <tr class="bg-white border-b">
                <td class="p-6"></td>
                <td class="p-6">
                  <span class="whitespace-nowrap">Nenhum registro encontrado</span>
                </td>
              </tr>
            </tbody>

            <tbody v-if="load" class="border-separate border-spacing-2">
              <tr v-for="index in parseInt(form.itemsPerPage)" :key="index" class="bg-red border-b">
                <td class="p-4">
                  <span class="skeleton w-full bg-gray-200 h-5 flex"></span>
                </td>
                <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
                <td class="p-6"><span class="skeleton w-full bg-gray-200 h-5 flex"></span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- END TABLE -->

        <!-- PAGINATION -->
        <DynamicPagination :itemsToPaginate="transactions" @changePage="changeTransactionsPage" />

        <!-- END PAGINATION -->
      </section>
    </div>
  </div>

  <dialog id="transaction_information" ref="transaction_information" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">

      <div class="flex justify-between items-start flex-wrap mb-5 md:mb-0 gap-2">
        <h3 class="font-bold text-lg">Detalhes da Transação</h3>
      </div>

      <hr>

      <div>
        <ul class="flex flex-col gap-2 mt-8">
          <li v-if="selectedTransaction && selectedTransaction.endtoendid">
            id: <span class="font-bold">{{ selectedTransaction.endtoendid }}</span>
          </li>

          <li v-if="selectedTransaction && selectedTransaction.type" class="mt-4">
            Tipo: <span class="font-bold">{{ selectedTransaction.type.name }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.description">
            Descrição: <span class="font-bold">{{ selectedTransaction.description }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.created_at">
            Data:
            <!-- <span class="font-bold">{{
              moment(selectedTransaction.created_at).format('DD/MM/YYYY')
            }}</span> -->
          </li>
          <li v-if="selectedTransaction && selectedTransaction.created_at">
            Hora:
            <!-- <span class="font-bold">{{
              moment(selectedTransaction.created_at).format('HH:mm:ss')
            }}</span> -->
          </li>

          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.pagador
          " class="mt-4 font-bold">
            Pagador
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.pagador &&
            selectedTransaction.details.pagador.nome
          ">
            Nome:
            <span class="font-bold">{{ selectedTransaction.details.pagador.nome }}</span>
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.pagador &&
            selectedTransaction.details.pagador.conta
          ">
            Conta:
            <span class="font-bold">{{ selectedTransaction.details.pagador.conta }}</span>
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.pagador &&
            selectedTransaction.details.pagador.agency
          ">
            Agência:
            <span class="font-bold">{{ selectedTransaction.details.pagador.agency }}</span>
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.pagador &&
            selectedTransaction.details.pagador.documento
          ">
            Documento:
            <span class="font-bold">{{ selectedTransaction.details.pagador.documento }}</span>
          </li>

          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.recebedor
          " class="mt-4 font-bold">
            Recebedor
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.recebedor &&
            selectedTransaction.details.recebedor.nome
          ">
            Nome:
            <span class="font-bold">{{ selectedTransaction.details.recebedor.nome }}</span>
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.recebedor &&
            selectedTransaction.details.recebedor.conta
          ">
            Conta:
            <span class="font-bold">{{ selectedTransaction.details.recebedor.conta }}</span>
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.recebedor &&
            selectedTransaction.details.recebedor.agencia
          ">
            Agência:
            <span class="font-bold">{{ selectedTransaction.details.recebedor.agencia }}</span>
          </li>
          <li v-if="
            selectedTransaction &&
            selectedTransaction.details &&
            selectedTransaction.details.recebedor &&
            selectedTransaction.details.recebedor.documento
          ">
            Documento:
            <span class="font-bold">{{ selectedTransaction.details.recebedor.documento }}</span>
          </li>

          <li v-if="selectedTransaction && selectedTransaction.value" class="mt-8">
            Valor:
            <span class="font-bold">{{
              FormatMonetaryValue(parseFloat(selectedTransaction.value))
              }}</span>
          </li>
        </ul>
      </div>
      <div class="modal-action">
        <form method="dialog" class="flex gap-4">
          <button v-if="selectedTransaction.details" @click="exportAsPdfData"
            class="flex items-center gap-2 hover:text-primary" title="Baixar">
            <Icon icon="material-symbols:download" class="w-6 h-6" />
            <p class="text">Baixar</p>
          </button>
          <button class="btn">Fechar</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import { useBalanceStore } from '@/stores/BalanceStore'
import FinancialService from '../services/FinancialService'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import DynamicPagination from '../components/DynamicPagination.vue'
import { Icon } from '@iconify/vue'

export default {

  components: { DynamicPagination, Icon },

  setup() {
    const balanceStore = useBalanceStore()

    balanceStore.setBalance();
   

    return {
      // moment,
      FormatMonetaryValue
    }
  },

  data() {
    return {
      transactions: false,
      selectedTransaction: {},
      transactionsTypes: false,
      load: false,
      form: {
        fromDate: '',
        toDate: '',
        search: '',
        filters: [1],
        itemsPerPage: 10
      }
    }
  },

  created() {
    this.getTransactions() // Initial fetch
  },

  unmounted() {
    clearInterval(this.fetchInterval)
  },

  watch: {
    'form.itemsPerPage': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getTransactions()
      }
    }
  },

  methods: {

    showAditionalInformation(transaction) {
      this.selectedTransaction = transaction
      if (typeof this.selectedTransaction.details === 'string')
        this.selectedTransaction.details = JSON.parse(this.selectedTransaction.details)

      console.log(this.selectedTransaction)
      this.$refs.transaction_information.showModal()
    },

    getTransactions() {
      // This condition ensures that the skeleton animation is not displayed if the transaction already contains data
      if (!this.transactions)
        this.load = true
      const financialService = new FinancialService()
      financialService
        .getTransactions(null, this.form)
        .then((response) => {
          if (response.data) this.transactions = response.data
        })
        .catch(() => {
          this.transactions = {
            data: []
          }
        })
        .finally(() => (this.load = false))
    },

    async changeTransactionsPage(url) {
      this.load = true
      //   this.currentTransactionPage = label
      const financialService = new FinancialService()
      await financialService
        .getTransactions(url, this.form)
        .then((response) => {
          this.transactions = response.data
        })
        .catch(() => {
          this.transactions = {
            data: []
          }
        })
        .finally(() => {
          this.load = false
        })
    }

  }
}
</script>
