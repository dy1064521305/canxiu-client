<template>
	<view class="pages">
		<Header listen-scroll type='dark' :scroll-top="scrollTop" :offset-top="100" title="团队管理" no-blank>
			<template #back>
				<u-icon name="arrow-left" size="20" color="#353431" @click="$jump('pages/center/index')"></u-icon>
				<!-- <text class="iconfont icon-zuo" style="font-size: 42rpx;"></text> -->
			</template>
			<!-- <text style="font-size: 34rpx;">我的资产</text> -->
		</Header>
		<view class="topBg">
			<view class="topBg-user acea-row row-middle" @click.stop="$jump('/subpkg/center/brand/cooperateSettings')">
				<view class="topBg-user-image">
					<image v-if="baseInfo.avatarUrl" :src="baseInfo.avatarUrl" mode=""></image>
					<image v-else
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/14/0fc1c13f76864515bd2c314287d11154.png"
						mode=""></image>
				</view>
				<view class="topBg-user-name acea-row row-between-wrapper">
					<view class="" style="flex: 1; padding: 6rpx 0;">
						<view class="line1">{{baseInfo.realName||'暂无昵称'}}</view>
						<view class="color">{{baseInfo.partnerType==1?'中级':baseInfo.partnerType==2?'高级':'初级'}}合伙人</view>
					</view>
					<!-- <view @click.stop="workerAccountShow=true">+师傅账号</view> -->

				</view>
			</view>
			<view class="topBg-team acea-row row-between-wrapper">
				<view class="topBg-team-items acea-row flex-colum-center" @click="$jump('/subpkg/staging/team/people')">
					<view>{{baseInfo.teamCount||0}}</view>
					<text>团队成员</text>
				</view>
				<view class=" topBg-team-items acea-row flex-colum-center"
					@click="$jump('/subpkg/staging/workers/workers?partnerId='+baseInfo.partnerId)">
					<view>{{baseInfo.teamWorkerCount||0}}</view>
					<text>团队师傅</text>
				</view>
				<view class="topBg-team-items acea-row flex-colum-center" @click="$jump('/subpkg/center/brand/index')">
					<view>{{baseInfo.brandCount||0}}</view>
					<text>推广品牌</text>
				</view>
				<view class="topBg-team-items acea-row flex-colum-center"
					@click="$jump('/subpkg/center/inviteActivity/inviteStoreList?partnerId='+ userId)">
					<view>{{baseInfo.customerCount||0}}</view>
					<text>推广门店</text>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- <view class="team">
				<view class="team-mess acea-row row-between-wrapper">
					<view class="team-mess-left acea-row row-middle">
						<image src="" mode=""></image>
						<view class="team-mess-left-right ">
							<view class="team-mess-left-right-title line1">2小时前小时前小时前小时前小时前小时前</view>
							<view class="team-mess-left-right-time">2小时前</view>
						</view>
					</view>
					<u-icon name="arrow-right" color="#CCCCCC" size="18"></u-icon>

				</view>
			</view> -->
			<view class="counts">
				<view class="counts-title">
					<view>工单概览</view>
					<view class="acea-row row-middle" style="margin-right: 30rpx;  font-size: 28rpx; color: #666666;"
						@click="$jump('/subpkg/center/myOrder/myOrderAll?name=全部订单')">
						全部 <u-icon name="arrow-right" color="#666666" size="14"></u-icon></view>
				</view>

				<view class="counts-types acea-row">
					<view class="counts-types-items acea-row " @click="toList(index)"
						v-for="(item,index) in xiuList.slice(0,4)" :key="index">
						<view class="counts-types-items-value">{{item.num||0}}</view>
						<text>{{item.label}}</text>
					</view>
				</view>
				<view class="counts-status">
					<view class="counts-status-items acea-row " v-for="(item,index) in xiuList.slice(4,12)"
						:key="index">
						<view class="counts-status-items-value">{{item.num||0}}</view>
						<text>{{item.label}}</text>
					</view>
				</view>
				<!-- <view class="counts-other acea-row">
					<view class="counts-other-items acea-row">
						今日待上门<text>12</text>
					</view>
					<view class="counts-other-items acea-row">
						今日异常订单<text>12</text>
					</view>
				</view> -->
			</view>
			<view class="counts">
				<!-- <text class="counts-title">常用功能</text> -->
				<view class="counts-type acea-row">
					<view class="counts-type-all " @click="toDetail(i)" v-for="(i) in userList" :key="i.id">
						<image :class="'img-'+i.id" :src="i.img" mode=""></image>
						<view>{{i.label}}</view>
					</view>

				</view>
			</view>
			<view class="counts countsMoney">
				<view class="countsMoney-change acea-row row-middle row-center">
					<view :class="{on:type==0}" @click="onChange(0)">个人</view>
					<view :class="{on:type==1}" @click="onChange(1)">团队</view>
				</view>
				<text class="text" style="margin-left: 24rpx;">累计销售额（元）</text>
				<view class="countsMoney-money">{{saleInfo.totalSaleAmount||0}}</view>
				<view class="countsMoney-all"> <text class="text">本月销售额：</text>¥{{saleInfo.currentMonthSaleAmount||0}}
					<text class="text" style="margin: 0 14rpx;">|</text> <text
						class="text">已支付工费：</text>¥{{saleInfo.currentMonthWorkerPayedAmount||0}}
				</view>
				<view class="countsMoney-allType">
					<view class="countsMoney-allType-items acea-row " v-for="(item,index) in orderList" :key="index">
						<view class="countsMoney-allType-items-value">{{item.num||0}}</view>
						<text>{{item.label}}</text>
					</view>
				</view>
			</view>
			<view class="setUp">
				<view class="setUp-list acea-row row-between-wrapper" @click="toUrl(item)" v-for="(item) in typeList"
					:key="item.id">
					<view class="setUp-list-left">
						<image :src="item.img" :class="'img-'+item.id" mode=""></image>
						<text>{{item.label}}</text>
					</view>
					<view class="setUp-list-right">
						<u-icon name="arrow-right" color="#959595" size="18"></u-icon>
					</view>
				</view>
			</view>
			<u-popup :show="noCardShow" mode="center" :round="10" @close="noCardShow=false">
				<view class="pop_show flex-colum-center" @click="toCard">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/07/32651409c622489ebbfb814a7d488cb2.png"
						mode=""></image>
					<view class="pop_show-mess">
						您当前的账号未绑定银行卡，请绑定银行卡后再进行后续操作！
					</view>
					<view class="pop_show-btn acea-row row-middle row-center">
						前往绑卡
					</view>
				</view>
			</u-popup>
			<workerAccount :show="workerAccountShow" @close="closeWorkerAccount"></workerAccount>
		</view>

	</view>
