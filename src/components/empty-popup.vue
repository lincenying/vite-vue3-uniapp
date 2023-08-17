<template>
    <TnPopup v-model="showBasic" open-direction="center" :overlay-closeable="false" bg-color="none" :z-index="20091">
        <div relative h-924px w-578px>
            <image src="@/static/index/gift-bg.png" h-924px w-578px />
            <div absolute left-0 top-0 h-full w-full flex="~ col items-center">
                <tn-button type="primary">主要按钮</tn-button>
            </div>
        </div>
        <div mt-60px flex="~ justify-center">
            <image sr src="@/static/index/close.png" h-70px w-70px @click="onClose" />
        </div>
    </TnPopup>
</template>

<script lang="ts" setup>
const { modelValue } = defineProps<{
    modelValue: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', palyload: boolean): void
}>()

defineOptions({
    name: 'EmptyPopup',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})

let showBasic = $ref(modelValue)

watch(() => modelValue, () => {
    showBasic = modelValue
})

function onClose() {
    emits('update:modelValue', false)
}
</script>
