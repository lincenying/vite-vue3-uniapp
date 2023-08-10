import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

function splitWords(str: string): string[] {
    const regex = /[A-Z][a-z]*/g // 正则表达式匹配大写字母开头的单词
    return str.match(regex) || [] // 返回匹配到的单词数组，如果没有匹配到则返回空数组
}

export function TuNiaoResolver(): ComponentResolver {
    return {
        type: 'component',
        resolve: (name: string) => {
            if (name.match(/^(Tn[A-Z]|tn-[a-z])/)) {
                const words = splitWords(name).map(item => item.toLowerCase())
                const dir = words[1]
                const file = words[2] ? `${words[1]}-${words[2]}` : words[1]
                const component = `@tuniao/tnui-vue3-uniapp/components/${dir}/src/${file}.vue`

                return {
                    name,
                    from: component,
                    sideEffects: '',
                }
            }
        },
    }
}
