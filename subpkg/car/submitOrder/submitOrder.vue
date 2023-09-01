<template>
	<view class="page">
		<u-navbar placeholder @leftClick='leftClick' title="填写订单">

		</u-navbar>
		<view class="address" :style="{'height':JSON.stringify(addressList)==='[]'?'130rpx':'250rpx'}"
			@click="myAddress">
			<view v-if='addressList.length!=0' class="left">
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
			<view v-else class="left" style="font-size: 36rpx;color: #A5A7A7;">
				请添加服务地址
			</view>
			<view class="right">
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
					style="display: flex;justify-content: space-between;align-items: center;background-color: #f5f9fa;">
					<text v-if="isCar"
						style="font-size: 34rpx;font-weight: bold;margin-left: 13rpx;">{{item.list[0].workerType.replace('人工','师傅')}}</text>
					<view :style="{'width':isCar?'74%':'100%'}" class="time-two" @click="timeShowHandle(index)">
						<text
							style="font-size: 31rpx;color: #3D3F3E;font-weight: bold;padding-left: 15rpx;">预约上门时间</text>
						<view class="">
							<text
								style='text-align: end;margin-right: 22rpx;'>{{item.expectTime==undefined?'时间':item.expectTime}}</text>
							<image style="width: 14rpx;height: 25rpx;    margin-right: 20rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
								mode=""></image>
						</view>
					</view>
				</view>

				<view class="">
					<proInfo :list="item.list" :isCar='true' :submit='false' @getCheck='getCheck'
						@getDeleteUrlList='getDeleteUrlList' @textareaInput='textConfirm' />
				</view>
			</view>

		</view>

		<view class="priceList">
			<view style="background-color: #fff;margin-bottom: 20rpx;width: 100%;"
				v-for="(item,index) in showListByType" :key="index">
				<view class="line">
					<view style="font-size: 34rpx;font-weight: bold;">
						{{isCar?item.list[0].workerType.replace('人工','师傅'):'订单明细'}}
					</view>
					<view class="img"
						v-if="Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))>0">
						<u-icon name="info-circle-fill" color="#faad14" size="22"></u-icon>
						未达标按起步价收取
					</view>
					<view
						v-if="Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))<=0"
						class="img">
						<image style="width: 35rpx;height: 35rpx;margin-right: 10rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png">
						</image>已达到起步价
					</view>


				</view>
				<view class="line">
					<view class="">
						起步价：
					</view>
					<view :style="{'color':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))>0?'#EC5722':'','text-decoration':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))<=0?'line-through':''}">
						¥{{item.list[0].startingFree}}
					</view>
				</view>
				<view class="line">
					<view class="">
						工时费：
					</view>
					<view :style="{'color':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))<=0?'#EC5722':'','text-decoration':Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))>0?'line-through':''}">
						¥{{item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0)}}
					</view>
				</view>
				<view v-if="!isCar" class="line">
					<view class="">
						加急费：
					</view>
					<view :style="{'color': urgentPriceTotal!=0?'#EC5722':''}">
						¥{{urgentPriceTotal}}
					</view>
				</view>
				<view
					v-if="item.list.reduce((p, c) => p + ((Number(c.projectPrice)*Number(c.projectNumber))-(Number(c.discountPrice)*Number(c.projectNumber))), 0)!=0"
					class="line" style="margin-left: 20rpx;font-size: 26rpx;">
					<view style="color: #A5A7A7;">
						品牌折扣：
					</view>
					<!-- 未达到起步价 -->
					<view v-if="Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))>0" style="color:  #EC5722;">
						-¥{{Number(item.list[0].startingFree)-Number(item.list[0].startingFreeDiscount)}}
					</view>
					<!-- 达到起步价 -->
					<view v-if="Number(item.list[0].startingFreeDiscount)-(item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.projectPrice)), 0))<=0" style="color:  #EC5722;">
						¥{{item.list.reduce((p, c) => p + ((Number(c.projectPrice)*Number(c.projectNumber))-(Number(c.discountPrice)*Number(c.projectNumber))), 0)}}
					</view>
				</view>
				<view class="line">
					<view class="">
						{{isCar?'小计':'合计'}}：
					</view>
					<view style="color:  #EC5722;">

						¥{{item.allMoney+urgentPriceTotal}}
					</view>
				</view>
			</view>
		</view>

		<view style="height: 122rpx;">

		</view>

		<view class="bottom">
			<!-- 	<view class=""> -->
			<view class="">
				<text style="font-size: 22rpx;color: #A5A7A7;">合计费用:</text>
				<text
					style="font-size: 33rpx;color: #EC5722;margin:0 20rpx 0 10rpx;">¥{{info.orderPrice}}</text>
			</view>
			<!-- 	<view v-if="urgentPriceTotal!=0">
					<text style="font-size: 22rpx;color: #A5A7A7;margin-left:180rpx;">加急费:</text>
					<text style="font-size: 33rpx;color: #EC5722;margin:0 20rpx 0 10rpx;">¥{{urgentPriceTotal}}</text>
				</view> -->
			<!-- 	</view> -->

			<view class="btn" @click.stop="submitOrder">提交订单</view>

		</view>


		<hTimeAlert title="选择上门时间" rangeStartTime="00:00:00" rangeEndTime="23:59:59" defaultTime="2020/3/29 18:00:00"
			rangeDay="7" :isShow="isShow" :maskHide="maskHide" :isUrgentIndex='3' :rangeType="rangeType" :isCar='isCar'
			:closeBtn="closeBtn" @closeAlert="handelClose">
		</hTimeAlert>

		<!-- 添加地址弹框 -->
		<u-modal width="450rpx" :show="showModal" confirmColor='#72DAA4' confirmText='立即填写' showCancelButton
			@cancel='showModal=false' title="新建服务地址" :content='content' @confirm="addAddress"></u-modal>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	import storage from '@/utils/storage'
	import hTimeAlert from "@/components/h-time-alert/h-time-alert.vue"
	import proInfo from '@/components/proInfo/proInfo.vue'
	import formatter from '@/utils/formatter.js'
	import {
		getAddressList
	} from "@/api/address.js"
	import {
		postOrder
	} from '@/api/car.js'
	import {
		getInfoById,
	} from '@/api/user.js'
	export default {
		name: 'test',
		components: {
			hTimeAlert,
			proInfo
		},
		mixins: [],
		props: {},
		data() {
			return {
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
			};
		},
		onShow() {
			this.getList()

		},
		onLoad(option) {
			console.log(decodeURIComponent(option.item));
			let item = JSON.parse(decodeURIComponent(option.item))
			this.submitList = item.checkedList
			this.isCar = item.isCar
		//	this.showListByType = this.arrayGroupBy(this.submitList, 'workerType');
			console.log(this.showListByType, this.submitList, '.........103');
			this.getMoney()
			console.log(this.showListByType);
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
							console.log(res);
							this.info.warrantyStore = res.data.clientName
							//	this.fileList.push({url:arr[0]})
						}),
						//查询是否有地址
						getAddressList({
							clientId: storage.get('ClientId')
						}).then(res => {
							console.log(res);
							this.addressList = res.rows
							this.showModal = this.addressList.length == 0
							try {
								const value = uni.getStorageSync('address_info');
								if (value) {
									this.addressInfo = value
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
							} catch (e) {
								// error
							}

						})

				}

			},
			
			//计算总钱数
			getMoney(){
				this.showListByType = this.arrayGroupBy(this.submitList, 'workerType');
				this.showListByType.forEach((item, index) => {
					console.log(item);
					let all = item.list.reduce((p, c) => p + (Number(c.projectNumber) * Number(c.discountPrice)),
						0)
					console.log(all);
					item.allMoney = all < Number(item.list[0].startingFreeDiscount) ? Number(item.list[0]
						.startingFreeDiscount) : all
				
				})
				this.info.orderPrice = this.showListByType.reduce((p, c) => p + c.allMoney,0)+ this.urgentPriceTotal
			},
			getCheck(data) {
				console.log(data);
				console.log(this.submitList);
				
				let id = data.item.id ? data.item.id : data.item.projectId
				//console.log(id);
				this.submitList.forEach(item=>{item.projectNumber=(item.id ? item.id : item.projectId) === id ? data.num.value : item.projectNumber})
				// this.info.orderPrice = this.submitList.reduce((p, c) => p + (((c.id ? c.id : c.projectId) === id ? data.num.value : c.projectNumber) * Number(c.discountPrice)), 0)
				// // this.urgentPriceTotal = this.info.isUrgent ? this.submitList.reduce((p, c) => p + (((c.id ? c.id : c
				// // 		.projectId) === id ? data.num
				// // 	.value : c.projectNumber) * Number(c.urgentPrice)), 0) : 0
				// this.submitList.forEach(item => {
				// 	if ((item.id ? item.id : item.projectId) === id) {
				// 		item.projectNumber = data.num.value
				// 	}
				// })
			this.getMoney()
				console.log(this.info.orderPrice);
				const pages = uni.$u.pages()
				pages[pages.length - 2].$vm.changeData([data.item])
			},
			//删除url
			getDeleteUrlList(data) {
				console.log(data);
				const pages = uni.$u.pages()
				pages[pages.length - 2].$vm.changeData(data)
				uni.setStorage({
					key: 'submit_order',
					data: data,
				})
				console.log(data);
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
				this.timeIndex = i
			},
			handelClose(data) {
				this.isShow = false;
				console.log(data);
				this.showListByType[this.timeIndex].expectTime = data.endDate
				console.log(this.showListByType);
				this.info.isUrgent = data.isUrgent && !this.isCar ? 1 : 0
				if (data.isUrgent) {
					this.urgentPriceTotal = this.submitList.reduce((pre, item) => {
						return pre + Number(item.urgentPrice)
					}, 0)
					this.info.orderPrice = this.info.orderPrice + this.urgentPriceTotal
				} else {
					this.info.orderPrice = this.info.orderPrice - this.urgentPriceTotal
					this.urgentPriceTotal = 0
				}
				//this.dateRange = data._dateRange
				console.log(this.submitList);
			},

			//下单
			submitOrder() {
				let bool = this.showListByType.some(item => {
					return item.expectTime == undefined
				})
				console.log(bool);
				if (bool) {
					uni.showToast({
						title: '请选择上门时间',
						duration: 2000,
						icon: 'none'
					});
					return
				}
				//else {
				console.log(this.addressInfo);
				this.info.addressId = this.addressInfo.addressId
				//	this.info.orderTime =formatter.formatDateTime(new Date().toLocaleString())				
				this.info.clientId = storage.get('ClientId')

				console.log(this.showListByType);
				console.log(this.info);
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
				})
				let timeObj = {}
				let startingFree = {}
				let beforeStartingFree={}
				this.showListByType.forEach(item => {
					timeObj[item.list[0].workerType] = item.expectTime + ':00'
					startingFree[item.list[0].workerType] = item.list[0].startingFreeDiscount,
					beforeStartingFree[item.list[0].workerType] = item.list[0].startingFree
				})
				console.log(timeObj, startingFree);
				this.info.orderProjectBoList = arr
				this.info.startingFreeMap = startingFree
				this.info.timeMap = timeObj
				this.info.beforeStartingFreeMap=beforeStartingFree
				//this.info.expectTime = this.info.expectTime + ':00'
				console.log(this.info);
				postOrder(this.info).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.removeStorage({
							key: 'address_info'
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
							url: '../../../subpkg/car/succeeded/succeeded?info=' + JSON.stringify(info)
						})
					}
				})






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
				const pages = uni.$u.pages();
				console.log(pages);
				pages.some(p => p.route.includes('service') || p.route.includes('goodDetails')) ? uni.navigateBack() : uni
					.switchTab({
						url: '/pages/car/car'
					})

			},
			textConfirm(arr) {
				console.log(arr);
				this.submitList = arr
				const pages = uni.$u.pages()
				pages[pages.length - 2].$vm.changeData(arr)
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
		.address {
			padding: 0 34rpx;
			//	width: 100%;
			//height: 286rpx;
			background: #fff;
			display: flex;

			.left {
				padding: 46rpx 0;
				display: flex;
				flex-direction: column;
				width: 82%;
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
			height: 85rpx;
			//width: 74%;
			background: #fff;
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
		}

		.priceList {
			width: 100%;

			.line {
				display: flex;
				justify-content: space-between;
				padding: 10rpx 20rpx;

				.img {
					align-items: center;
					display: flex;
					font-size: 24rpx;

				}
			}
		}

		.bottom {
			width: 100%;
			height: 100rpx;
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
				background: linear-gradient(90deg, #72DAA4 0%, #9FD6BA 100%);
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
