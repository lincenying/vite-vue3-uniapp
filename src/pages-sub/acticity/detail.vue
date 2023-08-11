<template>
    <layout classes="wrap-tab layout-img BoxRouter">
        <div v-if="dataDetail">
            <rich-text :nodes="dataDetail.html" />
        </div>
    </layout>
</template>

<script setup lang="ts">
import { isEmpty } from '@lincy/utils'
import type { Article } from '~/pages/index.types'
import type { LayoutDataType } from '~/types'

const props = defineProps<{ id: string }>()

defineOptions({
    name: 'BoxRouter',
})

const url = $ref(`api/frontend/article/item?id=${props.id}`)

const { pageIsLoaded, dataDetail, getData } = useDetail<Article>(`${url}`)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: !isEmpty(dataDetail.value),
    showNoData: !pageIsLoaded.value || !dataDetail.value,
    barTitle: '详情',
    ...defaultNoBarData,
})))
provide(layoutReloadKey, async () => {
    showLoading()
    await getData()
    uni.hideLoading()
})
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
