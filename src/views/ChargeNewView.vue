<template>
    <section class="my-4 bg-white rounded-xl shadow p-5 md:p-10 h-auto">

        <form @submit.prevent="submitCharge">

            <div class="mb-4">
                <h1 class="font-bold text-2xl mb-2">Adicionar nova Cobrança</h1>
            </div>

            <div class="mt-5 space-y-4">
                <div class="flex gap-4 items-center">
                    <div class="flex-1">
                        <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="charge-amount">Valor da Cobrança <span class="text-red-600">*</span></label>
                        <input v-model.lazy="formData.amount" required id="charge-amount" v-money="{
                            decimal: ',',
                            thousands: '.',
                            prefix: 'R$ ',
                            precision: 2,
                        }" class="border-gray-100 focus:border-gray-400 focus:outline-primary input input-bordered bg-white text-black w-full"
                            placeholder="0,00" type="text" />
                    </div>

                    <div class="flex-1">
                        <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="discount-amount">Vencimento da cobrança <span class="text-red-600">*</span></label>
                        <n-date-picker size="large" v-model:value="formData.due_date" required type="date" />
                    </div>
                </div>

                <div class="gap-x-4 grid gap-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="description">Descrição da Cobrança</label>
                    <n-input size="large" v-model:value="formData.description" type="textarea" maxlength="50" show-count
                        id="description" placeholder="Enter description" />
                </div>

                <div class="flex items-center mb-4">
                    <input checked id="checked-checkbox" type="checkbox" v-model="formData.check_discount"
                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900">Adicionar
                        Desconto</label>
                </div>

                <div class="flex items-center mb-4">
                    <input checked id="checked-checkbox" type="checkbox" v-model="formData.check_rate"
                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900">Adicionar Multa</label>
                </div>

            </div>


            <div v-if="formData.check_discount || formData.check_rate" class="mt-8 space-y-4">

                <div v-if="formData.check_discount" class="mb-20">

                    <div class="grid gap-2">
                        <h1
                            class="mt-1 text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Desconto</h1>
                        <label
                            class="text-gray-600 mt-1 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="discount-amount">Conceda desconto para incentivar seu cliente a realizar o pagamento
                            antes do vencimento.</label>
                        <label
                            class="text-gray-600 mb-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="discount-amount">Você configurou o vencimento da cobrança para 31/07/2024.</label>
                    </div>


                    <div class="join">
                        <button type="button" @click="typeFine = 1" :class="{
                            'bg-blue-700 text-white hover:bg-blue-800': typeFine === 1,
                            'py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 join-item': typeFine !== 1
                        }" class="font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none join-item">
                            Porcentagem
                        </button>
                        <button type="button" @click="typeFine = 2" :class="{
                            'bg-blue-700 text-white hover:bg-blue-800': typeFine === 2,
                            'py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 join-item': typeFine !== 2
                        }" class="font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none join-item">Valor
                            Fixo</button>
                    </div>

                    <div class="flex">

                        <div v-if="typeFine === 1" class="m-1 w-1/2 flex">
                            <span
                                class="font-semibold inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">%</span>
                            <input v-model="formData.discount" type="text" max="100" id="website-admin"
                                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                placeholder="Porcentagem">
                        </div>

                        <div v-if="typeFine === 1 && false" class="m-1 w-1/2 flex">
                            <span
                                class="inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">R$</span>
                            <input type="text" disabled id="website-admin"
                                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5">
                        </div>

                    </div>

                    <div v-if="typeFine === 2" class="m-1 flex">
                        <span
                            class="inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">R$</span>
                        <input type="text" v-model="formData.discount" id="website-admin"
                            class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                            placeholder="Valor Fixo">
                    </div>

                    <div class="mt-5 gap-x-4 grid gap-2">
                        <h1
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Prazo máximo do desconto</h1>
                        <select v-model="formData.days_discount" class="select select-primary w-full max-w-xs">
                            <option disabled selected>Prazo máximo do desconto</option>
                            <option value="1">Até 1 dias antes do Vencimento</option>
                            <option value="2">Até 2 dias antes do Vencimento</option>
                            <option value="8">Até 8 dias antes do Vencimento</option>
                            <option value="12">Até 12 dias antes do Vencimento</option>
                            <option value="15">Até 15 dias antes do Vencimento</option>
                        </select>
                    </div>

                </div>



                <div v-if="formData.check_rate" class="mb-20">

                    <div class="grid gap-2">
                        <h1
                            class="mt-1 text-2xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Multa</h1>
                        <label
                            class="text-gray-600 mb-1 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="discount-amount">A multa será somada ao valor da parcela caso o pagamento seja feito
                            após a data do vencimento.</label>
                    </div>



                    <div class="join">
                        <button type="button" @click="typeDiscount = 1" :class="{
                            'bg-blue-700 text-white hover:bg-blue-800': typeDiscount === 1,
                            'py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 join-item': typeDiscount !== 1
                        }" class="font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none join-item">
                            Porcentagem
                        </button>
                        <button type="button" @click="typeDiscount = 2" :class="{
                            'bg-blue-700 text-white hover:bg-blue-800': typeDiscount === 2,
                            'py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 join-item': typeDiscount !== 2
                        }" class="font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none join-item">Valor
                            Fixo</button>
                    </div>

                    <div class="flex">
                        <div v-if="typeDiscount === 1" class="m-1 w-1/2 flex">
                            <span
                                class="font-semibold inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">%</span>
                            <input type="number" maxlength="100" v-model="formData.rate" id="rate-admin" min="0"
                                max="100" step="0.01"
                                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                                placeholder="Porcentagem">
                        </div>

                        <div v-if="typeDiscount === 1" class="m-1 w-1/2 flex">
                            <span
                                class="inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">R$</span>
                            <input type="text" disabled :value="calculatedDiscount"
                                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5">
                        </div>
                    </div>

                    <div v-if="typeDiscount === 2" class="m-1 flex">
                        <span
                            class="inline-flex items-center px-5 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">R$</span>
                        <input type="text" v-model="formData.rate" id="website-admin"
                            class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                            placeholder="Valor Fixo">
                    </div>

                </div>

            </div>

            <n-select class="mt-4" :loading="TagsDataIsLoading" size="large" v-model:value="formData.tag" filterable
                placeholder="Por favor selecione a Tag" :options="tagsData" clearable remote
                @search="fetchChargeData" />

            <n-divider />

            <n-space vertical size="large" class="border p-2 rounded-md">
                <h4 class="text-lg font-semibold">Dados do Cliente:</h4>

                <div class="space-y-2">
                    <n-select :loading="clientsDataIsLoading" size="large" v-model:value="formData.client" filterable
                        placeholder="Insira CPF ou CNPJ" :options="clientsData" clearable remote
                        @search="fetchClienteData" @change="handleSelectChange" />
                </div>

                <div class="space-y-2">
                    <label
                        class="mt-10 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="document">Documento (CPF ou CNPJ) <span class="text-red-600">*</span> </label>
                    <n-input v-model:value="formData.document" size="large" id="document"
                        placeholder="Insira CPF ou CNPJ" />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="name">Name <span class="text-red-600">*</span></label>
                        <n-input v-model:value="formData.name" size="large" id="name"
                            placeholder="Enter your full name" />
                    </div>
                    <div class="space-y-2">
                        <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="email">Email <span class="text-red-600">*</span></label>
                        <n-input v-model:value="formData.email" size="large" id="email"
                            placeholder="Enter your email address" type="email" />
                    </div>
                </div>

                <n-checkbox class="my-3" v-model:checked="formData.notifyUser">Notificar Pagamento</n-checkbox>

            </n-space>

            <div class="flex items-center p-6">
                <button :disabled="load"
                    class="text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto"
                    type="submit">
                    <span v-if="!load">Criar Cobrança</span>
                    <span v-else><span class="loading loading-spinner bg-white"></span></span>
                </button>
            </div>

        </form>

    </section>
