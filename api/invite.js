import request from '@/config/request.js';

// 获取邀请挣钱页面数据
export const inviteData = (params) => request.get('/basic/invite/queryData',params)

//邀请师傅列表
export const inviteWorkerList = (params) => request.get('/basic/invite/inviteWorkerList',params)

//邀请商家列表
export const inviteCustormerList = (params) => request.get('/basic/invite/inviteClientList',params)