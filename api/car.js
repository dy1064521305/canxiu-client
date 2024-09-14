import request from '@/config/request.js';

//加入维修车
export const joinCar = (data) => request.post('/client/orderProject/joinCar', data)

//查询维修车列表
export const getCarList = (params) => request.get('/client/orderProject/listCar', params)

// 删除维修车
export const deleteCar = (ids) => request.delete('/client/orderProject/' + ids)


//新增客户下单
export const addOrderProject = (data) => request.post('/client/orderProject', data)

//客户提交订单
export const postOrder = (data) => request.post('/client/order', data)

//删除报修图片/视频
export const delCarUrl = (data) => request.put('/client/orderProject/delUrl', data)

//根据工种类型查询服务项目列表
export const listByWorkerType = (params) => request.get('/client/orderProject/listByWorkerType', params)

//修改客户下单项目
export const editCar = (data) => request.put('/client/orderProject', data)


// 获取代客下单门店列表
export const getStoreList = (params) => request.get('/partner/valet/getStoreList', params)


// 获取最近操作门店记录
export const getCustomerRecord = (clientId) => request.get('/partner/valet/getCustomerRecord/' + clientId)

// 获取所有收费标准列表
export const getChargeStandardList = (params) => request.get('/partner/valet/chargeStandardList', params)

//  获取代客下单师傅列表
export const getWorkerList = (params) => request.get('/partner/valet/getWorkerList', params)

// 获取下单门店客户信息
export const getCustomerInfo = (customerId) => request.get('/partner/valet/getCustomerInfo/' + customerId)

// 生成报价单
export const postQuotation = (data) => request.post('/partner/valet/generate/quotation', data)

// 获取门店最近下单的服务项
export const getProjectRecord = (id, params) => request.get('/partner/valet/getProjectRecord/' + id, params)

// 代客报修订单详情（创建人视角）
export const getOrderIdDetail = (orderId) => request.get('/partner/valet/create/' + orderId)

// 搜索服务分类

export const getListServiceQuery = (params) => request.get('/client/service/listService/query', params)

// 服务报价单（代客下单人视角）
export const getServiceQuotation = (orderId) => request.get('/partner/valet/create/serviceQuotation/' + orderId)