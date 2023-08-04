<template>
	<view class="box" @click="goDetailed(info)">
		<view class="img">
			<image :src="info.serviceImg" mode=""></image>
		</view>
		<view class="right">
			<view class="top">
				<view v-if="type!='coudan'" class="title blod">
					{{info.serviceName}}
				</view>
				<view v-if="type=='coudan'" class="title blod">
					{{info.serviceProductName}}
				</view>
				<view v-if="type!='coudan'" class="small">
					{{info.serviceTypeName}}
				</view>
			</view>
			<view class="bottom">
				<text style="width: 65%;display: inline-block;">
					<text v-if="type!='coudan'" style="color: #EC5722;display:inline-block;margin: 0 12rpx;" class="blod">¥{{info.servicePrice}}</text>
					<text v-if="type=='coudan'" style="color: #EC5722;font-size: 34rpx;margin-right: 20rpx;">¥{{info.discountPrice}}</text>
					<text v-if="type=='coudan'&&info.discountPrice!=info.projectPrice" style="font-size: 25rpx;text-decoration:line-through">¥{{info.projectPrice}}</text>
				</text>
				<!-- 		<text style="font-size: 22rpx;color: #A5A7A7;width: 52%;display: inline-block;">9999+人付款</text> -->
				<view v-if="type=='coudan'" >
					<u-icon name="plus-circle-fill" color="#78d9a7" size="27"></u-icon>
				</view>
				<text v-else class="btn">立即下单</text>
			
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
			//师傅是登录状态
			isLogin: {
				type: Boolean,
				default:true
			},
			type: {
				type: String
			},
			goodInfo:{
				type:Object
			}
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
					//	console.log(this.item);
					this.info = this.item
					this.info.serviceImg= this.item.serviceImg?this.item.serviceImg:this.item.serviceProjectImg
					if (this.info.serviceImg != null) {
						this.info.serviceImg = Array.isArray(this.info.serviceImg) ? this.info.serviceImg[0] : this
							.info.serviceImg.split(',')[0]
					}

				}
			}
		},
		created() {
			//console.log(this.item);
			this.info = this.item
				this.info.serviceImg= this.item.serviceImg?this.item.serviceImg:this.item.serviceProjectImg
			if (this.info.serviceImg != null) {
				this.info.serviceImg = Array.isArray(this.info.serviceImg) ? this.info.serviceImg[0] : this
					.info.serviceImg.split(',')[0]
			}


		},
		methods: {
			//详情
			goDetailed(itemm) {
				console.log(itemm);
				console.log(this.type);

				if (this.type == 'pro') {
					this.$emit('getCityNameEmit')
					uni.navigateTo({
						url: '../../subpkg/car/goodDetails/goodDetails?serviceId=' + itemm.serviceId,
						fail(res) {
							console.log(res);
						}
					})
				}else if(this.type == 'coudan'){
					console.log( itemm.productId);
					let info={
						serviceId:itemm.productId,
						goodInfo:this.goodInfo
					}
					uni.navigateTo({
						url: '/subpkg/car/coudanDetail/coudanDetail?info=' +encodeURIComponent(JSON.stringify(info)),
						fail(res) {
							console.log(res);
						}
					})
				}
				 else {
					uni.navigateTo({
						url: '../../../subpkg/car/goodDetails/goodDetails?serviceId=' + itemm.serviceId,
						fail(res) {
							console.log(res);
						}
					})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		//height: 217rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
		border-radius: 14rpx;
		margin-top: 20rpx;
		display: flex;

		.img {
			width: 30%;
			padding: 18rpx;
			image {
				width: 100%;
				height: 100%;
				//padding: 10rpx;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			padding: 10rpx;
			width: 70%;
			height: 161rpx;
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
				//display: inline;
				align-items: center;
				justify-content: space-between;
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
