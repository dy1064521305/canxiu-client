<template>
	<view class="page">
		<view class="price">
			<view class="top acea-row row-between-wrapper">
				<view class="acea-row">
					<img :src="imgs" style="width: 40rpx;height: 40rpx;margin-right: 10rpx;">
					水龙头换把手 等<text style="color:#A4D091;">2</text>项
				</view>
				<view style="color:#1981F9;font-size: 24rpx;">
					订单详情 >
				</view>
			</view>
			<view class="con flex-colum-center">
				<view class="name">收入-订单工费</view>
				<view class="money"> <text>¥</text>200.33</view>
			</view>
		</view>
		<view class=" page-fangshi">
			<view style="margin: 0rpx 0 20rpx;">付款方式</view>
			<view class="page-fangshi-items acea-row row-middle row-between-wrapper" v-for="(item,index) in payList"
				:key="item.type" @click="checkAll(item,index)" :class="{on:item.check}">
				<view class="page-fangshi-items-left acea-row row-middle">
					<image :src="item.img" mode=""></image>
					<view class="acea-row" style="flex-direction: column;">
						<view class="">{{item.title}}</view>
					</view>
				</view>
				<view class="page-fangshi-items-right acea-row row-middle">
					<image v-if="!item.check" :src="item.img_no" mode=""></image>
					<image v-else :src="item.img_yes" mode=""></image>
				</view>
			</view>
		</view>
		<view class="page-btn" @click="sureInto">
			确认支付
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	const img_no = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/73f7603eb003465fa5198a7fb04cd22e.png'
	const img_yes = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/0533ff643a9b40acaa0fb32980d58842.png'
	export default {
		data() {
			return {
				payList: [{
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/f2a09d6a33454a948d9e0a49989ed3cb.png",
						type: "yue",
						title: "集团支付",
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
				payType: "",
			}
		},
		onLoad() {

		},
		methods: {
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
	.page {
		height: 100%;



		.price {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 20rpx;

			.top {
				border-bottom: 2rpx solid #E5E5E5;
				padding: 26rpx 24rpx;
			}

			.con {
				padding: 40rpx 0;

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
			}
		}

		&-fangshi {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 20rpx;
			padding: 20rpx;

			&-items {
				// background: #F5F5F5;
				border-radius: 16rpx;
				border: 1rpx solid #fff;
				padding: 20rpx 34rpx;
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
						width: 50rpx;
						height: 50rpx;
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
			margin: 300rpx 24rpx 0;
			border-radius: 10rpx;
		}

	}
</style>