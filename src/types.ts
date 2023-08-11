export type RefOrComputedRef<T> = Ref<T> | ComputedRef<T>

export interface LayoutDataType {
    /** 数据是否加载完成 */
    pageIsLoaded: boolean
    /** 是否有数据 */
    hasData: boolean
    /** 是否显示无数据组件 */
    showNoData: boolean
    /** 无数据组件-无内容时显示的图片 */
    layoutImg?: string
    /** 无数据组件-无内容时显示的文字 */
    layoutText?: string
    /** 是否显示导航条 */
    showBar: boolean
    /** 不显示导航条时是否占位 */
    showPlaceholder?: boolean
    /** 导航条标题 */
    barTitle: string
    /** 导航条背景颜色 */
    barBgColor: string
    /** 导航条是否显示后退按钮 */
    barShowBack: boolean
}

export interface NoDataType {
    pageIsLoaded: boolean
    hasData: boolean
    img?: string
    title?: string
}
