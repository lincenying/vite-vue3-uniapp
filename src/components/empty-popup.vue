<template>
    <nut-popup v-model:visible="showBasic" position="center" :close-on-click-overlay="false" :custom-style="{ background: 'none' }">
        <div relative h-924px w-578px>
            <image src="@/static/index/gift-bg.png" h-924px w-578px />
            <div absolute left-0 top-0 h-full w-full flex="~ col items-center">
                <NutButton type="primary">主要按钮</NutButton>
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

const emit = defineEmits(['update:modelValue'])

let showBasic = $ref(props.modelValue)

watch(() => props.modelValue, () => {
    showBasic = props.modelValue
})

function onClose() {
    emit('update:modelValue', false)
}
</script>
