<template>
    <TnPopup v-model="showBasic" open-direction="center" :overlay-closeable="false" bg-color="none" :z-index="20091">
        <div relative h-924px w-578px>
            <image src="@/assets/images/index/gift-bg.png" h-924px w-578px />
            <div absolute left-0 top-0 h-full w-full flex="~ col items-center">
                <tn-button type="primary">主要按钮</tn-button>
            </div>
        </div>
        <div mt-60px flex-c->
            <image sr src="@/assets/images/index/close.png" h-70px w-70px @click="onClose" />
        </div>
    </TnPopup>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'EmptyPopup',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})

const { modelValue } = defineProps<{
    modelValue: boolean
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', palyload: boolean): void
    (e: 'close', palyload: boolean): void
}>()

let showBasic = $ref(modelValue)

watch(() => modelValue, () => {
    showBasic = modelValue
})

function onClose() {
    emits('update:modelValue', false)
    emits('close', false)
}
</script>
