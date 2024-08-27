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
			<view style="margin: 0rpx 0 20rpx;">付款方式</view>
			<!-- <view class="pages-fangshi-yue acea-row row-middle">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/19/327f30aca98e4384a55e79cff9137ca4.png"
					mode=""></image>
				<view class="pages-fangshi-yue-right acea-row row-column row-center">
					<text>钱包余额</text>
					<view>可提现金额：¥{{amount}}</view>
				</view>
			</view> -->
			<view class="pages-fangshi-items acea-row row-middle row-between-wrapper" v-for="(item,index) in payList"
				:key="item.type" @click="checkAll(item,index)" :class="{on:item.check}">
				<view class="pages-fangshi-items-left acea-row row-middle">
					<image :src="item.img" mode=""></image>
					<view class="acea-row" style="flex-direction: column;">
						<view class="">{{item.title}}</view>
						<text class="mess" v-if="item.type=='yue'">余额；¥{{amount}}</text>
						<text class="mess" v-else>交易手续费:{{commission}}</text>
					</view>
				</view>
				<view class="pages-fangshi-items-right acea-row row-middle">
					<image v-if="!item.check" :src="item.img_no" mode=""></image>
					<image v-else :src="item.img_yes" mode=""></image>
				</view>
			</view>
		</view>
		<view class="pages-btn" @click="sureInto">
			确认转入
		</view>
		<view class="pages-message">
			<view>操作须知 </view>
			<view>1、仅支持将账户钱包中可提现余额转入到投资款账户内。</view>
			<view>2、转入的部分余额将不可提现，需从新转出至账号钱包后才可提现。</view>
			<view>3、转入的金额不算作“个人投资款”款项，故“个人投资款”金额不会增加，只会增加投资款可用余额。</view>
		</view>
	</view>
</template>

