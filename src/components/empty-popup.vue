<template>
    <nut-popup v-model:visible="showBasic" position="center" :close-on-click-overlay="false" :custom-style="{ background: 'none' }">
        <div relative h-924px w-578px>
            <image src="@/static/index/gift-bg.png" h-924px w-578px />
            <div absolute left-0 top-0 h-full w-full flex="~ col items-center">
                <nut-button type="primary">主要按钮</nut-button>
            </div>
        </div>
        <div mt-60px flex="~ justify-center">
            <image sr src="@/static/index/close.png" h-70px w-70px @click="onClose" />
        </div>
    </nut-popup>
</template>

<script lang="ts" setup>
const props = defineProps<{
    modelValue: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', palyload: boolean): void
}>()

let showBasic = $ref(props.modelValue)

watch(() => props.modelValue, () => {
    showBasic = props.modelValue
})

function onClose() {
    emits('update:modelValue', false)
}
</script>
