<template>
	<view>
		<view v-if="locationStatus=='authorized'||locationStatus==''" class="home">

			<u-navbar :height="navHeight" :bgColor="'RGBA(147, 189, 134, '+opacity+')'">
				<view slot='left'>

				</view>
				<view slot='center'
					:style="{'padding-bottom':'50rpx','margin-top':titleHeight+'rpx','display':'flex','width':'93%'}">

					<view class="search" @click="goSearch">
						<view class="left">
							<view class="citys">
								<view @click.stop="choseCity">{{cityName.length>=5?cityName.slice(0,5)+'...':cityName}}
								</view>
								<image @click.stop="choseCity" style="width: 25rpx;height: 16rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/06/9f18ad7cede3427ab1d2bb6c4f1d0a8e.png"
									mode="">
								</image>
							</view>

							<view class="line">|</view>
							<image class="search-icon"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/06/06/2ffd73b23d39409e83870d4edf2885ea.png"
								mode=""></image>
							<input style="width: 0%;" type="text" disabled>
						</view>
						<view class="search-title" @click="goSearch">搜索</view>
					</view>
				</view>
			</u-navbar>

			<view class="content" :style="{paddingTop:(navHeight+statusBarHeight)+'px'}">
				<view v-if="list5.length!=0" class="swiper_style">
					<u-swiper height='300rpx' :list="list5" @change="e => current = e.current" :autoplay="false">
						<view slot="indicator" class="indicator">
							<view class="indicator__dot" v-for="(item, index) in list5" :key="index"
								:class="[index === current && 'indicator__dot--active']">
							</view>
						</view>
					</u-swiper>
				</view>
				<view class="types">
					<yk-authpup ref="authpup" type="top" @notPermissions='notPermissions' @changeAuth="changeAuth"
						permissionID="ACCESS_FINE_LOCATION">
					</yk-authpup>

					<view v-for="(item,index) in typesList" :key='index' class="box" @click='goService(item.typeName)'>

						<image :src="item.iconUrl" mode=""></image>
						<view class="">
							{{item.typeName}}
						</view>
					</view>
				</view>

				<view v-if="regionService.length!=0" class="fault-area">
					<view class="title blod">
						故障区域
					</view>
					<view class="boxs">
						<view
							:style="{'margin':index==0?'10.87rpx 10.87rpx 14.49rpx 0':index==1?'10.87rpx 0 14.49rpx 10.87rpx':index==2?'14.49rpx 10.87rpx 0 0':'14.49rpx 0 0 10.87rpx'}"
							class="box" v-for="(item,index) in regionService" :key='index'
							@click="goMore(item.regionName)">
							<image style="height: 100%;width: 100%;border-radius: 14rpx;" :src="item.regionImage">
							</image>
							<view class="mask">
								{{item.regionName}}
							</view>
						</view>

					</view>
				</view>
				<view class="home-bottom" id='bottom' :style="{minHeight:scrollHeight+'px'}">
					<view class="flag" :key="statusBarHeight" :style="{height:navHeight+statusBarHeight+'px'}"></view>
					<view class="tabs"
						:style="{backgroundColor:tabsBg,position:'sticky',zIndex:3,top:navHeight+statusBarHeight+'px'}">
						<u-tabs :current="currentIndex" :list="serviceSymptomsName" lineWidth="60" lineHeight="7"
							lineColor='#A4D091' :activeStyle="{
							    color: '#303133',
							    fontWeight: 'bold',
								fontSize:'35rpx',
								marginRight:'-15rpx',
								marginLeft:'-15rpx',
							}" :inactiveStyle="{
							    color: '#A5A7A7'
							}" itemStyle="padding-left: 15px; padding-right: 15px; height: 45px;" @click="tabClick">
						</u-tabs>
					</view>
					<swiper v-if="serviceSymptomsName.length>0"
						:style="{minHeight:(serviceItemHeight*10)+'px',height:(serviceItemHeight*serviceSymptomsName[currentIndex].list.length)+'px'}"
						:current="currentIndex" @change="swiper_change">
						<swiper-item v-for="(item,index) in serviceSymptomsName" :key="index">
							<view class="scroll-view" v-if="item.list">
								<view v-for="(item1,index1) in item.list" :key="index1" class="service-item">
									<view v-if="item.list.length!=0">
										<goodCard :item='item1' :isLogin='isShowMoney' type='pro' />
									</view>
									<!-- 	<view v-if="item.list.length!=0&&isShowMoney&&item1.servicePrice.indexOf('x')==-1">
										<goodCard :item='item1' :isLogin='isShowMoney' type='pro' />
									</view> -->

								</view>
								<u-empty marginTop="200rpx" v-if="item.list.length==0" mode="list"
									icon="http://cdn.uviewui.com/uview/empty/list.png">
								</u-empty>
								<view class='btns'>
									<view v-if='loading'>正在加载...</view>
									<view v-if='item.list.length==item.total&&item.list.length!=0'>-已加载全部-</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<!-- #ifdef APP-PLUS -->
					<view style="height: 10rpx;">

					</view>
					<!-- #endif -->
				</view>

			</view>

			<view class="car" @click="goCar">
				<!-- 	<view class="dot">
					{{carNum>99?'99+':carNum}}
				</view> -->
				<view class="dot">
					<u-badge numberType="overflow" type="error" max="99" :value="carNum"></u-badge>
				</view>

				<image style="width: 59.78rpx;height: 59.78rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/19/76307108cb444855a711615dd72becb0.png"
					mode=""></image>
			</view>
		</view>
		<view v-if="locationStatus!='authorized'&&locationStatus!=''">
			<u-empty mode="permission" marginTop='400rpx' icon="http://cdn.uviewui.com/uview/empty/permission.png"
				text="地理位置权限已关闭,如需正常使用,请先打开位置权限">
			</u-empty>
			<view class="btn" @click="setting">
				去设置
			</view>
		</view>


		<view v-if="status" class="index" style="z-index: 999999999999;">
			<wu-app-update ></wu-app-update>
		</view>

	</view>
