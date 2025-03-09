<template>

    <n-page-header class="mb-4" subtitle="Listagem de Clientes na Cadastrados">

        <template #title>
            <h1 class="font-bold text-2xl mb-2">Clientes</h1>
        </template>
        <template #header>
            <n-breadcrumb>
                <n-breadcrumb-item>Home</n-breadcrumb-item>
                <n-breadcrumb-item>Clientes</n-breadcrumb-item>
            </n-breadcrumb>
        </template>

        <template #extra>
            <n-space>

                <UploadPathFiles />

                <n-button type="primary" :size="'large'" @click="$router.push({ name: 'client_new' })">
                    <Icon icon="flowbite:user-add-solid" class="text-white w-5 h-5" />
                    Criar Clientes
                </n-button>

                <n-dropdown :options="options" placement="bottom-start">
                    <n-button :bordered="false" style="padding: 0 4px">
                        ···
                    </n-button>
                </n-dropdown>
            </n-space>
        </template>

    </n-page-header>

    <section class="bg-white shadow rounded">
        <!-- TABLE -->
        <div class="relative overflow-x-auto bg-white shadow rounded">
            <div v-if="!load && clients && clients.data.length > 0">
                <n-data-table :bordered="true" :single-line="false" :columns="[
                    { title: 'Nome', key: 'name' },
                    { title: 'Email', key: 'email' },
                    { title: 'Documento', key: 'document' },
                    { title: 'Contato', key: 'phone' },
                    {
                        title: 'Ações', key: 'action',
                        render(row) {
                            return [
                                h(
                                    RouterLink,
                                    { to: { name: 'client_show', params: { code: row.code } } },
                                    {
                                        default: () =>
                                            h(
                                                NButton,
                                                { strong: true, size: 'medium', tertiary: true },
                                                {
                                                    default: () => [
                                                        h(Icon, { icon: 'mdi-file-document-outline', style: { marginRight: '8px' } }),
                                                        h('span', 'Detalhes')
                                                    ]
                                                }
                                            )
                                    }
                                )
                            ];
                        }
                    }
                ]" :data="clients.data" />
            </div>
        </div>
        <!-- END TABLE -->

        <div v-if="!load" class="flex justify-center p-6 items-center">
            <TailwindPagination :limit="1" v-if="!load && clients" :data="clients"
                @pagination-change-page="getTransactions" />
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import ClientsService from '@/services/ClientsService';
import { TailwindPagination } from 'laravel-vue-pagination';
import { Icon } from '@iconify/vue';
import UploadPathFiles from '@/components/UploadPathFiles.vue';
import { NButton } from 'naive-ui';
import { RouterLink } from 'vue-router';

const clients = ref(null);
const load = ref(false);

const clientService = new ClientsService();

const getTransactions = async (page = 1) => {
    load.value = true;
    try {
        const { data } = await clientService.getClients(page);
        if (data) clients.value = data;
    } catch {
        clients.value = { data: [] };
    } finally {
        load.value = false;
    }
};

onMounted(() => {
    getTransactions();
});
</script>