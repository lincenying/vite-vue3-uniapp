export interface RequestParams {
    method: string
    body: any
    headers?: { authorization?: string }
    query: any
}
