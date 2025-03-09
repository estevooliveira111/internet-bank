<template>
    <div class="rounded-lg border bg-white text-card-foreground shadow-sm w-full">
        <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Criar nova Tag
            </h3>
            <p class="text-sm text-muted-foreground">
                Crie várias divisões de despesas com porcentagens.
            </p>
        </div>

        <div class="p-6">
            <form @submit.prevent="handleSubmit">
                <n-space vertical>
                    <n-input v-model:value="formData.name" type="text" placeholder="Nome da Tag" :attr-required="true"
                        :attr-aria-required="true" :size="'large'" class="mb-4" />
                    <n-input maxlength="150" show-count v-model:value="formData.description" type="textarea"
                        placeholder="Descrição (opcional)" :size="'large'" />
                </n-space>

                <div class="flex justify-end mt-4">
                    <n-button type="primary" :attr-type="'submit'" :loading="isLoading">Salvar</n-button>
                </div>
            </form>
        </div>
    </div>

</template>



<script setup>
import { ref } from 'vue';
import TagService from '@/services/TagService';
import router from '@/router';
import Toast from '@/boot/Toast';

const isLoading = ref(false);
const formData = ref({
    name: '',
    description: ''
});

const handleSubmit = async () => {
    isLoading.value = true;
    try {
        const data = {
            name: formData.value.name,
            description: formData.value.description || ''
        };
        const response = await (new TagService()).addTag(data);
        console.log('Tag criada com sucesso:', response.data);
        Toast.run('success', response.data.message);
        formData.value.name = '';
        formData.value.description = '';
        return router.push({ name: 'settings-split-info', params: { code: response.data.data.code } });
    } catch (error) {
        console.error('Erro ao criar tag:', error);
        Toast.run(
            'error',
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Houve um erro, tente novamente mais tarde'
        );
    } finally {
        isLoading.value = false; // Desativa o indicador de carregamento
    }
};
</script>