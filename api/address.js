import request from '@/config/request.js';


// 查询客户地址管理列表
export const getAddressList = (params) => request.get('/client/address/list',params)

// 新增地址
export const addAddress = (data) => request.post('/client/address',data)

// 删除地址
export const deleteAddress = (addressIds) => request.delete('/client/address/'+addressIds)

// 修改地址s
export const editAddress = (data) => request.put('/client/address',data)

// 获取地址信息
export const getAddressInfo = (id) => request.get('/client/address/'+id)

// 修改默认地址
export const editDefault = (data) => request.put('/client/address/editDefault',data)


