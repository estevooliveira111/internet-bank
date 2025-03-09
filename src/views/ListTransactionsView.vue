<template>
  <div>
    <div>
      <section class="bg-white shadow rounded p-5 md:p-10 h-auto">
        <!-- HEADER -->
        <div class="mb-10 md:mb-5">
          <div class="flex justify-between items-start flex-wrap mb-5 md:mb-0">
            <h1 class="font-bold text-2xl mb-2">Transações</h1>
            <!-- <button @click="exportTableToCSV" class="btn" v-if="!load && transactions && transactions.data.length > 0">
              Exportar para CSV
            </button> -->
          </div>
          <p class="text-sm text-gray-600">Esta seção permite a visualização das suas transações.</p>
        </div>
        <!-- END HEADER -->

        <!-- FILTERS -->
        <form class="space-y-5">
          <div class="flex gap-2">
            <!-- SEARCH INPUT -->
            <label class="relative w-full">
              <div class="absolute left-3 inset-y-0 flex items-center pr-3" @click="TogglePasswordVisibility">
                <Icon icon="tabler:search" class="text-zinc-500 w-5 h-5" />
              </div>
              <input v-model="form.search" required id="search" type="search" placeholder="Pesquisar CPF/CNPJ/TxId/Nome"
                class="border-gray-100 focus:border-gray-400 focus:outline-gray-600 input input-bordered bg-gray-100 text-black w-full pl-10" />
            </label>
            <!-- END SEARCH INPUT -->
            <GeneralButton @click="getTransactions" :load="load" text="Buscar" />
          </div>

          <div class="flex flex-wrap justify-between gap-5">
            <div class="flex gap-4 flex-wrap w-full md:w-auto md:flex-nowrap">
              <!-- FROM DATE -->
              <label class="form-control w-full md:max-w-64">
                <div class="label">
                  <span class="label-text">Do dia</span>
                </div>
                <GeneralInput v-model="form.fromDate" type="date" :isRequired="false" id="fromDate" />
              </label>
              <!-- END FROM DATE -->

              <!-- TO DATE -->
              <label class="form-control w-full md:max-w-64">
                <div class="label">
                  <span class="label-text">Até o dia</span>
                </div>
                <GeneralInput v-model="form.toDate" type="date" :isRequired="false" id="toDate" />
              </label>
              <!-- END TO DATE -->
            </div>
            <label class="form-control w-full md:max-w-32">
              <div class="label">
                <span class="label-text">Itens por página</span>
              </div>
              <select v-model="form.itemsPerPage"
                class="select border-gray-100 focus:border-gray-400 focus:outline-primary input input-bordered bg-gray-100 text-black w-full">
                <option disabled selected>Items per page</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </label>
          </div>

          <div>
            <h3 class="text-sm mb-2">Tipos de extrato</h3>
            <div v-if="transactionsTypes" class="flex gap-6 flex-wrap whitespace-nowrap">
              <label class="flex items-center gap-1" v-for="type in transactionsTypes" :key="type.id">
                <input type="checkbox" :value="type.id" class="rounded accent-primary w-4 h-4" v-model="form.filters" />
                <span>{{ type.name }}</span>
              </label>
            </div>

            <div v-else class="flex gap-6 flex-wrap whitespace-nowrap">
              <label class="flex items-center gap-1 bg-gray-200 skeleton h-5 w-20"> </label>
              <label class="flex items-center gap-1 bg-gray-200 skeleton h-5 w-20"> </label>

              <label class="flex items-center gap-1 bg-gray-200 skeleton h-5 w-20"> </label>

              <label class="flex items-center gap-1 bg-gray-200 skeleton h-5 w-20"> </label>

              <label class="flex items-center gap-1 bg-gray-200 skeleton h-5 w-20"> </label>

              <label class="flex items-center gap-1 bg-gray-200 skeleton h-5 w-20"> </label>
            </div>
          </div>
        </form>
        <!-- END FILTERS -->

        <!-- TABLE -->
        <div class="relative overflow-x-auto mt-10">
          <table class="w-full text-left rtl:text-right text-gray-500" id="table">
            <thead class="text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">#</th>
                <th scope="col" class="px-6 py-3">Descrição</th>
                <th scope="col" class="px-6 py-3 text-center">Tipo</th>
                <th scope="col" class="px-6 py-3 text-center">Valor</th>
                <th scope="col" class="px-6 py-3 text-center">Saldo</th>
                <th scope="col" class="px-6 py-3 text-center">Data</th>
                <th scope="col" class="px-6 py-3 text-center"></th>
              </tr>
            </thead>

            <tbody v-if="!load && transactions && transactions.data.length > 0">
              <tr class="bg-white border-b" v-for="(transaction, index) in transactions.data" :key="index">





                <td class="px-6 py-4">{{ transaction.id }}</td>

                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  
                  <template v-if="![13, 12, 9].includes(transaction.type_id)">
                    <span v-if="transaction?.type?.id == 7 && transaction?.details?.pagador">
                    {{ transaction.details?.pagador?.nome }} ||
                    {{ transaction.details?.type?.name }}
                  </span>
                  <span v-else-if="transaction.details && transaction.details.pagador">
                    {{ transaction.details.pagador.nome }} ||
                    {{ transaction.details.pagador.document ?? transaction.details.pagador.documento }}
                  </span>

                  <span v-else-if="transaction?.details && transaction?.details?.nomeBeneficiario">
                    {{ transaction?.details?.nomeBeneficiario }} ||
                    {{ transaction?.details?.documentoBeneficiario }}
                  </span>

                  <span v-else-if="transaction?.details?.conta?.name">
                    {{ transaction?.details?.conta?.name }}
                  </span>


                  <span v-else-if="transaction?.json && transaction?.type?.id == 6 || transaction?.type?.id == 11">
                    {{ transaction?.json?.pagador?.nome }} ||
                    {{ transaction?.json?.pagador?.document ?? transaction?.json?.pagador?.documento  }}
                  </span>

                  <span v-else>
                    {{(transaction?.description)}}
                  </span>
                  </template>

                </td>

                <td class="px-6 py-4 text-center whitespace-nowrap">{{ transaction?.type?.name }}</td>
                <!-- NOTE: I'm using parseFloat because the numbers are coming as "1.00" or "2.00" -->
                <td class="px-6 py-4 text-center whitespace-nowrap">
                  <span :class="{
                    'bg-red-500/35 px-4  rounded-md py-2 font-bold text-red-500': parseFloat(transaction.value) < 0,
                    'bg-green-500/25 px-4  rounded-md py-2 font-bold text-green-500': parseFloat(transaction.value) > 0
                  }">
                    {{ FormatMonetaryValue(parseFloat(transaction.value)) }}
                  </span>
                </td>

                <td class="px-6 py-4 text-center whitespace-nowrap">
                  <span :class="{
                    'bg-red-500/35 px-4  rounded-md py-2 font-bold text-red-500': parseFloat(transaction.balance) < 0,
                    'bg-green-500/25 px-4  rounded-md py-2 font-bold text-green-500': parseFloat(transaction.balance) > 0,
                    'bg-gray-500/25 px-4  rounded-md py-2 font-bold text-gray-500': parseFloat(transaction.balance) == null
                  }">
                    {{ FormatMonetaryValue(parseFloat(transaction.balance)) }}
                  </span>
                </td>

                <td class="px-6 py-4 text-center whitespace-nowrap">
                  {{ moment(transaction.created_at).format('DD/MM/YYYY') }} |
                  {{ moment(transaction.created_at).format('HH:mm:ss') }}
                </td>
                <td class="px-6 py-4 text-center whitespace-nowrap">
                  <!-- <ModalTransactionDetails :transaction="transaction" :buttonMessage="'Ver detalhes'" /> -->
                  <ModalTransactionDetailSicredi :transaction="transaction" :buttonMessage="'Ver detalhes'" />
                </td>
              </tr>
            </tbody>

            <tbody v-if="!load && transactions && transactions.data.length === 0"
              class="border-separate border-spacing-2">
              <tr class="bg-white border-b">
                <td class="p-6"></td>
                <td class="p-6"></td>
                <td class="p-6">
                  <span class="whitespace-nowrap">Nenhum registro encontrado</span>
                </td>
              </tr>
            </tbody>

            <tbody v-if="load" class="border-separate border-spacing-2">
              <tr v-for="index in 5" :key="index" class="bg-red border-b">
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
        <!-- END TABLE -->

        <!-- PAGINATION -->
        <DynamicPagination :itemsToPaginate="transactions" @changePage="changeTransactionsPage" />

        <!-- END PAGINATION -->
      </section>
    </div>
  </div>

  <!-- NOTE: check the information and refactor  -->
  <dialog id="transaction_information" ref="transaction_information" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="flex justify-between items-start flex-wrap mb-5 md:mb-0 gap-2">
        <h3 class="font-bold text-lg">Detalhes da Transação:</h3>
      </div>

      <hr class="my-10 border-gray-500 border">

      <div>
        <ul class="flex flex-col gap-2 mt-8">
          <li v-if="selectedTransaction && selectedTransaction.endtoendid">
            id: <span class="font-bold">{{ selectedTransaction.endtoendid }}</span>
          </li>

          {{ selectedTransaction }}

          <li v-if="selectedTransaction && selectedTransaction.type" class="mt-4">
            Tipo: <span class="font-bold">{{ selectedTransaction.type.name }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.description">
            Descrição: <span class="font-bold">{{ selectedTransaction.description }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.created_at">
            Data:
            <span class="font-bold">{{
              moment(selectedTransaction.created_at).format('DD/MM/YYYY HH:mm:ss')
              }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.created_at">
            Hora:
            <span class="font-bold">{{
              moment(selectedTransaction.created_at).format('HH:mm:ss')
              }}</span>
          </li>

          <li v-if="selectedTransaction && selectedTransaction.details" class="mt-4 font-bold">
            Pagador
          </li>
          {{ selectedTransaction }}
          <li v-if="selectedTransaction && selectedTransaction.details">
            Nome:
            <span class="font-bold">{{ selectedTransaction.details.pagador.nome }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.details">
            Conta:
            <span class="font-bold">{{ selectedTransaction.details.pagador.conta }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.details">
            Agência:
            <span class="font-bold">{{ selectedTransaction.details.pagador.agency }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.details">
            Documento:
            <span class="font-bold">{{ selectedTransaction.details.pagador.documento }}</span>
          </li>

          <li v-if="selectedTransaction && selectedTransaction.details" class="mt-4 font-bold">
            Recebedor
          </li>
          <li v-if="selectedTransaction && selectedTransaction.details">
            Nome:
            <span class="font-bold">{{ selectedTransaction.details.recebedor.nome }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.details">
            Conta:
            <span class="font-bold">{{ selectedTransaction.details.recebedor.conta }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.details">
            Agência:
            <span class="font-bold">{{ selectedTransaction.details.recebedor.agency }}</span>
          </li>
          <li v-if="selectedTransaction && selectedTransaction.details">
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

      <hr class="my-10 border-gray-500 border">

      <div class="modal-action">
        <form method="dialog" class="flex gap-4">
          <!-- <button v-if="selectedTransaction.details" @click="exportAsPdfData"
            class="flex items-center gap-2 hover:text-primary" title="Baixar">
            <Icon icon="material-symbols:download" class="w-6 h-6" />
            <p class="text">Baixar</p>
          </button> -->
          <button class="btn">Fechar</button>
        </form>
      </div>
    </div>
  </dialog>

</template>
<script>
import { Icon } from '@iconify/vue'
import { useBalanceStore } from '@/stores/BalanceStore'
import GeneralInput from '@/components/GeneralInput.vue'
import GeneralButton from '@/components/GeneralButton.vue'
import FinancialService from '../services/FinancialService'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import DynamicPagination from '../components/DynamicPagination.vue'
import ModalTransactionDetails from '@/components/ModalTransactionDetails.vue'
import ModalTransactionDetailSicredi from '@/components/ModalTransactionDetailSicredi.vue'

import moment from 'moment'
export default {
  components: { GeneralInput, Icon, GeneralButton, DynamicPagination, ModalTransactionDetails, ModalTransactionDetailSicredi },
  setup() {
    return {
      moment,
      balance: useBalanceStore(),
      FormatMonetaryValue,
      financialService: new FinancialService()
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
        filters: [],
        itemsPerPage: 10
      }
    }
  },

  created() {
    this.getTransactions()
    this.getTransactionsTypes()
    this.balance.setBalance();
  },

  methods: {

    showAditionalInformation(transaction) {
      this.selectedTransaction = transaction
      if (typeof this.selectedTransaction.details === 'string')
        this.selectedTransaction.details = JSON.parse(this.selectedTransaction.details)

      this.$refs.transaction_information.showModal()

      console.log(transaction)
    },

    getTransactionsTypes() {
      this.load = true
      this.financialService.getTransactionsTypes()
        .then((response) => {
          this.transactionsTypes = response.data
        })
        .finally(() => this.load = false)
    },

    getTransactions() {
      this.load = true;

      this.financialService.getTransactions(null, this.form)
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
      this.financialService.getTransactions(url, this.form)
        .then(({ data }) => {
          this.transactions = data
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
