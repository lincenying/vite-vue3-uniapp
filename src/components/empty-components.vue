<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
interface Props {
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    title: 'title',
})

const { title } = toRefs(props)

defineOptions({
    name: 'EmptyComponents',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})
</script>
