<template>
    <div class="layout-img wrap wrap-tab BoxRouter" :class="{ dark: isDark }">
        <title-bar title="盒柜" :show-back="false" />
        <div p-24px>2222</div>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types'

defineOptions({
    name: 'BoxRouter',
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
}

// async function onScroll() {
//     await getData()
// }

getData()
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
