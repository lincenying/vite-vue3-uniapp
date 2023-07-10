import type { MockMethod } from '@lincy/vite-plugin-mock'
import { baseApi } from './_api'

export default [
    {
        // 左上
        url: `/${baseApi}/index/getLeftTop`,
        method: 'get',
        response: () => {
            /* 请求参数-GET
             * id: number = id
             */
            /* 请求参数-POST
             * Null
             */
            /* 返回数据
            {
                code: 200, // 状态码, 200正常, 401未登录, 其他为异常
                message: 'ok', // 异常时抛出的错误信息
                data: array = [{
                    title: string = '标题',
                    date: string = '日期;
                }, {
                    title: string = '标题',
                    date: string = '日期;
                }, ]
            }
             */
            return {
                code: 200,
                message: 'ok',
                data: Array.from({ length: 10 }, () => ({
                    title: '@csentence',
                    date: '@date("yyyy-MM-dd")',
                })),
            }
        },
    },
    {
        // 左下
        url: `/${baseApi}/index/getLeftBottom`,
        method: 'get',
        response: () => {
            /* 请求参数-GET
             * id: id
             */
            /* 请求参数-POST
             * Null
             */
            /* 返回数据
            /* 返回数据
            {
                code: 200, // 状态码, 200正常, 401未登录, 其他为异常
                message: 'ok', // 异常时抛出的错误信息
                data: object = {
                    x: [string,string, ...] = '横坐标数组',
                    city: [number,number, ...] = '市级数据',
                    county: [number,number, ...] = '县级数据',
                    township: [number,number, ...] = '乡级数据'
                }
            }
             */
            return {
                code: 200,
                message: 'ok',
                data: {
                    'x|5': ['@cword(3, 3)'],
                    'city|5': ['@integer(60, 100)'],
                    'county|5': ['@integer(60, 100)'],
                    'township|5': ['@integer(60, 100)'],
                },
            }
        },
    },
    {
        // 右上
        url: `/${baseApi}/index/getRightTop`,
        method: 'get',
        response: () => {
            /* 请求参数-GET
             * id: id
             */
            /* 请求参数-POST
             * Null
             */
            /* 返回数据
            {
                code: 200, // 状态码, 200正常, 401未登录, 其他为异常
                message: 'ok', // 异常时抛出的错误信息
                data: object = {
                    usage: number = '使用率'
                }
            }
             */
            return {
                code: 200,
                message: 'ok',
                data: Array.from({ length: 50 }, () => ({
                    title: '@csentence',
                    date: '@date("yyyy-MM-dd")',
                })),
            }
        },
    },
    {
        // 右下
        url: `/${baseApi}/index/getRightBottom`,
        method: 'get',
        response: () => {
            /* 请求参数-GET
             * id: id
             */
            /* 请求参数-POST
             * Null
             */
            /* 返回数据
            {
                code: 200, // 状态码, 200正常, 401未登录, 其他为异常
                message: 'ok', // 异常时抛出的错误信息
                data: object = {
                    vcpu_usage_average: number = 'CPU使用率均值'
                    vcpu_usage_peak: number = 'CPU使用率峰值'
                    vmemory_usage_average: number = '内存使用率均值'
                    memory_usage_peak: number = '内存使用率峰值'
                    storage_usage_s: number = '存储使用率'
                }
            }
             */
            return {
                code: 200,
                message: 'ok',
                data: {
                    vcpu_usage_average: '@integer(60, 100)',
                    vcpu_usage_peak: '@integer(60, 100)',
                    vmemory_usage_average: '@integer(60, 100)',
                    memory_usage_peak: '@integer(60, 100)',
                    storage_usage_s: '@integer(60, 100)',
                },
            }
        },
    },
    {
        // 中间
        url: `/${baseApi}/index/getCenter`,
        method: 'get',
        response: () => {
            /* 请求参数-GET
             * id: id
             */
            /* 请求参数-POST
             * Null
             */
            /* 返回数据
            {
                code: 200, // 状态码, 200正常, 401未登录, 其他为异常
                message: 'ok', // 异常时抛出的错误信息
                data: object = {
                    cloud_tenants: number = '云租户数'
                    virtual_machine: number = '虚拟机数'
                    host_machine: number = '宿主机数'
                    tier1_tenant: number = '大数据一级租户'
                    big_data_server: number = '大数据服务器'
                    big_data_cluster: number = '大数据集群'
                }
            }
             */
            return {
                code: 200,
                message: 'ok',
                data: {
                    cloud_tenants: '@integer(60, 100)',
                    virtual_machine: '@integer(60, 100)',
                    host_machine: '@integer(60, 100)',
                    tier1_tenant: '@integer(60, 100)',
                    big_data_server: '@integer(60, 100)',
                    big_data_cluster: '@integer(60, 100)',
                },
            }
        },
    },
    {
        // 中间
        url: `/${baseApi}/index/getEcharts`,
        method: 'get',
        response: () => {
            /* 请求参数-GET
             * id: id
             */
            /* 请求参数-POST
             * Null
             */
            /* 返回数据
            {
                code: 200, // 状态码, 200正常, 401未登录, 其他为异常
                message: 'ok', // 异常时抛出的错误信息
                data: object = {
                    cloud: number = '云租户数'
                }
            }
             */
            return {
                code: 200,
                message: 'ok',
                data: {
                    cloud: 80,
                },
            }
        },
    },
    {
        // 租户总览
        url: `/${baseApi}/index/tenantOverview`,
        method: 'get',
        response: ({ query }) => {
            /* 请求参数-GET
             * page: number = 分页
             * pageSize: number = 每页数量
             */
            /* 请求参数-POST
             * Null
             */
            /* 返回数据
            {
                code: 200, // 状态码, 200正常, 401未登录, 其他为异常
                message: 'ok', // 异常时抛出的错误信息
                data: object = {
                    total: 100, // 总条数
                    currPage: 1, // 当前页数
                    pageSize: 10, // 每页数量
                    data: array = [{
                        id: string = '主键',
                        date: string = '日期;
                        name: string = '姓名;
                        address: string = '地址;
                    }]
                }
            }
             */
            const page = query.page || 1
            const pageSize = query.pageSize || 10
            return {
                code: 200,
                message: 'ok',
                data: {
                    total: 100,
                    pageSize,
                    currPage: Number(page),
                    data: Array.from({ length: pageSize }, (_, index) => ({
                        id: (page - 1) * pageSize + index + 1,
                        date: '@date',
                        name: '@cname()',
                        address: '@city()',
                    })),
                },
            }
        },
    },
] as MockMethod[]
