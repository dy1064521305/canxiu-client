import request from '@/config/request.js';


//查询我的订单列表
export const getOrderList = (params) => request.get('/client/order/list', params)

//获取客户端订单详细信息
export const getOrderInfo = (orderId) => request.get('/client/order/' + orderId)

//根据订单id查询订单追踪列表
export const orderTrackList = (params) => request.get('/basic/orderTrack/list', params)

//订单详情中新材料
export const getNewMaterial = (orderId) => request.get('/client/order/getNewMaterial/' + orderId)

//订单详情中新配件
// export const getNewParts = (orderId) => request.get('/client/order/getNewParts/'+orderId)


//订单详情中新维修方案
export const getNewProject = (orderId) => request.get('/worker/order/getNewProject/' + orderId)

//生成维修报告
export const generateReports = (orderId) => request.get('/client/order/generateReports/' + orderId)

//客户验收签字
export const acceptance = (data) => request.put('/client/order/acceptance', data)

//新增客户端订单投诉
export const orderComplaint = (data) => request.post('/client/orderComplaint', data)

//新增客户端订单评价
export const appraise = (data) => request.post('/app/client/appraise', data)

//获取客户端服务评价详细信息
export const appraiseInfo = (appraiseId) => request.get('/app/client/appraise/' + appraiseId)

//查询客户端服务评价列表
export const appraiseList = (params) => request.get('/app/client/appraise/list', params)

//客户取消订单
export const cancelOrder = (data) => request.put('/client/order/cancelOrder', data)


//获取维修师详情
export const getWorkerInfo = (workerId) => request.get('/client/order/workerInfo/' + workerId)

//客户申请返修
export const repairOrder = (data) => request.put('/client/order/repair', data)

//客户驳回
export const overruleScenario = (data) => request.put('/client/order/overruleScenario', data)

//客户确认维修方案
export const confirmScenario = (data) => request.put('/client/order/confirmScenario', data)

//客户重新发起订单
export const reissueOrder = (data) => request.put('/client/order/reissue', data)

//查询我的订单各状态数量
export const queryOrderCount = (params) => request.get('/client/order/queryOrderCount', params)

//查询我的全部订单各状态数量
export const queryAllOrderCount = (params) => request.get('/client/order/queryAllOrderCount', params)

//获取客户端返修订单详细信息
export const getRepairOrderInfo = (repairId) => request.get('/client/order/queryRepair/' + repairId)

//提交订单后推送
export const orderSend = (data) => request.post('/client/order/send', data)

//获取指派人员
export const findWorker = (data) => request.post('/client/order/assign/findWorker ', data)

//下单页根据地址重新获取产品服务价格
export const refreshPrice = (params) => request.get('/client/service/refreshPrice', params)

// 合伙人品牌订单管理列表
export const getPartnerBrandOrderList = (params) => request.get('/terrace/order/partnerBrandOrderList', params)