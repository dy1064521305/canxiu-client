import request from '@/config/request.js';


// 获取邀请挣钱页面数据
export const inviteData = (params) => request.get('/basic/invite/queryData', params)

//邀请师傅列表
export const inviteWorkerList = (params) => request.get('/basic/invite/inviteWorkerList', params)

//邀请商家列表
export const inviteCustormerList = (params) => request.get('/basic/invite/inviteClientList', params)

//师傅邀请好友记录
export const inviteRecord = (params) => request.get('/worker/friend/invite/record', params)

//师傅端邀请好友奖励记录
export const inviteReward = (params) => request.get('/worker/friend/invite/reward', params)

//师傅端邀请好友专题页统计
export const statistics = (params) => request.get('/worker/friend/invite/statistics', params)

//师傅端邀请好友生成链接
export const getShareLink = (params) => request.get('/worker/friend/invite/getShareLink', params)

//获取活动
export const getActivity = (params) => request.get('/worker/friend/invite/getActivity', params)

//参与邀请活动
export const participation = (data) => request.post('/worker/friend/invite/participation', data)

//邀请活动活动奖励（今日与本月）
export const activityReward = (params) => request.get('/worker/friend/invite/activityReward', params)

//新增注册活动数据
export const activityData = (data) => request.post('/basic/activityData', data)
//选择店铺类型
export const getStoreType = () => request.get('/client/user/queryStoreType')

//师傅邀请商家记录
export const inviteCustomerRecord = (params) => request.get('/worker/friend/invite/client/customerRecord', params)

//客户奖励记录
export const getStoreReward = (params) => request.get('/worker/friend/invite/client/reward', params)
// 合伙人邀请活动奖励记录
export const getPartnerReward = (params) => request.get('/worker/friend/invite/partner/rewardRecord', params)

//商圈列表
export const districtList = (params) => request.get('/basic/district/list', params)

//商圈列表
export const getInactiveList = (params) => request.get('/worker/friend/invite/client/inactive', params)

// 管理端-余额明细-可提现推广奖励
export const getPromotionalRewardsList = (params) => request.get('finance/partnerDetails/promotionalRewardsList',
	params)

//邀请客户主题页统计排行榜
export const getStatisticsRank = (params) => request.get('/worker/friend/invite/client/statistics', params)
//邀请客户主题页统计
export const getClientStatisticsRank = (params) => request.get('/worker/friend/invite/client/statistics/rank', params)
// 师傅的接口

export const queryUnreadNum = () => request.get('/common/getui/queryUnreadNum')