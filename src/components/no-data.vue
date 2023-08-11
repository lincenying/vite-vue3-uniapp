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
    <div v-else-if="!layoutData.hasData" mt-200px flex--c flex-auto flex-col @click="layoutReload">
        <image :src="layoutData.layoutImg || defaultImg" h-470px w-470px />
        <div font-500 lh-44px text="32px #c39f35">{{ layoutData.layoutText || '暂无相关数据' }}</div>
        <div lh-44px text="26px #999">点击刷新</div>
    </div>
</template>

<script lang="ts" setup>
import defaultImg from '@/static/no-data.png'
import type { LayoutDataType } from '~/types'

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
const layoutReload = inject(layoutReloadKey, () => {})
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
