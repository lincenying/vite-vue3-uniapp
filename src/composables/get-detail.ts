import { sleep } from '@lincy/utils'

interface DataDetail<T> {
    pageIsLoaded: boolean
    dataDetail: Nullable<T>
    apiUrl: string
    apiParams: Obj
}

/**
 * 获取类似详情页接口
 * @param url api请求地址
 * @param params api请求参数
 * @returns
 */
export function useDetail<T>(url: string, params: Obj = {}) {
    const dataDetail: DataDetail<T> = reactive({
        pageIsLoaded: false,
        dataDetail: null,
        apiUrl: url,
        apiParams: params,
    })

    async function getData() {
        const { code, data } = await $api.get<T>(`${dataDetail.apiUrl}`, dataDetail.apiParams)
        await sleep(3000)
        if (code === 200)
            dataDetail.dataDetail = data

        dataDetail.pageIsLoaded = true
    }

    getData()

    return {
        ...toRefs(dataDetail),
        getData,
    }
}
