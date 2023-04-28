<template>
	<view class="my-order">
		<z-paging ref="paging" v-model="orderList" @query="getOrderlistHandle" @onRefresh="refresh">
			<view slot='top'>
				<u-navbar title="我的订单" placeholder :safeAreaInsetTop="true" :autoBack='true'>
					<view class="u-nav-slot" slot="right" @click="show">
						<image
							:style="{'width': '29rpx','margin-right':menuButtonInfoWidth+'rpx','padding-top':'15rpx'}"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/eb78f3eb65ec46fc92b1245b17c64838.png"
							mode="widthFix"></image>
					</view>

				</u-navbar>
				<view class="top">
					<!-- 	<view class="type">
						<text @click='checkType(0)' :class="[type==0?'text-active':'']">维修</text>
						<text @click='checkType(1)' :class="[type==1?'text-active':'']">维保</text>
					</view> -->
					<view style="padding: 20rpx 20rpx 0 20rpx;">
						<u-search v-model="queryParams.projectName" @search="queryList" @clear="queryList"
							placeholder="搜索订单" :clearabled="true" :showAction='false'></u-search>
					</view>
					<u-tabs :scrollable='false' style='margin-top: 20rpx;' :current='current' :list="list1"
						@click="statusClick" lineColor='#72DAA4' lineWidth="50" lineHeight='8' :inactiveStyle="{
					        color: '#A5A7A7',
					    }"></u-tabs>
				</view>
			</view>

			<view class="orders" @click="orderDetail(item.orderId)" v-for='(item,index) in orderList' :key='index'>
				<view class="main">
					<view class="title">
						<text :style="{'font-weight': 'bold','width':item.isUrgent==1?'53%':'65%'}">{{item.warrantyStore}}</text>
						<text style="font-size: 25rpx;text-align: end;width:42%;">
							<text>{{item.orderStatus}}</text>
						</text>
						<view v-if="item.isUrgent==1" style="position: absolute;top: 0;right:0">
							<image style="width: 54rpx;height: 54rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/01/2889ed6d29b441d9a6da3c69af618f96.png"
								mode=""></image>
						</view>
					</view>
					<view v-if="item.projectDataVoList.length!=0" v-for="(pro,i) in item.projectDataVoList" :key="i"
						style="margin: 20rpx 0;">
						<view style="display: flex">
							<image style="width: 156rpx;height: 156rpx;" :src="pro.projectImg[0]">
							</image>
							<view style="width: 76%;">
								<view style="display: flex;font-size: 29rpx;height: 100rpx;margin-left: 20rpx;">
									<view style="width: 80%;color: #3D3F3E;font-weight: bold;">
										{{pro.projectName}}
									</view>
									<view style="width: 20%;color: #A5A7A7;text-align: end;">
										x{{pro.projectNumber}}
									</view>
								</view>
								<view style="font-size: 22rpx;color: #EC5722;text-align: end;">
									<text style="font-size: 40rpx;">{{pro.projectPrice}}</text>元
								</view>
							</view>
						</view>
					</view>
					<view class="time">
						预约时间：{{item.expectTime}}
					</view>
					<view class="btns">
						<view @click.stop='backFix(item)' class="btn-white"
							v-if="item.orderStatus=='待评价'||item.orderStatus=='已完成'">返修</view>
						<view @click.stop='contactMaster' class="btn-green" v-if="item.orderStatus=='待上门'" @click="handleRoute(item)">联系师傅</view>
						<view @click.stop='appraise(item)' class="btn-green" v-if="item.orderStatus=='待评价'">去评价</view>
						<view @click.stop='pay(item)' class="btn-green" v-if="item.orderStatus=='待支付'">去支付</view>
						<view @click.stop='orderDetail(item.orderId)' class="btn-green" v-if="item.orderStatus=='服务中【审核通过】'">确认方案</view>
					</view>
				</view>
			</view>

		</z-paging>


		<!-- 返修 -->
		<u-modal :show="repairOrderShow" title="温馨提示" showCancelButton confirmColor='#9FD6BA'
			@cancel="repairOrderShow=false" @confirm="repairOrderHandle">
			<view style="width: 100%;text-align: center;">
				是否确认申请返修?
			</view>
		</u-modal>


		<!-- 筛选 -->
		<u-popup :show="showScreen" @close="showScreen=false" closeable zIndex='100'>
			<view style="margin:70rpx 50rpx;">
				<view style="text-align: center;margin-bottom: 40rpx;font-weight: bold;">
					筛选
				</view>
				<view class="screen">
					<!-- 	<view class="title">
						选择门店
					</view>
					<u-checkbox-group activeColor="#72DAA4" shape="circle" v-model="checkboxValue1" placement="column"
						@change="checkboxChange">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in checkboxList1"
							:key="index" :label="item.name" :name="item.name">
						</u-checkbox>
					</u-checkbox-group> -->
					<view class="title" style="margin-top: 20rpx;">
						时间
					</view>
					<view style="display: flex;flex-wrap: wrap;">
						<view v-for="(ti,index) in times" :key='index' @click="timeChange(ti)"
							:class="[activeTimes==ti?'time-active':'time']">
							{{ti}}
						</view>
					</view>

					<view style="display: flex;margin-top: 20rpx;">
						<view class="date-class">
							<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChangeBegin">
								<text style="color: #A5A7A7;padding-left: 24rpx">{{beginTime}}</text>
							</picker>
							<view style="   display: flex;align-items: center;" @click="dateClear('begin')">
								<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
							</view>
						</view>
						<view
							style="width: 36rpx;height: 4rpx;background: #A5A7A7;border-radius: 2rpx;margin: 30rpx 14rpx;">

						</view>
						<view class="date-class">
							<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChangeEnd">
								<text style="color: #A5A7A7;padding-left: 24rpx">{{endTime}}</text>

							</picker>
							<view style=" display: flex;align-items: center;" @click="dateClear('end')">
								<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
							</view>
						</view>
					</view>

					<view class="btn">

						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/c804038468f4457a9f3cfddaceca81f8.png"
							@click="refresh"></image>
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/d8318d98692148449518ada0130e641b.png"
							@click="queryList()"></image>
					</view>
				</view>
			</view>
		</u-popup>

			<u-toast ref="uToast"></u-toast>
	</view>
