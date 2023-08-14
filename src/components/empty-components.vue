<template>
    <div />
</template>

<script lang="ts" setup>
defineProps<{
    title: string
}>()
</script>

<!-- #ifdef MP-WEIXIN -->
<script lang="ts">
export default {
    name: 'Layout',
    options: {
        virtualHost: true,
    },
}
</script>
<!-- #endif -->
