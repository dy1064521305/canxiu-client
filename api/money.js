import {
	data
} from '../uni_modules/uview-ui/libs/mixin/mixin';
import request from '@/config/request.js';

// 获取用户钱包详细信息
export const getUserWallet = (params) => request.get('/finance/userWallet/getInfo', params)

// 查询用户收支明细列表
export const getWalletDetails = (params) => request.get('/finance/walletDetails/list', params)

// 查询用户提现记录列表
export const getUserWithdrawal = (params) => request.get('finance/userWithdrawal/listPartnerWithdrawal', params)

// 新增用户提现记录
export const addUserWithdrawal = (data) => request.post('/finance/userWithdrawal', data)

// 查询用户质保金收支列表
export const getListRetention = (params) => request.get('/finance/walletDetails/listRetention', params)

// 用户查询签约状态
export const getSignStatus = (params) => request.get('/finance/sign/getSignStatus', params)


// 查询用户提现记录列表
export const listWorkerWithdrawal = (params) => request.get('/finance/userWithdrawal/listWorkerWithdrawal', params)

// 用户查询提现记录账单详情
export const queryDetails = (withdrawalId) => request.get('/finance/userWithdrawal/queryDetails/' + withdrawalId)

// 用户提交灵活用工签约信息
export const signSubmit = (data) => request.post('/finance/sign/submit', data)


// 签约失败获取缓存签约信息
export const getSignCache = (params) => request.get('/finance/sign/getSignCache', params)

//取消申请
export const cancelWithdrawal = (params) => request.put('/finance/userWithdrawal/cancelWithdrawal', params)

// 获取合伙人我的资产
export const getClientAsset = (userId) => request.get('/finance/userWallet/getClientAsset/' + userId)

// 获取客户余额明细
export const getBalanceDetail = (params) => request.get('/finance/userWallet/client/balanceDetail', params)

// 获取客户投资款详情
export const getInvestmentInfo = (userId) => request.get('/client/investment/getInvestmentInfo/' + userId)

// 获取客户投资款变动明细
export const getInvestmentDetail = (params) => request.get('/client/investment/detail', params)

// 余额转入投资款
export const putTransferIn = (params) => request.put('/client/investment/transferIn', params)

// 投资款转出
export const putTransferOut = (params) => request.put('/client/investment/transferOut', params)

// 投资款转出审批列表(userId必传)
export const postWithdrawList = (params) => request.get('/client/investment/withdraw/list', params)