import type { ConfigEnv } from 'vite'
import path from 'node:path'

import process from 'node:process'
import uni from '@dcloudio/vite-plugin-uni'

import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import Unocss from 'unocss/vite'

import { defineConfig, loadEnv } from 'vite'

import Build from './vite.config.build'
import Components from './vite.config.components'
import Css from './vite.config.css'
// import Macros from './vite.config.macros'

import { uniPolyfill } from './vite.config.uniapp'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    console.log(`当前编译环境: ${process.env.VITE_APP_ENV}`)

    return {
        base: './',
        css: Css,
        server: Build.server,
        build: Build.build,
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`,
                '@/': `${path.resolve(__dirname, 'src')}/`,
            },
        },
        optimizeDeps: {
            include: [
                '@lincy/async-validation',
                '@lincy/utils',
            ],
        },
        plugins: [
            /**
             * vite-plugin-uni-pages
             * @see https://github.com/uni-helper/vite-plugin-uni-pages
             */
            UniPages({
                dts: 'src/uni-pages.d.ts',
                subPackages: [
                    'src/pages-sub',
                ],
            }),
            /**
             * vite-plugin-uni-layouts
             * @see https://uni-helper.js.org/vite-plugin-uni-layouts
             */
            UniLayouts(),

            ...Components(),
            // ...Macros(),

            // @ts-expect-error missing types
            uni.default(),

            /**
             * unocss
             * @see https://github.com/antfu/unocss
             * see unocss.config.ts for config
             */
            Unocss(),

            // 解决微信小程序, uni-mp-vue 中缺少 render和TransitionGroup 方法的问题
            uniPolyfill(),
        ],
    }
})