</template>

<script>
	import Header from '@/components/header/index.vue';
	import storage from '@/utils/storage'
	import {
		getTeamSaleInfo,
		getTeamOrderInfo,
		getTeamBaseInfo
	} from "@/api/appUpdate.js"
	import {
		postVerifyBankCard
	} from "@/api/brand.js"
	import workerAccount from "./components/workerAccount.vue"
	export default {
		components: {
			Header,
			workerAccount
		},
		data() {
			return {
				noCardShow: false,
				workerAccountShow: false,
				userList: [{
						id: 0,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/2d8e4ecd9bb0440eb0d9e1efd21696ac.png",
						label: "分享推广",
						url: "/subpkg/center/brand/MyinviterQrCode"
					},
					// {
					// 	id: 1,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/61a6f84299d54dcba9b77912d360e557.png",
					// 	label: "代客报修",
					// 	url: "/subpkg/center/inviteWorker/inviteRewards?type=inviter"
					// },
					{
						id: 2,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/bc08364c119f47e6b92e08b09ab03c51.png",
						label: "订单结算",
						url: "/subpkg/staging/workers/records"
					},
					{
						id: 3,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/25277597b2c444d8915e683fa61a8d8d.png",
						label: "品牌签约",
						url: "/subpkg/center/brand/Signing"
					},
					{
						id: 4,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/8c74d382d08347e9b75de3dfbb86bcb6.png",
						label: "审核管理",
						url: "/subpkg/staging/team/process"
					},
					{
						id: 5,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/d8d131e2f98345b6bcd6107c1e0539be.png",
						label: "我的收益",
						url: "/subpkg/center/inviteWorker/inviteRewards?type=推广奖励"
					},
					{
						id: 6,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/e0fd7277338d4742ae8b47be9e5278ac.png",
						label: "我的资产",
						url: "/subpkg/center/myMoney/myMoney"
					},
				],
				typeList: [{
						id: 0,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "订单详情",
						url: "/subpkg/staging/order/detail"
					},
					{
						id: 1,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "服务报价单",
						url: "/subpkg/staging/order/quotation"
					},
					{
						id: 2,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "选择门店",
						url: "/subpkg/staging/order/store",
					},
					{
						id: 3,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "选择服务项",
						url: "/subpkg/staging/order/serve/select"
					},
					{
						id: 4,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "代客报修",
						url: "/subpkg/staging/order/serve/repair"
					},
					{
						id: 5,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "账单详情",
						url: "/subpkg/staging/order/serve/billDetails"
					},
					{
						id: 6,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "编辑服务项",
						url: "/subpkg/staging/order/serve/edit"
					},
					{
						id: 6,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "我的师傅",
						url: "/subpkg/staging/order/serve/assignWorker"
					},
					{
						id: 7,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "添加费用项",
						url: "/subpkg/staging/order/serve/addCost"
					},
					{
						id: 10,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "代客报修列表",
						url: "/subpkg/center/myOrder/repairOrder?name=全部订单"
					},

					// {
					// 	id: 1,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/cc78fbf88e5e476eafdeef2fe0c9a6d6.png",
					// 	label: "推广收益统计",
					// 	url: "/subpkg/center/inviteWorker/inviteRewards?type=inviter"
					// },
					// {
					// 	id: 2,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/7320eca633d8472692bceca08d92aae4.png",
					// 	label: "师傅管理",
					// 	url: "/subpkg/staging/workers/workers"
					// },
					// {
					// 	id: 3,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
					// 	label: "师傅结算记录",
					// 	url: "/subpkg/staging/workers/records"
					// },

				],
				xiuList: [{
						label: "审核单",
						value: "reviewOrderCount",
						num: 0,
					},
					{
						label: "返修单",
						value: "repairOrderCount",
						num: 0,
					},
					{
						label: "品牌报修",
						value: "brandOrderCount",
						num: 0,
					},
					{
						label: "代客报修",
						value: "valetOrderCount",
						num: 0,
					}, {
						label: "待接单",
						value: "grabOrderCount",
						num: 0,
					},
					{
						label: "待上门",
						value: "waitDoorOrderCount",
						num: 0,
					},
					{
						label: "服务中",
						value: "serviceIngOrderCount",
						num: 0,
					},
					{
						label: "待验收",
						value: "waitAccOrderCount",
						num: 0,
					},
					{
						label: "待商家支付",
						value: "waitPayOrderCount",
						num: 0,
					},
					{
						label: "售后中",
						value: "afterSaleOrderCount",
						num: 0,
					},
					{
						label: "服务完成",
						value: "finishOrderCount",
						num: 0,
					},
					{
						label: "关闭/取消",
						value: "cancelOrCloseOrderCount",
						num: 0,
					},
				],
				orderList: [{
						label: "服务中",
						value: "serviceIngOrderCount",
						num: 0,
					},
					{
						label: "待支付",
						value: "waitPayOrderCount",
						num: 0,
					},
					{
						label: "待结算",
						value: "unsettleOrderCount",
						num: 0,
					},
					{
						label: "已结算",
						value: "settlementOrderCount",
						num: 0,
					},
				],
				partnerId: "",
				scrollTop: 0,
				type: 0,
				userId: storage.get('ClientId'),
				saleInfo: {},
				baseInfo: {}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad(options) {
			this.getSaleInfo()
			this.getOrderInfo()
			this.getBaseInfo()
		},
		methods: {
			getBaseInfo() {
				getTeamBaseInfo(this.userId).then(res => {
					let data = res.data
					if (data) {
						this.baseInfo = data
						this.partnerId = data.partnerId
					}
				})
			},
			getOrderInfo() {
				getTeamOrderInfo(this.userId).then(res => {
					let data = res.data
					if (data) {
						this.xiuList.forEach(item => {
							item.num = data[item.value]
						})
					}
				})
			},
			getSaleInfo() {
				getTeamSaleInfo(this.userId, {
					type: this.type
				}).then(res => {
					let data = res.data
					if (data) {
						this.orderList.forEach(item => {
							item.num = data[item.value]
						})
						this.saleInfo = data
					}
				})
			},
			onChange(t) {
				if (t == this.type) return
				this.type = this.type == 0 ? 1 : 0
				this.getSaleInfo()
			},
			// 跳转
			toUrl(item) {

				if (item.id == 2 || item.id == 3) {
					this.$jump(item.url + '?partnerId=' + this.partnerId)
				} else if (item.id == 8) {
					this.$jump(item.url + '?userId=' + this.userId)
				} else {
					this.$jump(item.url)
				}
				// switch (id){
				// 	case value:
				// 		break;
				// 	default:
				// 		break;
				// }
			},

			toCard() {
				this.noCardShow = false
				this.$jump('/subpkg/center/myMoney/addCard/addCard')
			},
			toDetail(i) {
				switch (i.label) {
					case '分享推广':
						postVerifyBankCard(storage.get('ClientId')).then(res => {
							if (res.msg == 'ture') {
								this.$jump(i.url + '?partnerId=' + this.partnerId)
							} else {
								this.noCardShow = true
							}
						})
						break;
					case '订单结算':
						this.$jump(i.url + '?partnerId=' + this.partnerId)
						break;
					case '师傅管理':
						this.$jump(i.url + '?partnerId=' + this.partnerId)
						break;
					default:
						this.$jump(i.url)
						break;
				}

			},
			closeWorkerAccount(e) {
				this.workerAccountShow = false
			},
			toList(index) {
				if (index != 3) return
				this.$jump('/subpkg/center/myOrder/repairOrder?name=全部订单')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100vh;
		background-color: #F2F2F2;

		.topBg {
			background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/13/af640efd1c3f4672b9a6825acf651946.png") no-repeat;
			background-size: 100% 100%;
			padding: 186rpx 32rpx 48rpx;
			box-sizing: border-box;

			&-user {
				&-image {
					width: 80rpx;
					height: 80rpx;
					margin-right: 24rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				&-name {
					.line1 {
						display: block;
						width: 420rpx;
						color: #212121;
					}

					.color {
						display: inline-block;
						background: #F3B23E;
						font-size: 20rpx;
						padding: 0rpx 8rpx;
						color: #fff;
						border-radius: 6rpx;
					}
				}
			}

			&-team {
				color: #212121;
				margin-top: 50rpx;

				&-items {
					width: 24%;

					view {
						font-family: PingFangSC, PingFang SC;
						font-weight: bold;
						font-size: 40rpx;
						margin-bottom: 8rpx;
					}

					text {
						font-size: 24rpx;
					}

				}
			}
		}

		.content {
			padding: 0 32rpx 30rpx;
		}

		.team {
			margin-bottom: 20rpx;

			&-mess {
				height: 128rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				padding: 0 24rpx;

				&-left {
					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 4rpx;
						margin-right: 24rpx;
						background-color: #212121;
					}

					&-right {
						&-title {
							width: 462rpx;
							font-size: 28rpx;
							color: #212121;
						}

						&-time {
							font-size: 24rpx;
							color: #999999;
							margin-top: 2rpx;
						}
					}
				}
			}
		}



		.counts {
			background: #FFFFFF;
			border-radius: 14rpx;
			margin-bottom: 20rpx;
			padding-top: 20rpx;
			box-sizing: border-box;
			font-size: 25rpx;
			color: #3D3F3E;



			&-title {
				font-size: 30rpx;
				margin-left: 30rpx;
				display: flex;
				justify-content: space-between;
			}

			&-types {
				height: 144rpx;
				background: rgba(243, 178, 62, 0.08);
				border-radius: 8rpx;
				margin: 30rpx 20rpx 20rpx;
				justify-content: space-between;

				&-items {
					width: 21%;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					&-value {
						font-weight: bold;
						color: #F3B23E;
						font-size: 32rpx;
						margin-bottom: 8rpx;
					}
				}
			}

			&-status {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				padding-bottom: 26rpx;
				// margin-top: 30rpx;

				&-items {
					width: 25%;
					// padding: 24rpx 0;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 110rpx;

					&-value {
						font-weight: bold;
						color: #212121;
						font-size: 32rpx;
						margin-bottom: 8rpx;
					}
				}
			}

			&-other {
				height: 82rpx;
				line-height: 82rpx;
				border-top: 1rpx solid #ececec;

				&-items {
					width: 50%;
					justify-content: center;

					text {
						font-family: PingFangSC, PingFang SC;
						font-weight: bold;
						font-size: 25rpx;
						color: #A4D091;
						margin-left: 6rpx;

					}
				}
			}

			&-type {
				padding: 20rpx 0 40rpx;
				justify-content: space-around;
				// margin-top: 22rpx;
				display: grid;
				text-align: center;
				grid-template-columns: repeat(4, 1fr);
				grid-column-gap: 0rpx;
				grid-row-gap: 42rpx;

				&-all {
					image {
						width: 56rpx;
						height: 56rpx;
					}

					// .img-0 {
					// 	width: 58rpx;
					// 	height: 58rpx;
					// }

					// .img-1 {
					// 	width: 64rpx;
					// 	height: 58rpx;
					// }

					// .img-2 {
					// 	width: 59rpx;
					// 	height: 58rpx;
					// }

					// .img-3 {
					// 	width: 55rpx;
					// 	height: 58rpx;
					// }

					view {
						font-size: 25rpx;
						color: #3D3F3E;
						margin-top: 15rpx;
					}
				}
			}
		}

		.countsMoney {
			padding: 40rpx 0rpx 0;
			position: relative;

			.text {
				font-size: 24rpx;
				color: #666666;
			}

			&-change {
				position: absolute;
				top: 32rpx;
				right: 32rpx;
				width: 192rpx;
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
				background: #FEF9F0;
				color: #F3B23E;
				font-size: 26rpx;

				view {
					width: 50%;

					&.on {
						height: 56rpx;
						background-color: #F3B23E;
						line-height: 56rpx;
						border-radius: 18rpx;
						color: #fff;
					}
				}
			}

			&-money {
				font-family: PingFangSC, PingFang SC;
				font-weight: bold;
				font-size: 60rpx;
				color: #F3B23E;
				margin: 16rpx 0 16rpx 22rpx;
			}

			&-all {
				color: #F3B23E;
				margin-left: 24rpx;
			}

			&-allType {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				padding: 24rpx 0;

				// margin-top: 30rpx;
				&-items {
					width: 25%;
					// padding: 24rpx 0;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 110rpx;

					&-value {
						font-weight: bold;
						color: #212121;
						font-size: 32rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}

		.setUp {
			padding: 0 20rpx;
			background-color: #fff;
			border-radius: 14rpx;
			margin-top: 22rpx;

			&-list {
				height: 100rpx;
				border-bottom: 1rpx solid #ececec;

				&-left {
					display: flex;
					align-items: center;

					image {
						width: 38rpx;
						height: 36rpx;
						margin-left: 26rpx;


						&.img-3 {
							width: 43rpx;
						}

						&.img2-5 {
							width: 39rpx;
						}

						&.img2-6 {
							width: 43rpx;
						}
					}

					text {
						font-size: 25rpx;
						color: #333333;
						margin-left: 18rpx;
					}
				}

				&-right {}
			}

			&-list:nth-last-child(1) {
				border-bottom: none;
			}
		}

	}

	.pop_show {
		width: 596rpx;
		/* #ifndef APP-PLUS */
		padding-bottom: 20rpx;
		/* #endif */
		background: #FFFFFF;
		border-radius: 24rpx;

		image {
			width: 160rpx;
			height: 160rpx;
			margin: 70rpx 0 16rpx 0;
		}

		&-mess {
			width: 504rpx;
			height: 80rpx;
			font-size: 28rpx;
			color: #666666;
			line-height: 40rpx;
			text-align: center;
		}

		&-btn {
			width: 524rpx;
			height: 88rpx;
			background: #A4D091;
			border-radius: 8rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			margin-top: 90rpx;
		}
	}
</style>