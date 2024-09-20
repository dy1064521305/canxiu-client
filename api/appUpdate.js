import request from '@/config/request.js';


// 查询客户地址管理列表
export const getAppUpdate = (params) => request.get('/client/appUpdate', params)

// 客户提交合伙人申请
export const postPartnerApply = (data) => request.post('/basic/partnerApply', data)

// 获取合伙人销售信息
export const getTeamSaleInfo = (userId, params) => request.get('/partner/team/saleInfo/' + userId, params)

// 获取合伙人工单信息
export const getTeamOrderInfo = (userId) => request.get('/partner/team/orderInfo/' + userId)

// 获取合伙人团队基本信息
export const getTeamBaseInfo = (userId) => request.get('/partner/team/baseInfo/' + userId)

// 获取合伙人负责区域
export const getPartnerRegion = (userId) => request.get('/client/partner/partnerRegion/' + userId)