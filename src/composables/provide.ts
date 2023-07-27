import type { NoDataType, RefOrComputedRef } from '@/types'

export const noDataKey = Symbol('noDataKey') as InjectionKey<RefOrComputedRef<NoDataType>>
