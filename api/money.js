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