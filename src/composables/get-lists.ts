interface PageType {
    page: number
}

interface ListsReactive<T> {
    dataIsLoaded: boolean
    dataLists: T[]
    loadStatus: 'loading' | 'error' | 'finished'
    apiUrl: string
    isRefresh: boolean
}

/**
 * 获取类似带分页的列表接口
 * @param url api请求地址
 * @param params api请求参数
 * @desc 第二个类型可以不传, 但是如果传的话, 必须要包含有 { page: number }
 */
export function useLists<T, K extends PageType = PageType>(url: string, params?: K) {
    const apiParams = ref(params ?? { page: 1 }) as Ref<K>
    const listData: ListsReactive<T> = reactive({
        dataIsLoaded: false,
        dataLists: [],
        loadStatus: 'loading',
        apiUrl: url,
        isRefresh: false,
    })

    async function getData() {
        if (listData.loadStatus === 'finished') {
            return
        }

        const { code, data } = await $api.get<ResDataLists<T[]>>(listData.apiUrl, apiParams.value)
        if (code === 200) {
            if (apiParams.value.page === 1) {
                listData.dataLists = [...data.list]
            }
            else {
                listData.dataLists = listData.dataLists.concat(data.list)
            }

            if (data.hasNext) {
                apiParams.value.page += 1
            }
            else {
                listData.loadStatus = 'finished'
            }

            if (listData.isRefresh) {
                showToast('刷新成功!')
            }
        }
        else {
            listData.loadStatus = 'error'
        }
        listData.dataIsLoaded = true
    }

    getData()

    onReachBottom(getData)

    onPullDownRefresh(async () => {
        apiParams.value.page = 1
        listData.isRefresh = true
        await getData()
        uni.stopPullDownRefresh()
        listData.isRefresh = false
    })

    return {
        ...toRefs(listData),
        apiParams,
        /** 请求方法 */
        getData,
    }
}
