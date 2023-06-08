import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default () => ([
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
            '@vueuse/head',
            {
                '@/api': ['$api'],
                '@lincy/utils': ['deepClone', 'deepMerge', 'deepEqual'],
                'pinia': ['defineStore', 'storeToRefs'],
                '@dcloudio/uni-app': [
                    'onLaunch',
                    'onShow',
                    'onHide',
                    'onLoad',
                    'onPullDownRefresh',
                    'onReachBottom',
                    // ... 按需添加 {@link https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle}
                ],
            },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/components', 'src/composables', 'src/pinia'],

        resolvers: [ElementPlusResolver()],
        defaultExportByFilename: false,
        vueTemplate: true,
    }),
    Components({
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
        ],
        extensions: ['vue', 'tsx', 'jsx'],
        resolvers: [ElementPlusResolver()],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
    }),
])
