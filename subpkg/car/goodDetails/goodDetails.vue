<template>
	<view class="good-detail-page">
		<view class="navbar"
			:style="{padding:(statusHeight*2)+'rpx 0px 24rpx 16rpx',backgroundColor:'rgba(255,255,255,'+navbarColorOpacity+')'}">
			<u-icon name="arrow-left" size="19" @click="goBack()"></u-icon>
			<text>{{city}}</text>
		</view>

		<scroll-view class="serviceInfo" ref="target" :scroll-y="true" :scroll-into-view="scrollIntoView"
			@scroll="pageScroll">


			<!-- 服务详情 -->
			<view class="top">

				<u-swiper v-if="serviceImgList.length!=0" height='564rpx' :list="serviceImgList"
					@change="e => currentNum = e.current" :autoplay="false" indicatorStyle="right: 20px">
					<view slot="indicator" class="indicator-num">

						<text class="indicator-num__text">{{ currentNum + 1 }}/{{ serviceImgList.length }}</text>
					</view>
				</u-swiper>
				<view v-else class="no-img">
					<image style="width:500rpx ;height:400rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
						mode=""></image>
					<text>暂无图片</text>
				</view>
				<view class="info bgf">
					<!-- 	<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/06/0616977a744749ac86c5b97a1728f654.png"
					mode=""></image> -->
					<!-- <view style="font-size: 36rpx;color: #3D3F3E;margin-top: 30rpx;"> -->
					<view
						:style="{'background':Number(goodInfo.discountPrice)<Number(goodInfo.projectAmount)?`url(${goodInfo.imgUrl}) no-repeat`:''}"
						:class="['prices',Number(goodInfo.discountPrice)<Number(goodInfo.projectAmount)?'price-img':'']">
						<view class="top">
							<text style="font-size: 43rpx;">{{goodInfo.discountPrice}}</text>
							<text style="font-size: 27rpx;">元</text>
							<text
								v-if="Number(goodInfo.discountPrice)<Number(goodInfo.projectAmount)">已补贴￥{{goodInfo.preferentialPrice}}</text>
						</view>
						<view v-if="Number(goodInfo.discountPrice)<Number(goodInfo.projectAmount)"
							style="font-size: 22rpx;">
							日常价：{{goodInfo.projectAmount}}元
						</view>

					</view>
					<view style="margin:15rpx 0 ;">{{goodInfo.serviceName}}</view>
					<view>
						{{goodInfo.serviceDescription||""}}
					</view>
				</view>
			</view>
			<view class="services bgf">
				<!-- :submit="projectVoList.length>1" -->
				<!-- 	<proInfo :list='projectVoList' :isCar='false' :isJoinCar='isJoinCar' :question='true' @getCheck='getCheck'
					:types='types' @textareaInput='textConfirm' ref="proInfo" @getDeleteUrlList='getDeleteUrlList' /> -->
				<view class="service_top">
					<view class="">
						<view>服务数量<text style="color: #3D3F3E;">(单位：{{goodInfo.projectCompany}})</text></view>
						<u-number-box min='1' disabledInput v-model="projectForm.projectNumber" class='number'
							button-size="27" color="#ffffff" bgColor="#A4D091" :asyncChange="true"
							iconStyle="color: #fff" @change='numChange'>
						</u-number-box>
					</view>
					<view>
						如有多处需要维修/维保，请按照数量加购
					</view>
				</view>
				<view class="remark">
					<view>
						<view class="">
							<text style="color: red">*</text><text
								style="margin:0 30rpx 14rpx 10rpx;font-size: 33rpx;">上传视频/图片</text>
						</view>
						<view style="color: #A5A7A7;font-size: 22rpx;margin: 19rpx 0;">
							请上传1-9张现场环境或设备故障视频/图片信息
						</view>
						<view style="width: 100%;margin: 10.87rpx 0 28.99rpx 0;">
							<cl-upload :listStyle="{
												columnGap: '10rpx',
												columns:'4',
												rowGap:'10rpx'
												}" :imageFormData="{
													size:10
												}" :videoFromData="{
													size:10
												}" v-model="projectForm.projectImg" :headers="headers" :action="action" @onSuccess="onSuccesss"
								@input='onInput'></cl-upload>
						</view>
					</view>

					<view style="align-items: center;">
						<view style="font-size: 33rpx;">故障描述</view>
						<view style="font-size: 22rpx;color: #A5A7A7;margin: 10rpx 0;">请简单描述故障或特殊需求备注信息</view>
						<view style='width: 100%'>
							<u--textarea height='72' maxlength='50' confirmType="done" v-model="projectForm.remarks"
								placeholder="请输入内容" count></u--textarea>
						</view>
					</view>
				</view>

			</view>

			<view class="comment bgf">
				<view class="title">
					<text>用户评论({{appraiseList.length}})</text>
					<view v-if="appraiseList.length!=0" style="display:flex;align-items: center;" @click="allComment">
						<view style="font-size: 25rpx;color: #CBCFCE;margin-right: 17rpx;">全部</view>
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
							mode=""></image>
					</view>
				</view>
				<view v-if="appraiseList.length!=0" style="margin:30rpx 0 10rpx;display: flex;">
					<u-avatar :src="appraiseList[0].avatarUrl" size="25"></u-avatar>
					<!-- 	<image src="../../static/img/login/loginBg.png" mode=""></image> -->
					<view
						style="font-size: 25rpx;color: #3D3F3E;width:10%;height: 50rpx;line-height: 50rpx;margin-left: 20rpx;">
						{{appraiseList[0].name}}
					</view>
					<u-rate :count="count" v-model="appraiseList[0].num" allowHalf activeColor='#ec9322'
						readonly></u-rate>
					<view
						style="font-size: 25rpx;color: #3D3F3E;height: 50rpx;line-height: 50rpx;width: 50%;text-align: end;">
						{{appraiseList[0].time}}
					</view>
				</view>
				<view v-if="appraiseList.length!=0">
					<u--text :lines="2" :text="appraiseList[0].appraiseContent">
					</u--text>
				</view>
				<view v-if="appraiseList.length!=0" style="display: flex;width:97%;overflow: hidden;">
					<view style='margin:15rpx 10rpx;' v-for="(item, index) in appraiseList[0].imgs" :key="index"
						v-if="index < 3">
						<u-image radius='8px' width="156rpx" height="156rpx" :src="item" mode=""
							@click="previewImage(item)">
						</u-image>
					</view>
					<view v-if="appraiseList[0].imgs.length > 4"
						:style="{ background: `url(${appraiseList[0].imgs[4]})`,margin:' 14rpx 0 0 14rpx',width:'158rpx',height:'156rpx',borderRadius:'14rpx' }">
						<view style="text-align: center;line-height: 156rpx;">
							+{{ appraiseList[0].imgs.length - 4 }}
						</view>
					</view>
				</view>
			</view>

			<view class="detail bgf">
				<view class="tabs" :style="{top:navbarHeight+'px'}"><u-tabs :list="list" @change="tabChange"
						lineColor="black" :scrollable='false' placeholder></u-tabs>
				</view>
				<!-- 对应的盒子模块 -->
				<view class="main0">
					<view class="main-flag" id="main-flag-0" :style="{height:navbarHeight+44+'px'}"></view>
					<view class="title">
						服务内容
					</view>
					<view v-if="goodInfo.projectImg!=null">
						<image v-for='(img,imgi) in goodInfo.projectImg.split(",")' :key="imgi" :src="img"
							style="width:100%;"></image>
					</view>
				</view>
				<view class="main1">
					<view class="main-flag" id="main-flag-1" :style="{height:navbarHeight+44+'px'}"></view>
					<view class="title">
						<text>收费标准</text>
						<view style="color: #A5A7A7;float: right;display: flex;">收费项说明<u-icon
								name="info-circle"></u-icon>
						</view>
					</view>
					<table style="width: 100%;">
						<tr style="background-color: #ecf7f1;">
							<td>费用名称</td>
							<td>价格</td>
						</tr>
						<tr v-for='(item,index)  in priceList' :key="index">
							<td>{{item.name}}</td>
							<td>{{item.price}}</td>
						</tr>
					</table>
				</view>
				<view class="main2">
					<view class="main-flag" id="main-flag-2" :style="{height:navbarHeight+44+'px'}"></view>
					<view class="title">
						材料清单
					</view>
					<view class="cell">
						<u-collapse :border='false'>

							<u-collapse-item v-for="(item,index) in melList" :key="index" :title="item.name"
								name="Docs guide">
								<view v-for="(ch,chindex) in item.list" :key='chindex'
									style="display: flex;justify-content: space-between;margin-bottom: 20rpx;">
									<text
										v-for="(s,si) in ( ch.materialSpecs!=null?Object.values(JSON.parse(ch.materialSpecs)):'')"
										:key="si">
										{{s}}
									</text>
									<text>{{ch.salePrice}}元/{{ch.materialUnit}}</text>
								</view>
							</u-collapse-item>

						</u-collapse>
					</view>
				</view>
			</view>

			<view v-if="goodInfo.standard" class="bgf" style="margin-top: 20rpx;padding: 20rpx;">
				<view style="font-size: 30rpx;">
					维修小百科
				</view>
				<view style="margin: 10rpx 0 0 10rpx;display: flex;
    align-items: center;
    justify-content: space-between;" @click="goStandard">
					<view class="">
						{{goodInfo.standard.standardName}}
						<view style="font-size: 22rpx;color: #A5A7A7;margin-top:20rpx ;">
							服务分类：{{goodInfo.standard.serviceType}}
						</view>
					</view>
					<image style="width: 14rpx;height: 25rpx;    margin-right: 20rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
						mode=""></image>
				</view>
			</view>

			<view class="bgf" style="height:212rpx;">
			</view>




			<view v-if="cardShow">
				<!-- #ifdef H5 -->
				<l-painter ref="painter" :board="base" @success="hldsz" custom-style="position: relative;"
					height="1624rpx" isCanvasToTempFilePath useCORS />
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<l-painter ref="painter" :board="base" @success="hldsz"
					custom-style="position:relative;margin-left:1000rpx" height="978rpx" isCanvasToTempFilePath />
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<l-painter ref="painter" :board="base" @success="hldsz"
					custom-style="position:relative;margin-left:1000rpx" height="978rpx" isCanvasToTempFilePath />
				<!-- #endif -->
			</view>

			<!-- 未登录去登录 -->
			<u-modal :show="isShowLogin" title="提示" width="400rpx" showCancelButton confirmText='去登录'
				confirmColor='#A4D091' @cancel='isShowLogin = false' @confirm='confirm'>
				<view class="slot-content">
					您还未登录,是否去登录
				</view>
			</u-modal>

			<u-toast ref="uToast"></u-toast>
			<!-- 凑单弹框 -->
			<u-popup :show="coudanShow" closeable @close="coudanShow=false">
				<view class="cou-dan">
					<view class="title">服务橱窗</view>
					<!-- 	<u--input @input='getListByWorkerType()' @clear="getListByWorkerType" @confirm="getListByWorkerType"
						clearable v-model="searchName" type="text" placeholder="请输入需要的服务" /> -->
					<view style="padding:10rpx 20rpx;">
						<u-search clearabled placeholder="请输入需要的服务" v-model="searchName" @clear="getListByWorkerType"
							@search="getListByWorkerType" :showAction="false"></u-search>
					</view>

					<view v-if="coudanList.length!=0" class="main">

						<view v-for="(item,index) in coudanList" :key="index">
							<coudan-card :item='item' />
						</view>
					</view>
					<u-empty v-else mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
						text='没有找到哦，换个关键词试一下吧'>
					</u-empty>
				</view>
			</u-popup>


		</scroll-view>
		<view class="bottom" v-if="preferentialShow==false&&coudanShow==false">

			<view class="bottom-top" v-if='isLogin'>
				<view class="">
					共{{projectForm.projectNumber}}项,合计¥{{Number(projectForm.projectNumber)*Number(goodInfo.discountPrice)}}
					<text
						v-if="Number(projectForm.projectNumber)*Number(goodInfo.discountPrice)<Number(goodInfo.serviceStartingFree)">
						（*不足服务起步价）
					</text>
				</view>


				<view @click="coudanShow=true">
					去凑单>
					<!-- 	{{Number(priceDifference)>0?'去凑单>':'继续加购>'}} -->
				</view>
			</view>
			<view class="bottom-bottom">
				<view style="display: flex;position: relative;align-items: center;" @click="goCar">
					<u-badge type="error" max="99" :absolute="true" :offset="[-5,32]" :value="allNum"></u-badge>
					<image
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/722e9538b21641bba55896f3a2c96eea.png"
						mode=""></image>
					<text style="margin-left: 8rpx;">维修车
					</text>
				</view>

				<view style="display: flex;">
					<view class="btn-white" @click="getCheck">
						+加购
					</view>
					<view class="btn-green btn-ban" @click="getOrderHandle">
						立即下单
					</view>
				</view>
			</view>


		</view>
	</view>




