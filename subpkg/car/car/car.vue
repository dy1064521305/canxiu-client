<template>
	<common-page>
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

				<u-navbar title="维修车" placeholder :safeAreaInsetTop="true" :autoBack='true'>

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
				<!-- 	<view class="address" @click="myAddress"
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
			</view> -->



				<view class="list">
					<u-checkbox-group v-model="checkboxValue1" placement="column">
						<view style="background-color: #fff;margin-bottom: 20rpx;" v-for="(item,index) in dataList"
							:key="index">
							<view
								style="padding: 20rpx 28rpx;display: flex;justify-content: space-between;align-items: center;">
								<!-- 	<view > -->

								<view style="display: flex;align-items: center;">
									<u-checkbox v-if="!item.isStatus" shape="circle" :name="item.workerType"
										activeColor='#A4D091' @change='val=>typeCheckChange(val,item,index)'>
									</u-checkbox>
									<text
										style="font-size:34rpx;font-weight: bold;color: #3D3F3E;">{{item.workerType}}</text>


								</view>
								<view style="display: flex;">
									起步价:{{item.startingFreeDiscount}}元/次
									<text
										v-if="Number(item.startingFreeDiscount)-((item.children.filter(f=>{return f.projectStatus==0})).reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))>0"
										@click="coudanHandle(item.workerType)">
										<text style="margin:0 10rpx;">|</text>去凑单 >
										<!-- 	<text style="font-size: 25rpx;">
										还差<text
											style="color:#EC5722;">{{Number(item.startingFreeDiscount)-(item.children.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))}}</text>元达到起步价
									</text> -->
									</text>
									<text v-else>
										<!-- <image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
										src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
									</image>已达到起步价 -->
										（已满足）
									</text>
								</view>

							</view>
							<proInfo :list="item.children" :isCar='true' :isDelete='isDelete' @getCarList='getCarList'
								@getCheck='getCheck' @check_change="checkChange" @deleteCarList="deleteList"
								@getDeleteUrlList='getDeleteUrlList' @textareaInput='textareaInput' />
						</view>
					</u-checkbox-group>

					<u-empty v-if="dataList.length==0" mode="car"
						icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/04/125e056702434056b9b3bc5f7768eb0a.png"
						text='维修车为空' marginTop='100' width="210px">
					</u-empty>


				</view>

				<!-- :style="{bottom:(tabbarHeight*2-10)+'rpx'}" -->
				<view v-if="dataList.length!=0" class="bottom" :style="{bottom:(tabbarHeight*2-10)+'rpx'}">
					<view v-if="checkedList.length !== allNum||checkedList.length==0" class="check"
						@click="allCheckHandle(true)">

					</view>
					<!-- {{checkedList.length}}{{allNum}} -->
					<view v-if="checkedList.length === allNum&&checkedList.length!=0" @click="allCheckHandle(false)">
						<image style="width: 43rpx;height: 43rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
						</image>
					</view>
					<text style="font-size: 29rpx;color: #3D3F3E;">全选</text>
					<view style="width: 53%;text-align: end;">
						<text style="font-size: 22rpx;color: #A5A7A7;">合计:</text>
						<text
							style="font-size: 33rpx;color: #EC5722;margin:0 10rpx 0 10rpx;width:14%;">¥{{totalMoney}}</text>
					</view>
					<view v-if='isDelete' style="background: #EC5722;" class="btn" @click="deleteHandle">
						删除所选({{checkedList.length}})
					</view>
					<view v-else class="btn" style="background:linear-gradient(270deg, #A4D091 0%, #769D71 100%);"
						@click="submitOrder">去下单({{checkedList.length}})</view>
				</view>
			</view>
			<view style="height:100rpx;">
			</view>


			<!-- 凑单弹框 -->
			<u-popup :show="coudanShow" closeable @close="coudanShow=false">
				<view class="cou-dan">
					<view class="title">服务橱窗</view>
					<view style="padding:10rpx 20rpx;">
						<u-search clearabled placeholder="请输入需要的服务" v-model="searchName" @clear="getCoudanList"
							@search="getCoudanList" :show-action="false"></u-search>
					</view>


					<view v-if="coudanList.length!=0" class="main">
						<view v-for="(item,index) in coudanList" :key="index" class="box">
							<coudan-card :item='item' />



						</view>

					</view>
					<u-empty v-else mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
						text='没有找到哦，换个关键词试一下吧'>
					</u-empty>
				</view>
			</u-popup>

		</view>
	</common-page>
