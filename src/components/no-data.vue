<template>
    <nut-loading-page v-if="!layoutData.pageIsLoaded" :loading="true" bg-color="rgba(255, 255, 255, 0.3)" custom-color="#666" font-size="16" />
    <div v-else-if="!layoutData.hasData" mt-200px flex--c flex-auto flex-col @click="layoutReload">
        <image :src="layoutData.layoutImg || defaultImg" h-470px w-470px />
        <div font-500 lh-44px text="32px #c39f35">{{ layoutData.layoutText || '暂无相关数据' }}</div>
        <div lh-44px text="26px #999">点击刷新</div>
    </div>
    <!-- <nut-empty v-else-if="!layoutData.hasData" image="empty" :description="layoutData.layoutText || '暂无数据'" @click="layoutReload" /> -->
</template>

<script lang="ts" setup>
import defaultImg from '@/static/no-data.png'
import type { LayoutDataType } from '~/types'

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
const layoutReload = inject(layoutReloadKey, () => {})
</script>
