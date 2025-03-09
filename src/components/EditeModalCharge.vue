<template>
    <n-button @click="showModal = true">
        <Icon icon="mdi:pencil" class="ml-2" width="24" height="24" />
    </n-button>

    <n-modal v-if="tagsData" v-model:show="showModal" title="Editar">
        <n-card style="width: 600px" title="Modal" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <n-select class="mt-4" :loading="TagsDataIsLoading" size="large" v-model:value="formData.tag" filterable
                placeholder="Por favor selecione a Tag" :options="tagsData" clearable remote
                @search="fetchChargeData" />
            <n-button @click="updateTag" class="mt-4" type="primary">Salvar</n-button>
        </n-card>
    </n-modal>
</template>

<script setup>
import TagService from '@/services/TagService';
import { ref, onMounted, defineProps } from 'vue';
import { Icon } from '@iconify/vue';
import { AcessAPI } from '@/boot/API';
import { useNotification } from 'naive-ui'


const notification = useNotification()

onMounted(() => {
    fetchChargeData();
});

const props = defineProps({
    code: {
        type: String,
        required: true
    }
});

const showModal = ref(false);
const tagsData = ref(null);
const TagsDataIsLoading = ref(true);
const tagsService = new TagService();

const fetchChargeData = async (query = null) => {
    TagsDataIsLoading.value = true;
    try {
        const { data } = await tagsService.listTags(1, query);
        tagsData.value = data.data.map((tag) => {
            return {
                label: tag.name,
                value: tag.id
            };
        });
        console.log(tagsData.value);
    } catch (err) {
        console.error(err);
        notification.error({
            title: 'Erro',
            content: 'Não foi possível carregar as tags. Por favor, tente novamente mais tarde.'
        });
    } finally {
        TagsDataIsLoading.value = false;
    }
};

const formData = ref({
    tag: 0
});

const updateTag = async () => {
    const data = {
        tag_id: `${formData.value.tag}`,
        code: props.code
    };

    try {
        const response = await AcessAPI.put(`charge/update?id=${props.code}`, data);
        console.log(response.data);
        showModal.value = false;
        window.location.reload();
    } catch (error) {
        console.error(error);
        notification.error({
            title: 'Erro',
            content: 'Não foi possível atualizar a tag. Por favor, tente novamente mais tarde.'
        });
    }
};
</script>