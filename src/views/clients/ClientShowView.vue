<template>
    <div class="rounded-lg border bg-white text-card-foreground shadow-sm w-full">
        <div class="flex flex-col space-y-1.5 p-6">
            <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                {{ id ? 'Atualizar Cliente' : 'Criar Clientes' }}
            </h3>
            <p class="text-sm text-muted-foreground">
                {{ id ? 'Atualizar Informações de Cliente' : 'Crie clientes com informações detalhadas...' }}
            </p>
        </div>

        <div class="p-6">
            <form @submit.prevent="handleSubmit">
                <n-space vertical>
                    <h4 class="text-lg font-semibold mb-4">Informações Gerais:</h4>

                    <div class="mb-4">
                        <label for="document" class="form-label">CPF/CNPJ <span class="text-red-600">*</span></label>
                        <n-input id="document" v-model:value="formData.document" type="text"
                            v-mask="['###.###.###-##', '##.###.###/####-##']" placeholder="CPF/CNPJ"
                            :attr-required="true" :attr-aria-required="true" :size="'large'" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="mb-4">
                            <label for="name" class="form-label">Nome do Cliente <span
                                    class="text-red-600">*</span></label>
                            <n-input id="name" v-model:value="formData.name" type="text" placeholder="Nome"
                                :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        </div>

                        <div class="mb-4">
                            <label for="phone" class="form-label">Telefone</label>
                            <n-input id="phone" v-model:value="formData.phone" type="text"
                                placeholder="(DDD) 99999-9999" v-mask="'(##) #####-####'" :size="'large'" />
                        </div>

                        <div class="mb-4">
                            <label for="email" class="form-label">Email <span class="text-red-600">*</span></label>
                            <n-input id="email" v-model:value="formData.email" type="email" placeholder="Email"
                                :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        </div>
                    </div>
                </n-space>

                <n-divider />

                <n-space v-if="id" vertical class="mt-5">
                    <h4 class="text-lg font-semibold mb-4">Endereço</h4>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="mb-4">
                            <label for="postal_code" class="form-label">CEP</label>
                            <n-input id="postal_code" v-model:value="formData.postal_code" type="text" placeholder="CEP"
                                v-mask="'#####-###'" :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        </div>

                        <div class="mb-4">
                            <label for="state" class="form-label">Estado</label>
                            <n-input id="state" v-model:value="formData.state" type="text" placeholder="Estado"
                                :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        </div>

                        <div class="mb-4">
                            <label for="city" class="form-label">Cidade</label>
                            <n-input id="city" v-model:value="formData.city" type="text" placeholder="Cidade"
                                :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        </div>

                        <div class="mb-4">
                            <label for="street" class="form-label">Rua</label>
                            <n-input id="street" v-model:value="formData.street" type="text" placeholder="Rua"
                                :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        </div>

                        <div class="mb-4">
                            <label for="number" class="form-label">Número</label>
                            <n-input id="number" v-model:value="formData.number" type="text" placeholder="Número"
                                :attr-required="true" :attr-aria-required="true" :size="'large'" />
                        </div>
                    </div>
                </n-space>

                <div class="flex justify-end mt-4">
                    <n-button type="primary" :attr-type="'submit'" :loading="load">
                        Salvar
                    </n-button>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup>
import ClientsService from '@/services/ClientsService';
import Toast from '@/boot/Toast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = ref(route.params.code);

onMounted(async () => {
    if (id.value) {
        try {
            const { data } = await (new ClientsService()).getClient(id.value);
            formData.value = data.client;
            console.log(data.client)
        } catch (error) {
            console.error("Failed to fetch client: ", error);
        }
    }
});

const load = ref(false);
const formData = ref({
    document: '',
    name: '',
    phone: '',
    email: '',
    postal_code: '',
    city: '',
    state: '',
    number: '',
    street: '',
    id: ''
});

async function handleSubmit() {
    load.value = true;
    formData.value.document = formData.value.document.replace(/\D+/g, '');
    try {
        if (id.value) {
            console.log(formData.value);
            const response = await (new ClientsService()).updateClient(id.value, formData.value);
            console.log(response);
        } else {
            const response = await (new ClientsService()).createClient(formData.value);
            console.log(response);
        }
        await router.push({ name: 'client' });
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Houve um erro, tente novamente mais tarde';
        const errorDetails = error?.response?.data?.details || {};
        let fullErrorMessage = errorMessage;
        Object.entries(errorDetails).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
                fullErrorMessage += `\n${field}: ${messages.join(', ')}`;
            }
        });
        Toast.run('error', fullErrorMessage);
    } finally {
        load.value = false;
    }
}

</script>
