<template>
	<view class="page">
		<PopupBottom @tap-mask="closeAccountShow" :title="title" :show="show" @close="closeAccountShow"
			@confirm="confirmSelect">
			<text style="font-size: 24rpx; color: #999999;margin-left: 30rpx;">成功关联后，你才能获得消耗品牌订单利润分成奖励</text>
			<view class="popMoney">
				<view class="popMoney-set acea-row row-middle">
					真实姓名
					<input v-model="where.name" type="text" style=" margin-left: 22rpx; padding-left: 20rpx;"
						placeholder="请填写师傅实名认证姓名信息" />
				</view>
				<view class="popMoney-set acea-row row-middle">
					联系电话
					<input v-model="where.phone" type="number" style=" margin-left: 22rpx; padding-left: 20rpx;"
						placeholder="请填写师傅账号所绑定手机号" />
				</view>
				<view class="popMoney-set acea-row row-middle">
					<!-- <text style="color:#FB2323; margin:6rpx 10rpx 0 0 ;">*</text> -->
					调整金额
					<input v-model="where.invite" type="number" style=" margin-left: 22rpx; padding-left: 20rpx;"
						placeholder="请填写师傅账号唯一邀请码" />
				</view>
				<view class="popMoney-btn" @click="closeAccountShow(1)">
					查找账号
				</view>
			</view>
		</PopupBottom>
		<Popup :show="popShow" :iconX="false" sizeColor="#F3B23E" @confirm="sureSet" confirmText="确定绑定" title="信息确认"
			@close='closeAccountShow' @tap-mask="closeAccountShow">
			<view class="popMoney-content acea-row row-middle">
				<image src="" mode=""></image>
				<view class="popMoney-content-m flex-colum">
					<view class="line1">龙岩市龙岩市龙岩市龙岩市龙岩市</view>
					<view class="">福建省-龙岩市-新罗区</view>
				</view>
			</view>
		</Popup>
	</view>
</template>

<script>
	import PopupBottom from "@/components/popup/bottom.vue"
	import Popup from "@/components/popup/centerSure.vue"

	export default {
		name: 'workerAccount',
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
				default: '关联师傅账号',
			},
		},
		components: {
			PopupBottom,
			Popup
		},
		data() {
			return {
				popShow: false,
				where: {
					name: "",
					phone: "",
					invite: ""
				}
			}
		},
		methods: {
			closeAccountShow(i) {
				if (i) {
					this.popShow = true
					console.log(this.where, 'where');
				} else {
					this.popShow = false
				}
				this.$emit('close')


			},
			sureSet() {
				console.log(this.where, 'where');
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

		&-btn {
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
			margin: 80rpx 0 20rpx;
		}
	}

	.popMoney-content {
		height: 144rpx;
		background: rgba(243, 178, 62, 0.08);
		border-radius: 16rpx;
		margin: 0rpx 30rpx 44rpx;

		image {
			width: 80rpx;
			height: 80rpx;
			background: #A4D091;
			border-radius: 50%;
			margin: 0 22rpx;
		}

		&-m {
			view {
				font-size: 28rpx;
				color: #999999;
			}

			view:nth-child(1) {
				width: 440rpx;
				font-size: 32rpx;
				color: #212121;
			}
		}
	}
</style>