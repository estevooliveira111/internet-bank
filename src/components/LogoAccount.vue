<template>
    <n-upload directory-dnd :action="uploadUrl" :default-file-list="fileListRef" :headers="headers"
        list-type="image-card" :max="1" @change="handleUploadChange">
        <n-upload-dragger>
            <div class="w-full h-full">
                <n-image v-if="previewImageUrlRef" width="100" :src="previewImageUrlRef" />
                <n-text v-else style="font-size: 16px">
                    Clique ou arraste um arquivo para esta área para fazer upload
                </n-text>
            </div>
        </n-upload-dragger>
    </n-upload>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { globalVars } from '@/boot/config';
import { AcessAPI } from '@/boot/API.js';

const previewImageUrlRef = ref("");
const uploadUrl = `${globalVars.API_URL}access/account/image`;
const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`
};

const fileListRef = ref([
    // {
    //     id: "c",
    //     name: "Finished you can dowload.png",
    //     status: "finished",
    //     url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    // },
]);

// Função para buscar dados e definir o URL da imagem
async function fetchData() {
    try {
        const response = await AcessAPI.get('access/auth/me');
        const { data } = response;
        if (data.account && data.account.information) {
            fileListRef.value.push({
                id: "c",
                name: "Finished you can dowload.png",
                status: "finished",
                url: data.account.information["pathLogo"]
            })
        }
    } catch (error) {
        console.error('Error fetching account info:', error);
    }
}

// Função para lidar com a mudança do upload
function handleUploadChange(file) {
    if (file.status === 'done' && file.response) {
        // Atualize a URL da imagem após o upload
        previewImageUrlRef.value = file.response.url; // ajuste conforme o formato da resposta
    }
}

onMounted(() => {
    fetchData();
});
</script>