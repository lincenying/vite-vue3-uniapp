import { defineStore } from 'pinia'
import type { UserData, UserInfo } from '~/pages/user.types'

export const useUserStore = defineStore('userInfo', () => {
    const lsUserInfo = ls.get<UserInfo>('user-info') || {}
    let userInfo: Nullable<UserInfo> = $ref(lsUserInfo)

    async function getUserInfo() {
        const { code, data } = await $api.get<UserData>('/user/info', { })
        if (code === 200 && data && data.userInfo) {
            userInfo = data.userInfo
            ls.set('user-info', data.userInfo)
        }
    }

    return {
        userInfo,
        getUserInfo,
    }
})
