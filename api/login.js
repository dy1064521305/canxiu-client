import request from '@/config/request.js';

// 用户登录(手机号+验证码)
export const login = (data) => request.post('/client/login/smsLogin', data, {
	custom: {
		auth: false
	}
})
/**
 * 小程序快捷登录接口
 * @param {String} loginCode 
 * @param {String} phoneNumberCode
 */
export const postLoginPartner = (data) => request.post('/client/login/verifyPartner', data, {
	custom: {
		auth: false
	}
})


//获取验证码
export const getCode = (params) => request.get('/captchaSms', params, {
	custom: {
		auth: false
	}
})


//获取问题协议
export const getAgreement = (params) => request.get('/basic/problemAgreement/agreement', params, {
	custom: {
		auth: false
	}
})


//完善客户信息
export const refine = (data) => request.put('/client/user/refine', data)

//选择店铺类型
export const getStoreType = () => request.get('/client/user/queryStoreType')

//绑定用户id和cid
export const bindIds = (data) => request.post('/common/getui/bind', data)

//判断是否为单门店
export const isSingle = (clientld) => request.get('/client/user/isSingle/' + clientld)
//师傅是否已注册
export const workerIsRegister = (params) => request.get('/worker/login/verify', params)

//用户是否已注册
export const clientIsRegister = (params) => request.get('/client/login/verify', params)