import request from '@/config/request.js';


// 查询客户地址管理列表
export const getAddressList = (params) => request.get('/client/address/list',params)

// 新增地址
export const addAddress = (params) => request.post('/client/address',params)

// 删除地址
export const deleteAddress = (addressIds) => request.delete('/client/address/'+addressIds)

// 修改地址
export const editAddress = (params) => request.put('/client/address',params)

// 获取地址信息
export const getAddressInfo = (addressIds) => request.get('/client/address/'+addressIds)

// 修改默认地址
export const editDefault = (params) => request.put('/client/address/editDefault',params)


