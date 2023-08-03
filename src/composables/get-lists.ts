import { sleep } from '@lincy/utils'

interface ListsReactive<T> {
    pageIsLoaded: boolean
    page: number
    dataLists: T[]
    status: 'loading' | 'loadmore' | 'nomore'
    apiUrl: string
}

export function useLists<T>(payload: string) {
    const listData: ListsReactive<T> = reactive({
        pageIsLoaded: false,
        page: 1,
        dataLists: [],
        status: 'loadmore',
        apiUrl: payload,
    })

    async function getData() {
        if (listData.status === 'loading' || listData.status === 'nomore')
            return

        listData.status = 'loading'
        const { code, data } = await $api.get<ResDataLists<T[]>>(`${listData.apiUrl}${listData.apiUrl.includes('?') ? '&' : '?'}page=${listData.page}`)
        await sleep(3000)
        if (code === 200) {
            if (listData.page === 1)
                listData.dataLists = [...data.list]
            else
                listData.dataLists = listData.dataLists.concat(data.list)

            if (data.hasNext) {
                listData.page += 1
                listData.status = 'loadmore'
            }
            else {
                listData.status = 'nomore'
            }
        }
        else {
            listData.status = 'loadmore'
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
