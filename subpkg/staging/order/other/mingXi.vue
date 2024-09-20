<template>
	<view class="pages">
		<view class="price flex-colum-center">
			<view class="name">收入-订单工费</view>
			<view class="money"> <text>¥</text>200.33</view>
			<view class="time">冻结中，解冻时间：2023-12-12</view>
			<view class="bottom">
				<view class="btn" @click="toThaw">申请提前解冻</view>
				<!-- <view class="btn btn2">解冻审核中</view> -->
			</view>
		</view>
		<view class="title">工费明细</view>
		<view class="box">
			<view class="box-item acea-row row-between-wrapper">
				<text>类型</text>
				<text>订单收入-维修服务</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>服务费</text>
				<text class="green">+<text style="font-size: 20rpx;"> ¥ </text>188</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>配件费</text>
				<text>+<text style="font-size: 20rpx;"> ¥ </text>188</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>加急费</text>
				<text>+<text style="font-size: 20rpx;"> ¥ </text>188</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>代付费用</text>
				<text>+<text style="font-size: 20rpx;"> ¥ </text>188</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>师傅补贴</text>
				<text class="green">+<text style="font-size: 20rpx;"> ¥ </text>188</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>合计收入</text>
				<text class="green">+<text style="font-size: 20rpx;"> ¥ </text>188</text>
			</view>
		</view>
		<view class="title">客户信息</view>
		<view class="box">
			<view class="box-item acea-row row-between-wrapper">
				<text>下单号</text>
				<text>杨明慧</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>门店名称</text>
				<text>曾三仙米线国芳天街店</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>订单编号</text>
				<text>WX44030624082401 <text class="iconfont icon-iconmore-copy"></text> </text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>下单时间</text>
				<text>2023/12/12 12:12:12</text>
			</view>

		</view>
		<view class="title">结算信息</view>
		<view class="box">
			<view class="box-item acea-row row-between-wrapper">
				<text>结算单号</text>
				<text>1830444615283163138</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>结算审核人</text>
				<text>杨明慧</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>预计结算时间</text>
				<text>{{info.maintenanceSupervisor||'-'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>预计结算金额</text>
				<text class="green">+<text style="font-size: 20rpx;"> ¥ </text>188</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>结算备注</text>
				<text>{{info.maintenanceSupervisor||'-'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getContractDetails
	} from "@/api/brand.js"
	export default {
		data() {
			return {
				id: '',
				info: {}
			}
		},
		onLoad(options) {
			if (options && options.id) {
				this.id = options.id
			}
			this.getList()
		},
		methods: {
			getList() {
				getContractDetails(this.id).then(res => {
					this.info = res.data
					let data = this.info
					if (data.contractImg && data.contractImg.length > 0) {
						data.contractImg = data.contractImg.split(',')
					}
				})
			},
			toThaw() {
				this.$alert('解冻审核提示', 1, {
					content: '解冻申请需系统审核，系统审核通过后你可立即提现！',
					confirmText: '确认申请',
					cancelText: '我在想想',
				}).then(res => {
					if (res.confirm) {
						return
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100%;
		padding: 0 32rpx 50rpx;

		.price {
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 50rpx 0;
			margin-top: 20rpx;

			.name {
				color: #666666;
			}

			.money {
				color: #212121;
				font-size: 64rpx;
				margin: 10rpx 0;

				text {
					font-size: 32rpx;
				}
			}

			.time {
				color: #999999;
				font-size: 24rpx;
			}

			.bottom {
				.btn {
					width: 320rpx;
					padding: 22rpx 0;
					background: $pageColor;
					border-radius: 16rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 32rpx;
					color: #FFFFFF;
					text-align: center;
					margin-top: 30rpx;
				}

				.btn2 {
					background: rgba(243, 178, 62, 0.08);
					color: #F3B23E;
				}
			}
		}

		.title {
			font-size: 28rpx;
			color: #646566;
			margin: 20rpx 0 20rpx 6rpx;
			font-weight: bold;
		}

		.box {
			background: #FFFFFF;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #212121;

			&-item {
				border-bottom: 1rpx solid #f5f5f5;
				padding: 24rpx 20rpx;

				&-img {
					width: 100%;
					display: flex;

					image {
						width: 144rpx;
						height: 144rpx;
						margin: 30rpx 20rpx 20rpx 0;
						border-radius: 10rpx;
					}
				}

				.green {
					color: #A4D091;
				}

				.iconfont {
					font-size: 26rpx;
					margin-left: 4rpx;
				}
			}
		}
	}
</style>