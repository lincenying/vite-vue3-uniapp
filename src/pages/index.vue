<template>
    <page-meta :page-style="pageStyle" />
    <div class="app layout-img" :class="{ dark: isDark }">
        <div class="IndexRouter wrap wrap-tab">
            <title-bar title="首页" :show-back="false" />
            <div h-24px />
            <nut-loading-page v-if="!isLoaded" :loading="true" bg-color="rgba(255, 255, 255, 0.3)" />
            <div v-else-if="indexLists.length === 0">空</div>
            <div v-else>列表</div>
            <empty-popup v-if="popupShow" v-model="popupShow" title="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types'

defineOptions({
    name: 'IndexRouter',
})

let isLoaded = $ref(false)

const popupShow = $ref(true)

const pageStyle = computed(() => {
    if (popupShow)
        return 'overflow: hidden; height: 100%'
    return 'overflow: inherit'
})

let page = $ref(1)

let indexLists: Article[] = $ref([])

let status = $ref('loadmore')

async function getData() {
    if (status === 'loading' || status === 'nomore')
        return
    status = 'loading'
    const { code, data } = await $api.get<ResDataLists<Article[]>>(`api/frontend/article/list?page=${page}&limit=20&by=visit&cache=true`)
    if (code === 200) {
        if (page === 1)
            indexLists = data.list
        else
            indexLists = indexLists.concat(data.list)

        if (data.hasNext) {
            page += 1
            status = 'loadmore'
        }
        else {
            status = 'nomore'
        }
    }
    else {
        status = 'loadmore'
    }
    setTimeout(() => {
        isLoaded = true
    }, 3000)
}
getData()
</script>

<route lang="yaml" type="home">
style:
  navigationStyle: custom
</route>
