<template>
	<view class="invoice">
		<view class="create" @click="invoicable">
			<text style="font-size: 31rpx;color: #3D3F3E;font-weight: bold;margin-left: 20rpx;">我要开发票</text>
			<image style="width: 16rpx;height: 29rpx;margin-right: 20rpx;"
				src='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png'
				mode=""></image>
		</view>
		<view class="tool">
			<view style="font-size: 36rpx;color: #3D3F3E;font-weight: bold;margin: 22rpx;padding:15rpx 5rpx;">
				开票小工具
			</view>
			<view class="boxs">
				<view class="box" @click="into('title')">
					<view class='img'>
						<image style="width: 71rpx;" src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/19/983967ca14bc489ca3121af56a69f93d.png" mode="widthFix"></image>
					</view>
					<text>常用抬头</text>
				</view>
				<view class="box" @click="into('record')">
					<view class='img'>
						<image style="width: 61rpx;" src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/14/d4bf09fb6edc489791bc7e9d4f626460.png" mode="widthFix"></image>
					</view>
					<text>开票记录</text>
				</view>
				<view class="box">
					<view class='img'>
						<image style="width: 62rpx;" src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/14/e228771a125e448a8eb500fda7c4a68c.png" mode="widthFix"></image>
					</view>
					<text>开票帮助</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			into(type){
				switch (type){
					case 'title':
					uni.navigateTo({
						url:'../invoiceTitle/invoiceTitle'
					})
						break;
					case 'record':
					uni.navigateTo({
						url:'../invoiceRecord/invoiceRecord'
					})
						break;
				}
			},
			//开发票
			invoicable(){
				uni.navigateTo({
					url:'../Invoicable/Invoicable'
				})
			}
		}
	}
</script>


<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.invoice {
		padding: 20rpx;
	
	.create {
			height: 112rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.tool {
			margin-top: 20rpx;
			height: 241rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.boxs {
				display: flex;
				justify-content: space-evenly;
				.box {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 34rpx;
					font-size: 25rpx;
					.img {
						height: 60rpx;
						display: flex;
						align-items: center;
					}

					text {
						margin-top: 22rpx;
					}
				}
			}
		}
	}
</style>
