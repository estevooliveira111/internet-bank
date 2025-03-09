<template>

    <main class="w-full h-full rounded-lg border bg-white text-card-foreground shadow-sm" data-v0-t="card">
        <header class="flex flex-col space-y-4 p-6">
            <div class="flex justify-between">
                <h3 class="text-4xl font-semibold leading-tight tracking-tight">Pix</h3>
            </div>
        </header>


        <div v-if="dataPayments && dataPayments.data && !load" class="p-6 w-full relative overflow-x-auto">
            <n-data-table bordered="true"  title="Pixs" :columns="columns" :data="dataPayments.data" />
        </div>

        <div v-else class="text-center py-6">
            <span className="loading loading-dots loading-lg"></span>
        </div>

        <div v-if="!load && dataPayments" class="flex justify-center p-6 items-center">
            <TailwindPagination :limit="2" v-if="!load && dataPayments" :data="dataPayments"
                @pagination-change-page="fetchTags" />
        </div>

    </main>

    <n-modal v-if="pix" v-model:show="showModal" preset="dialog">
        <h1 class="text-center text-2xl font-medium">Detalhes sobre o Pix</h1>

        <div class="flex justify-center">
            <n-image width="200" :src="pix.image" :previewed-img-props="{ style: { border: '8px solid white' } }" />
        </div>

        <div class="text-center flex flex-col">
            <p class="text-lg">{{ FormatMonetaryValue(pix.value) }}</p>
            <p>{{ pix.qrcode }}</p>
            <p class="mt-4" v-text="moment(pix.image.created_at).format('HH:mm:ss DD/MM/YYYY')" />
        </div>

    </n-modal>


</template>

<script>
import PixService from '@/services/PixService';
import { hasPermission } from '@/mixins/permissions';
import { TailwindPagination } from 'laravel-vue-pagination';
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'
import { NButton } from 'naive-ui';
import { h } from 'vue'
import moment from 'moment';

export default {

    setup() {
        return {
            moment,
            FormatMonetaryValue
        }
    },

    components: {
        TailwindPagination
    },
    data() {
        return {
            load: true,
            showModal: false,
            dataPayments: {},
            pix: null,
            columns: [
                {
                    title: 'ID',
                    key: 'id'
                }, {
                    title: 'Valor',
                    key: 'value'
                },
                {
                    title: 'Status',
                    key: 'status'
                },
                {
                    title: 'TxID',
                    key: 'txid'
                },
                {
                    title: 'Criação de Pix',
                    key: 'created_at',
                },
                {
                    title: 'Action',
                    key: 'actions',
                    // rowSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1),
                    render: (row) => h(
                        NButton,
                        {
                            size: 'small',
                            onClick: () => this.sendMail(row)
                        },
                        { default: () => 'Visualizar' }
                    )
                }



            ]
        };
    },

    created() {
        this.fetchTags();
    },

    methods: {
        async fetchTags(page = 1) {
            this.load = true;
            try {
                const { data } = await new PixService().getPixs(page);
                this.dataPayments = data;
            } catch (error) {
                console.log(error);
            } finally {
                this.load = false;
            }
        },
        hasPermission,

        sendMail(i) {
            console.log(i);
            this.pix = i;
            this.showModal = true
        }

    }
};

</script>
