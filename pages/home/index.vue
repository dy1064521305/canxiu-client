<template>
	<view>
		<view v-if="locationStatus=='authorized'||locationStatus==''" class="home">
			<u-navbar :height="navHeight" placeholder :bgColor="'RGBA(147, 189, 134, '+opacity+')'">
				<view slot='left'>

				</view>
				<view slot='center'
					:style="{'padding-bottom':'50rpx','margin-top':titleHeight+'rpx','display':'flex','width':'93%'}">
					<view class="citys">
						<view @click.stop="choseCity">{{cityName}}
						</view>
						<image @click.stop="choseCity" style="width: 25rpx;height: 16rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/21/330ef3078c78421bb695ed0d1f82c5c8.png"
							mode="">
						</image>
					</view>
					<view class="search" @click="goSearch">
						<view class="left">
							<!-- 
							<view class="line">|</view> -->
							<image class="search-icon"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/06/06/2ffd73b23d39409e83870d4edf2885ea.png"
								mode=""></image>
							<input style="width: 0%;" type="text" disabled>
						</view>
						<view class="search-title" @click="goSearch">搜索</view>
					</view>
				</view>
			</u-navbar>
			<view class="content">
				<view class="types">
					<yk-authpup ref="authpup" type="top" @changeAuth="changeAuth"
						permissionID="ACCESS_FINE_LOCATION">
					</yk-authpup>
					<view v-for="(item,index) in typesList" :key='index' class="box" @click='goService(item.typeName)'>
						
						<image :src="item.iconUrl" mode=""></image>
						<view class="">
							{{item.typeName}}
						</view>
					</view>
				</view>
				<!-- 	<view class="project">
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
				</view> -->
				<view class="fault-area">
					<view class="title blod">
						故障区域
					</view>
					<view class="boxs">
						<view
							:style="{'margin':index==0?'10.87rpx 10.87rpx 14.49rpx 0':index==1?'10.87rpx 0 14.49rpx 10.87rpx':index==2?'14.49rpx 10.87rpx 0 0':'14.49rpx 0 0 10.87rpx'}"
							class="box" v-for="(item,index) in regionService" :key='index'
							@click="goMore(item.regionName,item.productVoList)">
							<image style="height: 100%;width: 100%;border-radius: 14rpx;" :src="item.regionImage">
							</image>
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
					<swiper :style="{minHeight:'90vh',height:swiperHeight+'px'}" :current="currentIndex"
						@change="swiper_change">
						<swiper-item v-for="(item,index) in serviceSymptomsName" :key="index">
							<view class="scroll-view">
								<view v-for="(item1,index1) in item.list" :key="index1">
									<view v-if="item.list.length!=0">
										<goodCard @getCityNameEmit='detailedName' :item='item1' :isLogin='isShowMoney'
											type='pro' />
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

		<view class="index" style="z-index: 99999999;">
			<wu-app-update></wu-app-update>
		</view>

	</view>
</template>

