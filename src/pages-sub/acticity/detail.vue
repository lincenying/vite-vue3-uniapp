<template>
    <layout class-name="wrap-tab layout-img BoxRouter">
        <div v-if="dataDetail" bg="#fff" border-rd-16px p-24px>
            <rich-text :nodes="dataDetail.html" />
        </div>
    </layout>
</template>

<script setup lang="ts">
import { isEmpty } from '@lincy/utils'
import type { Article } from '~/pages/index.types'
import type { LayoutDataType } from '~/types'

const { id } = $(definePropsRefs<{ id: string }>())

defineOptions({
    name: 'BoxRouter',
})

const { pageIsLoaded, dataDetail, getData } = useDetail<Article>('api/frontend/article/item', { id })

console.log($$(id))

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: !isEmpty(dataDetail.value),
    showNoData: !pageIsLoaded.value || !dataDetail.value,
    barTitle: '详情',
    ...defaultNoBarData,
})))
provide(dataReloadKey, async () => {
    showLoading()
    await getData()
    uni.hideLoading()
})
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
