import request from '@/config/request.js';

// 获取验证码
export const image = () => request.get('/captchaImage', { custom: { auth: false } })