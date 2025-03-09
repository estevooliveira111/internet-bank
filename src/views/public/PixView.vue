<template>
    <div class="mt-4">

        <div v-if="loading">
            <div class="flex flex-col items-center justify-center h-screen bg-background">
                <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                <p class="mt-4 text-primary-foreground">Carregando...</p>
            </div>
        </div>

        <div v-else-if="error">Erro: {{ error }}</div>

        <div class="container mx-auto px-4" v-else>

            <div class="mb-3 rounded-lg bg-primary border text-white bg-card text-card-foreground shadow-sm"
                data-v0-t="card">
                <div class="flex flex-col space-y-1.5 p-6 px-7">
                    <h3 class="mb-3 whitespace-nowrap text-white text-4xl font-semibold leading-none break-all">{{ pixData.name }}</h3>
                    <p class="mb-3 text-xl text-muted-foreground">{{ pixData.email }}</p>
                    <p v-if="pixData.document" class="mb-3 mt-2 text-xl text-muted-foreground">{{ pixData.document }}</p>
                </div>
            </div>

            <div class="mb-3 rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full"></div>

                <div class="space-y-1.5 p-6 px-7 grid gap-1">
                    <div class="font-medium">Dados do Pagador:</div>
                    <div>
                        <div v-if="pixData.name">{{ pixData.name }}</div>
                        <div v-if="pixData.email">{{ pixData.email }}</div>
                        <div v-if="pixData.document">{{ pixData.document }}</div>
                    </div>
                </div>
            </div>

            <div class="mb-3 rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div class="flex flex-col space-y-1.5 p-6 px-7">
                    <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Fatura #{{
                        pixData.id*123 }}</h3>
                    <p class="text-sm text-muted-foreground">Detalhes da fatura</p>
                </div>

                <div class="p-6 grid gap-4">
                    <div class="flex items-center justify-between">
                        <div class="text-muted-foreground">Total</div>
                        <div class="font-semibold text-2xl">{{ FormatMonetaryValue(pixData.value) }}</div>
                    </div>
                    <div class="flex items-center justify-center">
                        <img :src="pixData.image" alt="QR Code de Pagamento" width="400" height="400" class="rounded-md"
                            style="aspect-ratio: 400 / 400; object-fit: cover;" />
                    </div>
                    <p class="text-center text-sm break-all">{{ pixData.qrcode }}</p>
                    <GeneralButton :load="false" text="Copiar código" @click="copyQRCode" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

import Toast from '@/boot/Toast'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GeneralButton from '@/components/GeneralButton.vue'
import { FormatMonetaryValue } from '../../utils/FormatMonetaryValue'
import { globalVars } from '@/boot/config';
import axios from 'axios'

const pixData = ref(null)
const loading = ref(true)
const error = ref(null)
const route = useRoute()

const copyQRCode = () => {
    const qrcodeText = pixData.value.qrcode
    navigator.clipboard.writeText(qrcodeText)
        .then(() => {
            Toast.run('success', 'Código copiado para a área de transferência')
        })
        .catch(() => {
            Toast.run('error', 'Falha ao copiar o código para a área de transferência')
        })
}

const fetchPixData = async () => {
    try {
        const pixId = route.params.pix
        const response = await axios.get(`${globalVars.API_URL}public/pix/${pixId}`)
        pixData.value = response.data
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchPixData()
})

</script>
