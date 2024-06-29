<template>
	<view class="myAddress">
		<z-paging ref="paging" v-model="addressList" @query="getList">
			<view v-for="(item,index) in addressList" :key='index' class="box">
				<view style="padding: 20rpx;" @click='choseAddress(item)'>
					<view class="top">
						<view class="">
							<text class="font" style="font-weight: bold;">{{item.contact}}</text>
							<text class="font" style="margin:0 14rpx;">{{item.phone}}</text>
							<text v-if="item.isDefault==0" class="moren_sign" >默认</text>
						</view>
						<image @click.stop="editAndAddAddress(item.addressId)"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/ad57c5f8079e459da0f85cfc0c9b818f.png"
							style="width: 29rpx;height:31rpx;"></image>
					</view>
					<view style="font-size: 25rpx;color: #A5A7A7;margin: 22rpx 0;">
						{{item.addressRegion.replace(/\//g, '')}}
					</view>
					<view style="font-size: 25rpx;color: #A5A7A7;display: flex;justify-content: space-between;">
						<view style="width: 88%;">
							{{item.addressDetailed}}
						</view>
						<view style="font-size: 25rpx;color: #EC5722;"
							@click.stop="deleteAddressHandle(item.addressId)">
							删除
						</view>
					</view>
					<!-- <view class="box_bottom"></view> -->
					<!-- 	<view style="width: 92%;">
							<view v-if="item.isDefault==0" class="moren">
								<image style="width: 32rpx;margin-right: 11rpx;height: 32rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
								</image>已设为默认
							</view>
							<view v-else class="un" @click.stop="morenHandle(item)">
								<view class="circle"></view>设为默认
							</view>
						</view> -->




				</view>
			</view>
			<view slot="bottom">
				<view class="btn" @click="editAndAddAddress('')">
					添加地址
				</view>
			</view>


		</z-paging>




	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getAddressList,
		deleteAddress,
		editAddress,
		editDefault
	} from "@/api/address.js"
	export default {
		data() {
			return {
				list: 1,
				addressList: [],
				type: '',
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					orderByColumn: 'isDefault',
					isAsc: 'asc',
				},
				submitList: []
			};
		},
		onShow() {
			this.getList(1, 10)
		},
		onLoad(option) {
			if (option.params != undefined) {
				console.log(option);
				console.log(JSON.parse(decodeURIComponent(option.params)));
				let info = JSON.parse(decodeURIComponent(option.params))
				this.type = info.type
				this.submitList = info.list
			}

		},
		methods: {
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				this.queryParams.clientId = storage.get('ClientId'),
					//查询是否有地址
					console.log(this.queryParams);
				getAddressList(this.queryParams).then(res => {
					console.log(res);
					if (res.rows.length != 0) {
						let bool = res.rows.some(item => {
							return item.isDefault == 0
						})
						console.log(bool);
						if (!bool) {
							res.rows[0].isDefault = 0
							editDefault(res.rows[0]).then(res => {
								this.getList(1, 10)
							})
						}
					}
					this.$refs.paging.completeByTotal(res.rows, res.total);
					//this.$refs.paging.complete(res.rows,res.total);
					//	this.addressList = res.rows
				})
			},
			//设为默认
			morenHandle(item) {
				console.log(item)
				this.addressList.forEach(address => {
					if (address.isDefault == 0) {
						address.isDefault = 1
						editDefault(address).then(res => {
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
			//修改地址
			editAndAddAddress(id) {
				console.log(111);
				uni.navigateTo({
					url: '../addAddress/addAddress?id=' + id,
					fail(res) {
						console.log(res);
					}
				})
			},
			//删除地址
			deleteAddressHandle(id) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '是否删除此地址？',
					confirmColor: '#A4D091',
					success: function(res) {
						if (res.confirm) {

							deleteAddress(id).then(res => {
								if (res.code === 200) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									that.$refs.paging.reload();

									uni.removeStorage({
										key: 'address_info',
										success: function(res) {}
									})
								}
								console.log(res);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//选择地址
			choseAddress(item) {
				console.log(this.type);
				if (this.type == 'car' || this.type == 'order') {
					uni.setStorage({
						key: 'address_info',
						data: item,
					})
					const pages = uni.$u.pages()

					console.log(this.submitList);
					// this.type == 'car' ?  : uni.navigateTo({
					// 	url: '../submitOrder/submitOrder?item='+encodeURIComponent(JSON.stringify(this.submitList))
					// })
					if (this.type === 'car') {
						uni.switchTab({
							url: '../../../pages/car/car'
						})
					} else {
						console.log(pages);
						pages[pages.length - 2].$vm.getInfo(this.submitList)
						uni.navigateBack()
					}
				}
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
		.box {
			margin: 20rpx auto;
			width: 707rpx;
			// height: 219rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
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
			.moren_sign{
				width: 87rpx;
				// height: 36rpx;
				border-radius: 7rpx;
				border: 1rpx solid #A4D091;
				font-size: 25rpx;
				color: #A4D091;
				text-align: center;
				display: inline-block;
			}

			.box_bottom {
				margin-top: 22rpx;
				border-top: 2rpx #F8F8F8 solid;
			}

			.moren {
				color: #A4D091;
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
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 91rpx;
			margin: 50rpx auto;
		}
	}
</style>