</template>
<script>
	import storage from '@/utils/storage'
	import proInfo from '@/components/proInfo/proInfo.vue'
	import * as car from '@/api/car.js'
	import coudanCard from '../components/coudanCard/coudanCard.vue'
	import {
		getCarNum
	} from '@/utils/api.js'
	import {
		getAddressList
	} from "@/api/address.js"
	export default {
		name: 'test',
		components: {
			proInfo,
			coudanCard
		},
		mixins: [],
		props: {},
		data() {
			return {
				coudanList: [], //凑单列表
				coudanShow: false, //凑单弹框
				checkboxValue1: [],
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
				workerType: undefined,
				searchName: ''
			};
		},
		onReady() {
			//获取小程序胶囊位置
			// #ifdef MP-WEIXIN
			this.menuButtonInfoWidth = uni.getMenuButtonBoundingClientRect().width + 80
			// #endif

		},
		onLoad() {
			this.getCarList()
		},

		onShow() {

			// #ifdef APP-PLUS
			this.tabbarHeight = uni.getSystemInfoSync().windowBottom

			// #endif
			// #ifdef H5
			this.tabbarHeight = uni.getSystemInfoSync().windowBottom
			// #endif	
			//this.getList()
			this.isLogin = storage.get('AccessToken')
			let that = this
			uni.$on('updateNote', function(data) {
				that.getCarList()
			})

			//this.getCarList()
			// if (this.isLogin) {
			// 	 // this.getCarList()
			// 	this.allNum = 0
			// 	this.checkedList = []
			// 	console.log('2455555555555555555555');
			// }
			uni.removeStorage({
				key: 'service_info'
			})
			//this.getCarNumHandle()
		},
		// onTabItemTap: function(item) {

		// 	if (storage.get('AccessToken')) {
		// 		this.getCarList()
		// 		this.allNum = 0
		// 		this.checkedList = []
		// 	}
		// 	uni.removeStorage({
		// 		key: 'service_info'
		// 	})
		// },
		onHide() {
			this.coudanShow = false
			this.workerType = undefined,
				this.searchName = ''

		},
		methods: {

			getCarNumHandle() {
				// getCarNum().then(res => {
				// 	if (res != 0) {
				// 		uni.setTabBarBadge({
				// 			index: 2,
				// 			text: res
				// 		})
				// 	} else {
				// 		uni.removeTabBarBadge({
				// 			index: 2
				// 		})

				// 	}
				// })
			},
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
			},
			groupBy(array, f) {

				let groups = {};

				array.forEach(function(o) {

					var group = JSON.stringify(f(o));

					groups[group] = groups[group] || [];

					groups[group].push(o);

				});

				return Object.keys(groups).map(function(group) {

					return groups[group];

				});

			},

			arrayGroupBy(list, groupId) {

				let sorted = this.groupBy(list, function(item) {

					return [item[groupId]];

				});
				// sorted.forEach((item, index) => {
				// 	item
				// })
				return sorted;

			},
			getTotalMoney() {
				let arr = this.arrayGroupBy(this.checkedList, 'workerType');
				this.totalMoney = 0
				arr.forEach((item, index) => {
					let all = item.reduce((p, c) => p + (c.projectNumber * c.discountPrice), 0)
					let money2 = all < Number(item[0].startingFreeDiscount) ? Number(item[0]
						.startingFreeDiscount) : all
					this.totalMoney += money2


				})

				//this.totalMoney = this.checkedList.reduce((p, c) => p + (c.projectNumber * c.discountPrice), 0)
			},
			getCheckList() {
				this.checkedList = this.dataList.map(c => c.children.filter(c1 => c1.checked)).flatMap(c2 => c2)
			},
			getAllNum() {

				this.allNum = this.dataList.reduce((p, c) => p + (c.children.filter(f => {
					return f.projectStatus == 0
				})).length, 0)

			},
			//其他页面改变数据
			changeData(data) {
				this.dataList.forEach((fu, index) => {
					fu.children.forEach((son, ind) => {
						data.forEach(d => {
							if (son.id == d.id) {
								this.$set(this.dataList[index].children, ind, d)

							}
						})
					})
				})

				this.$nextTick(() => {
					this.getCheckList()
					this.getAllNum()
					this.getTotalMoney()
				})
			},
			//单个复选框勾选或不勾选事件回调
			checkChange(data) {
				let index = this.checkedList.findIndex(c => c.id === data.item.id)
				if (data.value) {
					index < 0 && this.checkedList.push(data.item)
				} else {
					this.checkedList.splice(index, 1)
				}
				this.dataList.forEach(ele1 => {
					ele1.children.forEach(ele2 => {

						if (ele2.id === data.item.id) {
							ele2.checked = data.value
							// ele2.projectImg = data.item.projectImg
							// ele2.projectVideo = data.item.projectVideo
						}
					})
				})
				this.fatherCheckout()
				this.getCheckList()
				this.getAllNum()
				this.getTotalMoney()
			},
			//父级勾选框组回显
			fatherCheckout() {
				this.checkboxValue1 = this.dataList.filter(d => d.children.every(child => child.checked)).map(d1 => d1
					.workerType)
			},
			getList() {
				if (storage.get('ClientId')) {
					//查询是否有地址
					getAddressList({
						clientId: storage.get('ClientId')
					}).then(res => {
						this.addressList = res.rows
						if (this.addressList.length == 0) {
							uni.removeStorage({
								key: `address_info${storage.get('ClientId')}`,

							})
						} else {
							try {
								const value = uni.getStorageSync(`address_info${storage.get('ClientId')}`);
								if (value) {
									let arr = this.addressList.filter(item => {
										return item.addressId == value.addressId
									})
									arr.length == 0 ? uni.removeStorage({
										key: `address_info${storage.get('ClientId')}`
									}) : this.addressInfo = value

								} else {
									this.addressList.forEach(item => {
										if (item.isDefault == 0) {
											this.addressInfo = item
											uni.setStorage({
												key: `address_info${storage.get('ClientId')}`,
												data: item,
											})
										}
									})
								}
							} catch (e) {}
						}
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
				// let place=uni.getS
				//维修车列表
				car.getCarList({
					clientId: storage.get('ClientId'),
					address: uni.getStorageSync(`address_refreash${storage.get('ClientId')}`)
				}).then(res => {
					this.dataList = res.data
					this.checkboxValue1 = []
					this.totalMoney = 0
					this.dataList.forEach(item => {
						this.allNum += (item.children.filter(f => {
							return f.projectStatus == 0
						})).length
						item['isStatus'] = item.children.every(ch => {
							return ch.projectStatus == 1
						})
						console.log(item.children.every(ch => {
							return ch.projectStatus == 0
						}), '299444444');
						item.children.forEach(chil => {
							chil.startingFreeDiscount = item.startingFreeDiscount
						})
					})

				})
			},
			showMask() {
				this.isShow = true;
			},

			handelClose(data) {
				this.isShow = false;
				//data={
				//  date: "2020/3/30 09:00"
				//  _date: "2020-3-30 09:00"
				//  dateRange: "2020/3/30 09:00-09:30"
				//  _dateRange: "2020-3-30 09:00-09:30"
				//  timeStamp: 1585530000000
				// }
			},
			//底部勾选框全选或反选
			allCheckHandle(bool) {

				//console.log(this.dataList);
				if (bool) {
					this.checkedList = this.dataList.map(c => c.children).flatMap(c1 => c1)
					this.checkedList = this.checkedList.filter(c => {
						return c.projectStatus == '0'
					})
					this.getTotalMoney()
				} else {
					this.checkedList = []
					this.totalMoney = 0
				}
				this.dataList.forEach((car, index) => {
					car.children.forEach((car1, index1) => {
						this.$set(this.dataList[index].children, index1, {
							...car1,
							checked: car1.projectStatus == 1 ? false : bool
						})
					})
				})
				this.fatherCheckout()
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
							car.deleteCar(arr).then(res => {
								if (res.code === 200) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									//this.getCarList()
									this.deleteList(arr)
									// this.getCarNumHandle()
									this.checkboxValue1 = []

								}
							})
						} else if (res.cancel) {}

					}
				});

			},
			//下单
			submitOrder() {

				this.checkedList = this.dataList.map(c => c.children.filter(c2 => c2.checked)).flatMap(c1 => c1)
				if (this.checkedList.length == 0) {
					uni.showToast({
						title: '请选择项目',
						duration: 2000,
						icon: 'none'
					})
				} else {

					let info = {
						checkedList: this.checkedList,
						isCar: true
					}
					uni.navigateTo({
						url: '../submitOrder/submitOrder?item=' + encodeURIComponent(JSON.stringify(
							info))
					})
				}
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
				this.getTotalMoney()
				car.editCar({
					id: data.item.id,
					projectNumber: data.item.projectNumber
				}).then(res => {})
				// this.totalMoney = this.checkedList.reduce((p, c) => p + ((c.id === data.item.id ? data.num.value : c
				// 	.projectNumber) * c.discountPrice), 0)
			},
			//
			deleteList(arr) {
				this.dataList = this.dataList.map(d => ({
					...d,
					children: d.children.filter(d1 => !arr.includes(d1.id))
				}))
				this.dataList = this.dataList.filter(d => d.children && d.children.length > 0)
				this.dataList.forEach(item => {
					item['isStatus'] = item.children.every(ch => {
						return ch.projectStatus == 1
					})
				})
				this.getCheckList()
				this.getTotalMoney()
				this.getAllNum()
				this.fatherCheckout()
				// this.getCarNumHandle()
			},
			//取消登录
			quxiao() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			//去登录
			login() {
				// #ifdef MP-WEIXIN
				this.$store.commit('OPEN_LOGIN_POP')
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '/pages/login/index'
				})
				// #endif

			},
			textareaInput(arr) {
				this.dataList.forEach(item1 => {
					item1.children.forEach(item2 => {
						arr.forEach(arr => {
							if (item2.id === arr.id) {
								item2.remark = arr.remark
							}
						})

					})
				})
			},
			//工种全选
			typeCheckChange(val, item, i) {
				this.dataList[i].children.forEach((car1, index1) => {
					this.$set(this.dataList[i].children, index1, {
						...car1,
						checked: car1.projectStatus == 1 ? false : val
					})
				})
				this.getCheckList()
				console.log('277,.', this.checkedList, this.dataList.map(c => c.children.filter(c1 => c1.checked)), this
					.dataList);
				this.getTotalMoney()
			},
			//凑单列表
			coudanHandle(name) {
				this.workerType = name
				this.coudanShow = true
				this.getCoudanList()
			},
			getCoudanList() {
				//获取凑单列表
				car.listByWorkerType({
					clientId: storage.get('ClientId'),
					type: this.workerType,
					name: this.searchName,
					address: uni.getStorageSync(`address_refreash${storage.get('ClientId')}`)
				}).then(res => {
					this.coudanList = res.data

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
				background: #A4D091;
				color: #fff;
			}

			view:nth-child(2) {
				background: #FFFFFF;
				border: 4rpx solid #A4D091;
				color: #A4D091;
			}
		}

		// .guanli {
		// 	background-color: #fff;
		// 	text-align: end;
		// 	padding-top: 20rpx;


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
			margin-bottom: 20rpx;
			width: 100%;
			//background-color: #fff;
		}

		.bottom {
			width: 100%;
			height: 138rpx;
			background: #fff;
			position: fixed;
			display: flex;
			align-items: center;
			padding: 10rpx 30rpx;
			z-index: 9999;
			bottom: 0;

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

		.cou-dan {
			height: 85vh;

			.title {
				margin: 20rpx;
				font-size: 37rpx;
				text-align: center;
			}

			.main {
				height: 90%;
				overflow-y: scroll;
			}
		}
	}
</style>