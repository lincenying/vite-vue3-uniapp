import type { PluginOption } from 'vite'
import { TuNiaoForkResolver, wotDesignResolver } from '@lincy/uniapp-ui-resolver'
import Components from '@uni-helper/vite-plugin-uni-components'

import AutoImport from 'unplugin-auto-import/vite'

export default (): PluginOption[] => ([
    /**
     * unplugin-auto-import 按需 import
     * @see https://github.com/antfu/unplugin-auto-import
     */
    AutoImport({
        eslintrc: {
            enabled: true,
        },
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        imports: [
            'vue',
            '@vueuse/core',
            {
                '@lincy/utils': ['deepClone', 'deepMerge', 'deepEqual'],
                'pinia': ['defineStore', 'storeToRefs'],
                '@unhead/vue': ['useHead'],
                '@dcloudio/uni-app': [
                    'onLaunch',
                    'onShow',
                    'onHide',
                    'onLoad',
                    'onReady',
                    'onUnload',
                    'onPullDownRefresh',
                    'onReachBottom',
                    // ... 按需添加 {@link https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle}
                ],
            },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/components', 'src/composables', 'src/stores'],

        resolvers: [],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    /**
     * unplugin-vue-components 按需引入组件
     * 注意：需注册至 uni 之前，否则不会生效
     * @see https://github.com/antfu/vite-plugin-components
     * @see https://github.com/lincenying/uniapp-ui-resolver
     */
    Components({
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        extensions: ['vue', 'tsx', 'jsx'],
        resolvers: [
            // TuNiaoResolver(), // 官方版TuNiaoUi
            TuNiaoForkResolver(), // 个人Fork版的TuNiaoUi
            wotDesignResolver(),
        ],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
    }),
])
