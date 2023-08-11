<template>
    <TnPopup v-model="showBasic" open-direction="center" :overlay-closeable="false" bg-color="none">
        <div relative h-924px w-578px>
            <image src="@/static/index/gift-bg.png" h-924px w-578px />
            <div absolute left-0 top-0 h-full w-full flex="~ col items-center">
                <tn-button type="primary">主要按钮</tn-button>
            </div>
        </div>
        <div mt-60px flex="~ justify-center">
            <image sr src="@/static/index/close.png" h-70px w-70px @click="onClose" />
        </div>
    </TnPopup>
</template>

<script lang="ts" setup>
const props = defineProps<{
    modelValue: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', palyload: boolean): void
}>()

let showBasic = $ref(props.modelValue)

watch(() => props.modelValue, () => {
    showBasic = props.modelValue
})

function onClose() {
    emits('update:modelValue', false)
}
</script>

<!-- #ifdef MP-WEIXIN -->
<script lang="ts">
export default {
    name: 'Layout',
    options: {
        // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
        virtualHost: true,
    },
}
</script>
<!-- #endif -->
