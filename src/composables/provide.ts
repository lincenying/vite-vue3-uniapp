import type { EmptySlotType, LayoutDataType, RefOrComputedRef } from '@/types'

/** 页面框架数据 */
export const layoutDataKey = Symbol('layoutDataKey') as InjectionKey<RefOrComputedRef<LayoutDataType>>

/** 页面框架重新加载函数 */
export const dataReloadKey = Symbol('dataReloadKey') as InjectionKey<() => Promise<void>>

export const noDataKey = Symbol('noDataKey') as InjectionKey<RefOrComputedRef<EmptySlotType>>
