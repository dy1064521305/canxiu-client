<template>
	<view class="myStore">
		<u-empty v-if="customerList.length==0" marginTop='200' text='暂未创建服务地址'
			icon="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/04/a97dc98813ee45d09e453e042c533a4e.png" />
		<view v-else class="boxs" v-for="(item,i) in customerList" :key="i">
			<view class="box_top">
				<view style="color: #A5A7A7;">
					门店编码：{{item.customerId}}
				</view>
				<view style="display: flex;margin-top:28rpx ;">
					<view style="display: flex;align-items:center">
						<image src="../../../static/logo.png"
							style="width: 86rpx;height: 86rpx;margin-right: 20rpx;border-radius: 10rpx;"></image>
					</view>
					<view>
						<view class="">
							{{item.storeName||'暂无名称'}}
						</view>
						<view style="font-size: 25rpx;color: #A5A7A7;margin-top: 14rpx;">
							{{item.storeType}}
						</view>
					</view>

				</view>

			</view>
			<view v-if="item.serviceAddress" class="box_main">
				<view class="">
					<text class="font" style="font-weight: bold;">{{item.serviceAddress.contact}}</text>
					<text class="font" style="margin:0 14rpx;">{{item.serviceAddress.phone}}</text>
				</view>
				<view style="font-size: 25rpx;color: #A5A7A7;margin: 22rpx 0;">
					{{item.serviceAddress.addressRegion.replace(/\//g, '')}}
				</view>
				<view style="font-size: 25rpx;color: #A5A7A7;display: flex;justify-content: space-between;">
					<view style="width: 88%;">
						{{item.serviceAddress.addressDetailed}}{{item.serviceAddress.doorplate}}
					</view>

				</view>
			</view>
			<view class="box_bottom">
				<view class="btn-white" @click="removeHandle(item.customerId)">
					移除
				</view>
				<view class="btn-green" @click="deleteAddress(item)">
					修改地址
				</view>
			</view>

		</view>
		<view v-if="customerList.length==0" class="bottom">
			<view class="btn" @click="$jump('/subpkg/center/myStore/addStore/addStore')">
				+添加门店
			</view>
		</view>

		
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getCustomerList,
		removeStore
	} from '@/api/store.js'
	export default {
		data() {
			return {
				customerList: [],
				customerId: ''
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList() {
				getCustomerList(storage.get('ClientId')).then(res => {
					this.customerList = res.data
				})
			},
		
			//删除地址
			removeHandle(id) {
				uni.showModal({
					title: '提示',
					content: '是否删除此门店？',
					confirmColor: '#A4D091',
					success:(res)=> {
						if (res.confirm) {
							removeStore({
								customerId: id,
								clientId: storage.get('ClientId')
							}).then(res => {
								uni.showToast({
									title: '移除成功',
									duration: 800
								});
								this.show=false,
								this.getList()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			
			},
			deleteAddress(item){
				let info={
					type:'edit',
					storeInfo:item
				}
				uni.navigateTo({
					url:'addStore/addStore?info='+encodeURIComponent(JSON.stringify(info))
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
	.myStore {
		.boxs {
			background: #FFFFFF;
			border-radius: 14rpx;
			margin: 20rpx;
			padding: 20rpx 30rpx;




			.box_main {
				background: #ECF7ED;
				border-radius: 7rpx;
				padding: 25rpx 32rpx;
				margin: 20rpx 0;

				.price {
					color: #A4D091;
				}

				.title {
					font-size: 25rpx;
					color: #A5A7A7;
					margin-top: 7rpx;
				}
			}

			.box_bottom {
				display: flex;
				justify-content: flex-end;

				.btn-white,
				.btn-green {
					padding: 11rpx 24rpx;
					font-size: 25rpx;
					border-radius: 11rpx;
					text-align: center;
				}

				.btn-white {
					background: #FFFFFF;
					border: 4rpx solid #A4D091;
					color: #A4D091;
					margin-right: 20rpx;
				}

				.btn-green {

					background: #A4D091;
					color: #fff;
				}
			}

		}

		.bottom {
			width: 100%;
			height: 151rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;

			.btn {
				width: 663rpx;
				height: 91rpx;
				background: #A4D091;
				border-radius: 45rpx;
				font-size: 36rpx;
				color: #FFFFFF;
				line-height: 91rpx;
				text-align: center;
				margin: 19rpx auto 0 auto;
			}
		}

	}
</style>