</template>

<script>
	import homeList from './homeList.js'
	import storage from '@/utils/storage'
	import goodCard from '../../components/goodCard/goodCard.vue'
	import {
		getCarNum,
		getOrderNum
	} from '@/utils/api.js'
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')
	import ykAuthpup from "@/components/yk-authpup/yk-authpup";
	import {
		getServiceType,
		getServiceSymptoms,
		getHotService,
		getRegionService,
		getRegion
	} from '@/api/home.js';

	import {
		accountQueryState,
		getUserSig,
		getC2cUnreadMsgNum,
		queryUnreadNum
	} from '@/api/tim.js'
	import {
		getLnglat
	} from '@/utils/location.js'
	import {
		getService
	} from '@/api/service.js'
	export default {
		components: {
			goodCard,
			ykAuthpup
		},
		data() {
			return {
				status:true,
				serviceTypesList: [],
				isShowMoney: false, //未登录不显示金额
				loading: false, //是否展示 “正在加载” 字样
				loaded: false, //是否展示 “已加载全部” 字样
				titleHeight: 60, //小程序的搜索框顶部高度
				typesList: [], //一级分类
				iconList: [],
				hotServiceList: [], //热门报修
				hotServiceListFour: [], //首页显示的四个
				regionService: [], //故障区域
				serviceSymptoms: [], //故障现象
				serviceSymptomsName: [], //故障现象名称
				productVoList: [], //产品服务列表
				queryParams: {
					pageNum: 1,
					pageSize: 10
				},
				currentIndex: 0,
				location: {},
				navHeight: 70, //搜索框的高度
				offsetTop: 90, //吸顶高度
				scrollTop: 0,
				serviceItemHeight: 0,
				tabsBg: '',
				scrollHeight: 0,
				tabHeight: 0,
				opacity: 0,
				cityName: '获取位置中...',
				locationStatus: '', //定位权限
				promiseList: [false, false],
				carNum: 0,
				typeName: undefined,
				list5: [],
				current: 0,
				addressName: undefined,
				statusHeight: 0,
				statusBarHeight: 0,
				address: undefined
			}
		},
		onReady() {
			this.scrollHeight = uni.$u.sys().windowHeight - this.offsetTop
			uni.getSystemInfo({
				success: (info) => {
					this.statusBarHeight = info.statusBarHeight
					// 你可以根据这个高度来设置你的内容区域的padding-top等
				}
			});
		},
	
		watch: {
			promiseList: {
				handler(n) {
					if (n.every(item => item)) {
						this.$nextTick(() => {
							// uni.createSelectorQuery().in(this).select('.search').boundingClientRect(data =>{
							// this.scrollTop = data.bottom
							// }).exec()
							uni.createSelectorQuery().in(this).select('#bottom')
								.boundingClientRect(data => {
									this.scrollTop = data.top - (this.navHeight + this.statusHeight)

									uni.createSelectorQuery().in(this).select('.search')
										.boundingClientRect(data1 => {
											// this.scrollTop = data.top - data1.bottom
											if (this.tabHeight == 0) {
												this.tabHeight = data1.top
											}
										}).exec();

								}).exec();
						})
					}
				},
				immediate: true
			}
		},
		onPageScroll(e) {
			this.statusBarHeight || uni.getSystemInfo({
				success: (info) => {
					this.statusBarHeight = info.statusBarHeight
					// 你可以根据这个高度来设置你的内容区域的padding-top等
				}
			});
			this.opacity = parseFloat((e.scrollTop / 80).toFixed(1) * 1) > 1 ? 1 : parseFloat((e.scrollTop / 80).toFixed(
				1) * 1)
			if (this.tabsBg !== '#F5F9FA') this.tabsBg = '#F5F9FA'
		},
		onShow() {
			this.status=true
			if (storage.get('AccessToken')) {
				this.isShowMoney = true
				getCarNum().then(res => {
					this.carNum = res

				});

				getOrderNum().then(res => {
					res == 0 ? uni.removeTabBarBadge({
						index: 3
					}) : uni.setTabBarBadge({
						index: 3,
						text: res
					})

				})
				this.queryState();
				getC2cUnreadMsgNum().then(res => {
					queryUnreadNum().then(ress => {

						let num = (parseInt(res.data.AllC2CUnreadMsgNum) ? parseInt(res
							.data.AllC2CUnreadMsgNum) : 0) + parseInt(ress
							.data.num)
						if (num > 0) {
							uni.setTabBarBadge({
								index: 2,
								text: num > 99 ? '99+' : num + ''
							})
						} else {
							uni.removeTabBarBadge({
								index: 2
							})
						}
					})
				})
			} else {
				this.carNum = 0
				this.isShowMoney = false
				uni.removeTabBarBadge({
					index: 2
				})
				uni.removeTabBarBadge({
					index: 3
				})
			}
			// #ifdef MP-WEIXIN
			this.getHeight();
			this.navHeight = 100
			this.titleHeight = 120
			this.offsetTop = 145
			// #endif
			// const apps = getApp()
			// if (apps.type == 'login') {
			// 	this.queryParams.pageNum = 1

			// 	this.getServiceSymptomsHandle()
			// } else {
			// 	this.getServiceSymptoms()
			// }
			this.choseAddress()
			console.log('335================================>>>>');
			uni.$on('totalUnreadCount', function(data) {
				getC2cUnreadMsgNum().then(res => {
					queryUnreadNum().then(ress => {

						let num = (parseInt(res.data.AllC2CUnreadMsgNum) ? parseInt(res.data
							.AllC2CUnreadMsgNum) : 0) + parseInt(ress
							.data.num)
						if (num > 0) {
							uni.setTabBarBadge({
								index: 2,
								text: num > 99 ? '99+' : num + ''
							})
						} else {
							uni.removeTabBarBadge({
								index: 2
							})
						}
					})
				})
			})


		},
		onHide() {
			this.status=false
			const apps = getApp()
			apps.type = undefined
			// this.getLoction()
		},

		onTabItemTap() {

			if (uni.getStorageSync(`city${storage.get('ClientId')}`).addressDetailed == '杭州市拱墅区') {
				// #ifdef APP-PLUS
				this.$refs['authpup'].open()
				// #endif
				// #ifdef MP-WEIXIN
				this.getLoction()
				// #endif
			}

		},
		onLoad() {
			this.notPermissions()
			this.getServiceTypesList()
			this.locationStatus = ''
			this.getList()

			uni.getStorage({
				key: 'AccessToken',
				complete: (res) => {

					this.isShowMoney = Boolean(res.data)
					if (this.isShowMoney) {

						this.queryState();
					}
				}
			})

		},

		methods: {
			getServiceTypesList() {
				getService().then(res => {
					this.serviceTypesList = res.data
				})
			},

			queryState() {
				accountQueryState().then(res => {
					console.log(res.data);
					if (res.data.QueryResult && res.data.QueryResult[0].State == 'Offline') {
						getUserSig().then(ress => {
							uni.$TUIKit.login({
								userID: res.data.QueryResult[0].To_Account,
								userSig: ress.msg
							}).then(function(imResponse) {
								if (imResponse.data.repeatLogin === true) {
									// 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
								}
							}).catch((error) => {
								console.info(error)
							})
						})
					}

				})
			},


			// 获取微信右上角胶囊高度
			getHeight() {
				let res = wx.getMenuButtonBoundingClientRect();
				this.titleHeight = res.top + 30;
			},


			//触底函数
			onReachBottom() {
				this.serviceSymptomsName[this.currentIndex].params.pageNum++
				if (!this.serviceSymptomsName[this.currentIndex].params.symptoms) this.serviceSymptomsName[this
					.currentIndex].params.symptoms = this.serviceSymptomsName[this.currentIndex].name
				this.getServiceSymptomsHandle()
			},
			//下拉刷新函数
			onPullDownRefresh() {
				console.log(this.serviceSymptomsName);
				this.serviceSymptomsName.forEach(service => {
					service.params.pageNum = 1
				})
				// // #ifdef APP-PLUS
				// this.$refs['authpup'].open()
				// // #endif
				// // #ifdef MP-WEIXIN
				// this.getLoction()
				// // #endif
				this.getServiceSymptomsHandle()




			},
			swiper_change(e) {
				if (e.detail.current === this.currentIndex) return
				this.currentIndex = e.detail.current
			},

			getServiceSymptomsHandle() {
				// if (!this.address) return
				console.log(this.address, this.serviceSymptomsName,
					'getServiceSymptomsHandlegetServiceSymptomsHandlegetServiceSymptomsHandle');
				//获取故障现象
				this.loading = true
				const params = this.serviceSymptomsName.length < 1 ? {
					pageSize: 10,
					pageNum: 1,
					symptoms: '',
					clientId:storage.get('ClientId')||''
				} : this.serviceSymptomsName[this.currentIndex].params
				console.log(params);
				getServiceSymptoms({
					...params,
					address: this.address,
					clientId:storage.get('ClientId')||''
				}).then(res => {
					this.serviceSymptomsName = res.data.map((d, i) => ({
						...this.serviceSymptomsName[i],
						name: d.symptomsName,
						params: this.serviceSymptomsName[i]?.params || {
							pageSize: 10,
							pageNum: 1,
							symptoms: '',
							address: this.address,
							clientId:storage.get('ClientId')||''
						},
						list: this.serviceSymptomsName[i]?.list || []
					}))
					const cell = res.data.reduce((p, c) => c.productVoList ? {
						...c,
						productVoList: c.productVoList.map(rec => ({
							...rec,
							servicePrice: !this.isShowMoney && rec
								.servicePrice != null ? this.replaceMoney(rec
									.servicePrice) : rec.servicePrice
						}))
					} : p, {})
					const index = this.serviceSymptomsName.findIndex(s => s.name === cell.symptomsName)
					const arr = params.pageNum === 1 ? cell.productVoList : [...this.serviceSymptomsName[index]
						.list, ...cell.productVoList
					];
					this.serviceSymptomsName.splice(index, 1, {
						...this.serviceSymptomsName[index],
						list: arr
					})
					this.serviceItemHeight || this.$nextTick(this.getServiceHeight)
				}).finally(() => {
					this.loading = false
					uni.stopPullDownRefresh()
				})
			},
			getServiceHeight() {
				uni.createSelectorQuery().in(this).select('.service-item')
					.boundingClientRect(data1 => {
						this.serviceItemHeight = data1.height + 10
					}).exec();
			},
			getServiceSymptoms() {
				console.log('5177777777777777', this.address);
				this.loading = true
				this.serviceSymptomsName = this.serviceSymptomsName.map((d, i) => ({
					name: d.name,
					list: d.list.map(rec => ({
						...rec,
						servicePrice: !this.isShowMoney && rec.servicePrice != null ? this
							.replaceMoney(rec
								.servicePrice) : rec.servicePrice
					})),
					total: d.total,
					params: {
						pageSize: 10,
						pageNum: 1,
						symptoms: '',
						address: this.address,
						clientId:storage.get('ClientId')||''
					},
				}))
				this.loading = false
			},
			getList() {
				//获取一级分类
				getServiceType().then(res => {
					this.iconList = homeList.iconList
					this.typesList = res.data
					this.typesList.forEach((item, index) => {
						this.iconList.forEach((icon, ii) => {
							if (item.typeName == icon.name) {
								item['iconUrl'] = icon.url
							}

						})
					})
				}).finally(() => {
					this.promiseList.splice(0, 1, true)
				})
				this.promiseList.splice(0, 1, false)
				this.promiseList.splice(1, 1, false)

				//获取故障区域
				getRegion().then(res => {
					this.regionService = res.data
				}).finally(() => {
					this.promiseList.splice(1, 1, true)
				})



			},
			getLoction() {
				console.log('getLoctiongetLoctiongetLoctiongetLoction');
				var that = this
				uni.getLocation({
					success: (suc) => {
						var demo = new QQMapWX({
							key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO'
						})
						demo.reverseGeocoder({
							location: suc.latitude + "," + suc.longitude,

							success: function(res) {
								console.log(res, '588111111111');
								let result = res.result.address_component
								that.cityName = result.street_number !=
									'' ? result.street_number : result
									.street
								that.address = result.province + '-' +
									result.city + '-' + result.district
								uni.setStorage({
									key: `address_refreash${storage.get('ClientId')}`,
									data: that.address
								})
								uni.setStorage({
									key: `city${storage.get('ClientId')}`,
									data: {
										addressDetailed: that.cityName
									}
								})
								that.addressName = that.address
								that.getList()
								that.getServiceSymptomsHandle()


							}
						})
					},
					fail(err) {
						console.log(err, '63333333');


					}
				})






			},
			choseAddress() {
				uni.getStorage({
					key: `city${storage.get('ClientId')}`,
					success: (res) => {
						console.log(res, '623333333');
						this.cityName = res.data.addressDetailed
						this.addressName = this.address = uni.getStorageSync(
							`address_refreash${storage.get('ClientId')}`)
						this.getList()
						this.getServiceSymptomsHandle()
					},

				})
			},
			//设置定位权限
			setting() {
				if (this.locationStatus != 'authorized' && this.locationStatus != 'errMsg') {
					uni.openAppAuthorizeSetting()

				} else if (this.locationStatus == 'errMsg') {
					uni.openSetting({
						success(res) {
							if (res.errMsg.includes('ok')) {
								resolve('ok')
							}
						},
					});
				}
			},
			//将钱替换为星号
			replaceMoney(i) {
				return i.replace(/[0-9]/g, "x")
			},

			//选择城市
			choseCity() {
				uni.navigateTo({
					url: '../../subpkg/home/choseCity/choseCity'
				})
			},
			//更多报修
			goMore(type, arr) {

				// arr.forEach(item => {
				// 	item.servicePrice = !this.isShowMoney && item.servicePrice != null ? this.replaceMoney(item
				// 			.servicePrice) :
				// 		item.servicePrice
				// })
				let infos = {
					list: [],
					name: type,
					isShowMoney: this.isShowMoney
				}
				infos.list = type == 'more' ? this.hotServiceList : arr
				uni.navigateTo({
					url: '../../subpkg/home/hotRepair/hotRepair?infos=' + encodeURIComponent(JSON
						.stringify(infos))
				})
			},

			//详情
			goDetailed(item) {
				uni.navigateTo({
					url: '../../subpkg/car/goodDetails/goodDetails?serviceId=' + item.serviceId
				})
			},
			//搜索
			goSearch() {
				uni.navigateTo({
					url: '../../subpkg/home/search/search'
				})
			},
			//tab栏点击
			tabClick(item, num) {
				console.log(this.serviceSymptomsName, item, '<<<<============================672', num);
				if (item.index === this.currentIndex) return
				this.currentIndex = item.index
				this.serviceSymptomsName[item.index].params.symptoms = item.name
				this.getServiceSymptomsHandle()
				num != 1 &&
					uni.pageScrollTo({
						selector: '.flag',
						success: () => {
							setTimeout(() => {
								this.tabsBg = '#fff'
							}, 300)
						}
					});
			},
			//跳转服务页
			goService(name) {

				this.typeName = name
				this.serviceTypesList.forEach((item, indexx) => {
					if (item.typeName == this.typeName) {
						getApp().index = indexx
						uni.switchTab({
							url: '/pages/service/service'
						})
					}
				})


			},
			changeAuth() {
				this.getLoction()

			},
			notPermissions() {
				console.log('notPermissionsnotPermissionsnotPermissionsnotPermissions');
				uni.getStorage({
					key: `city${storage.get('ClientId')}`,
					success: (res) => {
						console.log(res);
						this.cityName = res.data.addressDetailed
						this.addressName = this.address = uni.getStorageSync(
							`address_refreash${storage.get('ClientId')}`)
						this.getList()
						this.getServiceSymptomsHandle()
					},
					fail: () => {
						this.cityName = '杭州市拱墅区'
						this.address = '浙江省-杭州市-拱墅区'
						uni.setStorage({
							key: `address_refreash${storage.get('ClientId')}`,
							data: this.address
						})
						uni.setStorage({
							key: `city${storage.get('ClientId')}`,
							data: {
								addressDetailed: this
									.cityName,
								type: 'defalut'
							}
						})
						console.log('744444444');
						this.getList()
						this.getServiceSymptomsHandle()
					}
				})


			},
			goCar() {
				uni.navigateTo({
					url: '../../subpkg/car/car/car'
				})
			}
			// app 更新
		}
	}
