<template>
	<view class="page">
		<div class="title">合作签约信息</div>
		<view class="cell">
			<view class="item" v-for="item in messList" :key="item.id">
				<view class="label">
					{{item.label}}
				</view>
				<view class="value">
					<text class="text"> {{item.value||'-'}}</text>
					<text class="iconfont icon" style="margin:0 -14rpx 0 -12rpx;" v-if="item.id==7">&#xe604;</text>
				</view>
			</view>

		</view>
		<div class="title">推广收益</div>
		<view class="cell">
			<view class="item">
				<view class="label acea-row row-middle">
					<text style="margin-right: 6rpx;">业务推广分成比</text>
					<view style="position: relative;" @click.stop="showBubble = !showBubble">
						<u-icon name="question-circle" color="#F3B23E" size="18"></u-icon>
						<view v-show="showBubble" class="bubble">该合伙人所推广的品牌下单时，可额外获得的订单利润分成；<br />
							计算公式：业务推广奖励=订单利润*业务推广分成比<br />结算时间：当品牌方验收并支付后30日解冻发放
						</view>
					</view>
				</view>
				<view class="value">
					<text class="text"> {{partnerInfo.profitSharing||0}}%</text>
				</view>
			</view>
			<view class="item">
				<view class="label acea-row row-middle">
					<text style="margin-right: 6rpx;">订单消化分成比</text>
					<view style="position: relative;" @click.stop="showBubble1 = !showBubble1">
						<u-icon name="question-circle" color="#F3B23E" size="18"></u-icon>
						<view v-show="showBubble1" class="bubble">该合伙人自己接单并完成服务时，可额外获得的订单利润分成<br />
							计算公式：订单消化奖励=订单利润*订单消费分成比<br />结算时间：当品牌方验收并支付后30日解冻发放
						</view>
					</view>
				</view>
				<view class="value">
					<text class="text"> {{partnerInfo.orderConsumeSharing||0}}%</text>
				</view>
			</view>

		</view>
		<view>
			<div class="title">运营分红</div>
			<view class="kefu acea-row row-between-wrapper" @click="phoneAuth" v-if="!partnerInfo.isBonus">
				<text>联系客服，申请开通区域运营权限</text>
				<view>联系客服</view>
			</view>
			<view class="cell">
				<view class="item">
					<view class="label acea-row row-middle">
						<text style="margin-right: 6rpx;">团队育成奖励</text>
						<view style="position: relative;" @click.stop="showBubble2 = !showBubble2">
							<u-icon name="question-circle" color="#F3B23E" size="18"></u-icon>
							<view v-show="showBubble2" class="bubble">享受团队中“直属成员”的每月分成收益的育成奖励<br />
								计算公式：奖励金额=直属成员T月推广+消耗分成收益总合*团队育成奖励分成比<br />结算时间：月结，每月1号发放上一月的团队育成奖励
							</view>
						</view>
					</view>
					<view class="value">
						<text
							v-if="partnerInfo.isTeamBonus&&partnerInfo.teamBonusRatio">{{partnerInfo.teamBonusRatio}}</text>
						<text class="text" v-else>暂不享受该收益</text>
					</view>
				</view>
				<view class="item">
					<view class="label acea-row row-middle">
						<text style="margin-right: 6rpx;">区域运营补贴</text>
						<view style="position: relative;" @click.stop="showBubble3 = !showBubble3">
							<u-icon name="question-circle" color="#F3B23E" size="18"></u-icon>
							<view v-show="showBubble3" class="bubble">自己所推广的品牌订单由您自己接单服务时，你获得的额外分成收益<br />
								计算公式：区域运营补贴金额=区域内每笔订单利润*区域运营补贴比例<br />结算时间：当品牌方验收并支付后30日解冻发放
							</view>
						</view>
					</view>
					<view class="value">
						<text class="text" v-if="!partnerInfo.isBonus">暂不享受该收益</text>
						<view class="text acea-row" v-else @click="$jump('/subpkg/users/setting/region')">
							<text>共{{partnerInfo.regionCount}}个区域</text><u-icon name="arrow-right"
								style="position: relative; top: 2rpx;  right: -8rpx;" color="#212121"
								size="14"></u-icon>
						</view>

					</view>
				</view>
			</view>
		</view>
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
		<!-- <div class="title">关联师傅账号</div> -->
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		putImmediate
	} from "@/api/brand.js"
	import {
		callPhone
	} from '@/utils/phone.js'

	export default {
		data() {
			return {
				showBubble: false,
				showBubble1: false,
				showBubble2: false,
				showBubble3: false,
				showPhone: false,
				actionList: [{
						name: '0571-88387761'
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
				messList: [{
						id: 1,
						label: "真实姓名",
						value: "",
						key: "realName",
					},
					{
						id: 2,
						label: "联系电话",
						value: "",
						key: "cellPhone",
					}, {
						id: 3,
						label: "类型",
						value: "",
						key: "partnerType",
					}, {
						id: 4,
						label: "所在城市",
						value: "",
						key: "region",
					}, {
						id: 5,
						label: "邀请人",
						value: "",
						key: "superior",
					}
				],
				incomeList: [{
						label: "业务推广分成比",
						tip: "",
						ratio: "0.06",
						active: false,
						key: ""
					},
					{
						label: "订单消化分成比",
						tip: "",
						ratio: "0.06",
						active: false,
						key: "profitSharing"
					},
				],
				operateList: [
					// {
					// 	label: "团队育成奖励",
					// 	tip: "1",
					// 	ratio: "0.06",
					// 	active: false,
					// },
					{
						label: "关联区域",
						region: ''
					},
					// {
					// 	label: "区域运营补贴",
					// 	tip: "1",
					// 	ratio: "0.06",
					// 	active: false,
					// }
				],
				partnerInfo: {}

			}
		},
		computed: {},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				putImmediate(storage.get('ClientId')).then(res => {
					this.partnerInfo = res.data
					let data = res.data
					if (data) {
						this.messList.forEach(item => {
							if (item.key == 'partnerType') {
								item.value = data.partnerType == 1 ? '中级合伙人' : data.partnerType == 2 ?
									'高级合伙人' : '初级合伙人'
							} else {
								item.value = data[item.key]
							}
						})
					}
				})
			},
			phoneAuth() {
				this.showPhone = true
			},
			actionSelect(e) {
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					console.log(e, "222");
					// #ifdef APP-PLUS
					callPhone(this.actionList[0].name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(this.actionList[0].name, 'wx')
					// #endif
					this.showPhone = false
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		position: relative;
		padding: 0rpx 30rpx 20rpx;
		box-sizing: border-box;

		.title {
			height: 78rpx;
			font-size: 28rpx;
			color: #646566;
			line-height: 78rpx;
		}

		.kefu {
			height: 90rpx;
			line-height: 86rpx;
			background: #F3B23E;
			border-radius: 16rpx 16rpx 0rpx 0rpx;
			margin-bottom: -10rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			padding: 0 24rpx 0 30rpx;

			view {
				width: 144rpx;
				height: 60rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				border: 2rpx solid #F3B23E;
				margin-bottom: 10rpx;
				font-size: 28rpx;
				color: #F3B23E;
				line-height: 60rpx;
				text-align: center;

			}
		}

		.cell {
			background-color: #fff;
			padding: 14rpx 30rpx;
			border-radius: 16rpx;



			.item {
				position: relative;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mask {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
				}

				&:first-of-type {
					border-top: 0;
				}

				.label {
					font-size: 28rpx;
					color: #666666;
				}

				.value {
					display: flex;
					align-items: center;
					color: #212121;

					.text {
						font-size: 28rpx;
					}

					.null {
						color: #C0C4CC;
					}
				}

				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
				}

				.icon {
					text-align: right;
					color: rgba(192, 196, 204, 1);
					font-size: 40rpx;
					width: 50rpx;
				}
			}
		}
	}

	.bubble {
		width: 400rpx;
		position: absolute;
		bottom: 50rpx;
		left: -186rpx;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		color: #fff;

		&::after {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border: 10rpx solid transparent;
			border-top-color: #000;
			position: absolute;
			bottom: -18rpx;
			right: 230rpx;
		}
	}
</style>