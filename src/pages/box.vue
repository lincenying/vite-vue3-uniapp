<template>
    <layout classes="wrap-tab layout-img BoxRouter">
        <TnScrollList>
            <view relative mb-30px flex flex-nowrap items-center>
                <view
                    v-for="i in 16" :key="i" class="tn-bg-image"
                    mr-40px flex shrink-0 grow-0 flex-col items-center
                >
                    <view
                        class="tn-bg-image tn-white_text"
                        :class="[`tn-gradient-bg__cool-${i}`]"
                        h-100px w-100px flex-cc border-rd-15px text-70px
                    >
                        <TnIcon name="moments" />
                    </view>
                    <view mt-15px> 北北 </view>
                </view>
            </view>
        </TnScrollList>

        <div>
            <TnPhotoAlbum :data="imageListData" :max="9" />
        </div>
    </layout>
</template>

<script setup lang="ts">
import type { Article } from './index.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'BoxRouter',
})

const imageListData = [
    'https://resource.tuniaokj.com/images/album/xiong1.jpg',
    'https://resource.tuniaokj.com/images/album/xiong2.jpg',
    'https://resource.tuniaokj.com/images/album/xiong3.jpg',
    'https://resource.tuniaokj.com/images/album/xiong4.jpg',
    'https://resource.tuniaokj.com/images/album/xiong5.jpg',
    'https://resource.tuniaokj.com/images/album/xiong6.jpg',
    'https://resource.tuniaokj.com/images/album/xiong7.jpg',
    'https://resource.tuniaokj.com/images/album/xiong8.jpg',
    'https://resource.tuniaokj.com/images/album/xiong9.jpg',
]

const url = $ref('api/frontend/article/list?limit=20&by=visit&cache=true')

const { pageIsLoaded, dataLists, getData } = useLists<Article>(`${url}`)

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    pageIsLoaded: pageIsLoaded.value,
    hasData: dataLists.value.length > 0,
    showNoData: !pageIsLoaded.value || dataLists.value.length === 0,
    barTitle: '首页',
    ...defaultBarData,
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
