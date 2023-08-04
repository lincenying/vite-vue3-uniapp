<template>
    <div v-if="status === 'loading'" flex-cc>
        <nut-icon name="loading1" />
        <text ml-6px text="#666">加载中...</text>
    </div>
    <div v-else-if="status === 'more'" flex-cc @click="handleReload">
        <nut-icon name="tips" />
        <text ml-6px text="#666">点击加载更多</text>
    </div>
    <div v-else-if="status === 'no-more'" flex-cc>
        <nut-icon name="failure" />
        <text ml-6px text="#666">没有更多了</text>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    status: string
}>()

const emits = defineEmits(['reLoad'])

function handleReload() {
    emits('reLoad')
}
</script>
