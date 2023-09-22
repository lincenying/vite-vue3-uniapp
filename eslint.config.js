const fs = require('node:fs')
const eslintConfig = require('@lincy/eslint-config').default
const plugin = require('@unocss/eslint-plugin')

const autoImport = JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json'))

const config = eslintConfig(
    undefined,
    {
        plugins: {
            '@unocss': plugin,
        },
        rules: plugin.configs.recommended.rules,
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
