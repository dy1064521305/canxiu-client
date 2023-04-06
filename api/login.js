import request from '@/config/request.js';

// 用户登录(手机号+验证码)
export const login = (params) => request.post('/client/login/smsLogin', params, { custom: { auth: false } })



//获取验证码
export const getCode = (params) => request.get('/captchaSms', params, { custom: { auth: false } })


//获取问题协议
export const getAgreement = () => request.get('/basic/problemAgreement/agreement',  { custom: { auth: false } })


//完善客户信息
export const refine = (params) => request.put('/client/user/refine',params)

//选择店铺类型
export const getStoreType = () => request.get('/client/user/queryStoreType')

//绑定用户id和cid
export const bindIds= (params) => request.post('/common/getui/bind',params)
