<template>

    <section class="my-4 bg-white rounded-xl shadow p-5 md:p-10 h-auto">

        <n-page-header class="mb-5">
            <template #title>
                <h1 class="font-bold text-2xl mb-2">Cobranças</h1>
            </template>

            <template #extra>
                <n-space>
                    <n-input size="large" maxlength="50" v-model:value="form.search" show-count id="description"
                        :minlength="3" placeholder="Pesquisa (cpf/cnpj, nome, email...)"
                        @keyup.enter="fetchChargeDataSearch" />
                    <n-button class="mx-2" type="primary" :size="'large'"
                        @click="$router.push({ name: 'new_cobrancas' })">
                        <Icon icon="gala:add" class="m-1 text-white w-5 h-5" />
                        <span class="m-1">Criar Cobrança</span>
                    </n-button>

                    <Icon @click="showModalFilter = !showModalFilter" class="w-8 h-8" icon="mdi:filter" />
                    <n-dropdown v-if="false" :options="options" placement="bottom-start">
                        <n-button :bordered="false" style="padding: 0 4px">
                            ···
                        </n-button>
                    </n-dropdown>
                </n-space>
            </template>

            <template #footer>
                Resume seus recebimentos recentes e previstos. A tabela detalha transações com informações de cliente,
                status, valor, forma de pagamento e vencimento. Os dados atualizam automaticamente ao carregar a página.
            </template>

        </n-page-header>

        <n-drawer v-model:show="showModalFilter" preset="card" :width="502" size="huge">
            <n-drawer-content title="Filtro Cobranças:">

                <n-space align="center">
                    Status:
                    <n-radio-group v-model:value="form.status_id" name="radiobuttongroup1">
                        <n-radio-button v-for="song in songs" :key="song.value" :value="song.value"
                            :label="song.label" />
                    </n-radio-group>
                </n-space>
                <n-divider />
                <n-space align="center">Cliente: <n-select :loading="clientsDataIsLoading" size="large"
                        v-model:value="form.client_id" filterable placeholder="Insira CPF ou CNPJ"
                        :options="clientsData" clearable remote @search="fetchClienteData" /></n-space>
                <n-divider />
                <n-space align="center">Vencimento:
                    <n-date-picker v-model:value="form.due_date" type="daterange" clearable />
                </n-space>
                <n-divider />

                <n-space align="center">Tag(Split):
                    <n-select :loading="TagsDataIsLoading" size="large" v-model:value="form.tag_id" filterable
                        placeholder="Por favor selecione a Tag" :options="tagsData" clearable remote
                        @search="fetchTagsData" />

                </n-space>
                <n-divider />

                <template #footer>
                    <n-form-item class="flex justify-end">
                        <n-button class="ml-1" type="warning" @click="resetFilters">Limpar Filtros</n-button>
                        <n-button class="ml-1" type="primary" @click="fetchChargeDataSearch">Pesquisar</n-button>
                    </n-form-item>
                </template>

            </n-drawer-content>

        </n-drawer>

        <n-space v-if="checkedRowKeys && checkedRowKeys.length"
            class="mt-4 bg-primary p-4 rounded-md text-white flex items-center">
            {{ checkedRowKeys.length }} Selecionado{{ checkedRowKeys.length < 2 ? '' : 's' }}. <n-button type="info"
                @click="notifica" v-if="false">Notificar Pagamentos</n-button>

                <n-button type="warning" :size="'large'" @click="exportData = true">
                    <Icon icon="mdi:file-export" class="m-1 text-white w-5 h-5" /> Exportar
                </n-button>

                <n-modal v-model:show="exportData">
                    <n-card style="width: 600px" title="Exportar Tabela" :bordered="false" size="huge" role="dialog"
                        aria-modal="true">
                        <n-space vertical>
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="description">Tipo de Arquivo</label>
                            <n-select v-model:value="methodExport" size="large" :options="optionsExport" />
                        </n-space>
                        <template #footer>
                            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                                <n-button type="default" @click="exportData = false">Cancelar</n-button>
                                <n-button type="primary" :loading="loadExport"
                                    @click="exportDocument">Exportar</n-button>
                            </div>
                        </template>
                    </n-card>
                </n-modal>

                <n-button type="info" size="large" @click="showModal = true">
                    <Icon icon="mdi:bell" class="m-1 text-white w-5 h-5" /> Notificar Usuário
                </n-button>

                <n-modal v-model:show="showModal">
                    <n-card style="width: 600px" title="Notificar Usuários" :bordered="false" size="huge" role="dialog"
                        aria-modal="true">
                        <n-space vertical>
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="description">Mensagem</label>
                            <n-input type="textarea" v-model:value="formBaseNotification.message"
                                placeholder="Digite sua mensagem aqui..." rows="2" :resize="false" />
                            <div>
                                <n-tag class="ml-1 my-2" :key="key" v-for="(tag, key) in openModal(checkedRowKeys)"
                                    closable type="success" size="large" @close="removeTag(key)" round>
                                    <pre>{{ tag }}</pre>
                                </n-tag>
                            </div>

                        </n-space>
                        <template #footer>
                            <div style="display: flex; justify-content: flex-end; gap: 10px;">
                                <n-button type="default" @click="showModal = false">Cancelar</n-button>
                                <n-button type="primary" :loading="loadExport" @click="notifica">Enviar
                                    Emails</n-button>
                            </div>
                        </template>
                    </n-card>
                </n-modal>

        </n-space>

        <n-space vertical :size="12">
            <n-data-table ref="tableRef" :row-key="rowKey" v-model:checked-row-keys="checkedRowKeys"
                style="white-space: pre;" :loading="isLoading" remote
                v-if="!isLoading && chargesData && chargesData.data" :bordered="false" :columns="columns"
                :data="chargesData.data" :pagination="pagination" @update:page="fetchChargeData" />
        </n-space>

        <n-skeleton v-if="isLoading" :repeat="5" class="h-5 mb-3" />

    </section>

