/** 设计稿宽度 */
export const designWidth = 750
/** 设计稿宽度 */
export const designHeight = 1334
export const designMultiple = designWidth / 750
/** 兼容最小宽度 */
export const minWidth = 320
/** 兼容最大宽度 */
export const minWindow = 750
/** 兼容最小宽度 */
export const maxWidth = `${minWidth}Px`
/** 兼容最大宽度 */
export const maxWindow = `${minWindow}Px`
/** px转rpx的比例 */
export const fontSize = designWidth / 750

export const charsetRemoval = function () {
    return {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
            charset: (atRule: any) => {
                if (atRule.name === 'charset')
                    atRule.remove()
            },
        },
    }
}
