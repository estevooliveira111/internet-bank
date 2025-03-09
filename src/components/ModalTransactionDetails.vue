<template>

    <button class="btn-base" @click="openModal(transaction.id + 'transaction_information')">{{ buttonMessage }}</button>

    <dialog :id="transaction.id + 'transaction_information'" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <div class="flex justify-between items-start flex-wrap mb-5 md:mb-0 gap-2">
                <h3 class="font-bold text-lg">Detalhes da Transação</h3>
            </div>

            <hr class="my-10 border-gray-500 border">

            <div>
                <ul class="flex flex-col gap-2 mt-8">
                    <li v-if="transaction && transaction.endtoendid">
                        id: <span class="font-bold">{{ transaction.endtoendid }}</span>
                    </li>

                    <li v-if="transaction && transaction.type" class="mt-4">
                        Tipo: <span class="font-bold">{{ transaction.type.name }}</span>
                    </li>
                    <li v-if="transaction && transaction.description">
                        Descrição: <span class="font-bold">{{ transaction.description }}</span>
                    </li>
                    <li v-if="transaction && transaction.created_at">
                        Data:
                        <span class="font-bold">{{
                            moment(transaction.created_at).format('DD/MM/YYYY HH:mm:ss')
                        }}</span>
                    </li>
                    <li v-if="transaction && transaction.created_at">
                        Hora:
                        <span class="font-bold">{{
                            moment(transaction.created_at).format('HH:mm:ss')
                        }}</span>
                    </li>

                    <li v-if="transaction && transaction.details" class="mt-4 font-bold">
                        Pagador
                    </li>
                    <li
                        v-if="transaction && transaction.details && transaction.details.pagador && transaction.details.pagador.nome">
                        Nome:
                        <span class="font-bold">{{ transaction.details.pagador.nome }}</span>
                    </li>
                    <li
                        v-if="transaction && transaction.details && transaction.details.pagador && transaction.details.pagador.conta">
                        Conta:
                        <span class="font-bold">{{ transaction.details.pagador.conta }}</span>
                    </li>
                    <li
                        v-if="transaction && transaction.details && transaction.details.pagador && transaction.details.pagador.agency">
                        Agência:
                        <span class="font-bold">{{ transaction.details.pagador.agency }}</span>
                    </li>
                    <li
                        v-if="transaction && transaction.details && transaction.details.pagador && transaction.details.pagador.documento">
                        Documento:
                        <span class="font-bold">{{ transaction.details.pagador.documento }}</span>
                    </li>


                    <li v-if="transaction.type.id == 7 && transaction.details && transaction.details.splits">
                        <n-list>
                            <template #header>
                                <n-thing title="Detalhes de Split:" />
                            </template>

                            <n-list-item v-for="(split, index) in transaction.details.splits" :key="index"
                                class="split-item">
                                <n-thing :title="`Conta ${split.account}`" title-extra="Detalhes" class="split-header">
                                    <n-list-item class="split-details">
                                        <n-thing description="Porcentagem de Split:" class="detail-item">
                                            {{ split.percentage }}%
                                        </n-thing>
                                        <n-thing description="Valor Real:" class="detail-item">
                                            {{ FormatMonetaryValue(split.detalhes.valorReal) }}
                                        </n-thing>
                                        <n-thing description="Valor Total:" class="detail-item">
                                            {{ FormatMonetaryValue(split.detalhes.valorTotal) }}
                                        </n-thing>
                                    </n-list-item>
                                </n-thing>
                            </n-list-item>
                        </n-list>
                    </li>

                    <li v-if="transaction && transaction.value" class="mt-8 text-2xl">
                        Valor:
                        <span :class="{
                            'bg-red-500/35 px-4  rounded-md py-2 font-bold text-red-500': parseFloat(transaction.value) < 0,
                            'bg-green-500/25 px-4  rounded-md py-2 font-bold text-green-500': parseFloat(transaction.value) > 0,
                            'bg-gray-500/25 px-4  rounded-md py-2 font-bold text-gray-500': parseFloat(transaction.value) == null
                        }" class="font-bold text-black">{{
                            FormatMonetaryValue(parseFloat(transaction.value))
                            }}</span>
                    </li>

                </ul>
            </div>

            <hr class="my-10 border-gray-500 border">

            <div class="modal-action">
                <form method="dialog" class="flex gap-4">
                    <button v-if="transaction.details" class="flex items-center gap-2 hover:text-primary"
                        title="Baixar">
                        <Icon icon="material-symbols:download" class="w-6 h-6" />
                        <p class="text">Baixar</p>
                    </button>
                    <button class="btn">Fechar</button>
                </form>
            </div>
        </div>
    </dialog>

    <div style="display: none">
        <canvas ref="myCanvas" width="500" height="1400"></canvas>
    </div>

</template>

<script>

import moment from 'moment'
import { Icon } from '@iconify/vue'
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue'

export default {
    props: ['transaction', 'buttonMessage'],

    components: { Icon },

    data() {
        return {
            imageSrc: ""
        };
    },

    setup() {
        return {
            // moment,
            FormatMonetaryValue
        }
    },

    methods: {
        moment,
        openModal(id) {
            const modal = document.getElementById(id);
            modal.showModal();
        },

        drawCanvas() {
            const canvas = this.$refs.myCanvas;
            const ctx = canvas.getContext('2d');

            // Desenha algo no canvas (por exemplo, um gradiente)
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "red");
            gradient.addColorStop(1, "blue");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Converte o canvas em uma imagem PNG
            const dataURL = canvas.toDataURL('image/png');

            // Atualiza a imagem src para exibir a imagem gerada
            this.imageSrc = dataURL;
        }

    }

}

</script>


<style scoped>
.split-item {
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
}

.split-header {
    font-weight: bold;
    font-size: 1.1rem;
}

.split-details {
    margin-top: 0.5rem;
}

.detail-item {
    margin-top: 0.25rem;
    font-size: 0.9rem;
}
</style>