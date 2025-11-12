<template>
    <layout class-name="wrap-tab layout-img BoxRouter">
        <template #header-slot>
            <div p-24px text-center class="pb0">header-slot 插槽</div>
        </template>
        <div v-if="dataDetail" bg="hex-fff" border-rd-16px p-24px>
            <rich-text :nodes="dataDetail.c_content" />
        </div>
    </layout>
</template>

<script setup lang="ts">
import type { Article } from '~/pages/index.types'
import type { LayoutDataType } from '~/types'
import { isEmpty } from '@lincy/utils'

defineOptions({
    name: 'BoxRouter',
})

// url 传的参数, 在 uniapp 中属于 attrs, 由于 attrs 不具有响应性, 所以不能使用 defineProps + toRefs, 否则控制台会出现警告
const props = defineProps<{ id: string }>()

definePage({
    style: {
        navigationStyle: 'custom',
        enablePullDownRefresh: true,
    },
})

const id = $toRef(props, 'id')

console.log($$(id))

const { dataIsLoaded, dataDetail, getData, apiParams } = useDetail<Article, { id: string }>(`/article/detail/${id}`, { id })

console.log(apiParams.value)

setTimeout(() => {
    apiParams.value.id = '123'
    getData()
}, 5000)

provide(
    layoutDataKey,
    computed<LayoutDataType>(() => ({
        dataIsLoaded: dataIsLoaded.value,
        hasData: !isEmpty(dataDetail.value),
        showEmptySlot: !dataIsLoaded.value || !dataDetail.value,
        topBarTitle: '详情',
        ...defaultHideBar,
    })),
)
provide(dataReloadKey, async () => {
    showLoading()
    await getData()
    uni.hideLoading()
})

useHead({
    title: computed(() => dataDetail.value?.c_title || ''),
})
</script>
