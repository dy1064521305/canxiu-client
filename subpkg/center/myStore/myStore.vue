<template>
	<view class="myStore">
		<u-empty marginTop='200' text='暂未创建服务地址'
			icon="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/04/a97dc98813ee45d09e453e042c533a4e.png" />
			<view class="bottom">
				<view class="btn" @click="$jump('/subpkg/center/myStore/addStore/addStore')">
					+添加门店
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>




<style>
	page {
		background: #F5F9FA;
	}
</style>

<style lang="scss">
	.myStore {

		.bottom {
			width: 100%;
			height: 151rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			.btn {
				width: 663rpx;
				height: 91rpx;
				background: #A4D091;
				border-radius: 45rpx;
				font-size: 36rpx;
				color: #FFFFFF;
				line-height: 91rpx;
				text-align: center;
				margin: 19rpx auto 0 auto;
			}
		}

	}
</style>