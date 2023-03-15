import request from '@/config/request.js';

//加入维修车
export const joinCar = (params) => request.post('/client/orderProject/joinCar',params)

//查询维修车列表
export const getCarList = (params) => request.get('/client/orderProject/listCar',params)

// 删除维修车
export const deleteCar = (ids) => request.delete('/client/orderProject/'+ids)


//新增客户下单
export const addOrderProject = (params) => request.post('/client/orderProject',params)

//客户提交订单
export const postOrder = (params) => request.post('/client/order',params)