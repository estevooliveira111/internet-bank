<template>

    <n-page-header class="mb-4" title="Detalhes de Tags" subtitle="Informações e detalhes sobre Tags da conta" />

    <form v-if="tagData" @submit.prevent="handleSubmit">
        <n-card bordered class="rounded-lg border bg-white text-card-foreground shadow-sm w-full">

            <n-space vertical>

                <n-descriptions label-placement="left">
                    <n-descriptions-item>
                        <template #label>ID</template>
                        <p class="font-medium">{{ tagData.id }}</p>
                    </n-descriptions-item>
                    <n-descriptions-item label="Codigo">
                        <p class="font-medium">{{ tagData.code }}</p>
                    </n-descriptions-item>
                    <n-descriptions-item label="criação">
                        <p class="font-medium">{{ moment(tagData.created_at).format('HH:mm:ss   DD/MM/YYYY') }}</p>
                    </n-descriptions-item>
                </n-descriptions>

                <n-card class="mb-5" :bordered="true" title="Informações Gerais" size="medium">
                    <div class="mb-4">
                        <label class="font-semibold text-sm" for="">Nome</label>
                        <n-input v-model:value="formData.name" type="text" placeholder="Nome da Tag"
                            :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        <label class="text-xs">Nome usado como identificador para pesquisa e atribuição para pix, boleto
                            e
                            cobranças.</label>
                    </div>

                    <div class="mb-4">
                        <label class="font-semibold text-sm" for="">Descrição das Tags</label>
                        <n-input maxlength="150" show-count v-model:value="formData.description" type="textarea"
                            placeholder="Descrição (opcional)" :size="'large'" />
                    </div>
                </n-card>

                <n-card class="mb-5" bordered title="Informações da Tela de Pagamento/Boleto" size="medium">
                    <div class="mb-4">
                        <label class="font-semibold text-sm" for="">Instruções do Pagamento</label>
                        <n-input maxlength="150" show-count v-model:value="formData.instructions" type="textarea"
                            :size="'large'" />
                    </div>

                    <div class="mb-4">
                        <label class="font-semibold text-sm" for="">Detalhes</label>
                        <n-input maxlength="150" show-count v-model:value="formData.details" type="textarea"
                            :size="'large'" />
                    </div>
                </n-card>

                <n-card class="mb-5" title="Split de Contas" size="large">
                    <n-dynamic-input v-model:value="formData.split" :on-create="onCreate">
                        <template #create-button-default>
                            Adicionar Conta para Splitar Valor
                        </template>
                        <template #default="{ value }">
                            <div style="display: flex; align-items: center; width: 100%">
                                <n-input-number aria-required="true" v-model:value="value.percentage" :min="1" :max="100" style="margin-right: 12px; width: 160px">
                                    <template #suffix>%</template>
                                </n-input-number>
                                <n-select v-model:value="value.account" filterable placeholder="Por favor selecione uma conta" :options="accountsList" clearable :loading="isLoadingAccounts" remote @search="onSearchAccount" />
                            </div>
                        </template>
                    </n-dynamic-input>
                </n-card>

            </n-space>

            <div class="flex justify-end mt-4">
                <n-button type="primary" :size="'large'" :attr-type="'submit'" :loading="isLoading">Salvar</n-button>
            </div>

        </n-card>
    </form>
    <n-skeleton v-else text :repeat="6" />

</template>


<script setup>
import { onMounted, ref } from 'vue';
import Toast from '@/boot/Toast';
import TagService from '@/services/TagService';
import Account from '@/services/Account';
import { useRoute } from 'vue-router';
import moment from 'moment';
import router from '@/router';


const accountsList = ref([]);
const isLoadingAccounts = ref(false);
const tagData = ref(null);
const formData = ref({
    name: '',
    description: '',
    instructions: '',
    details: '',
    split: []
});

const onCreate = () => {
    return {
        percentage: 1,
        account: ''
    }
}

const handleSubmit = async () => {
    console.log(formData.value);

    isLoading.value = true;
    try {
        const data = {
            name: formData.value.name,
            description: formData.value.description || '',
            instructions: formData.value.instructions || '',
            details: formData.value.details || '',
            split: formData.value.split || []
        };
        const response = await (new TagService()).updateTag(tagData.value.id, data);
        console.log('Tag criada com sucesso:', response.data);
        Toast.run('success', response.data.message);
        return router.push({ name: 'settings-split'});
    } catch (error) {
        console.error('Erro ao criar tag:', error);
        Toast.run(
            'error',
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Houve um erro, tente novamente mais tarde'
        );
    } finally {
        isLoading.value = false;
    }
};


const isLoading = ref(false);
const route = useRoute();
const id = route.params.code;
onMounted(() => {
    isLoading.value = true;
    (new TagService).getTag(id)
        .then(({ data }) => {
            console.log(data);
            formData.value.name = data.tag.name;
            formData.value.description = data.tag.description;
            formData.value.details = data.tag.details;
            formData.value.instructions = data.tag.instructions;
            formData.value.split = data.tag.split;
            tagData.value = data.tag;
        })
        .catch((error) => {
            console.error("Erro ao buscar dados:", error);
            Toast.run(
                'error',
                error.response?.data?.message ||
                error.response?.data?.error ||
                'Houve um erro, tente novamente mais tarde'
            );
        })
        .finally(() => {
            isLoading.value = false;
        });
});

const onSearchAccount = async (query) => {
    console.log(query);
    isLoadingAccounts.value = true;
    try {
        const reponse = await new Account().fetchAccounts(query);
        console.log(reponse);
        accountsList.value = [{
            label: reponse.conta.name,
            value: reponse.conta.code_account
        }];
    } catch (error) {
        console.error('Erro ao carregar contas:', error);
    } finally {
        isLoadingAccounts.value = false;
    }
}

</script>

