<template>
    <div class="wrap">
        <div i-carbon-pedestrian inline-block text-4xl />
        <p my-8px>
            Hi, {{ props.name }}!
        </p>
        <p text-sm italic op75>
            <em>Demo of dynamic route</em>
        </p>

        <div m="t-64px b-40px">
            <TheCounter />
        </div>

        <div>
            <button m-24px text-sm btn @click="router.back()">
                Back
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>()
defineOptions({
    name: 'HiRouter',
})
</script>
