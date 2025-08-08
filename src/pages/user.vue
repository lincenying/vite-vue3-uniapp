<template>
    <layout class-name="wrap-tab layout-img UserRouter">
        <div p-40px>4444</div>
        <div flex--c gap-10px>
            <TnButton type="warning" @click="router.push('/pages-sub/user/login')">去登录</TnButton>
            <TnLoading show animation type="primary" mode="flower" size="40" />
            <TnIcon name="logo-tuniao" type="success" />
        </div>
        <div>
            <TnButton @click="() => (showPopup = true)"> 修改用户信息 </TnButton>
        </div>
        <TnUpdateUserInfoPopup
            v-model:show="showPopup"
            v-model:nickname="nickname"
            v-model:avatar="avatar"
            @choose-avatar="avatarChooseHandle"
        />
    </layout>
</template>

<script setup lang="ts">
import type { LayoutDataType } from '~/types'

import TnUpdateUserInfoPopup from 'tnuiv3p-tn-update-user-info-popup/index.vue'

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

const showPopup = ref<boolean>(false)
const nickname = ref<string>('')
const avatar = ref<string>('')
// 头像选择事件
function avatarChooseHandle(url: string) {
    // 换成自己的上传接口
    uni.uploadFile({
        url: '服务器地址',
        fileType: 'image',
        filePath: url,
        name: 'file',
        success: (res) => {
            const data = JSON.parse(res.data)
            avatar.value = data.data.url
        },
    })
}
</script>

<route lang="json">
{
    "style": {
        "navigationStyle": "custom"
    }
}
</route>
