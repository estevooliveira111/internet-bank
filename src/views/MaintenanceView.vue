<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <Icon icon="mdi:settings" class="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Painel em Manutenção</h1>
            <p class="text-gray-600 mb-6">
                Estamos realizando algumas melhorias. Voltaremos em breve!
            </p>
            <div class="flex justify-center space-x-4 text-sm">
                <div v-if="days > 0">
                    <span class="font-bold text-lg">{{ days }}</span>
                    <p>Dias</p>
                </div>
                <div>
                    <span class="font-bold text-lg">{{ hours }}</span>
                    <p>Horas</p>
                </div>
                <div>
                    <span class="font-bold text-lg">{{ minutes }}</span>
                    <p>Minutos</p>
                </div>
                <div>
                    <span class="font-bold text-lg">{{ seconds }}</span>
                    <p>Segundos</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

const getNextMonday8AM = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado
    const daysUntilNextMonday = (dayOfWeek === 1 && now.getHours() < 8) ? 0 : (8 - dayOfWeek) % 7;

    const nextMonday = new Date();
    nextMonday.setDate(now.getDate() + daysUntilNextMonday);
    nextMonday.setHours(8, 0, 0, 0); // Definir para 8h da manhã na próxima segunda-feira

    return nextMonday;
};

// Definir o tempo de término para 8h da próxima segunda-feira
const targetTime = getNextMonday8AM().getTime();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const timeLeft = targetTime - now;

    if (timeLeft > 0) {
        days.value = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        hours.value = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes.value = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        seconds.value = Math.floor((timeLeft % (1000 * 60)) / 1000);
    } else {
        clearInterval(interval);
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
    }
};

let interval;

onMounted(() => {
    calculateTimeLeft(); // Executa imediatamente
    interval = setInterval(calculateTimeLeft, 1000); // Atualiza a cada segundo
});

onBeforeUnmount(() => {
    clearInterval(interval); // Limpa o intervalo ao desmontar
});
</script>
