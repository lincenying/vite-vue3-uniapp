<template>
    <layout class-name="wrap-tab layout-img ActivityRouter">
        <TnListItem
            v-for="(item, index) in dataLists" :key="index" right-icon="right"
            @click="router.push(`/pages-sub/acticity/detail?id=${item.c_id}`)"
        >
            <div flex--c>
                <TnIcon name="tree" />
                <div ml-10px class="tn-text-ellipsis-1">{{ item.c_title }}</div>
            </div>
        </TnListItem>
        <div pb-10px pt-30px>
            <TnLoadmore :status="loadStatus" :text="customLoadMoreText" loading-icon-mode="flower" color="#999" />
        </div>
    </layout>
</template>

<script setup lang="ts">
// import { useToast } from '@uni-helper/uni-use'
import type { LoadmoreText } from '@tuniao/tnui-vue3-uniapp'
import type { Article } from './index.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'ActivityRouter',
})

useHead({
    title: 'Activity',
})

const customLoadMoreText: LoadmoreText = {
    loadmore: '还有内容呢',
    loading: '等等，数据正在赶来',
    nomore: '哎呀，没有啦',
    empty: '空空的呀',
}

// const showToast = useToast({ title: '标题标题标题标题标题', icon: 'none' })
// showToast()

interface ApiParams { page: number; limit: number; xxx?: number }

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
    loadStatus.value = 'loadmore'
    showLoading()
    await getData()
    uni.hideLoading()
})
</script>

<route lang="json">
{
    "style": {
        "navigationStyle": "custom",
        "enablePullDownRefresh": true
    }
}
</route>
