import DefineOptions from 'unplugin-vue-define-options/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import DefineProps from '@vue-macros/define-props/vite'
import DefinePropsRefs from '@vue-macros/define-props-refs/vite'

import type { PluginOption } from 'vite'

export default (): PluginOption[] => ([
    /**
     * Reactivity Transform
     * @see https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html
     */
    ReactivityTransform(),
    /**
     * defineOptions
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-options.html
     */
    DefineOptions(),
    /**
     * defineProps
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props.html
     */
    DefineProps(),
    /**
     * definePropsRefs
     * @see https://vue-macros.sxzz.moe/zh-CN/macros/define-props-refs.html
     */
    DefinePropsRefs(),
])
