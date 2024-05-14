export interface UserInfo {
    /** 用户ID */
    user_id: number
    /** 手机号（隐藏显示） */
    mobile: string
    /** 用户昵称 */
    nick_name: string
    /** 头像ID */
    avatar_id: number
    /** 性别 */
    gender: string
    /** 默认收货地址ID */
    address_id: number
    /** 账户余额 */
    balance: string
    /** 可用积分 */
    points: number
    /** 用户总支付的金额 */
    pay_money: string
    /** 实际消费的金额(不含退款) */
    expend_money: string
    /** 会员等级ID */
    grade_id: number
    /** 注册来源客户端 (APP、H5、小程序等) */
    platform: string
    /** 最后登录时间 */
    last_login_time: number
    /** 头像URL */
    avatar_url: string
    /** 会员等级信息 */
    grade: Objable
}

/** 当前用户详情 */
export interface UserData {
    userInfo: UserInfo
}