</template>


<script>
	import {
		getOrderList,
		repairOrder
	} from '@/api/order.js'
	import storage from '@/utils/storage'
	import formatter from '@/utils/formatter.js'

	export default {
		data() {

			return {
				repairOrderShow: false,
				repairInfo:{},
				activeTimes: '',
				date: '年月日',
				checkboxValue1: [],
				// 基本案列数据
				checkboxList1: [],
				showScreen: false,
				jiaji: false,
				search: '',
				menuButtonInfoWidth: 0,
				type: 0,
				list1: [{
					name: '全部',
				}, {
					name: '待接单',
				}, {
					name: '待上门'
				}, {
					name: '待验收'
				}, {
					name: '待支付'
				}, {
					name: '售后中'
				}],
				times: ['最近三天', '最近7天', '最近15天', '近1月', '近2月', '近3月'],
				orderList: [], //订单数据
				current: 0, //当前选中的索引
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					endTime: '',
					beginTime: ''
				},
				endTime: '', //显示的时间
				beginTime: '',
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onReady() {
			//获取小程序胶囊位置
			// #ifdef MP-WEIXIN
			this.menuButtonInfoWidth = uni.getMenuButtonBoundingClientRect().width + 80
			// #endif

		},
		onShow() {
			this.getOrderlistHandle(1, 10)
		},
		onLoad(option) {
			console.log(option.item);
			this.queryParams.clientId = storage.get('ClientId')
			// getInfoById(storage.get('ClientId')).then(res => {
			// 	console.log(res);
			// 	this.clientName=res.data.clientName
			// 	//	this.fileList.push({url:arr[0]})
			// })
			if (option.item == undefined) {
				this.statusClick({
					name: '全部'
				})
			} else {
				let item = JSON.parse(option.item)
				//	this.$refs.paging.reload();
				this.current = item.index
				this.statusClick({
					name: item.name
				})
			}

		},
		methods: {

			handleRoute(item) {
				let id = 'C2C'+item.workerId
				const url = `../../../subpkgChat/TUI-Chat/chat?conversationID=${id}`;
				uni.navigateTo({
					url
				});
			},


			show(){
				console.log(11111);
				this.showScreen = true
			},
			checkType(num) {
				this.type = num
			},
			//状态切换
			statusClick(item) {
				if (item.index) {
					this.$refs.paging.reload();
				}

				console.log('item', item);
				if (item.name != '全部') {
					this.queryParams.orderStatus = item.name
				} else {

					this.queryParams.orderStatus = ''
					console.log(this.queryParams);
					this.getOrderlistHandle(1, 10)
				}

			},
			getOrderlistHandle(pageNo, pageSize) {
				console.log(this.queryParams);
				this.showScreen = false
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				uni.showLoading({
					mask: true
				});
				getOrderList(this.queryParams).then(res => {
					console.log(res);
					res.rows.forEach(i => {
						i.projectDataVoList.forEach(item => {
							item.projectImg = item.projectImg != null ? item.projectImg.split(
								',') : []
						})
					})
					console.log(res, '.......2');
					uni.hideLoading();
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
			},
			//条件查询
			queryList() {
				console.log(this.queryParams);
				this.$refs.paging.reload();
			},
			refresh() {
				this.reset()
				console.log(1111);
				this.$refs.paging.reload();
			},
			//日期清空
			dateClear(type) {
				console.log(11111);
				if (type == 'begin') {
					this.queryParams.beginTime = ''
					this.beginTime = ''
				} else {
					this.queryParams.endTime = ''
					this.endTime = ''
				}
			},
			reset() {
				console.log(1111);
				this.queryParams.endTime = ''
				this.queryParams.beginTime = ''
				this.queryParams.projectName = ''
				this.endTime = ''
				this.beginTime = ''
				this.activeTimes = ''
			},
			//订单详情
			orderDetail(id) {
				uni.navigateTo({
					url: '../../car/orderDetail/orderDetail?id=' + id
				})
			},
			checkboxChange(n) {
				console.log('change', n);
			},
			bindDateChangeBegin: function(e) {
				console.log(e.detail.value);
				this.queryParams.beginTime = e.detail.value
				this.beginTime = e.detail.value
			},
			bindDateChangeEnd: function(e) {
				this.queryParams.endTime = e.detail.value
				this.endTime = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			timeChange(time) {
				console.log(time);
				this.activeTimes = time
				var date = new Date()
				var list = formatter.getDateByCode(time)

				console.log(list);
				this.queryParams.beginTime = list.startTime
				this.queryParams.endTime = list.endTime
			},
			//评价
			appraise(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../car/appraise/appraise?id=' + item.orderId
				})
			},
			//支付
			pay(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../car/pay/pay?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			backFix(item){
				this.repairInfo=item
				this.repairOrderShow=true
			},
			//申请返修
			repairOrderHandle() {
				repairOrder(this.repairInfo).then(res => {
					console.log(res);

					this.$refs.uToast.show({
						type: 'error',
						message: res.data.msg
					});
					this.repairOrderShow=false
					this.getOrderlistHandle(1, 10)
				})
			}

		}
	}
</script>


<style>
	page {
		background: #F5F9FA;
	}
</style>

<style lang="scss">
	.my-order {
		.top {
			background: #fff;
			//padding: 20rpx 20rpx 0 20rpx;

			.type {
				width: 707rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
				border-radius: 14rpx;
				background: #F5F9FA;

				text {
					margin: 10rpx 6rpx;
					display: inline-block;
					width: 340rpx;
					height: 65rpx;
					border-radius: 11rpx;
					font-size: 33rpx;
					text-align: center;
					line-height: 65rpx;
					color: #A5A7A7;
				}

				.text-active {
					background: #fff;
					color: #3D3F3E;
					font-weight: bold;
				}

			}
		}

		.orders {
			position: relative;
			margin: 20rpx auto;
			width: 707rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.main {
				padding: 20rpx;

				.title {
					display: flex;
					border-bottom: 2rpx solid #F8F8F8;
					padding-bottom: 20rpx;
				}

				.time {

					font-size: 25rpx;
					color: #3D3F3E;
					padding-top: 20rpx;
					border-top: 2rpx solid #F8F8F8;
				}

				.btns {
					width: 100%;
					display: flex;
					justify-content: flex-end;

					.btn-white,
					.btn-green {
						width: 199rpx;
						border-radius: 45rpx;
						text-align: center;
						font-size: 30rpx;
						margin: 15rpx 0 0 10rpx;
					}

					.btn-white {
						height: 55rpx;
						background: #FFFFFF;
						border: 4rpx solid #9FD6BA;
						color: #9FD6BA;
						line-height: 55rpx;
					}

					.btn-green {
						line-height: 60rpx;
						height: 60rpx;
						background: #9FD6BA;
						color: #fff;
					}
				}
			}
		}

		.screen {
			height: 500rpx;

			.title {
				font-size: 29rpx;
				color: #3D3F3E;
				font-weight: bold;
				margin-bottom: 30rpx;
			}

			.date-class {
				width: 290rpx;
				height: 60rpx;
				background: #F5F9FA;
				border-radius: 30rpx;
				line-height: 60rpx;
				text-align: center;
				display: flex;
				font-size: 25rpx;

				.picker {
					width: 80%;
				}
			}

			.time,
			.time-active {
				margin: 5rpx 7rpx 20rpx 7rpx;
				width: 203rpx;
				border-radius: 50rpx;
				line-height: 60rpx;
				text-align: center;
				height: 60rpx;
			}

			.time-active {
				background: #f0fbf5;
				border: 2rpx solid #79d9a7;
			}

			.time {

				background: #f5f9fa;

			}

			.btn {
				display: flex;

				image {
					width: 337rpx;
					height: 71rpx;
					margin: 69rpx 10rpx;
				}
			}
		}

		::v-deep.u-transition,
		.u-fade-enter-to,
		.u-fade-enter-active {
			z-index: 99 !important;
		}
	}
</style>
