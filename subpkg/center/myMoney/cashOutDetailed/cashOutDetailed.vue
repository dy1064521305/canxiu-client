<template>
	<view class="cashOutDetailed">
		<view class="titles-box">
			<text v-for="(item,index) in title" :key="index">{{item}}</text>
		</view>
		<view v-for="item in 2" class="main" style="border-bottom: 2rpx solid  #F8F8F8;">
			<text style="width: 23%;font-size: 25rpx;color: #A5A7A7;text-align: center;">2022-11-15 22:25:12</text>
			<text>¥1000.00</text>
			<text>¥1000.00</text>
			<text>提现中</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ['申请时间', '提现金额', '手续费', '状态']
			};
		}
	}
</script>

<style lang="scss" scoped>
	.cashOutDetailed {

		.titles-box{
			display: flex;
			justify-content: space-evenly;
			font-size: 31rpx;
			color: #3D3F3E;
			font-weight: bold;
			background: #fff;
			padding: 20rpx;
		}
		.main{
			display: flex;
			justify-content: space-evenly;
			background-color: #fff;
			padding:30rpx 20rpx;
		}
	}
</style>
