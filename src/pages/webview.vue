<template>
    <web-view :src="url" />
</template>

<script setup lang="ts">
defineOptions({
    name: 'WebviewRouter',
})
const { url } = defineProps<{ url: string }>()
</script>
