import request from '@/config/request.js';

// 获取服务分类
export const getService = (params) => request.get('/client/service/listService',params)

// 查询产品服务详情
export const getServiceInfo = (params) => request.get('/client/service/getServiceInfo',params)


// 查询产品服务中收费标准
export const getListCharge = (params) => request.get('/client/service/listCharge',params)