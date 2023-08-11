<template>
    <layout classes="wrap-tab layout-img ActivityRouter">
        <TnListItem
            v-for="(item, index) in dataLists" :key="index" right-icon="right"
            @click="router.push(`/pages-sub/acticity/detail?id=${item._id}`)"
        >
            <div flex>
                <TnIcon name="tree" />
                <div ml-10px class="tn-text-ellipsis-1">{{ item.title }}</div>
            </div>
        </TnListItem>
        <div pb-10px pt-30px>
            <TnLoadmore :status="status" :text="customLoadMoreText" loading-icon-mode="flower" color="#999" />
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

const customLoadMoreText: LoadmoreText = {
    loadmore: '还有内容呢',
    loading: '等等，数据正在赶来',
    nomore: '哎呀，没有啦',
    empty: '空空的呀',
}

// const showToast = useToast({ title: '标题标题标题标题标题', icon: 'none' })
// showToast()

const url = $ref('api/frontend/article/list?limit=20&by=visit&cache=true')

const { pageIsLoaded, dataLists, status, getData } = useLists<Article>(`${url}`)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: dataLists.value.length > 0,
    showNoData: !pageIsLoaded.value || dataLists.value.length === 0,
    barTitle: '福利活动',
    ...defaultBarData,
})))
provide(layoutReloadKey, async () => {
    status.value = 'loadmore'
    showLoading()
    await getData()
    uni.hideLoading()
})
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
