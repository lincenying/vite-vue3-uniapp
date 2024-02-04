<template>
    <web-view :src="url" @message="onMessage" />
</template>

<script setup lang="ts">
import type { WebViewOnMessageEvent } from '~/uni-app-types'

defineOptions({
    name: 'WebviewRouter',
})

const { url } = defineProps<{ url: string }>()

useHead({
    title: 'WebView',
})

function onMessage(event: WebViewOnMessageEvent) {
    const data = event.detail.data
    console.log(data)
}
</script>
