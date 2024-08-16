<template>
	<view class="order">

		<z-paging ref="paging" v-model="orderList" @query="getOrderlistHandle" @onRefresh="refresh">
			<view slot='top'>
				<u-grid :border="false" @click="click" col="5">
					<!-- 
					<u-grid-item v-for="(item,index) in list" :key="index">
						<view style="position: relative;">
							<u-badge style="font-size: 18rpx;" max="99" :value="item.num" :offset="[2,-12]"
								:absolute='true' bgColor='#EC5722'></u-badge>
							<img :src="item.img" style="width: 39rpx;height: 36rpx;padding-top: 20rpx;">

						</view>
						<text class="grid-text">{{item.name}}</text>
					</u-grid-item> -->
				</u-grid>
				<view class="header">
					<view class="input">
						<u-search :showAction="false" placeholder="门店名称或者订单编号" @clear='getOrderlistHandle(1,10)'
							v-model="queryParams.searchValue" @search="getOrderlistHandle(1,10)">
						</u-search>
					</view>
					<view class="input-s"></view></input>
					<view class="header-type">
						<view class="filter-row acea-row row-between-wrapper">
							<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
								:class="{on: queryParams.orderStatus === item.type}" @click="productSort(item.type)">
								{{item.label}}
							</view>
						</view>
					</view>

				</view>
			</view>

			<view class="orders" @click="orderDetail(item.orderId,item.orderStatus)" v-for='(item,index) in orderList'
				:key='index'>
				<view class="main">
					<view class="title">
						<view class="top">
							<view
								style="font-size: 35rpx;display: flex; align-items: center;justify-content: space-between;font-weight: bold;">
								<view class=" acea-row row-middle">
									{{item.warrantyStore||''}}
									<text v-if="item.isClientAppoint==1" class="appoint">门店指派</text>
								</view>
								<img style="width: 83rpx;height: 36rpx;" v-if="item.isUrgent==1||item.isUrgent==2"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/29/eeb5bc2c7ec840c89dfd9e73d7457775.png">
							</view>
							<view style="display: flex;margin: 16rpx 0 10rpx;">
								订单号：{{item.orderNumber}}
								<view @click.stop="copy(item.orderNumber)">
									<image
										src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/21/57de362ad312499d93634d2ae9021099.png"
										style="width: 29rpx;height: 29rpx;margin-left: 10rpx;"></image>
								</view>
							</view>

						</view>
						<view class="bottom">
							<view>下单时间：{{item.orderTime}}</view>
							<view :style="{'color':item.orderStatus=='待接单'||item.orderStatus=='售后中'||item.orderStatus=='待评价'?'#F3B133':
								item.orderStatus=='待上门'?'#3398F3':
								item.orderStatus=='已完成'?'#A5A7A7':'#A4D091'}">{{item.orderStatus=='师傅取消'?'师傅已取消,重新指派中':item.orderStatus}}
							</view>
						</view>
					</view>
					<view v-if="item.projectVoList!=null&&item.projectVoList.length!=0"
						v-for="(info,i) in item.projectVoList" :key="i" style="margin: 20rpx 0;">
						<view class="card">
							<view class="">
								<view :style="{'display':'flex','height':130+'rpx'}">
									<view v-if="info.img.length==0||info.img[0]==''" :style="{'width':130+'rpx'}"
										class="no-img">
										<img style="width:110rpx ;height: 77rpx;"
											src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
											mode=""></img>
										<text>暂无图片</text>
									</view>
									<view v-else style="position: relative;">
										<view v-if="type=='myOrder'"
											:class="!info.projectType||info.projectType==0?'weixiu':info.projectType==1?'baoyang':''">
											{{!info.projectType||info.projectType==0?'维修':info.projectType==1?'维保':''}}
										</view>
										<img :style="{'width':130+'rpx','height':'100%','border-radius':'11rpx'}"
											:src="info.img[0]">
										</img>
										<!-- 	<view class="weixiu" >
										维修
									</view> -->
									</view>

									<view
										style="flex: 1;display: flex;flex-direction: column; padding-left:20rpx;justify-content: space-between;height: 100%;font-size: 25rpx;">
										<view style="display: flex;">
											<view style="width: 80%;color: #3D3F3E;font-weight: bold;font-size: 35rpx;">
												{{info.serviceName||'暂无'}}
											</view>
											<view style="width: 20%;color: #A5A7A7;text-align: end;">
												x{{info.projectNumber}}
											</view>
										</view>
										<view style="display: flex;">
											<view style="width: 80%;color: #A5A7A7;">
												{{info.serviceTypeName||'暂无'}}
											</view>
											<view style="width: 20%;text-align: end;color: #EC5722;">
												¥{{info.projectPrice}}

											</view>

										</view>
										<view style="display: flex;justify-content: space-between;">
											<text style="color: #A5A7A7;">工时：{{info.projectHours}}分钟</text>
											<text v-if="type=='repair'"
												style="font-size: 30rpx;color: #EC5722;">服务费：¥{{Number(info.price)*Number(info.projectNumber)}}</text>
										</view>

									</view>
								</view>
							</view>

						</view>
					</view>
					<view class="acea-row row-between-wrapper" style="margin:20rpx 0 21rpx;">
						<text style="font-size:24rpx ;">订单利润：￥{{item.profitAmount||0}}</text> <text
							style="color: #EC5722;text-align: end;font-weight: bold;">应付款：￥{{item.orderPrice||0}}</text>
					</view>
					<view class="time">
						<text>预约上门时间：{{item.expectTime}}</text>
						<text>由{{item.typeName||'人员'}}维修</text>
					</view>
					<!-- 	<view class="btns">
						<view @click.stop='orderDetail(item.orderId)' class="btn-white"
							v-if="item.orderStatus=='待评价'||item.orderStatus=='已完成'">
							返修</view>
						<view @click.stop='orderDetail(item.orderId)' class="btn-green" v-if="item.orderStatus=='待评价'">
							去评价</view>
						<view @click.stop='pay(item)' class="btn-green" v-if="item.orderStatus=='待支付'">去支付</view>
						<view @click.stop='orderDetail(item.orderId)' class="btn-green"
							v-if="item.orderStatus=='服务中【审核通过】'">
							确认方案</view>
					</view> -->
				</view>
			</view>

		</z-paging>


	</view>
