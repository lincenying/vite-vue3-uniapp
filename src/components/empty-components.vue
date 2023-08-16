<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'unplugin-vue-macros/macros' assert { type: 'macro' }

const { title } = withDefaults(definePropsRefs<{
    title: string
}>(), {
    title: 'title',
})
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
