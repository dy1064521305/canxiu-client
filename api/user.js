const http = uni.$u.http;

// 用户登录(账号+密码+验证码)
export const login = (params, config = {}) => http.post('/login', params, config)

// 获取用户信息
export const getInfo = (config = {}) => http.get('/getInfo', null, config)