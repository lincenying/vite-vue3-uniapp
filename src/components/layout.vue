<template>
    <div class="wrap" :class="`${classes} ${isDark ? 'dark' : ''}`">
        <title-bar />
        <div px-24px>
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

defineOptions({
    name: 'Layout',
})

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
</script>
