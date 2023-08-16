<template>
    <page-meta :page-style="pageStyle" />
    <div class="init-top" />
    <layout class-name="wrap-tab layout-img IndexRouter">
        <empty-components />
        <div h-420px w-full>
            <TnSwiper v-model="currentSwiperIndex" :data="swiperData" loop autoplay>
                <template #default="{ data }">
                    <view h-full w-full border-rd-30px>
                        <image h-full w-full :src="data" mode="aspectFill" />
                    </view>
                </template>
            </TnSwiper>
        </div>
        <div bg="#fff" mt-24px border-rd-16px p-24px>
            <TnForm ref="formRef" :model="formData" :rules="formRules" label-width="140">
                <TnFormItem label="用户名" prop="username">
                    <TnInput v-model="formData.username" size="sm" />
                </TnFormItem>
                <TnFormItem label="密码" prop="password">
                    <TnInput v-model="formData.password" size="sm" type="password" />
                </TnFormItem>
            </TnForm>
            <view class="tn-mt tn-flex-center">
                <TnButton size="lg" @click="submitForm"> 提交 </TnButton>
            </view>
        </div>

        <empty-popup v-if="popupShow" v-model="popupShow" title="" />
    </layout>
</template>

<script setup lang="ts">
import type { FormItemRule, FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import rules from '@lincy/async-validation'
import type { Article } from './index.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'IndexRouter',
})

let popupShow = $ref(false)

// #ifdef H5
useScroll([
    () => popupShow,
])
// #endif
const pageStyle = computed(() => {
    if (popupShow)
        return 'overflow: hidden; height: 100%'
    return 'overflow: inherit'
})

const { pageIsLoaded, dataLists, getData } = useLists<Article>('api/frontend/article/list', {
    limit: 20,
    by: 'visit',
    cache: 'true',
})

watch(pageIsLoaded, (val) => {
    if (val)
        popupShow = true
})

const swiperData = [
    'https://resource.tuniaokj.com/images/xiongjie/x14.jpg',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-2.jpg',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
]
const currentSwiperIndex = ref(0)

const formRef = ref<TnFormInstance>()

// 表单数据
const formData = reactive({
    username: '',
    password: '',
})

// 规则
const formRules: FormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
        {
            pattern: /^[\w-]{4,16}$/,
            message: '请输入4-16位英文、数字、下划线、横线',
            trigger: ['change', 'blur'],
        },
    ],
    password: rules.string('密码', 16, 6) as FormItemRule[],
}

/* 提交表单 */
function submitForm() {
    formRef.value?.validate((valid) => {
        if (valid) {
            uni.showToast({
                title: '提交成功',
            })
        }
        else {
            uni.showToast({
                title: '表单校验失败',
                icon: 'none',
            })
        }
    })
}

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
