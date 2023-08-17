<template>
    <div v-if="!layoutData.pageIsLoaded" mt="40%">
        <TnEmpty mode="data">
            <template #icon>
                <TnLoading show mode="flower" animation size="40px" />
            </template>
            <template #tips>
                <div mt-15px>加载中, 请稍等...</div>
            </template>
        </TnEmpty>
    </div>
    <template v-else-if="!layoutData.hasData">
        <div mt-200px flex--c flex-auto flex-col @click="dataReload">
            <image :src="layoutData.layoutImg || defaultImg" h-470px w-470px />
            <div font-500 lh-44px text="32px #c39f35">{{ layoutData.layoutText || '暂无相关数据' }}</div>
            <div lh-44px text="26px #999">点击刷新</div>
        </div>
        <slot />
    </template>
</template>

<script lang="ts" setup>
import defaultImg from '@/static/no-data.png'
import type { LayoutDataType } from '~/types'

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
const dataReload = inject(dataReloadKey, () => {})
</script>

<!-- #ifdef MP-WEIXIN -->
<script lang="ts">
export default {
    options: {
        virtualHost: true,
    },
}
</script>
<!-- #endif -->