</template>

<script>
	import storage from '@/utils/storage'
	import proInfo from '@/components/proInfo/proInfo.vue'
	import lPainter from '@/components/lime-painter/components/l-painter/l-painter.vue'
	import coudanCard from '../components/coudanCard/coudanCard.vue'
	import * as car from '@/api/car.js'
	import {
		getServiceInfo,
		getListCharge
	} from "@/api/service.js"
	import * as order from '@/api/order.js'
	import formatter from '@/utils/formatter.js'
	import {
		generateQrCode
	} from '@/api/captcha.js'
	import {
		callPhone
	} from '@/utils/phone.js'
	import {
		getCarNum
	} from '@/utils/api.js'
	const {
		environment
	} = require('../../../config/environment')
	var checkValues = [];
	export default {
		components: {
			lPainter,
			coudanCard,
			proInfo
		},
		data() {
			return {
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				coudanList: [],
				preferentialShow: false,
				coudanShow: false,
				//去登录显示框
				info: {},
				cardShow: false, //卡片的显示
				imageUrl: '',
				count: 5,
				path: '',
				base: {},
				show: false,
				goodInfo: {},
				serviceImgList: [],
				currentNum: 0,
				query: {},
				isLogin: uni.getStorageSync(`isLogin${storage.get('ClientId')}`),
				isJoinCar: 0, //是否加入维修车
				chargeList: [], //收费标准
				melList: [],
				types: '',
				appraiseList: [],
				qrCode: '', //二维码
				allNum: 0, //购物车数量
				priceDifference: 0, //起步价差价
				projectNumber: 0,
				searchName: '',

				list: [{
						name: '服务内容'
					},
					{
						name: '收费标准'
					},
					{
						name: '材料清单'
					}
				],
				current: '', //切换的下标
				tops: [],
				scrollTop: 0, //距离顶部的距离
				statusHeight: 0,
				projectForm: {
					projectNumber: 1,
					projectImg: [],
					remarks: ''
				},
				priceList: [],
				isShowLogin: false,
				scrollIntoView: '',
				navbarHeight: 0,
				navbarColorOpacity: 0,
				mainFlagTop: 0,
				city: undefined,
				type: ''
			}
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage() {
			return new Promise((resolve, reject) => {
				let data = {
					title: this.goodInfo.serviceName,
					path: '',
					imageUrl: this.serviceImgList[0],
				}
				let id = this.query.typeId ? this.query.typeId : this.query.serviceId
				data.path = '/subpkg/car/goodDetails/goodDetails?typeId=' + id + '&type=share';
				resolve(data)
			})
		},
		onShareTimeline(res) { //分享到朋友圈
			// return new Promise((resolve, reject) => {
			// 	let data = {
			// 		title: this.goodInfo.serviceName,
			// 		path: '',
			// 		imageUrl: this.serviceImgList[0],
			// 	}
			// 	let id = this.query.typeId ? this.query.typeId : this.query.serviceId
			// 	data.path = '/subpkg/car/goodDetails/goodDetails?typeId=' + id + '&type=share';
			// 	resolve(data)
			// })
			let id=this.query.typeId?this.query.typeId:this.query.serviceId
			return {
				query:`typeId=${id}&type=share&address=${this.query.address}`,
				title: this.goodInfo.serviceName,
				path: '/subpkg/car/goodDetails/goodDetails',
				imageUrl: this.serviceImgList[0],
			}
		},
		//#endif
		onLoad(options) {
			// console.log(this.isLogin);
			console.log(options);
			let name = uni.getStorageSync(`address_refreash${storage.get('ClientId')}`)
			this.query.address = name?name:options.address
			this.type = options.type
			this.city = this.query.address.split('-')[2]
			this.query.clientId = !storage.get('ClientId') ? '' : storage.get('ClientId')
			// console.log(this.query);
			if (options.typeId) {
				this.query.typeId = options.typeId
			} else {
				this.query.serviceId = options.serviceId
			}

			this.$nextTick(() => {
				this.getInfo()
			})
			var that = this
			uni.getStorage({
				key: 'city',
				success: function(res) {
					// console.log(res, '246246246');
					//获取收费标准
					getListCharge({
						city: res.data
					}).then(res => {
						that.chargeList = res.data
						// console.log(res);
					})
				}
			});

		},
		onShow() {
			this.isLogin = uni.getStorageSync(`isLogin${storage.get('ClientId')}`)
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this)
					.select(".navbar")
					.boundingClientRect((data) => {
						this.navbarHeight = data.height
						console.log(this.navbarHeight, 'navbarHeight');
					})
					.exec();
				uni.createSelectorQuery().in(this)
					.select("#main-flag-0")
					.boundingClientRect((data) => {
						console.log(data, '......data.............510');
						this.mainFlagTop = data.top
					})
					.exec();
			})
			console.log('onshowonshowwwwwww');
			// #ifdef MP-WEIXIN
			const res = uni.getMenuButtonBoundingClientRect()
			this.statusHeight = res.top //胶囊距离顶部
			// #endif
			// #ifdef APP-PLUS

			uni.getSystemInfo({
				success: (info) => {
					this.statusHeight = info.statusBarHeight

				}
			});
			// #endif
			console.log(this.statusHeight, '448888888');
			// this.isLogin = storage.get('AccessToken')
			//获取购物车数量
			if (this.isLogin) {
				this.getCarList()
				// this.getInfo()
				this.priceDifference = 0
				this.projectNumber = 0
			}

		},
		methods: {
			pageScroll(e) {

				const rate = e.detail.scrollTop / 200
				if (rate > 1 && this.navbarColorOpacity === 1) return (this.navbarColorOpacity = 1)
				this.navbarColorOpacity = rate
			},
			tabChange(e) {
				this.current = e
				this.scrollIntoView = 'main-flag-' + e.index

			},
			getCarList() {

				getCarNum().then(res => {
					this.allNum = res

				})
			},
			otherFun(object) {
				if (object) {
					// console.log(object, 'objectobjectobject')
					this.getInfo()
				}
			},
			getListByWorkerType() {
				car.listByWorkerType({
					clientId: storage.get('ClientId'),
					type: this.goodInfo.workerType,
					name: this.searchName,
					address: uni.getStorageSync(`address_refreash${storage.get('ClientId')}`)
				}).then(res => {
					this.coudanList = res.data
				})
			},
			//获取详细信息
			getInfo() {

				getServiceInfo(this.query).then(res => {
					this.goodInfo = res.data
					
					// if (this.type=='share') {
					// 	uni.setNavigationBarTitle({
					// 		title: this.goodInfo.serviceName
					// 	})
					// }
					

					for (let key in this.goodInfo.materialVoMap) {
						this.melList.push({
							name: key,
							list: this.goodInfo.materialVoMap[key]
						})
					}
					console.log(this.melList, '5566666666');
					//收费标准
					this.priceList = [{
							name: '服务起步价',
							price: this.goodInfo.startingFreeDiscount + '元/次'
						}, {
							name: '维修服务费',
							price: this.goodInfo.discountPrice + '元/次'
						},
						{
							name: '检测费',
							price: this.goodInfo.detectionAmount + '元/次'
						},
						{
							name: '上门费',
							price: this.goodInfo.doorFee + '元/趟'
						},
						{
							name: '服务加急费',
							price: this.goodInfo.urgentPrice + '元/次',
						},
					]

					//获取凑单列表
					if (this.isLogin) {
						// this.getCarList()
						this.getListByWorkerType()
					}
					// else {
					// 	this.goodInfo.serviceStartingFree = this.replaceMoney(this.goodInfo.serviceStartingFree)
					// 	this.goodInfo.discountPrice = this.replaceMoney(this.goodInfo.discountPrice)
					// 	this.goodInfo.projectAmount = this.replaceMoney(this.goodInfo.projectAmount)
					// 	this.goodInfo.preferentialPrice = this.replaceMoney(this.goodInfo.preferentialPrice)
					// }

					//获取评论
					order.appraiseList({
						productId: this.goodInfo.serviceId,
						appraiseStatus: 1,
						pageNum: 1,
						pageSize: 10
					}).then(res => {
						res.rows.forEach(item => {
							let num = (Number(item.attitudeScore) + Number(item.technicalScore) +
								Number(item.velocityScore)) / 3
							item.num = Math.floor(num)
							item.imgs = item.appraiseImg != null ? item.appraiseImg.split(',') :
							[],
								item.name = item.clientName != null && item.clientName != '' ? item
								.clientName[0] + '*' : '**'
							item.time = formatter.transDate(item.createTime).one
						})

						this.appraiseList = res.rows

					})
					//获取二维码
					generateQrCode({
						codeStatus: 'c',
						page: 'pages/home/index',
						// scene: 'a=1'
					}).then(async res => {
						console.log(res);
						//this.qrCode = await this.Tobase(res.msg)
						//console.log(this.qrCode);
					})

					this.serviceImgList = this.goodInfo.serviceImg !== null && this.goodInfo.serviceImg !== "" ?
						this.goodInfo.serviceImg.split(',') : []

				})



			},
			//将钱替换为星号
			replaceMoney(i) {
				console.log(i);
				return i.replace(/[0-9]/g, "x")
			},
			hldsz(e) {
				this.path = e
				uni.getImageInfo({
					src: this.path,
					success: (res) => {
						this.imageUrl = res.path
						this.cardShow = false
					}
				})
			},
			previewImage(e) {
				wx.previewImage({
					current: e, // 当前显示图片的http链接
					urls: this.appraiseList[0].imgs, // 需要预览的图片http链接列表
				})
			},
			//所有评论
			allComment() {
				uni.navigateTo({
					url: '../allComments/allComments?id=' + this.goodInfo.serviceId
				})
			},


			//维修车
			goCar() {
				let type = 'goCar'
				this.isLogin ? uni.navigateTo({
					url: '../car/car'
				}).then(res => {}) : this.isShowLogin = true

			},
			goBack() {
				this.type == 'share' ? uni.switchTab({
					url: '/pages/home/index'
				}) : uni.navigateBack()

			},
			//去登录
			confirm() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
				this.isShowLogin = false
			},

			onSuccesss(reslut) {
				console.log(reslut);
				this.projectForm.projectImg.push(reslut.data.url)
			},
			onInput(data) {
				console.log(data);
				this.projectForm.projectImg = data.list
			},
			getCheck() {
				// if (!this.isLogin) {
				// 	this.isShowLogin = true
				// 	return
				// }
				console.log(this.getRules());
				if (!this.getRules()) return
				let carArr = []
				carArr.push({
					clientId: storage.get('ClientId'),
					productId: this.goodInfo.serviceId,
					projectPrice: this.goodInfo.projectAmount,
					projectNumber: this.projectForm.projectNumber,
					projectId: this.goodInfo.projectId,
					projectImg: this.projectForm.projectImg == [] ? undefined : this.projectForm
						.projectImg.toString(),
					remark: this.projectForm.remarks,
					shoppingCartStatus: 0,
					projectType: this.goodInfo.projectType,
					discountPrice: this.goodInfo.discountPrice,
					initialLabor: this.goodInfo.initialLabor,
					// projectVideo: item.projectVideo != [] ? item.projectVideo.toString() :
					// 	undefined,
					workerType: this.goodInfo.workerType
				})

				// //计算起步价差价
				// let total = Number(this.projectVoList[0].projectPrice) * Number(item.item.projectNumber)
				// this.priceDifference = Number(this.goodInfo.startingFreeDiscount) - total
				car.joinCar(carArr).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.showToast({
							title: '操作成功',
							duration: 2000
						});
						this.projectForm = {
								projectNumber: 1,
								projectImg: [],
								remarks: ''
							},
							//获取购物车数量
							this.getCarList()

					}
				})
			},
			numChange(val) {
				console.log(val);
				this.projectForm.projectNumber = val.value
			},
			getRules() {
				if (!this.isLogin) {
					this.isShowLogin = true
					return false
				}
				if (this.projectForm.projectImg == '' || this.projectForm.projectImg.length == 0) {
					this.$refs.uToast.show({
						type: 'error',
						message: '请上传图片/视频'
					});
					return false
				}
				return true
			},
			//下单
			getOrderHandle() {
				console.log(this.getRules());
				if (!this.getRules()) return
				// if (!this.isLogin) {
				// 	this.isShowLogin = true
				// 	return
				// }
				// if (this.projectForm.projectImg == '' || this.projectForm.projectImg.length == 0) {
				// 	this.$refs.uToast.show({
				// 		type: 'error',
				// 		message: '请上传图片/视频'
				// 	});
				// 	return
				// }
				let newSetArray = [] //新数组

				newSetArray.push({
					clientId: storage.get('ClientId'),
					...this.goodInfo,
					...this.projectForm,
					serviceProjectImg: this.goodInfo.serviceImg,
					serviceProductName: this.goodInfo.serviceName,
					projectPrice: this.goodInfo.projectAmount
				})
				console.log(newSetArray);
				let info = {
					checkedList: newSetArray,
					isCar: false
				}
				uni.navigateTo({
					url: '../submitOrder/submitOrder?item=' + encodeURIComponent(JSON.stringify(info))
				})


			},
			//查看维修规范
			goStandard() {
				uni.navigateTo({
					url: './standardContent/standardContent?info=' + encodeURIComponent(JSON.stringify(this
						.goodInfo.standard))
				})
			}


		},
	}
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.serviceInfo {
		height: 100vh;

		.top {



			.no-img {
				width: 100%;
				height: 564rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				text {
					font-size: 50rpx;
					color: #A4D091;
				}
			}

			.indicator-num {
				padding: 2px 0;
				background-color: rgba(0, 0, 0, 0.35);
				border-radius: 100px;
				width: 35px;
				@include flex;
				justify-content: center;

				&__text {
					color: #FFFFFF;
					font-size: 12px;
				}
			}


			.info {
				// display: flex;
				padding: 25rpx;
				font-size: 36rpx;
				color: #3D3F3E;
				align-items: baseline;

				image {
					width: 100%;
					height: 168rpx;
				}

				.price-img {
					display: flex;
					flex-direction: column;
					justify-content: center;
					background-size: 100% auto !important;
					height: 175rpx;
					padding-left: 24rpx;

				}

				.prices {

					.top {
						color: #EC5722;

						text:nth-child(2) {
							font-size: 15px;
							display: inline-block;
							margin: 0 20rpx 0 10rpx;
						}

						text:nth-child(3) {
							display: inline-block;
							background-color: #ffede7;
							border-radius: 28rpx;
							padding: 11rpx 27rpx;
							font-size: 25rpx;
						}
					}

				}

				view:nth-child(2) {
					font-weight: bold;
					font-size: 36rpx;
					color: #3D3F3E;
				}

				view:nth-child(3) {
					font-size: 22rpx;
					color: #A5A7A7;
				}
			}
		}


		.bgf {
			background: #FFFFFF;
		}



		.services {
			width: 100%;
			margin-top: 20rpx;

			.service_top {
				padding: 28rpx;
				border-bottom: 2rpx solid #F8F8F8;

				view:first-child {
					display: flex;
					font-size: 33rpx;
					justify-content: space-between;
					align-items: center;
				}

				view:nth-child(2) {
					font-size: 22rpx;
					color: #A5A7A7;
					margin-top: 18rpx;
				}
			}

			.remark {
				font-size: 29rpx;
				color: #3D3F3E;
				font-weight: bold;
				padding: 20rpx 28rpx;


			}
		}

		.comment {
			padding: 30rpx 20rpx;
			margin-top: 20rpx;

			.title {
				display: flex;
				justify-content: space-between;
				font-size: 36rpx;
				color: #3D3F3E;

				image {
					width: 14rpx;
					height: 25rpx;
				}
			}
		}

		.detail {
			margin-top: 20rpx;
			padding: 30rpx 20rpx;

			.tabs {
				z-index: 10;
				position: sticky;
				background-color: #fff;
			}

			.main0,
			.main1,
			.main2 {
				position: relative;

				.main-flag {
					position: absolute;
					top: 0%;
					transform: translateY(-100%);
				}
			}

			table {
				margin-top: 10rpx;

				tr {
					display: flex;
					padding: 17rpx 0;

					td {
						flex: 1;
						text-align: center;
					}
				}
			}


			.title {
				margin: 14rpx 0;
			}

			.cell {
				::v-deep.u-cell__body {
					background: rgba(159, 214, 186, 0.2);
					border-radius: 7rpx;
					//margin-top: 10rpx !important;
				}

				::v-deep.u-collapse-item {
					margin-top: 10rpx;
				}

			}
		}



		.rect {
			text-align: center;
			margin-top: 100rpx;

			.btn {
				display: flex;
				justify-content: space-evenly;
				width: 62%;
				margin: 30rpx auto;

				image {
					width: 116rpx;
				}
			}
		}

		.preferential {
			height: 700rpx;

			.title {
				margin: 20rpx;
				font-size: 37rpx;
				text-align: center;
			}

			.main {
				height: 61%;

			}

			.line {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;

				.vip {
					padding: 0rpx 9rpx;
					border: 2rpx solid #999999;
					color: #999999;
					margin-right: 10rpx;
				}
			}

			.btn {
				margin: 0 20rpx;

			}
		}

		.cou-dan {
			height: 88vh;

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

	.good-detail-page {
		height: 100vh;

		.navbar {
			position: fixed;
			top: 0px;
			// top: 105rpx;
			width: 100%;
			display: flex;
			padding-left: 16rpx;
			z-index: 10;

			text {
				display: inline-block;
				background: rgba(0, 0, 0, 0.45);
				padding: 10rpx 20rpx;
				border-radius: 7rpx;
				font-size: 29rpx;
				color: #FFFFFF;
				margin-left: 18rpx;
			}
		}
	}


	.bottom {

		width: 100%;
		position: fixed;
		bottom: 0;
		font-size: 22rpx;
		z-index: 100000;

		.btn-green {
			height: 65rpx;
			background: #A4D091;
			border-radius: 0 34rpx 34rpx 0;
			font-size: 29rpx;
			color: #FFFFFF;
			line-height: 65rpx;
			text-align: center;
			padding: 0 40rpx;
			font-weight: bold;
		}

		.btn-white {
			height: 65rpx;
			background: rgba(159, 214, 163, 0.2);
			border-radius: 34rpx 0 0 34rpx;
			font-size: 29rpx;
			color: #A4D091;
			line-height: 65rpx;
			text-align: center;
			padding: 0 40rpx;
			font-weight: bold;
		}

		.bottom-top {
			color: #fff;
			justify-content: space-between;
			background: linear-gradient(270deg, #A4D091 0%, #769D71 100%);
			border-radius: 14rpx 14rpx 1rpx 1rpx;
			display: flex;
			font-size: 25rpx;
			height: 79rpx;
			line-height: 79rpx;
			padding: 0 20rpx;

			.coudan {
				display: flex;
			}
		}

		.bottom-bottom {
			height: 120rpx;
			// width: 100%;
			display: flex;
			color: #3D3F3E;
			text-align: center;
			align-items: center;
			background: #fff;
			justify-content: space-between;
			padding: 0 20rpx;

			::v-deep.u-badge {
				z-index: 100;
			}

			image {
				width: 54rpx;
				height: 54rpx;
			}

			// image:first-child {
			// 	width: 47rpx;
			// 	height: 43rpx;
			// 	margin: 0 30rpx;
			// }

			.detail-price {
				width: 34%;
				text-align: start;
				color: #EC5722;
				display: flex;
				align-items: center;
			}

		}



	}
</style>