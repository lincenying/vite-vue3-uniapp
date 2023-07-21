<template>
    <page-meta :page-style="pageStyle" />
    <div class="layout-img wrap wrap-tab IndexRouter" :class="{ dark: isDark }">
        <title-bar title="首页" :show-back="false" />
        <nut-loading-page v-if="!isLoaded" :loading="true" bg-color="rgba(255, 255, 255, 0.3)" custom-color="#666" font-size="16" />
        <div v-else p-24px>
            <div v-if="indexLists.length === 0">空</div>
            <div v-else>111111</div>
        </div>
        <empty-popup v-if="popupShow" v-model="popupShow" title="" />
    </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types'

defineOptions({
    name: 'IndexRouter',
})

let isLoaded = $ref(false)

const popupShow = $ref(false)

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
    }, 333000)
}
getData()
</script>
