import viewport from 'postcss-px-to-viewport-8-plugin'
import type { CSSOptions } from 'vite'
import { charsetRemoval, designHeight, designMultiple, designWidth, fontSize, maxWidth, maxWindow, minWidth, minWindow } from './src/design.config'

const Css: CSSOptions = {
    preprocessorOptions: {
        scss: {
            additionalData: `
                $vmDesignWidth: ${designWidth};
                $vmDesignHeight: ${designHeight};
                $vmDesignMultiple: ${designMultiple};
                $vmMinWidth: ${minWidth};
                $vmMinWindow: ${minWindow};
                $vmMaxWidth: ${maxWidth};
                $vmMaxWindow: ${maxWindow};
                $vmFontSize: ${fontSize};
            `,
        },
    },
    postcss: {
        plugins: [
            /**
             * 将 px 单位转换为视图单位(vw, vh, vmin, vmax)的 PostCSS 插件
             * @see https://github.com/lkxian888/postcss-px-to-viewport-8-plugin#readme
             */
            viewport({
                unitToConvert: 'px', // 要转化的单位
                viewportWidth: fontSize * 100, // UI设计稿的宽度
                unitPrecision: 6, // 转换后的精度，即小数点位数
                propList: ['*'], // 指定可以转换的css属性，*代表全部css属性
                viewportUnit: 'rpx', // 指定需要转换成的视窗单位，默认vw
                fontViewportUnit: 'rpx', // 指定字体需要转换成的视窗单位，默认vw
                selectorBlackList: ['uni-'], // 指定不转换为视窗单位的类名
                minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                replace: true, // 是否转换后直接更换属性值
                // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                landscape: false, // 是否处理横屏情况
            }),
            charsetRemoval(),
        ],
    },
}

export default Css
