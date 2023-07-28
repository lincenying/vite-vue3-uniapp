/**
 * Null 或者 T
 */
declare type Nullable<T> = T | null
/**
 * Undefined 或者 T
 */
declare type UnfAble<T> = T | undefined
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Obj = Record<string, any>
/**
 * 键为字符串, 值为 T 的对象
 */
declare type ObjT<T> = Record<string, T>

declare type AnyFn = (...args: any[]) => any;

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

type MethodsType = 'get' | 'post' | 'delete' | 'put'

declare interface ApiType {
    get<T>(url: string, params?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    post<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    put<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    delete<T>(url: string, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    downFile(url: string, method: MethodsType, data?: Obj): Promise<any>
    RESTful<T>(url: string, method: MethodsType, data?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
    $RESTful<T>(url: string, method: MethodsType, data?: Obj, header?: Obj): Promise<ResponseData<T>>
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
