import type { Preset, SourceCodeTransformer } from 'unocss'
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetApplet, transformerApplet, transformerAttributify } from 'unocss-applet'

const pxRE = /(-?[\.\d]+)px/g
// const rpxRE = /(-?[\.\d]+)rpx/g

interface opType {
    baseFontSize?: number
}

function pxToRpxPreset(options: opType = {}): Preset {
    const { baseFontSize = 100 } = options

    return {
        name: 'unocss-preset-px-to-rpx',
        postprocess: (util) => {
            util.entries.forEach((i) => {
                const value = i[1]
                // 将px单位转成rpx单位
                if (value && typeof value === 'string' && pxRE.test(value))
                    i[1] = value.replace(pxRE, (_, p1) => `${p1 / baseFontSize}rpx`)
                // 将无单位生生的rpx单位还原成自己需要的rpx单位
                // if (value && typeof value === 'string' && rpxRE.test(value))
                //     i[1] = value.replace(rpxRE, (_, p1) => `${(p1 * 4) / baseFontSize}rpx`)
            })
        },
    }
}

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false

const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (isApplet) {
    /**
   * UnoCSS Applet
   * @see https://github.com/unocss-applet/unocss-applet
   */
    presets.push(presetApplet())
    // presets.push(presetRemRpx()) // 如果需要使用 rem 转 rpx 单位，需要启用此插件
    transformers.push(transformerAttributify())
    transformers.push(transformerApplet())
}
else {
    presets.push(presetUno())
    presets.push(presetAttributify())
}

presets.push(pxToRpxPreset({ baseFontSize: 1 }))

export default defineConfig({
    presets: [
    // 由 Iconify 提供支持的纯 CSS 图标解决方案
        presetIcons({
            scale: 1.0,
            warn: true,
        }),
        ...presets,
    ],
    /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
    shortcuts: [
        ['flex--c', 'flex items-center'],
        ['flex-cc', 'flex justify-center items-center'],
        ['flex-bc', 'flex justify-between items-center'],
        ['flex-ac', 'flex justify-around items-center'],
        ['btn', 'px-32px py-8px rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ],
    transformers: [
        transformerDirectives(), // 启用 @apply 功能
        transformerVariantGroup(), // 启用 () 分组功能
        ...transformers,
    ],
})
