<template>
    <div>
        <svg ref="barcode"></svg>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode'

export default {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.generateBarcode()
    },
    watch: {
        value() {
            this.generateBarcode()
        }
    },
    methods: {
        generateBarcode() {
            JsBarcode(this.$refs.barcode, this.value, {
                format: 'CODE128',
                displayValue: false,
                lineColor: '#000',
                width: 2,
                height: 55
            })
        }
    }
}
</script>

<style scoped>
svg {
    max-width: 100%;
}
</style>