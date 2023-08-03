<template>
    <layout classes="wrap-tab layout-img ActivityRouter">
        <div p-24px>
            <nut-cell v-for="(item, index) in dataLists" :key="index" :title="item.title" desc="描1述文字" />
            <com-loadmore :status="status" @re-load="getData" />
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

// const showToast = useToast({ title: '标题标题标题标题标题', icon: 'none' })
// showToast()

const url = $ref('api/frontend/article/list?limit=20&by=visit&cache=true')

const { pageIsLoaded, dataLists, status, getData } = useLists<Article>(`${url}`)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: dataLists.value.length > 0,
    showNoData: !pageIsLoaded.value || dataLists.value.length === 0,
    barTitle: '福利活动',
    barBgColor: 'none',
    barShowBack: false,
})))
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
