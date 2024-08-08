<!-- <template>
	<view class="pages">

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;
	}
</style> -->
<template>
	<view class="pages">
		<view class="pages-money">
			<view class="pages-money-type acea-row">
				<view class="pages-money-type-1 acea-row row-column row-center">
					<text>个人投资款（元）</text>
					<view>{{info.personInvestmentBalance||0}}</view>
				</view>
				<view class="pages-money-type-1  acea-row row-column row-center">
					<text>投资分红</text>
					<view>{{info.capitalSubsidyAmount||0}}</view>
				</view>
			</view>
			<view class="wenan">
				可转出余额：¥{{info.transferableAmount||0}}
			</view>
		</view>
		<view class="pages-money" style="padding-bottom: 60rpx;">
			<view>转出金额</view>
			<view class="value price-font">
				<text class="value-icon">￥</text>
				<input v-model="where.transferAmount" placeholder="请输入转出金额" placeholder-style="color:#999999;"
					type="digit" />
				<text style="color: #212121; font-size: 28rpx; margin-top: 14rpx;margin-right: 20rpx;"
					@click="allOut">全部转出</text>
			</view>
		</view>
		<view class="pages-fangshi acea-row row-between-wrapper"
			@click="$jump('/subpkg/center/myMoney/invest/toExamine')">
			<view>审核记录</view>
			<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="pages-btn" @click="sureOut">
			确认转出
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
		getInvestmentInfo,
		putTransferOut
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				where: {
					userId: storage.get('ClientId'),
					transferAmount: ""
				},
				info: {}
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				getInvestmentInfo(storage.get('ClientId')).then(res => {
					this.info = res.data || {}
				})
			},
			sureOut() {
				console.log(this.info.transferableAmount, "this.info.transferableAmount ");
				console.log(this.where.transferAmount, "this.where.transferAmount ");
				if (Number(this.info.transferableAmount) < Number(this.where.transferAmount)) return this.$toast('可转出金额不足')
				if (Number(this.where.transferAmount) <= 0) return this.$toast('转出金额不能小于0')
				putTransferOut(this.where).then(res => {
					uni.$u.toast('转出成功')
					this.getInfo()
					this.where.transferAmount = ''

				})
			},
			allOut() {
				this.where.transferAmount = this.info.transferableAmount
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
			padding: 24rpx 22rpx 0;
			font-size: 28rpx;
			color: #212121;
			margin-bottom: 20rpx;

			&-type {
				height: 140rpx;
				font-size: 28rpx;
				color: #666666;

				&-1 {
					width: 50%;

					view {
						font-size: 40rpx;
						color: #212121;
						margin-top: 14rpx;
						margin-left: 4rpx;
					}
				}
			}

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
				line-height: 90rpx;
				font-size: 28rpx;
				color: #999999;
				border-top: 1rpx solid #E5E5E5;
				margin-top: 20rpx;
			}
		}

		&-fangshi {
			height: 96rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 0 22rpx;
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