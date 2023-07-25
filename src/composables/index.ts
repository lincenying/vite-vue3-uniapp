export const isDark = useDark()
export const toggleDark = () => isDark.value = !isDark.value

export const ls = {
    set(key: string, value: any) {
        uni.setStorageSync(key, value)
    },
    get<T = any>(key: string): T {
        return uni.getStorageSync(key)
    },
    del(key: string) {
        uni.removeStorageSync(key)
    },
    clear() {
        uni.clearStorageSync()
    },
}

/**
 * 获取当前系统是否为深色模式
 * @returns 是否为深色模式
 */
function useDark() {
    const darkMode = ref(false)
    const systemInfo = uni.getSystemInfoSync()
    darkMode.value = systemInfo?.theme === 'dark'
    uni.onThemeChange(res => darkMode.value = res.theme === 'dark')
    return darkMode
}

/**
 * 使用proxy转换为异步化的uni方法
 */
export const uniAsync = new Proxy({} as UniNamespace.Uni, {
    get(_, name) {
        return (obj: Obj) =>
            new Promise((resolve, reject) => {
                // @ts-expect-error: Unreachable code error
                uni[name]({
                    ...obj,
                    success: (ret: any) => {
                        resolve(ret)
                    },
                    fail: (err: any) => {
                        reject(err)
                    },
                })
            })
    },
})

/**
 * 获取胶囊位高度
 */
function getTitleHeight() {
    let navHeight = 0
    // #ifndef H5 || APP-PLUS || MP-ALIPAY
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
    const menuButtonObject = uni.getMenuButtonBoundingClientRect()
    navHeight = menuButtonObject.height + (menuButtonObject.top - (statusBarHeight || 0)) * 2
    // #endif
    // #ifdef H5 || APP-PLUS || MP-ALIPAY
    navHeight = 44
    // #endif
    return navHeight
}

export const titleHeight = getTitleHeight()

/**
 * 获取胶囊位高度
 */
function getStatusHeight() {
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
    return statusBarHeight
}

export const statusHeight = getStatusHeight()

export function getPageHeight(isTab = false) {
    const data = uni.getSystemInfoSync()
    return (isTab ? data.windowHeight : data.screenHeight) - statusHeight
}

type ToastIocn = 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception'

export function showToast(title: string, icon: ToastIocn = 'none', duration = 2000) {
    uni.showToast({
        title,
        icon,
        duration,
    })
}
