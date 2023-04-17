import request from '@/config/request.js';

//加入维修车
export const joinCar = (data) => request.post('/client/orderProject/joinCar',data)

//查询维修车列表
export const getCarList = (params) => request.get('/client/orderProject/listCar',params)

// 删除维修车
export const deleteCar = (ids) => request.delete('/client/orderProject/'+ids)


//新增客户下单
export const addOrderProject = (data) => request.post('/client/orderProject',data)

//客户提交订单
export const postOrder = (data) => request.post('/client/order',data)