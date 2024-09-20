<template>
	<view class="page">
		<view class="page-peo">
			<view class="page-peo-rightTop acea-row row-middle row-center" @click="goDetailed">查看订单</view>
			<view class="page-peo-wenan">预约成功，匹配师傅中！</view>
			<view class="page-peo-time">
				<u-count-down :time="900000" format="mm:ss" autoStart millisecond @change="onChange">
					<view class="time">
						<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
						<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
					</view>
				</u-count-down>
				后将自动关闭！
			</view>
			<view class="page-peo-list acea-row row-between-wrapper">
				<view class="page-peo-list-item flex-colum-center" v-for="(item) in sfList" :key="item.id">
					<image :src="item.img" mode=""></image>
					<text>{{item.label}}</text>
				</view>
			</view>
		</view>
		<view v-if="workerList.length!=0" class="page-peo">
			<view class="page-peo-name acea-row">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/3dcf64d5acb7412d869844de109a5ec0.png"
					mode=""></image>
				<text>订单指派师傅</text>
			</view>
			<view class="page-peo-title">
				如指派师傅超30分钟未响应，订单将由其他师傅接单服务
			</view>
			<view class="page-peo-listOther acea-row ">
				<view class="page-peo-list-item flex-colum-center" v-for="(item) in workerList" :key="item.id"
					style="width: 20%;margin: 20rpx 0;">
					<image v-if="item.avatarUrl" :src="item.avatarUrl" mode=""></image>
					<image v-else
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png"
						mode=""></image>
					<text>{{item.workerName}}</text>
				</view>
			</view>
		</view>
		<view class="page-peo">
			<view class="page-peo-three">
				<view class="page-peo-three-list">
					<text>订单编号：</text>
					<view class="">
						<view v-for="(item,index) in info.orderId" :key="index">
							<text class="page-peo-three-list-text">{{item}}</text></br>
						</view>
					</view>

				</view>
				<view class="page-peo-three-list">
					上门时间：
					<text>{{info.expectTime}}</text>
				</view>
				<view class="page-peo-three-list acea-row">
					合计费用 ：<view style="margin-left: 4rxp;">¥{{info.money}}（*不含材料费）</view>
				</view>
			</view>
		</view>
		<view class="page-bottom acea-row row-middle">
			<view @click="callPhone" class="page-bottom-btn acea-row row-center row-middle">在线客服</view>
			<!-- 	<view class="page-bottom-btn acea-row row-center row-middle">修改订单</view> -->
			<!-- 			<view class="page-bottom-btn page-bottom-btn2 acea-row row-center row-middle">消息通知</view> -->
		</view>
		<yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" permissionID="CALL_PHONE"> </yk-authpup>

		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
	</view>


</template>

