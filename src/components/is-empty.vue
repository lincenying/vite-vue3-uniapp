<template>
    <div v-if="!layoutData.dataIsLoaded" mt="40%">
        <wd-status-tip mode="data" tip="加载中, 请稍等...">
            <template #image>
                <wd-loading size="40px" />
            </template>
        </wd-status-tip>
    </div>
    <template v-else-if="!layoutData.hasData">
        <div mt-200px flex="-c auto col" @click="dataReload">
            <image :src="layoutData.emptySlotImg || defaultImg" h-470px w-470px />
            <div font-500 lh-44px text="32px hex-c39f35">{{ layoutData.emptySlotText || '暂无相关数据' }}</div>
            <div lh-44px text="26px hex-999">点击刷新</div>
        </div>
        <slot />
    </template>
</template>

<script lang="ts" setup>
import type { LayoutDataType } from '~/types'
import defaultImg from '@/assets/images/no-data.png'

defineOptions({
    name: 'IsEmpty',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})
const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
const dataReload = inject(dataReloadKey, () => {})
</script>
