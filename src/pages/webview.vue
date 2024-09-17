<template>
    <web-view :src="url" @message="onMessage" />
</template>

<script setup lang="ts">
defineOptions({
    name: 'WebviewRouter',
})

const { url } = defineProps<{ url: string }>()

useHead({
    title: 'WebView',
})

function onMessage(event: { detail: { data: any } }) {
    const data = event.detail.data
    console.log(data)
}
</script>
