import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import { viteMockServe } from '@lincy/vite-plugin-mock'

// @ts-expect-error failed to resolve types
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

import Components from './vite.config.components'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    resolve: {
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        UniPages(),
        UniLayouts(),
        Unocss(),
        ...Components(),
        uni(),
        ReactivityTransform(),
        viteMockServe({
            mockPath: 'mock',
            enable: command === 'serve',
            logger: true,
        }),
    ],

    server: {
        port: 9100,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9100',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/mock-api'),
            },
        },
    },
}))
