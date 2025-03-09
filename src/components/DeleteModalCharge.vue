<template>
    <n-button type="error" @click="showModal = true">
        <Icon icon="ph:trash-fill" class="ml-2" width="24" height="24" />
    </n-button>

    <n-modal 
        v-model:show="showModal" 
        :mask-closable="false" 
        preset="dialog" 
        title="Confirmação" 
        content="Você tem certeza que deseja excluir essa cobrança?"
        :loading="loading"
        positive-text="Confirmar" 
        negative-text="Cancelar" 
        @positive-click="deleteCharge"
        @negative-click="showModal = false" 
    />

</template>

<script setup>
import { ref, defineProps } from 'vue';
import { Icon } from '@iconify/vue';
import { useNotification } from 'naive-ui';
import Charges from '@/services/Charges';
import { useRouter } from 'vue-router';

const notification = useNotification();
const router = useRouter();

const props = defineProps({
    code: {
        type: String,
        required: true
    }
});

const showModal = ref(false);
const loading = ref(false);

const deleteCharge = async () => {
    loading.value = true; 
    try {
        const { data } = await new Charges().deleteCharge(props.code);
        showModal.value = false;

        notification.success({
            title: 'Sucesso',
            content: data.message || 'Cobrança excluída com sucesso!',
            duration: 3000
        });

        router.push({ name: 'cobrancas' });
    } catch (error) {
        console.error(error);
        notification.error({
            title: 'Erro',
            content: 'Não foi possível excluir a cobrança. Por favor, tente novamente mais tarde.',
            duration: 3000
        });
    } finally {
        loading.value = false;
    }
};
</script>