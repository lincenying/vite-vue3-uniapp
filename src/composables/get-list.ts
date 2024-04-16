interface ListReactive<T> {
    dataIsLoaded: boolean
    dataLists: T[]
    apiUrl: string
    isRefresh: boolean
}

/**
 * 获取类似无分页的列表接口
 * @param url api请求地址
 * @param params api请求参数
 */
export function useList<T, K extends Objable = object>(url: string, params?: K) {
    const apiParams = ref(params ?? {}) as Ref<K>
    const listData: ListReactive<T> = reactive({
        dataIsLoaded: false,
        dataLists: [],
        apiUrl: url,
        isRefresh: false,
    })

    async function getData() {
        const { code, data } = await $api.get<T[]>(listData.apiUrl, apiParams.value)
        if (code === 200) {
            listData.dataLists = [...data]
        }

        if (listData.isRefresh) {
            showToast('刷新成功!')
        }
        listData.dataIsLoaded = true
    }

    getData()

    onPullDownRefresh(async () => {
        listData.isRefresh = true
        await getData()
        uni.stopPullDownRefresh()
        listData.isRefresh = false
    })

    return {
        ...toRefs(listData),
        apiParams,
        getData,
    }
}
