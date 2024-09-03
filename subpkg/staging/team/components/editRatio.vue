<template>
	<view class="page">
		<PopupBottom @tap-mask="closeAccountShow" :title="title" :show="show" @close="closeAccountShow"
			@confirm="confirmSelect">
			<view class="popMoney" style="margin-top: 30rpx;">
				<view class="box">
					<view style="margin-bottom: 20rpx; color: #646566; font-size: 28rpx;">设置百分比</view>
					<view class="input">
						<u--input style="width: 564rpx;" v-model="ratio" @input="blurs" type="digit"
							placeholder="请输入（0.00~100%）" border="surround" clearable></u--input>
						<view class="input_s">%</view>
					</view>
					<view class="pages-message" v-if="type==1">
						<view style="margin-left: -14rpx;">【规则说明】 </view>
						<view>
							<view>1、奖励说明：当该合伙人自己所推广的品牌门店下单时，所获得的利润奖励。</view>
							<view>2、计算公式：订单分成奖励金额=订单净利*订单推广分成比</view>
							<view>3、结算节点: <br />
								当下单用户完成支付后30天自动结算
								<br />
								如用户发起返修但未完成返修服务时分红将结算失败
							</view>
						</view>
					</view>
					<view class="pages-message" v-else>
						<view style="margin-left: -14rpx;">【规则说明】 </view>
						<view>
							<view>1、奖励说明：当该合伙人及其师傅团队完成订单服务时，所获得的利润奖励。</view>
							<view>2、计算公式：订单消化奖励金额=订单净利*订单消化分成比</view>
							<view>3、结算节点: <br />
								当下单用户完成支付后30天自动结算。
								<br />
								如用户发起返修但未完成返修服务时分红将结算失败
							</view>
						</view>
					</view>
				</view>
				<view class="btn" @click="editSure()">保存编辑</view>
			</view>
		</PopupBottom>
	</view>
</template>

<script>
	import PopupBottom from "@/components/popup/bottom.vue"

	export default {
		name: 'editRatio',
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			type: {
				type: String,
				default: '',
			},

			title: {
				type: String,
				default: '修改业务推广分成比例',
			},
		},
		components: {
			PopupBottom,
		},
		data() {
			return {
				ratio: ""
			}
		},
		methods: {
			closeAccountShow() {
				this.$emit('close')
			},
			blurs(e) {
				//正则表达试
				e = (e.match(/^\d*(\.?\d{0,2})/g)[0]) || null
				//重新赋值给input
				this.$nextTick(() => {
					this.ratio = e
				})
				if (e < 0 || e > 100) return this.$toast('值只能输入0-100')
			},
			editSure() {
				this.$emit('sureEdit', this.ratio)
				this.ratio = ""
			}

		}
	}
</script>

<style lang="scss" scoped>
	.popMoney {
		padding: 24rpx 24rpx 0;

		&-set {
			height: 96rpx;
			line-height: 96rpx;
			border-bottom: 1rpx solid #f5f5f5;

			/deep/ .uni-input-placeholder {
				color: #CCCCCC;
				font-size: 28rpx;
			}

			input {
				flex: 1;
				text-align: right;
			}
		}

		.btn {
			width: 100%;
			height: 88rpx;
			background: #F3B23E;
			border-radius: 8rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 88rpx;
			text-align: center;
			margin: 40rpx 0 0rpx;
		}
	}

	.box {
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 0rpx 20rpx 34rpx 20rpx;

		.input {
			position: relative;

			.input_s {
				position: absolute;
				top: 0;
				right: 0;
				width: 64rpx;
				height: 100%;
				background: #F3B23E;
				font-size: 32rpx;
				text-align: center;
				line-height: 64rpx;
				color: #FFFFFF;
				border-radius: 0rpx 10rpx 10rpx 0rpx;
			}
		}

		&-top {
			font-size: 28rpx;
			color: #646566;

			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 8rpx;
				;
			}
		}

		&-me {
			margin: 20rpx 0 0 40rpx;
			color: #999999;
			font-size: 24rpx;
		}

		.pages-message {
			color: #999999;
			font-size: 24rpx;
			margin-top: 40rpx;

			view {
				margin-bottom: 14rpx;
			}
		}
	}
</style>