import request from '@/config/request.js';


// 微信支付,统一预下单接口
export const weChatPay = (data) => request.post('/client/pay/appPayment/weChatDoUnifiedOrder',data)

// 支付宝支付
export const alipay = (data) => request.post('/client/pay/alipay',data)

// 支付宝支付
export const alipayNotify = (data) => request.post('/client/pay/alipayNotify',data)