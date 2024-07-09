<template>
	<view class="myAddress">
		<z-paging ref="paging" v-model="addressList" @query="getList">
			<view v-for="(item,index) in addressList" :key='index' class="box">
				<view style="padding: 20rpx;" @click='choseAddress(item)'>
					<view class="top">
						<view class="">
							<text class="font" style="font-weight: bold;">{{item.contact}}</text>
							<text class="font" style="margin:0 14rpx;">{{item.phone}}</text>
							<text v-if="item.isDefault==0" class="moren_sign">默认</text>
						</view>

						<image v-if="type!='store'" @click.stop="editAndAddAddress(item.id)"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/ad57c5f8079e459da0f85cfc0c9b818f.png"
							style="width: 29rpx;height:31rpx;"></image>
					</view>
					<view style="font-size: 25rpx;color: #A5A7A7;margin: 22rpx 0;display: flex;
    justify-content: space-between;">
						{{item.addressRegion.replace(/\//g, '')}}
						<view v-if="type=='store'">
							<view v-if="item.id!=storeAddressInfo.id" class="check"></view>
							<view v-else>

								<u-icon name="checkmark-circle-fill" color="#A4D091" size="20"></u-icon>
							</view>

						</view>
					</view>
					<view style="font-size: 25rpx;color: #A5A7A7;display: flex;justify-content: space-between;">
						<view style="width: 88%;">
							{{item.addressDetailed}}{{item.doorplate}}
						</view>
						<view v-if="type!='store'&&type!='order'" style="font-size: 25rpx;color: #EC5722;"
							@click.stop="deleteAddressHandle(item.id)">
							删除
						</view>
					</view>
				</view>
			</view>

			<view v-if="type=='store'&&storeAddressInfo.contact!=''">
				<view class="title">
					已被关联的服务地址
				</view>
				<view class="box">
					<view style="padding: 20rpx">
						<view class="top">
							<view class="">
								<text class="font" style="font-weight: bold;">{{storeAddressInfo.contact}}</text>
								<text class="font" style="margin:0 14rpx;">{{storeAddressInfo.phone}}</text>
								<text v-if="storeAddressInfo.isDefault&&storeAddressInfo.isDefault==0"
									class="moren_sign">默认</text>
							</view>
							<view class="circle"></view>
						</view>
						<view style="font-size: 25rpx;color: #A5A7A7;margin: 22rpx 0;">
							{{storeAddressInfo.addressRegion.replace(/\//g, '')}}
						</view>
						<view style="font-size: 25rpx;color: #A5A7A7;display: flex;justify-content: space-between;">
							<view style="width: 88%;">
								{{storeAddressInfo.addressDetailed}}{{storeAddressInfo.doorplate}}
							</view>

						</view>
					</view>
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
				radiovalue1: '',
				list: 1,
				addressList: [],
				type: '',
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					orderByColumn: 'isDefault',
					isAsc: 'asc',
				},
				submitList: [],
				storeAddressInfo: {
					addressDetailed: '',
					addressRegion: '',
					isDefault: '',
					phone: '',
					contact: '',
				}
			};
		},
		onShow() {
			this.getList(1, 10)
		},
		onLoad(option) {
			if (option.params != undefined) {
				console.log(option);
				uni.setNavigationBarTitle({
					title: this.type == 'store' ? '选择服务地址' : '地址管理'
				})
				console.log(JSON.parse(decodeURIComponent(option.params)));
				let info = JSON.parse(decodeURIComponent(option.params))
				this.type = info.type
				this.submitList = info.list
				if (this.type == 'store') {
					JSON.stringify(info.addressInfo) != '{}' ? this.storeAddressInfo = info.addressInfo : ''
				}



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

					this.$refs.paging.completeByTotal(res.rows, res.total);
					//this.$refs.paging.complete(res.rows,res.total);
					//	this.addressList = res.rows
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
				const pages = uni.$u.pages()
				if (this.type == 'car' || this.type == 'order') {
					uni.setStorage({
						key: 'address_info',
						data: item,
					})
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
				} else if (this.type == 'store') {
					this.storeAddressInfo = item
					pages[pages.length - 2].$vm.getInfo(item)
					uni.navigateBack()
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
		.title {
			font-size: 25rpx;
			color: #A5A7A7;
			margin-left: 20rpx;
		}

		.box {
			margin: 20rpx auto;
			width: 707rpx;
			// height: 219rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.check {
				width: 28rpx;
				height: 28rpx;
				border: 2rpx solid #A5A7A7;
				border-radius: 50%;
			}

			.circle {
				width: 29rpx;
				height: 29rpx;
				background: #ECF7ED;
				border: 1rpx solid #A4D091;
				border-radius: 50%;
			}

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

			.moren_sign {
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