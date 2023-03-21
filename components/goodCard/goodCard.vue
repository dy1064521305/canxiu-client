<template>
	<view class="box"  @click="goDetailed(info)">
		<view class="img">
			<image :src="info.serviceImg" mode=""></image>
		</view>
		<view class="right">
			<view class="top">
				<view class="title blod">
					{{info.serviceName}}
				</view>
				<view class="small">
					{{info.serviceTypeName}}
				</view>
			</view>
			<view class="bottom">
				<text style="color: #EC5722;width: 65%;display: inline-block;">
					<text style="font-size: 22rpx;">¥</text>
					<text style="display:inline-block;margin: 0 12rpx;" class="blod">{{info.servicePrice}}</text>
				</text>
		<!-- 		<text style="font-size: 22rpx;color: #A5A7A7;width: 52%;display: inline-block;">9999+人付款</text> -->
				<text class="btn">立即下单</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			},
			isLogin:{
				type:Boolean
			},
			type:{
				type:String
			}
		},
		data() {
			return {
					info:{}
			};
		},
		created() {
			this.info=this.item
			if(this.info.serviceImg!=null){
				this.info.serviceImg=Array.isArray(info.serviceImg)?info.serviceImg[0]:info.serviceImg.split(',')[0]
			}
			
		},
		methods: {
			//详情
			goDetailed(itemm) {
				console.log(itemm);
				console.log(this.type);
				this.type=='pro'?uni.navigateTo({
					url: '../../subpkg/car/goodDetails/goodDetails?serviceId=' + itemm.serviceId,
					fail(res) {
						console.log(res);
					}
				}):uni.navigateTo({
					url: '../../../subpkg/car/goodDetails/goodDetails?serviceId=' + itemm.serviceId,
					fail(res) {
						console.log(res);
					}
				})
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		height: 217rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
		border-radius: 14rpx;
		margin-top: 20rpx;
		display: flex;

		.img {
			width: 30%;

			image {
				width: 90%;
				height: 90%;
				padding: 10rpx;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			padding: 10rpx;
			width: 70%;

			.top {
				height: 68%;

				.title {
					font-size: 29rpx;
					color: #3D3F3E;
				}

				.small {
					font-size: 22rpx;
					margin-top: 8rpx;
					color: #A5A7A7;
				}
			}

			.bottom {
				display: flex;
				height: 30%;
				display: inline;

				.btn {
					display: inline-block;
					width: 163rpx;
					height: 54rpx;
					background: linear-gradient(90deg, #72DAA4 0%, #9FD6BA 100%);
					border-radius: 27rpx;
					color: #FFFFFF;
					font-size: 25rpx;
					text-align: center;
					line-height: 54rpx;
				}
			}
		}
	}
</style>
