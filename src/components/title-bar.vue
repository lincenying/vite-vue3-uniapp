<template>
    <div
        mx="-24px" w-100vw
        :style="`height: ${statusHeight}px; background: ${bgColor || 'none'}`"
    />
    <div
        class="title-bar"
        fixed z-999 mx="-24px" w-full font-700 text="36px center [#000]"
        :style="`height: ${titleHeight}px; line-height: ${titleHeight}px;`"
    >
        {{ title }}
        <div v-if="showBack" top="[50%]" absolute h-48px w-48px translate-y="-50%" @click="handleBack">
            <image src="@/static/arrow-left.png" h-48px w-48px />
        </div>
    </div>
    <div
        mx="-24px" w-100vw
        :style="`height: ${titleHeight}px; background: ${bgColor || 'none'}`"
    />
</template>

<script lang="ts" setup>
defineProps<{
    title: string
    bgColor?: string
    showBack: boolean
}>()

function handleBack() {
    try {
        router.back()
    }
    catch (error) {
        router.push('/')
    }
}
</script>
