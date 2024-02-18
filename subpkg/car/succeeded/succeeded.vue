<template>
	<view class="succeeded">
		<image class="succeeded-icon" src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/02/d9d1d5adc4ab4eafbda6e0af3daf6451.png" mode="widthFix"></image>
		<view style="font-size: 36rpx;color: #3D3F3E;font-weight: bold;margin-top: 22rpx;">
			预约成功
		</view>
		<view class="font" style="margin-top: 22rpx;">
			预计支付金额
		</view>
		<view style="font-size: 54rpx;color: #EA6F2F;margin-top: 11rpx;;font-weight: bold"  >
			¥{{info.money}}
		</view>
		<view v-for="(item,index) in info.time" :key="index" class="font" style="margin-top: 11rpx;">
			{{index}}预约服务时间：{{item}}
		</view>
		<view class="btns">
			<view class="btn-white" @click="backHome">
				回到首页
			</view>
			<view class="btn-green" @click="goDetailed">
				查看订单
			</view>
		
		</view>
	<!-- 	<view style="margin-top: 80rpx;">
			<image @click="backHome" class="watch" src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/02/4c18b6e3b5054a35b4a9af7a16fc744f.png" mode="widthFix"></image>
			<image @click="goDetailed" class="back" src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/02/bf2684db43f6419cae1dd0a2e75d0c51.png" mode="widthFix"></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
			};
		},
		onLoad(option) {
			console.log(this.info);
			console.log(JSON.parse(option.info));
			this.info=JSON.parse(option.info)
			console.log(this.info);
		},
		onBackPress(e){
			return true
		},
		onHide() {
			console.log('hidehide');
		},
		methods:{
			backHome(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			//查看订单
			goDetailed(){
				uni.switchTab({
					url:'/pages/order/order'
				})
				// uni.navigateTo({
				// 	url: '../../car/orderDetail/orderDetail?id=' + this.info.orderId
				// })
				console.log(this.info);
			}
		}
	}
</script>

<style>
	page{
		background: #F5F9FA;
	}
</style>

<style lang="scss" scoped>
.succeeded{
	width: 100%;
	margin:300rpx 0;
	text-align: center;
	.succeeded-icon{
		width: 284rpx;
	}
	.back,.watch{
		width: 337rpx;
		margin: 0 10rpx;
	}
	.font{
		font-size: 29rpx;
		color: #3D3F3E
	}
	.btns {
		margin: 20rpx 0;
		display: flex;
		width: 100%;
		justify-content: space-around;
	
		// image {
		// 	width: 337rpx;
		// 	height: 72rpx;
		// 	margin: 0 20rpx;
		// }
		.btn-white,
		.btn-green {
			height: 85rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 85rpx;
			font-size: 36rpx;
			width: 300rpx;
		}
	
		.btn-white {
			background: #FFFFFF;
			border: 4rpx solid #A4D091;
			color: #A4D091;
		}
	
		.btn-green {
			background: #A4D091;
			color: #fff;
		}
	}
}
</style>
