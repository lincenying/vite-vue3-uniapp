import { sleep } from '@lincy/utils'

interface DataDetail<T> {
    pageIsLoaded: boolean
    dataDetail: Nullable<T>
    apiUrl: string
    apiParams: Obj
    needLogin: boolean
}

/**
 * 获取类似详情页接口
 * @param url api请求地址
 * @param params api请求参数
 * @param needLoginFn 接口返回401时执行函数
 * @returns
 */
export function useDetail<T>(url: string, params: Obj = {}, needLoginFn: AnyFn = () => {}) {
    const dataDetail: DataDetail<T> = reactive({
        pageIsLoaded: false,
        dataDetail: null,
        apiUrl: url,
        apiParams: params,
        needLogin: false,
    })

    async function getData() {
        await sleep(3000)
        const { code, data } = await $api.get<T>(`${dataDetail.apiUrl}`, dataDetail.apiParams)
        if (code === 200) {
            dataDetail.dataDetail = data
        }
        else if (code === 401) {
            dataDetail.needLogin = true
            needLoginFn()
        }

        dataDetail.pageIsLoaded = true
    }

    getData()

    return {
        ...toRefs(dataDetail),
        getData,
    }
}
