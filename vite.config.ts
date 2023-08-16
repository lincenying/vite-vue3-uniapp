import path from 'node:path'

import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'

import UniPages from '@uni-helper/vite-plugin-uni-pages'

// import VueDevTools from 'vite-plugin-vue-devtools'

import DefineOptions from 'unplugin-vue-define-options/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import DefineProps from '@vue-macros/define-props/vite'
import DefinePropsRefs from '@vue-macros/define-props-refs/vite'

import Css from './vite.config.css'
import Build from './vite.config.build'
import Components from './vite.config.components'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    console.log(`当前编译环境: ${process.env.VITE_APP_ENV}`)

    return {
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

            /**
             * defineOptions
             * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-options.html
             */
            DefineOptions(),
            /**
             * defineProps
             * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props.html
             */
            DefineProps(),
            /**
             * definePropsRefs
             * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props-refs.html
             */
            DefinePropsRefs(),
        ],
    }
})
