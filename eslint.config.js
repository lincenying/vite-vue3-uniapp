import { readFile } from 'node:fs/promises'
import lincy from '@lincy/eslint-config'
import plugin from '@unocss/eslint-plugin'

const autoImport = JSON.parse(
    await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url)),
)

const config = lincy(
    {
        unocss: true,
        formatters: {
            css: false,
            graphql: true,
            html: true,
            markdown: true,
            toml: false,
        },
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
    {
        ignores: [
            '**/assets',
            '**/static',
            '**/uni-app-types.d.ts',
        ],
    },
)

export default config
