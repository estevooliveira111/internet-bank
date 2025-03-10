<template>
    <main class="w-full h-full rounded-lg border bg-white text-card-foreground shadow-md">
        <header class="flex flex-col space-y-4 p-6">
            <div class="flex justify-between">
                <h3 class="text-2xl font-semibold leading-tight tracking-tight">Relatórios de Splits</h3>
                <button @click="exportSplits" class="btn btn-primary">Exportar</button>
            </div>
        </header>

        <div v-if="loading" class="flex items-center justify-center h-full">
            <p class="p-5 text-gray-500">Carregando...</p>
        </div>

        <div v-else-if="splits">
            <div class="bg-gray-50 p-6 rounded-md">
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label for="startMonth" class="text-sm font-medium leading-none text-gray-700">Mês Inicial</label>
                        <select id="startMonth" v-model="startMonth" @change="fetchSplits"
                            class="mt-1 select select-bordered w-full border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50">
                            <option value="">Selecione um mês</option>
                            <option v-for="month in months" :key="month.value" :value="month.value">{{ month.label }}</option>
                        </select>
                    </div>

                    <div>
                        <label for="account" class="text-sm font-medium leading-none text-gray-700">Conta</label>
                        <input id="account" v-model="accountName" @input="fetchSplits"
                            class="mt-1 block input w-full border border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
                    </div>
                </div>
            </div>

            <div class="flex-1 overflow-auto p-6">
                <div class="relative w-full overflow-auto">
                    <table class="w-full text-sm border-collapse">
                        <thead class="bg-gray-100">
                            <tr class="border-b transition-colors hover:bg-gray-200">
                                <th class="h-12 px-4 text-left align-middle font-medium text-gray-600">Data</th>
                                <th class="h-12 px-4 text-left align-middle font-medium text-gray-600">Conta</th>
                                <th class="h-12 px-4 text-left align-middle font-medium text-gray-600">Valor</th>
                                <th class="h-12 px-4 text-left align-middle font-medium text-gray-600">Atualização</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(split, key) in splits" :key="key"
                                class="border-b transition-colors hover:bg-gray-200">
                                <td class="p-4 align-middle">{{ $moment(split.month).format('MMMM YYYY') }}</td>
                                <td class="p-4 align-middle font-semibold">{{ split.account_name }}</td>
                                <td class="p-4 align-middle text-green-600 font-semibold">{{ $amount(split.balance) }}</td>
                                <td class="p-4 align-middle font-semibold">{{  $moment(split.last_update).format('H:M DD/MM/Y') }}</td>
                            </tr>

                            <tr v-if="splits.length == 0" class="border-b transition-colors hover:bg-gray-200">
                                <td class="p-4 align-middle"></td>
                                <td class="p-4 text-center align-middle">Nenhum Split Encontrado</td>
                                <td class="p-4 align-middle"></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TagService from '@/services/TagService';
import axios from 'axios';
import { useNotification } from 'naive-ui'

const notification = useNotification()
const splits = ref(null);
const startMonth = ref('');
const accountName = ref('');
const loading = ref(false);
const months = [
    { value: '2024-01', label: 'Janeiro' },
    { value: '2024-02', label: 'Fevereiro' },
    { value: '2024-03', label: 'Março' },
    { value: '2024-04', label: 'Abril' },
    { value: '2024-05', label: 'Maio' },
    { value: '2024-06', label: 'Junho' },
    { value: '2024-07', label: 'Julho' },
    { value: '2024-08', label: 'Agosto' },
    { value: '2024-09', label: 'Setembro' },
    { value: '2024-10', label: 'Outubro' },
    { value: '2024-11', label: 'Novembro' },
    { value: '2024-12', label: 'Dezembro' }
];

const currentMonth = new Date().toISOString().slice(0, 7);
startMonth.value = currentMonth;

const fetchSplits = async () => {
    loading.value = true;

    const params = {
        ...(startMonth.value && { month: startMonth.value }),
        ...(accountName.value && { account_name: accountName.value }),
    };

    try {
        const response = await new TagService().getInfos(params);
        splits.value = response.data.data;
    } catch (error) {
        console.error('Erro ao buscar os splits:', error);
    } finally {
        loading.value = false;
    }
};

const exportSplits = () => {
    if (!splits.value || splits.value.length === 0) {
        alert('Nenhum dado disponível para exportar.');
        return;
    }

    const dataRequest = splits.value.map((charge) => {
            return {
                account: charge.account,
                conta_name: charge.account_name,
                saldo: charge.balance,
                metodo: charge.metodo,
                month: charge.month
            };
        });

        axios.post('https://upload.hackingmake.com.br/export', {
            format: "excel",
            data: dataRequest,
        })
            .then(({ data }) => {
                const downloadUrl = data.file_path;
                notification.success({
                    content: 'Arquivo baixado com sucesso.',
                    duration: 2500,
                });
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(({ response }) => {
                console.log(response.data);
                notification.error({
                    content: 'Erro ao baixar o arquivo.',
                    duration: 2500,
                });
            })
            .finally(() => {
                // loadExport.value = false;
            });

    // const csvContent = [
    //     ["Data", "Conta", "Valor", "Atualização"], // Cabeçalho
    //     ...splits.value.map(split => [
    //         $moment(split.month).format('MMMM YYYY'),
    //         split.account_name,
    //         $amount(split.balance),
    //         $moment(split.last_update).format('H:M DD/MM/Y')
    //     ])
    // ]
    // .map(e => e.join(",")) // Junta cada linha
    // .join("\n"); // Junta todas as linhas

    // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    // saveAs(blob, `splits_report_${currentMonth}.csv`);
};

onMounted(fetchSplits);
</script>