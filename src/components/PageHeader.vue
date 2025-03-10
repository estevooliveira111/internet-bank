<template>
    <div :class="['w-full pb-3 flex items-center', hasActions ? 'justify-between' : 'justify-start']">
        <div>
            <h1 class="text-4xl font-bold ">{{ name }}</h1>
            <div class="mt-2 flex items-center gap-2 text-sm text-gray-500 font-bold">
                <template v-for="(link, key) in links" :key="key">
                    <router-link :to="{ name: link.routerName }" :class="{
                        '': isActive(link),
                        'text-pretty': !isActive(link),
                    }">
                        {{ link.name }}
                    </router-link>
                    {{ links.length > 1 && key < links.length - 1 ? '/' : '' }} </template>
            </div>
        </div>

        <div v-if="hasActions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: 'CarteiraHeader',
    props: {
        links: {
            type: Array,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    computed: {
        hasActions() {
            return !!this.$slots.actions;
        },
    },
    methods: {
        isActive(link) {
            return this.$route.name === link.routerName;
        },
    },
};
</script>