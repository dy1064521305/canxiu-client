<template>
	<view class="page">
		<view class="title" @click="flShow=!flShow">材料分类一级名称（件数）<text v-show="flShow"
				class="iconfont icon-xiajiantou"></text> <text v-show="!flShow"
				class="iconfont icon-shangjiantou"></text></view>
		<view class="list" v-show="flShow">
			<view class="items">
				<view class="acea-row">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/07/901b7bd28cf448bf8adc0bb16104077f.png"
						mode=""></image>
					<view class="right flex-colum-between">
						<view class="right-name  acea-row row-between-wrapper">材料名称
							<view style="font-size: 28rpx;"> <text style="font-size: 22rpx;">￥</text>19/盒</view>
						</view>
						<view class="right-mess acea-row row-between-wrapper">材料规格信息
							<text>x1</text>
						</view>
						<view class="acea-row row-right">
							<view> <text style="font-size: 22rpx;">￥</text>19</view>
						</view>
					</view>
				</view>
				<view class="items-other">
					<view class=""> <text>生产厂商：</text>其他 </view>
					<view class=""> <text>配件供应商：</text> 供应商名称</view>
				</view>
			</view>
		</view>
		<view class="title" @click="clShow=!clShow">通用材料（2）<text v-show="clShow"
				class="iconfont icon-xiajiantou"></text> <text v-show="!clShow"
				class="iconfont icon-shangjiantou"></text></view>
		<view class="list" v-show="clShow">
			<view class="items">
				<view class="acea-row">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/07/901b7bd28cf448bf8adc0bb16104077f.png"
						mode=""></image>
					<view class="right flex-colum-between">
						<view class="right-name  acea-row row-between-wrapper">材料名称
							<view style="font-size: 28rpx;"> <text style="font-size: 22rpx;">￥</text>19/盒</view>
						</view>
						<view class="right-mess acea-row row-between-wrapper">材料规格信息
							<text>x1</text>
						</view>
						<view class="acea-row row-right">
							<view> <text style="font-size: 22rpx;">￥</text>19</view>
						</view>
					</view>
				</view>
				<view class="items-other">
					<view class=""> <text>生产厂商：</text>其他 </view>
					<view class=""> <text>配件供应商：</text> 供应商名称</view>
				</view>
			</view>
			<view class="items">
				<view class="acea-row">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/07/901b7bd28cf448bf8adc0bb16104077f.png"
						mode=""></image>
					<view class="right flex-colum-between">
						<view class="right-name  acea-row row-between-wrapper">材料名称
							<view style="font-size: 28rpx;"> <text style="font-size: 22rpx;">￥</text>19/盒</view>
						</view>
						<view class="right-mess acea-row row-between-wrapper">材料规格信息
							<text>x1</text>
						</view>
						<view class="acea-row row-right">
							<view> <text style="font-size: 22rpx;">￥</text>19</view>
						</view>
					</view>
				</view>
				<view class="items-other">
					<view class=""> <text>生产厂商：</text>其他 </view>
					<view class=""> <text>配件供应商：</text> 供应商名称</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clShow: true,
				flShow: true
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
		padding: 0 30rpx;
		color: #212121;

		.title {
			padding: 20rpx 0;
		}

		.list {
			.items {
				border-radius: 16rpx;
				padding: 24rpx;
				margin-bottom: 20rpx;
				background-color: #fff;

				image {
					width: 130rpx;
					height: 130rpx;
					border-radius: 10rpx;
					margin-right: 24rpx;
				}

				.right {
					padding: 4rpx 0;
					flex: 1;
					font-size: 24rpx;

					&-name {
						font-size: 32rpx;
					}

					&-mess {
						font-size: 28rpx;
						color: #999999;
					}
				}

				&-other {
					border-top: 1rpx solid #f5f5f5;
					font-size: 24rpx;
					margin: 20rpx 0 0;
					padding: 12rpx 0 0 0;

					view {
						margin-top: 6px;
					}

					text {
						color: #999999;
					}
				}
			}
		}
	}
</style>