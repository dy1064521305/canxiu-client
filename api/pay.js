import request from '@/config/request.js';


// app微信支付
export const appWeChatPay = (data) => request.post('/client/pay/appPayment/weChatDoUnifiedOrder',data)

//微信小程序支付
export const weChatPay = (data) => request.post('/client/pay/weChatPay',data)

// 支付宝支付
export const alipay = (data) => request.post('/client/pay/alipay',data)

// 支付宝支付
export const alipayNotify = (data) => request.post('/client/pay/alipayNotify',data)

// 集团代付
export const payOnBehalf = (data) => request.put('/client/pay/payOnBehalf',data)

//微信商户订单号查询订单
export const payByOrderNumber = (orderNumber) => request.get('/client/pay/'+orderNumber)

