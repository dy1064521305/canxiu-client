import request from '@/config/request.js';


// 查询客户地址管理列表
export const getAppUpdate = (params) => request.get('/client/appUpdate',params)

