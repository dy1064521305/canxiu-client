<template>
	<view class="order">

		<z-paging ref="paging" v-model="orderList" @query="getOrderlistHandle" @onRefresh="refresh">
			<view slot='top'>
				<view class="top">
					<u-grid :border="false" @click="click" col="5">

						<u-grid-item v-for="(item,index) in list" :key="index">
							<view style="position: relative;">
								<u-badge style="font-size: 18rpx;" max="99" :value="item.num" :offset="[2,-12]"
									:absolute='true' bgColor='#EC5722'></u-badge>
								<img :src="item.img" style="width: 39rpx;height: 36rpx;padding-top: 20rpx;">

							</view>
							<text class="grid-text">{{item.name}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</view>


			<view class="orders" @click="orderDetail(item.orderId,item.orderStatus)" v-for='(item,index) in orderList'
				:key='index'>
				<view class="main">
					<view class="title">
						<view class="top">
							<view
								style="font-size: 35rpx;display: flex; align-items: center;justify-content: space-between;font-weight: bold;">
								<view style="display: flex;align-items: center;">
									<text v-if="item.warrantyStore!=null" style="margin-right: 15rpx;">{{item.warrantyStore}}</text>
									<text v-if="item.isClientAppoint==1" class="appoint">门店指派</text>
								</view>
								<img style="width: 83rpx;height: 36rpx;" v-if="item.isUrgent==1||item.isUrgent==2"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/29/eeb5bc2c7ec840c89dfd9e73d7457775.png">
							</view>
							<view style="display: flex;margin: 7rpx 0;">
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
					<view class="">

					</view>
					<view v-if="item.projectDataVoList!=null&&item.projectDataVoList.length!=0"
						v-for="(pro,i) in item.projectDataVoList" :key="i" style="margin: 20rpx 0;">

						<project-card :pro='pro' type='myOrder' />
					</view>
					<view style="color: #EC5722;text-align: end;font-weight: bold;margin-bottom: 21rpx;">
						应付款：￥{{item.orderPrice}}
					</view>
					<view class="time">
						<text>预约上门时间：{{item.expectTime}}</text>
						<text>由{{item.workerType!=null&&item.workerType}}维修</text>
					</view>
					<view class="btns">
						<!-- 	<view @click.stop='backFix(item)' class="btn-white"
							v-if="item.orderStatus=='待评价'||item.orderStatus=='已完成'">返修</view> -->
						<!-- 	<view @click.stop='contactMaster' class="btn-green" v-if="item.orderStatus=='待上门'"
							@click="handleRoute(item)">联系师傅</view> -->
						<view @click.stop='orderDetail(item.orderId)' class="btn-white"
							v-if="item.orderStatus=='待评价'||item.orderStatus=='已完成'">
							返修</view>
						<view @click.stop='orderDetail(item.orderId)' class="btn-green" v-if="item.orderStatus=='待评价'">
							去评价</view>
						<view @click.stop='pay(item)' class="btn-green" v-if="item.orderStatus=='待支付'">去支付</view>
						<view @click.stop='orderDetail(item.orderId)' class="btn-green"
							v-if="item.orderStatus=='服务中【审核通过】'">确认方案</view>
					</view>
				</view>
			</view>

		</z-paging>


	</view>
</template>

<script>
	import {
		getOrderList,
		repairOrder,
		queryOrderCount
	} from '@/api/order.js'
	import {
		getOrderNum
	} from '@/utils/api.js'
	import {
		queryUnreadNum
	} from '@/api/tim.js'
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
					queryStatus: '全部订单'
				},
				list: [{
						name: '待服务',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/b4ac3b7d1a7d4a5e91d82e4a4fcad32d.png',
						num: 0,
						val: 'waitService'
					},
					{
						name: '服务中',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/ad35c651adda44e9be897bc7d1a4b193.png',
						num: 0,
						val: 'servicing'
					},
					{
						name: '待付款',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/9244875972c54c91a934c1265cd95eb4.png',
						num: 0,
						val: 'waitPay'
					},
					{
						name: '返修',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/64ca56e7c5ef40ffa55f2339198effe5.png',
						num: 0,
						val: 'repair'
					},
					{
						name: '全部订单',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/57449f60ec5e4d189e21a6aa57e4f15c.png',
						num: 0,
						val: 'total'
					},
				]
			};
		},
		onShow() {

			this.queryParams.clientId = storage.get('ClientId')
			if (storage.get('ClientId')) {
				this.getOrderlistHandle(1, 10)
				getOrderNum().then(res => {
					uni.setTabBarBadge({
						index: 3,
						text: res
					})
				})
				// queryUnreadNum().then(ress => {
				// 	 let num = (parseInt(totalUnreadCount) + parseInt(ress.data.num))>99?'99+': parseInt(totalUnreadCount) + parseInt(ress.data.num)

				// 	if (num > 0) {
				// 		uni.setTabBarBadge({
				// 			index: 2,
				// 			text:num+ ''
				// 		})
				// 	} else {
				// 		uni.removeTabBarBadge({
				// 			index: 2
				// 		})
				// 	}
				// })
			} else {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			}
		},
		methods: {
			// otherFun(){
			// 	this.getOrderlistHandle(1,10)
			// },
			click(e) {
				console.log(e);

				uni.navigateTo({
					url: '../../subpkg/center/myOrder/myOrder?name=' + this.list[e].name
				})
			},
			getOrderlistHandle(pageNo, pageSize) {
				if(!storage.get('ClientId'))return
				console.log(this.queryParams);
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				uni.showLoading({
					mask: true
				});
				getOrderList(this.queryParams).then(res => {
					console.log(res);
					res.rows.forEach(i => {
						i.projectDataVoList && i.projectDataVoList.forEach(item => {
							item.img = item.projectImg != null ? item.projectImg.split(
								',') : []
						})
					})
					console.log(res, '.......2');
					uni.hideLoading();
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
				queryOrderCount({
					clientId: storage.get('ClientId')
				}).then(res => {
					console.log(res);

					this.list.forEach(item => {
						item.num = res.data[item.val]
						// item.badge.value = res.data[item.value] == null ? 0 : res.data[item.value]
					})
				})
			},
			//申请返修
			repairOrderHandle() {
				repairOrder(this.repairInfo).then(res => {
					console.log(res);

					this.$refs.uToast.show({
						type: 'error',
						message: res.data.msg
					});
					this.repairOrderShow = false
					this.getOrderlistHandle(1, 10)
					// this.getNum()
				})
			},
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
			appraise(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../subpkg/car/appraise/appraise?id=' + item.orderId
				})
			},
			//支付
			pay(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../subpkg/car/pay/pay?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			//订单详情
			orderDetail(id, type) {
				if (type == '售后中') {
					let info = {
						id: id
					}
					uni.navigateTo({
						url: '../../subpkg/car/repairingOrder/repairingOrder?info=' + JSON.stringify(info)
					})
				} else {
					uni.navigateTo({
						url: '../../subpkg/car/orderDetail/orderDetail?id=' + id
					})
				}

			},
			refresh() {

				this.$refs.paging.reload();
			},
		}
	}
</script>

<style lang="scss">
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
				padding: 20rpx;



				.title {
					display: flex;
					flex-direction: column;
					border-bottom: 2rpx solid #F8F8F8;
					padding-bottom: 20rpx;
					font-size: 26rpx;

					.top {

						// display: flex;
						// justify-content: space-between;
						.appoint {
							color: #fff;
							background-color: black;
							border-radius: 7rpx;
							font-size: 22rpx;
							text-align: center;
							padding: 8rpx 17rpx;
						}


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
</style>