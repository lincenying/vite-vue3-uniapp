/* eslint-disable no-unused-vars */

declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare type UnfAble<T> = T | undefined
declare type Obj = Record<string, any>
declare type ObjT<T> = Record<string, T>

declare interface ResponseData<T> {
    data: T
    code: number
    message: string
    info?: string
}

declare interface ApiType {
    get<T>(url: string, params?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    post<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    put<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    downFile(url: string, method: 'get' | 'post', data?: Obj): Promise<any>
    RESTful<T>(
        url: string,
        method: 'get' | 'post' | 'delete' | 'put',
        data?: Obj,
        header?: Obj,
        checkCode?: boolean
    ): Promise<ResponseData<T>>
    $RESTful<T>(url: string, method: 'get' | 'post' | 'delete' | 'put', data?: Obj, header?: Obj): Promise<ResponseData<T>>
}

declare interface Window {
    _designWidth: number
    _designHeight: number
    _designMultiple: number
    _minWidth: number
    _minWindow: string
    _fontSize: number
    config: {
        timer: {
            [propName: string]: number
        }
    }
    $$lock?: boolean
    $$api: ApiType
    randomArray: (lower: number, upper: number, length: number) => number[]
    $$myChart: any
    $$time: NodeJS.Timeout
    axios: any
}
