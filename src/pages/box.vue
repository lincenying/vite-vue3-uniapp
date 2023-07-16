<template>
    <div class="wrap wrap-tab BoxRouter">
        <title-bar title="盒柜" :show-back="false" />
        <div h-24px />
    </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types'

defineOptions({
    name: 'BoxRouter',
})

let tabActive = $ref(0)
function handleClickTab(tab: number) {
    tabActive = tab
}

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

<style lang="scss" scoped>
.scroll-item {
    background: #F2ECCE;
    @apply ml-14px h-52px w-120px flex-none border-rd-10px font-500 lh-42px text-center text="30px [#666]";
    &.active {
        background: #F6D53C;
    }
}
</style>

<route lang="yaml">
layout: bgisimg
style:
  navigationStyle: custom
</route>
