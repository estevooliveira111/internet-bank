<template>

    <div class="bg-white w-screen font-sans text-gray-900">

        <div class="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div class="mx-2 py-12 text-center md:mx-auto md:w-2/3">
                <h1 class="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">Inscrever-se</h1>
                <div class="text-lg sm:text-xl">
                    <div class="">
                        <p class="mb-4">Vamos fazer isso! Comece seu teste gratuito preenchendo nosso formulário simples
                            abaixo. Você receberá notícias nossas em breve!</p>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
            <form @submit.prevent="handleSubmit" class="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8">

                <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="name">Nome</label>
                    <InputText size="large" class="w-full" id="name" type="name" required v-model="formData.name" />
                </div>

                <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="email">Email</label>
                    <InputText size="large" class="w-full" id="email" type="email" required v-model="formData.email" />
                </div>

                <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="phone">Telefone</label>
                    <InputText size="large" class="w-full" id="phone" type="phone" required v-model="formData.phone" />
                </div>

                <div class="mb-4"><label class="mb-2 block text-sm font-bold" for="document">Documento</label>
                    <InputText size="large" class="w-full" id="document" type="document" required
                        v-model="formData.document" />
                </div>

                <div class="mb-6">
                    <label class="mb-2 flex text-sm">
                        <Checkbox v-model="formData.term" binary size="large" type="checkbox" name="accept" class="mr-2"
                            required />
                        <div class="text-gray-800">
                            <p class="">
                                Aceito os
                                <a href="#" class="cursor-pointer text-primary underline">termos de uso</a>
                                e
                                <a href="#" class="cursor-pointer text-primary underline">política de privacidade</a>
                            </p>
                        </div>
                    </label>
                </div>
                <div class="flex items-center">
                    <div class="flex-1"></div>
                    <Button :loading="loading" type="submit">Criar Conta</Button>
                </div>
            </form>
        </div>
    </div>



</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { InputText, Button, Checkbox } from 'primevue'
import { Router } from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';
import { AcessAPI } from '../../boot/API';

const router = useRouter();
const loading = ref(false);
const formData = ref({
    name: '',
    email: '',
    document: '',
    password: '',
    phone: '',
    term: false
})

const handleSubmit = async () => {
    loading.value = true;
    try {
        const {data} = await AcessAPI.post('access/register', {
            name: formData.value.name,
            email: formData.value.email,
            document: formData.value.document,
            password: formData.value.password,
            phone: formData.value.phone
        });
        console.log('Resposta da API:', data);

        router.push({name: 'register_phone_valid', params: {code: data.data.id}});
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        if (error.response) {

            console.error('Dados da resposta do erro:', error.response.data);
            alert(`Erro: ${error.response.data.message || 'Ocorreu um erro ao cadastrar. Tente novamente.'}`);
        } else if (error.request) {

            console.error('Nenhuma resposta recebida:', error.request);
            alert('Erro: Nenhuma resposta do servidor. Verifique sua conexão e tente novamente.');
        } else {

            console.error('Erro ao configurar a requisição:', error.message);
            alert(`Erro: ${error.message}`);
        }
    } finally{
        loading.value = false;
    }
}
</script>
