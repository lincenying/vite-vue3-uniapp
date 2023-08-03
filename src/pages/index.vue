<template>
    <page-meta :page-style="pageStyle" />
    <layout classes="wrap-tab layout-img IndexRouter">
        <div p-24px>
            <div v-if="dataLists.length === 0">空</div>
            <div v-else>111111%</div>
        </div>
        <empty-popup v-if="popupShow" v-model="popupShow" title="" />
    </layout>
</template>

<script setup lang="ts">
import type { Article } from './index.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'IndexRouter',
})

let popupShow = $ref(false)

const pageStyle = computed(() => {
    if (popupShow)
        return 'overflow: hidden; height: 100%'
    return 'overflow: inherit'
})

const url = $ref('api/frontend/article/list?limit=20&by=visit&cache=true')

const { pageIsLoaded, dataLists } = useLists<Article>(`${url}`)

watch(pageIsLoaded, (val) => {
    if (val)
        popupShow = true
})

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: dataLists.value.length > 0,
    showNoData: !pageIsLoaded.value || dataLists.value.length === 0,
    barTitle: '首页',
    barBgColor: 'none',
    barShowBack: false,
})))
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
