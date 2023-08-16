import type { MaybeRefOrGetter } from 'vue'

export function useScroll(watchData: MaybeRefOrGetter[]) {
    let initTop = $ref(0)
    let scrollTop = $ref(0)

    onMounted(() => {
        setTimeout(() => {
            const query = uni.createSelectorQuery()
            query.select('.init-top').boundingClientRect((res) => {
                initTop = (Array.isArray(res) ? res[0].top : res.top) || 0
            }).exec()
        }, 100)
    })
    const stop = watch(watchData, (val, oldVal) => {
        let hasTrue = false
        val.forEach((_item, index) => {
            if (oldVal[index] && !val[index])
                hasTrue = true
        })
        if (hasTrue) {
            setTimeout(() => {
                uni.pageScrollTo({
                    scrollTop,
                    duration: 100,
                })
            }, 30)
        }
        else {
            const query = uni.createSelectorQuery()
            query.select('.init-top').boundingClientRect((res) => {
                scrollTop = initTop - ((Array.isArray(res) ? res[0].top : res.top) || 0)
            }).exec()
        }
    })
    onBeforeUnmount(() => {
        stop()
    })
}
