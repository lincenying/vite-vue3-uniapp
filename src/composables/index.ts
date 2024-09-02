import type { LayoutOtherDataType } from '~/types'

export const isDark = useDark()
export const toggleDark = () => isDark.value = !isDark.value

/**
 * 本地存储封装
 */
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
        return (obj: Objable) => new Promise((resolve, reject) => {
            try {
                // @ts-expect-error 通过吧
                uni[name]({
                    ...obj,
                    success: (ret: any) => {
                        resolve(ret)
                    },
                    fail: (err: any) => {
                        reject(err)
                    },
                })
            }
            catch (error: unknown) {
                const err = error as Error
                console.log(err.message)
                showToast(`${String(name)}: 方法不存在...`)
            }
        })
    },
})

type ToastIcon = 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception'

/**
 * 封装uni.showToast
 * @param title 标题
 * @param icon 图标
 * @param duration 延迟时间
 * @description 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showtoast](http://uniapp.dcloud.io/api/ui/prompt?id=showtoast)
 */
export function showToast(title: string, icon: ToastIcon = 'none', duration = 2000) {
    uni.showToast({
        title,
        icon,
        duration,
    })
}

/**
 * 显示 loading 提示框
 *
 * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showloading](http://uniapp.dcloud.io/api/ui/prompt?id=showloading)
 */
export function showLoading(title: string = '加载中...', mask = true) {
    uni.showLoading({
        title,
        mask,
    })
}

/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @description
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 * @example
 * ```
 * const Fn = useLockFn(async (key) => {
 *  console.log(key)
 * }
 *
 * <div v-on:click="Fn(123)"></div>
 * ```
 */
export function useLockFn(fn: AnyFn, autoUnlock: boolean | 'auto' = 'auto') {
    const lock = ref(false)
    return async (...args: any[]) => {
        if (lock.value) {
            return
        }
        lock.value = true
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) {
                lock.value = false
            }
        }
        catch (e) {
            lock.value = false
            throw e
        }
    }
}

/**
 * 对象转换为多维数组
 * @param obj 初始对象
 * @param _key 表示父级的字段
 * @param _value 最顶级的默认值
 * @returns 带父子结构的多维数组
 * @example
 * ```ts
 const obj = {
    '1': {
        id: 1,
        pid: 0,
        name: '北京',
        level: 1,
    },
    '2': {
        id: 2,
        pid: 1,
        name: '北京市',
        level: 2,
    },
    '3': {
        id: 3,
        pid: 2,
        name: '东城区',
        level: 3,
    },
}
```
ObjectToArray(a) =>
 * ```ts
[
    {
        id: 1,
        pid: 0,
        name: '北京',
        level: 1,
        children: [
            {
                id: 2,
                pid: 1,
                name: '北京市',
                level: 2,
                children: [
                    {
                        id: 3,
                        pid: 2,
                        name: '东城区',
                        level: 3,
                        children: [],
                    },
                ],
            },
        ],
    }
]
```
 */
export function ObjectToArray(obj: any, _key = 'pid', _value = 0) {
    const result = []

    for (const key in obj) {
        const item = obj[key]

        if (item[_key] === _value) {
            const children = ObjectToArray(obj, _key, item.id)
            item.children = children
            result.push(item)
        }
    }

    return result
}

export const defaultShowBar: LayoutOtherDataType = {
    showTopBar: false,
    showTopBarPlaceholder: true,
    topBarBgColor: 'none',
    showTopBarBackBtn: false,
}

export const defaultHideBar: LayoutOtherDataType = {
    showTopBar: true,
    showTopBarPlaceholder: false,
    topBarBgColor: 'none',
    showTopBarBackBtn: true,
}
