<template>
    <page-meta :page-style="pageStyle" />
    <div class="layout-img wrap wrap-tab IndexRouter" :class="{ dark: isDark }">
        <title-bar title="首页" :show-back="false" />
        <no-data v-if="showNoData" />
        <div v-else p-24px>
            <div v-if="dataLists.length === 0">空</div>
            <div v-else>111111%</div>
        </div>
        <empty-popup v-if="popupShow" v-model="popupShow" title="" />
    </div>
</template>

<script setup lang="ts">
import type { Article } from './index.types'

defineOptions({
    name: 'IndexRouter',
})

const popupShow = $ref(true)

const pageStyle = computed(() => {
    if (popupShow)
        return 'overflow: hidden; height: 100%'
    return 'overflow: inherit'
})

const url = $ref('api/frontend/article/list?limit=20&by=visit&cache=true')

const { pageIsLoaded, dataLists } = useLists<Article>(`${url}`)

const showNoData = computed(() => !pageIsLoaded.value || dataLists.value.length === 0)
provide(noDataKey, computed(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: dataLists.value.length > 0,
})))
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
