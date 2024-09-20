<template>
	<view class="invoiceOrder">
		<view v-for="(item,index) in orderList" :key='index' class="box">
			<view class="box-main" style="height: 100%;">
				<view class="right">
					<view style="font-size: 25rpx;color: #3D3F3E;">
						<text>{{item.orderTime}}</text>
						<!-- 	<text class="weixiu">维修</text> -->
					</view>
					<view style="font-size: 29rpx;color: #3D3F3E;font-weight: bold;">
						{{item.projectName}}
					</view>
					<view style="display: flex;font-size: 25rpx;color: #3D3F3E;justify-content: space-between;">
						<view class="">
							订单号：{{item.orderNumber}}
						</view>
						<view style="font-size: 33rpx;color: #3D3F3E;font-weight: bold;">
							¥{{item.orderPrice}}
						</view>
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
				orderList: []
			};
		},
		onLoad(option) {
			this.orderList=JSON.parse(option.list)
		},
		methods: {


		}
	};
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.invoiceOrder {

		.box {
			margin: 20rpx auto;
			width: 707rpx;

			height: 178rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.box-main {
				display: flex;

				.right {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					padding: 10rpx 28rpx;

					view:first-child {

						text:nth-child(2) {
							right: 0;
							position: absolute;
							width: 76rpx;
							height: 40rpx;
							line-height: 40rpx;

							border-radius: 7px 0px 0px 7px;
							text-align: center;
							font-size: 22rpx;
							color: #383C45;
						}

						.weibao {

							background: #E6F1EB;
						}

						.weixiu {
							background: #E1E9FC;
						}
					}
				}
			}


		}




	}
</style>
