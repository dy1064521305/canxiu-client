import request from '@/config/request.js';



export const getUserSig = (params) => request.get('/tim/contextLoads',params)
// 查询单聊消息
export const sendIMMsg = (params) => request.get('/tim/sendIMMsg',params)
// 查询账号是否已经导入im
export const account = (params) => request.get('/tim/account',params)
// 查询账号在线状态
export const accountQueryState = (params) => request.get('/tim/accountQueryState',params)
// 单发单聊消息
export const sendMsg = (params) => request.get('/tim/sendMsg',params)
// 撤回单聊消息
export const adminMsgWithDraw = (params) => request.get('/tim/adminMsgWithDraw',params)
// 设置单聊消息已读
export const adminSetMsgRead = (params) => request.get('/tim/adminSetMsgRead',params)

export const getC2cUnreadMsgNum = () => request.get('/tim/getC2cUnreadMsgNum')


export const queryList = (params) => request.get('/common/getui/queryList',params)
export const queryUnreadNum = () => request.get('/common/getui/queryUnreadNum')

export const editRead = (data) => request.put('/common/getui',data)
