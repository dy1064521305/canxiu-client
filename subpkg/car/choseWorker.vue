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
					<view class="btn-white">
						<img src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/b950664504684bd887c3aacf3f63713e.png"
							style="width: 28rpx;height: 28rpx;margin-right: 10rpx;">
						当面扫码
					</view>
					<view class="btn-green">
						<img src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png"
							style="width: 32rpx;height: 26rpx;margin-right: 10rpx;">
						发送微信好友
					</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/388529faf0fe452580bf96f954c128f1.png',
				phone: '',
				search: ''

			};
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

		.two {
			.input-phone {
				padding: 20rpx;
				border: 2rpx solid #E5E5E5;
				border-radius: 10rpx;
				margin: 30rpx 0;
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
						padding:8rpx 10rpx ;
						font-size: 28rpx
					}

				}
			}
		}
	}
</style>