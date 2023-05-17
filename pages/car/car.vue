<template>
	<view class="page">
		<!-- 未登录 -->
		<view v-if="!isLogin" style="padding-top: 330rpx;">
			<u-empty mode="permission"
				icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/04/99b6e40d11194c5bae53b199773db5b6.png"
				text="您还未登录">
			</u-empty>
			<view class="btns">
				<view @click="quxiao">
					取消
				</view>
				<view @click="login">
					去登录
				</view>
			</view>
		</view>


		<view v-else>
			<!-- 	<z-paging ref="paging" v-model="dataList" @query="queryList">
				<view slot="top">
			
				</view>

			</z-paging> -->
			<u-navbar title="维修车" placeholder :safeAreaInsetTop="true" :autoBack='false'>
				<view class="u-nav-slot" slot="right">
					<image v-if="dataList.length!=0" @click='isDelete=!isDelete'
						:style="{'margin-right':menuButtonInfoWidth+'rpx','width': '29rpx','height': '29rpx','padding-left': '10rpx'}"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/77aa4cd356c141118bd73c3bfc162be9.png"
						mode=""></image>
					<view v-if="dataList.length!=0" @click='isDelete=!isDelete'
						:style="{'margin-top':'-10rpx','font-size': '22rpx','color': '#3D3F3E','padding-right': '15rpx','margin-right':menuButtonInfoWidth+'rpx'}">
						{{isDelete?'取消':'管理'}}
					</view>
				</view>

			</u-navbar>
			<view class="address" @click="myAddress"
				:style="{'height':JSON.stringify(addressList)==='[]'?'130rpx':'200rpx'}">
				<view class="left" v-if="addressList.length!=0">
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
				<view v-else class="left" style="font-size: 36rpx;color: #A5A7A7;margin-top: 20rpx;">
					请添加服务地址
				</view>
				<view class="right">
					<image
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
						mode=""></image>
				</view>
			</view>



			<view class="list">
				<view style="background-color: #fff;margin-bottom: 20rpx;" v-for="(item,index) in dataList"
					:key="index">
					<view style="padding: 20rpx;font-weight: bold;color: #3D3F3E;">
						工种：{{item.workerType}}
					</view>
					<proInfo :list="item.children" :isCar='true' :isDelete='isDelete' @getCarList='getCarList'
						@getCheck='getCheck' @check_change="checkChange" @deleteCarList="deleteList"
						@getDeleteUrlList='getDeleteUrlList' @textareaInput='textareaInput' />
				</view>

				<u-empty v-if="dataList.length==0" mode="car"
					icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/04/125e056702434056b9b3bc5f7768eb0a.png"
					text='维修车为空' marginTop='100' width="210px">
				</u-empty>

			</view>


			<view v-if="dataList.length!=0" class="bottom" :style="{bottom:(tabbarHeight*2-10)+'rpx'}">
				<view v-if="checkedList.length !== allNum||checkedList.length==0" class="check"
					@click="allCheckHandle(true)">

				</view>
				<view v-if="checkedList.length === allNum&&checkedList.length!=0" @click="allCheckHandle(false)">
					<image style="width: 43rpx;height: 43rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png">
					</image>
				</view>
				<text style="font-size: 29rpx;color: #3D3F3E;">全选</text>
				<view style="width: 53%;text-align: end;">
					<text style="font-size: 22rpx;color: #A5A7A7;">合计(不含材料):</text>
					<text
						style="font-size: 33rpx;color: #EC5722;margin:0 10rpx 0 10rpx;width:14%;">¥{{totalMoney.toFixed(0)}}</text>
				</view>
				<view v-if='isDelete' style="background: #EC5722;" class="btn" @click="deleteHandle">
					删除所选({{checkedList.length}})
				</view>
				<view v-else class="btn" style="background: linear-gradient(90deg, #72DAA4 0%, #9FD6BA 100%);"
					@click="submitOrder">去下单({{checkedList.length}})</view>
			</view>
		</view>
		<view style="height:100rpx;">
		</view>


	</view>
