<template>
    <nut-loading-page v-if="!noData.pageIsLoaded" :loading="true" bg-color="rgba(255, 255, 255, 0.3)" custom-color="#666" font-size="16" />
    <div v-else-if="!noData.hasData" mt-200px flex--c flex-col>
        <image :src="noData.img || defaultImg" h-470px w-470px />
        <div font-500 lh-44px text="32px #c39f35">{{ noData.title || '暂无数据' }}</div>
    </div>
</template>

<script lang="ts" setup>
import defaultImg from '@/static/no-data.png'
import type { NoDataType } from '~/types'

const noData = inject(noDataKey, ref({} as NoDataType))
</script>
