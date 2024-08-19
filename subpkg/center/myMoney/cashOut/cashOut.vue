<template>
	<view class="cash-out">
		<view class="one" @click="goCard">
			<view class="fonts" style="font-weight: bold;margin-bottom: 20rpx;">
				提现到
			</view>
			<view class="cardInfo">
				<view class="fonts">
					<text v-if="card">{{bankName||''}}（{{card}}）</text>
					<text v-else>选择银行卡</text>
					<text style="color: #A5A7A7;margin-left: 10rpx;">快捷</text>
				</view>
				<view>
					<image style="width:16rpx;height: 32rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
					</image>
				</view>

			</view>
		</view>
		<view class="two">
			<view class="fonts" style="font-weight: bold;margin-bottom: 20rpx;">
				转出金额
			</view>
			<view style="display: flex;align-items: center;	justify-content: space-between">
				<view style="display: flex;align-items: center">
					<text style="font-size: 60rpx;color: #3D3F3E;margin-right: 20rpx;">¥</text>
					<input v-model="amount" type="number" :placeholder="'可提现金额' +withdrawal+ '元'">
				</view>
				<view @click="getAllMoney" style="color: #A4D091;">
					全部
				</view>
			</view>
		</view>
		<view @click="goRecord" class="three" style="display: flex;align-items: center;justify-content: space-between">
			<view style="display: flex;align-items: center;">
				<img src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/27/a840b5bb5208411b9021e4f8ebee4dcd.png"
					style='width:44rpx ;height: 40rpx;'>
				<text class="fonts" style="font-weight: bold;margin-left: 20rpx;">提现记录</text>
			</view>
			<image style="width:16rpx;height: 32rpx;"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
			</image>
		</view>

		<view class="button" @click="cashOut">
			确认提现
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		addUserWithdrawal,
		getUserWallet
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	import {
		getBankCardList
	} from '@/api/bankCard.js'
	export default {
		data() {
			return {
				card: '',
				bankName: '',
				amount: '',
				bankId: '',
				withdrawal: 0
			};
		},
		onLoad() {
			this.getLoad()

		},
		methods: {
			getLoad() {
				getUserWallet({
					userId: storage.get('ClientId'),
					userType: 'c'
				}).then(res => {
					console.log(res);
					this.withdrawal = res.data.withdrawal
				})
				getBankCardList({
					pageSize: 10,
					pageNum: 1,
					isDefault: 'Y',
					userId: storage.get('ClientId'),
				}).then(res => {
					console.log(res.rows[0]);
					this.bankName = res.rows[0].bankName
					this.card = res.rows[0].cardNumber.substr(-4)
					this.bankId = res.rows[0].cardId
				})
			},
			//获取银行卡信息
			getCardInfo(item) {
				console.log(item);
				this.bankName = item.bankName
				this.card = item.cardNumber.substr(-4)
				this.bankId = item.cardId
			},
			goCard() {
				let info = {
					type: 'cash',
					bankId: this.bankId
				}
				uni.navigateTo({
					url: '../myCard/myCard?info=' + JSON.stringify(info)
				})
			},
			//提现记录
			goRecord() {
				uni.navigateTo({
					url: '../cashOutDetailed/cashOutDetailed'
				})
			},
			cashOut() {

				if (this.amount == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: '请输入提现金额'
					});
					return
				}
				if (this.bankId == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: '请选择银行卡'
					});
					return
				}
				addUserWithdrawal({
					userId: storage.get('ClientId'),
					userType: 'c',
					amount: this.amount,
					bankId: this.bankId
				}).then(res => {
					console.log(res);
					if (res.data.msg == '申请提现成功') {
						uni.navigateTo({
							url: '../cashOutDetailed/cashOutDetailed'
						})
						this.withdrawal = 0
					}
					this.$refs.uToast.show({
						type: 'default',
						message: res.data.msg
					});
					this.reset()
				})
			},
			reset() {
				this.card = '',
					this.bankName = '',
					this.amount = '',
					this.bankId = ''

			},
			//全部
			getAllMoney() {
				this.amount = this.withdrawal
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cash-out {

		.one,
		.two,
		.three {

			background: #FFFFFF;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
			border-radius: 16rpx;
			padding: 30rpx 20rpx;
			margin: 20rpx;

		}

		.fonts {
			font-size: 34rpx;
			color: #3D3F3E;
		}

		.one {
			.cardInfo {
				display: flex;
				align-items: center;
				justify-content: space-between
			}
		}

		.button {
			width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			position: absolute;
			bottom: 300rpx;
			left: 43rpx;
		}

	}
</style>