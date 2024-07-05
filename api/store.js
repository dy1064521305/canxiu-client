import request from '@/config/request.js';


// 查询门店列表
export const getCustomerList = (clientId) => request.get('/client/user/getCustomerList/'+clientId)

// 新增门店
export const addCustomer = (data) => request.post('/client/user/addCustomer',data)