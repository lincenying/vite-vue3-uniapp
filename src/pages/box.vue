<template>
    <div class="layout-img wrap wrap-tab BoxRouter" :class="{ dark: isDark }">
        <title-bar title="盒柜" :show-back="false" />
        <div p-24px>
            <nut-cell v-for="(item, index) in dataLists" :key="index" :title="item.title" desc="描1述文字" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Article } from './index.types'

defineOptions({
    name: 'BoxRouter',
})

const dataLists = ref<Article[]>([])
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
