const vmDesignWidth = 750 // 设计稿宽度
const vmDesignHeight = 1334 // 设计稿宽度
const vmMinWidth = 320 // 兼容最小宽度
const vmMaxWidth = 750 // 兼容最大宽度
const vmFontSize = 1

const vmMinWindow = `${vmMinWidth}Px` // 兼容最小宽度
const vmMaxWindow = `${vmMaxWidth}Px` // 兼容最大宽度
const vmDesignMultiple = vmDesignWidth / 750

export const designWidth = vmDesignWidth
export const designHeight = vmDesignHeight
export const designMultiple = vmDesignMultiple
export const minWidth = vmMinWidth
export const minWindow = vmMinWindow
export const maxWidth = vmMaxWidth
export const maxWindow = vmMaxWindow
export const fontSize = vmFontSize

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
