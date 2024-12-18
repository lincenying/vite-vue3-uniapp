# Uniapp Vue3 项目模板

Uniapp Vue3 项目模板, 包含技术栈(Vue3 + TuniaoUI/wot-design-uni + Pinia + Vite + TS + Unocss)

- Rem 适配
- 自动引入UI库组件/项目组件/函数等
- Pinia 状态管理
- 自动生成路由
- Api封装
- 列表封装: useLists
- 开发环境配置proxy跨域
- Unocss
- UnoCSS Icons
- eslint/stylelint/prettierrc/vue-tsc

运行方法参考 uni-app 官方文档：[运行、发布uni-app](https://uniapp.dcloud.net.cn/quickstart-cli.html#%E8%BF%90%E8%A1%8C%E3%80%81%E5%8F%91%E5%B8%83uni-app)

## Variations

- [vite-nuxt3](https://github.com/lincenying/vite-nuxt3) - Nuxt3 + Vite 入门模板
- [vite-uniapp-vue3](https://github.com/lincenying/vite-uniapp-vue3) - Uniapp3 + Vite 入门模板
- [vite-react-mobx-ssr](https://github.com/lincenying/vite-react-mobx-ssr) - React + Mobx + Vite + SSR 入门模板
- [vite-react-mobx](https://github.com/lincenying/vite-react-mobx) - React + Mobx + Vite 入门模板
- [vite-react-redux](https://github.com/lincenying/vite-react-redux) - React + Redux + Vite 入门模板
- [vite-vue3-h5-ssr](https://github.com/lincenying/vite-vue3-h5-ssr) - Vue3 + Vant + Vite + SSR 入门模板
- [vite-vue3-h5](https://github.com/lincenying/vite-vue3-h5) - Vue3 + Vant + Vite 入门模板
- [vite-vue3-admin](https://github.com/lincenying/vite-vue3-admin) - Vue3 + ElementPlus + Vite 管理后台入门模板

## 使用

```bash
npx degit lincenying/vite-vue3-uniapp my-uniapp-app
cd my-uniapp-app
pnpm i # 如果你没有安装 pnpm，请运行：npm install -g pnpm
```

## Rem 适配

设计稿相关参数配置见: `src/design.config.ts`, 按UI给的设计稿, 修改即可

设计稿宽度: `designWidth`

设计稿高度: `designHeight`

字号: `fontSize`

由于Uniapp在H5端本身就有转换成Rem的功能, 所以我们只需要将px转换成rpx即可

具体插件配置详见: `vite.config.css.ts`

## 自动引入UI库组件/项目组件/函数等

项目已经配置了`unplugin-auto-import`和`unplugin-vue-components`

前者能自动引入vue, vue-router, vueuse等提供的方法, 而无需一遍遍的`import`

后者能自动引入UI组件, 及项目被定义的组件, 也不用一遍遍的`import`, 脚手架默认使用`TuNiaoUI`和`wot-design-uni`, 因为这个UI组件库对Ts支持比较好

详细配置见: `vite.config.components.ts`

相关文档见:

https://vue3.tuniaokj.com/zh-CN/

https://github.com/antfu/unplugin-auto-import#readme

https://github.com/antfu/unplugin-vue-components#readme

#### UI组件库

项目配置了两个UI组件库, 分别是:
https://github.com/Moonofweisheng/wot-design-uni
https://github.com/tuniaoTech/tuniaoui-rc-vue3-uniapp

两个UI组件库可以混用, 也可以只选择其一使用, 影响不大,
如果想删除tuniaoui, 那么只需要在`src/App.vue`中删除引入的css文件即可, 其他地方无需改动
不想使用wot-design-uni, 无需做任何修改

```vue
<script setup lang="ts">
import '@tuniao/tn-style/dist/uniapp/index.css'
import './assets/scss/global/global.scss'
import './assets/scss/style.scss'
</script>
```

## Pinia 状态管理

vue 官方出品的, 比vuex更好用的状态管理

使用方法:

在pinia文件夹下,新建一个ts文件, 如: `useUserInfo.ts`

里面代码如下:

```ts
import type { UserData, UserInfo } from '~/pages/user.types'
import { defineStore } from 'pinia'

interface State {
    userInfo: Nullable<UserInfo>
}

export const useUserStore = defineStore('userInfo', () => {
    const lsUserInfo = ls.get<UserInfo>('user-info') || {}
    const state: State = reactive({
        userInfo: lsUserInfo,
    })

    async function getUserInfo() {
        const { code, data } = await $api.get<UserData>('/user/info', { })
        if (code === 200 && data && data.userInfo) {
            state.userInfo = data.userInfo
            ls.set('user-info', data.userInfo)
        }
    }

    return {
        ...toRefs(state),
        getUserInfo,
    }
})
```

那么在需要用到该状态管理的地方, 只需要

```ts
const userStore = useUserStore()
userStore.setGlobalLoading(true)
```

即可, 因为配置了`unplugin-auto-import`, 所以根本无需要`import`, 你只需要直接把文件名改成驼峰的方式, 直接当函数使用即可

注意: 直接用文件名当函数名, 只有代码是用`export default`导出时可用, 如果是用`export const xxx`, `export function xxx {}` 这样导出的, 那么直接使用xxx作为方法名即可

具体可以看`src/z-auto-imports.d.ts`为你生成了那些方法, 这里的方法都可以直接使用, 而无需`import`

## 自动生成路由

路由使用了`@uni-helper/vite-plugin-uni-pages`插件, 只需要在对应目录创建vue文件, 会自动生成路由, 还可以在路由组件直接定义`pages.json`里的信息, 如:

```html
<route lang="json"> { "style": { "navigationStyle": "custom", "enablePullDownRefresh": true } } </route>
```

将会在pages.json变为:

```json
{
  "path": "pages/activity",
  "type": "page",
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
```

相关文档: https://github.com/uni-helper/vite-plugin-uni-pages

## layout布局框架

在`src/layouts`文件夹下创建布局文件, 然后在对应路由页面修改`route-block`即可, 如:

```html
<route lang="json"> { "layout": "default", "style": { "navigationStyle": "custom", "enablePullDownRefresh": true } } </route>
```

将会在pages.json变为:

```json
{
  "path": "pages/activity",
  "type": "page",
  "layout": "default",
  "style": {
    "navigationStyle": "custom",
    "enablePullDownRefresh": true
  }
}
```

相关文档: https://uni-helper.js.org/vite-plugin-uni-layouts

## Api封装

使用axios重新封装, 并使用`fant-axios-adapter`将小程序的api适配一致

`src/api/index.ts`封装了`get, post, put, delete`4中常用的方法, 分别对应4种method, 而`$api`为全局方法, 可以在任何`.vue`页面, 直接使用`$api.get/post/put/delete`

接口默认判断code=200 || status=200为正常返回, 如果后端接口不是用code或者status作为判断, 那么需要在`src/api/index.ts`做对应修改

如:

```ts
let detail: NullAble<Article> = null
async function getDetail() {
    const { code, data } = await $api.get<Article>('article/detail', {})
    if (code === 200) {
        detail = data
    }
}

getDetail()
```

## 列表封装: useLists

在`src/composables/get-lists.ts`中封装了`useLists`方法, 让你所有上拉加载, 下拉刷新几行代码就搞定, 如:

```ts
interface ApiParams {
    page: number
    limit: number
    by: string
    cache: string
    xxx?: number
}

const { dataIsLoaded, dataLists, loadStatus, getData, apiParams } = useLists<Article, ApiParams>('/frontend/article/list', {
    limit: 20,
    by: 'visit',
    cache: 'true',
    page: 1,
})
```

如上面代码, 只需要将接口相关参数传入接口, 返回的参数中,

- `dataIsLoaded`为接口是否请求完成(响应式的Ref数据),
- `apiParams`为传入参数(响应式的Ref数据),
- `dataList`为数据列表(响应式的Ref数据),
- `getData`为请求列表的方法,
- `loadStatus`为分页状态(响应式的Ref数据), 可能的值为: 'loading' | 'loadmore' | 'nomore'

模板代码为:

```html
<template>
    <div>
        <TnListItem v-for="(item, index) in dataLists" :key="index" right-icon="right" @click="router.push(`/pages-sub/acticity/detail?id=${item._id}`)">
            <div flex--c>
                <TnIcon name="tree" />
                <div ml-10px class="tn-text-ellipsis-1">{{ item.title }}</div>
            </div>
        </TnListItem>
        <div pb-10px pt-30px>
            <TnLoadmore :status="loadStatus" loading-icon-mode="flower" color="#999" />
        </div>
    </div>
</template>
```

如果你需要做搜索, 或者切换分类什么的, 也很简单, 假设我现在需要修改by的值,然后重新请求接口, 那么只需要:

```ts
function changeBy(by: string) {
    apiParams.value.by = by
    apiParams.value.page = 1
    getData()
}
```

先更新apiParams里的相关参数, 然后重新请求接口即可

当然也可以新增参数, 不过需要在ts类型里先定义好

```ts
function addParams() {
    apiParams.value.xxx = 1
    apiParams.value.page = 1
    getData()
}
```

接口默认返回数据接口为:

```
{
    data: {
        hasNext: number | boolean
        hasPrev: number | boolean
        total: number
        list: any[]
    }
    code: number
    status: number
    message: string
    info?: string
}
```

如果你用的接口返回数据结构不一样, 需要在`src/composables/get-lists.ts`稍做修改

另外还有还有`get-list`和`get-detail`, 分别对应无分页的列表及详情页, 使用方法基本一致

## 开发环境配置proxy跨域

```
{
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
}
```

详见: `vite.config.build.ts`

## Unocss

unocss是一个及时/按需/原子化的css引擎, 项目中也做了相关配置, 可直接使用

配置见:

https://github.com/lincenying/base-config/blob/main/src/uno.uniapp.config.ts

官方文档见:

https://unocss.dev/

## UnoCSS Icons

图标站点为: https://icones.js.org/collection/all

打开上面的图片站, 在左边点击选择你想要的图标库, 查看地址栏上的地址, 假设是`https://icones.js.org/collection/ph`

那么这么图标库的名称就是`ph`

安装图标库

```bash
# 其他库只需要将后面的ph替换成对应库名即可
pnpm install @iconify-json/ph
```

使用图标库, 只要点击想要的图标, 下方会出现该图标的详细信息, 复制图标名即可使用, 使用方法如下:

class的规则如下: i-[图标库名]-[图标名称] 或者 i-[图标库名]:[图标名称]

```html
<div class="i-ph-airplane-landing-bold" text="60px hex-f90" />
<div class="i-ph:airplane-landing-bold" text="60px hex-f90" />
```

## eslint/stylelint/prettierrc/vue-tsc

根目录下的`eslint.config.js`、`.stylelintrc.json`、`.prettier`内置了 lint 规则，帮助你规范地开发代码，有助于提高团队的代码质量和协作性，可以根据团队的规则进行修改

注意: `prettier`只在编辑器层面, 在`eslint`中并没有添加`prettier`插件
