<template>
  <div>
    <div class="md:grid md:grid-cols-12 gap-4">

      <InternalNav class="col-span-3" />

      <section class="mt-5 md:mt-0 col-span-9">

        <div class="rounded-lg border bg-white text-card-foreground shadow-sm w-full " data-v0-t="card">

          <div class="flex flex-col space-y-1.5 p-6 bg-slate-100/50 px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="whitespace-nowrap tracking-tight font-medium text-2xl">Dados da Minha Conta</h3>
              <div class="flex items-center gap-2">
                <button v-if="hasPermission('ACCOUNT_EDIT')"
                  class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                <button v-if="hasPermission('ACCOUNT_DELETE')"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Excluir</button>
              </div>
            </div>
          </div>

          <div class="grid gap-6 p-6">

            <div v-if="false" class="grid grid-cols-2 gap-4">

              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">ID</div>
                <div>123456789</div>
              </div>

              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Agência</div>
                <div>1234</div>
              </div>
              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Conta</div>
                <div>12345-6</div>
              </div>
              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Token</div>
                <div>abc123def456</div>
              </div>
              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Tipo de ID</div>
                <div>CPF</div>
              </div>
              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Expiração do Token</div>
                <div>2024-12-31</div>
              </div>
            </div>

            <div v-if="false" data-orientation="horizontal" role="none"
              class="shrink-0 border-2 border-gray-500 w-full"></div>
            <div v-if="accountData && accountData.account" class="grid grid-cols-2 gap-4">

              <div v-if="accountData.account.name" class="grid gap-1">
                <div class="text-gray-500 opacity-75">Nome do Titular da Conta</div>
                <div>{{ accountData.account.name }}</div>
              </div>

              <div v-if="accountData.account.code_account" class="grid gap-1">
                <div class="text-gray-500 opacity-75">Código da Conta</div>
                <div>{{ accountData.account.code_account }}</div>
              </div>
              <div v-if="accountData.account.client_id" class="grid gap-1">
                <div class="text-gray-500 opacity-75">ID do Cliente</div>
                <div>{{ accountData.account.client_id }}</div>
              </div>
              <div v-if="accountData.account.email" class="grid gap-1">
                <div class="text-gray-500 opacity-75">E-mail</div>
                <div>{{ accountData.account.email }}</div>
              </div>
              <div v-if="accountData.account.document" class="grid gap-1">
                <div class="text-gray-500 opacity-75">Documento</div>
                <div>{{ accountData.account.document }}</div>
              </div>
            </div>

            <hr data-orientation="horizontal" role="none" class="shrink-0 border-1 border-gray-500 w-full" />

            <h1 v-if="accountData && accountData.account" class="font-medium text-2xl">Informações sobre a conta:</h1>
            <div v-if="accountData && accountData.account" class="grid grid-cols-2 gap-4">

              <div v-if="accountData.account.key_pix || accountData.account.key_pix" class="grid gap-1">
                <div class="text-gray-500 opacity-75">Chave PIX</div>
                <div>{{ accountData.account.key_pix || accountData.account.key_pix }}</div>
              </div>

              <div v-if="accountData.account.min_pix_in" class="grid gap-1">
                <div class="text-gray-500 opacity-75">Mínimo PIX IN</div>
                <div>{{ FormatMonetaryValue(accountData.account.min_pix_in) }}</div>
              </div>

              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Max PIX OUT</div>
                <div>{{ FormatMonetaryValue(accountData.account.max_pix_out) }}</div>
              </div>

              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Taxa PIX IN</div>
                <div>{{ FormatMonetaryValue(accountData.account.tax_pix_in) }}</div>
              </div>

              <div class="grid gap-1">
                <div class="text-gray-500 opacity-75">Taxa PIX IN</div>
                <div>{{ FormatMonetaryValue(accountData.account.tax_pix_in) }}</div>
              </div>

              <div v-if="accountData.account.tax_boleto" class="grid gap-1">
                <div class="text-gray-500 opacity-75">Taxa Boleto</div>
                <div>{{ accountData.account.tax_boleto }}</div>
              </div>

              <div v-if="accountData.account.created_at" class="grid gap-1">
                <div class="text-gray-500 opacity-75">Atualizado em</div>
                <div>{{ moment(accountData.account.created_at).format('DD/MM/YYYY HH:mm:ss') }}</div>
              </div>

            </div>


            <hr data-orientation="horizontal" role="none" class="shrink-0 border-1 border-gray-500 w-full" />

            <h1 v-if="accountData && accountData.account" class="font-medium text-2xl">Logo de Conta:</h1>
            <LogoAccount />

          </div>

        </div>


      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InternalNav from '@/components/InternalNavCopy.vue';
import Account from '@/services/Account';
import moment from 'moment';
import { hasPermission } from '@/mixins/permissions';
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue';
import LogoAccount from '../components/LogoAccount.vue'
const accountData = ref(null);
const accountService = new Account();

onMounted(async () => {
  try {
    const response = await accountService.accountInformation();
    accountData.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar informações da conta:', error);
  }
});


</script>