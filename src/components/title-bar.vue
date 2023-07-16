<template>
    <div
        class="title-bar"
        fixed z-999 ml="-24px" w-full font-700 text="36px center [#000]"
        :style="`height: ${titleHeight}px; line-height: ${titleHeight}px;`"
    >
        {{ title }}
        <div v-if="showBack" top="[50%]" absolute h-48px w-48px translate-y="-50%" @click="handleBack">
            <image src="@/static/arrow-left.png" h-48px w-48px />
        </div>
    </div>
    <div :style="`height: ${titleHeight}px;`" />
</template>

<script lang="ts" setup>
defineProps<{
    title: string
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
