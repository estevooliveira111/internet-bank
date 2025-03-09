<template>
    <n-page-header class="mb-4" title="Upload de Arquivo" subtitle="Informações e detalhes sobre Tags da conta" />

    <n-skeleton v-if="loading" text :repeat="6" />

    <n-space v-else vertical :size="12">
        <n-data-table :loading="loading" :columns="columnsClients" :data="responseDataTable" :pagination="pagination"
            :bordered="true" />
    </n-space>

    <div class="flex justify-center">
        <n-button @click="createAll">Adicionar Todas Linhas</n-button>
    </div>

</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from '@/stores/AccountStore';
import axios from 'axios';
import { NButton, useNotification } from 'naive-ui';
import ClientsService from '@/services/ClientsService';

const route = useRoute();
const accountStore = useAccountStore();
import Toast from '@/boot/Toast';
const token = accountStore.accounts[0]?.account.token;
const notification = useNotification();

const loading = ref(false);
const responseDataTable = ref([]);
const columnsClients = ref([
    { title: 'Status', key: 'status' },
    { title: 'CPF/CNPJ', key: 'documento' },
    { title: 'Nome', key: 'nome' },
    { title: 'Contato', key: 'contato' },
    { title: 'Email', key: 'email' },
    {
        title: 'Ação',
        key: 'actions',
        render: (row) => h('div', [
            h(
                NButton,
                {
                    size: 'small',
                    onClick: () => viewCliente(row)
                },
                { default: () => 'Visualizar' }
            ),
            h(
                NButton,
                {
                    size: 'small',
                    onClick: () => saveCliente(row)
                },
                { default: () => 'Adição Unica' }
            )
        ])
    }
]);

const pagination = {
    pageSize: 15,
};

const fetchTableData = async () => {
    loading.value = true;
    try {
        const { data } = await axios.get(`https://upload.hackingmake.com.br/path/${route.params.idPath}/user/${token}`, {
            params: { data: true },
        });
        responseDataTable.value = data.data.map((item, index) => ({
            ...item,
            id: index,
            status: item.someCondition ? 'Ativo' : 'Inativo',
            message: ''
        }));
    } catch (error) {
        console.error('Erro ao buscar dados da tabela:', error);
    } finally {
        loading.value = false;
    }
};

const viewCliente = (cliente) => {
    console.log(cliente);
};

const saveCliente = (clientData) => {
    console.log(clientData);

    new ClientsService().createClient({
        document: clientData.documento,
        name: clientData.nome,
        phone: clientData.contato,
        email: clientData.email
    }).then(({ data }) => {
        notification.create({
            title: data.message,
            content: `Usuário criado com sucesso ${clientData.nome}.`,
            duration: 1000
        })
    })
        .catch(({ data }) => {
            console.log(data);
            notification.error({
                title: data.message,
                content: `....`,
                duration: 1000
            })
        })
        .finally(() => { })
}

function createAll() {
    responseDataTable.value.forEach((data) => {
        saveCliente(data);
    })
}

onMounted(fetchTableData);

</script>
