<template>
    <nut-loading-page v-if="!pageIsLoaded" :loading="true" bg-color="rgba(255, 255, 255, 0.3)" />
    <div v-else-if="!hasList" mt-200px flex--c flex-col>
        <image src="@/static/no-data.png" h-470px w-470px />
        <div font-500 lh-44px text="32px #c39f35">暂无数据</div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    pageIsLoaded: boolean
    hasList: boolean
}>()
</script>
