import request from '@/config/request.js';

// 获取验证码
export const image = () => request.get('/captchaImage', null, { custom: { auth: false, loading: false } })


//生成微信小程序码
export const generateQrCode = (params) => request.get('/common/code/generateQrCode',params )

//校验验证码
export const validateSmsCode= (data) => request.post('/validateSmsCode',data)