<template>
	<view class="invoice-info">
		<view class="top">
			<view class="title">
				发票总额
			</view>
			<view class="money">
				¥{{info.money}}
			</view>
		</view>
		<view style="margin-left: 20rpx;font-weight: 600;font-size: 33rpx;">
			发票总数{{info.list.length}}张
		</view>
		<view v-for="(item,index) in info.list" :key="index" class="box">
			<view class="">
				<text>发票内容</text>{{item.projectName}}
			</view>
			<view class="">
				<text>开票方</text>杭州餐修网络科技有限公司
			</view>
			<view class="">
				<text>发票金额</text>¥{{item.orderPrice}}
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
			console.log(this.info);
		},
	}
</script>

<style lang="scss" scoped>
	.invoice-info {
		.top {
			margin: 20rpx auto;
			width: 707rpx;
			height: 199rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.title {
				font-size: 25rpx;
				color: #3D3F3E;
				text-align: center;
				padding-top: 40rpx;
			}

			.money {
				font-size: 54rpx;
				font-weight: 600;
				color: #ED9446;
				text-align: center;
				margin-top: 20rpx;
			}
		}

		.box {
			width: 707rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
			margin: 10rpx 20rpx;
			padding:20rpx 30rpx;
			view{
				display: flex;
				margin: 20rpx 0;
				text{
					width: 27%;
					font-weight: 600;
				}
			}
		
		}
	}
</style>
