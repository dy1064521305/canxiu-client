import request from '@/config/request.js';


//查询我的订单列表
export const getOrderList = (params) => request.get('/client/order/list',params)

//获取客户端订单详细信息
export const getOrderInfo = (orderId) => request.get('/client/order/'+orderId)

//根据订单id查询订单追踪列表
export const orderTrackList = (params) => request.get('/basic/orderTrack/list',params)

//订单详情中新材料
export const getNewMaterial = (orderId) => request.get('/client/order/getNewMaterial/'+orderId)

//生成维修报告

export const generateReports = (orderId) => request.get('/client/order/generateReports/'+orderId)

//客户验收签字
export const acceptance = (params) => request.put('/client/order/acceptance',params)

//新增客户端订单投诉
export const orderComplaint = (params) => request.post('/client/orderComplaint',params)

//新增客户端订单评价
export const appraise = (params) => request.post('/app/client/appraise',params)

//获取客户端服务评价详细信息
export const appraiseInfo = (appraiseId) => request.get('/app/client/appraise/'+appraiseId)

//查询客户端服务评价列表
export const appraiseList = (params) => request.get('/app/client/appraise/list',params)

//客户取消订单
export const cancelOrder = (params) => request.put('/client/order/cancelOrder',params)

