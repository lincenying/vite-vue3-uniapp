<template>
    <div class="wrap" :class="`${className} ${isDark ? 'dark' : ''}`">
        <TnNavbar
            v-if="layoutData.showBar"
            :back-icon="layoutData.barShowBack ? 'left' : ''"
            :home-icon="layoutData.barShowBack ? 'home-capsule-fill' : ''"
            :safe-area-inset-right="safeAreaInsetRight"
            :fixed="true" frosted index-url="/pages/index"
        >
            <text font-600 text="32px #333">{{ layoutData.barTitle }}</text>
        </TnNavbar>
        <div v-else-if="layoutData.showPlaceholder" :style="`height:${navBarInfo}px`" />
        <div flex-none>
            <slot name="header" />
        </div>
        <no-data v-if="layoutData.showNoData">
            <slot name="other" />
        </no-data>
        <div v-else flex-auto p-24px>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LayoutDataType } from '~/types'

defineProps<{
    className: string
}>()

defineOptions({
    name: 'Layout',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})

let safeAreaInsetRight = $ref(false)
// #ifdef MP-WEIXIN
safeAreaInsetRight = true
// #endif

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
</script>
