<template>
    <div class="layout-img wrap wrap-tab ActivityRouter" :class="{ dark: isDark }">
        <title-bar title="福利活动" :show-back="false" />
        <no-data v-if="showNoData" />
        <div v-else p-24px>
            <nut-cell v-for="(item, index) in dataLists" :key="index" :title="item.title" desc="描1述文字" />
            <nut-loadmore :status="status" @re-load="getData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from '@uni-helper/uni-use'
import type { Article } from './index.types'

defineOptions({
    name: 'ActivityRouter',
})

// uni.showToast({
//     title: '标题标题标题标题标题',
//     duration: 2000,
//     icon: 'none',
// })

const showToast = useToast({ title: '标题标题标题标题标题', icon: 'none' })
showToast()

const url = $ref('api/frontend/article/list?limit=20&by=visit&cache=true')

const { pageIsLoaded, dataLists, status, getData } = useLists<Article>(`${url}`)

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
