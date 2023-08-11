<template>
    <div class="wrap" :class="`${classes} ${isDark ? 'dark' : ''}`">
        <TnNavbar
            v-if="layoutData.showBar"
            frosted :back-icon="layoutData.barShowBack ? 'left' : ''" :home-icon="layoutData.barShowBack ? 'home-capsule-fill' : ''"
            :safe-area-inset-right="safeAreaInsetRight" :fixed="true" index-url="/pages/index"
        >
            {{ layoutData.barTitle }}
        </TnNavbar>
        <div v-else-if="layoutData.showPlaceholder" :style="`height:${navBarInfo}px`" />
        <div flex-none>
            <slot name="header" />
        </div>
        <no-data v-if="layoutData.showNoData" />
        <div v-else flex-auto p-24px>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LayoutDataType } from '~/types'

defineProps<{
    classes: string
}>()

// #ifndef MP-WEIXIN
defineOptions({
    name: 'Layout',
})
// #endif

let safeAreaInsetRight = $ref(false)
// #ifdef MP-WEIXIN
safeAreaInsetRight = true
// #endif

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
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
