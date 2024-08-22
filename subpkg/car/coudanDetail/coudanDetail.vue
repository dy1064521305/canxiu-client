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
									<text v-for="(s,si) in Object.values(JSON.parse(ch.materialSpecs))" :key="si">
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
				<view style="margin: 10rpx 0 0 10rpx;">
					{{goodInfo.standard.standardName}}
					<view style="font-size: 22rpx;color: #A5A7A7;margin-top:20rpx ;">
						服务分类：{{goodInfo.standard.serviceType}}
					</view>
				</view>
			</view>


			<view class="bgf" style="height:212rpx;">
			</view>

		</scroll-view>
		<view class="bottom">
			<view @click="jionCar" class="btn">
				选好了
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>


	</view>


</template>

<script>
	import storage from '@/utils/storage'
	import proInfo from '@/components/proInfo/proInfo.vue'
	import * as car from '@/api/car.js'
	import {
		getServiceInfo,
		getListCharge
	} from "@/api/service.js"
	import * as order from '@/api/order.js'
	import formatter from '@/utils/formatter.js'
	const {
		environment
	} = require('../../../config/environment')
	var checkValues = [];
	export default {
		components: {
			proInfo
		},
		data() {
			return {
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				isShowLogin: false, //去登录显示框
				info: {},
				shows: false,
				imageUrl: '',
				count: 5,
				value: 2,
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
				types: '',
				appraiseList: [],
				goodOptionInfo: {},
				projectForm: {
					projectNumber: 1,
					projectImg: [],
					remarks: ''
				},
				scrollIntoView: '',
				navbarHeight: 0,
				navbarColorOpacity: 0,
				mainFlagTop: 0,
				statusHeight: 0,
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
				melList: [],
				type: '',
				city: undefined
			}
		},
		onLoad(options) {
			let name = uni.getStorageSync(`address_refreash${storage.get('ClientId')}`)
			this.query.address = name
			this.city = this.query.address.split('-')[2]
			// this.goodOptionInfo = item.goodInfo
			this.query.clientId = storage.get('ClientId')
			console.log(JSON.parse(options.info));
			this.query.serviceId = JSON.parse(options.info).serviceId
			this.type = JSON.parse(options.info).type
			console.log(this.type);
			this.$nextTick(() => {
				this.getInfo()
			})
			var that = this
			uni.getStorage({
				key: 'city',
				success: function(res) {
					console.log(res, '246246246');
					//获取收费标准
					getListCharge({
						city: res.data
					}).then(res => {
						that.chargeList = res.data
						console.log(res);
					})
				}
			});
			// uni.showShareMenu({
			// 	menus: ['shareAppMessage', 'shareTimeline']
			// })
		},
		onShow() {
			console.log(this.query);
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
			this.isLogin = storage.get('AccessToken')
		},
		methods: {
			otherFun(object) {
				if (object) {
					console.log(object, 'objectobjectobject')
					this.getInfo()
				}
			},
			//获取详细信息
			getInfo() {
				//console.log(this.query, 'queryqueryqueryqueryquery');
				getServiceInfo(this.query).then(res => {
					this.goodInfo = res.data
					console.log(this.goodInfo, 'goodInfogoodInfogoodInfo');
					for (let key in this.goodInfo.materialVoMap) {
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
							price: this.goodInfo.urgentPrice + '元/次',
						},
					]

					//console.log(this.goodInfo);
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

					this.serviceImgList = this.goodInfo.serviceImg !== null && this.goodInfo.serviceImg !== "" ?
						this.goodInfo.serviceImg.split(',') : []

					//	console.log(this.projectVoList);
					if (!this.isLogin) {
						this.goodInfo.startingFreeDiscount = this.replaceMoney(this.goodInfo.startingFreeDiscount)
						this.goodInfo.discountPrice = this.replaceMoney(this.goodInfo.discountPrice)
						this.goodInfo.projectAmount = this.replaceMoney(this.goodInfo.projectAmount)
						this.goodInfo.preferentialPrice = this.replaceMoney(this.goodInfo.preferentialPrice)
					}


				})



			},
			numChange(val) {
				console.log(val);
				this.projectForm.projectNumber = val.value
			},
			//将钱替换为星号
			replaceMoney(i) {
				console.log(i);
				return i.replace(/[0-9]/g, "x")
			},
			previewImage(e) {
				console.log(e);
				wx.previewImage({
					current: e, // 当前显示图片的http链接
					urls: this.appraiseList[0].imgs, // 需要预览的图片http链接列表
				})
			},
			onSuccesss(reslut) {
				console.log(reslut);
				this.projectForm.projectImg.push(reslut.data.url)
			},
			onInput(data) {
				console.log(data);
				this.projectForm.projectImg = data.list
			},
			//所有评论
			allComment() {
				console.log(11111);
				uni.navigateTo({
					url: '../allComments/allComments?id=' + this.goodInfo.serviceId
				})
			},
			goBack() {
				uni.navigateBack()
			},
			//维修车
			goCar() {
				let type = 'goCar'
				this.isLogin ? uni.reLaunch({
					url: '../../../pages/car/car?type=' + type
				}).then(res => {
					console.log(res);
				}) : this.isShowLogin = true

			},
			tabChange(e) {
				this.current = e
				this.scrollIntoView = 'main-flag-' + e.index

			},
			pageScroll(e) {

				const rate = e.detail.scrollTop / 200
				if (rate > 1 && this.navbarColorOpacity === 1) return (this.navbarColorOpacity = 1)
				this.navbarColorOpacity = rate
			},
			//去登录
			confirm() {
				// #ifdef H5
				uni.navigateTo({
					url: '/pages/login/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateTo({
					url: '/pages/login/login'
				})
				// #endif
				this.isShowLogin = false
			},
			// //是否是加入维修车
			// joinCar(types) {

			// 	this.types = types
			// 	if (this.isLogin) {
			// 		this.isJoinCar++
			// 	} else {
			// 		this.isShowLogin = true
			// 	}
			// },

			//加入购物车
			jionCar() {
				console.log(this.projectVoList[0]);
				if (this.projectForm.projectImg == '' || this.projectForm.projectImg.length == 0) {
					this.$refs.uToast.show({
						type: 'error',
						message: '请上传图片/视频'
					});
					return
				}


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

					workerType: this.goodInfo.workerType
				})

				console.log(carArr, this.type, '5466666666666');

				if (this.type == 'submit') {
					this.goodInfo.remark = undefined
					const pages = uni.$u.pages()
					pages[pages.length - 2].$vm.changeData({
						clientId: storage.get('ClientId'),
						...this.goodInfo,
						projectImg: this.projectForm.projectImg == [] ? undefined : this.projectForm
							.projectImg.toString(),
						remark: this.projectForm.remarks,
						projectNumber: this.projectForm.projectNumber,
						serviceProjectImg: this.goodInfo.serviceImg,
						serviceProductName: this.goodInfo.serviceName,
						projectPrice: this.goodInfo.projectAmount
					})
					console.log(carArr, this.type);
					uni.navigateBack()
				} else {
					car.joinCar(carArr).then(res => {
						console.log(res);
						if (res.code == 200) {
							uni.showToast({
								title: '操作成功',
								duration: 2000
							});
							uni.$emit('updateNote', 'coudan');
							setTimeout(() => {
								uni.navigateBack()
							}, 800)



							// let type = 'goCar'
							// uni.reLaunch({
							// 	url: '../../../pages/car/car?type=' + type
							// }).then(res => {
							// 	console.log(res);
							// })
						}
					})
				}

				console.log(this.projectVoList);
			},
			//其他页面改变数据
			changeData(data) {
				this.projectVoList.forEach((fu, index) => {
					data.forEach(d => {
						if (fu.projectId == d.projectId) {
							this.$set(this.projectVoList, index, d)
							console.log(this.projectVoList, '....182');
						}
					})
				})
				this.$nextTick(() => {
					this.$refs.proInfo.checkboxValue1 = checkValues
					console.log(checkValues, 'checkValuescheckValuescheckValuescheckValues...', this.$refs
						.proInfo);
				})
			},

			textConfirm(arr) {
				console.log(arr);
				this.projectVoList[0].remarks = arr[0].remarks
			},
		}
	}
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.navbar {
		position: fixed;
		top: 0px;
		// top: 105rpx;
		width: 100%;
		display: flex;
		padding-left: 16rpx;
		z-index: 9999999;

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

	.serviceInfo {
		height: 100vh;

		.bgf {
			background: #FFFFFF;
		}

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

		.price {
			margin-top: 20rpx;
			padding: 20rpx;

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

		.good-detail-page {
			height: 100vh;


		}




	}

	.bottom {

		width: 100%;
		position: fixed;
		bottom: 0;
		font-size: 22rpx;
		z-index: 100000;
		background-color: #fff;

		.btn {
			height: 85rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 85rpx;
			font-size: 36rpx;
			background: #A4D091;
			color: #fff;
			margin: 20rpx 39rpx 49rpx 39rpx;
		}


	}
</style>