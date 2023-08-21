export type RefOrComputedRef<T> = Ref<T> | ComputedRef<T>

export interface LayoutDataType {
    /** 数据是否加载完成 */
    dataIsLoaded: boolean
    /** 是否有数据 */
    hasData: boolean
    /** 是否显示无数据组件 */
    showEmptySlot: boolean
    /** 无数据组件-无内容时显示的图片 */
    emptySlotImg?: string
    /** 无数据组件-无内容时显示的文字 */
    emptySlotText?: string
    /** 是否显示导航条 */
    showTopBar: boolean
    /** 不显示导航条时是否占位 */
    showTopBarPlaceholder?: boolean
    /** 导航条标题 */
    topBarTitle: string
    /** 导航条背景颜色 */
    topBarBgColor: string
    /** 导航条是否显示后退按钮 */
    showTopBarBackBtn: boolean
}

export interface EmptySlotType {
    dataIsLoaded: boolean
    hasData: boolean
    img?: string
    title?: string
}
