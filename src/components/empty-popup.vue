<template>
    <u-popup :show="modelValue" mode="center" bg-color="transparent">
        <div relative h-924px w-578px>
            <image src="@/static/index/gift-bg.png" h-924px w-578px />
            <div absolute left-0 top-0 h-full w-full flex="~ col items-center">
                1
            </div>
        </div>
        <div mt-60px flex="~ justify-center">
            <image src="@/static/index/close.png" h-70px w-70px @click="onClose" />
        </div>
    </u-popup>
</template>

<script lang="ts" setup>
defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

function onClose() {
    emit('update:modelValue', false)
}
</script>
