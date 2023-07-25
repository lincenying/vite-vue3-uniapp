interface DataDetail<T> {
    pageIsLoaded: boolean
    dataDetail: Nullable<T>
    apiUrl: string
}

export function useDetail<T>(payload: string) {
    const dataDetail: DataDetail<T> = reactive({
        pageIsLoaded: false,
        dataDetail: null,
        apiUrl: payload,
    })

    async function getData() {
        const { code, data } = await $api.get<T>(`${dataDetail.apiUrl}`)
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
