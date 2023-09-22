<template>
    <div class="wrap" :class="`${className} ${isDark ? 'dark' : ''}`">
        <!-- 导航条:开始 -->
        <TnNavbar
            v-if="layoutData.showTopBar"
            :back-icon="layoutData.showTopBarBackBtn ? 'left' : ''"
            :home-icon="layoutData.showTopBarBackBtn ? 'home-capsule-fill' : ''"
            :safe-area-inset-right="safeAreaInsetRight"
            :fixed="true" frosted index-url="/pages/index"
        >
            <text font-600 text="32px #333">{{ layoutData.topBarTitle }}</text>
        </TnNavbar>
        <!-- 导航条:结束 -->
        <!-- 不显示导航条时占位:开始 -->
        <div v-else-if="layoutData.showTopBarPlaceholder" class="top-bar-placeholder" :style="`height:${navBarInfo}px`" />
        <!-- 不显示导航条时占位:结束 -->
        <!-- 空白页面之上的插槽:开始 -->
        <div class="header-slot flex-none">
            <slot name="header-slot" />
        </div>
        <!-- 空白页面之上的插槽:结束 -->
        <!-- 空白页面:开始 -->
        <is-empty v-if="layoutData.showEmptySlot">
            <slot name="empty-slot" />
        </is-empty>
        <!-- 空白页面:结束 -->
        <!-- 页面主体:开始 -->
        <div v-else class="layout-body flex-auto p-24px">
            <slot />
        </div>
        <!-- 页面主体:结束 -->
    </div>
</template>

<script setup lang="ts">
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'Layout',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})

defineProps<{
    className: string
}>()

let safeAreaInsetRight = $ref(false)
// #ifdef MP-WEIXIN
safeAreaInsetRight = true
// #endif

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))

watch(layoutData, (val) => {
    console.log(val)
}, {
    deep: true,
    immediate: true,
})
</script>