<script>
	import {
		putTransferIn,
		getClientAsset
	} from '@/api/money.js'
	import * as pay from '@/api/pay.js'
	import storage from '@/utils/storage'
	const img_no = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/73f7603eb003465fa5198a7fb04cd22e.png'
	const img_yes = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/0533ff643a9b40acaa0fb32980d58842.png'
	export default {
		data() {
			return {
				where: {
					userId: storage.get('ClientId'),
					transferAmount: ''
				},
				payList: [{
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/3edae2d9dbea4d55809a7b86f0a6558d.png",
						type: "yue",
						title: "投资款账户余额",
						img_no: img_no,
						img_yes: img_yes,
						check: true
					},
					{
						img: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/15/a0c74d821d914fa19d1755fd34e7d442.png",
						type: "wx",
						title: "微信支付",
						img_no: img_no,
						img_yes: img_yes,
						check: false
					},
				],
				amount: 0,
				payType: "",
				wxCode: ""
			}
		},
		onLoad() {

			this.getInfo()
		},
		computed: {
			commission() {
				return (this.where.transferAmount * 0.006).toFixed(2)
			}
		},
		methods: {
			getInfo() {
				getClientAsset(storage.get('ClientId')).then(res => {
					let data = res.data || {}
					this.amount = data.withdrawnAmount
				})
			},
			sureInto() {
				if (Number(this.where.transferAmount) <= 0) return this.$toast('转入金额不能小于0')
				if (this.payType == 'yue') {
					if (Number(this.amount) < Number(this.where.transferAmount)) return this.$toast('可转入金额不足')
					putTransferIn(this.where).then(res => {
						uni.$u.toast('转入成功')
						this.where.transferAmount = ''
						setTimeout(() => {
							this.getInfo()
						}, 1000)
					})
				} else {
					let type = storage.get('SYSTEM_INFO').hostName == "WeChat" ? 'JSAPI' : 'APP'
					if (type == 'JSAPI') {
						// #ifdef MP-WEIXIN
						wx.login({
							success: (res) => {
								if (res.code) {
									this.wxCode = res.code
								}
							}
						})
						// #endif
						let info = {
							userId: storage.get('ClientId'),
							userType: 'c', // 用户类型：客户 - c；师傅：w						
							amount: this.where.transferAmount, // 金额						
							transactionFeeRatio: '0.006', // 手续费率						
							transactionFee: this.commission, // 手续费
							rechargeTarget: 0, // 充值目的：0 - 投资款
							code: this.wxCode
						}
						pay.postWeChatRecharge(info).then(res => {
							console.log(res);
							if (res.data.code != 200) {
								this.$refs.uToast.show({
									type: 'error',
									message: res.data.message
								});
							} else {
								console.log(res);
								let data = res.data.data
								let that = this
								uni.requestPayment({
									appid: data.appid,
									provider: 'wxpay',
									timeStamp: data.timestamp,
									nonceStr: data.noncestr,
									package: data.package,
									signType: 'RSA',
									paySign: data.paySign,
									success(res) {
										that.where.transferAmount = ""
										console.log('success:' + JSON.stringify(res));

									},
									fail(e) {
										console.log(e, "error");
									}
								});
							}

						})
					} else {
						let info = {
							userId: storage.get('ClientId'),
							userType: 'c', // 用户类型：客户 - c；师傅：w						
							amount: this.where.transferAmount, // 金额						
							transactionFeeRatio: '0.006', // 手续费率						
							transactionFee: this.commission, // 手续费
							rechargeTarget: 0, // 充值目的：0 - 投资款
						}
						pay.postAppWeChatRecharge(info).then(res => {
							console.log(res);
							if (res.data.code == 200) {
								let data = res.data.data
								var orderInfos = {
									"appid": data.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
									"noncestr": data.noncestr, // 随机字符串
									"package": data.package, // 固定值
									"partnerid": data.partnerid, // 微信支付商户号
									"prepayid": data.prepayid, // 统一下单订单号 
									"timestamp": data.timestamp, // 时间戳（单位：秒）
									"sign": data.sign, // 签名，这里用的 MD5/RSA 签名
								}
								let that = this
								uni.requestPayment({
									provider: "wxpay",
									orderInfo: orderInfos,
									success(res) {
										that.where.transferAmount = ""
										console.log(res, "success");

									},
									fail(e) {
										console.log(e, "error");
									}
								})
							} else {
								let data = JSON.parse(res.data.data)
								this.$refs.uToast.show({
									type: 'error',
									message: data.message
								});
							}

						})

					}

				}

			},
			checkAll(i, index) {
				this.payType = i.type
				this.payList.forEach((item) => {
					if (item.type == i.type) {
						item.check = true
					} else {
						item.check = false
					}
				})

			},
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
			padding: 20rpx;

			// view:nth-child(1) {
			// 	height: 96rpx;
			// 	line-height: 96rpx;
			// 	border-bottom: 1rpx solid #F2F2F2;
			// 	padding-left: 24rpx;
			// }

			// &-yue {
			// 	height: 144rpx;

			// 	image {
			// 		width: 80rpx;
			// 		height: 80rpx;
			// 		margin: 0 24rpx;
			// 	}

			// 	&-right {
			// 		font-size: 32rpx;
			// 		color: #212121;

			// 		view {
			// 			font-size: 28rpx;
			// 			color: #999999;
			// 			margin-top: 8rpx;
			// 		}
			// 	}
			// }
			&-items {
				height: 128rpx;
				// background: #F5F5F5;
				border-radius: 16rpx;
				border: 1rpx solid #fff;
				padding: 0 34rpx;
				font-size: 28rpx;
				color: #212121;
				box-sizing: border-box;
				// margin-top: 20rpx;

				&.on {
					background: #Fff;
					border: 1rpx solid #A4D091;
				}

				&-left {
					image {
						width: 64rpx;
						height: 64rpx;
						margin-right: 22rpx;
					}

					.mess {
						font-size: 24rpx;
						color: #999999;
						margin-top: 4rpx;
					}
				}

				&-right {
					image {
						width: 32rpx;
						height: 32rpx;
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