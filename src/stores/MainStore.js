import { defineStore } from 'pinia'

export const useMainStore = defineStore({
    
    id: 'main',
    
    state: () => ({
        loading: false
    }),

    actions: {
        setLoading(value) {
            this.loading = value
        }
    }
})