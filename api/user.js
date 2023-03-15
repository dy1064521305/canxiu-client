import request from '@/config/request.js';

// 获取客户端用户详细信息
export const getInfoById = (clientId) => request.get('/client/user/'+clientId)

// 修改客户端用户
export const editUser = (params) => request.put('/client/user',params)

//获取我的页面数据
export const queryMyInfo = (clientId) => request.get('/client/user/queryMyInfo/'+clientId)