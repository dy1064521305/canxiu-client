const http = uni.$u.http;

// 用户登录(账号+密码+验证码)
export const image = (params, config = {}) => http.get('/captchaImage', params, config)