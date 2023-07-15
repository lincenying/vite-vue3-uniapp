import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
    easycom: {
        autoscan: true,
        custom: {
            '^u-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
        },
    },
    pages: [],
    globalStyle: {
        'navigationBarTitleText': 'uni-vitesse',
        'navigationBarBackgroundColor': '@navBgColor',
        'navigationBarTextStyle': '@navTxtStyle',
        'backgroundColor': '@bgColor',
        'backgroundTextStyle': '@bgTxtStyle',
        'backgroundColorTop': '@bgColorTop',
        'backgroundColorBottom': '@bgColorBottom',
        'app-plus': {
            titleNView: false, // 移除 H5、APP 顶部导航
        },
    },
    tabBar: {
        color: '#bbbbbb',
        selectedColor: '#735AFD',
        backgroundColor: '#ffffff',
        borderStyle: 'black',
        list: [
            {
                pagePath: 'pages/index',
                iconPath: 'static/tabbar/icon-1.png',
                selectedIconPath: 'static/tabbar/icon-1-active.png',
                text: '首页',
            },
            {
                pagePath: 'pages/lists',
                iconPath: 'static/tabbar/icon-4.png',
                selectedIconPath: 'static/tabbar/icon-4-active.png',
                text: '列表',
            },
            {
                pagePath: 'pages/about',
                iconPath: 'static/tabbar/icon-3.png',
                selectedIconPath: 'static/tabbar/icon-3-active.png',
                text: '我的',
            },
        ],
    },
})
