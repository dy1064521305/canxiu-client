import request from '@/config/request.js';


// 查询客户银行卡管理列表
export const getBankCardList = (params) => request.get('/client/bankCard/list',params)

// 新增银行卡
export const addBankCard = (data) => request.post('/client/bankCard',data)

// 删除银行卡
export const deleteBankCard = (cardIds) => request.delete('/client/bankCard/'+cardIds)

// 修改银行卡
export const editBankCard = (data) => request.put('/client/bankCard',data)

// 获取客户银行卡详细信息
export const getBankCardInfo = (cardId) => request.get('/client/bankCard/'+cardId)

// 用户校验是否有签约银行卡
export const checkIsSign = (params) => request.get('/client/bankCard/checkIsSign',params)

// 根据银行卡号获取银行卡相关信息
export const getCardInfo = (params) => request.get('/finance/sign/getCardInfo',params)

// 修改银行卡默认
export const editDefault = (params) => request.put('/client/bankCard/editDefault', params)