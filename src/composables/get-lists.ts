import { sleep } from '@lincy/utils'
import type { UnwrapRef } from 'vue'

interface PageType {
    page: number
}

interface ListsReactive<T, K> {
    dataIsLoaded: boolean
    dataLists: T[]
    loadStatus: 'loading' | 'loadmore' | 'nomore'
    apiUrl: string
    apiParams: UnwrapRef<K>
}

/**
 * 获取类似带分页的列表接口
 * @param url api请求地址
 * @param params api请求参数
 * @returns
 */
export function useLists<T, K extends PageType = PageType>(url: string, params?: K) {
    const apiParams = params ?? { page: 1 } as K
    const listData: ListsReactive<T, K> = reactive({
        dataIsLoaded: false,
        dataLists: [],
        loadStatus: 'loadmore',
        apiUrl: url,
        apiParams,
    })

    async function getData() {
        if (listData.loadStatus === 'loading' || listData.loadStatus === 'nomore')
            return

        listData.loadStatus = 'loading'
        await sleep(1000)
        const { code, data } = await $api.get<ResDataLists<T[]>>(listData.apiUrl, listData.apiParams)
        if (code === 200) {
            if (listData.apiParams.page === 1)
                listData.dataLists = [...data.list]
            else
                listData.dataLists = listData.dataLists.concat(data.list)

            if (data.hasNext) {
                listData.apiParams.page += 1
                listData.loadStatus = 'loadmore'
            }
            else {
                listData.loadStatus = 'nomore'
            }
        }
        else {
            listData.loadStatus = 'loadmore'
        }
        listData.dataIsLoaded = true
    }

    getData()

    onReachBottom(getData)

    return {
        ...toRefs(listData),
        getData,
    }
}