</script>



<style lang="scss" scoped>
	.home {
		position: relative;
		min-height: 100vh;
		background: url(http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/16/ba173089ad4048dcac236e7fa17675b0.png) no-repeat;
		background-size: 100% auto;

		// overflow: unset;
		.blod {
			font-weight: bold;
		}


		//height: 100vh;
		.homeBg {

			width: 100%;
			height: 543rpx;
		}


		.citys {
			// color: #fff;
			align-items: center;
			display: flex;
			margin-left: 10px;

			image {
				margin-left: 15rpx;
				margin-top: 9rpx;
			}
		}

		.search {
			align-items: center;
			display: flex;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 36rpx;
			padding-right: 10rpx;
			// margin-left: 20rpx;
			width: 100%;

			.left {
				height: 100%;
				display: flex;
				align-items: center;
				width: 89%;



				.line {
					color: #D8D8D8;
					margin: 0 15rpx;
				}

				.search-icon {
					width: 25rpx;
					height: 25rpx;
					margin-left: 20rpx;
				}
			}

			.search-title {
				width: 127rpx;
				height: 58rpx;
				background: #A4D091;
				border-radius: 29rpx;
				color: #FFFFFF;
				line-height: 58rpx;
				text-align: center;
			}
		}


		.content {

			.swiper_style {
				padding: 0 20rpx;
				margin-bottom: 20rpx;

				// margin: 0 20rpx;
				::v-deep.u-swiper__indicator {
					bottom: 30rpx !important;
				}

				.indicator {
					@include flex(row);
					justify-content: center;

					&__dot {
						height: 6px;
						width: 6px;
						border-radius: 100px;
						background-color: rgba(255, 255, 255, 0.35);
						margin: 0 5px;
						transition: background-color 0.3s;

						&--active {
							background-color: black;
						}
					}
				}
			}

			// top: 87rpx;
			// margin: 0 20rpx;


			.types {
				// padding-top: 25rpx;
				margin: 0rpx 20rpx 0 20rpx;
				//width: 100%;
				// height: 696rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;
				display: flex;
				flex-wrap: wrap;

				.box {
					// height: 120rpx;
					font-size: 25rpx;
					color: #3D3F3E;
					width: 20%;

					text-align: center;
					// margin-top: 10rpx;
					margin: 20rpx 0;

					image {
						width: 91rpx;
						height: 91rpx;
					}
				}

			}

			.project {
				margin: 40rpx 20rpx 0 20rpx;

				.top {
					display: flex;
					justify-content: space-between;

					.title {
						font-size: 33rpx;
						color: #3D3F3E;
					}

					.more {
						display: flex;
						align-items: center;

						text {
							font-size: 25rpx;
							color: #CBCFCE;
							margin-right: 18rpx;
						}

						image {
							width: 14rpx;
							height: 25rpx;
							top: 2rpx;
						}
					}
				}

				.bottom {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.box {
						margin-top: 25rpx;
						width: 344rpx;
						height: 489rpx;
						background: #FFFFFF;
						box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
						border-radius: 14rpx;

						image {
							width: 100%;
							height: 340rpx;
							border-radius: 14rpx 14rpx 0 0;
						}

						.title {
							font-size: 29rpx;
							color: #3D3F3E;
							padding: 15rpx 20rpx 0 20rpx;

						}

						.info {
							display: flex;
							margin-top: 20rpx;
							padding: 0 20rpx;

							image {
								width: 43rpx;
								height: 43rpx;
							}
						}
					}
				}

			}

			.fault-area {
				margin: 18.12rpx 20rpx 0 20rpx;
				padding: 21.74rpx 18.12rpx;
				//	height: 520rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;

				.title {
					font-size: 30.8rpx;
					color: #3D3F3E;
				}

				.boxs {
					display: flex;
					flex-wrap: wrap;

					.box {
						width: 48%;
						height: 199rpx;
						//background-color: #CBCFCE;
						border-radius: 15rpx;
						position: relative;
						margin: 12rpx 6rpx;

						.mask {
							position: absolute;
							width: 100%;
							bottom: 0rpx;
							left: 0rpx;
							height: 64rpx;
							background: rgba(42, 42, 42, 0.6);
							border-radius: 0 0 15rpx 15rpx;
							font-size: 25rpx;
							color: #FFFFFF;
							text-align: center;
							line-height: 65rpx;
						}
					}
				}
			}

			.home-bottom {
				margin-top: 30rpx;
				width: 100%;
				position: relative;

				.flag {
					position: absolute;
					top: 0;
					transform: translateY(-100%);
				}

				.scroll-view {
					margin: 0 20rpx 0 20rpx;
				}

				::v-deep.u-tabs__wrapper__nav__line {
					background: #A4D091;
				}

				.btns {
					width: 100%;
					height: 80rpx;
					text-align: center;
					padding-top: 20rpx
				}
			}
		}

	}

	.car {
		width: 109rpx;
		height: 109rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.1);
		border: 1rpx solid #F8F8F8;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		position: fixed;
		right: 36.23rpx;
		bottom: 39.86rpx;
		z-index: 10000;

		.dot {
			z-index: 10;
			position: absolute;
			left: 57rpx;
			top: 22rpx;

		}
	}

	.btn {
		width: 180rpx;
		height: 60rpx;
		border-radius: 45rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		background: #FFFFFF;
		border: 4rpx solid #A4D091;
		color: #A4D091;
		margin: 50rpx auto;
	}
</style>