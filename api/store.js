import request from '@/config/request.js';


// 查询门店列表
export const getCustomerList = (clientId) => request.get('/client/user/getCustomerList/'+clientId)

// 新增门店
export const addCustomer = (data) => request.post('/client/user/addCustomer',data)

// 客户移除门店
export const removeStore = (data) => request.delete('/client/user/remove/customer',data)

// 修改门店地址
export const editServiceAddress = (data) => request.put('/client/user/editServiceAddress',data)


