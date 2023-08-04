<template>
    <layout classes="wrap-tab layout-img BoxRouter">
        <div v-if="dataDetail">
            {{ dataDetail.content }}
        </div>
    </layout>
</template>

<script setup lang="ts">
import { isEmpty } from '@lincy/utils'
import type { Article } from './index.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'BoxRouter',
})

const url = $ref('api/frontend/article/item?id=589af8cde9be1c5b21ef8e9c')

const { pageIsLoaded, dataDetail, getData } = useDetail<Article>(`${url}`)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: !isEmpty(dataDetail.value),
    showNoData: !pageIsLoaded.value || !dataDetail.value,
    barTitle: '盒柜',
    barBgColor: 'none',
    barShowBack: false,
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
