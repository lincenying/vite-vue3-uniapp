export type RefOrComputedRef<T> = Ref<T> | ComputedRef<T>

export interface NoDataType {
    pageIsLoaded: boolean
    hasData: boolean
    img?: string
    title?: string
}
