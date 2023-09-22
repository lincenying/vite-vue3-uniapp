<template>
    <div flex--c @click="handleSelect">
        <slot name="pre" />
        <div v-if="!modelValue" class="i-mdi:checkbox-blank-circle-outline" :style="iconStyle" />
        <div v-else class="i-mdi:checkbox-marked-circle" :style="iconStyle" />
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'EmptyComponents',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})

const { modelValue, fontSize, iconColor } = defineProps<{
    modelValue: boolean
    fontSize: number
    iconColor: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', palyload: boolean): void
    (event: 'change', palyload: boolean): void
}>()

function handleSelect() {
    emits('update:modelValue', !modelValue)
    emits('change', !modelValue)
}

const iconStyle = computed(() => {
    if (!modelValue) {
        return {
            'font-size': `${uni.upx2px(fontSize)}px`,
            'color': '#999',
        }
    }
    return {
        'font-size': `${uni.upx2px(fontSize)}px`,
        'color': iconColor,
    }
})
</script>
