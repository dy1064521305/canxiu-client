<template>
	<view class="myAddress">
		<z-paging ref="paging" v-model="addressList" @query="getList">
			<view v-for="(item,index) in addressList" :key='index' class="box">
				<view style="padding: 20rpx;">
					<view class="top" @click='choseAddress(item)'>
						<text class="font" style="font-weight: bold;">{{item.contact}}</text>
						<text class="font" style="margin-left: 14rpx;">{{item.phone}}</text>
						<image @click.stop="editAndAddAddress(item.addressId)"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/ad57c5f8079e459da0f85cfc0c9b818f.png"
							mode="widthFix"></image>
					</view>
					<view style="font-size: 25rpx;color: #A5A7A7;margin: 22rpx 0;">
						{{item.addressRegion}}{{item.addressDetailed}}
					</view>
					<view class="line"></view>
					<view style="display: flex;margin-top: 22rpx;">
						<view style="width: 92%;">
							<view v-if="item.isDefault==0" class="moren">
								<image style="width: 32rpx;margin-right: 11rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png"
									mode="widthFix"></image>已设为默认
							</view>
							<view v-else class="un" @click="morenHandle(item)">
								<view class="circle"></view>设为默认
							</view>
						</view>
						<view style="font-size: 25rpx;color: #EC5722;" @click="deleteAddressHandle(item.addressId)">
							删除
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
				list: 1,
				addressList: [],
				type: '',
				queryParams:{
					pageSize:10,
					pageNum:1,
					orderByColumn: 'isDefault',
					isAsc: 'asc',
				},
				submitList:[]
			};
		},
		onShow() {
			this.getList(1,10)
		},
		onLoad(option) {
			if(option.params!=undefined){
					console.log(option);
			console.log(JSON.parse(decodeURIComponent(option.params)));
			let info=JSON.parse(decodeURIComponent(option.params))
			this.type = info.type
			this.submitList=info.list
			}
		
		},
		methods: {
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				this.queryParams.clientId=storage.get('ClientId'),
				//查询是否有地址
				console.log(this.queryParams);
				getAddressList(this.queryParams).then(res => {
					console.log(res);
						this.$refs.paging.completeByTotal(res.rows,res.total);
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
									this.getList(1,10)
								}
							})
						})
					}else{
						item.isDefault = 0
						editDefault(item).then(res => {
							if (res.code === 200) {
								uni.showToast({
									title: '设置成功',
									duration: 2000
								});
								this.getList(1,10)
							}
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
					confirmColor: '#9FD6BA',
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
					} else{
						console.log(pages);
						pages[pages.length-2].$vm.getInfo(this.submitList)
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
			height: 219rpx;
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

			.line {
				width: 663rpx;
				height: 2rpx;
				background: #F8F8F8;
				border-radius: 1rpx;
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
			margin: 50rpx auto;
		}
	}
</style>
