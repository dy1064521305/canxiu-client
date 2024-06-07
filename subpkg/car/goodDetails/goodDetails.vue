<template>
	<scroll-view class="serviceInfo" ref="target" :scroll-y="true">

		<!-- 服务详情 -->
		<view class="top">
			<view class="navbar" :style="{'top':(statusHeight*2)+'rpx'}">
				<u-icon name="arrow-left" size="19" @click="goBack()"></u-icon>
				<text>拱墅区</text>
			</view>
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
				<view :class="['prices',goodInfo.preferentialPrice!=null?'price-img':'']">
					<view class="top">
						<text
							style="font-size: 43rpx;">{{goodInfo.preferentialPrice!=null?goodInfo.discountPrice:goodInfo.projectAmount}}</text>
						<text style="font-size: 27rpx;">元</text>
						<text v-if="goodInfo.preferentialPrice!=null">已补贴￥{{goodInfo.preferentialPrice}}</text>
					</view>
					<view v-if="goodInfo.preferentialPrice!=null" style="font-size: 22rpx;">
						日常价：{{goodInfo.projectAmount}}元
					</view>

				</view>
				<view style="margin:15rpx 0 ;">{{goodInfo.serviceName}}</view>
				<view>
					{{goodInfo.serviceDescription}}
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
						button-size="27" color="#ffffff" bgColor="#A4D091" :asyncChange="true" iconStyle="color: #fff"
						@change='numChange'>
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
				<u-rate :count="count" v-model="appraiseList[0].num" allowHalf activeColor='#ec9322' readonly></u-rate>
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
			<u-tabs :list="list" @click="click" lineColor="black" :scrollable='false' placeholder></u-tabs>
			<!-- 对应的盒子模块 -->
			<view class="main0">
				<view class="title">
					服务内容
				</view>
				<view v-if="goodInfo.projectImg!=null">
					<image v-for='(img,imgi) in goodInfo.projectImg.split(",")' :key="imgi" :src="img"
						style="width:100%;"></image>
				</view>
			</view>
			<view class="main1">
				<view class="title">
					<text>收费标准</text>
					<view style="color: #A5A7A7;float: right;display: flex;">收费项说明<u-icon name="info-circle"></u-icon>
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
				<view class="title">
					材料清单
				</view>
				<view class="cell">
					<u-collapse :border='false'>

						<u-collapse-item v-for="(item,index) in melList" :key="index" :title="item.name"
							name="Docs guide">
							<view v-for="(ch,chindex) in item.list" :key='chindex'
								style="display: flex;justify-content: space-between;margin-bottom: 20rpx;">
								<text style="width: 70%;" v-for="(s,si) in Object.values(JSON.parse(ch.materialSpecs))"
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

		<view class="bgf" style="margin-top: 20rpx;padding: 20rpx;">
			<view style="font-size: 30rpx;">
				维修小百科
			</view>
			<view style="margin: 10rpx 0 0 10rpx;">
				{{goodInfo.standard.standardName}}
				<view style="font-size: 22rpx;color: #A5A7A7;margin-top:20rpx ;">服务分类：{{goodInfo.standard.serviceType}}
				</view>
			</view>
		</view>

		<view class="bgf" style="height:212rpx;">
		</view>
		<view class="bottom" v-if="preferentialShow==false&&coudanShow==false">

			<view class="bottom-top" v-if='isLogin'>
				<view class="">
					共{{projectForm.projectNumber}}项,合计¥{{(Number(projectForm.projectNumber)*Number(goodInfo.discountPrice)).toFixed(2)}}
					<text 
						v-if="(Number(projectForm.projectNumber)*Number(goodInfo.discountPrice)).toFixed(2)<Number(goodInfo.startingFreeDiscount)">
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
				<!-- 	<view class="detail-price">

					<view v-if='isLogin' style="font-size: 34rpx;font-weight: bold;">
						¥{{projectVoList.reduce((p, c) => p + ((Number(c.projectNumber)?Number(c.projectNumber):0) * Number(c.discountPrice)), 0)}}
					</view>
					<view
						v-if="projectVoList.reduce((p, c) => p + ((Number(c.projectNumber)?Number(c.projectNumber):0) * Number(c.preferentialPrice)), 0)!=0"
						style="margin-left: 5rpx;font-size: 21rpx;" @click="preferentialShow=true">
						品牌优惠¥{{projectVoList.reduce((p, c) => p + ((Number(c.projectNumber)?Number(c.projectNumber):0) * Number(c.preferentialPrice)), 0)}}>
					</view>

				</view> -->
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

		<u-overlay :show="shows" @click="overlayClose">
			<view class="warp">
				<view class="rect">
					<view style="width: 100vw;">
						<image :src="imageUrl" mode="" style="height: 978rpx;"></image>

					</view>
					<view class="btn">
						<view>
							<image
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/23/b0615fa4f9774562bf1e8740d9e658f7.png"
								mode="widthFix" @click.stop="shareLink" open-type="share"></image>
						</view>
						<view>
							<image
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/23/625202a5c24344e7bcb630079764172e.png"
								mode="widthFix" @click.stop="save"></image>
						</view>
					</view>
				</view>
			</view>
		</u-overlay>


		<view v-if="cardShow">
			<!-- #ifdef H5 -->
			<l-painter ref="painter" :board="base" @success="hldsz" custom-style="position: relative;" height="1624rpx"
				isCanvasToTempFilePath useCORS />
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<l-painter ref="painter" :board="base" @success="hldsz" custom-style="position:relative;margin-left:1000rpx"
				height="978rpx" isCanvasToTempFilePath />
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<l-painter ref="painter" :board="base" @success="hldsz" custom-style="position:relative;margin-left:1000rpx"
				height="978rpx" isCanvasToTempFilePath />
			<!-- #endif -->
		</view>

		<!-- 未登录去登录 -->
		<u-modal :show="isShowLogin" title="提示" width="400rpx" showCancelButton confirmText='去登录' confirmColor='#A4D091'
			@cancel='isShowLogin = false' @confirm='confirm'>
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
				<u-empty v-else mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text='没有找到哦，换个关键词试一下吧'>
				</u-empty>
			</view>
		</u-popup>
		<!-- 品牌优惠弹框 -->
		<u-popup :show="preferentialShow" closeable @close="preferentialShow=false">
			<view class="preferential">
				<view class="title">优惠明细</view>
				<view class="main">
					<view class="line">
						<text>服务合计(不含材料费)</text>
						<text>¥{{projectVoList.reduce((p, c) => p + ((Number(c.projectNumber)?Number(c.projectNumber):0) * Number(c.projectPrice)), 0)}}</text>
					</view>
					<view class="line">
						<text>优惠合计(已下单为准)</text>
						<text>-¥{{projectVoList.reduce((p, c) => p + ((Number(c.projectNumber)?Number(c.projectNumber):0) * Number(c.preferentialPrice)), 0)}}</text>
					</view>
					<view style="margin-left: 20rpx;" class="line">
						<text><text class="vip">会员</text>品牌会员优惠</text>
						<text>¥{{projectVoList.reduce((p, c) => p + ((Number(c.projectNumber)?Number(c.projectNumber):0) * Number(c.preferentialPrice)), 0)}}</text>
					</view>

				</view>
				<view class="line">
					<text>合计</text>
					<text>¥{{projectVoList.reduce((p, c) => p + ((Number(c.projectNumber)?Number(c.projectNumber):0) * Number(c.discountPrice)), 0)}}</text>
				</view>
				<view class="btn btn-green" @click="preferentialShow=false">
					知道啦
				</view>
			</view>
		</u-popup>




	</scroll-view>



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
				shows: false,
				cardShow: false, //卡片的显示
				imageUrl: '',
				count: 5,
				path: '',
				base: {},
				show: false,
				goodInfo: {},
				serviceImgList: [],
				currentNum: 0,
				projectVoList: [], //服务项目
				query: {},
				isLogin: storage.get('AccessToken'),
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
				isShowLogin: false
			}
		},
		onLoad(options) {
			// console.log(this.isLogin);
			// console.log(options);
			let name = uni.getStorageSync('address_refreash')
			this.query.address = name
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
			// uni.showShareMenu({
			// 	menus: ['shareAppMessage', 'shareTimeline']
			// })
		},
		onShow() {
			console.log('onshowonshowwwwwww');
			// #ifdef MP-WEIXIN
			const res = uni.getMenuButtonBoundingClientRect()
			this.statusHeight = res.top //胶囊距离顶部
			// #endif
			// #ifdef APP-PLUS
			this.statusHeight = 0
			// #endif
			console.log(this.statusHeight, '448888888');
			this.isLogin = storage.get('AccessToken')
			//获取购物车数量
			if (this.isLogin) {
				this.getCarList()
				// this.getInfo()
				this.priceDifference = 0
				this.projectNumber = 0
			}

		},
		methods: {

			click(e) {
				this.current = e

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
					name: this.searchName
				}).then(res => {
					this.coudanList = res.data
				})
			},
			//获取详细信息
			getInfo() {

				getServiceInfo(this.query).then(res => {
					this.goodInfo = res.data
					console.log(this.goodInfo, 'goodInfogoodInfogoodInfo');

					// uni.setNavigationBarTitle({
					// 	title: this.goodInfo.serviceName
					// })

					for (let key in this.goodInfo.materialVoMap) {
						console.log(key, '1677777777');
						this.melList.push({
							name: key,
							list: this.goodInfo.materialVoMap[key]
						})
					}
					//收费标准
					this.priceList = [{
							name: '维修服务费',
							price: this.goodInfo.projectAmount + '元/次'
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
							price: this.goodInfo.urgentPrice + '元/次(订单金额' + this.goodInfo.urgentDivided + '%)',
						},
					]

					//获取凑单列表
					if (this.isLogin) {
						// this.getCarList()
						this.getListByWorkerType()
					}

					//获取评论
					order.appraiseList({
						productId: this.goodInfo.serviceId,
						appraiseStatus: 1,
						pageNum: 1,
						pageSize: 10
					}).then(res => {
						console.log(res);
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
						this.goodInfo.serviceImg.split(',') : [],
						this.goodInfo.projectVoList.forEach((p, i) => {
							this.projectVoList.splice(i, 1, p)
						})
					this.projectVoList.forEach(item => {
						item.serviceProjectImg = item.projectImg,
							item.projectImg = '',
							item.productId = this.goodInfo.serviceId
						// item.remarks=''
					})
					console.log(this.projectVoList);
					if (!this.isLogin) {
						this.projectVoList.forEach(item => {
							item.discountPrice = this.replaceMoney(item.discountPrice)
						})
						this.goodInfo.startingFreeDiscount = this.replaceMoney(this.goodInfo.startingFreeDiscount)
					}
					this.goodInfo.remark = this.goodInfo.remark != '' && this.goodInfo.remark != null ? this
						.goodInfo.remark.replace(/<img/gi, '<img style="width:100%;height:auto"')
						.replace(/<section/g, '<div')
						.replace(/\/section>/g, '\div>') : ''
					console.log(this.goodInfo, '11111111111372222222222');

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

			//分享
			shareInfo() {

				this.base = {
						width: '605rpx',
						views: [{
								type: 'image',
								src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+oAAAZUCAYAAAB2ZvhwAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3X/I7nddx/HXZ3ObP3BbTif4oxU2mMMpYf9oK/Bny4ULKvyxpKY0RQPdglDK/BkK0aaQpQuVUFOpSKWjSy2hTP9Jwk3mYAktf4DTLaeYbnP7xseuwXFzO+c+576v72vnflxw/to59/W+Hu+3fzy9r/u6R47isSzLSHJKkp9I8jNJfiHJOUnOSnJakpOTnHQUT+GfEiBAgAABAgQIECBAgACBNoFbknw7yY1Jrk1ydZJ/TfKfSf4nyc1jjOVIh56hvePHsizHJ3l8kqds4vznkjxqx1/IPyBAgAABAgQIECBAgAABAseOwFeS/Psm2j+V5Koxxu07fXk7DvVlWR6d5NVJzkvy8CQn7vRJ/X0CBAgQIECAAAECBAgQIHAMC9ya5OtJPpbkjWOML+/ktR5WqG/e4v6QJM+bT7J5u/tOnsffJUCAAAECBAgQIECAAAEC+1Hg5iR/mOT9SW46nLfEH26oPyHJGzbfRT9hP8p6zQQIECBAgAABAgQIECBA4AgFbkty5Qz2McZVh/oahwz1ZVmenuQvk/xkkuMO9QX9dwIECBAgQIAAAQIECBAgQOBuAnck+e8kvzPG+OS9+dxjqC/LMn/2/PlJLk9yKmQCBAgQIECAAAECBAgQIEDgqAW+leTSJO8bY8yfZb/b495C/beT/EmShx71GL4AAQIECBAgQIAAAQIECBAgcKfAN5P8/hjj3Ycd6pu3u/+N76S7IgIECBAgQIAAAQIECBAgsCcC8zvrv/Hj3gb/I99R33y6+/z96B9K8lN7MoovSoAAAQIECBAgQIAAAQIECEyB/0pyQZKrD/40+LuG+nyb+7uSnO+D41wNAQIECBAgQIAAAQIECBDYU4H5AXMHklw0xrjxzme6a6j/bpLLkvgVbHu6C1+cAAECBAgQIECAAAECBAj8UGD+6rZLxxh/drdQX5bl0fPb7UlOgUWAAAECBAgQIECAAAECBAhsTeDmJOeMMb48n/GH31FfluX4JH8xf5/b1sbwRAQIECBAgAABAgQIECBAgMCdAlckeekY4/Y7Q/1nk3w4yfyuugcBAgQIECBAgAABAgQIECCwXYH53fQLxhj/MTaf9H5JkjclOXG7c3g2AgQIECBAgAABAgQIECBAIMmtSV6V5PIZ6qcmmb9k/VfRECBAgAABAgQIECBAgAABAqsJzF+VftEM9Z9O8i9JHrXaKJ6YAAECBAgQIECAAAECBAgQ+EqSX5yh/owkH+dBgAABAgQIECBAgAABAgQIrC7wzBnqr0/y6tVHMQABAgQIECBAgAABAgQIECDwhhnqf+/n010CAQIECBAgQIAAAQIECBCoEPjQDPUvJjmrYhxDECBAgAABAgQIECBAgACB/S1w7Qz1G5I8bH87ePUECBAgQIAAAQIECBAgQKBC4Bsz1L+f5KSKcQxBgAABAgQIECBAgAABAgT2t8AtM9SX/W3g1RMgQIAAAQIECBAgQIAAgR4Bod6zC5MQIECAAAECBAgQIECAAIEIdUdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4G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9y2eiKciQIAAAQIECBAgQIAAgTUE5qfBvzDJP+/m71nftVBfluWMJC9L8mK/J32N+/CcBAgQIECAAAECBAgQILCCwPw96+9I8rYxxvW78fxHHerLssxPcn9uktckmbF+4m4M5msQIECAAAECBAgQIECAAIH7iMCtSWakvy7JB8YY863xR/w44lBfluXkJGfOH6BPckGSE454Cv+QAAECBAgQIECAAAECBAjc9wVuSzI/aO5NSa4bY8zvtu/4seNQX5bl9CRP2cT5Lyc5dcfP6h8QIECAAAECBAgQIECAAIFjV+DmJB9N8uHNz69/Yycv9bBCfVmW45KcneRFSc5P8vAkD05yWP9+JwP5uwQIECBAgAABAgQIECBA4BgQWJJ8J8nXkxzYfOj6NWOMOw712sayLDO258+Zzz/3S3JSkgds/jwmyTOTnJfkrCQz2D0IECBAgAABAgQIECBAgACBnQnMQL82yZVJPp7kS0m+t/lzS5IfJJk/2377DPU3Jrn/JswftPlu+SOSzD8PEec7k/e3CRAgQIAAAQIECBAgQIDAIQRmtN+U5GubP/O77t/dRPv3Z6jPb8d7ECBAgAABAgQIECBAgAABAgUCQr1gCUYgQIAAAQIECBAgQIAAAQJ3Cgh1t0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQSfMvGAAAgAElEQVQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahtjWiBwAACAASURBVFEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECBQJCPWiZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgSKBIR60TKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECRQJCvWgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgSIBoV60DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgECRgFAvWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIECgSECoFy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgUCQg1IuWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIECgSEOpFyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAgUCQj1omUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEigSEetEyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAkUCQr1oGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIEiAaFetAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBAkYBQL1qGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAoEhAqBctwygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIFAkINSLlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAoEhDqRcswCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIFAkI9aJlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBIoEhHrRMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQJFAkK9aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBIgGhXrQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQJGAUC9ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQKBIQKgXLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECBQJCDUi5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQKBIQ6kXLMAoBAgQIECBAgAABAgQIEPi/9u4YVvdDjOP4769Rm6KYWiExdKlEYiWRIMTAYhBTJSQGQyMGiS4qkUgwSCwGJpEY1CBEJBJWidBBB4NopyLUpJV65eVcuZpe7eUm/ea+nzv2nnvO8/88z/Ltec95hbobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAg7HBnXgAAIABJREFUQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N2f7PqFAAAJdklEQVQAAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhASEemgZRiFAgAABAgQIECBAgAABAkLdDRAgQIAAAQIECBAgQIAAgZCAUA8twygECBAgQIAAAQIECBAgQECouwECBAgQIECAAAECBAgQIBASEOqhZRiFAAECBAgQIECAAAECBAgIdTdAgAABAgQIECBAgAABAgRCAkI9tAyjECBAgAABAgQIECBAgAABoe4GCBAgQIAAAQIECBAgQIBASECoh5ZhFAIECBAgQIAAAQIECBAgINTdAAECBAgQIECAAAECBAgQCAkI9dAyjEKAAAECBAgQIECAAAECBIS6GyBAgAABAgQIECBAgAABAiEBoR5ahlEIECBAgAABAgQIECBAgIBQdwMECBAgQIAAAQIECBAgQCAkINRDyzAKAQIECBAgQIAAAQIECBAQ6m6AAAECBAgQIECAAAECBAiEBIR6aBlGIUCAAAECBAgQIECAAAECQt0NECBAgAABAgQIECBAgACBkIBQDy3DKAQIECBAgAABAgQIECBAQKi7AQIECBAgQIAAAQIECBAgEBIQ6qFlGIUAAQIECBAgQIAAAQIECAh1N0CAAAECBAgQIECAAAECBEICQj20DKMQIECAAAECBAgQIECAAAGh7gYIECBAgAABAgQIECBAgEBIQKiHlmEUAgQIECBAgAABAgQIECAg1N0AAQIECBAgQIAAAQIECBAICQj10DKMQoAAAQIECBAgQIAAAQIEhLobIECAAAECBAgQIECAAAECIQGhHlqGUQgQIECAAAECBAgQIECAgFB3AwQIECBAgAABAgQIECBAICQg1EPLMAoBAgQIECBAgAABAgQIEBDqboAAAQIECBAgQIAAAQIECIQEhHpoGUYhQIAAAQIECBAgQIAAAQJC3Q0QIECAAAECBAgQIECAAIGQgFAPLcMoBAgQIECAAAECBAgQIEBAqLsBAgQIECBAgAABAgQIECAQEhDqoWUYhQABAgQIECBAgAABAgQICHU3QIAAAQIECBAgQIAAAQIEQgJCPbQMoxAgQIAAAQIECBAgQIAAAaHuBggQIECAAAECBAgQIECAQEhAqIeWYRQCBAgQIECAAAECBAgQICDU3QABAgQIECBAgAABAgQIEAgJCPXQMoxCgAABAgQIECBAgAABAgSEuhsgQIAAAQIECBAgQIAAAQIhAaEeWoZRCBAgQIAAAQIECBAgQICAUHcDBAgQIECAAAECBAgQIEAgJCDUQ8swCgECBAgQIECAAAECBAgQEOpugAABAgQIECBAgAABAgQIhATOof7Xba8IzWQUAgQIECBAgAABAgQIECBwqQJPn0P9yW2vu1QBz02AAAECBAgQIECAAAECBEICvz+H+q+33RcayigECBAgQIAAAQIECBAgQOBSBR47h/p3t33wUgU8NwECBAgQIECAAAECBAgQCAk8cg71z217KDSUUQgQIECAAAECBAgQIECAwKUKPHwO9Xdv+9GlCnhuAgQIECBAgAABAgQIECAQEnjPOdTftO2n2+4JDWYUAgQIECBAgAABAgQIECBwaQJPbHvHOdRfte0bfk790vbveQkQIECAAAECBAgQIEAgJvDItgfOoX5se3DbF7bdGRvSOAQIECBAgAABAgQIECBA4BIEntn2mW1fOUf6TqfTW7d9b9u9l/D0npEAAQIECBAgQIAAAQIECMQEHt/2geM4fnEt1O/Y9rVtH48NahwCBAgQIECAAAECBAgQIHAJAl/f9onjOJ79Z6if/5xOp/N30x/ddtclCHhGAgQIECBAgAABAgQIECAQEXhq2/3HcZy/q75/h/pVrH9y25e2vTwyrDEIECBAgAABAgQIECBAgMDtLPC3bZ86juOr1x7yuaF+99VvgH//tpfdzhKejQABAgQIECBAgAABAgQIvMQCf9/2/W0fPY7jDzcK9XO433/1i+Xe+BIP7MsTIECAAAECBAgQIECAAIHbWeC3V2+V/qvjOE7PG+rX/uPpdHrXtu9sO7/Huj8ECBAgQIAAAQIECBAgQIDArRX487YPHcfx4+d+2v946fv1f3k6nR7Y9sVtr721s/hsBAgQIECAAAECBAgQIEDgogXOL3P/9HEc33w+hf8W6ndu+8i2L/vO+kUfkIcnQIAAAQIECBAgQIAAgVsncP5O+oPbvnUcxzM3FerXPvjqZfDn93N7g18wd+s24zMRIECAAAECBAgQIECAwEUJnH9x3O+2fez5Xu5+vcQNv6N+/QedTqe3bPv8tvd667aLOiQPS4AAAQIECBAgQIAAAQL/v8D5Ldh+uO2h4zh++UKf7sWG+vnjXrPtw1fBftcLfWJ/T4AAAQIECBAgQIAAAQIECOypbZ/d9u1tf7z+t7vfyOZFhfr1//h0Ot17/r8A29637fXbzj/L7g8BAgQIECBAgAABAgQIECDwL4Hzz54/ue0H2x4+juPxm4G56VA/f/LT6XTHtvPL4d+57e3b3rbtnpv5wj6WAAECBAgQIECAAAECBAjcZgJPbPv5tp9t+8m28/ujP3uzz/g/hfq1L3I6nc7//vwy+Fdve/NVtN+/7b5td2975bZX3OxQPp4AAQIECBAgQIAAAQIECIQFnt72l/NL2bc9tu3Rqzj/zbY/bXvqxbzE/UbP9w+IIXXtxKYaJwAAAABJRU5ErkJggg==',
								css: {
									width: '100%',
									height: '100%',
									top: '0rpx',
									left: '0rpx'
								}
							}, {
								type: 'image',
								src: 'data:image/png;base64,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',
								css: {
									width: '163rpx',
									height: '54rpx',
									position: 'absolute',
									top: '42rpx',
									left: '42rpx',
								}
							},
							{
								type: 'text',
								text: '持证上岗·标准化施工·无忧售后',
								css: {
									fontSize: "22rpx",
									position: 'absolute',
									fontWeight: '600',
									top: '54rpx',
									left: '269rpx',
								}
							},
							{
								type: 'image',
								src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA1QAAAAGCAYAAADEz988AAAAAXNSR0IArs4c6QAAAZNJREFUeF7tnEFKA0EQRevP4KaZ8QheykO4cakIrnIGdeORXAieIKBnmJlFBEsYgxEXUqQrEoaXdafo/P71uibdNXL302maLt39wt3PrO4zSXqSdFNKeZb0URdu923miZ74sz6byCPyiDwij/ZUgP2deom6jjp5T3wss56X9CbpsZTyoHEcb9195e4n1SrtAqwlnXdd95IVk3miZ5aXzAx/ku8pdoJLcCnFSF9B4BJcSrETXIJLKUaCS6HnI0nvklYahuE14R/L32u3adv2qpRyn7WozBM9s7xkZvgzUUz0rD7Zh59bBeA8nE9EE5xPFBPOw/ksOy2R8/NJ1aF+mJld931/d+wLwDyzVmiOs0FP9MxQAC7BzwwfbWPApUQx4Xx+Yc2+mWpQ8j1VTuq6iJzzA9Uhjobdfd00zdFf+WOeuVc90RM9I+CJjIFL8DPik8gYuASXIj6JjIFLcCnik8gYuLQcLn1f+aNJnSb1hCufNCvTrEyzMs3KkTrizzHsR+xH7EfVaWTkEXlEHv1PHv18KcUnIEpwowwb7pEAAAAASUVORK5CYII=',
								css: {
									width: '514rpx',
									height: '4rpx',
									position: 'absolute',
									top: '136rpx',
									left: '45rpx',
								}
							}, {
								type: 'image',
								src: this.serviceImgList[0],
								css: {
									width: '489rpx',
									height: '489rpx',
									position: 'absolute',
									top: '159rpx',
									left: '58rpx',
								}
							}, {
								type: 'text',
								text: this.goodInfo.serviceName,
								css: {
									fontSize: "36rpx",
									position: 'absolute',
									fontWeight: '600',
									top: '663rpx',
									left: '56rpx',
								}
							},
							{
								type: 'text',
								text: '¥',
								css: {
									fontSize: "27rpx",
									position: 'absolute',
									top: '730rpx',
									left: '56rpx',
									color: '#EC5722'
								}
							},
							{
								type: 'text',
								text: this.goodInfo.mixPrice,
								css: {
									fontSize: "40rpx",
									position: 'absolute',
									top: '717rpx',
									left: '76rpx',
									color: '#EC5722',
									fontWeight: '600',
								}
							},
							{
								type: 'text',
								text: '/台起',
								css: {
									fontSize: "27rpx",
									position: 'absolute',
									top: '730rpx',
									left: '200rpx',
									color: '#EC5722',
								}
							}, {
								type: 'image',
								src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA1QAAAAGCAYAAADEz988AAAAAXNSR0IArs4c6QAAAZNJREFUeF7tnEFKA0EQRevP4KaZ8QheykO4cakIrnIGdeORXAieIKBnmJlFBEsYgxEXUqQrEoaXdafo/P71uibdNXL302maLt39wt3PrO4zSXqSdFNKeZb0URdu923miZ74sz6byCPyiDwij/ZUgP2deom6jjp5T3wss56X9CbpsZTyoHEcb9195e4n1SrtAqwlnXdd95IVk3miZ5aXzAx/ku8pdoJLcCnFSF9B4BJcSrETXIJLKUaCS6HnI0nvklYahuE14R/L32u3adv2qpRyn7WozBM9s7xkZvgzUUz0rD7Zh59bBeA8nE9EE5xPFBPOw/ksOy2R8/NJ1aF+mJld931/d+wLwDyzVmiOs0FP9MxQAC7BzwwfbWPApUQx4Xx+Yc2+mWpQ8j1VTuq6iJzzA9Uhjobdfd00zdFf+WOeuVc90RM9I+CJjIFL8DPik8gYuASXIj6JjIFLcCnik8gYuLQcLn1f+aNJnSb1hCufNCvTrEyzMs3KkTrizzHsR+xH7EfVaWTkEXlEHv1PHv18KcUnIEpwowwb7pEAAAAASUVORK5CYII=',
								css: {
									width: '514rpx',
									height: '4rpx',
									position: 'absolute',
									top: '788rpx',
									left: '45rpx',
								}
							},
							{
								type: 'image',
								src: 'data:image/png;base64,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',
								css: {
									width: '84rpx',
									height: '49rpx',
									position: 'absolute',
									top: '830rpx',
									left: '42rpx',
								}
							},
							{
								type: 'text',
								text: '让餐饮维修更简单',
								css: {
									position: 'absolute',
									top: '898rpx',
									left: '42rpx',
									fontSize: "29rpx",
									color: '#3D3F3E'
								}
							},

						]


					},

					this.shows = true
				this.cardShow = true
			},
			//分享链接
			shareLink() {
				wx.downloadFile({
					url: this.imageUrl,
					success: (res) => {
						console.log(res);
						wx.showShareImageMenu({
							path: res.tempFilePath
						})
					}
				})

			},
			//保存海报
			save() {
				uni.saveImageToPhotosAlbum({
					filePath: this.imageUrl,
					success: function() {
						uni.$u.toast('保存成功')
					}
				});
			},
			//遮罩层关闭
			overlayClose() {
				this.shows = false
				this.show = false
			},
			//维修车
			goCar() {
				let type = 'goCar'
				this.isLogin ? uni.navigateTo({
					url: '../car/car'
				}).then(res => {}) : this.isShowLogin = true

			},
			goBack() {
				uni.navigateBack()
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
				// if (!this.getRules()) return
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
					projectPrice:this.goodInfo.projectAmount
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

		.bgf {
			background: #FFFFFF;
		}

		.top {

			.navbar {
				position: fixed;
				// top: 105rpx;
				display: flex;
				padding-left: 16rpx;
				z-index: 9999;

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
					background: url(http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/06/0616977a744749ac86c5b97a1728f654.png) no-repeat;
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

		.bottom {

			width: 100%;
			position: fixed;
			bottom: 0;
			font-size: 22rpx;
			z-index: 100000;

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
</style>