</template>

<script>
	import {
		// repairOrder,
		// queryOrderCount,
		getPartnerBrandOrderList
	} from '@/api/order.js'

	import {
		queryUnreadNum
	} from '@/api/invite.js'
	import storage from '@/utils/storage'
	import formatter from '@/utils/formatter.js'
	import projectCard from '@/components/projectCard/projectCard.vue'
	export default {
		components: {
			projectCard
		},
		data() {
			return {
				orderList: [],
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					customerId: "",
					orderStatus: ''
				},
				searchTypes: [{
						type: '',
						label: '全部',

					},
					{
						type: '待审核',
						label: '待审核',

					},
					{
						type: '待接单',
						label: '待接单',

					},
					{
						type: '待签到',
						label: '待签到',

					},
					{
						type: '待服务',
						label: '待服务',

					},

					{
						type: '服务中',
						label: '服务中',

					}
				],
				// list: [{
				// 		name: '待服务',
				// 		img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/b4ac3b7d1a7d4a5e91d82e4a4fcad32d.png',
				// 		num: 0,
				// 		val: 'waitService'
				// 	},
				// 	{
				// 		name: '服务中',
				// 		img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/ad35c651adda44e9be897bc7d1a4b193.png',
				// 		num: 0,
				// 		val: 'servicing'
				// 	},
				// 	{
				// 		name: '待付款',
				// 		img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/9244875972c54c91a934c1265cd95eb4.png',
				// 		num: 0,
				// 		val: 'waitPay'
				// 	},
				// 	{
				// 		name: '返修',
				// 		img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/64ca56e7c5ef40ffa55f2339198effe5.png',
				// 		num: 0,
				// 		val: 'repair'
				// 	},
				// 	{
				// 		name: '全部订单',
				// 		img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/57449f60ec5e4d189e21a6aa57e4f15c.png',
				// 		num: 0,
				// 		val: 'total'
				// 	},
				// ],
				customerId: ""
			};
		},
		onLoad(options) {
			if (options && options.id) {
				this.queryParams.customerId = options.id
			} else {
				this.queryParams.userId = storage.get('ClientId')
			}
		},
		onShow() {
			// this.queryParams.clientId = storage.get('ClientId')
			// if (storage.get('AccessToken')) {

			// 	// getOrderNum().then(res => {
			// 	// 	uni.setTabBarBadge({
			// 	// 		index: 3,
			// 	// 		text: res
			// 	// 	})
			// 	// })
			// 	queryUnreadNum().then(ress => {
			// 		let num = (parseInt(totalUnreadCount) + parseInt(ress.data.num)) > 99 ? '99+' : parseInt(
			// 			totalUnreadCount) + parseInt(ress.data.num)

			// 		if (num > 0) {
			// 			uni.setTabBarBadge({
			// 				index: 2,
			// 				text: num + ''
			// 			})
			// 		} else {
			// 			uni.removeTabBarBadge({
			// 				index: 2
			// 			})
			// 		}
			// 	})
			// } else {
			// 	uni.navigateTo({
			// 		url: '/pages/login/index'
			// 	})
			// }
		},
		methods: {
			// click(e) {
			// 	console.log(e);
			// 	uni.navigateTo({
			// 		url: '../../subpkg/center/myOrder/myOrder?name=' + this.list[e].name
			// 	})
			// },
			productSort(type) {
				this.queryParams.orderStatus = type
				// this.getOrderlistHandle(1, 10)
				this.$refs.paging.reload();
			},
			getOrderlistHandle(pageNo, pageSize) {
				console.log(this.queryParams);
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				uni.showLoading({
					mask: true
				});
				getPartnerBrandOrderList(this.queryParams).then(res => {
					console.log(res);
					res.rows.forEach(i => {
						i.projectVoList && i.projectVoList.forEach(item => {
							item.img = item.serviceProjectImg != null ? item.serviceProjectImg
								.split(
									',') : []
						})
					})
					uni.hideLoading();
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
				// queryOrderCount({
				// 	clientId: storage.get('ClientId')
				// }).then(res => {
				// 	console.log(res);

				// 	this.list.forEach(item => {
				// 		item.num = res.data[item.val]
				// 		// item.badge.value = res.data[item.value] == null ? 0 : res.data[item.value]
				// 	})
				// })
			},
			//申请返修
			// repairOrderHandle() {
			// 	repairOrder(this.repairInfo).then(res => {
			// 		console.log(res);

			// 		this.$refs.uToast.show({
			// 			type: 'error',
			// 			message: res.data.msg
			// 		});
			// 		this.repairOrderShow = false
			// 		this.getOrderlistHandle(1, 10)
			// 		// this.getNum()
			// 	})
			// },
			//复制单号
			copy(n) {
				console.log(n);
				uni.setClipboardData({
					data: n,
					success: function() {
						console.log('success');
					}
				});
			},
			//评价
			// appraise(item) {
			// 	console.log(item);
			// 	uni.navigateTo({
			// 		url: '../../subpkg/car/appraise/appraise?id=' + item.orderId
			// 	})
			// },
			//支付
			pay(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../subpkg/car/pay/pay?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			//订单详情
			// orderDetail(id, type) {
			// 	if (type == '售后中') {
			// 		let info = {
			// 			id: id
			// 		}
			// 		uni.navigateTo({
			// 			url: '../../subpkg/car/repairingOrder/repairingOrder?info=' + JSON.stringify(info)
			// 		})
			// 	} else {
			// 		uni.navigateTo({
			// 			url: '../../subpkg/car/orderDetail/orderDetail?id=' + id
			// 		})
			// 	}

			// },
			refresh() {
				this.$refs.paging.reload();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		padding: 16rpx 0 0rpx;

		.input {
			height: 56rpx;
			color: #333;
			margin: 10rpx 22rpx 30rpx;

			// &-s {
			// 	position: absolute;
			// 	top: 15rpx;
			// 	left: 40rpx;
			// 	width: 25rpx;
			// 	height: 25rpx;
			// 	background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;
			// 	background-size: 100% 100%;
			// }
		}

		&-type {
			font-size: 26rpx;
			justify-content: space-between;

			.filter-row {
				box-sizing: border-box;
				height: 88rpx;
				margin-top: 20rpx;
				border-top: 1rpx solid #ececec;
				padding: 0 30rpx;

				.filter-row-item {
					color: #969799;
					font-size: 28rpx;
					margin-right: 30rpx;

					&:last-of-type {
						margin-right: 0;
					}

					&.on {
						color: #323233;
						position: relative;

						&.on::after {
							content: "";
							position: absolute;
							height: 6rpx;
							background: #A4D091;
							border-radius: 3rpx;
							width: 100%;
							bottom: -24rpx;
							left: 0;

						}
					}



					image {
						display: inline-block;
						width: 16rpx;
						height: 20rpx;
						margin: 8rpx 6rpx 0;
					}

					.sort {
						width: 14rpx;
						height: 20rpx;
						color: #999999;
					}

					.bottomsort {
						transform: rotate(180deg)
					}
				}
			}
		}
	}

	.order {
		.top {
			background: #fff;
			padding-top: 14rpx;

			.grid-text {
				font-size: 22rpx;
				color: #3D3F3E;
				padding-bottom: 20rpx;
				/* #ifndef APP-PLUS */
				box-sizing: border-box;
				/* #endif */
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
				padding: 20rpx 20rpx 30rpx;

				.title {
					display: flex;
					flex-direction: column;
					border-bottom: 2rpx solid #F8F8F8;
					padding-bottom: 10rpx;
					font-size: 26rpx;

					.top {
						// display: flex;
						// justify-content: space-between;

						.right {
							//background-color: red;
							padding: 8rpx 28rpx 8rpx 20rpx;
							font-weight: bold;
							font-size: 34rpx;
							color: #fff;
							display: flex;
							border-radius: 56rpx;
							height: 20%;
							margin-top: 10rpx;
						}
					}

					.bottom {
						display: flex;
						justify-content: space-between;
						width: 100%;
					}
				}

				.time {

					font-size: 25rpx;
					color: #3D3F3E;
					padding-top: 20rpx;
					border-top: 2rpx solid #F8F8F8;
					display: flex;
					justify-content: space-between;
				}


			}
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
				border: 4rpx solid #A4D091;
				color: #A4D091;
				line-height: 55rpx;
			}

			.btn-green {
				line-height: 60rpx;
				height: 60rpx;
				background: #A4D091;
				color: #fff;
			}
		}

	}

	.card {
		// .weixiu {
		// 	color: #fff;
		// 	position: absolute;
		// 	top: 0;
		// 	font-size: 26rpx;
		// 	background: #1890ff;
		// 	padding: 0rpx 8rpx;
		// }

		.weixiu,
		.baoyang {
			width: 65rpx;
			height: 36rpx;
			background: #E1E9FC;
			border-radius: 0rpx 7rpx 7rpx 0rpx;
			font-size: 22rpx;
			color: #383C45;
			line-height: 36rpx;
			text-align: center;
			position: absolute;
			top: 13rpx;
			z-index: 100;
		}

		.weixiu {
			background: #E1E9FC;
		}

		.baoyang {
			background: #E6F1EB;
		}

		.no-img {
			// width: 170rpx;
			height: 100%;
			background: #F4F4F4;
			border-radius: 11rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			// margin: 18rpx;

			text {
				font-size: 22rpx;
				color: #A4D091;
			}
		}
	}

	.appoint {
		color: #fff;
		background-color: black;
		border-radius: 7rpx;
		font-size: 22rpx;
		font-weight: 400;
		text-align: center;
		padding: 4rpx 17rpx;
		margin-left: 12rpx;
	}
</style>