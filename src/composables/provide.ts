import type { EmptySlotType, LayoutDataType, RefOrComputedRef } from '@/types'

export const layoutDataKey = Symbol('layoutDataKey') as InjectionKey<RefOrComputedRef<LayoutDataType>>

export const dataReloadKey = Symbol('dataReloadKey') as InjectionKey<() => Promise<void>>

export const noDataKey = Symbol('noDataKey') as InjectionKey<RefOrComputedRef<EmptySlotType>>
