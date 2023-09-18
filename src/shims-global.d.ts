/**
 * Null 或者 Undefined 或者 T
 */
declare type Nullable<T> = T | null | undefined
/**
 * 非 Null 类型
 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/**
 * 数组<T> 或者 T
 */
declare type Arrayable<T> = T | T[]
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Obj = Record<string, any>
/**
 * 键为字符串, 值为 T 的对象
 */
declare type ObjT<T> = Record<string, T>
/**
 * Function
 */
declare type Fn<T = void> = () => T
/**
 * 任意函数
 */
declare type AnyFn<T = any> = (...args: any[]) => T
/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>

declare interface ResponseData<T> {
    data: T
    code: number
    status: number
    message: string
    info?: string
}

/**
 * 接口返回模板里的 Data 数据 - 含分页的列表
 * ```
 * {
 *  hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    list: T
 * }
 * ```
 */
declare interface ResDataLists<T> {
    hasNext: number | boolean
    hasPrev: number | boolean
    total: number
    list: T
}

type Methods = 'get' | 'post' | 'delete' | 'put'

declare interface ApiType {
    get<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    get<T, U = Obj>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T> & U>
    post<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    post<T, U = Obj>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T> & U>
    put<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    put<T, U = Obj>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T> & U>
    delete<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T, U = Obj>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T> & U>
    downFile(url: string, method: Methods, data?: Obj): Promise<any>
    RESTful<T>(url: string, method: Methods, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    $RESTful<T>(url: string, method: Methods, data?: Obj, header?: Obj): Promise<ResponseData<T>>
}

declare interface Window {
    _designWidth: number
    _designHeight: number
    _designMultiple: number
    _minWidth: number
    _minWindow: string
    _fontSize: number
    $$lock?: boolean
    $$api: ApiType
    randomArray: (lower: number, upper: number, length: number) => number[]
    $$time: NodeJS.Timeout
    axios: import('axios').AxiosStatic
}
