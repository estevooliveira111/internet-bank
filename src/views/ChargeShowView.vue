<template>

    <header class="flex justify-between items-center space-y-1.5 pb-6" :class="{ 'justify-start': load }">
        <h1 class="text-3xl font-semibold text-white">Detalhes da Cobrança</h1>

        <div v-if="!load">
            <Button @click="editationDialog = true" class="ml-4" icon="pi pi-pencil" label="Editar" severity="info" />
            <Button v-if="chargeData && chargeData.status.id !== 2" @click="deleteCharge(chargeData.id)" class="ml-4"
                icon="pi pi-trash" label="Apagar" severity="danger" />
        </div>
    </header>

    <div v-if="chargeData" class="rounded-lg border bg-white text-card-foreground shadow-sm w-full" data-v0-t="card">


        <div class="p-6 grid gap-6">

            <div v-if="chargeData" class="grid gap-2">
                <div class="font-medium">Informações Gerais</div>

                <div class="grid sm:grid-cols-2 gap-4">

                    <div class="grid gap-1">
                        <div class="font-semibold">ID</div>
                        <div>{{ chargeData.id }}</div>
                    </div>

                    <div class="grid gap-1" v-if="chargeData.amount_paid">
                        <div class="font-semibold">Valor Pago</div>
                        <div>{{ $amount(chargeData.amount_paid) }}</div>
                    </div>

                    <div v-else class="grid gap-1">
                        <div class="font-semibold">Valor da Cobranças</div>
                        <div>{{ $amount(chargeData.value) }}</div>
                    </div>

                    <div class="grid gap-1">
                        <div class="font-semibold">Status</div>
                        <div :class="{
                            'badge bg-red-500 text-white p-2': chargeData.status.id == '1',
                            'badge bg-yellow-600 p-2': chargeData.status.id == '2',
                            'badge bg-green-600 p-2': chargeData.status.id == '3',
                            'badge bg-violet-600 p-2': chargeData.status.id == '4',
                            'badge bg-purple-600 p-2': chargeData.status.id == '5',
                            'badge bg-orange-600 p-2': chargeData.status.id == '6',
                            'badge bg-blue-600 p-2': chargeData.status.id == '7',
                            'badge bg-pink-600 p-2': chargeData.status.id == '8',
                            'badge bg-teal-600 p-2': chargeData.status.id == '9',
                            'badge bg-gray-600 p-2': chargeData.status.id == '10',
                            'badge bg-neutral-500 p-2': !['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(chargeData.status.id)
                        }">{{ chargeData.status.description }}</div>
                    </div>


                    <div class="grid gap-1">
                        <div class="font-semibold">Metodos de Pagamendo</div>
                        <div class="flex rounded-2xl">
                            <p v-if="chargeData?.pix_id && chargeData?.boleto_id"
                                class="text-sm text-blue-500 bg-blue-100 px-2 py-1">BolePix</p>
                            <p v-else-if="chargeData?.boleto_id" class="text-sm text-green-500 bg-green-100 px-2 py-1">
                                Boleto</p>
                            <p v-else-if="chargeData?.pix_id" class="text-sm text-purple-500 bg-purple-100 px-2 py-1">
                                Pix</p>
                        </div>
                    </div>

                    <div v-if="chargeData.due_date" class="grid gap-1">
                        <div class="font-semibold">Vencimento</div>
                        <div>{{ $moment(chargeData.due_date).format('DD/MM/YYYY') }}</div>
                    </div>

                    <div class="grid gap-1" v-if="chargeData?.created_at">
                        <div class="font-semibold">Criação</div>
                        <div>{{ $moment(chargeData.created_at).format('DD/MM/YYYY HH:MM:SS') }}</div>
                    </div>


                    <div class="grid gap-1" v-if="chargeData?.paymentDate">
                        <div class="font-semibold">Data de Pagamento</div>
                        <div>{{ $moment(chargeData.paymentDate).format('DD/MM/YYYY') }}</div>
                    </div>


                    <div class="grid gap-1">
                        <div class="font-semibold">Link de Pagamento</div>
                        <a class="text-primary underline"
                            :href="`https://pagamentos.fastgivemoney.com/cob/v2/` + chargeData.code"
                            target="_blank">Acessar Link de Pagamento</a>
                    </div>

                </div>
            </div>

            <Divider v-if="chargeData && chargeData?.client" />
            <div v-if="chargeData && chargeData?.client" class="grid gap-2">
                <div class="font-medium">Informações do Cliente</div>
                <div class="grid sm:grid-cols-2 gap-4">
                    <div v-if="chargeData?.client?.name" class="grid gap-1">
                        <div class="font-semibold">Nome</div>
                        <div>{{ chargeData?.client?.name }}</div>
                    </div>
                    <div v-if="chargeData?.client?.email" class="grid gap-1">
                        <div class="font-semibold">Email</div>
                        <div>{{ chargeData?.client?.email }}</div>
                    </div>
                    <div v-if="chargeData?.client?.phone" class="grid gap-1">
                        <div class="font-semibold">Telefone</div>
                        <div>{{ chargeData?.client?.phone }}</div>
                    </div>
                    <div v-if="chargeData?.client?.document" class="grid gap-1">
                        <div class="font-semibold">Documento</div>
                        <div>{{ formatDocument(chargeData?.client?.document) }}</div>
                    </div>
                </div>
            </div>

            <Divider v-if="chargeData.boleto && chargeData.status.id != '2' && chargeData?.boleto?.value" />

            <div class="grid gap-2"
                v-if="chargeData.boleto && chargeData.status.id != '2' && chargeData?.boleto?.value">
                <div class="font-medium">Detalhes do Boleto</div>
                <div class="grid sm:grid-cols-2 gap-4">
                    <div class="grid gap-1">
                        <div class="font-semibold">Valor</div>
                        <div>{{ $amount(chargeData?.boleto?.value) }}</div>
                    </div>
                    <div class="grid gap-1">
                        <div class="font-semibold">Vencimento</div>
                        <div>{{ $moment(chargeData.boleto.expired).format("DD/MM/YYYY") }}</div>
                    </div>
                </div>

                <div class="grid gap-1">
                    <div class="font-semibold">Código de Barras</div>
                    <div class="font-medium">{{ chargeData.boleto.barcode }}</div>
                </div>

                <div class="grid gap-1">
                    <div class="font-semibold">Pagamento</div>
                    <a class="text-violet-600 underline"
                        :href="`https://pagamentos.fastgivemoney.com/cob/v2/` + chargeData.code" target="_blank">Acessar
                        Link de Pagamento</a>
                </div>
            </div>

            <!-- <Divider 
                v-if="chargeData?.pix?.transactions.length >= 1 || chargeData?.boleto?.transactions.length >= 1 && chargeData?.pix || chargeData.boleto && chargeData.status.id == '2'">
            <div class="grid gap-2"
                v-if="chargeData?.pix?.transactions?.length >= 1 || chargeData?.boleto?.transactions.length >= 1 && chargeData?.pix || chargeData.boleto && chargeData.status.id == '2'">
                <div class="font-medium">Detalhes de Pagamento</div>

                
                <div v-if="chargeData.pix && chargeData.pix.transactions.length >= 1" class="grid sm:grid-cols-2 gap-4">
                    <div class="grid gap-1">
                        <div class="font-semibold">Valor</div>
                        <div>{{ $amount(chargeData.pix.value) }}</div> 
                    </div>
                    <div class="grid gap-1">
                        <div class="font-semibold">Método de Pagamento</div>
                        <div>PIX</div>
                    </div>
                    <div class="grid gap-1">
                        <div class="font-semibold">Pago</div>
                        <div>{{ $moment(chargeData.boleto.created_at).format('DD/MM/Y') }}</div>
                    </div>
                </div>

                <div v-if="chargeData.boleto && chargeData.boleto.transactions.length >= 1"
                    class="grid sm:grid-cols-2 gap-4">
                    <div class="grid gap-1">
                        <div class="font-semibold">Valor</div>
                        <div>{{ $amount(chargeData.boleto.value) }}</div>
                    </div>
                    <div class="grid gap-1">
                        <div class="font-semibold">Método de Pagamento</div>
                        <div>BOLETO</div>
                    </div>
                    <div class="grid gap-1">
                        <div class="font-semibold">Data de Pagamento</div>
                        <div>{{ $moment(chargeData.boleto.created_at).format('DD/MM/Y') }}</div>
                    </div>
                </div>



                <table v-if="chargeData.pix.transactions.length >= 1 || chargeData.boleto.transactions.length >= 1"
                    class="w-full text-sm text-left rtl:text-right text-gray-400 b-2 b-black">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-center">#</th>
                            <th scope="col" class="px-6 py-3 text-center">Detalhes</th>
                            <th scope="col" class="px-6 py-3 text-center">Valor</th>
                            <th scope="col" class="px-6 py-3 text-center">Saldo</th>
                            <th scope="col" class="px-6 py-3 text-center">Data</th>
                            <th scope="col" class="px-6 py-3 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr class="bg-white border-b" v-for="(transaction, index) in (chargeData.pix.transactions.length >= 1 ? chargeData.pix.transactions : chargeData.boleto.transactions)"
                            :key="index">

                            <td class="px-6 py-4">{{ transaction.id }}</td>
                            
                            <td class="px-6 py-4 text-center whitespace-nowrap">
                                <span v-if="transaction.type_id == 7">
                                    {{ transaction?.details?.conta?.name }}
                                </span>
                            </td>

                            <td class="px-6 py-4 text-center whitespace-nowrap">
                                <span :class="{
                                    'bg-red-500/35 px-4 rounded-md py-2 font-semibold text-red-500': parseFloat(parseInt(transaction.value)) < 0,
                                    'bg-green-500/25 px-4 rounded-md py-2 font-semibold text-green-500': parseFloat(transaction.value) > 0
                                }">
                                    {{ $amount(transaction.value) }}
                                </span>
                            </td>

                            <td class="px-6 py-4 text-center whitespace-nowrap">
                                <span :class="{
                                    'bg-red-500/35 px-4  rounded-md py-2 font-semibold text-red-500': parseFloat(transaction.balance) < 0,
                                    'bg-green-500/25 px-4  rounded-md py-2 font-semibold text-green-500': parseFloat(transaction.balance) > 0,
                                    'bg-gray-500/25 px-4  rounded-md py-2 font-semibold text-gray-500': parseFloat(transaction.balance) == null
                                }">
                                    {{ $amount(transaction.balance) }}
                                </span>
                            </td>

                            <td class="px-6 py-4 text-center whitespace-nowrap">
                                {{ $moment(transaction.created_at).format('DD/MM/YYYY') }} |
                                {{ $moment(transaction.created_at).format('HH:mm:ss') }}
                            </td>
                            <td class="px-6 py-4 text-center whitespace-nowrap">
                                <ModalTransactionDetails :transaction="transaction" :buttonMessage="'Ver detalhes'" /> 
                            </td> 
                        </tr>

                    </tbody>
                </table>

            </div> -->

            <Divider v-if="chargeData?.pix && chargeData?.status?.id != '2'" />
            <div class="grid gap-2" v-if="chargeData?.status?.id != '2' && chargeData?.pix?.value">
                <div class="font-medium">Detalhes do PIX</div>

                <div class="grid sm:grid-cols-2 gap-4">
                    <div class="grid gap-1">
                        <div class="font-semibold">Valor</div>
                        <div>{{ $amount(chargeData.pix.value) }}</div>
                    </div>
                </div>
            </div>

            <section v-if="chargeData.tag">

                <Divider v-if="chargeData.tag" />
                <div v-if="chargeData.tag" class="grid gap-2">
                    <div class="font-medium">Tag</div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div class="grid gap-1">
                            <div class="font-semibold">ID</div>
                            <div>{{ chargeData.tag.id }}</div>
                        </div>

                        <div class="grid gap-1">
                            <div class="font-semibold">Nome</div>
                            <div>{{ chargeData.tag.name }}</div>
                        </div>
                    </div>

                    <div v-if="chargeData.tag && chargeData?.tag?.split && chargeData?.tag?.split.length"
                        class="mt-5 relative overflow-x-auto">
                        <div class="font-medium">Split</div>

                        <table class="w-full text-sm text-left rtl:text-right text-gray-400 b-2 b-black">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col">Nome da Conta</th>
                                    <th scope="col" class="px-6 py-3">Porcentagem</th>
                                    <th scope="col" class="px-6 py-3">Referência (Dados da Conta)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="key" v-for="(split, key) in chargeData.tag.split"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ (split && split.account_full && split.account_full.name) ?
                                            split.account_full.name : split.account }}
                                    </th>
                                    <td class="px-6 py-4">{{ split.percentage }}</td>
                                    <td class="px-6 py-4">{{ split.account }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Divider />

                    <div
                        v-if="chargeData.status.title == 'paid' && chargeData?.rateios && chargeData?.rateios?.length > 0">

                        <div class="flex justify-start">
                            <div class="font-medium text-xl mb-3">Ordens de Rateio - Beneficiários</div>
                        </div>

                        <table v-if="chargeData?.rateios"
                            class="w-full text-sm text-left rtl:text-right text-gray-400 border-separate border-spacing-y-3">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-indigo-700 dark:text-gray-400">
                                <tr class="border-b-2 border-indigo-300">
                                    <th scope="col" class="px-6 py-3">Status</th>
                                    <th scope="col" class="px-6 py-3">Porcentagem</th>
                                    <th scope="col" class="px-6 py-3">Dados de Conta</th>
                                    <th scope="col" class="px-6 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="key" v-for="(rateio, key) in chargeData?.rateios"
                                    class="bg-white shadow-sm rounded-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                                    <td class="flex">
                                        <span :class="{
                                            'text-yellow-500 bg-yellow-100': rateio?.status === 'pending',
                                            'text-green-500': rateio?.status === 'paid'
                                        }" class="px-3 py-1 font-semibold rounded-2xl">
                                            {{ rateio?.status === 'pending' ? 'Pendente' : 'Pago' }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-3 text-gray-500 font-semibold">{{
                                        rateio?.rateio_recipient?.percentage ?? rateio?.rateio_recipient?.percentage }}
                                    </td>
                                    <td class="px-6 py-3 text-gray-500 font-semibold">
                                        {{ rateio?.rateio_recipient?.beneficiary_name }} -
                                        {{ rateio?.rateio_recipient?.branch }}/{{ rateio?.rateio_recipient?.account }} -
                                        {{ rateio?.rateio_recipient?.percentage }}%
                                    </td>


                                    <td class="px-6 py-3" v-if="rateio && rateio?.rateio_recipient && rateio.id">
                                        <MakeRateioComponent
                                            v-if="rateio?.status === 'pending' && rateio.rateio_recipient"
                                            :rateio="rateio" :rateio_id="rateio.id" />
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div v-else-if="chargeData?.tag && chargeData?.tag?.rateio && chargeData?.tag?.rateio.length"
                        class="mt-5 relative overflow-x-auto">

                        <div class="flex justify-between">
                            <div class="font-medium text-xl mb-3">Contas de Rateio - Beneficiários</div>
                            <div>
                                <Button :loading="rateioCreatesTagLoading" @click="criarRateioTag"
                                    v-if="chargeData.status.title == 'Anticipation' || chargeData.status.title == 'paid'">Criar
                                    Ordem de Rateio</Button>
                                <Message v-if="rateioCreatesTagError" class="mt-2" severity="error" variant="simple">{{
                                    rateioCreatesTagError }}</Message>
                            </div>
                        </div>

                        <table v-if="chargeData.tag.rateio"
                            class="w-full text-sm text-left rtl:text-right text-gray-400 border-separate border-spacing-y-3">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-indigo-100 dark:bg-indigo-700 dark:text-gray-400">
                                <tr class="border-b-2 border-indigo-300">
                                    <th scope="col" class="py-3 pl-3">Nome da Conta</th>
                                    <th scope="col" class="px-6 py-3">Porcentagem</th>
                                    <th scope="col" class="px-6 py-3">Referência</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="key" v-for="(rateio, key) in chargeData.tag.rateio"
                                    class="bg-white shadow-sm rounded-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="font-medium text-gray-900 whitespace-nowrap dark:text-white py-3 pl-3">
                                        {{ rateio.beneficiary_name }}
                                    </th>
                                    <td class="px-6 py-3 text-gray-500 font-semibold">{{ rateio.percentage }}</td>
                                    <td class="px-6 py-3 text-gray-500 font-semibold">{{ rateio.account }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table v-if="chargeData?.rateio"
                            class="w-full text-sm text-left rtl:text-right text-gray-400 border-separate border-spacing-y-3">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-green-100 dark:bg-green-700 dark:text-gray-400">
                                <tr class="border-b-2 border-green-300">
                                    <th scope="col" class="py-3 pl-3">Valor Transferido</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                    <th scope="col" class="px-6 py-3">Data de Transferência</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr :key="key" v-for="(rateio, key) in chargeData?.rateio"
                                    class="bg-white shadow-sm rounded-md border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="font-medium text-gray-900 whitespace-nowrap dark:text-white py-3 pl-3">
                                        {{ rateio.beneficiary_name }}
                                    </th>
                                    <td class="px-6 py-3 text-gray-500 font-semibold">{{ rateio.percentage }}</td>
                                    <td class="px-6 py-3 text-gray-500 font-semibold">{{ rateio.account }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>

            </section>

        </div>

    </div>

    <LoadingSpinner v-else />

    <Dialog v-model:visible="editationDialog" modal header="Editar Cobrança" :style="{ width: '25rem' }">
        <form v-if="tagsData" @submit.prevent="updateTag" class="flex flex-col gap-4">

            <IftaLabel v-if="chargeData.status.id !== 2" class="mb-3">
                <InputText v-model="formData.value" v-money="{
                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    precision: 2,
                }" :invalid="formDataMessage?.errors?.value.length >= 1" class="w-full" />
                <label for="on_label">Valor da Cobrança</label>

                <Message v-if="formDataMessage?.errors?.value">
                    {{ formDataMessage?.errors?.value[0] }}
                </Message>
            </IftaLabel>

            <IftaLabel class="mb-3">
                <Select v-model="formData.tag_id" :options="tagsData" optionLabel="label" optionValue="value"
                    class="w-full" />
                <label for="on_label">Selecione uma Tag</label>
            </IftaLabel>


            <IftaLabel v-if="chargeData.status.id !== 2" class="mb-3">
                <Textarea v-model="formData.description" class="w-full" />
                <label for="on_label">Descrição</label>
            </IftaLabel>

            <Message v-if="formDataMessage">{{ formDataMessage.message }}</Message>

            <Button type="submit" icon="pi pi-refresh" label="Atualizar" class="p-button-success w-full"
                :disabled="TagsDataIsLoading" />
        </form>
    </Dialog>

    <ConfirmDialog group="templating">
        <template #message="slotProps">
            <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
                <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
                <p>{{ slotProps.message.message }}</p>
            </div>
        </template>
    </ConfirmDialog>

</template>


<script setup>
import LoadingSpinner from '../components/LoadingSpinner.vue'
import Charges from '@/services/Charges';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TagService from '@/services/TagService';
import { AcessAPI } from '@/boot/API';

import { Button, Dialog, InputText, Select, useToast, Textarea, Divider, Message, IftaLabel, useConfirm, ConfirmDialog } from 'primevue';
import { handleSystemError, handleSystemErrorInfo } from '../utils/handleSystemError';
import MakeRateioComponent from '../components/MakeRateioComponent.vue';


const toast = useToast()
const tagsData = ref(null)
const TagsDataIsLoading = ref(true)
const deleteChargeLoading = ref(true)
const tagsService = new TagService()
const formDataMessage = ref(null)
const formData = ref({
    value: "",
    due_date: "",
    tag_id: "",
    description: ""
});


const route = useRoute();
const id = route.params.code;
const router = useRouter();
const load = ref(true);
const editationDialog = ref(false);
const chargeData = ref(null);
const rateioCreatesTagError = ref(null)
const rateioCreatesTagLoading = ref(null)



const fetchChargeData = async (query = null) => {
    TagsDataIsLoading.value = true
    try {
        const { data } = await tagsService.listTags(1, query)
        tagsData.value = data.data.map((tag) => {
            return {
                label: tag.name,
                value: tag.id
            }
        })
    } catch (err) {
        console.error(err)
    } finally {
        TagsDataIsLoading.value = false
    }
}

function formatDocument(document) {
    if (!document) return '';

    const cleanDocument = document.replace(/\D/g, '');


    if (cleanDocument.length === 11) {
        return cleanDocument.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }


    if (cleanDocument.length === 14) {
        return cleanDocument.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return document;
}

const confirm = useConfirm();

const criarRateioTag = async () => {
    confirm.require({
        message: 'Você tem certeza de que deseja continuar?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: rateioCreatesTagLoading.value ? 'Salvando...' : 'Salvar',
            disabled: rateioCreatesTagLoading.value,
            icon: rateioCreatesTagLoading.value ? 'pi pi-spin pi-spinner' : null
        },
        accept: async () => {
            console.log(chargeData.value.id);
            rateioCreatesTagLoading.value = true;
            rateioCreatesTagError.value = null;
            try {
                const { data } = await AcessAPI.post(`consolidation/rateios/creates-by-collection-tag`, {
                    "charge_id": chargeData.value.id
                });

                toast.add({
                    severity: 'success',
                    summary: handleSystemError(data),
                    life: 5000
                });

                if (data.status == true) {
                    window.location.reload();
                }
            } catch (error) {
                rateioCreatesTagError.value = handleSystemErrorInfo(error);
                toast.add({
                    severity: 'error',
                    summary: handleSystemError(error),
                    detail: handleSystemErrorInfo(error),
                    life: 5000,
                    group: 'groupCente'
                });
            } finally {
                rateioCreatesTagLoading.value = false;
            }
            // toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Você aceitou', life: 3000 });
        }
    });
}


const deleteCharge = async (id) => {
    deleteChargeLoading.value = true;
    console.log(id);

    confirm.require({
        group: 'templating',
        header: 'Confirmação',
        message: 'Você está prestes a apagar esta cobrança. Tem certeza de que deseja continuar? Esta ação não poderá ser desfeita.',
        icon: 'pi pi-exclamation-circle',
        rejectProps: {
            label: 'Cancelar',
            icon: 'pi pi-times',
            outlined: true,
            size: 'small'
        },
        acceptProps: {
            label: 'Confirmar',
            icon: 'pi pi-check',
            size: 'small'
        },
        accept: () => {
            new Charges().deleteCharge(id)
                .then(({ data }) => {
                    console.log(data);
                    router.push({ name: 'cobrancas' });
                    toast.add({ severity: 'info', summary: data.message, life: 3000 });
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados:", error);
                })
                .finally(() => {
                    deleteChargeLoading.value = true;
                });
        }
    });
};


const updateTag = async () => {
    try {
        formDataMessage.value = null;
        const valueCharge = formData.value.value
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim();

        console.log(valueCharge);

        const { data } = await AcessAPI.put(`charge/update?id=${chargeData.value.code}`, {
            ...formData.value,
            value: parseFloat(
                valueCharge
            )
        });


        console.log(data);

        toast.add({
            severity: 'success',
            summary: data?.message,
            life: 5000
        });

        new Charges().getCharge(id)
            .then(({ data }) => {
                chargeData.value = data.data;
            })
            .finally(() => {
                load.value = false;
            });

        editationDialog.value = false;
    } catch (error) {
        console.log(error);
        formDataMessage.value = error.response.data;
        toast.add({
            severity: 'error',
            summary: handleSystemError(error),
            detail: handleSystemErrorInfo(error),
            life: 5000
        });
    }
};

onMounted(() => {
    load.value = true;
    fetchChargeData()
    new Charges().getCharge(id)
        .then(({ data }) => {
            chargeData.value = data.data;
            formData.value = { ...data.data };
        })
        .catch((error) => {
            console.error("Erro ao buscar dados:", error);
        })
        .finally(() => {
            load.value = false;
        });
});

</script>
