<template>
    <layout class-name="wrap-tab layout-img UserRouter">
        <div p-40px>4444</div>
        <div flex--c gap-10px>
            <TnButton type="warning" @click="router.push('/pages-sub/user/login')">去登录</TnButton>
            <TnLoading show animation type="primary" mode="flower" size="40" />
        </div>
    </layout>
</template>

<script setup lang="ts">
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'UserRouter',
})

useHead({
    title: 'User',
})

let hasData = $ref(false)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    dataIsLoaded: true,
    hasData,
    showEmptySlot: !hasData,
    topBarTitle: '我的',
    ...defaultShowBar,
})))
provide(dataReloadKey, async () => {
    showLoading()
    // await getData()
    hasData = true
    uni.hideLoading()
})
</script>

<route lang="json">
{
    "style": {
        "navigationStyle": "custom"
    }
}
</route>
