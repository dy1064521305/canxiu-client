<template>
	<view class="pages">
		<view class="pages-money">
			<view>转入金额</view>
			<view class="value price-font">
				<text class="value-icon" style="margin-top: 14rpx;">￥</text>
				<input v-model="where.transferAmount" placeholder="请输入转入金额" placeholder-style="color:#999999;"
					type="digit" />
			</view>
			<view class="wenan">
				转入后，这部分钱将无法直接提现
			</view>
		</view>
		<view class="pages-fangshi">
			<view>付款方式</view>
			<view class="pages-fangshi-yue acea-row row-middle">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/19/327f30aca98e4384a55e79cff9137ca4.png"
					mode=""></image>
				<view class="pages-fangshi-yue-right acea-row row-column row-center">
					<text>钱包余额</text>
					<view>可提现金额：¥{{amount}}</view>
				</view>
			</view>
		</view>
		<view class="pages-btn" @click="sureInto">
			确认转入
		</view>
		<view class="pages-message">
			<view>操作须知 </view>
			<view>1、这里显示预存款转入规则说明这里显示预存款转入规则说明这里显示预存款转入规则说明</view>
			<view>2、这里显示预存款转入规则说明 </view>
		</view>
	</view>
</template>

<script>
	import {
		putTransferIn,
		getClientAsset
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				where: {
					userId: storage.get('ClientId'),
					transferAmount: ""
				},
				amount: 0
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				getClientAsset(storage.get('ClientId')).then(res => {
					let data = res.data || {}
					this.amount = data.withdrawnAmount
				})
			},
			sureInto() {
				if (Number(this.amount) < Number(this.where.transferAmount)) return this.$toast('可转入金额不足')
				if (Number(this.where.transferAmount) <= 0) return this.$toast('转入金额不能小于0')
				putTransferIn(this.where).then(res => {
					uni.$u.toast('转入成功')
					this.where.transferAmount = ''
					setTimeout(() => {
						this.getInfo()
					}, 1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;
		padding: 20rpx;

		&-money {
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 24rpx 20rpx 0;
			font-size: 28rpx;
			color: #212121;

			.value {
				display: flex;
				align-items: center;
				margin-top: 54rpx;

				input {
					font-size: 70rpx;
					// height: 66rpx;
					height: 100%;
					flex: 1;
					display: flex;
					align-items: center;
					font-size: 42rpx;
					margin-left: 24rpx;
				}
			}

			.wenan {
				height: 90rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				color: #999999;
				border-top: 1rpx solid #E5E5E5;
				margin-top: 20rpx;
			}
		}

		&-fangshi {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin-top: 20rpx;

			view:nth-child(1) {
				height: 96rpx;
				line-height: 96rpx;
				border-bottom: 1rpx solid #F2F2F2;
				padding-left: 24rpx;
			}

			&-yue {
				height: 144rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					margin: 0 24rpx;
				}

				&-right {
					font-size: 32rpx;
					color: #212121;

					view {
						font-size: 28rpx;
						color: #999999;
						margin-top: 8rpx;
					}
				}
			}
		}

		&-btn {
			height: 88rpx;
			background: #A4D091;
			text-align: center;
			line-height: 88rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #FFFFFF;
			margin-top: 42rpx;
			border-radius: 10rpx;
		}

		&-message {
			font-size: 28rpx;
			color: #404040;
			padding: 44rpx 18rpx 0 24rpx;

			view {
				margin-bottom: 6rpx;
			}

			view:nth-child(1) {
				margin-bottom: 14rpx;
			}
		}
	}
</style>