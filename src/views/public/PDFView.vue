<template>
    <div>

        <div v-if="loading">
            <div class="flex flex-col items-center justify-center h-screen bg-background">
                <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                <p class="mt-4 text-primary-foreground">Carregando...</p>
            </div>
        </div>

        <div v-else-if="error">Erro: {{ error }}</div>

        <div class="container mx-auto px-4" v-if="chargeData">
            <div id="pdfDownload" class="m-auto bg-gray-50/50 max-w-6xl p-5 rounded-xl">

                <div class="mb-3 rounded-lg bg-primary border text-white bg-card text-card-foreground shadow-sm"
                    data-v0-t="card">
                    <div class="flex flex-col space-y-1.5 p-6 px-7">
                        <h3
                            class="mb-3 whitespace-nowrap text-white text-4xl font-semibold leading-none tracking-tight">
                            {{ chargeData.account.name }}</h3>
                        <p class="mb-3 text-xl text-muted-foreground">{{ chargeData.account.email }}</p>
                        <p v-if="chargeData.account.document" class="mb-3 mt-2 text-xl text-muted-foreground">{{
                            chargeData.account.document }}</p>
                    </div>
                </div>

                <div class="mb-3 rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                    <div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full"></div>
                    <div class="space-y-1.5 p-6 px-7 grid gap-1">
                        <h2 class="mb-4 text-lg font-semibold">Dados do Pagador:</h2>
                        <div class="flex items-center justify-between">
                            <div>
                                <div v-if="chargeData.client.name">{{ chargeData.client.name }}</div>
                                <div v-if="chargeData.client.email">{{ chargeData.client.email }}</div>
                                <div v-if="chargeData.client.document">{{ chargeData.client.document }}</div>
                            </div>
                            <div>
                                <div v-if="chargeData.due_date">Vencimento: {{
                                    moment(chargeData.due_date).format('DD/MM/Y') }}</div>
                                <div v-if="chargeData.value">Valor Total: {{
                                    FormatMonetaryValue(chargeData.value) }}</div>
                            </div>
                        </div>
                    </div>
                </div>



                <div v-if="chargeData.payment.boleto"
                    class="rounded-lg  p-6 border bg-card text-card-foreground shadow-sm">
                    <div>
                        <div id="invoice-billet">
                            <h2 class="mb-4 text-xl font-semibold">Boleto Bancário</h2>
                            <hr>
                            <div class="flex w-full">
                                <div
                                    class="flex flex-1 items-center border-b border-l border-r p-2 text-lg tracking-wide">
                                    {{
                                        chargeData.payment.boleto.digitableLine }}</div>
                            </div>

                            <div class="flex border-b border-l">
                                <div class="mr-2 flex-1 pb-2 pl-3 pt-1"><span class="text-sm text-gray-400">LOCAL DE
                                        PAGAMENTO</span>
                                    <div>Pagável em qualquer banco ou lotérica.</div>
                                </div>
                                <div class="ml-2 w-[160px] border-l border-r pt-1"><span
                                        class="text-sm text-gray-400">NOSSO NÚMERO</span>
                                    <div>{{ chargeData.id }}</div>
                                </div>
                            </div>
                            <div class="flex border-b border-l">
                                <div class="flex-1 pb-2 pl-3 pt-1">
                                    <div class="flex gap-10">

                                        <div>
                                            <span class="text-sm text-gray-400">BENEFICIÁRIO</span>
                                            <div class="flex flex-col">
                                                <span>{{ chargeData.account.name }}</span>
                                                <span>{{ chargeData.account.document }}</span>
                                            </div>
                                        </div>

                                        <div class="pl-20"><span class="text-sm text-gray-400">SACADOR/AVALISTA</span>
                                            <div class="flex flex-col">
                                                <span>{{ chargeData.client.name }}</span>
                                                <span>{{ chargeData.client.document }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-[160px] border-l border-r pt-1"><span
                                        class="text-sm text-gray-400">VENCIMENTO</span>
                                    <div>{{ moment(chargeData.due_date).format('DD/MM/Y') }}</div>
                                </div>
                            </div>


                            <div class="flex border-b border-l">
                                <div class="flex-1 pb-2 pl-3 pt-1">
                                    <span class="text-sm text-gray-400">INSTRUÇÕES</span>
                                    <div v-if="chargeData.instructions">{{ chargeData.instructions }}</div>
                                </div>
                                <div class="w-[160px] border-l border-r pt-1"><span class="text-sm text-gray-400">VALOR
                                        DO DOC.</span>
                                    <div>{{ FormatMonetaryValue(chargeData.value) }}</div>
                                </div>
                            </div>

                            <div class="flex border-b border-l border-r">
                                <div class="w-[160px] border-l pb-8 pl-3 pt-1">
                                    <span class="text-sm text-gray-400">Detalhes</span>
                                    <div v-if="chargeData.details">{{ chargeData.details }}</div>
                                </div>
                            </div>

                            <div class="flex border-b border-l">
                                <div class="flex-1 pb-2 pl-3 pt-1"><span class="text-sm text-gray-400">CLIENTE</span>
                                    <div class="flex flex-col"><span>{{ chargeData.client.name }}</span><span>{{
                                        chargeData.client.document }}</span></div>
                                </div>
                                <div class="w-[160px] border-l border-r pt-1"><span
                                        class="text-sm text-gray-400">MULTA/JUROS</span></div>
                            </div>

                            <div class="mt-4 flex flex-col items-center justify-center pt-2">
                                <div class="text-gray-400">Use este código de barras para pagamentos no bankline
                                </div>
                                <div class="cursor-pointer" @click="copyBarcode">{{
                                    chargeData.payment.boleto.digitableLine }}</div>
                                <BarcodeComponent v-if="chargeData && chargeData.payment && chargeData.payment.boleto"
                                    :value="chargeData.payment.boleto.barcode" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div>
                <button @click="generatePDF()">generatePDF</button>
            </div>
        </div>
    </div>
</template>


<script setup>

import Toast from '@/boot/Toast'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import GeneralButton from '@/components/GeneralButton.vue'
// import { FormatMonetaryValue } from '../../utils/FormatMonetaryValue'
import { globalVars } from '@/boot/config';
import axios from 'axios'
import moment from 'moment';
import { FormatMonetaryValue } from '@/utils/FormatMonetaryValue';
import BarcodeComponent from '@/components/BarcodeComponent.vue';
import html2pdf from 'html2pdf.js'
import { theme } from '@/services/Thema';

const chargeData = ref(null)
const loading = ref(true)
const error = ref(null)
const route = useRoute()



const copyBarcode = () => {
    const barcodeText = chargeData.value.payment.boleto.barcode
    navigator.clipboard.writeText(barcodeText)
        .then(() => {
            Toast.run('info', 'Copiado para a área de transferência')
        })
        .catch(() => {
            Toast.run('error', 'Falha ao copiar o código de barras para a área de transferência')
        })
}

const fetchChargeData = async () => {
    try {
        const chargeId = route.params.code
        const response = await axios.get(`${globalVars.API_URL}public/charge?code=${chargeId}`)
        chargeData.value = response.data.charge
        Toast.run('success', response.data.message);
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

function generatePDF() {
    var element = document.getElementById('pdfDownload');

    var opt = {
        margin: 0,
        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 0.20 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().from(element).set(opt).save();
}

onMounted(() => {
    fetchChargeData()
})

</script>