<template>
    <div class="layout-img wrap wrap-tab ActivityRouter" :class="{ dark: isDark }">
        <title-bar title="福利活动" :show-back="false" />
        <no-data v-if="!pageIsLoaded || dataLists.length === 0" :page-is-loaded="pageIsLoaded" :has-list="dataLists.length > 0" />
        <div v-else p-24px>
            <nut-cell v-for="(item, index) in dataLists" :key="index" :title="item.title" desc="描1述文字" />
            <nut-loadmore :status="status" @re-load="getData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from '@uni-helper/uni-use'
import type { Article } from '~/types'

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
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