</template>

<script setup>
import Charges from '@/services/Charges'
import Toast from '@/boot/Toast'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import ClientsService from '@/services/ClientsService';
import moment from 'moment';
import { currencyBR } from '../utils/FormatMonetaryValue';
import { h } from 'vue';
import { NButton } from 'naive-ui';
import { useNotification } from 'naive-ui'
import TagService from '@/services/TagService';
import axios from 'axios';

const chargesService = new Charges()
const notification = useNotification()
const showModalFilter = ref(false)
const chargesData = ref(null)
const isLoading = ref(true)
const checkedRowKeys = ref([]);
const exportData = ref(false);

const rowKey = (row) => row.id

import { RouterLink } from 'vue-router';

const clientsData = ref(null)
const clientsDataIsLoading = ref(true)
const tagsData = ref(null);
const TagsDataIsLoading = ref(true);
const formBaseNotification = ref({
    message: ""
});
const tagsService = new TagService();


function openModal(data = null) {
    const newList = [];
    data.forEach(item => {
        const exists = chargesData.value.data.find(charge => charge.id === item);
        if (exists) {
            newList.push({ ...exists });
        }
    });
    return data;
}

const fetchTagsData = async (query = null) => {
    TagsDataIsLoading.value = true;
    try {
        const { data } = await tagsService.listTags(1, query);
        tagsData.value = data.data.map((tag) => {
            return {
                label: tag.name,
                value: tag.id
            };
        });
        console.log(tagsData.value);
    } catch (err) {
        console.error(err);
        notification.error({
            title: 'Erro',
            content: 'Não foi possível carregar as tags. Por favor, tente novamente mais tarde.'
        });
    } finally {
        TagsDataIsLoading.value = false;
    }
};


const options = [
    // {
    //     label: 'Importar Cobranças de Arquivo',
    //     key: '1'
    // }
]


const loadExport = ref(false);
const showModal = ref(false);
const methodExport = ref('');
const optionsExport = [
    {
        label: "CSV",
        value: "csv"
    }, {
        label: "Excel",
        value: "excel"
    }
]


const tableRef = ref();

const exportDocument = () => {
    loadExport.value = true;

    if (chargesData.value && chargesData.value.data && chargesData.value.data.length > 0 && methodExport.value) {
        const dataRequest = chargesData.value.data.map((charge) => {
            return {
                id: charge.id,
                code: charge.code,
                tag: charge?.tag?.name ?? "",
                status: charge.status.description,
                metodo: charge.paymentMethods,
                valor: charge.value,
                data_de_pagamento: moment(charge.updated_at).format('DD-MM-YY'),
                criacao: moment(charge.updated_at).format('DD-MM-YY'),
                vencimento: moment(charge.created_at).format('DD-MM-YY'),
                detalhes: charge.details,
                cliente_id: charge.client.id,
                cliente_nome: charge.client.name,
                cliente_email: charge.client.email,
                cliente_telefone: charge.client.phone,
                cliente_document: charge.client.document
            };
        });

        axios.post('https://upload.hackingmake.com.br/export', {
            format: methodExport.value,
            data: dataRequest,
        })
            .then(({ data }) => {
                const downloadUrl = data.file_path;
                notification.success({
                    content: 'Arquivo baixado com sucesso.',
                    duration: 2500,
                });
                exportData.value = false;
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
                loadExport.value = false;
            });
    } else {
        notification.error({
            content: 'Nenhum dado disponível para exportar.',
            duration: 2500,
        });
        loadExport.value = false;
    }
};

