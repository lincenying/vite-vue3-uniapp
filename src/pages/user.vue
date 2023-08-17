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
    pageIsLoaded: true,
    hasData: false,
    showNoData: true,
    barTitle: '我的',
    ...defaultBarData,
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
