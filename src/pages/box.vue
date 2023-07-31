<template>
    <div class="layout-img wrap wrap-tab BoxRouter" :class="{ dark: isDark }">
        <title-bar title="盒柜" :show-back="false" />
        <no-data v-if="showNoData" />
        <div v-else p-24px>
            {{ dataDetail?.content }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { isEmpty } from '@lincy/utils'
import type { Article } from './index.types'

defineOptions({
    name: 'BoxRouter',
})

const url = $ref('api/frontend/article/item?id=589af8cde9be1c5b21ef8e9c')

const { pageIsLoaded, dataDetail } = useDetail<Article>(`${url}`)

const showNoData = computed(() => !pageIsLoaded.value || !dataDetail.value)
provide(noDataKey, computed(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: !isEmpty(dataDetail.value),
})))
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