const notifica = async () => {
    try {
        console.log(checkedRowKeys.value);
        chargesService.notifyEmails({
            "charges": checkedRowKeys.value,
            "message": formBaseNotification?.value?.message ?? ""
        })
            .then(({ data }) => {
                console.log(data); Toast.run('success', data.message)
            }).catch(({ response }) => {
                console.log(response.data);
                notification.error({
                    title: 'Erro ao Notificar Usuários.',
                    content: response?.data?.message || 'Falha ao criar link',
                    duration: 2500
                });
            })

    } catch (error) {
        notification.error({
            title: 'Erro ao Notificar',
            content: error?.message,
            duration: 3000
        })
    }
}

const pagination = {
    page: 1,
    pageCount: 1,
    pageSize: 10,
    pageSizes: [10, 20, 100, 1000],
    showSizePicker: true,
    onChange: (page) => {
        pagination.page = page
        fetchChargeData(pagination.page)
    },
    onUpdatePageSize: (pageSize) => {
        pagination.pageSize = pageSize
        pagination.page = 1
        fetchChargeData(pagination.page, pagination.pageSize)
    }
}

const columns = [
    {
        type: "selection",
        options: [
            "all",
            "none"
        ]
    },
    {
        title: '#',
        key: 'id'
    }, {
        title: 'Nome (Cliente)',
        key: 'row.client.name',
        render(row) {
            return `${row?.client?.name} / ${row?.client?.email}`;
        }
    },
    {
        title: 'Status',
        key: 'status.description'
    },
    {
        title: 'Valor',
        key: 'value',
        render(row) {
            return currencyBR(row.value);
        }
    }, {
        title: 'Pagamento',
        key: 'paymentMethods'
    },
    {
        title: 'Vencimento',
        key: 'due_date',
        render(row) {
            return row?.due_date ? moment(row.due_date).format('DD/MM/Y') : '';
        }
    },
    // {
    //     title: 'Criação',
    //     key: 'created_at',
    //     render(row) {
    //         return moment(row.created_at).format('DD/MM/Y');
    //     }
    // },
    // {
    //     title: 'Atualização',
    //     key: 'updated_at',
    //     render(row) {
    //         return moment(row.updated_at).format('DD/MM/Y');
    //     }
    // },


    {
        title: 'Tag',
        key: 'tag',
        render(row) {
            return row?.tag?.name;
        }
    },
    {
        title: "ações",
        key: "action",
        render(row) {
            return [
                h(
                    RouterLink,
                    {
                        to: { name: 'show_cobrancas', params: { code: row.code } },
                    },
                    {
                        default: () =>
                            h(
                                NButton,
                                {
                                    strong: true,
                                    size: "medium",
                                    tertiary: true,
                                },
                                {
                                    default: () => [
                                        h(Icon, { icon: "mdi-file-document-outline", style: { marginRight: '8px' } }),
                                        h('span', "Detalhes")
                                    ]
                                }
                            )
                    }
                )
            ];
        }
    }

]



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


const fetchChargeData = async (page = 1, per_page = 10) => {
    isLoading.value = true
    try {
        pagination.page = page
        const response = await chargesService.getCharges(pagination.page, per_page)
        pagination.pageCount = response.data.last_page
        pagination.pageSize = response.data.to
        chargesData.value = response.data
    } catch (err) {
        Toast.error('Erro ao buscar os dados do Cobranças.')
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const form = ref({
    search: '',
    status_id: '',
    tag_id: '',
    client_id: '',
    due_date: null,

    due_date_start: '',
    due_date_end: null,
});

const fetchChargeDataSearch = async () => {
    isLoading.value = true
    try {
        const formattedForm = { ...form.value };

        if (form.value.due_date) {
            formattedForm.due_date_start = moment(form.value.due_date[0]).format('YYYY-MM-DD');
            formattedForm.due_date_end = moment(form.value.due_date[1]).format('YYYY-MM-DD');
        }

        Object.keys(formattedForm).forEach(key => {
            if (formattedForm[key] === '' || formattedForm[key] == null) {
                delete formattedForm[key];
            }
        });

        const response = await chargesService.getCharges(pagination.page, pagination.pageSize, formattedForm)
        pagination.pageCount = response.data.last_page
        chargesData.value = response.data
        showModalFilter.value = false
    } catch (err) {
        console.log(err)
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const resetFilters = () => {
    showModalFilter.value = false;
    form.value.search = '';
    form.value.status_id = '';
    form.value.client_id = '';
    form.value.due_date = null;
    fetchChargeData()
};

const songs = [
    {
        value: 1,
        label: "Pendente"
    },
    {
        value: 2,
        label: "Pago"
    },
    {
        value: 3,
        label: "Expirado"
    }
];

onMounted(() => {
    fetchClienteData()
    fetchTagsData();
    fetchChargeData()
})

</script>
