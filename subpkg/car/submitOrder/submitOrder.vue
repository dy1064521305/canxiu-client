<template>
	<view class="page">
		<u-navbar placeholder @leftClick='leftClick' title="填写订单">

		</u-navbar>

		<view class="time-two" @click="timeShowHandle(index)">
			<view style="color: #3D3F3E;font-weight: bold;padding-left: 15rpx;font-size: 33rpx;">
				<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/11/e72bc126b96946b4935cf0c551a7045f.png"
					style="width: 47rpx;height:43rpx;margin-right: 20rpx;"></image>上门服务时间
			</view>
			<view>
				<text style='margin-right: 22rpx;'>{{expectTime==undefined?'请选择':expectTime}}</text>
				<image style="width: 14rpx;height: 25rpx;    margin-right: 20rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
					mode=""></image>
			</view>
		</view>
		<view  class="address" @click="myAddress">
			<view v-if='addressList.length!=0' class="left">
				<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/11/a7fe2594ad27432c8676c0b03bf22bb7.png"
					style="width: 36rpx;height:43rpx;margin-right: 20rpx;" />
					<view style="width: 86%;">
						<view style="font-size: 25rpx;">
							{{addressPlace}}
						</view>
						<view style="font-size: 29rpx;margin-top: 18rpx;">
							{{addressRegion}}{{addressInfo.addressDetailed}}
						</view>
						<view style="font-size: 25rpx;margin-top: 23rpx;align-items: center;
				display: flex;">
							<text class="font"
								:style="{'width':addressInfo.contact.length>8?'150rpx':''}">{{addressInfo.contact}}</text><text
								style="margin: 0 10rpx;">|</text>{{addressInfo.phone}}
						</view>
					</view>
			</view>
			<view v-else class="left" style="font-size: 36rpx;color: #A5A7A7;">
				请添加服务地址
			</view>
			<view v-if="!isAgain" class="right">
				<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
					mode=""></image>
			</view>
		</view>

		<!-- <view class="time" @click="isShow=true">
			<text style="font-size: 33rpx;color: #3D3F3E;font-weight: bold;">选择上门时间</text>
			<text
				style='width: 65%;text-align: end;margin-right: 22rpx;'>{{info.expectTime==undefined?'时间':info.expectTime}}</text>
			<image style="width: 14rpx;height: 25rpx;"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
				mode=""></image>
		</view>
 -->
		<view class="list">
			<view v-for="(item,index) in showListByType" :key="index" style="margin-bottom: 10rpx;">
				<view
					style="display: flex;justify-content: space-between;align-items: center;background-color: #fff;padding: 20rpx 0;font-size: 33rpx;padding: 30rpx 23rpx;">
					<text style="font-weight: bold;">{{item.list[0].workerType}}</text>
					<view class="">
						起步价:{{item.list[0].startingFreeDiscount}}元/次

						<text
							v-if="Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))<=0">
							<!-- <image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
							</image>已达到起步价 -->
							（已满足）
						</text>
						<text v-else @click="coudanShowHandle(item.list[0].workerType)"> | 去凑单></text>
					</view>
				</view>

				<view v-if="isAgain">
					<view v-for="(itemm,indexx) in projectDataVoList" :key="indexx" style="padding: 20rpx;">
						<project-card :pro='itemm' />
						<view class="info-box">
							<view class="font">
								图片/视频
							</view>
							<view>
								<cl-upload :listStyle="{
										columnGap: '10rpx',
										columns:'3',
										rowGap:'10rpx'
										}" :imageFormData="{
											size:10
										}" :videoFromData="{
											size:10
										}" v-model="itemm.projectImg" :add="false" :remove="false"></cl-upload>
								<!-- <upLoadFile :fileListt='item.projectVideo' types='video' :index='index' :isDel='false' /> -->
							</view>
						</view>
						<view v-if="itemm.remark!=''" class="info-box">
							<view class="font">
								订单备注
							</view>
							<view class="right" style="color: #707271;">
								{{itemm.remark}}
							</view>
						</view>
					</view>
				</view>



				<view v-else>
					<proInfo :list="item.list" :isCar='true' :submit='false' @getCheck='getCheck'
						@getDeleteUrlList='getDeleteUrlList' @textareaInput='textConfirm' />
				</view>


			</view>

		</view>

		<view class="priceList">
			<view style="font-size: 34rpx;font-weight: bold;padding: 15rpx 20rpx;">
				费用明细
			</view>
			<view style="margin-bottom: 20rpx;width: 100%;" v-for="(item,index) in showListByType" :key="index">
				<view class="line" style="color: #3D3F3E;">
					<view class="">
						{{item.list[0].workerType}}
					</view>
					<view class="">
						¥{{item.allMoney+urgentPriceTotal}}
					</view>

					<!-- 	<view
						v-if="Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))<=0"
						class="img">
						<image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
						</image>已达到起步价
					</view> -->


				</view>
				<view class="line" style="color: #EC5722;justify-content: flex-end;"
					v-if="Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))>0">
					<!-- <u-icon name="error-circle" color="#EC5722" size="22"></u-icon> -->
					未达到服务起步价，按起步价结算
				</view>
				<view class="line">
					<view class="">
						服务起步价
					</view>
					<view
						:style="{'color':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))>0?'#EC5722':'#A5A7A7','text-decoration':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))<=0?'line-through':''}">
						¥{{item.list[0].startingFreeDiscount}}
					</view>
				</view>
				<view class="line">
					<view class="">
						维修服务费
					</view>
					<view
						:style="{'color':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))<=0?'#EC5722':'#A5A7A7','text-decoration':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0))>0?'line-through':''}">
						¥{{item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)), 0)}}
					</view>
				</view>
				<view v-if="!isCar&&urgentPriceTotal!=0" class="line">
					<view class="">
						加急费：
					</view>
					<view :style="{'color': urgentPriceTotal!=0?'#EC5722':'#A5A7A7'}">
						¥{{urgentPriceTotal}}
					</view>
				</view>

				<!-- 	<view class="line">
					<view class="">
						{{isCar?'小计':'合计'}}：
					</view>
					<view style="color:  #EC5722;">

						¥{{item.allMoney+urgentPriceTotal}}
					</view>
				</view> -->
			</view>
			<view class="total">
				<view class="line">
					<view class="">
						<text style="color: #3D3F3E;">合计</text>(不含材料)
					</view>
					<view >
						{{info.orderPrice}}元
					</view>
				</view>
			</view>

		</view>


		<view style="height: 141rpx;">

		</view>

		<view class="bottom">
			<view class="">
				<view style="font-size: 33rpx;color: #EC5722;margin:0 20rpx 0 10rpx;text-align: end;">
					<!-- 	<text style="font-size: 22rpx;color: #A5A7A7;">合计费用:</text> -->
					费用:¥{{info.orderPrice}}
				</view>
				<view style="font-size: 22rpx;
				color: #A5A7A7;">
					*共{{submitList.reduce((p,c)=>p+Number(c.projectNumber),0)}}项服务， 合计(不含材料)
				</view>
			</view>

			<view class="btn" @click.stop="submitOrder">立即下单</view>

		</view>


		<hTimeAlert title="选择上门时间" rangeStartTime="00:00:00" rangeEndTime="23:59:59" defaultTime="2020/3/29 18:00:00"
			rangeDay="7" :isShow="isShow" :maskHide="maskHide" :isUrgentIndex='3' :rangeType="rangeType" :isCar='isCar'
			:closeBtn="closeBtn" @closeAlert="handelClose">
		</hTimeAlert>

		<!-- 添加地址弹框 -->
		<u-modal width="450rpx" :show="showModal" confirmColor='#A4D091' confirmText='立即填写' showCancelButton
			@cancel='showModal=false' title="新建服务地址" :content='content' @confirm="addAddress"></u-modal>

		<u-toast ref="uToast"></u-toast>


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
						<coudan-card :item='item' type='submit' />



					</view>

				</view>
				<u-empty v-else mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" text='没有找到哦，换个关键词试一下吧'>
				</u-empty>
			</view>
		</u-popup>



	</view>
