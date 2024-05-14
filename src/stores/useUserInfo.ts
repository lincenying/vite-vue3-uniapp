import { defineStore } from 'pinia'
import type { UserData, UserInfo } from '~/pages/user.types'

interface State {
    userInfo: Nullable<UserInfo>
}

export const useUserStore = defineStore('userInfo', () => {
    const lsUserInfo = ls.get<UserInfo>('user-info') || {}
    const state: State = reactive({
        userInfo: lsUserInfo,
    })

    async function getUserInfo() {
        const { code, data } = await $api.get<UserData>('/user/info', { })
        if (code === 200 && data && data.userInfo) {
            state.userInfo = data.userInfo
            ls.set('user-info', data.userInfo)
        }
    }

    return {
        ...toRefs(state),
        getUserInfo,
    }
})
