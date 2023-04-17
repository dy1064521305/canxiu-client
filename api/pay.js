import request from '@/config/request.js';


// 微信支付,统一预下单接口
export const weChatPay = (data) => request.post('/client/pay/weChatPay',data)