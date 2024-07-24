import request from '@/config/request.js';

// 获取师傅端用户详细信息
export const getUserWallet = (params) => request.get('/finance/userWallet/getInfo',params)

// 查询用户收支明细列表
export const getWalletDetails = (params) => request.get('/finance/walletDetails/list',params)

// 查询用户提现记录列表
export const getUserWithdrawal = (params) => request.get('/finance/userWithdrawal/list',params)

// 新增用户提现记录
export const addUserWithdrawal = (data) => request.post('/finance/userWithdrawal',data)

// 查询用户质保金收支列表
export const getListRetention = (params) => request.get('/finance/walletDetails/listRetention',params)

// 用户查询签约状态
export const getSignStatus = (params) => request.get('/finance/sign/getSignStatus',params)

// 师傅校验是否有签约银行卡
export const checklsSign = (params) => request.get('/worker/bankCard/checklsSign',params)

// 查询师傅提现记录列表
export const listWorkerWithdrawal = (params) => request.get('/finance/userWithdrawal/listWorkerWithdrawal',params)

// 用户查询提现记录账单详情
export const queryDetails = (withdrawalId) => request.get('/finance/userWithdrawal/queryDetails/'+withdrawalId)