</template>



<script setup>
import Toast from '@/boot/Toast';
import Charges from '@/services/Charges';
import { useRouter } from 'vue-router';
import TagService from '@/services/TagService';
import { ref, computed, onMounted } from 'vue';
import moment from 'moment';
import ClientsService from '@/services/ClientsService';

const router = useRouter();

const load = ref(false);
const typeFine = ref(1);
const typeDiscount = ref(1);

const clientsData = ref(null)
const clientsDataIsLoading = ref(true)


const tagsData = ref(null)
const TagsDataIsLoading = ref(true)
const tagsService = new TagService()

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
        console.log(tagsData.value);
    } catch (err) {
        Toast.error('Erro ao buscar os dados das Tags')
        console.error(err)
    } finally {
        TagsDataIsLoading.value = false
    }
}

const fetchClienteData = async (query = null) => {
    clientsDataIsLoading.value = true
    try {
        let data;
        if (query != null) {
            ({ data } = await (new ClientsService()).getClients(1, query));
        } else {
            ({ data } = await (new ClientsService()).getClients());
        }

        clientsData.value = data.data.map((client) => {
            return {
                label: client.name,
                value: client.id,
                id: client.id,
                email: client.email,
                document: client.document,
            }
        });
        console.log(clientsData.value);
    } catch (err) {
        Toast.error('Erro ao buscar os dados dos Clientes');
        console.error(err);
    } finally {
        clientsDataIsLoading.value = false;
    }
};

