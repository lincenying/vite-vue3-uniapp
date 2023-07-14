/// <reference types="vitest" />
import path from 'node:path'

import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import { viteMockServe } from '@lincy/vite-plugin-mock'

// import VueDevTools from 'vite-plugin-vue-devtools'

import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

import Components from './vite.config.components'
import Css from './vite.config.css'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    console.log(`当前编译环境: ${process.env.VITE_APP_ENV}`)

    return {
        ...Css,
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`,
                '@/': `${path.resolve(__dirname, 'src')}/`,
            },
        },
        plugins: [
            /**
             * vite-plugin-uni-pages
             * @see https://github.com/uni-helper/vite-plugin-uni-pages
             */
            UniPages({
                subPackages: [
                    'src/pages-sub',
                ],
            }),

            /**
             * vite-plugin-uni-layouts
             * @see https://github.com/uni-helper/vite-plugin-uni-layouts
             */
            UniLayouts(),

            ...Components(),

            /**
             * unocss
             * @see https://github.com/antfu/unocss
             * see unocss.config.ts for config
            */
            Unocss(),

            /**
             * vite-plugin-vue-devtools 增强 Vue 开发者体验
             * @see https://github.com/webfansplz/vite-plugin-vue-devtools
             */
            // VueDevTools(),

            uni(),

            /**
             * Reactivity Transform
             * @see https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html
             */
            ReactivityTransform(),
            viteMockServe({
                mockPath: 'mock',
                enable: command === 'serve' || process.env.VITE_APP_ENV === 'test',
                logger: true,
            }),
        ],
        server: {
            port: 7778,
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:7778',
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, '/mock-api'),
                },
            },
        },
    }
})
