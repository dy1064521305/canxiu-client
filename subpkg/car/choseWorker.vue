<template>
	<view class="choseWorker">
		<view class="one bg">
			<view class="top ">
				<view class="align-center">
					<img :src="imgs" style="width: 40rpx;height: 40rpx;margin-right: 10rpx;">
					水龙头换把手 等<text style="color:#A4D091;">2</text>项
				</view>
				<view style="color:#1981F9;font-size: 24rpx;">
					订单详情 >
				</view>
			</view>
			<view class="flex-colum-center center">
				<view class="name">订单合计工费</view>
				<view class="money"> <text>¥</text>200.33</view>
				<view class="bottom align-center">
					<view class="btn-white" @click="getCodeShow=true">
						<img src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/b950664504684bd887c3aacf3f63713e.png"
							style="width: 28rpx;height: 28rpx;margin-right: 10rpx;">
						当面扫码
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button class="btn-green" open-type="share">
						<img src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png"
							style="width: 32rpx;height: 26rpx;margin-right: 10rpx;">
						发送微信好友
					</button>

					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<view class="btn-green" @click='shareFriend'>
						<img src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png"
							style="width: 32rpx;height: 26rpx;margin-right: 10rpx;">
						发送微信好友
					</view>
					<!-- #endif -->


				</view>
			</view>
			<view class="font" style="margin-top:26rpx ;">
				<view>· 当师傅接受之后，将自动成为该笔订单接单师傅且可提现该笔订单的成本</view>
				<view>· 如一次分享给多位师傅，以第一位接单师傅为准。</view>
			</view>
		</view>
		<view class="two bg">
			<view class="title">
				发送短信通知
			</view>
			<view class="font" style="margin: 10rpx 0;">
				如果对方未注册平台账号，你可通过短信方式发送通知
			</view>
			<view class="input-phone align-center">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/dfa1c7dab64e49f388de725d782c4ecc.png"
					style="width: 20rpx;height: 28rpx;margin-right: 10rpx;"></image>
				<input class="flex-con" v-model="phone" type="number" placeholder="输入对方手机号"></input>
			</view>
			<view class="btn">
				立即发送
			</view>
		</view>
		<view class="three bg">
			<view class="top justify-between align-center">
				<view class="title">
					该门店成员
				</view>
				<view class="search">
					<u-search placeholder="更多师傅" v-model="search" :showAction='false'></u-search>
				</view>
			</view>
			<view class="center">
				<view v-for="(item,i) in 4" :key="i" class="box justify-between  align-center">
					<view class="align-center">
						<image style="width: 80rpx;height: 80rpx;"
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png">
						</image>
						<!-- 	<u--image v-else width='80x' height='80x' :src="userInfo.avatarUrl" shape="circle">
						</u--image> -->
						<view class="left">
							<view class="title">
								俺师傅
								<text class="tip">
									报修审核人
								</text>
							</view>
							<view class="phone">
								15912349643
							</view>
						</view>
					</view>
					<view class="duanxin">
						发送短信
					</view>
				</view>
			</view>
		</view>

		<u-popup :show="getCodeShow" @close="getCodeShow=false" closeable :round="10">
			<view class="code_box">
				<view class="title">当面扫码</view>
				<view style="margin: 20rpx 0;">
					<image :src="imgs" style="width:560rpx;height: 560rpx;"></image>

				</view>
				<view style="margin-bottom: 20rpx;">
					请打开微信，用【扫一扫】功能进行扫码
				</view>
				<view class="btn" @click="saveCode">
					二维码保存相册
				</view>
			</view>

		</u-popup>



		<view style="height: 30rpx;">

		</view>

		<view v-if="cardShow">
			<!-- #ifdef H5 -->
			<l-painter ref="painter" :board="base" @success="hldsz" custom-style="position: relative;" height="1624rpx"
				isCanvasToTempFilePath useCORS />
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<l-painter ref="painter" :board="base" @success="hldsz" custom-style="position:relative;margin-left:1000rpx"
				height="978rpx" isCanvasToTempFilePath />
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<l-painter ref="painter" :board="base" @success="hldsz" custom-style="position:relative;margin-left:1000rpx"
				height="978rpx" isCanvasToTempFilePath />
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import lPainter from '@/components/lime-painter/components/l-painter/l-painter.vue'
	import {
		saveImage,
	} from '@/utils/index.js'
	export default {
		components: {
			lPainter
		},
		data() {
			return {
				imgs: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png',
				phone: '',
				search: '',
				getCodeShow: false,
				cardShow: false,
				url: '',
				base: {},
				info: {
					title: '摄像头网络故障',
					money: '122',
					workerType: "油漆师傅",
					time: "2021-08-30 16:30",
					address: "绍兴市柯桥区"
				},
				type: '',
				shareTitle:''
			};
		},
		onShareAppMessage(res) {
			return {
				title: this.shareTitle,
				imageUrl: this.url,
				path: `/pages/home/index`,

			}
		},
		onLoad() {
			this.getCard()
		},
		methods: {
			saveCode() {
				saveImage(this.imgs, () => {
					uni.showToast({
						title: '成功保存到相册',
						icon: 'none'
					})
				})
			},
			shareFriend() {
				// #ifdef MP-WEIXIN
				this.type = 'weixin'
				// #endif
				// #ifdef APP-PLUS
				this.activityDataHandle()
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					//href:'http://uniapp.dcloud.io/',
					// href: this.link,
					title: '有人给你派单了，快来接单吧！',
					imageUrl: this.url,
					success: (res) => {
						console.log("success:" + JSON.stringify(res));

					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
						// err.errCode == '-8' && this.goUrl()
					}
				});
				// #endif 
			},
			getCard() {
				if (false) {
					this.shareTitle='${服务名称}订单已结算，快来领取吧！'
					this.base = {
						width: '440rpx',
						views: [{
								type: 'view',
								css: {
									width: '440rpx',
									height: '352rpx',
									background: '#F5F5F5',
									position: "relative"
								}
							},
							{
								type: 'text',
								text: '订单收入',
								css: {
									fontSize: "32rpx",
									position: 'absolute',
									top: '98rpx',
									left: '156rpx',
									color: " #9B9B9B"
								}
							},
							{
								type: 'text',
								text: '¥',
								css: {
									fontSize: "32rpx",
									position: 'absolute',
									top: '210rpx',
									left: '88rpx',
									color: "#212121"
								}
							},
							{
								type: 'text',
								text: '1000.00',
								css: {
									fontSize: "64rpx",
									position: 'absolute',
									top: '176rpx',
									left: '110rpx',
									color: "#212121"
								}
							},
						]
					}
				} else {
					this.shareTitle='${合伙人账号昵称}给你派单了，快来接单吧！'
					this.base = {
						width: '440rpx',
						views: [{
								type: 'view',
								css: {
									width: '440rpx',
									height: '352rpx',
									background: '#F5F5F5',
									position: "relative"
								}
							},
							{
								type: 'text',
								text: '服务内容',
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '14rpx',
									left: '20rpx',
									color: "#999"
								}
							},
							{
								type: 'text',
								text: this.info.title,
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '54rpx',
									left: '20rpx',
									color: '#212121'
								}
							},
							{
								type: 'view',
								css: {
									width: '392rpx',
									height: '218rpx',
									top: '100rpx',
									left: '20rpx',
									background: '#FFFFFF',
									position: "absolute"
								}
							},

							{
								type: 'text',
								text: '合计',
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '120rpx',
									left: '36rpx',
									color: '#999999'
								}
							},
							{
								type: 'text',
								text: '¥' + this.info.money,
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '120rpx',
									left: '151rpx',
									color: '#212121'
								}
							},
							{
								type: 'text',
								text: '所需工种',
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '168rpx',
									left: '36rpx',
									color: '#999999'
								}
							},
							{
								type: 'text',
								text: this.info.workerType,
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '168rpx',
									left: '151rpx',
									color: '#212121'
								}
							},
							{
								type: 'text',
								text: '上门时间',
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '215rpx',
									left: '36rpx',
									color: '#999999'
								}
							},
							{
								type: 'text',
								text: this.info.time,
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '215rpx',
									left: '151rpx',
									color: '#212121'
								}
							},
							{
								type: 'text',
								text: '上门地址',
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '260rpx',
									left: '36rpx',
									color: '#999999'
								}
							},
							{
								type: 'text',
								text: this.info.address,
								css: {
									fontSize: "24rpx",
									position: 'absolute',
									top: '260rpx',
									left: '151rpx',
									color: '#212121'
								}
							},
						]

					}
				}
				this.cardShow = true
			},
			hldsz(e) {
				uni.getImageInfo({
					src: e,
					success: (res) => {
						this.url = res.path
						console.log(res, 'res........');
						this.cardShow = false

					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.choseWorker {
		.bg {
			background-color: #fff;
			border-radius: 16rpx;
			padding: 28rpx;
			margin: 20rpx;
		}

		.code_box {
			height: 58vh;
			text-align: center;
			padding: 0 20rpx;
			font-size: 32rpx;
			color: #000000;

			.title {
				text-align: left;
				padding: 20rpx;

			}
		}

		.font {

			font-size: 24rpx;
			color: #999999;
		}

		.one {
			.top {
				border-bottom: 2rpx solid #E5E5E5;
				padding-bottom: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.center {
				padding: 30rpx 0;
				border-bottom: 2rpx solid #E5E5E5;

				.name {
					color: #666666;
					margin-top: 20rpx;
				}

				.money {
					color: #212121;
					font-size: 64rpx;
					margin: 10rpx 0;

					text {
						font-size: 32rpx;
					}
				}

				.bottom {
					margin-top: 70rpx;

					.btn-white {
						margin-right: 20rpx;
						height: 70rpx;
						line-height: 70rpx;
						background-color: #fff;
						color: #212121;
						border: 2rpx solid #212121;
					}

					.btn-green {
						margin-left: 20rpx;
						height: 72rpx;
						line-height: 72rpx;
						background-color: #05C754;
						color: #fff;
					}

					.btn-white,
					.btn-green {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 288rpx;
						border-radius: 11rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 500;
						font-size: 28rpx;
					}

				}
			}


		}

		.btn {
			font-size: 32rpx;
			background: $pageColor;
			border-radius: 8rpx;
			height: 88rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 88rpx;
			text-align: center;
			font-style: normal;
		}

		.two {
			.input-phone {
				padding: 20rpx;
				border: 2rpx solid #E5E5E5;
				border-radius: 10rpx;
				margin: 30rpx 0;
			}

		}

		.three {
			.top {
				margin-bottom: 20rpx;

				.title {
					font-size: 32rpx;
					color: #212121;
				}

				.search {
					width: 235rpx;
				}
			}

			.center {
				.box {
					border-top: 2rpx solid #E5E5E5;
					padding: 30rpx 0;

					.left {
						margin-left: 10rpx;

						.title {
							font-weight: 500;
							font-size: 32rpx;
							color: #212121;
						}

						.phone {
							font-size: 28rpx;
							color: #999999;
							margin-top: 10rpx;
						}

						.tip {
							margin-left: 10rpx;
							color: #3882F1;
							background: rgba(56, 130, 241, 0.08);
							border-radius: 8rpx;
							border: 1rpx solid #3882F1;
							padding: 4rpx 10rpx;
							font-size: 24rpx;
						}
					}


					.duanxin {
						border-radius: 8rpx;
						color: #fff;
						background-color: $pageColor;
						padding: 8rpx 10rpx;
						font-size: 28rpx
					}

				}
			}
		}
	}
</style>