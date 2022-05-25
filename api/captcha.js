import request from '@/utils/request'

// 图形验证码
export function image() {
  return request.get('/captchaImage', {}, { load: false })
}