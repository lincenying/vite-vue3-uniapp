import type { UnwrapRef } from 'vue'

interface ListReactive<T, K> {
    dataIsLoaded: boolean
    dataLists: T[]
    apiUrl: string
    apiParams: UnwrapRef<K>
}

/**
 * 获取类似无分页的列表接口
 * @param url api请求地址
 * @param params api请求参数
 * @returns
 */
export function useList<T, K extends object = object>(url: string, params?: K) {
    const apiParams = params ?? {} as K
    const listData: ListReactive<T, K> = reactive({
        dataIsLoaded: false,
        dataLists: [],
        apiUrl: url,
        apiParams,
    })

    async function getData() {
        const { code, data } = await $api.get<T[]>(listData.apiUrl, listData.apiParams)
        if (code === 200)
            listData.dataLists = [...data]

        listData.dataIsLoaded = true
    }

    getData()

    return {
        ...toRefs(listData),
        getData,
    }
}
