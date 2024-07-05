import request from '@/config/request.js';


// 查询客户地址管理列表
export const getAddressList = (params) => request.get('/client/serviceAddress/list',params)

// 新增地址
export const addAddress = (data) => request.post('/client/serviceAddress',data)

// 删除地址
export const deleteAddress = (addressIds) => request.delete('/client/address/'+addressIds)

// 修改地址
export const editAddress = (data) => request.put('/client/serviceAddress',data)

// 获取地址信息
export const getAddressInfo = (id) => request.get('/client/serviceAddress/'+id)

// 修改默认地址
export const editDefault = (data) => request.put('/client/address/editDefault',data)