<script>
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
		getRegionService
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
				serviceTypesList: [],
				isShowMoney: false, //未登录不显示金额
				loading: false, //是否展示 “正在加载” 字样
				loaded: false, //是否展示 “已加载全部” 字样
				titleHeight: 60, //小程序的搜索框顶部高度
				typesList: [], //一级分类
				iconList: [{
						name: '水管台盆',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/dd229a61f282420dbd4834b7df8ff118.png",
					},
					{
						name: '线路电器',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/931927a4bfda4cce9ea6c8ddb6833fcb.png",
					},

					{
						name: '门窗维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/d70cff4580e343d0b476d614e6060d34.png",
					},
					{
						name: '家俱维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/05/25/5c9d6721a9cc42d8b36055b44f44b3b1.png",
					},
					{
						name: '金属制品',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/1f949be9b75146899ac5163dfb724f6c.png",
					},
					{
						name: '油漆涂料',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/caf8ac6839ef4102a4fef58e623ae66b.png",
					},
					{
						name: '厨具设备',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/f829573a5ff14a14aeb24cc29daccf42.png",
					},
					{
						name: '制冷设备',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/aeb9f00486e74e2581ea821d3a62c7c5.png",

					},
					{
						name: '灯具维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/41eb8bd3850d46eb8da998031132969b.png",
					},
					{
						name: '空调维修',
						url: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/919ae79b3192417387cbfe81c4f3d971.png'

					},
					{
						name: '油烟排风',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/80da0c42b64b4503989c8ebf79ed3e6c.png",

					},
					{
						name: '墙面维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/c9999ed56ab0408b9a8f81832c1a897a.png",

					},
					{
						name: '地面维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/fa9899041b4b43f1b98ce2f6cd4da8a1.png",

					},

					{
						name: '顶面维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/96b3449ca2f04f0f904ae049069f69eb.png",
					},
					{
						name: '弱电设备',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/e4e296ff88864e45877ff619b8588b0a.png",
					},
					{
						name: '景观维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/e3c94b4ad35b432ca9d808ebc2b9682f.png",
					},
					{
						name: '软装配饰',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/2b6e994786e343ba9e2e97d178868732.png",
					},
					{
						name: '广告招牌',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/4cb33e4d1a614bda86187d7fd7d1732e.png",
					},
					{
						name: '清洗服务',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/07/8812ed60654c4087a5b1ca4d50932a06.png",
					},
					{
						name: '装修维修',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/29/c47d79d25ff342b08afdb70e5eef7224.png",
					},
					{
						name: '燃气设备',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/29/f92abc90e9ba4f17ad0443a2509a3c6c.png",
					},
					{
						name: '电器设备',
						url: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/29/69fa6dc417e446f08cb77b85a37d6198.png",
					}
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
					pageSize: 10
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
				timer: '',
				promiseList: [false, false],
				carNum: 0,
				typeName: undefined,
				isIos: false
			}
		},
		onReady() {
			this.scrollHeight = uni.$u.sys().windowHeight - this.offsetTop
		},
		watch: {
			promiseList: {
				handler(n) {
					console.log(n, '<<<0---------------n', this.tabHeight);
					if (n.every(item => item)) {
						this.$nextTick(() => {
							uni.createSelectorQuery().in(this).select('#bottom')
								.boundingClientRect(data => {
									uni.createSelectorQuery().in(this).select('.content')
										.boundingClientRect(data1 => {
											console.log(data1, data);
											this.scrollTop = data.top - data1.top
											if (this.tabHeight == 0) {
												console.log(1111111111111, '22222222222');
												this.tabHeight = data1.top
											}

											console.log(this.scrollTop,
												'<<<-----------------scrollTop----watch', this
												.tabHeight);
										}).exec();

								}).exec();
						})
					}
				},
				immediate: true
			}
		},
		onPageScroll(e) {
			// console.log((e.scrollTop).toFixed(0),(this.scrollTop).toFixed(0));
			if ((e.scrollTop).toFixed(0) * 1 >= (this.scrollTop).toFixed(0) * 1) {
				//	console.log(this.tabsBg, 'lllllllllllllllllllllllllllll---216', e.scrollTop, this.scrollTop + 55);
				this.tabsBg = '#fff'
			} else {
				this.tabsBg = '#F5F9FA'
			}
			this.opacity = parseFloat((e.scrollTop / 80).toFixed(1) * 1) > 1 ? 1 : parseFloat((e.scrollTop / 80).toFixed(
				1) * 1)
		},
		onShow() {
			if (storage.get('AccessToken')) {
				getCarNum().then(res => {
					this.carNum = res

				});
				getOrderNum().then(res => {
					res==0?uni.removeTabBarBadge({
						index:3
					}):uni.setTabBarBadge({
						index: 3,
						text: res
					})
					
				})
			}

			console.log('onshowinshow');
			// #ifdef MP-WEIXIN
			this.getHeight();
			this.navHeight = 100
			this.titleHeight = 120
			this.offsetTop = 145

			// #endif
			//this.queryParams.pageNum = 1
		
			uni.getStorage({
				key: 'AccessToken',
				complete: (res) => {
					console.log();
					this.isShowMoney = Boolean(res.data)
					this.getList()
					if (this.isShowMoney) {
						this.queryState();
						getC2cUnreadMsgNum().then(res => {
							console.log(res,'4266666666');
							queryUnreadNum().then(ress => {
								
								let num = (parseInt(res.data.AllC2CUnreadMsgNum)?parseInt(res.data.AllC2CUnreadMsgNum):0) + parseInt(ress
									.data.num)
								if (num > 0) {
									uni.setTabBarBadge({
										index: 2,
										text: num + ''
									})
								} else {
									uni.removeTabBarBadge({
										index: 2
									})
								}
							})
						})
					}
					const apps = getApp()
					console.log(apps.type);
					if (apps.type == 'login') {
						this.queryParams.pageNum = 1
						this.getServiceSymptomsHandle()
					} else {
						this.getServiceSymptoms()
					}
				}
			})



			this.getCityName('unInit')

			uni.$on('totalUnreadCount', function(data) {
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				getC2cUnreadMsgNum().then(res => {
					queryUnreadNum().then(ress => {
						let num = parseInt(res.data.AllC2CUnreadMsgNum) + parseInt(ress.data.num)
						if (num > 0) {
							uni.setTabBarBadge({
								index: 2,
								text: num + ''
							})
						} else {
							uni.removeTabBarBadge({
								index: 2
							})
						}
					})
				})
			})
			
			let that = this
			uni.getStorage({
				key: 'SYSTEM_INFO',
				success(res) {
			
					that.isIos = res.data.osName == 'ios'
					console.log(that.isIos, '29888888888888');
				}
			})

		},
		onHide() {
			console.log('onhide');
			const apps = getApp()
			apps.type = undefined
			//	clearInterval(this.timer);
		},
		onLoad() {
			this.getServiceTypesList()
			console.log('onloadonload.......');
			this.locationStatus = ''

			console.log(this.locationStatus);
			uni.getStorage({
				key: 'AccessToken',
				complete: (res) => {
					this.getServiceSymptomsHandle()
					this.isShowMoney = Boolean(res.data)
					if (this.isShowMoney) {
						this.queryState();
					}
				}
			})


			console.log(this.cityName, '255555555555');
			// //this.timer = setInterval(() => {
			// 	this.getCityName()

			// 	if (this.cityName != '获取位置中...') {
			// 		clearInterval(this.timer);

			// 	}
			// }, 1000)



		},

		methods: {
			getServiceTypesList() {
				getService().then(res => {
					console.log(res);
					this.serviceTypesList = res.data
				})
			},
			getCityName(type) {

				var that = this
				uni.getStorage({
					key: 'city',
					success: function(res) {
						console.log(res);
						that.cityName = res.data
					},
					fail(res) {
						if (type != 'unInit') {
							// #ifdef MP-WEIXIN
							that.getLoction()
							// #endif
							// #ifdef APP-PLUS
							that.getLoction()
							// #endif
							// this.timer = setInterval(() => {


							// 	if (this.cityName != '获取位置中...') {
							// 		clearInterval(this.timer);

							// 	}
							// }, 100)

						}

					}
				});
			},
			queryState() {
				accountQueryState().then(res => {
					if (res.data.QueryResult[0].State == 'Offline') {
						getUserSig().then(ress => {
							uni.$TUIKit.login({
								userID: res.data.QueryResult[0].To_Account,
								userSig: ress.msg
							}).then(function(imResponse) {
								if (imResponse.data.repeatLogin === true) {
									// 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
									console.log(imResponse.data.errorInfo);
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
				console.log('触底');
				this.bottomNum++
				console.log(this.serviceSymptomsName[this.currentIndex]);
				if (this.serviceSymptomsName[this.currentIndex].list.length < this.serviceSymptomsName[this.currentIndex]
					.total) {
					console.log(1111);
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

			getServiceSymptomsHandle() {
				//获取故障现象
				this.loading = true
				console.log(this.isShowMoney, '.....328');
				console.log(this.queryParams.pageNum, 'numnum 111111111');
				return getServiceSymptoms(this.queryParams).then(res => {
					console.log(res, '.............331', this.queryParams);
					this.loading = false

					this.serviceSymptomsName = res.data.map((d, i) => ({
						name: d.symptomsName,
						list: this.queryParams.pageNum === 1 ? d.productVoList.records.map(rec => ({
								...rec,
								servicePrice: !this.isShowMoney && rec
									.servicePrice != null ? this.replaceMoney(rec
										.servicePrice) : rec.servicePrice
							})) : this
							.serviceSymptomsName[i].list.concat(d.productVoList.records.map(rec => ({
								...rec,
								servicePrice: !this.isShowMoney && rec
									.servicePrice != null ? this.replaceMoney(rec
										.servicePrice) : rec.servicePrice
							}))),
						total: d.productVoList.total
					}))

					console.log(this.serviceSymptomsName);
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
										console.log(data1, data);
										this.scrollTop = data.top - data1.top
										this.tabHeight = data1.top
										console.log(this.scrollTop, data.top, data1.top);
									}).exec();

							}).exec();
					})
				}).finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			getServiceSymptoms() {
				console.log(this.serviceSymptomsName);
				this.loading = true

				this.serviceSymptomsName = this.serviceSymptomsName.map((d, i) => ({
					name: d.name,
					list: d.list.map(rec => ({
						...rec,
						servicePrice: !this.isShowMoney && rec.servicePrice != null ? this
							.replaceMoney(rec
								.servicePrice) : rec.servicePrice
					})),
					total: d.total
				}))
				this.loading = false
				console.log(this.serviceSymptomsName);
			},
			getList() {
				this.promiseList.splice(0, 1, false)
				//获取一级分类
				getServiceType().then(res => {
					console.log(res);
					this.typesList = res.data
					this.typesList.forEach((item, index) => {
						this.iconList.forEach((icon, ii) => {
							if (item.typeName == icon.name) {
								item['iconUrl'] = icon.url
							}

						})
					})
				}).finally(() => {
					console.log('580------>>>>');
					this.promiseList.splice(0, 1, true)
				})
				//this.promiseList.splice(1, 1, false)
				//获取热门报修
				// getHotService().then(res => {
				// 	//	console.log(res, '1111111111111');

				// 	if (res.data != []) {
				// 		res.data.forEach(item => {
				// 			item.imgs = item.serviceImg.split(',')
				// 			item.servicePrice = !this.isShowMoney ? this.replaceMoney(item
				// 					.servicePrice) :
				// 				item.servicePrice
				// 		})
				// 	}
				// 	this.hotServiceList = res.data
				// 	this.hotServiceListFour = this.hotServiceList.filter((item, index) => index <= 3)
				// }).finally(() => {
				// 	this.promiseList.splice(1, 1, true)
				// })
				this.promiseList.splice(1, 1, false)

				//获取故障区域
				getRegionService().then(res => {
					console.log(res);
					this.regionService = res.data
				}).finally(() => {
					this.promiseList.splice(1, 1, true)
				})


			},
			getLoction() {
				var that = this
				console.log('2-----------------222222222222222222222');
				//获取地址
				//	this.checkForAuthorization('scope.userLocation', 'locationAuthorized').then((res) => {

				uni.getLocation({
					isHighAccuracy: true,
					highAccuracyExpireTime: 1234,
					type: 'gcj02',
					success: (suc) => {
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
						// uni.showToast({
						// 	title: err.errMsg,
						// 	icon: "none"
						// })
					}
				})
				//	})



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
				this.timer = setInterval(() => {
					this.getCityName()

					if (this.cityName != '获取位置中...') {
						clearInterval(this.timer);

					}
				}, 800)
				arr.forEach(item => {
					item.servicePrice = !this.isShowMoney && item.servicePrice != null ? this.replaceMoney(item
							.servicePrice) :
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
			detailedName() {
				this.timer = setInterval(() => {
					this.getCityName()

					if (this.cityName != '获取位置中...') {
						clearInterval(this.timer);

					}
				}, 800)
			},
			//详情
			goDetailed(item) {
				// this.timer = setInterval(() => {
				// 	this.getCityName()

				// 	if (this.cityName != '获取位置中...') {
				// 		clearInterval(this.timer);

				// 	}
				// },100)
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
				num != 1 &&
					uni.pageScrollTo({
						scrollTop: this.scrollTop
					});
				this.currentIndex = item.index


			},
			//跳转服务页
			goService(name) {
				
				this.typeName = name
				
				if (this.isIos) {
					this.changeAuth()
				} else{
					this.$refs['authpup'].open()
				}
				
			
			},
			changeAuth() {
				this.timer = setInterval(() => {
					this.getCityName()

					if (this.cityName != '获取位置中...') {
						clearInterval(this.timer);

					}
				}, 800)

				this.serviceTypesList.forEach((item, indexx) => {
					if (item.typeName == this.typeName) {
						getApp().index = indexx
						uni.switchTab({
							url: '/pages/service/service'
						})
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
		// min-height: 100vh;
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
			color: #fff;
			align-items: center;
			display: flex;

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
			margin-left: 20rpx;
			width: 77%;

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