const calculatedDiscount = computed(() => {
    try {
        let amount = parseFloat(formData.value.amount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
        if (typeDiscount.value === 1 && amount && formData.value.rate) {
            return (amount * (formData.value.rate / 100)).toFixed(2);
        }
    } catch (error) {
        console.log(error);
    }
    return '0.00';
});

onMounted(() => {
    fetchChargeData();
    fetchClienteData()
})

const formData = ref({
    amount: 0,
    description: '',
    due_date: null,
    paymentMethods: null,

    rate: 1,
    check_rate: false,
    type_rate: null,
    notifyUser: false,

    discount: 1,
    check_discount: false,
    days_discount: null,
    type_discount: null,


    name: '',
    email: '',
    document: '',
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function handleSelectChange(clientId) {
    const selectedClient = clientsData.value.find(client => client.value === clientId);
    if (selectedClient) {
        console.log(selectedClient);
        formData.value.document = selectedClient.document;
        formData.value.name = selectedClient.label;
        formData.value.email = selectedClient.email;
    }
}

async function submitCharge() {
    load.value = true;
    try {
        console.log(formData.value.due_date);
        let data = {
            amount: parseFloat(formData.value.amount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()),
            description: formData.value.description,
            due_date: moment(formData.value.due_date).format('YYYY-MM-DD'),

            name: formData.value.name,
            email: formData.value.email,
            document: formData.value.document.replace(/\D+/g, '')
        }

        if (formData.value.tag) {
            data["tag"] = formData.value.tag;
        }

        if (formData.value.check_rate) {
            data["type_rate"] = 'PERCENTAGE';
            if (typeFine.value == 2) {
                data["type_rate"] = 'ABSOLUTE';
            }

            let rate = formData.value.rate;

            if (typeof rate === 'string') {
                rate = rate.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
            } else {
                rate = rate.toString();
                rate = rate.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
            }

            data["rate"] = parseFloat(rate);
            data["type_rate"] = formData.value.type_rate;
        }


        if (formData.value.check_discount) {
            data["type_discount"] = 'PERCENTAGE';
            if (typeDiscount.value == 2) {
                data["type_discount"] = 'ABSOLUTE';
            }
            data["days_discount"] = formData.value.days_discount;
        }

        await new Charges().newCharge(data)
            .then(async (response) => {
                console.log(response);
                Toast.run('info', response.data.message);
                await delay(2000);
                await router.push({ name: 'cobrancas' });
            })
            .catch((error) => {
                console.log(error);
                Toast.run('error', error?.response?.data?.message || error.response?.data?.error || error.response?.data?.message || error.response.data.message || 'Houve um erro, tente novamente mais tarde')
            })
            .finally(() => {
                load.value = false;
            })
    } catch (error) {
        console.log(error);
        Toast.run('error', error.message);
    }
}

</script>