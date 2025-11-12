<template>
    <layout class-name="wrap-tab layout-img ActivityRouter">
        <wd-cell
            v-for="(item, index) in dataLists" :key="index"
            is-link
            :clickable="false"
            :to="`/pages-sub/acticity/detail?id=${item.c_id}`"
        >
            <template #title>
                <div flex--c>
                    <wd-icon name="heart" size="22px"></wd-icon>
                    <div ml-10px line-1>{{ item.c_title }}</div>
                </div>
            </template>
        </wd-cell>
        <div pb-10px pt-30px>
            <wd-loadmore :state="loadStatus" loading-text="等等，数据正在赶来" finished-text="哎呀，没有啦" error-text="加载失败，点击重试" color="#999" />
        </div>
    </layout>
</template>

<script setup lang="ts">
// import { useToast } from '@uni-helper/uni-use'
import type { Article } from './index.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'ActivityRouter',
})

definePage({
    style: {
        navigationStyle: 'custom',
        enablePullDownRefresh: true,
    },
})

useHead({
    title: 'Activity',
})

// const showToast = useToast({ title: '标题标题标题标题标题', icon: 'none' })
// showToast()

interface ApiParams {
    page: number
    limit: number
    xxx?: number
}

const { dataIsLoaded, dataLists, loadStatus, getData, apiParams } = useLists<Article, ApiParams>('/article/lists', {
    limit: 20,
    page: 1,
})

apiParams.value.xxx = 1

console.log(apiParams)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    dataIsLoaded: dataIsLoaded.value,
    hasData: dataLists.value.length > 0,
    showEmptySlot: !dataIsLoaded.value || dataLists.value.length === 0,
    topBarTitle: '福利活动',
    ...defaultShowBar,
})))
provide(dataReloadKey, async () => {
    loadStatus.value = 'loading'
    showLoading()
    await getData()
    uni.hideLoading()
})
</script>
