import request from '@/config/request.js';

// 移除客户
export const removeCustomer = (data) => request.put('/terrace/customerManager/removeCustomer', data)

// 启用or停用客户
export const updateClientStatus = (data) => request.put('/terrace/customerManager/updateClientStatus', data)

// 代客户下单
export const valet = (data) => request.post('/terrace/customerManager/valet', data)

//代客下单门店列表
export const valetUserList = (params) => request.get('/terrace/customerManager/storeList', params)

//客户分析报表
export const customerAnalysis = (params) => request.get('/terrace/statistical/customerAnalysis', params)

//师傅完工报表
export const workerComplete = (params) => request.get('/terrace/statistical/workerComplete', params)

//师傅订单统计
export const workerOrder = (params) => request.get('/terrace/statistical/workerOrder', params)


//省份业绩统计
export const provinceAnalysis = (params) => request.get('/terrace/statistical/provinceAnalysis', params)


//省份下市级业绩统计
export const cityAnalysis = (params) => request.get('/terrace/statistical/cityAnalysis', params)

// 移除师傅
export const removeWorker = (data) => request.put('/terrace/workerManager/removeCustomer', data)

// 启用or停用师傅
export const updateWorkerStatus = (data) => request.put('/terrace/workerManager/updateWorkerStatus', data)


//用户端师傅管理列表
export const getWorkers = (data) => request.post('/partner/worker/workerList', data)


//师傅管理工种列表
export const getWorkersTypeList = (params) => request.get('/basic/workerType/list', params)
// 修改师傅工费结算规则
export const putSettlementRule = (data) => request.put('/partner/worker/edit/settlement/rule', data)

// 结算记录列表
export const getWorkerSettlementList = (params) => request.get('/partner/worker/workerSettlementList', params)

// 调整金额
export const putAdjust = (data) => request.put('/partner/worker/walletDetail/adjust', data)
// 立即结算
export const putSettlement = (data) => request.put('/partner/worker/walletDetail/immediate/settlement', data)
// 关闭结算
export const putInvalid = (data) => request.put('/partner/worker/walletDetail/invalid', data)


// 根据合伙人ID获取预存款信息
export const getInvestmentClient = (partnerId) => request.get('/partner/investment/client/' + partnerId)

// 拿取合伙人的信息
export const putImmediate = (id) => request.get('/client/partner/' + id)

// 查询合伙人资金补贴记录明细列表
export const getSubsidyDetail = (id, params) => request.get('/partner/user/subsidy/detail/' + id, params)

// 调整金额并结算
export const putImmediateSettlement = (data) => request.put('/partner/worker/walletDetail/adjust/immediateSettlement',
	data)
// 查询订单设置列表
export const getOrderSetList = (params) => request.get('/basic/orderSet/list', params)