import request from '@/config/request.js';


// 查询客户银行卡管理列表
export const getBankCardList = (params) => request.get('/client/bankCard/list',params)

// 新增银行卡
export const addBankCard = (params) => request.post('/client/bankCard',params)

// 删除银行卡
export const deleteBankCard = (cardId) => request.delete('/client/bankCard/'+cardId)

// 修改银行卡
export const editBankCard = (params) => request.put('/client/bankCard',params)

// 获取客户银行卡详细信息
export const getBankCardInfo = (cardId) => request.get('/client/bankCard/'+cardId)