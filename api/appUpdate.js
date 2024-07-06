import request from '@/config/request.js';


// 查询客户地址管理列表
export const getAppUpdate = (params) => request.get('/client/appUpdate', params)

// 客户提交合伙人申请
export const postPartnerApply = (data) => request.post('/basic/partnerApply', data)