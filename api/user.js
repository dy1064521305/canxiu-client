import request from '@/config/request.js';

// 获取客户端用户详细信息
export const getInfoById = (clientId) => request.get('/client/user/' + clientId)

// 修改客户端用户
export const editUser = (data) => request.put('/client/user', data)

//获取我的页面数据
export const queryMyInfo = (clientId) => request.get('/client/user/queryMyInfo/' + clientId)

// 用户注销账号
export const deleteUser = (clientId) => request.delete('/client/user/logout/' + clientId)

//查询客户优惠券列表
export const getCouponList = (params) => request.get('/client/coupon/list', params)

//查询门店订单数据
export const getOrderStatics = (clientId) => request.get('/client/order/statics/' + clientId)

// 修改个人账号信息
export const putEditInfo = (data) => request.put('/client/user/edit/info', data)