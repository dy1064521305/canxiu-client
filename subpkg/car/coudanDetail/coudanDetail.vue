<template>
	<scroll-view class="serviceInfo" ref="target" :scroll-y="true">
		<!-- 服务详情 -->
		<view class="top">
			<u-swiper height='746rpx' :list="serviceImgList" @change="e => currentNum = e.current" :autoplay="false"
				indicatorStyle="right: 20px">
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ currentNum + 1 }}/{{ serviceImgList.length }}</text>
				</view>
			</u-swiper>
			<view class="info bgf">
				<!-- <view style="font-size: 36rpx;color: #3D3F3E;margin-top: 30rpx;"> -->
				<text style="font-weight: bold;">{{goodInfo.serviceName}}</text><text
					style="font-size: 25rpx;margin:0 10rpx;">服务起步价：¥{{goodInfo.startingFreeDiscount==null?0:goodInfo.startingFreeDiscount}}</text>
				<text v-if="goodInfo.startingFreeDiscount!=goodInfo.startingFree"
					style="font-size: 25rpx;text-decoration:line-through">¥{{goodInfo.startingFree}}</text>
			</view>
		</view>

		<view class="services bgf">
			<!-- :submit="projectVoList.length>1" -->
			<proInfo :list='projectVoList' :isCar='false' :question='true' @getCheck='getCheck' :types='types'
				@textareaInput='textConfirm' ref="proInfo" :isCoudan='true' @getDeleteUrlList='getDeleteUrlList' />
		</view>

		<!-- <view class="price bgf">
			<view style="font-size: 36rpx;color: #3D3F3E;margin-top:10rpx;">
				收费标准
			</view>
			<view style="font-size: 22rpx;color: #A5A7A7;margin-top: 10rpx;">
				因型号、维修难度、品牌不同最终价格会有所差异
			</view>
			<view class="cell" style="margin-top: 30rpx;">
				<u-collapse :border='false'>
					<u-collapse-item v-for="(item,index) in chargeList" :key="index" :title="item.typeName"
						name="Docs guide">
						<view v-for="(ch,chindex) in item.children" :key='chindex'
							style="display: flex;justify-content: space-between;">
							<text>{{ch.serviceName}}{{ch.standardCompany!=null?'('+ch.standardCompany+')':''}}</text>
							<text>{{ch.standardPrice}}元{{ch.standardCompany!=null?'('+ch.standardCompany+')':''}}</text>
						</view>
					</u-collapse-item>

				</u-collapse>
			</view>
		</view> -->

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
			<view style="font-size: 36rpx;
			color: #3D3F3E;">
				服务详情
			</view>
			<rich-text v-if="goodInfo.remark!=null&&goodInfo.remark!=''" :nodes="goodInfo.remark"></rich-text>
			<view v-if="goodInfo.remark==null||goodInfo.remark==''" style="margin-top: 15rpx;">
				暂无详情
			</view>
		</view>
		<view class="bgf" style="height:212rpx;">
		</view>


		<view class="bottom">
			<view @click="jionCar" class="btn">
				选好了
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>

	</scroll-view>



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
	var checkValues = [];
	export default {
		components: {
			proInfo
		},
		data() {
			return {
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
			}
		},
		onLoad(options) {
			console.log(this.isLogin);
			console.log(options);
			this.query.clientId = storage.get('ClientId')
			this.query.serviceId = options.serviceId

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
				console.log(1111);
				console.log(this.query, 'queryqueryqueryqueryquery');
				getServiceInfo(this.query).then(res => {
					this.goodInfo = res.data
					console.log(this.goodInfo, 'goodInfogoodInfogoodInfo');

					uni.setNavigationBarTitle({
						title: this.goodInfo.serviceName
					})
					console.log(this.goodInfo);
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

					this.serviceImgList = this.goodInfo.serviceImg !== null ? this.goodInfo.serviceImg.split(',') :
						[]
					this.goodInfo.projectVoList.forEach((p, i) => {
						this.projectVoList.splice(i, 1, p)
					})
					this.projectVoList.forEach(item => {
						item.serviceProjectImg = item.projectImg,
							item.projectImg = ''
					})
					console.log(this.projectVoList);
					if (!this.isLogin) {
						this.projectVoList.forEach(item => {
							item.projectPrice = this.replaceMoney(item.projectPrice)
						})
						this.goodInfo.maxPrice = this.replaceMoney(this.goodInfo.maxPrice)
						this.goodInfo.mixPrice = this.replaceMoney(this.goodInfo.mixPrice)
						this.goodInfo.initialLabor = this.replaceMoney(this.goodInfo.initialLabor)
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
			previewImage(e) {
				console.log(e);
				wx.previewImage({
					current: e, // 当前显示图片的http链接
					urls: this.appraiseList[0].imgs, // 需要预览的图片http链接列表
				})
			},
			//所有评论
			allComment() {
				console.log(11111);
				uni.navigateTo({
					url: '../allComments/allComments?id=' + this.goodInfo.serviceId
				})
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

			//去登录
			confirm() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
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
			getCheck(item) {
				console.log(item, 'itrwmmmmmmmmm');
				item.item.projectNumber = item.num.value
				this.projectVoList[0] = item.item

			},

			getDeleteUrlList(list) {
				console.log(list);
				this.projectVoList[0].projectImg = list[0].projectImg
			},
			//加入购物车
			jionCar() {
				console.log(this.projectVoList[0]);
				if (this.projectVoList[0].projectImg == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: '请上传图片/视频'
					});
					return
				}
				let carArr = []
				console.log(this.projectVoList[0].remark);
				carArr.push({
					clientId: storage.get('ClientId'),
					flag: 1,
					productId: this.goodInfo.serviceId,
					projectPrice: this.projectVoList[0].projectPrice,
					projectNumber: 1,
					projectId: this.projectVoList[0].projectId,
					projectImg: this.projectVoList[0].projectImg.toString(),
					remark: this.projectVoList[0].remark==null?'':this.projectVoList[0].remark,
					shoppingCartStatus: 0,
					discountPrice: this.projectVoList[0].discountPrice,
					// projectVideo: item.projectVideo != [] ? item.projectVideo.toString() :
					// 	undefined,
					workerType: this.goodInfo.workerType,
				})

				console.log(carArr);
				car.joinCar(carArr).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.showToast({
							title: '操作成功',
							duration: 2000
						});
						let type = 'goCar'
						uni.reLaunch({
							url: '../../../pages/car/car?type=' + type
						}).then(res => {
							console.log(res);
						})
					}
				})
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
				this.projectVoList[0].remark = arr[0].remark
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
	.serviceInfo {
		height: 100vh;

		.bgf {
			background: #FFFFFF;
		}

		.top {

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
				display: flex;
				padding: 25rpx;
				font-size: 36rpx;
				color: #3D3F3E;
				align-items: baseline;
				// view:nth-child(1) {
				// 	display: flex;
				// 	justify-content: space-between;
				// }

				// view:nth-child(2) {
				// 	font-size: 27rpx;
				// 	color: #EC5722;
				// 	margin-top: 15rpx;
				// }



			}
		}

		.services {
			width: 100%;
			margin-top: 20rpx;


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

			.fwb-img {
				max-width: 100% !important;
				width: 100% !important;
				height: auto !important;
				display: block
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
				background: #9FD6BA;
				color: #fff;
				margin: 20rpx 39rpx 49rpx 39rpx;
			}


		}


	}
</style>
