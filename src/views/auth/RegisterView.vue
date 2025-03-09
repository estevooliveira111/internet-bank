
<template>
    <div :style="{ background: theme().primary }" class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
            <div class="p-8">
                <h2 class="text-4xl font-bold text-white mb-6 text-center">Cadastro</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="space-y-6">
                        <InputField v-model="formData.name" id="name" type="text" icon="User" placeholder="Nome" />
                        <InputField v-model="formData.email" id="email" type="email" icon="Mail" placeholder="Email" />
                        <InputField v-model="formData.document" id="document" type="text" icon="FileText"
                            placeholder="CPF/CNPJ" />
                        <InputField v-model="formData.password" id="password" type="password" icon="Lock"
                            placeholder="Senha" />
                        <InputField v-model="formData.phone" id="phone" type="tel" icon="Phone"
                            placeholder="Telefone" />
                    </div>
                    <button type="submit"
                        class="w-full bg-purple-600 text-white rounded-full py-3 px-6 mt-8 hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { theme } from '../../services/Thema'
import InputField from './InputField.vue' // Componentização dos campos de input
import axios from 'axios' // Importando o axios

const formData = ref({
    name: '',
    email: '',
    document: '',
    password: '',
    phone: ''
})

const handleSubmit = async () => {
    try {
        const response = await axios.post('https://api.fastgivemoney.com/access/account-register', {
            name: formData.value.name,
            email: formData.value.email,
            document: formData.value.document,
            password: formData.value.password,
            phone: formData.value.phone
        });
        console.log('Resposta da API:', response.data);
        alert('Cadastro realizado com sucesso!');
        
        // Limpa os campos do formulário
        // Object.keys(formData.value).forEach(key => formData.value[key] = '');
    } catch (error) {
        console.error('Erro ao cadastrar:', error);

        // Verifica se o erro é uma resposta da API
        if (error.response) {
            // O servidor respondeu com um código de status que não está no intervalo de 2xx
            console.error('Dados da resposta do erro:', error.response.data);
            alert(`Erro: ${error.response.data.message || 'Ocorreu um erro ao cadastrar. Tente novamente.'}`);
        } else if (error.request) {
            // A requisição foi feita, mas não houve resposta
            console.error('Nenhuma resposta recebida:', error.request);
            alert('Erro: Nenhuma resposta do servidor. Verifique sua conexão e tente novamente.');
        } else {
            // Algo aconteceu ao configurar a requisição
            console.error('Erro ao configurar a requisição:', error.message);
            alert(`Erro: ${error.message}`);
        }
    }
}
</script>

<style>
input:focus+label,
input:not(:placeholder-shown)+label {
    transform: translateY(-2.5rem) scale(0.8);
    color: white;
}
</style>