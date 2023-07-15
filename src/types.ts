/**
 * 文章详情
 */
export interface Article {
    _id: string
    /** * 文章标题 */
    title: string
    /** * 文章内容: markdown */
    content: string
    /** * 文章内容: html */
    html: string
    /** * 文章导航 */
    toc: string
    /** * 分类ID */
    category: string
    /** * 分类名称 */
    category_name: string
    /** * 访问数 */
    visit: number
    /** * 点赞数 */
    like: number
    /** * 评论数 */
    comment_count: number
    /** * 发布时间 */
    creat_date: string
    /** * 编辑时间 */
    update_date: string
    /** * 是否删除: 0: 正常 | 1: 删除 */
    is_delete: number
    /** * 发布时间戳 */
    timestamp: number
    /** * 点赞用户ID列表 */
    likes: string[]
    /** * 登录用户是否已点赞 */
    like_status?: boolean
}
