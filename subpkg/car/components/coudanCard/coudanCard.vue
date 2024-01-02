<template>
	<view class="coudan" @click="goDetailed(info)">
		<view class="no-img">
			<image v-if="info.serviceImg!=null" style="border-radius: 10rpx;width: 100%;height: 100%;"
				:src="info.serviceImg[0]">

			</image>
			<view v-else class="imgs">
				<image style="width:98rpx ;height: 68rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
					mode=""></image>
				<text>暂无图片</text>
			</view>

		</view>
		<view class="right">
			<view style="font-size: 29rpx;color: #3D3F3E;font-weight: bold;">{{info.serviceProductName}}</view>
			<view style="display: flex;align-items: end;    justify-content: space-between;">
				<view>
					<text style="color: #EC5722;font-size: 34rpx;font-weight: bold;"
						class="blod">¥{{info.discountPrice}}</text>
					<text style="font-size: 22rpx;color: #A5A7A7;"><text
							style="text-decoration:line-through;margin: 0 14rpx 0 4rpx;">¥{{info.projectPrice}}</text>工时:{{info.serviceTime}}小时</text>

				</view>
				<view style="display: flex;">
					<image style="width: 47rpx;height: 47rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/29/0a5ac4868e59476a841738d8c5ce532e.png"
						mode=""></image>
				</view>

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
		
		},
		data() {
			return {
				info: {}
			};
		},
		watch: {
			item: {
				//	immediate: true,
				handler: function() {
					this.info = this.item
					this.info.serviceImg = this.item.serviceProjectImg
					if (this.info.serviceImg != null) {
						this.info.serviceImg = this.info.serviceImg.split(',')
					}

				}
			}
		},
		created() {
			this.info = this.item
			this.info.serviceImg = this.item.serviceProjectImg
			if (this.info.serviceImg != null) {
				this.info.serviceImg = this.info.serviceImg.split(',')
			}

		},
		methods: {
			goDetailed() {
			
				uni.navigateTo({
					url: '/subpkg/car/coudanDetail/coudanDetail?serviceId=' + this.info.productId,
					fail(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.coudan {
		display: flex;
		padding: 28rpx;

		.no-img {
			width: 130rpx;
			height: 130rpx;
			border-radius: 11rpx;

			.imgs {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100%;
				background: #F4F4F4;

				text {
					font-size: 21rpx;
					color: #A4D091;
				}
			}


		}

		.right {
			display: flex;
			flex: 1;
			margin-left: 14rpx;
			flex-direction: column;
			justify-content: space-between;
		}

	}
</style>