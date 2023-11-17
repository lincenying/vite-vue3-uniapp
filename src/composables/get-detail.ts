import type { UnwrapRef } from 'vue'

interface DataDetail<T, K> {
    dataIsLoaded: boolean
    dataDetail: Nullable<T>
    apiUrl: string
    apiParams: UnwrapRef<K>
    isRefresh: boolean
    needLogin: boolean
}

/**
 * 获取类似详情页接口
 * @param url api请求地址
 * @param params api请求参数
 * @param needLoginFn 接口返回401时执行函数
 */
export function useDetail<T, K extends object = object>(url: string, params?: K, needLoginFn: AnyFn = () => {}) {
    const apiParams = params ?? {} as K
    const dataDetail: DataDetail<T, K> = reactive({
        dataIsLoaded: false,
        dataDetail: null,
        apiUrl: url,
        apiParams,
        needLogin: false,
        isRefresh: false,
    })

    async function getData() {
        const { code, data } = await $api.get<T>(dataDetail.apiUrl, dataDetail.apiParams)
        if (code === 200) {
            dataDetail.dataDetail = data

            if (dataDetail.isRefresh)
                showToast('刷新成功!')
        }
        else if (code === 401) {
            dataDetail.needLogin = true
            needLoginFn()
        }

        dataDetail.dataIsLoaded = true
    }

    getData()

    onPullDownRefresh(async () => {
        dataDetail.isRefresh = true
        await getData()
        uni.stopPullDownRefresh()
        dataDetail.isRefresh = false
    })

    return {
        ...toRefs(dataDetail),
        getData,
    }
}