</template>
<script>
	import storage from '@/utils/storage'
	import hTimeAlert from "@/components/h-time-alert/h-time-alert.vue"
	import proInfo from '@/components/proInfo/proInfo.vue'
	import formatter from '@/utils/formatter.js'
	import projectCard from '@/components/projectCard/projectCard.vue'
	import coudanCard from '../components/coudanCard/coudanCard.vue'
	import {
		getAddressList
	} from "@/api/address.js"
	import {
		postOrder,
		listByWorkerType
	} from '@/api/car.js'
	import {
		reissueOrder,
		orderSend
	} from '@/api/order.js'
	import {
		getInfoById,
	} from '@/api/user.js'
	export default {
		name: 'test',
		components: {
			hTimeAlert,
			proInfo,
			projectCard,
			coudanCard
		},
		mixins: [],
		props: {},
		data() {
			return {
				searchName: "",
				coudanList: [],
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
					orderPrice: ''
				},
				dateRange: '',
				urgentPriceTotal: 0,
				showListByType: [],
				timeIndex: undefined,
				isCar: false, //是从购物车下单还是立即下单
				isAgain: false,
				projectDataVoList: [],
				isRepair: false, //是否是返修
				addressPlace: undefined,
				expectTime: undefined,
				coudanShow: false,
				addressRegion: undefined,
				typename: undefined

			};
		},
		onShow() {
			this.getList()

		},
		onLoad(option) {

			let item = JSON.parse(decodeURIComponent(option.item))

			this.submitList = item.checkedList
			this.isCar = item.isCar
			this.isAgain = item.isAgain
			this.projectDataVoList = this.isAgain ? item.checkedList : []
			this.isRepair = item.isRepair
			if (item.isRepair) {
				this.addressInfo = item.info.addressVo
				this.addressPlace = (this.addressInfo.addressRegion.substring((this.addressInfo
					.addressRegion.indexOf('/')) + 1)).replace('/', '-')
				this.addressRegion = this.addressInfo.addressRegion.replace(/\//g, "")
				this.submitList.forEach(item => {
					item.serviceProjectImg = item.projectImg
					item.projectImg = ''
					item.remark = ''
					item.clientId = storage.get('ClientId')
				})
			}
			this.getMoney('init')
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
			//this.info.orderPrice = this.submitList.reduce((p, c) => p + (c.projectNumber * c.discountPrice), 0)
		},
		methods: {
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
				sorted.forEach((item, index) => {
					sorted[index] = {
						list: item,
						expectTime: undefined,
						isUrgent: undefined
					}
				})
				return sorted;

			},

			getList() {
				if (storage.get('ClientId')) {
					//查询门店名称
					getInfoById(storage.get('ClientId')).then(res => {
							this.info.warrantyStore = res.data.storeName
							//	this.fileList.push({url:arr[0]})
						}),
						//查询是否有地址
						getAddressList({
							clientId: storage.get('ClientId')
						}).then(res => {
							this.addressList = res.rows
							this.showModal = this.addressList.length == 0
							try {
								const value = uni.getStorageSync(`address_info${storage.get('ClientId')}`);
								if (value) {
									this.addressInfo = value
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
								this.addressPlace = (this.addressInfo.addressRegion.substring((this.addressInfo
									.addressRegion.indexOf('/')) + 1)).replace('/', '-')
								this.addressRegion = this.addressInfo.addressRegion.replace(/\//g, "")
							} catch (e) {
								// error
								console.log(e);
							}

						})

				}

			},

			//计算总钱数
			getMoney(type) {
				if (type == 'init') {
					this.showListByType = this.arrayGroupBy(this.submitList, 'workerType');
				}

				this.showListByType.forEach((item, index) => {
					let all = item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)),
						0)
					item.allMoney = all < Number(item.list[0].startingFreeDiscount) ? Number(item.list[0]
						.startingFreeDiscount) : all
				})
				this.info.orderPrice = this.showListByType.reduce((p, c) => p + c.allMoney, 0) + this.urgentPriceTotal
			},
			getCheck(data) {

				let id = data.item.id ? data.item.id : data.item.projectId
				//console.log(id);
				this.submitList.forEach(item => {
					item.projectNumber = (item.id ? item.id : item.projectId) === id ? data.num.value : item
						.projectNumber
				})

				this.getMoney()

			},
			//删除url
			getDeleteUrlList(data) {
				// if (!this.isRepair) {
				// 	const pages = uni.$u.pages()
				// 	pages[pages.length - 2].$vm.changeData(data)
				// }

				uni.setStorage({
					key: 'submit_order',
					data: data,
				})
				this.submitList.forEach((fu, index) => {
					//	fu.children.forEach((son, ind) => {
					data.forEach(d => {
						if (d.id === fu.id) {
							fu.projectImg = d.projectImg
							//fu.projectVideo = d.projectVideo
						}
					})
					//	})
				})
			},
			showMask() {
				this.isShow = true;
				console.log(this.isShow);
			},
			timeShowHandle(i) {
				this.isShow = true
				// this.timeIndex = i
			},
			handelClose(data) {
				this.isShow = false;
				// this.showListByType[this.timeIndex].expectTime = data.endDate
				this.expectTime = data.endDate
				this.info.isUrgent = data.isUrgent && !this.isCar ? 1 : 0
				if (data.isUrgent && this.submitList[0].isUrgent != 'N') {
					// this.urgentPriceTotal = this.submitList.reduce((pre, item) => {
					// 	return pre + Number(item.urgentPrice)
					// }, 0)
					this.urgentPriceTotal = Number(this.submitList[0].urgentPrice)
					this.info.orderPrice = this.info.orderPrice + this.urgentPriceTotal
				} else {
					this.info.orderPrice = this.info.orderPrice - this.urgentPriceTotal
					this.urgentPriceTotal = 0
				}
			},

			coudanShowHandle(name) {
				this.typename = name
				this.coudanShow = true
				this.getCoudanList()
			},
			getCoudanList() {
				//获取凑单列表
				listByWorkerType({
					clientId: storage.get('ClientId'),
					type: this.typename,
					name: this.searchName,
					address:uni.getStorageSync(`address_refreash${storage.get('ClientId')}`)
				}).then(res => {
					this.coudanList = res.data

				})
			},
			//下单
			submitOrder() {
				// let bool = this.showListByType.some(item => {
				// 	return item.expectTime == undefined
				// })

				if (!this.expectTime) {
					uni.showToast({
						title: '请选择上门时间',
						duration: 2000,
						icon: 'none'
					});
					return
				}
				if (!this.addressInfo.addressId || this.addressList.length == 0) {
					uni.showToast({
						title: '请选择地址',
						duration: 2000,
						icon: 'none'
					});
					return
				}
				let place = uni.getStorageSync('address_refreash')
				console.log(this.addressInfo.addressRegion.replace(/\//g, "-"),place);
				if (this.addressInfo.addressRegion.replace(/\//g, "-") != place) {
					uni.showToast({
						title: `仅支持服务“${place.substring((place.indexOf('-')) + 1)}”地区`,
						duration: 2000,
						icon: 'none'
					})
					return
				}


				if (this.isAgain) {
					// console.log({
					// 	orderId: this.showListByType[0].list[0].orderId,
					// 	expectTime: this.showListByType[0].expectTime + ':00'
					// })
					reissueOrder({
						orderId: this.showListByType[0].list[0].orderId,
						expectTime: this.expectTime + ':00'
					}).then(res => {
						let timeObj = {}
						this.showListByType.forEach(item => {
							timeObj[item.list[0].workerType] = this.expectTime + ':00'

						})
						let info = {
							money: this.info.orderPrice,
							time: timeObj,
							orderId: this.showListByType[0].list[0].orderId
						}
						uni.redirectTo({
							url: '../../../subpkg/car/succeeded/succeeded?info=' + JSON.stringify(info)
						})
					})
				} else {
					//else {
					this.info.addressId = this.addressInfo.addressId
					//	this.info.orderTime =formatter.formatDateTime(new Date().toLocaleString())				
					this.info.clientId = storage.get('ClientId')
					let arr = JSON.parse(JSON.stringify(this.submitList))
					console.log(arr);

					let bool1 = arr.some(item => {
						return item.projectImg.length == 0
					})
					console.log(bool1);
					if (bool1) {
						this.$refs.uToast.show({
							type: 'error',
							message: '每个项目都要上传图片或视频'
						});

						return
					}

					arr.forEach(item => {
						//item.projectVideo = this.toStrings(item.projectVideo)
						item.projectImg = this.toStrings(item.projectImg)
						item.shoppingCartStatus = 1
						item.urgentPrice = this.info.isUrgent == 1 ? item.urgentPrice : 0
						item.remark = item.remarks
						item.productId = item.serviceId?item.serviceId:item.productId
					})
					let timeObj = {}
					let startingFree = {}
					let beforeStartingFree = {}
					let costStartingFreeMap = {}
					this.showListByType.forEach(item => {
						console.log(item.list[0]);
						timeObj[item.list[0].workerType] = this.expectTime + ':00'
						startingFree[item.list[0].workerType] = item.list[0].startingFreeDiscount,
							beforeStartingFree[item.list[0].workerType] = item.list[0].serviceStartingFree,
							costStartingFreeMap[item.list[0].workerType] = item.list[0].workerStartingFree
					})
					this.info.orderProjectBoList = arr
					this.info.startingFreeMap = startingFree
					this.info.timeMap = timeObj
					this.info.beforeStartingFreeMap = beforeStartingFree
					this.info.costStartingFreeMap = costStartingFreeMap
					//this.info.expectTime = this.info.expectTime + ':00'
					console.log(this.info);
					postOrder(this.info).then(res => {
						console.log(res);
						if (res.code == 200) {
							orderSend(res.data).then(res => {})
							uni.removeStorage({
								key: `address_info${storage.get('ClientId')}`
							})
							uni.removeStorage({
								key: 'submit_order'
							})
							let info = {
								money: this.info.orderPrice,
								time: timeObj,
								orderId: res.data
							}
							console.log(info);
							uni.redirectTo({
								url: '../../../subpkg/car/succeeded/succeeded?info=' + JSON.stringify(
									info)
							})
						} else {
							this.$refs.uToast.show({
								type: 'error',
								message: res.msg
							});
							return
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
				if (this.isAgain) return
				let params = {
					type: 'order',
					list: this.submitList
				}
				uni.navigateTo({
					url: '../myAddress/myAddress?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			getInfo(data) {
				console.log(data, '......257');
			},
			leftClick() {
				// uni.removeStorage({
				// 	key:'submit_order'
				// })
				uni.navigateBack()
				// const pages = uni.$u.pages();
				// console.log(pages);
				// pages.some(p => p.route.includes('service') || p.route.includes('goodDetails') || p.route.includes(
				// 		'orderDetail')) ? uni.navigateBack() : uni
				// 	.switchTab({
				// 		url: '/pages/car/car'
				// 	})

			},
			textConfirm(arr) {
				console.log(arr);
				this.submitList = arr
				// if (!this.isRepair) {
				// 	const pages = uni.$u.pages()
				// 	pages[pages.length - 2].$vm.changeData(arr)
				// }

			},
			changeData(obj) {
				this.submitList.push(obj)
				this.getMoney('init')
				this.coudanShow = false
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

		.address {
			padding: 0 34rpx;
			//	width: 100%;
			//height: 286rpx;
			background: #fff;
			color: #3D3F3E;
			display: flex;

			.font {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				display: inline-block;

			}

			.left {
				display: flex;
				padding: 46rpx 0;
				width: 82%;
			}

			.right {
				// height: 100%;
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
			//	width: 100%;
			height: 103rpx;
			background: #fff;
			display: flex;
			align-items: center;
		}

		.time-two {
			font-size: 30rpx;
			height: 85rpx;
			// width: 100%;
			background: #fff;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.list {
			margin-top: 20rpx;
			width: 100%;
			background-color: #fff;

			// bottom: 110rpx;
			// position: relative;
			// top: 2rpx;
			.info-box {
				margin-top: 20rpx;
				display: flex;

				.font {
					width: 20%;
					font-size: 29rpx;
					font-weight: bold;
					color: #3D3F3E;
				}

				.right {
					width: 80%;
				}
			}
		}

		.priceList {
			width: 100%;
			background-color: #fff;

			.line {
				display: flex;
				justify-content: space-between;
				padding: 10rpx 20rpx;
				color: #A5A7A7;

				.img {
					align-items: center;
					display: flex;
					font-size: 24rpx;

				}
			}
		}
		.total{
			border-top:2rpx solid #F8F8F8;
			padding: 10rpx 0;
		}
		.bottom {
			width: 100%;
			height: 137rpx;
			background: #fff;
			position: fixed;
			display: flex;
			align-items: center;
			z-index: 999;
			bottom: 0;
			justify-content: flex-end;

			.btn {
				width: 199rpx;
				height: 69rpx;
				background: #A4D091;
				border-radius: 34rpx;
				font-size: 29rpx;
				color: #FFFFFF;
				line-height: 69rpx;
				text-align: center;
				margin-right: 20rpx;
			}
		}
	}
</style>