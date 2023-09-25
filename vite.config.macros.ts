import DefineOptions from 'unplugin-vue-define-options/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import DefineProps from '@vue-macros/define-props/vite'
import DefinePropsRefs from '@vue-macros/define-props-refs/vite'

import type { PluginOption } from 'vite'

export default (): PluginOption[] => ([
    /**
     * defineOptions
     * @description 可以通过 defineOptions 宏在 <script setup> 中使用选项式 API
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-options.html
     */
    DefineOptions(),
    /**
     * Reactivity Transform
     * @description 响应性语法糖
     * @see https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html
     */
    ReactivityTransform(),
    /**
     * defineProps
     * @description 使用 $defineProps 可以正确地解构 props 的类型
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props.html
     */
    DefineProps(),
    /**
     * definePropsRefs
     * @description 从 defineProps 中将返回 refs 而不是 reactive 对象，可以在不丢失响应式的情况下解构 props
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props-refs.html
     */
    DefinePropsRefs(),
])
