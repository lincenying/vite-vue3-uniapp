<template>
    <layout class-name="wrap-tab layout-img UserRouter">
        <div p-24px>4444</div>
        <TnButton type="warning">1</TnButton>
        <TnLoading show type="primary" mode="circle" />
    </layout>
</template>

<script setup lang="ts">
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'UserRouter',
})

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    dataIsLoaded: true,
    hasData: false,
    showEmptySlot: true,
    topBarTitle: '我的',
    ...defaultShowBar,
})))
provide(dataReloadKey, async () => {
    showLoading()
    // await getData()
    uni.hideLoading()
})
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
