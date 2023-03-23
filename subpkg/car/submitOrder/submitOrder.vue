<template>
	<view class="page">
		<u-navbar placeholder @leftClick='leftClick' title="填写订单" placeholder>
	
		</u-navbar>
		<view class="address" :style="{'height':JSON.stringify(addressList)==='[]'?'130rpx':'250rpx'}" @click="myAddress">
			<view v-if='addressList.length!=0' class="left">
				<view style="font-size: 36rpx;color: #3D3F3E;font-weight: bold;">
					{{addressInfo.contact}}
				</view>
				<view style="font-size: 29rpx;color: #3D3F3E;margin-top: 18rpx;">
					{{addressInfo.phone}}
				</view>
				<view style="font-size: 25rpx;color: #A5A7A7;margin-top: 23rpx;">
					{{addressInfo.addressRegion}}{{addressInfo.addressDetailed}}
				</view>
			</view>
			<view v-else class="left" style="font-size: 36rpx;color: #A5A7A7;">
				请添加服务地址
			</view>
			<view class="right">
				<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
					mode=""></image>
			</view>
		</view>

		<view class="time" @click="isShow=true">
			<text style="font-size: 33rpx;color: #3D3F3E;font-weight: bold;">选择上门时间</text>
			<text
				style='width: 63%;text-align: end;margin-right: 22rpx;'>{{info.expectTime==undefined?'时间':info.expectTime}}</text>
			<image style="width: 14rpx;height: 25rpx;"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
				mode=""></image>
		</view>

		<view class="list">
			<proInfo :list="submitList" :isCar='true' :submit='false' @getCheck='getCheck'
				@getDeleteUrlList='getDeleteUrlList' />
		</view>

		<view class="bottom">

			<text style="font-size: 22rpx;color: #A5A7A7;margin-left:180rpx;">共{{submitList.length}}件 合计(不含材料):</text>
			<text style="font-size: 33rpx;color: #EC5722;margin:0 20rpx 0 10rpx;">¥{{info.orderPrice}}</text>
			<view class="btn" @click="submitOrder">提交订单</view>
		</view>


		<hTimeAlert title="选择上门时间" rangeStartTime="7:00:00" rangeEndTime="22:00:00" defaultTime="2020/3/29 18:00:00"
			intervalTime="60" dayStartIntTime="0" rangeDay="7" :isShow="isShow" :maskHide="maskHide"
			:rangeType="rangeType" :closeBtn="closeBtn" @closeAlert="handelClose">
		</hTimeAlert>

		<!-- 添加地址弹框 -->
		<u-modal width="450rpx" :show="showModal" confirmColor='#72DAA4' confirmText='立即填写' showCancelButton
			@cancel='showModal=false' title="新建服务地址" :content='content' @confirm="addAddress"></u-modal>
	</view>
