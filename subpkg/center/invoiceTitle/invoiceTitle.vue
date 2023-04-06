<template>
	<view class="myAddress">

		<z-paging ref="paging" v-model="invoiceHeaderList" @query="getList">
			<view v-for="(item,index) in invoiceHeaderList" :key='index' class="box">
				<view style="padding: 20rpx;">
					<view class="top">
						<view class="font" style="font-weight: bold;">{{item.headerName}}</view>
						<view @click="addAndEditInvoice(item.headerId)">
							<image style="width: 14rpx;height: 25rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
								mode=""></image>
						</view>
					</view>
					<view style="margin-top: 20rpx;">
						<view>
							<view v-if="item.isDefault==0" class="moren">
								<image style="width: 32rpx;margin-right: 11rpx;height: 32rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png"
									></image>已设为默认抬头
							</view>
							<view v-else class="un" @click="morenHandle(item)">
								<view class="circle"></view>设为默认抬头
							</view>
						</view>

					</view>


				</view>
			</view>

			<view slot="bottom">
				<view class="btn" @click="addAndEditInvoice('')">
					添加抬头
				</view>
			</view>
		</z-paging>



	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getInvoiceHeaderList,
		editDefault
	} from '@/api/invoice.js'
	export default {
		data() {
			return {
				moren: 0,
				list: 3,
				invoiceHeaderList: [],
				queryParams: {
					orderByColumn: 'isDefault',
					isAsc: 'asc',
					pageSize: 10,
					pageNum: 1
				}
			};
		},
		methods: {
			//设为默认
			morenHandle(item) {
				console.log(item)
				console.log(this.invoiceHeaderList);
				console.log(1111);
				this.invoiceHeaderList.forEach(invoice => {
					if (invoice.isDefault == 0) {
						invoice.isDefault = 1
						editDefault(invoice).then(res => {
							item.isDefault = 0
							editDefault(item).then(res => {
								if (res.code === 200) {
									uni.showToast({
										title: '设置成功',
										duration: 2000
									});
									this.getList(1, 10)
								}
							})
						})
					}
				
				})


			},
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				this.queryParams.clientId = storage.get('ClientId'),
					getInvoiceHeaderList(this.queryParams).then(res => {
						console.log(res);
						this.$refs.paging.completeByTotal(res.rows, res.total);
					})
			},
			//修改抬头
			addAndEditInvoice(id) {
				console.log(111);
				uni.navigateTo({
					url: '../addAndEditInvoice/addAndEditInvoice?id=' + id,
					fail(res) {
						console.log(res);
					}
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
	.myAddress {
		padding-bottom: 10rpx;

		.box {
			margin: 20rpx auto;
			width: 707rpx;
			height: 128rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.top {
				.font {
					font-size: 29rpx;
					color: #3D3F3E;
				}

				image {
					width: 29rpx;
					float: right;
				}
			}

			.un,
			.moren {
				display: flex;
				font-size: 25rpx;
			}



			.moren {
				color: #9FD6BA;
			}

			.un {

				color: #A5A7A7;

				.circle {
					width: 29rpx;
					height: 29rpx;
					border: 1px solid #D8DCDB;
					border-radius: 50%;
					margin-right: 11rpx;
				}
			}

		}

		.btn {
			width: 663rpx;
			height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 91rpx;
			margin: 40rpx auto;

		}
	}
</style>
