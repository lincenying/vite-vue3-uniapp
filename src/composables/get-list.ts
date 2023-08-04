interface ListReactive<T> {
    pageIsLoaded: boolean
    dataLists: T[]
    apiUrl: string
    apiParams: Obj
}

/**
 * 获取类似无分页的列表接口
 * @param url api请求地址
 * @param params api请求参数
 * @returns
 */
export function useList<T>(url: string, params: Obj = {}) {
    const listData: ListReactive<T> = reactive({
        pageIsLoaded: false,
        dataLists: [],
        apiUrl: url,
        apiParams: params,
    })

    async function getData() {
        const { code, data } = await $api.get<T[]>(`${listData.apiUrl}`, listData.apiParams)
        if (code === 200)
            listData.dataLists = [...data]

        listData.pageIsLoaded = true
    }

    getData()

    return {
        ...toRefs(listData),
        getData,
    }
}
