<template>
	<view class="page">
		<view class="content">
			<view class="content-top">
				<view class="">夜间施工费</view>
				<text style="color: #999999;">师傅夜间（22:00后）上门维修</text>
			</view>
			<view class="content-bottom">
				<view class="acea-row row-between-wrapper">
					<text>单价：<text style="font-size: 20rpx;">￥</text> 123</text>
					<text>x1</text>
				</view>
				<view class="acea-row row-right row-bottom" style="margin-top: 10rpx;">
					<text style="color: #FD5834; font-size: 30rpx;"> <text style="font-size: 20rpx;">￥</text>
						123</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="content-top">
				<view class="">夜间施工费</view>
				<text style="color: #999999;">师傅夜间（22:00后）上门维修</text>
			</view>
			<view class="content-bottom">
				<view class="acea-row row-between-wrapper">
					<text>单价：<text style="font-size: 20rpx;">￥</text> 123</text>
					<text>x1</text>
				</view>
				<view class="acea-row row-right row-bottom" style="margin-top: 10rpx;">
					<text style="color: #FD5834; font-size: 30rpx;"> <text style="font-size: 20rpx;">￥</text>
						123</text>
				</view>
			</view>
		</view>
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
	.page {
		height: 100%;
		padding: 24rpx;
		font-size: 24rpx;

		.content {
			border-radius: 18rpx;
			background-color: #fff;
			margin-bottom: 24rpx;

			&-top {
				padding: 24rpx;

				view {
					font-size: 28rpx;
					margin-bottom: 6rpx;
				}
			}

			&-bottom {
				border-top: 1rpx solid #f5f5f5;
				padding: 20rpx 24rpx;
			}
		}
	}
</style>