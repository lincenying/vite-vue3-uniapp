<template>
    <layout class-name="layout-white UserLogin">
        <div mt-240px flex--c flex-col>
            <image src="https://media.sammu.top/lohascity/user/login-logo.png" h-310px w-386px />
            <div mt-117px flex--c>
                <TnCheckbox v-model="agreeValue" checked-shape="circle" active-color="#c39f35">
                    <div lh-36px text="font-500 26px #333">
                        我已阅读并同意
                        <text text="#c39f35" @click.stop="router.push('/pages-sub/user/agreement')">《用户使用协议》</text>
                    </div>
                </TnCheckbox>
            </div>
            <div mt-38px @click="onGotUserInfo">
                <image src="https://media.sammu.top/lohascity/user/login-submit.png" h-92px w-627px />
            </div>
            <div mt-42px @click="router.back()">
                <image src="https://media.sammu.top/lohascity/user/login-cancel.png" h-92px w-627px />
            </div>
        </div>
        <TnPopup v-model="needMobile" open-direction="center" :overlay-closeable="false" bg-color="none" :z-index="20091">
            <div relative h-544px w-570px>
                <image h-544px w-570px src="https://media.sammu.top/lohascity/user/need-login-bg.png" />
                <div absolute left-0 top-0 h-full w-full flex--c flex-col>
                    <div mt-300px text-28px font-500 lh-40px>为了购物方便,需要授权你的手机!</div>
                    <div mt-50px flex-cc>
                        <image h-96px w-231px src="https://media.sammu.top/lohascity/user/cancel.png" @click="needMobile = false" />
                        <button class="wx-btn" ml-28px h-96px w-231px open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                            <image h-96px w-231px src="https://media.sammu.top/lohascity/user/go-login.png" />
                        </button>
                    </div>
                </div>
            </div>
        </TnPopup>
    </layout>
</template>

<script setup lang="ts">
import type { LoginMpWx, LoginMpWxMobile } from './login.types'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'UserLogin',
})

useHead({
    title: 'Login',
})

const userStore = useUserStore()

let needMobile = $ref(false)
setTimeout(() => {
    needMobile = true
}, 100)

const form = reactive({
    code: '',
    encryptedData: '',
    iv: '',
    isParty: true,
    partyData: {},
    refereeId: 10001,
})

const agreeValue = $ref<boolean>(false)

// 微信小程序登录
async function onGotUserInfo() {
    if (!agreeValue)
        return showToast('请先同意用户使用协议')

    uni.showLoading({
        title: '正在登录',
        mask: true,
    })

    // 执行微信登录
    const e = await uniAsync.getUserProfile({
        desc: '获取头像昵称',
    })

    const res = await uniAsync.login()

    // 发送用户信息
    const { code, data } = await $api.post<LoginMpWx>('passport/loginMpWx', {
        form: {
            partyData: {
                oauth: 'MP-WEIXIN',
                userInfo: e.rawData,
                code: res.code,
            },
            referee_id: uni.getStorageSync('referee_id'),
        },
    }, {}, false)
    uni.hideLoading()
    if (code === 200) {
        ls.set('token', data.token)
        await userStore.getUserInfo()
        uni.reLaunch({
            url: '/pages/index',
        })
    }
    else if (code === 500) {
        if (data.isBindMobile) {
            form.partyData = {
                oauth: 'MP-WEIXIN',
                userInfo: JSON.parse(e.rawData),
                code: await getCode(),
            }
            needMobile = true
        }
    }
}

async function getCode(): Promise<string> {
    const res = await uniAsync.login({
        provider: 'weixin',
    })
    return res && res.code
}

async function getPhoneNumber(e: any) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
        form.iv = e.detail.iv
        form.encryptedData = e.detail.encryptedData
        form.code = await getCode()
        mpWeixinLogin()
    }
}
async function mpWeixinLogin() {
    const { code, data } = await $api.post<LoginMpWxMobile>('passport/loginMpWxMobile', { form })
    if (code === 200 && data.token) {
        ls.set('token', data.token)
        await userStore.getUserInfo()
        uni.reLaunch({
            url: '/pages/index',
        })
    }
}

provide(layoutDataKey, computed<LayoutDataType>(() => ({
    dataIsLoaded: true,
    hasData: true,
    showEmptySlot: false,
    topBarTitle: '',
    ...defaultHideBar,
})))
provide(dataReloadKey, async () => {
    showLoading()
    // await getData()
    uni.hideLoading()
})
</script>

<route lang="yaml">
style:
  navigationStyle: custom
</route>
