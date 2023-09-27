const fs = require('node:fs')
const lincy = require('@lincy/eslint-config').lincy
const plugin = require('@unocss/eslint-plugin')

const autoImport = JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json'))

const config = lincy(
    undefined,
    {
        plugins: {
            '@unocss': plugin,
        },
        rules: {
            ...plugin.configs.recommended.rules,
            '@unocss/order': 'off',
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

module.exports = config
