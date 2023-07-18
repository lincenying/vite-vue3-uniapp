import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default () => ([
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
            {
                '@/api': ['$api'],
                '@lincy/utils': ['deepClone', 'deepMerge', 'deepEqual'],
                'pinia': ['defineStore', 'storeToRefs'],
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
        dts: 'src/z-auto-imports.d.ts',
        dirs: ['src/components', 'src/composables', 'src/pinia'],

        resolvers: [],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    /**
     * unplugin-vue-components 按需引入组件
     * 注意：需注册至 uni 之前，否则不会生效
     * @see https://github.com/antfu/vite-plugin-components
     */
    Components({
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        extensions: ['vue', 'tsx', 'jsx'],
        resolvers: [],
        dts: 'src/z-components.d.ts',
        directoryAsNamespace: true,
    }),
])
