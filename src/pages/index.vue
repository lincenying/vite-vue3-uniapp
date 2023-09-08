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
                <tn-button size="lg" @click="submitForm"> 提交 </tn-button>
            </view>
        </div>

        <div flex--c>
            <div class="i-carbon:api" />
            <div class="i-svg-spinners:ring-resize" text="60px #f90" />
            <div v-if="checked === 0" class="i-mdi:checkbox-blank-circle-outline" text="60px #999" @click="checked = 1" />
            <div v-else class="i-mdi:checkbox-marked-circle" text="60px #f90" @click="checked = 0" />
            <div v-if="radioed === 0" class="i-mdi:checkbox-blank-outline" text="60px #999" @click="radioed = 1" />
            <div v-else class="i-mdi:checkbox-intermediate" text="60px #f90" @click="radioed = 0" />
        </div>

        <div flex--c>
            <lcy-checkbox v-model="checked2" :font-size="40" icon-color="#f90">
                <template #pre><div>请先同意协议</div></template>
                <div>请先同意协议</div>
            </lcy-checkbox>
        </div>

        <div>
            <wd-button>主要按钮</wd-button>
            <wd-loading color="green" type="outline" />
        </div>

        <div flex-bc>
            <div v-if="!heart" class="i-line-md:heart" text="40px" @click="heart = 1" />
            <div v-else class="i-line-md:heart-filled" text="40px" @click="heart = 0" />
            <div class="i-mdi:chevron-right" text="40px" />
        </div>
        <empty-popup v-model="popupShow" title="" @close="onPopupClose" />
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

const checked = $ref(0)
let checked2 = $ref(false)
const heart = $ref(0)
const radioed = $ref(0)

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

const { dataIsLoaded, dataLists, getData } = useLists<Article>('api/frontend/article/list')

watch(() => checked2, (val) => {
    if (val)
        popupShow = true
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
        if (valid)
            showToast('提交成功', 'success')

        else
            showToast('表单校验失败')
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

<route lang="yaml">
style:
  navigationStyle: custom
</route>
