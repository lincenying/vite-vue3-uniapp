import type { LayoutDataType, NoDataType, RefOrComputedRef } from '@/types'

export const layoutDataKey = Symbol('layoutDataKey') as InjectionKey<RefOrComputedRef<LayoutDataType>>

export const layoutReloadKey = Symbol('layoutReloadKey') as InjectionKey<() => Promise<void>>

export const noDataKey = Symbol('noDataKey') as InjectionKey<RefOrComputedRef<NoDataType>>
