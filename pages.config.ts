import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
    easycom: {
        autoscan: true,
        custom: {
            '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
        },
    },
    pages: [],
    globalStyle: {
        'navigationBarTitleText': 'vite-uniapp-vue3',
        'navigationBarBackgroundColor': '@navBgColor',
        'navigationBarTextStyle': '@navTxtStyle',
        'backgroundColor': '@bgColor',
        'backgroundTextStyle': '@bgTxtStyle',
        'backgroundColorTop': '@bgColorTop',
        'backgroundColorBottom': '@bgColorBottom',
        'app-plus': {
            titleNView: false, // 移除 H5、APP 顶部导航
        },
        // rpx 计算所支持的最大设备宽度，单位 px
        'rpxCalcMaxDeviceWidth': 750,
        // rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px
        'rpxCalcBaseDeviceWidth': 540,
    },
    tabBar: {
        color: '#A6A6A6',
        selectedColor: '#333333',
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
                pagePath: 'pages/activity',
                iconPath: 'static/tabbar/icon-2.png',
                selectedIconPath: 'static/tabbar/icon-2-active.png',
                text: '福利',
            },
            {
                pagePath: 'pages/box',
                iconPath: 'static/tabbar/icon-3.png',
                selectedIconPath: 'static/tabbar/icon-3-active.png',
                text: '盒柜',
            },
            {
                pagePath: 'pages/user',
                iconPath: 'static/tabbar/icon-4.png',
                selectedIconPath: 'static/tabbar/icon-4-active.png',
                text: '我的',
            },
        ],
    },
})
