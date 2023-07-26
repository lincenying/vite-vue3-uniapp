import path from 'node:path'

import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'

import UniPages from '@uni-helper/vite-plugin-uni-pages'
import DefineOptions from 'unplugin-vue-define-options/vite'

// import VueDevTools from 'vite-plugin-vue-devtools'

import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

import Components from './vite.config.components'
import Css from './vite.config.css'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
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
        optimizeDeps: {
            include: [],
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
            DefineOptions(),
        ],
        server: {
            port: 6778,
            proxy: {
                '/api': {
                    target: 'https://www.mmxiaowu.com',
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, '/api'),
                },
            },
        },
    }
})
