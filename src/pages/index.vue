<template>
    <page-meta :page-style="pageStyle" />
    <view class="init-top" />
    <layout class-name="wrap-tab layout-img IndexRouter">
        <div h-420px w-full>
            <wd-swiper v-model:current="currentSwiperIndex" :list="swiperData" height="100%" autoplay loop class="h-full"></wd-swiper>
        </div>
        <div bg="hex-fff" mt-24px border-rd-16px p-24px>
            <wd-form ref="formRef" :model="formData" :rules="formRules" label-width="140">
                <wd-cell-group>
                    <wd-input v-model="formData.username" label="用户名" prop="username" />

                    <wd-input v-model="formData.password" label="密码" prop="password" type="text" :show-password="true" />
                </wd-cell-group>
            </wd-form>
            <view class="tn-mt tn-flex-center">
                <wd-button size="medium" @click="submitForm"> 提交 </wd-button>
            </view>
        </div>

        <div mt-20px flex--c>
            <div class="i-carbon:api" />
            <div class="i-svg-spinners:ring-resize" text="60px hex-f90" />
            <div v-if="checked === 0" class="i-mdi:checkbox-blank-circle-outline" text="60px hex-999" @click="checked = 1" />
            <div v-else class="i-mdi:checkbox-marked-circle" text="60px hex-f90" @click="checked = 0" />
            <div v-if="radioed === 0" class="i-mdi:checkbox-blank-outline" text="60px hex-999" @click="radioed = 1" />
            <div v-else class="i-mdi:checkbox-intermediate" text="60px hex-f90" @click="radioed = 0" />
        </div>

        <div mt-20px flex--c>
            <lcy-checkbox v-model="checked2" :font-size="40" icon-color="#f90">
                <template #pre><div>单选框前置文本</div></template>
                <div>单选框后置文本</div>
            </lcy-checkbox>
        </div>

        <div mt-20px>
            <wd-button>主要按钮</wd-button>
            <wd-loading color="green" type="outline" />
        </div>

        <div mt-20px flex-bc>
            <div v-if="!heart" class="i-line-md:heart" text="40px" @click="heart = 1" />
            <div v-else class="i-line-md:heart-filled" text="40px" @click="heart = 0" />
            <div class="i-mdi:chevron-right" text="40px" />
        </div>
        <empty-popup v-model="popupShow" title="" @close="onPopupClose" />
    </layout>
</template>

<script setup lang="ts">
import type { FormInstance, FormItemRule, FormRules } from 'wot-design-uni/components/wd-form/types'
import type { Article } from './index.types'
import type { LayoutDataType } from '~/types'
import rules from '@lincy/async-validation'

defineOptions({
    name: 'IndexRouter',
})

useHead({
    title: 'Home',
})

let popupShow = $ref(false)

const checked = $ref(0)
let checked2 = $ref(false)
const heart = $ref(0)
const radioed = $ref(0)

// #ifdef H5
useAutoScroll([
    () => popupShow,
])
// #endif

const pageStyle = computed(() => {
    if (popupShow) {
        return 'overflow: hidden; height: 100%'
    }
    return 'overflow: inherit'
})

const { dataIsLoaded, dataLists, getData } = useLists<Article>('/article/lists')

watch(() => checked2, (val) => {
    if (val) {
        popupShow = true
    }
})
function onPopupClose(payload: boolean) {
    checked2 = payload
}

const swiperData = [
    'https://resource.tuniaokj.com/images/xiongjie/x14.jpg',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-2.jpg',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
    'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
]
const currentSwiperIndex = ref(0)

const formRef = ref<FormInstance>()

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
            required: false,
            pattern: /^[\w-]{4,16}$/,
            message: '请输入4-16位英文、数字、下划线、横线',
            trigger: ['change', 'blur'],
        },
    ],
    password: rules.string('密码', 16, 6) as FormItemRule[],
}

/* 提交表单 */
function submitForm() {
    formRef.value?.validate().then(({ valid }) => {
        if (valid) {
            showToast('提交成功', 'success')
        }
        else {
            showToast('表单校验失败')
        }
    })
}

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    dataIsLoaded: dataIsLoaded.value,
    hasData: dataLists.value.length > 0,
    showEmptySlot: !dataIsLoaded.value || dataLists.value.length === 0,
    topBarTitle: '首页',
    ...defaultShowBar,
})))
provide(dataReloadKey, async () => {
    showLoading()
    await getData()
    uni.hideLoading()
})
</script>

<route lang="json">
{
    "layout": "default",
    "style": {
        "navigationStyle": "custom"
    }
}
</route>
