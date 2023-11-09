<template>
    <layout class-name="wrap-tab layout-img BoxRouter">
        <template #header-slot>header-slot 插槽</template>
        <div v-if="dataDetail" bg="#fff" border-rd-16px p-24px>
            <rich-text :nodes="dataDetail.c_content" />
        </div>
    </layout>
</template>

<script setup lang="ts">
import { isEmpty } from '@lincy/utils'
import type { Article } from '~/pages/index.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'BoxRouter',
})

const { id } = $(definePropsRefs<{ id: string }>())

const { dataIsLoaded, dataDetail, getData, apiParams } = useDetail<Article, { id: string }>(`api/article/detail/${id}`)

console.log($$(id))
console.log(apiParams.value)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    dataIsLoaded: dataIsLoaded.value,
    hasData: !isEmpty(dataDetail.value),
    showEmptySlot: !dataIsLoaded.value || !dataDetail.value,
    topBarTitle: '详情',
    ...defaultHideBar,
})))
provide(dataReloadKey, async () => {
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
