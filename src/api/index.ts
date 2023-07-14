import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { uniAdapter } from 'fant-axios-adapter'

// #ifdef H5
window.axios = axios
// #endif

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
}

const baseConfig = {
    headers,
    timeout: 5000,
    withCredentials: false,
}

if (import.meta.env.VITE_APP_ENV === 'production')
    baseConfig.timeout = 300000

axios.defaults.adapter = uniAdapter as AxiosAdapter

axios.interceptors.request.use(
    config => config,
    error => Promise.resolve(error.response || error),
)

axios.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response || error),
)

function checkStatus(response: AxiosResponse): ResponseData<any> {
    if (response && (response.status === 200 || response.status === 304))
        return response.data

    return {
        code: -404,
        info: response.statusText || response.toString(),
        data: response.statusText || response.toString(),
        message: `接口返回数据错误, 错误代码: ${response.status}`,
    }
}

function checkCodeFn(data: ResponseData<any>) {
    const code = [0, 200, 1000]
    if (data.code === 401) {
        uni.showModal({
            title: '提示',
            content: '当前未登录或者登录超时, 请重新登陆',
            success: () => {
                //
            },
        })
    }
    else if (!code.includes(Number(data.code))) {
        uni.showToast({
            icon: 'none',
            title: data.message,
        })
    }
    else {
        data.code = 200
    }
    return data
}

/**
 * axios Api 封装
 * ```
    get<T>(url: string, params?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    post<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    put<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
 * ```
 */
export const $api: ApiType = {
    post(url, data, header, checkCode = true) {
        return this.RESTful(url, 'post', data, header, checkCode)
    },
    get(url, params, header, checkCode = true) {
        return this.RESTful(url, 'get', params, header, checkCode)
    },
    put(url, data, header, checkCode = true) {
        return this.RESTful(url, 'put', data, header, checkCode)
    },
    delete(url, data, header, checkCode = true) {
        return this.RESTful(url, 'delete', data, header, checkCode)
    },
    async downFile(url, method = 'get', data) {
        const config: AxiosRequestConfig = {
            ...baseConfig,
            responseType: 'arraybuffer',
            method,
            url: import.meta.env.VITE_APP_API + url,
        }
        if (method === 'get')
            config.params = data
        else
            config.data = data

        if (url.includes('NoTimeout'))
            config.timeout = 9999999
        const response = await axios(config)
        return response
    },

    async RESTful(url, method = 'get', data, header, checkCode) {
        const xhr = await this.$RESTful(url, method, data, header)
        if (checkCode)
            return checkCodeFn(xhr)
        return xhr
    },
    async $RESTful(url, method = 'get', data, header) {
        // if (url.split('/')[1] === '' || url.split('/')[1] === '') {
        // } else {
        url = import.meta.env.VITE_APP_API + url
        // }
        const config: AxiosRequestConfig = {
            ...baseConfig,
            headers: {
                ...baseConfig.headers,
                ...header,
            },
            method,
            url,
        }

        if (method === 'get')
            config.params = data
        else
            config.data = data

        if (url.includes('NoTimeout'))
            config.timeout = 9999999
        const response = await axios(config)
        return checkStatus(response)
    },
}
