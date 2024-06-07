<template>
	<view class="box" @click="goDetailed(info)">
		<view v-if="!info.serviceImg" class="no-img">
			<image style="width:110rpx ;height: 77rpx;"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
				mode=""></image>
			<text>暂无图片</text>
		</view>
		<view v-else class="img">
			<view :class="info.projectType==0?'weixiu':info.projectType==1?'baoyang':''">
				{{info.projectType==0?'维修':info.projectType==1?'维保':''}}
			</view>
			<image :src="info.serviceImg" mode=""></image>
		</view>
		<view class="right">
			<view class="top">
				<view class="title blod">
					{{info.serviceName}}
				</view>
				<!-- 		<view v-if="type=='coudan'" class="title blod">
					{{info.serviceProductName}}
				</view> -->
				<!-- <view class="small">
					{{info.serviceTypeName}}
				</view> -->

			</view>
			<view class="center" v-if="info.preferentialPrice!=null">
				<text>开城补贴</text><text>已补贴¥{{info.preferentialPrice}}</text>
			</view>
			<view class="bottom">
				<view class="bleft">
					<view style="margin-top: 10rpx;">
						<text style="color: #EC5722;display:inline-block;font-size: 21rpx;" class="blod">¥<text
								style="font-size: 40rpx;font-weight: bold;margin:0 7rpx;">{{info.discountPrice}}</text></text>
						<!-- 	<text v-if="info.preferentialPrice!=0"
							style="font-size: 21rpx;text-decoration:line-through;color: #A5A7A7;">¥{{info.servicePrice}}</text> -->
					</view>

					<!-- 	<view v-if="info.preferentialPrice!=0" class="price-info">
						<view style="position: absolute;
					top: -17rpx;
					left: 17rpx;">
							<u-icon name="arrow-up-fill" color="#A4D091" size="18"></u-icon>
						</view>
						<view class="bottom">

							<view class="one">

								品牌折扣价
							</view>
							<view class="two">
								已省¥{{info.preferentialPrice}}
							</view>
						</view>


					</view> -->
				</view>
				<view style="    display: flex;
    align-items: flex-end;">
					<text class="btn">立即下单</text>
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
			//师傅是登录状态
			isLogin: {
				type: Boolean,
				default: true
			},
			type: {
				type: String
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
					//	console.log(this.item);
					this.info = this.item
					this.info.serviceImg = this.item.serviceImg ? this.item.serviceImg : this.item.serviceProjectImg
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
			this.info.serviceImg = this.item.serviceImg ? this.item.serviceImg : this.item.serviceProjectImg
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
				} else if (this.type == 'coudan') {
					console.log(itemm.productId);
					let info = {
						serviceId: itemm.productId,
						goodInfo: this.goodInfo
					}
					uni.navigateTo({
						url: '/subpkg/car/coudanDetail/coudanDetail?info=' + encodeURIComponent(JSON.stringify(
							info)),
						fail(res) {
							console.log(res);
						}
					})
				} else {
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



		.no-img {
			width: 181rpx;
			height: 181rpx;
			background: #F4F4F4;
			border-radius: 11rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin: 18rpx;

			text {
				font-size: 22rpx;
				color: #A4D091;
			}
		}

		.img {
			width: 181rpx;
			height: 181rpx;
			padding: 18rpx;
			position: relative;

			.weixiu,
			.baoyang {
				width: 65rpx;
				height: 36rpx;
				background: #E1E9FC;
				border-radius: 0rpx 7rpx 7rpx 0rpx;
				font-size: 22rpx;
				color: #383C45;
				line-height: 36rpx;
				text-align: center;
				position: absolute;
				top: 37rpx;
			}

			.weixiu {
				background: #E1E9FC;
			}

			.baoyang {
				background: #E6F1EB;
			}

			image {
				width: 100%;
				height: 100%;

				border-radius: 11rpx;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			padding: 21rpx 21rpx 21rpx 0;
			width: 70%;

			// height: 161rpx;
			justify-content: space-between ;
			.top {
				// height: 68%;

				.title {
					font-size: 29rpx;
					color: #3D3F3E;
					font-weight: bold;
				}

				.small {
					font-size: 22rpx;
					margin-top: 8rpx;
					color: #A5A7A7;
				}
			}

			.center {
				text {
					border-radius: 10rpx;
					padding: 10rpx 20rpx;
					font-size: 24rpx;
				}

				text:first-child {
					background-color: #ed5724;
					color: #ffeee8;
				}

				text:nth-child(2) {
					background-color: #ffeee8;
					color: #ed5724;
					margin-left: 10rpx;
				}
			}

			// .bottom {
			// 	display: flex;
			// 	height: 30%;
			// 	//display: inline;
			// 	align-items: center;
			// 	justify-content: space-between;


			// }
			.bottom {
				display: flex;
				justify-content: space-between;

				.price-info {
					position: relative;
					margin-top: 10rpx;

					.bottom {
						display: flex;

						.one,
						.two {
							padding: 2rpx 15rpx;
							font-size: 18rpx;
						}

						.one {

							background-color: #A4D091;
							color: #fff;
							z-index: 1;
						}

						.two {
							color: #A5A7A7;
							border: 2rpx solid #A4D091;
						}
					}

				}

				.btn {
					display: inline-block;
					width: 163rpx;
					height: 54rpx;
					background: #A4D091;
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