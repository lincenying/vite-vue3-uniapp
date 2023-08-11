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
        // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
        virtualHost: true,
    },
}
</script>
<!-- #endif -->
