<template>
	<view class="pay">
		<view class="top">
			<view class="title">
				实付金额
			</view>
			<view class="money">
				¥{{info.orderPrice}}
			</view>
		</view>
		<view class="method">
			<view style="	font-weight: bold;">
				选择支付方式
			</view>
			<view v-for="(item,index) in list" :key="index" class="box">
				<image :src="item.url"></image>
				<text style="display: inline-block;width:85%;">{{item.name}}</text>
				<view v-if="currentIndex==index" style="display: flex;align-items: center;">
					<image style="width: 32rpx;margin-right: 11rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png"
						mode="widthFix"></image>
				</view>
				<view v-else class="un" @click="choseMethod(index,item.name)">
					<view class="circle"></view>
				</view>
			</view>
		</view>
		<view class="btn" @click="pay">
			确认支付
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import * as pay from '@/api/pay.js'
	export default {
		data() {
			return {
				list: [{
						name: '微信支付',
						url: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/15/a0c74d821d914fa19d1755fd34e7d442.png',
					},
					{
						name: '支付宝支付',
						url: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/15/9955d4e3556e402091654a20d34956aa.png',
					}

				],
				currentIndex: undefined,
				info: {},
				code: '',
				type: '',
				wxCode: '',
			};
		},
		onLoad(option) {
			// #ifdef MP-WEIXIN
			this.list.splice(1, 1)
			wx.login({
				success:(res)=> {
					if (res.code) {
						this.wxCode = res.code
					}
				}
			})
			// #endif
			// this.info = JSON.parse(decodeURIComponent(option.item))
			// this.isGroupPayHandle()
			uni.getStorage({
				key: 'code',
				success:(res)=>{
					this.code = res.data
				}
			});

		},
		methods: {
			isGroupPayHandle() {
				pay.isGroupPay(this.info.orderId).then(res => {
					if (res.data.msg) {
						this.list.push({
							name: '集团代付',
							url: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/15/7483d75ee78344d7b12762f5585a5bdd.png',
						}, )
					}
				})
			},
			choseMethod(i, n) {
				this.currentIndex = i
				this.type = n
			},
			successHandle() {
				const pages = uni.$u.pages();

				if (pages.some(p => p.route.includes('accept'))) {
					uni.navigateBack({
						delta: 2, //返回上上一级注意这里要设置为2
					})
				} else {
					uni.navigateBack()
				}
			},

			weChatSuccess(number) {
				pay.payByOrderNumber(number).then(res => {

					this.$refs.uToast.show({
						type: 'default',
						message: res.data.message
					});
					setTimeout(() => {
						this.successHandle()
					}, 900)

				})
			},
			pay() {
				console.log(storage.get('SYSTEM_INFO'));
				if (this.currentIndex == undefined) {
					uni.showToast({
						title: '请选择支付方式',
						duration: 800,
						icon: 'none'
					});
				} else if (this.type == '微信支付') {
					console.log(this.info.orderId, this.wxCode);
					let type = storage.get('SYSTEM_INFO').hostName == "WeChat" ? 'JSAPI' : 'APP'
					if (type == 'JSAPI') {
						pay.weChatPay({
							orderId: this.info.orderId,
							code: this.wxCode,
							repairId: this.info.repairId ? this.info.repairId : undefined
						}).then(res => {
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
										console.log('success:' + JSON.stringify(res));
										that.weChatSuccess(data.outTradeNo)
									},
									fail(e) {
										console.log(e);
									}
								});
							}

						})
					} else {
						pay.appWeChatPay({
							orderId: this.info.orderId,
							repairId: this.info.repairId ? this.info.repairId : undefined
						}).then(res => {
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
										console.log(res);
										that.weChatSuccess(data.outTradeNo)
									},
									fail(e) {
										console.log(orderInfos);
										console.log(e);
									}
								})
							} else {
								let data = JSON.parse(res.data.data)
								console.log(data);
								this.$refs.uToast.show({
									type: 'error',
									message: data.message
								});
							}

						})

					}



				} else if (this.type == '支付宝支付') {
					pay.alipay({
						orderId: this.info.orderId,
						repairId: this.info.repairId ? this.info.repairId : undefined
					}).then(res => {
						console.log(res);
						console.log(res.data.orderStr);
						let that = this
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res.data.orderStr,
							success: function(res) {
								that.successHandle()
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});

					})
				} else if (this.type == '集团代付') {
					pay.payOnBehalf({
						orderId: this.info.orderId,
						repairId: this.info.repairId ? this.info.repairId : undefined
					}).then(res => {
						uni.showToast({
							title: res.data.msg,
							duration: 800,
							icon: 'none'
						});
						setTimeout(() => {
							this.successHandle()
						}, 900)
					})



				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay {

		.top {
			font-weight: bold;
			text-align: center;
			margin-top: 80rpx;

			.title {
				font-size: 36rpx;
				color: #3D3F3E;

			}

			.money {
				font-size: 54rpx;
				color: #EA6F2F;
				margin-top: 14rpx;
			}
		}

		.method {
			padding: 80rpx 30rpx;

			.box {
				display: flex;
				align-items: center;
				margin: 30rpx 0;
			}

			.un {

				color: #A5A7A7;

				.circle {
					width: 29rpx;
					height: 29rpx;
					border: 1px solid #D8DCDB;
					border-radius: 50%;
					margin-right: 11rpx;
				}
			}

			image {
				width: 54rpx;
				height: 54rpx;
				margin-right: 20rpx;
			}
		}

		.btn {
			width: 663rpx;
			height: 91rpx;
			line-height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36pxr;
			color: #FFFFFF;
			text-align: center;
			font-weight: bold;
			margin: 0 auto;
			margin-top: 400rpx;
		}
	}
</style>