</template>
<script>
	import storage from '@/utils/storage'
	import proInfo from '@/components/proInfo/proInfo.vue'
	import * as car from '@/api/car.js'
	import {
		getCarNum
	} from '@/utils/api.js'
	import {
		getAddressList
	} from "@/api/address.js"
	export default {
		name: 'test',
		components: {
			proInfo
		},
		mixins: [],
		props: {},
		data() {
			return {
				allCheck: false, //全选
				isShow: false,
				maskHide: false,
				closeBtn: true,
				rangeType: true,
				tabbarHeight: 0,
				addressList: [], //地址列表
				totalMoney: 0, //总钱数
				addressInfo: {}, //地址信息
				dataList: [], //维修车列表
				isDelete: false, //是否是删除
				allNum: 0, //所有的数据量
				checkedList: [],
				menuButtonInfoWidth: 0,
				isLogin: false,
			};
		},
		onReady() {
			//获取小程序胶囊位置
			// #ifdef MP-WEIXIN
			this.menuButtonInfoWidth = uni.getMenuButtonBoundingClientRect().width + 80
			// #endif

		},
		onLoad(option) {
			console.log(option);
			if (option.type == 'goCar' && storage.get('AccessToken')) {
				this.getCarList()
				this.allNum = 0
				this.checkedList = []
			}
		},
		onShow() {

			// #ifdef APP-PLUS
			this.tabbarHeight = uni.getSystemInfoSync().windowBottom
			console.log();
			// #endif
			// #ifdef H5
			this.tabbarHeight = uni.getSystemInfoSync().windowBottom
			console.log(uni.getSystemInfoSync().windowBottom);
			// #endif	
			this.getList()
			this.isLogin = storage.get('AccessToken')
			getCarNum().then(res => {
				uni.setTabBarBadge({
					index: 2,
					text: res
				})
			})
		},
		onTabItemTap: function(item) {

			if (storage.get('AccessToken')) {
				this.getCarList()
				this.allNum = 0
				this.checkedList = []
			}
		},
		methods: {

			getDeleteUrlList(data) {
				this.dataList.forEach((fu, index) => {
					fu.children.forEach((son, ind) => {
						data.forEach(d => {
							if (d.id === son.id) {
								this.$set(this.dataList[index].children, ind, d)
							}
						})
					})
				})

				console.log(this.dataList, '....185', data);
			},
			//其他页面改变数据
			changeData(data) {
				console.log(data[0]);
				this.dataList.forEach((fu, index) => {
					fu.children.forEach((son, ind) => {
						data.forEach(d => {
							if (son.id == d.id) {
								this.$set(this.dataList[index].children, ind, d)
								console.log(this.dataList, '....182');
							}
						})
					})
				})
				console.log(this.dataList, '....186');
				this.$nextTick(() => {
					this.checkedList = this.dataList.map(c => c.children.filter(c1 => c1.checked)).flatMap(c2 =>
						c2)
					this.allNum = this.dataList.reduce((p, c) => p + c.children.length, 0)
					this.totalMoney = this.checkedList.reduce((p, c) => p + (c.projectNumber * c.projectPrice), 0)
				})
			},
			//单个复选框勾选或不勾选事件回调
			checkChange(data) {
				console.log(data, 'datadata');
				let index = this.checkedList.findIndex(c => c.id === data.item.id)
				if (data.value) {
					index < 0 && this.checkedList.push(data.item)
				} else {
					this.checkedList.splice(index, 1)
				}
				console.log(this.dataList, 'this.dataListthis.dataList');
				this.dataList.forEach(ele1 => {
					ele1.children.forEach(ele2 => {

						if (ele2.id === data.item.id) {
							ele2.checked = data.value
							// ele2.projectImg = data.item.projectImg
							// ele2.projectVideo = data.item.projectVideo
						}
					})
				})
				this.checkedList = this.dataList.map(c => c.children.filter(c1 => c1.checked)).flatMap(c2 => c2)
				console.log(this.checkedList);
				this.allNum = this.dataList.reduce((p, c) => p + c.children.length, 0)
				this.totalMoney = this.checkedList.reduce((p, c) => p + (c.projectNumber * c.projectPrice), 0)
			},
			getList() {
				if (storage.get('ClientId')) {
					//查询是否有地址
					getAddressList({
						clientId: storage.get('ClientId')
					}).then(res => {
						console.log(res);
						this.addressList = res.rows
						if (this.addressList.length == 0) {
							uni.removeStorage({
								key: 'address_info'
							})
						} else {
							try {
								const value = uni.getStorageSync('address_info');
								if (value) {
									let arr = this.addressList.filter(item => {
										return item.addressId == value.addressId
									})
									arr.length == 0 ? uni.removeStorage({
										key: 'address_info'
									}) : this.addressInfo = value

									console.log(value);
								} else {
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
							} catch (e) {}
						}



						console.log(this.addressInfo);
					})

				}

			},

			// queryList(pageNo, pageSize) {
			// 	//维修车列表
			// 	car.getCarList({
			// 		clientId: storage.get('ClientId')
			// 	}).then(res => {
			// 		console.log(res);
			// 		this.$refs.paging.complete(res.data);
			// 		//this.dataList = res.data
			// 		res.data.forEach(item => {
			// 			this.allNum += item.children.length
			//  	})
			// 	})
			// },
			getCarList() {
				//维修车列表
				car.getCarList({
					clientId: storage.get('ClientId')
				}).then(res => {
					console.log(res, '3145455555>>>>>>>>>');
					this.dataList = res.data

					this.totalMoney = 0
					this.dataList.forEach(item => {
						this.allNum += item.children.length

					})

				})
			},
			showMask() {
				this.isShow = true;
				console.log(this.isShow);
			},

			handelClose(data) {
				this.isShow = false;
				console.log(data); //data={
				//  date: "2020/3/30 09:00"
				//  _date: "2020-3-30 09:00"
				//  dateRange: "2020/3/30 09:00-09:30"
				//  _dateRange: "2020-3-30 09:00-09:30"
				//  timeStamp: 1585530000000
				// }
			},
			//底部勾选框全选或反选
			allCheckHandle(bool) {
				console.log(this.allNum, this.checkedList.length);
				console.log(bool);

				//console.log(this.dataList);
				if (bool) {
					console.log(this.dataList);
					this.checkedList = this.dataList.map(c => c.children).flatMap(c1 => c1)
					console.log('277,.', this.checkedList);
					this.totalMoney = this.checkedList.reduce((p, c) => p + (c.projectNumber * c.projectPrice), 0)
				} else {
					this.checkedList = []
					this.totalMoney = 0
				}
				this.dataList.forEach((car, index) => {
					car.children.forEach((car1, index1) => {
						this.$set(this.dataList[index].children, index1, {
							...car1,
							checked: bool
						})
					})
				})

			},
			//删除
			deleteHandle() {
				let arr = this.checkedList.map(item => item.id)
				//	this.deleteList(arr)
				uni.showModal({
					title: '删除',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							console.log(arr);
							car.deleteCar(arr).then(res => {
								console.log(res);
								if (res.code === 200) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									//this.getCarList()
									this.deleteList(arr)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}

					}
				});

			},
			//下单
			submitOrder() {
				console.log('374.。。。', this.checkedList);
				this.checkedList = this.dataList.map(c => c.children.filter(c2 => c2.checked)).flatMap(c1 => c1)
				this.checkedList.length == 0 ? uni.showToast({
					title: '请选择商品',
					duration: 2000,
					icon: 'none'
				}) : uni.navigateTo({
					url: '../../subpkg/car/submitOrder/submitOrder?item=' + encodeURIComponent(JSON.stringify(this
						.checkedList))
				})
			},
			//查看我的地址
			myAddress() {
				let params = {
					type: 'car',
				}
				uni.navigateTo({
					url: '../../subpkg/car/myAddress/myAddress?params=' + encodeURIComponent(JSON.stringify(
						params))
				})
			},
			//计算总钱数
			getCheck(data) {
				this.dataList.forEach(ele1 => {
					ele1.children.forEach(ele2 => {
						if (ele2.id === data.item.id) ele2.projectNumber = data.num.value
					})
				})
				this.checkedList = this.dataList.map(c => c.children.filter(c2 => c2.checked)).flatMap(c1 => c1)
				console.log(this.dataList, '.....346', this.checkedList);
				this.totalMoney = this.checkedList.reduce((p, c) => p + ((c.id === data.item.id ? data.num.value : c
					.projectNumber) * c.projectPrice), 0)
			},
			//
			deleteList(arr) {
				console.log(arr);
				console.log(this.dataList, '409409409409');
				// this.dataList.forEach(ele1 => {
				// 	// let arrs = []
				// 	// ele1.children.forEach((ele2, Index2) => {
				// 	// 	console.log(ele2, Index2);
				// 	// 	arrs.push(ele2)
				// 	// })
				// 	// console.log(arrs);
				// 	// arrs.forEach((v, i) => {
				// 	// 	if (arr.includes(v.id)) {
				// 	// 		ele1.children.forEach((vv, ii) => {
				// 	// 			if (v.id == vv.id) {
				// 	// 				ele1.children.splice(ii, 1)
				// 	// 			}
				// 	// 		})
				// 	// 	}
				// 	// })

				// })
				this.dataList = this.dataList.map(d => ({
					...d,
					children: d.children.filter(d1 => !arr.includes(d1.id))
				}))
				console.log(this.dataList, '417417417');
				this.dataList = this.dataList.filter(d => d.children && d.children.length > 0)
				this.checkedList = this.dataList.map(c => c.children.filter(c1 => c1.checked)).flatMap(c2 => c2)
				this.totalMoney = this.checkedList.reduce((p, c) => p + (c.projectNumber * c.projectPrice), 0)
				this.allNum = this.dataList.reduce((p, c) => p + c.children.length, 0)
				console.log(this.dataList, '4224224224220', this.checkedList);
				getCarNum().then(res => {
					uni.setTabBarBadge({
						index: 2,
						text: res
					})
				})
			},
			//取消登录
			quxiao() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			//去登录
			login() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			textareaInput(arr) {
				this.dataList.forEach(item1 => {
					item1.children.forEach(item2 => {
						if (item2.id === arr[0].id) {
							item2.remark = arr[0].remark
						}
					})
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
		.btns {
			display: flex;
			justify-content: space-evenly;
			margin: 50rpx auto;
			width: 63%;

			view {
				width: 180rpx;
				height: 60rpx;
				border-radius: 45rpx;
				text-align: center;
				line-height: 60rpx;
				font-size: 28rpx;
			}

			view:first-child {
				background: #9FD6BA;
				color: #fff;
			}

			view:nth-child(2) {
				background: #FFFFFF;
				border: 4rpx solid #9FD6BA;
				color: #9FD6BA;
			}
		}

		// .guanli {
		// 	background-color: #fff;
		// 	text-align: end;
		// 	padding-top: 20rpx;
		::v-deep.u-navbar__content__left {
			display: none;
		}

		.address {
			//	padding: 0 34rpx;
			width: 100%;
			height: 220rpx;
			background: #fff;
			display: flex;




			.left {
				padding-top: 16rpx;
				display: flex;
				flex-direction: column;
				width: 78%;
				margin-left: 20rpx;
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

		.list {
			margin-top: 20rpx;
			width: 100%;
			//background-color: #fff;
		}

		.bottom {
			width: 100%;
			height: 91rpx;
			background: #fff;
			position: fixed;
			display: flex;
			align-items: center;
			padding: 10rpx 30rpx;

			image,
			.check {
				margin-top: 8rpx;
				margin-right: 14rpx;
			}

			image {
				width: 43rpx;
				margin-top: 12rpx;
			}

			.check {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #D8DCDB;
				border-radius: 50%;
			}

			.btn {
				width: 199rpx;
				height: 69rpx;

				border-radius: 34rpx;
				font-size: 29rpx;
				color: #FFFFFF;
				line-height: 69rpx;
				text-align: center;
			}
		}
	}
</style>
