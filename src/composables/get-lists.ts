import { sleep } from '@lincy/utils'

interface ListsReactive<T> {
    pageIsLoaded: boolean
    page: number
    dataLists: T[]
    status: 'loading' | 'more' | 'no-more'
    apiUrl: string
    apiParams: Obj
}

/**
 * 获取类似带分页的列表接口
 * @param url api请求地址
 * @param params api请求参数
 * @returns
 */
export function useLists<T>(url: string, params: Obj = {}) {
    const listData: ListsReactive<T> = reactive({
        pageIsLoaded: false,
        page: 1,
        dataLists: [],
        status: 'more',
        apiUrl: url,
        apiParams: params,
    })

    async function getData() {
        if (listData.status === 'loading' || listData.status === 'no-more')
            return

        listData.status = 'loading'
        listData.apiParams.page = listData.page
        const { code, data } = await $api.get<ResDataLists<T[]>>(`${listData.apiUrl}`, listData.apiParams)
        await sleep(3000)
        if (code === 200) {
            if (listData.page === 1)
                listData.dataLists = [...data.list]
            else
                listData.dataLists = listData.dataLists.concat(data.list)

            if (data.hasNext) {
                listData.page += 1
                listData.status = 'more'
            }
            else {
                listData.status = 'no-more'
            }
        }
        else {
            listData.status = 'more'
        }
        listData.pageIsLoaded = true
    }

    getData()

    onReachBottom(getData)

    return {
        ...toRefs(listData),
        getData,
    }
}
