import request from '@/utils/request'

// 用户登录(账号+密码+验证码)
export function login(data) {
  return request.post('/login', data)
}