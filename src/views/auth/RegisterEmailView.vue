<template>
    ...
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import RegisterService from '../../services/RegisterService'
import { ref } from 'vue';


const router = useRouter();
const route = useRoute();
const classRegister = new RegisterService()
const dataResponse = ref(null)
const id = route.params.code


classRegister.getRegister(id)
.then( ({data}) => {
    console.log(data);
    dataResponse.value = data
})
// .finally
</script>