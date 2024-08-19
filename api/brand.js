import request from '@/config/request.js';


//获取品牌列表
export const getBrandList = (params) => request.get('/terrace/customerManager/myBrandList', params)
//我的品牌下门店列表

export const storeListByBrand = (params) => request.get('/terrace/customerManager/storeListByBrand', params)
//品牌or门店下订单列表
export const getListOrder = (params) => request.get('/terrace/customerManager/listOrder', params)

// 合伙人
// 获取邀请品牌入驻的二维码
export const getPartnerQrCode = (params) => request.get('/partner/partner/getQrCode', params)

// 品牌签约信息设置
export const putUpdateContractInfoOfT = (data) => request.put('/basic/partnerBrand/updateContractInfoOfT', data)

// 邀请品牌方入驻
export const postPartnerBrand = (data) => request.post('/basic/partnerBrand', data)

// 签约设置前校验用户是否绑定银行卡
export const postVerifyBankCard = (userld) => request.get('/basic/partnerBrand/verifyBankCard/' + userld)

// 品牌签约信息设置
export const postAddContractInfoOf = (data) => request.post('/basic/partnerBrand/addContractInfoOf', data)

// 品牌签约管理列表
export const putQueryList = (data) => request.get('/basic/partnerBrand/queryList', data)

// 合伙人管理品牌信息列表
export const putBrandManageList = (data) => request.get('/basic/partnerBrand/brandManageList', data)

// 管理端获取当前登录人的partnerld
export const getGetPartnerld = (userld) => request.get('/partner/partner/getPartnerId/' + userld)

// 拿取合伙人的信息
export const putImmediate = (id) => request.get('/client/partner/' + id)


// 获取品牌签约信息详情
export const getContractDetails = (id) => request.get('/basic/partnerBrand/contractDetails/' + id)

// 管理端-品牌推广佣金结算记录
export const getSettlementRecordsList = (data) => request.get('/finance/partnerWithdrawal/settlementRecords', data)

// 管理端-获取用户列表
export const getUserList = () => request.get('/system/user/userList')