</template>
<script>
	import storage from '@/utils/storage'
	import hTimeAlert from "@/components/h-time-alert/h-time-alert.vue"
	import proInfo from '@/components/proInfo/proInfo.vue'
	import formatter from '@/utils/formatter.js'
	import {
		getAddressList
	} from "@/api/address.js"
	import {
		postOrder
	} from '@/api/car.js'
	export default {
		name: 'test',
		components: {
			hTimeAlert,
			proInfo
		},
		mixins: [],
		props: {},
		data() {
			return {
				showModal: false,
				content: '您还没有服务地址，请先添加一个新的服务地址',
				allCheck: false,
				isShow: false,
				maskHide: false,
				closeBtn: true,
				rangeType: true,
				submitList: [],
				addressList: [], //地址列表
				addressInfo: {}, //地址信息
				info: {
					orderPrice:''
				},
				dateRange: ''
			};
		},
		onShow() {
			this.getList()

		},
		onLoad(option) {
		//	console.log(decodeURIComponent(option.item));
			this.submitList = JSON.parse(decodeURIComponent(option.item))
			console.log(JSON.parse(decodeURIComponent(option.item)));
			//console.log(this.submitList );
			// try {
			// 	const value = uni.getStorageSync('submit_order');
			// 	console.log(value);
			// 	//如果有本地数据就用本地的
			// 	if (value) {
			// 		this.submitList = value
			// 		console.log(value);
			// 	} else {
			// 		//如果没有本地的就获取option的值
			// 		console.log( JSON.parse(option.item));
			// 		this.submitList = JSON.parse(option.item)
			// 		console.log(this.submitList);
			// 		uni.setStorage({
			// 			key: 'submit_order',
			// 			data: this.submitList,
			// 		})
			// 	}
			// } catch (e) {
			// 	// error
			// }
			this.info.orderPrice = this.submitList.reduce((p, c) => p + (c.projectNumber * c.projectPrice), 0)
		},
		methods: {
			getList() {
				if (storage.get('ClientId')) {
					//查询是否有地址
					getAddressList({
						clientId: storage.get('ClientId')
					}).then(res => {
						console.log(res);
						this.addressList = res.rows
						this.showModal = this.addressList.length == 0
						try {
							const value = uni.getStorageSync('address_info');
							if (value) {
								this.addressInfo = value
								console.log(value);
							}else{
								this.addressList.forEach(item => {
									if (item.isDefault == 0) {
										this.addressInfo = item
										console.log(111, '118111111111111111111');
										uni.setStorage({
											key: 'address_info',
											data: item,
										})
									}
								})
							}
						} catch (e) {
							// error
						}

					})

				}

			},
			//计算总钱数
			getCheck(data) {
				console.log(data);
				console.log(this.submitList);
			   let id=data.item.id?data.item.id:data.item.projectId
			   console.log(id);
				this.info.orderPrice = this.submitList.reduce((p, c) => p + (((c.id?c.id:c.projectId) === id	? data.num.value : c.projectNumber) * Number(c.projectPrice)), 0)
					console.log(this.info.orderPrice );
			},
			//删除url
			getDeleteUrlList(data) {
				console.log(data);
				const pages = uni.$u.pages()
				pages[pages.length-2].$vm.changeData(data)
				uni.setStorage({
					key: 'submit_order',
					data: data,
				})
			},
			showMask() {
				this.isShow = true;
				console.log(this.isShow);
			},

			handelClose(data) {
				this.isShow = false;
				console.log(data);
				console.log(this.info.expectTime);
				this.info.expectTime = data._date
				this.info.isUrgent = data.isUrgent ? 1 : 0
				this.dateRange = data._dateRange
			},
			//下单
			submitOrder() {
				if (this.info.expectTime == undefined) {
					uni.showToast({
						title: '请选择上门时间',
						duration: 2000,
						icon: 'none'
					});
				} else {
					console.log(this.addressInfo);
					this.info.addressId = this.addressInfo.addressId
				//	this.info.orderTime =formatter.formatDateTime(new Date().toLocaleString())				
					this.info.clientId = storage.get('ClientId')
					this.info.expectTime = this.info.expectTime + ':00'
					console.log(this.submitList);
					console.log(this.info);
					let arr = JSON.parse(JSON.stringify(this.submitList))
					arr.forEach(item => {
						item.projectVideo = this.toStrings(item.projectVideo)
						item.projectImg = this.toStrings(item.projectImg)
						item.shoppingCartStatus = 1
					})
					console.log(arr);
					this.info.orderProjectBoList = arr
					console.log(this.info);
					postOrder(this.info).then(res => {
						console.log(res);
						if (res.code == 200) {
							uni.removeStorage({
								key:'address_info'
							})
							uni.removeStorage({
								key:'submit_order'
							})
							let info = {
								money: this.info.orderPrice,
								time: this.dateRange,
								orderId:res.data
							}
							console.log(info);
							uni.redirectTo({
								url: '../../../subpkg/car/succeeded/succeeded?info=' + JSON.stringify(info)
							})
						}
					})
				
				}




			},
			toStrings(item) {
				return item != [] ? item.toString() : ''
			},
			//去添加地址
			addAddress() {
				uni.setStorage({
					key: 'submit_order',
					data: this.submitList,
				})
				uni.navigateTo({
					url: '../../../subpkg/car/addAddress/addAddress'
				})
			},
			//查看我的地址
			myAddress() {
			 let params={
				 type:'order',
				 list:this.submitList
			 }
				uni.navigateTo({
					url: '../myAddress/myAddress?params='+encodeURIComponent(JSON.stringify(params))
				})
			},
			getInfo(data){
				console.log(data,'......257');
			},
			leftClick(){
				// uni.removeStorage({
				// 	key:'submit_order'
				// })
				const pages = uni.$u.pages();
				console.log(pages);
				pages.some(p=>p.route.includes('service')||p.route.includes('goodDetails'))?uni.navigateBack():uni.switchTab({
					url:'/pages/car/car'
				})
				
			}
			
		}
	};
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.page {
		.address {
			padding: 0 34rpx;
			width: 100%;
			//height: 286rpx;
			background: #fff;
			display: flex;

			.left {
				padding: 46rpx 0;
				display: flex;
				flex-direction: column;
				width: 78%;
			}

			.right {
				height: 100%;
				display: flex;
				align-items: center;
				width: 17%;

				image {
					width: 14rpx;
					height: 25rpx;
					margin-left: 96rpx;
				}
			}
		}



		.time {
			margin-top: 20rpx;
			padding: 0 25rpx;
			width: 100%;
			height: 103rpx;
			background: #fff;
			display: flex;
			align-items: center;
		}

		.list {
			margin-top: 20rpx;
			width: 100%;
			background-color: #fff;
		}

		.bottom {
			width: 100%;
			height: 91rpx;
			background: #fff;
			position: fixed;
			display: flex;
			align-items: center;
			padding: 10rpx 30rpx;

			bottom: 0;

			.btn {
				width: 199rpx;
				height: 69rpx;
				background: linear-gradient(90deg, #72DAA4 0%, #9FD6BA 100%);
				border-radius: 34rpx;
				font-size: 29rpx;
				color: #FFFFFF;
				line-height: 69rpx;
				text-align: center;
			}
		}
	}
</style>
