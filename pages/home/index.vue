<template>
	<view>
		<view v-if="locationStatus=='authorized'||locationStatus==''" class="home">
			<u-navbar :height="navHeight" placeholder :bgColor="'RGBA(153, 212, 182,'+opacity+')'">
				<view slot='left'>

				</view>
				<view slot='center' style="padding-bottom:50rpx;">
					<view class="search" :style="{'margin-top':titleHeight+'rpx'}">
						<view @click="choseCity" style="margin:0 18rpx 0 30rpx;">{{cityName}}</view>
						<image @click="choseCity" class="triangle" src="../../static/img/home/triangle.png" mode="">
						</image>
						<view class="line">|</view>
						<image class="search-icon" src="../../static/img/home/search.png" mode=""></image>
						<input type="text" @click="goSearch">
						<view class="search-title" @click="goSearch">搜索</view>
					</view>
				</view>
			</u-navbar>
			<view class="content">
				<view class="types">
					<view v-for="(item,index) in typesList" :key='index' class="box" @click='goService(index)'>
						<image :src="item.iconUrl" mode=""></image>
						<view class="">
							{{item.typeName}}
						</view>
					</view>
				</view>
				<view class="project">
					<view class="top">
						<view class="title blod">
							热门报修
						</view>
						<view v-if="hotServiceList.length>4" class="more" @click="goMore('more',[])">
							<text>更多报修</text>
							<view>
								<image
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
									mode=""></image>
							</view>
						</view>
					</view>
					<view class="bottom">
						<view v-if="hotServiceListFour.length!=0" v-for="(item,index) in hotServiceListFour"
							:key="index" class="box" @click="goDetailed(item)">
							<image :src="item.imgs[0]" mode=""></image>
							<view class="title blod">
								{{item.serviceName}}
							</view>
							<view class="info">
								<view style="color: #EC5722;">
									<text style="font-size: 22rpx;">¥</text>
									<text style="display:inline-block;margin: 0 12rpx;"
										class="blod">{{item.servicePrice}}</text>
								</view>
								<view style="font-size: 22rpx;color: #A5A7A7;padding-top: 8rpx;width: 60%;"></view>
								<image src="../../static/img/home/intoCar.png" mode=""></image>
							</view>

						</view>
						<view style="margin: 0 auto;" v-if="hotServiceListFour.length==0">
							暂无数据
						</view>
					</view>
				</view>
				<view class="fault-area">
					<view class="title blod">
						故障区域
					</view>
					<view class="boxs">
						<view class="box" v-for="(item,index) in regionService" :key='index'
							@click="goMore(item.regionName,item.productVoList)">
							<image style="height: 100%;width: 100%;" :src="item.img"></image>
							<view class="mask">
								{{item.regionName}}
							</view>
						</view>
					</view>
				</view>
				<view class="home-bottom" id='bottom' :style="{minHeight:scrollHeight+'px'}">
					<view class="tabs"
						:style="{backgroundColor:tabsBg,position:tabsBg === '#fff'&&'sticky',zIndex:3,top:tabHeight+'px'}">
						<u-tabs :current="currentIndex" :list="serviceSymptomsName" lineWidth="60" lineHeight="7"
							lineColor='linear-gradient(90deg, #72DAA4 0%, #9FD6BA 100%);' :activeStyle="{
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
					<swiper :style="{minHeight:'90vh',height:swiperHeight+'px'}" :current="currentIndex"
						@change="swiper_change">
						<swiper-item v-for="(item,index) in serviceSymptomsName" :key="index">
							<view class="scroll-view">
								<view v-for="(item1,index1) in item.list" :key="index1">
									<view v-if="item.list.length!=0">
										<goodCard :item='item1' :isLogin='isShowMoney' type='pro' />
									</view>

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
				</view>

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

	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import goodCard from '../../components/goodCard/goodCard.vue'
	// import {
	// 	checkForAuthorization
	// } from '@/utils/location.js'
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')
	import {
		getServiceType,
		getServiceSymptoms,
		getHotService,
		getRegionService
	} from '@/api/home.js';
	import {
		getLnglat
	} from '@/utils/location.js'
	export default {
		components: {
			goodCard
		},
		data() {
			return {
				isShowMoney: false, //未登录不显示金额
				loading: false, //是否展示 “正在加载” 字样
				loaded: false, //是否展示 “已加载全部” 字样
				titleHeight: 60, //小程序的搜索框顶部高度
				typesList: [], //一级分类
				iconList: [
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/dd229a61f282420dbd4834b7df8ff118.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/931927a4bfda4cce9ea6c8ddb6833fcb.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/41eb8bd3850d46eb8da998031132969b.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/d70cff4580e343d0b476d614e6060d34.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/b392af66086c48abb9fa0af498aed86d.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/1f949be9b75146899ac5163dfb724f6c.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/caf8ac6839ef4102a4fef58e623ae66b.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/f829573a5ff14a14aeb24cc29daccf42.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/aeb9f00486e74e2581ea821d3a62c7c5.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/919ae79b3192417387cbfe81c4f3d971.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/80da0c42b64b4503989c8ebf79ed3e6c.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/c9999ed56ab0408b9a8f81832c1a897a.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/fa9899041b4b43f1b98ce2f6cd4da8a1.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/96b3449ca2f04f0f904ae049069f69eb.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/e4e296ff88864e45877ff619b8588b0a.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/e3c94b4ad35b432ca9d808ebc2b9682f.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/2b6e994786e343ba9e2e97d178868732.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/4cb33e4d1a614bda86187d7fd7d1732e.png",
					"http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/fc70dc01e62b410c86f0d7bcbc9e278a.png",

				],
				hotServiceList: [], //热门报修
				hotServiceListFour: [], //首页显示的四个
				regionService: [], //故障区域
				regionImg: [
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/e1a97f4a6c8f4bc1a2d2ae473bcbdf20.png',
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/2092a26ec7004e5cbd3c812d22051ccc.png',
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/3529ea882ad94cbb8318e83054e6e5f8.png',
					'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/d4d05c166eba49219d98070568886517.png'
				],
				serviceSymptoms: [], //故障现象
				serviceSymptomsName: [], //故障现象名称
				productVoList: [], //产品服务列表
				queryParams: {
					pageNum: 1,
					pageSize: 5
				},
				currentIndex: 0,
				location: {},
				navHeight: 70, //搜索框的高度
				offsetTop: 90, //吸顶高度
				scrollTop: 0,
				swiperHeight: 0,
				tabsBg: '',
				scrollHeight: 0,
				tabHeight: 0,
				opacity: 0,
				bottomNum: 0,
				cityName: '获取位置中...',
				locationStatus: '', //定位权限
			}
		},
		onReady() {
			//	console.log(this.tabsBg, 'lllllllllllllllllllllllllllll---216');
			this.scrollHeight = uni.$u.sys().windowHeight - this.offsetTop


		},
		onPageScroll(e) {
			// console.log((e.scrollTop).toFixed(0),(this.scrollTop).toFixed(0));
			if ((e.scrollTop).toFixed(0)*1 >= (this.scrollTop).toFixed(0)*1) {
				//	console.log(this.tabsBg, 'lllllllllllllllllllllllllllll---216', e.scrollTop, this.scrollTop + 55);
				this.tabsBg = '#fff'
			} else {
				this.tabsBg = '#F5F9FA'
			}
			this.opacity = parseFloat((e.scrollTop / 80).toFixed(1) * 1) > 1 ? 1 : parseFloat((e.scrollTop / 80).toFixed(
				1) * 1)
		},
		onShow() {


			// #ifdef MP-WEIXIN
			this.getHeight();
			this.navHeight = 100
			this.titleHeight = 120
			this.offsetTop = 145
			// this.queryParams.pageNum = 1
			// #endif
			uni.getStorage({
				key: 'AccessToken',
				complete: (res) => {
					console.log();
					this.isShowMoney = Boolean(res.data)
					this.getList()
					this.getServiceSymptomsHandle('init')
				}
			})


			var that = this
			uni.getStorage({
				key: 'city',
				success: function(res) {
					console.log(res);
					that.cityName = res.data
				}
			});

		},
		onLoad() {
			this.locationStatus = ''
			console.log(this.locationStatus);
			var that = this
			uni.getStorage({
				key: 'city',
				success: function(res) {
					console.log(res);
					that.cityName = res.data
				},
				fail(res) {
					// #ifdef MP-WEIXIN
					that.getLoction()
					// #endif
					// #ifdef APP-PLUS
					that.getLoction()
					// #endif
				}
			});
			console.log(that.cityName, '255555555555');


		},

		methods: {
			// 获取微信右上角胶囊高度
			getHeight() {
				let res = wx.getMenuButtonBoundingClientRect();
				this.titleHeight = res.top + 30;
			},


			//触底函数
			onReachBottom() {
				console.log('触底');
				this.bottomNum++
				console.log(this.serviceSymptomsName[this.currentIndex]);
				if (this.serviceSymptomsName[this.currentIndex].list.length < this.serviceSymptomsName[this.currentIndex]
					.total) {
					this.queryParams.pageNum++
					this.getServiceSymptomsHandle()
				}


			},
			// //上拉函数
			onPullDownRefresh() {
				//console.log("下拉刷新...");
				this.queryParams.pageNum = 1
				this.getServiceSymptomsHandle()
				var that = this
				uni.getStorage({
					key: 'city',
					success: function(res) {
						console.log(res);
						that.cityName = res.data
					},
					fail(res) {
						// #ifdef MP-WEIXIN
						that.getLoction()
						// #endif
						// #ifdef APP-PLUS
						that.getLoction()
						// #endif
					}
				});

			},
			swiper_change(e) {
				if (e.detail.current === this.currentIndex) return
				this.currentIndex = e.detail.current
			},
			getServiceSymptomsHandle(type) {
				//获取故障现象
				this.loading = true
				console.log(this.isShowMoney, '.....328');
				//console.log(this.queryParams.pageNum, 'numnum 111111111');
				return getServiceSymptoms(this.queryParams).then(res => {
					console.log(res, '.............331', this.queryParams);
					this.loading = false
						this.serviceSymptomsName = res.data.map((d, i) => ({
							name: d.symptomsName,
							list: this.queryParams.pageNum === 1 ? d.productVoList.records.map(rec => ({
									...rec,
									servicePrice: !this.isShowMoney ? this.replaceMoney(rec
										.servicePrice) : rec.servicePrice
								})) : this
								.serviceSymptomsName[i].list.concat(d.productVoList.records.map(rec => ({
									...rec,
									servicePrice: !this.isShowMoney ? this.replaceMoney(rec
										.servicePrice) : rec.servicePrice
								}))),
							total: d.productVoList.total
						}))
						this.$forceUpdate();
					console.log(this.serviceSymptomsName);
					// this.serviceSymptomsName[this.currentIndex].list.forEach(item =>{
					// 	console.log(this.isShowMoney,JSON.stringify(storage.get('AccessToken')) );
					// 	item.servicePrice = !this.isShowMoney ? this.replaceMoney(item.servicePrice) :item.servicePrice
					// 	//console.log(item,'334....',!this.isShowMoney ? this.replaceMoney(item.servicePrice) :item.servicePrice);
					// }) 
					this.$nextTick(() => {
						uni.createSelectorQuery().in(this).selectAll('.scroll-view').boundingClientRect(
							data => {
								this.swiperHeight = data.reduce((p, c) => p >= c.height ? p : c.height,
									0)
							}).exec();
						this.scrollTop || uni.createSelectorQuery().in(this).select('#bottom')
							.boundingClientRect(data => {
								uni.createSelectorQuery().in(this).select('.content')
									.boundingClientRect(data1 => {
										console.log(data1,data);
										this.scrollTop = data.top - data1.top
										this.tabHeight = data1.top
									}).exec();

							}).exec();
					})
					// this.serviceSymptoms = res.data
					// //console.log(this.serviceSymptoms);
					// wx.stopPullDownRefresh()
					// if (type == 'init') {
					// 	//console.log(1111111111111111111111111111111, 'innitinit');
					// 	this.tabClick({
					// 		name: '',
					// 		index: 0,
					// 		init: true
					// 	}, 1)
					// }

					// this.serviceSymptomsName = []
					// res.data.forEach(item => {
					// 	this.serviceSymptomsName.push({
					// 		name: item.symptomsName
					// 	})
					// })
					// //console.log(this.productVoList, '++++++++201++++++++', this.currentIndex);
					// let list = this.queryParams.pageNum != 1 ? this.productVoList.concat(res.data[this
					// 	.currentIndex].productVoList.records) : this.productVoList
					// this.productVoList = list
					// this.productVoList.forEach(item => {
					// 	item.servicePrice = !this.isShowMoney ? this.replaceMoney(item.servicePrice) : item
					// 		.servicePrice
					// })
					// if (this.productVoList.length != this.serviceSymptoms[this.currentIndex].productVoList.total) {
					// 	//	console.log(this.queryParams, '====', this.productVoList.length, this.serviceSymptoms[this
					// 	//.currentIndex].productVoList.total, 'this.loading----------210', this.loading);
					// 	this.loaded = false
					// } else {
					// 	this.loaded = true
					// }
					// this.loading = false
					// console.log(this.productVoList);
					//console.log(this.serviceSymptomsName);
				}).finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			getList() {
				//获取一级分类
				getServiceType().then(res => {
					//console.log(res);
					this.typesList = res.data
					this.typesList.forEach((item, index) => {
						this.iconList.forEach((icon, ii) => {
							if (index == ii) {
								item['iconUrl'] = icon
							}

						})
					})
				})
				//获取热门报修
				getHotService().then(res => {
					console.log(res, '1111111111111');

					if (res.data != []) {
						res.data.forEach(item => {
							item.imgs = item.serviceImg.split(',')
							item.servicePrice = !this.isShowMoney ? this.replaceMoney(item
									.servicePrice) :
								item.servicePrice
						})
					}
					this.hotServiceList = res.data
					this.hotServiceListFour = this.hotServiceList.filter((item, index) => index <= 3)
				})

				//获取故障区域
				getRegionService().then(res => {
					//	console.log(res);
					this.regionService = res.data.filter((item, index) => index <= 3)
					this.regionService.forEach(item => {
						switch (item.regionName) {
							case '前厅':
								item.img = this.regionImg[0]
								break;
							case '厨房':
								item.img = this.regionImg[1]
								break;
							case '包厢':
								item.img = this.regionImg[2]
								break;
							case '卫生间':
								item.img = this.regionImg[3]
								break;
						}
					})
				})


			},
			getLoction() {
				var that = this
				console.log('2-----------------');
				//获取地址
				this.checkForAuthorization('scope.userLocation', 'locationAuthorized').then((res) => {

					uni.getLocation({
						isHighAccuracy: true,
						highAccuracyExpireTime: 1234,
						type: 'gcj02',
						success: (suc) => {
							console.log(suc, '1812222222222222222');
							// this.location.latitude = suc.latitude
							// this.location.longitude = suc.longitude
							var demo = new QQMapWX({
								key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO'
							})
							demo.reverseGeocoder({
								location: suc.latitude + "," + suc.longitude,
								success: function(res) {
									console.log(res)
									that.cityName = res.result
										.address_component.city
									uni.setStorage({
										key: 'city',
										data: that.cityName
									})
									console.log(that.cityName,
										'37837888888888888888');
									// that.position = res.result.address_component
									// 	.city;
									// let item = {
									// 	cityName: 
									// }
									// that.back_city(item);
								}
							})
						},
						fail(err) {
							console.log(err);
							uni.showToast({
								title: err.errMsg,
								icon: "none"
							})
						}
					})
				})



			},
			checkForAuthorization(scope, jurisdiction) {
				let that = this
				return new Promise((resolve, reject) => {
					const appAuthorizeSetting = uni.getAppAuthorizeSetting();
					//	console.log(appAuthorizeSetting[jurisdiction]);

					if (appAuthorizeSetting[jurisdiction] === "denied") {
						that.locationStatus = appAuthorizeSetting[jurisdiction]
						uni.showModal({
								title: "服务未开启",
								content: "请在手机设置“设置->应用权限”中打开微信位置权限!",
								showCancel: false,
								confirmText: "我知道了",
							})
							.then((res) => {
								if (res[1]["confirm"]) {
									reject();
									uni.openAppAuthorizeSetting()
								}
							});
					} else {
						uni.authorize({
							scope: scope,
							success() {
								console.log('yes')
								that.locationStatus = ''
								resolve();
							},
							fail(err) {
								err = err["errMsg"];
								that.locationStatus = 'errMsg'
								console.log(that.locationStatus);
								uni.showModal({
									title: "温馨提示",
									content: "为享受智能小程序，您必须授权!",
									confirmText: "确认授权",
								}).then((res) => {
									if (res[1]["confirm"]) {
										uni.openSetting({
											success(res) {
												if (res.errMsg.includes(
														'ok')) {
													resolve('ok')
												}
											},
										});

									} else {
										reject();
									}
								});
							},
						});
					}



				})
			},
			//设置定位权限
			setting() {
				console.log(this.locationStatus, 'this.locationStatus');
				if (this.locationStatus != 'authorized' && this.locationStatus != 'errMsg') {
					console.log('3333333333333');
					uni.openAppAuthorizeSetting()

				} else if (this.locationStatus == 'errMsg') {
					console.log('1111111111');
					uni.openSetting({
						success(res) {
							if (res.errMsg.includes('ok')) {
								resolve('ok')
							}
						},
					});
				}
				console.log('22222222222222222');
			},
			//将钱替换为星号
			replaceMoney(i) {
				//	console.log(i);
				return i.replace(/[0-9]/g, "x")
			},

			//选择城市
			choseCity() {
				console.log(1111111);
				uni.navigateTo({
					url: '../../subpkg/home/choseCity/choseCity'
				})
			},
			//更多报修
			goMore(type, arr) {
				arr.forEach(item => {
					item.servicePrice = !this.isShowMoney ? this.replaceMoney(item.servicePrice) :
						item.servicePrice
				})
				let infos = {
					list: [],
					name: type
				}
				infos.list = type == 'more' ? this.hotServiceList : arr
				//	console.log(infos);
				uni.navigateTo({
					url: '../../subpkg/home/hotRepair/hotRepair?infos=' + encodeURIComponent(JSON
						.stringify(infos))
				})
			},
			//详情
			goDetailed(item) {
				console.log(item);
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
				if (item.index === this.currentIndex) return
				//	console.log(this.scrollTop);
				// this.queryParams.pageNum = 1
				// this.bottomNum = 1
				console.log(this.scrollTop, '-----------------');
				num != 1 &&
					uni.pageScrollTo({
						scrollTop: this.scrollTop 
					});
				// this.queryParams.pageNum = 1
				// if (item.init) return
				// this.getServiceSymptomsHandle()
				//		console.log(this.serviceSymptoms);
				this.currentIndex = item.index
				//	console.log(this.serviceSymptoms, '318---------------------------------');
				// this.serviceSymptoms.forEach((ser, i) => {
				// 	if (item.index == i) {
				// 		console.log(ser);
				// 		this.productVoList = ser.productVoList.records
				// 		console.log(this.productVoList);
				// 		if (this.productVoList.length == 0) {
				// 			console.log('this.none------324', this.none, ser);
				// 			this.none = true
				// 			this.loaded = false
				// 			this.loading = false
				// 		}
				// 	}
				// })

			},
			//跳转服务页
			goService(i) {
				//		console.log(i);
				getApp().index = i
				uni.switchTab({
					url: '/pages/service/service'
				})
			}
		}
	}
</script>



<style lang="scss" scoped>
	.home {
		position: relative;
		// min-height: 100vh;
		background: url(http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/ca035aa5eca34c0b819e34aec5e77071.png) no-repeat;
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


		.search {
			align-items: center;
			display: flex;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 36rpx;
			padding-right: 10rpx;

			.triangle {
				width: 25rpx;
				height: 16rpx;
				display: inline-block;
			}

			.line {
				color: #D8D8D8;
				margin: 0 20rpx;
			}

			.search-icon {
				width: 25rpx;
				height: 25rpx;
				margin-right: 18rpx;
			}

			.search-title {
				width: 127rpx;
				height: 58rpx;
				background: #9FD6BA;
				border-radius: 29rpx;
				color: #FFFFFF;
				line-height: 58rpx;
				text-align: center;
			}
		}

		.content {
			// position: absolute;
			// top: 87rpx;
			//margin: 0 20rpx;

 
			.types {
			padding-top: 25rpx;
			margin: 0rpx 20rpx 0 20rpx;
				//width: 100%;
				height: 696rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;
				display: flex;
				flex-wrap: wrap;

				.box {
					height: 100rpx;
					font-size: 25rpx;
					color: #3D3F3E;
					width: 20%;

					text-align: center;
					margin-top: 10rpx;

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
				margin: 40rpx 20rpx 0 20rpx;
				height: 520rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;

				.title {
					font-size: 33rpx;
					color: #3D3F3E;
					padding: 22rpx;
					margin-bottom: -15rpx;
				}

				.boxs {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-evenly;
					padding: 0 10rpx;

					.box {
						width: 48%;
						height: 199rpx;
						//background-color: #CBCFCE;
						border-radius: 15rpx;
						position: relative;
						margin-top: 14rpx;

						.mask {
							position: absolute;
							bottom: 4rpx;
							left: 4rpx;
							width: 97%;
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

				.scroll-view {
					margin: 0 20rpx 0 20rpx;
				}

				::v-deep.u-tabs__wrapper__nav__line {
					background: linear-gradient(90deg, #72DAA4 0%, #9FD6BA 100%);
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

	.btn {
		width: 180rpx;
		height: 60rpx;
		border-radius: 45rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		background: #FFFFFF;
		border: 4rpx solid #9FD6BA;
		color: #9FD6BA;
		margin: 50rpx auto;
	}
</style>
