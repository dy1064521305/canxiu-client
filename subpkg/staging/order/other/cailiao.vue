<template>
	<view class="page">
		<view class="title" @click="flShow=!flShow">材料分类一级名称（件数）<text v-show="flShow"
				class="iconfont icon-xiajiantou"></text> <text v-show="!flShow"
				class="iconfont icon-shangjiantou"></text></view>
		<view class="list" v-show="flShow">
			<view class="items acea-row">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/07/901b7bd28cf448bf8adc0bb16104077f.png"
					mode=""></image>
				<view class="right flex-colum-between">
					<view class="right-name">材料名称</view>
					<view class="right-mess">材料规格信息</view>
					<view class="acea-row row-between-wrapper">材料单价x下单数量
						<view>小计：金额</view>
					</view>
				</view>
			</view>
		</view>
		<view class="title" @click="clShow=!clShow">通用材料（2）<text v-show="clShow"
				class="iconfont icon-xiajiantou"></text> <text v-show="!clShow"
				class="iconfont icon-shangjiantou"></text></view>
		<view class="list" v-show="clShow">
			<view class="items acea-row">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/07/901b7bd28cf448bf8adc0bb16104077f.png"
					mode=""></image>
				<view class="right flex-colum-between">
					<view class="right-name">材料名称</view>
					<view class="right-mess">材料规格信息</view>
					<view class="acea-row row-between-wrapper">材料单价x下单数量
						<view>小计：金额</view>
					</view>
				</view>
			</view>
			<view class="items acea-row">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/07/901b7bd28cf448bf8adc0bb16104077f.png"
					mode=""></image>
				<view class="right flex-colum-between">
					<view class="right-name">材料名称</view>
					<view class="right-mess">材料规格信息</view>
					<view class="acea-row row-between-wrapper">材料单价x下单数量
						<view>小计：金额</view>
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
				clShow: false,
				flShow: false
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

		.title {
			padding: 20rpx 0;
		}

		.list {
			background-color: #fff;
			border-radius: 16rpx;

			.items {
				padding: 24rpx;

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					margin-right: 24rpx;
				}

				.right {
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
			}
		}
	}
</style>