<script>
	import ykAuthpup from "@/components/yk-authpup/yk-authpup";
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		components: {
			ykAuthpup
		},
		data() {

			return {
				actionList: [{
						name: '0571-88387761'
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
				showPhone: false,
				type: '',
				timeData: {},
				info: {},
				dateDiff: 0,
				workerList: [],
				sfList: [{
						id: 0,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/caeec36c1eb3413982e1aa95704cbe56.png",
						label: "订单发布",
						url: "",
					},
					{
						id: 1,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/1b1f2eb6e9014e5f912bbbc76b52f6b0.png",
						label: "师傅接单",
						url: "",
					},
					{
						id: 2,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/6ce9c08313fc4b7583e5fa4eb310f2ff.png",
						label: "师傅上门",
						url: "",
					},
					{
						id: 3,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/899a8bc0a5a6463bbd0770a28f422d45.png",
						label: "服务验收",
						url: "",
					},
					{
						id: 4,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/fef430e9f6fe4be0b093064c5431da51.png",
						label: "支付订单",
						url: "",
					},

				]
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.info)
			this.workerList = this.info.workerList
			console.log(this.info);
		},
		onUnload() {
			// const pages = uni.$u.pages();
			// console.log(pages);
			// //#ifdef MP-WEIXIN
			// // wx.reLaunch({
			// // 	url: '/pages/index/index'
			// // })
			// //#endif
			console.log(this.type);
			if (this.type == '查看订单') return
			uni.switchTab({
				url: '/pages/home/index'
			})
		},
		methods: {
			// backHome() {
			// 	uni.switchTab({
			// 		url: '/pages/home/index'
			// 	})
			// },
			//倒计时
			onChange(e) {
				this.timeData = e
				if (e.days == 0 && e.hours == 0 && e.milliseconds == 0 && e.minutes == 0 && e.seconds == 0) {
					this.dateDiff = 0
				}
			},
			//查看订单
			goDetailed() {
				this.type = '查看订单'
				uni.switchTab({
					url: '/pages/order/order'
				})
				console.log(this.info);
			},
			//倒数计时15分钟时间
			timeFn(d1) { //di作为一个变量传进来
				//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
				var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
				var dateEnd = new Date(); //获取当前时间
				var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
				//var dateDiff=1000000
				//	console.log(dateDiff);
				if (dateDiff > 900000) {
					this.dateDiff = 0
				} else {
					this.dateDiff = Number((dateDiff - 900000).toString().substring(1))
				}
				//console.log(Number((dateDiff - 900000).toString().substring(1)));
			},
			changeAuth() {
				this.showPhone = true
			},
			callPhone() {
				// #ifdef APP-PLUS
				this.$refs['authpup'].open()
				// #endif
				// #ifdef MP-WEIXIN
				this.showPhone = true
				// #endif
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(e.name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(e.name, 'wx')
					// #endif
					this.showPhone = false
				}
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
	.page {
		min-height: 100vh;
		padding: 22rpx 0rpx 0rpx;
		position: relative;

		&-peo {
			// height: 387rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
			position: relative;
			padding: 10rpx 26rpx 0;
			margin: 0 22rpx 22rpx;


			&-rightTop {
				position: absolute;
				top: 0;
				right: 0;
				width: 171rpx;
				height: 58rpx;
				background: #A4D091;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 0rpx 14rpx 0rpx 7rpx;
				color: #fff;
			}

			&-wenan {
				font-size: 40rpx;
				color: #3D3F3E;
				margin: 34rpx 0 19rpx 6rpx;
			}

			&-time {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 25rpx;
				color: #A5A7A7;
				margin: 0 0 20rpx 6rpx;
				display: flex;
			}

			&-list {
				height: 208rpx;
				border-top: 1rpx solid #F8F8F8;

				image {
					width: 69rpx;
					height: 72rpx;
					margin-bottom: 18rpx;
				}

				text {
					font-size: 29rpx;
					color: #3D3F3E;
				}
			}

			&-listOther {
				// height: 203rpx;

				image {
					width: 87rpx;
					height: 87rpx;
					margin-bottom: 13rpx;
				}

				text {
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 25rpx;
					color: #3D3F3E;
				}
			}

			&-name {
				padding: 30rpx 0 0 0;

				image {
					width: 42rpx;
					height: 42rpx;
					margin: 0 10rpx 0 10rpx;
				}

				font-size: 33rpx;
				color: #3D3F3E;
			}

			&-title {
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 25rpx;
				color: #3D3F3E;
				margin: 20rpx 0 0rpx;
			}

			&-three {
				padding: 30rpx 8rpx 40rpx;

				&-list {
					font-size: 29rpx;
					color: #3D3F3E;
					margin-bottom: 16rpx;
					display: flex;

					&-text {
						color: #A5A7A7;
						margin-left: 4rpx;
					}
				}
			}
		}

		&-bottom {
			width: 100%;
			height: 134rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			width: 100%;
			position: fixed;
			bottom: 0rpx;
			z-index: 10;
			padding: 0 32rpx;
			justify-content: flex-end;
			box-sizing: border-box;

			&-btn {
				width: 159rpx;
				height: 65rpx;
				background: #FFFFFF;
				border-radius: 45rpx;
				border: 4rpx solid #A4D091;
				font-size: 29rpx;
				color: #A4D091;
				margin-left: 16rpx;
			}

			&-btn2 {
				background: #A4D091;
				color: #FFFFFF;
			}
		}
	}
</style>