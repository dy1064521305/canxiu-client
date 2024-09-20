<template>
	<view class="record">
		<z-paging ref="paging" v-model="invoiceList" @query="getList">
			<view v-for="(item,index) in invoiceList" :key='index' class="box" @click="invoicingDetails(item)">
				<view class="font" style="padding-top: 22rpx;">
					<view style="font-size: 25rpx;color: #3D3F3E;">
						<text>{{item.requestTime}}</text>
					<!-- 	<text class="weixiu">维修</text> -->
					</view>
				</view>
			<!-- 	<view class="dianzi">
					电子发票
				</view> -->
				<view style="display: flex;justify-content:space-between;padding-top: 22rpx;">
					<text class="font">订单号：{{item.orderNumber}}</text>
					<text style="font-size: 33rpx;color: #3D3F3E;font-weight: bold;">¥{{item.invoiceAmount}}</text>
				</view>
				<view class="bottom">
					<view style="font-size: 25rpx;margin-top: 8rpx;">
						{{item.requestStatus==0?'待开票':'已开票'}}
					</view>
					<view class="btn">
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/9940bd87c7c44d208f95e48da89d55cb.png">
						</image>
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/984bf8d95036408d9aeea4cc3836ba2b.png">
						</image>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		getListInvoice
	} from '@/api/invoice.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				invoiceList:[],
				queryParams: {
					pageSize: 10,
					pageNum: 1,
				}
			};
		},
		methods: {
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				this.queryParams.clientId = storage.get('ClientId'),
					//查询是否有地址
					console.log(this.queryParams);
				getListInvoice(this.queryParams).then(res => {
					console.log(res);
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
			},
			//查看开票详情
			invoicingDetails(item){
				console.log(item);
				uni.navigateTo({
					url:'../invoicingDetails/invoicingDetails?id='+item.requestId
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

<style lang="scss">
	.record {
		.box {
			margin: 20rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
			border-radius: 14px;
			padding: 0 22rpx;
			position: relative;

			.font {
				font-size: 25rpx;
				color: #3D3F3E;

				view {

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

			.dianzi {
				margin-top: 15rpx;
				width: 115rpx;
				height: 41rpx;
				border-radius: 7rpx;
				border: 2rpx solid #3398F3;
				font-size: 22rpx;
				color: #3398F3;
				line-height: 41rpx;
				text-align: center;
			}

			.bottom {
				border-top: 2rpx solid #F8F8F8;
				;
				display: flex;
				justify-content: space-between;
				padding-top: 10rpx;
				margin-top: 10rpx;

				.btn {
					image {
						width: 190rpx;
						height: 54rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>
