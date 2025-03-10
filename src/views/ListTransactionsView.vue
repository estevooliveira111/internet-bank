<template>
  <PageHeader name="Transações" :links="[
    { name: 'Dashboard', routerName: 'dashboard' },
    { name: 'Transações', routerName: 'extract' },
  ]">

    <template #actions>
      <Button severity="secondary" :loading="loading" label="Filtro" icon="pi pi-filter" @click="visible = true" />
    </template>

  </PageHeader>

  <Drawer v-if="transactionsTypes && transactions" v-model:visible="visible" class="w-full lg:!w-[30rem]"
    header="Filtro:" position="right" :style="{ width: '50rem' }" modal pt:root:class="!border-0 bg-white"
    pt:mask:class="backdrop-blur-sm">

    <div class="grid grid-cols-2 gap-2 mt-2">

      <div>
        <label>Data Inicio</label>
        <DatePicker dateFormat="dd/mm/yy" v-model="paginator.fromDate" :maxDate="today" type="date" class="w-full" />
      </div>

      <div>
        <label>Data Fim</label>
        <DatePicker dateFormat="dd/mm/yy" v-model="paginator.endDate" :maxDate="today" type="date" class="w-full" />
      </div>

    </div>

    <div class="mt-4">
      <label>Tipo de Transação</label>
      <MultiSelect v-model="paginator.type" optionLabel="name" :options="transactionsTypes" class="w-full" />
    </div>

    <div class="mt-4">
      <label>Qtd. por página</label>
      <Select v-model="paginator.per_page" :options="[
        { label: 25, value: 25 },
        { label: 30, value: 30 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
        { label: 500, value: 500 }
      ]" optionLabel="label" optionValue="value" class="w-full" />
    </div>

    <!-- {{ transactionsTypes }} -->

    <template #footer>
      <div class="flex items-center gap-2 justify-between">
        <Button @click="resetFilters" label="Limpar Filtros" icon="pi pi-sign-out" class="flex-auto" severity="danger"
          text />
        <Button @click="fetchTransactions" label="Pesquisar" :loading="loading" icon="pi pi-search" class="flex-auto"
          outlined severity="success" />
      </div>
    </template>

  </Drawer>

  <header>
    <InputGroup>
      <InputText  @keyup.enter="fetchTransactions" placeholder="Pesquisa pelo Nome, CPF, TxID, ToEndID" v-model="paginator.search" />
      <InputGroupAddon>
        <Button icon="pi pi-search" :loading="loading" class="bg-secondary-content text-white border-0" variant="text" @click="fetchTransactions" />
      </InputGroupAddon>
    </InputGroup>
  </header>

  <Card class="mt-5">

    <template #content>
      <DataTable scrollable :loading="loading" :value="transactions?.data" responsiveLayout="scroll" :rows="transactions.per_page" :totalRecords="transactions.total" :first="transactions.current_page">

        <Column field="id" header="#" />
        <Column field="description" header="Descrição/Detalhes" sortable>
          <template #body="slotProps">
            <div v-if="slotProps.data?.details?.pagador?.nome || slotProps.data?.details?.pagador?.documento">
              <div v-if="slotProps.data?.details?.pagador?.nome" class="font-semibold text-gray-800">{{ slotProps.data?.details?.pagador?.nome }}</div>
              <div v-if="slotProps.data?.details?.pagador?.documento" class="text-sm text-gray-500">{{ $formatDocument(slotProps.data?.details?.pagador?.documento) }}</div>
            </div>
          </template>
        </Column>
        <Column field="type.name" header="Tipo" sortable></Column>

        <Column field="value" header="Valor" sortable>
          <template #body="slotProps">
            <span class="font-bold" :class="{
              'text-red-500': slotProps.data.value <= 0,
              'text-green-500': slotProps.data.value > 0,
            }">{{ $amount(slotProps.data.value) }}</span>
          </template>
        </Column>

        <Column field="balance" header="Saldo" sortable>
          <template #body="slotProps">
            <span class="font-bold text-sm">
              {{ $amount(slotProps.data.balance) }}
            </span>
          </template>
        </Column>

        <Column field="created_at" header="Data" sortable>
          <template #body="slotProps">
            {{ $moment(slotProps.data.created_at).format('DD/MM/yyyy hh:mm:ss') }}
          </template>
        </Column>


        <Column sortable>
          <template #body="slotProps">
            <ModalTransactionDetailSicredi :transaction="slotProps.data" :buttonMessage="'Ver detalhes'" />
          </template>
        </Column>


        <template #empty>
          <p class="text-center p-5">Nenhuma transação encontrada.</p>
        </template>

      </DataTable>
    </template>

    <template #footer>
      <div class="flex justify-between items-center" v-if="transactions">
        <span>
          Mostrando <strong>{{ transactions.from }}</strong> a
          <strong>{{ transactions?.to }}</strong> de
          <strong>{{ transactions?.total }}</strong> registros.
        </span>
        <Paginator :first="transactions.from" :rows="transactions.per_page" :totalRecords="transactions?.total" @page="fetchTransactions" />
      </div>
    </template>

  </Card>
</template>

<script setup>
import ModalTransactionDetailSicredi from '@/components/ModalTransactionDetailSicredi.vue'
import PageHeader from '@/components/PageHeader.vue';
import { ref } from 'vue';

import {
  DataTable,
  Column,
  Card, DatePicker, Select, Button, Paginator, Drawer, MultiSelect, InputText, InputGroup, InputGroupAddon
} from 'primevue';

import FinancialService from '@/services/FinancialService';
import moment from 'moment';

const visible = ref(false);
const loading = ref(false);
const transactions = ref({ data: [], total: 0 });
const transactionsTypes = ref(false);
const today = new Date();

const paginator = ref({
  page: 1,
  per_page: 25,
  search: '',
  fromDate: new Date(today.getFullYear(), 0, 1),
  endDate: new Date(today),
  type: '',
});

function fetchTransactions(i = undefined) {
  loading.value = true;

  Object.keys(paginator.value).forEach(key => {
    if (paginator.value[key] === null || paginator.value[key] === '') {
      delete paginator.value[key];
    }
  });

  if (i && i.page) {
    console.log(i);
    paginator.value.page = i.page + 1;
  }

  let paramers = {
    ...paginator.value,
  };

  if (paginator.value.startDate && paramers.fromDate) {
    paramers.fromDate = moment(paginator.value.startDate).format('YYYY-MM-DD');
  }

  if (paginator.value.endDate && paramers.endDate) {
    paramers.endDate = moment(paginator.value.endDate).format('YYYY-MM-DD');
  }

  new FinancialService().getTransactions(paramers)
    .then(({ data }) => {
      console.log(data);
      transactions.value = data;
    })
    .finally(() => {
      visible.value = false;
      loading.value = false;
    })
}

function resetFilters() { }

function getTransactionsTypes() {
  loading.value = true;
  new FinancialService().getTransactionsTypes()
    .then(({ data }) => {
      transactionsTypes.value = data
    })
    .finally(() => loading.value = false)
}

fetchTransactions();
getTransactionsTypes()
</script>