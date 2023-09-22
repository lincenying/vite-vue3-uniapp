<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
interface Props {
    title?: string
}

defineOptions({
    name: 'EmptyComponents',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})

const props = withDefaults(defineProps<Props>(), {
    title: 'title',
})

const { title } = toRefs(props)
</script>
