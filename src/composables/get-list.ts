export function useList<T>(payload: string) {
    const listData: {
        pageIsLoaded: boolean
        dataLists: T[]
        apiUrl: string
    } = reactive({
        pageIsLoaded: false,
        dataLists: [],
        apiUrl: payload,
    })

    async function getData() {
        const { code, data } = await $api.get<T[]>(`${listData.apiUrl}`)
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
