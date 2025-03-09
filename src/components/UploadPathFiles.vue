<template>

    <n-button type="success" class="text-white mx-2" :size="'large'" @click="() => showModal = true">
        <Icon icon="lets-icons:file-dock-add-fill" class="w-5 h-5" />
        <span class="font-medium">Importar Clientes</span>
    </n-button>

    <n-modal style="width: 700px" v-model:show="showModal" :mask-closable="false" preset="dialog"
        title="Fazer Upload de Arquivo">
        <form v-if="!responseData" @submit.prevent="handleSubmit" class="mt-5 flex flex-row">
            <input class="basis-2/3" type="file" ref="fileInput" />
            <n-button class="basis-1/3" :loading="loadInput" n-button attr-type="submit"
                type="success">Enviar</n-button>
        </form>

        <div class="mt-5" v-if="responseData">

            <n-card class="mt-5 flex flex-col mb-4">



                <h1 class="font-semibold text-lg">Informações do Arquivo</h1>

                <n-alert class="mt-5" :title="responseData.message" type="info" />

                <n-card class="mt-5">
                    <div class="mb-3">
                        <h1 class="text-black font-medium">Nome:</h1>
                        <p>{{ responseData.registration_info.full_name }}</p>
                    </div>

                    <div v-for="(column, index) in columnsClients" :key="index" class="grid grid-cols-2 gap-4">
                        <n-tag class="m-2" size="large">{{ column.title }}</n-tag>
                        <n-select class="m-2" v-model:value="column.key" size="large" placeholder="Selecione" filterable
                            :options="headersDataExterna" />
                    </div>
                    <n-button class="mt-4" type="primary" :loading="loading" @click="processForm">Processar</n-button>
                </n-card>
            </n-card>

        </div>

        <div v-if="error">
            <h3>Erro:</h3>
            <pre>{{ error }}</pre>
        </div>

    </n-modal>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';


import { UserStore } from '@/stores/UserStore.js';

import { hasPermission } from '@/mixins/permissions';
import { Icon } from '@iconify/vue';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

const fileInput = ref(null);
const userUserStore = UserStore();
const loadInput = ref(null);
const responseData = ref(null);
const showModal = ref(false);
const error = ref(null);
const message = useMessage();
const token = userUserStore.mainAccount.account;
const columns = ref([]);
const idPath = ref(null);
const loading = ref(false);
const headersDataExterna = ref([]);

const router = useRouter();
const columnsClients = ref([
    { title: 'documento', key: '', selectedHeader: null },
    { title: 'nome', key: '', selectedHeader: null },
    { title: 'contato', key: '', selectedHeader: null },
    { title: 'email', key: '', selectedHeader: null },
]);

const handleSubmit = async () => {
    error.value = null;
    if (fileInput.value.files.length === 0) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    const file = fileInput.value.files[0];
   
    const formData = new FormData();
    formData.append('file', file);

    loadInput.value = true;
    try {
        const { data } = await axios.post('https://upload.hackingmake.com.br/upload-path/' + token, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        message.success(data.message)
        idPath.value = data.registration_info.id;
        getHeaders(token, data.registration_info.id)
        responseData.value = data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loadInput.value = false;
    }
};


async function getHeaders(token, idPaht) {
    error.value = null;
    try {
        const { data } = await axios.get(`https://upload.hackingmake.com.br/path/${idPaht}/user/${token}?header=true`);

        headersDataExterna.value = data.headers.map(header => ({
            label: header,
            value: header,
        }));

        columns.value = data.headers;
    } catch (err) {
        error.value = err.message;
    }
}

async function processForm() {
    loading.value = true;
    try {
        console.log(columnsClients);

        const headers = columnsClients.value.reduce((acc, data) => {
            acc[data.key] = data.title;
            return acc;
        }, {});

        let dataRequest = {
            "headers_mapping": headers
        }
        const dataResponse = await axios.put(`https://upload.hackingmake.com.br/update-path/${idPath.value}/user/${token}`, dataRequest)
        console.log(dataResponse);
        alert(dataResponse.data.message);

        router.push({ name: 'process_upload', params: { typeUpload: 'client', idPath: idPath.value } });
    } catch (err) {
        alert(err.message);
    } finally {
        loading.value = false;
    }
}

</script>
