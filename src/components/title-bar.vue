<template>
    <div
        w-750px
        :style="`height: ${statusHeight}px; background: ${layoutData.barBgColor || 'none'}`"
    />
    <div
        class="title-bar"
        fixed z-999 w-750px font-700 text="36px center #000"
        :style="`height: ${titleHeight}px; line-height: ${titleHeight}px; background: ${layoutData.barBgColor || 'none'}`"
    >
        {{ layoutData.barTitle }}
        <div v-if="layoutData.barShowBack" top="[50%]" absolute h-48px w-48px translate-y="-50%" @click="handleBack">
            <image src="@/static/arrow-left.png" block h-48px w-48px />
        </div>
    </div>
    <div
        w-10w-750px0vw
        :style="`height: ${titleHeight}px; background: ${layoutData.barBgColor || 'none'}`"
    />
</template>

<script lang="ts" setup>
import type { LayoutDataType } from '~/types'

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))

function handleBack() {
    try {
        router.back()
    }
    catch (error) {
        router.push('/page/index')
    }
}
</script>
