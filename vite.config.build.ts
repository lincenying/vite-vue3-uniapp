import type { BuildOptions, ServerOptions } from 'vite'

const config: { server: ServerOptions, build: BuildOptions } = {
    server: {
        port: 6778,
        proxy: {
            '/api': {
                target: 'https://php.mmxiaowu.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
        },
        /**
         * 预热常用文件
         * @see https://cn.vitejs.dev/guide/performance#warm-up-frequently-used-files
         */
        warmup: {
            clientFiles: ['./src/main.ts', './src/pages/**/*.vue', './src/pages-sub/**/*.vue'],
        },
    },
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        minify: true,
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    // 处理css分块
                    if (id.includes('.css') || id.includes('.scss') || id.includes('.sass') || id.includes('.less')) {
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                        if (id.includes('__uno.css')) {
                            return 'unocss'
                        }
                    }
                },
            },
        },
    },
}

export default config
