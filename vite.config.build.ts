import type { BuildOptions, ServerOptions } from 'vite'

const config: { server: ServerOptions; build: BuildOptions } = {
    server: {
        port: 6778,
        proxy: {
            '/api': {
                target: 'https://api.mmxiaowu.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
        },
    },
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        minify: true,
    },
}

export default config
