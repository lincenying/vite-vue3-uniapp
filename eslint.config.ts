import { readFile } from 'node:fs/promises'
import lincy from '@lincy/eslint-config'

const autoImport = JSON.parse(
    (await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url))).toString(),
)

const config = lincy(
    {
        unocss: true,
        formatters: {
            css: true,
            graphql: true,
            html: true,
            markdown: true,
        },
        pnpm: true,
        toml: false,
        overrides: {
            ignores: [
                '**/static',
                '**/uni-app-types.d.ts',
            ],
        },
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
)

export default config
