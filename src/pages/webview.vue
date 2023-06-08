<template>
    <web-view :src="url" />
</template>

<script setup lang="ts">
const { url } = defineProps<{ url: string }>()
</script>
