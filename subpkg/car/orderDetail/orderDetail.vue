<template>
	<view class="order-detail">
		<view class="status" @click="showStep=true">
			<view class="left">
				<view style="display: flex;">
					{{status}}
					<view style="margin-left:40rpx ;">
						<u-count-down v-if="info.orderStatus=='待接单'&&!pipeiStatus" :time="dateDiff" format="mm:ss"
							autoStart millisecond @change="onChange">
							<view class="time">
								<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
								<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
							</view>
						</u-count-down>
						<view v-if="pipeiStatus&&info.orderStatus!='待上门'&&info.orderStatus!='待接单'" style="margin-top: -10rpx;">
							<u-loadmore status="loading" :loading-text="loadingText" />
						</view>
					</view>
				</view>
				<view>{{content}}<br />
					<text v-if="info.orderStatus=='待上门'">
						上门时间{{info.expectTime}}
					</text>
				</view>
			</view>
			<view style="display: flex;align-items: center;">
				<image style="width:14rpx;height: 25rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
				</image>
			</view>
		</view>

		<view class="worker bg" @click="workerDetailed" v-if="info.orderStatus!='待接单'">
			<view class="title">
				本单维修师
			</view>
			<view class="info">
				<image style="width:98rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/05/2b752f2fa84446d8867149d48996ec45.png"
					mode="widthFix"></image>
				<view style="margin-left:14rpx ;width: 85%;">
					<view style="font-size: 31rpx;color: #3D3F3E;font-weight: bold;margin: 10rpx 0;">
						洪师傅
					</view>
					<view style="font-size: 25rpx;color: #A5A7A7;">
						17652355962
					</view>
				</view>
				<view class="back">
					<image style="width:14rpx;height: 25rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
					</image>
				</view>
			</view>


		</view>
		<view class="project bg">

			<view v-for="(item,index) in info.projectDataVoList" :key="index"
				style="border-bottom: 2rpx solid  #F8F8F8;padding-bottom: 10rpx;margin-top: 20rpx;">
				<view style="display: flex">
					<image @tap="(e)=>billViewImage(e,item.projectUrl)"
						style="width: 156rpx;height: 156rpx;border-radius: 20rpx;" :src="item.projectUrl[0]">
					</image>

					<view style="width: 76%;">
						<view style="display: flex;font-size: 29rpx;height: 100rpx;margin-left: 20rpx;">
							<view style="width: 80%;color: #3D3F3E;font-weight: bold;">
								{{item.projectName}}
							</view>
							<view style="width: 20%;color: #A5A7A7;text-align: end;">
								x{{item.projectNumber}}
							</view>
						</view>
						<view style="font-size: 22rpx;color: #EC5722;text-align: end;">
							预估费用:<text style="font-size: 40rpx;">{{item.projectPrice}}</text>元
						</view>
					</view>
				</view>
				<view v-if="item.projectVideo.length!=0" class="info-box">
					<view class="font">
						视频
					</view>
					<view>
						<upLoadFile :fileListt='item.projectVideo' types='video' :index='index' :isDel='false' />
					</view>
				</view>
				<view v-if="item.projectImg.length!=0" class="info-box">
					<view class="font">
						图片
					</view>
					<view>
						<upLoadFile :fileListt='item.projectImg' types='image' :index='index' :isDel='false'
							:isInfo='true' />
					</view>
				</view>
				<view v-if="item.remark!=''" class="info-box">
					<view class="font">
						订单备注
					</view>
					<view class="right" style="color: #707271;">
						{{item.remark}}
					</view>
				</view>
			</view>


		</view>

		<view class="bg info">
			<view class="title">
				项目预估总价
			</view>
			<view class="line">
				<text class="ziduan">预估服务费</text>
				<text style="color: #EC5722;">¥{{info.servicePrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">附加费</text>
				<text style="color: #EC5722;">¥{{info.additionalPrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">合计(不含材料)</text>
				<text style="color: #EC5722;">¥{{info.orderPrice}}</text>
			</view>
		</view>

		<view class="bg info">
			<view class="title">
				服务信息
			</view>
			<!-- 	<view class="line">
				<text class="ziduan">报修门店</text>
				<text>外婆家西湖店</text>
			</view> -->
			<view class="line">
				<text class="ziduan">预约时间</text>
				<text>{{info.expectTime}}</text>
			</view>
			<view class="line">
				<text class="ziduan">服务地址</text>
				<text>{{addressVo.addressRegion}}{{addressVo.addressDetailed}}</text>

			</view>
			<view class="line">
				<text class="ziduan"></text>
				<text>{{addressVo.contact}} {{addressVo.phone}}</text>

			</view>
		</view>

		<view class="bg info" v-if="info.orderStatus=='已完成'">
			<view class="title">
				评价信息
			</view>
			<view class="line" style="display: flex;">
				<text style="width: 66%;" class="ziduan">维修技术</text>
				<u-rate size='23' allowHalf activeColor='#EC5722' count="5" readonly v-model="appraise.technicalScore">
				</u-rate>
			</view>
			<view class="line" style="display: flex;">
				<text style="width: 66%;" class="ziduan">维修速度</text>
				<u-rate size='23' allowHalf activeColor='#EC5722' count="5" readonly v-model="appraise.velocityScore">
				</u-rate>
			</view>
			<view class="line" style="display: flex;">
				<text style="width: 66%;" class="ziduan">服务态度</text>
				<u-rate size='23' allowHalf activeColor='#EC5722' count="5" readonly v-model="appraise.attitudeScore">
				</u-rate>
			</view>
			<view class="line">
				<text class="ziduan">订单评价</text>
				<text>{{appraise.appraiseContent}}</text>
			</view>
			<view class="line" style="display: flex;">
				<text class="ziduan">评价图片</text>
				<upLoadFile :fileListt='appraise.imgs' types='image' :isDel='false' :isInfo='true' />
			</view>
		</view>

		<view class="bg info">
			<view class="title">
				订单信息
			</view>
			<view class="line">
				<text class="ziduan">订单编号</text>
				<text>{{info.orderNumber}}</text>
			</view>
			<view class="line">
				<text class="ziduan">订单类型</text>
				<text>{{info.orderType}}</text>
			</view>
			<view class="line">
				<text class="ziduan">订单优先级</text>
				<text>{{info.isUrgent=='0'?'不加急':info.isUrgent=='1'?'客户加急':'实际加急'}}</text>
			</view>
			<view class="line">
				<text class="ziduan">创建时间</text>
				<text>{{info.orderTime}}</text>
			</view>
		</view>


		<view style="width:100%;margin:0 auto;color: #3398F3; text-align: center; margin:22rpx 0;">
			有疑问？联系客服
		</view>

		<view v-if="info.orderStatus=='待上门'||info.orderStatus=='待接单'" class="btns">
			<view style="width: 335rpx;" class="btn-white" @click="show=true">
				取消订单
			</view>
			<view v-if="info.orderStatus=='待上门'" style="width: 335rpx;" class="btn-green">
				联系维修师
			</view>
		</view>

		<view v-if="info.orderStatus=='待评价'" class="btns">
			<view style="width:281rpx" class="btn-white" @click="report('生成维修报告')">
				生成维修报告
			</view>
			<view style="width:205rpx" class="btn-white">
				申请返修
			</view>
			<view style="width:163rpx" class="btn-green" @click="appraiseHandle">
				评价
			</view>
		</view>

		<view v-if="info.orderStatus=='待支付'" class="btns">
			<view style="width: 335rpx;" class="btn-white" @click='pay'>
				去支付
			</view>
		</view>

		<view v-if="info.orderStatus=='待验收'" class="btns">
			<view style="width: 335rpx;" class="btn-white" @click='complaint'>
				投诉
			</view>
			<view style="width: 335rpx;" class="btn-green" @click='report("验收")'>
				验收
			</view>
		</view>



		<!-- 取消原因 -->
		<u-picker :show="show" :columns="columns" confirmColor='#9FD6BA' :closeOnClickOverlay='true'
			@close='show = false' @cancel='show = false' @confirm='cancelReason'></u-picker>

		<!-- 进度 -->
		<u-popup :show="showStep" @close="showStep=false" closeable>
			<view style="margin:70rpx 50rpx;">
				<view style="text-align: center;margin-bottom: 40rpx;font-weight: bold;">
					订单跟踪
				</view>
				<view class="step">
					<view v-for="(item,index) in step" :key='index' class="box">
						<view class="left">
							<view :class="[index==0?'circle':'circle-green']">

							</view>
							<view :class="[index==0?'line-xu':'line']" v-if="index!=step.length-1">

							</view>
						</view>
						<view class="right">
							<view class="top">
								<text :class="[index==0?'green':'']">{{item.name}}</text><text
									:class="[index==0?'green':'gray']" style="font-size: 27rpx;">{{item.time}}</text>
							</view>
							<view class="bottom">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>



	</view>
</template>

<script>
	import * as order from '@/api/order.js'
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	import {
		getDict
	} from '@/api/system.js'
	export default {
		components: {
			upLoadFile
		},
		data() {
			return {
				loadingText: '',
				pipeiStatus: false, //匹配中图标
				timeData: {},
				step: [],
				info: {}, //详细信息
				addressVo: {}, //地址信息
				showStep: false,
				show: false,
				columns: [
					[]
				],
				dateDiff: 0,
				status: '', //服务状态
				content: '', //服务状态内容
				statusInfo: [{
						orderStatus: '待接单',
						status: '匹配师傅中',
						content: '正在为你匹配合适的维修师，请耐心等待',
					},
					{
						orderStatus: '待上门',
						status: '等待上门维修',
						content: '等待维修师上门维修',
					},
					{
						orderStatus: '服务中【待客户确认】',
						status: '请确认维修方案及报价',
						content: '维修师已提供了维修方案及报价，请确认',
					},
					{
						orderStatus: '待验收',
						status: '维修师已维修完成',
						content: '维修师已维修完成，请确认维修结果',
					},
					{
						orderStatus: '待评价',
						status: '请评价本次服务',
						content: '服务已完成，请您对本次服务进行评价',
					},
					{
						orderStatus: '客户取消',
						status: '订单已取消',
						content: '订单取消并收取上门费',
					},
					{
						orderStatus: '已完成',
						status: '评价已完成',
						content: '您已评价，谢谢您的支持',
					},
				],
				appraise: {},
				id:'',//订单id


			};
		},
		onLoad(option) {
			console.log(option);
				this.id=option.id
			this.getList()
		

		},
		onShow() {

		},
		methods: {
			//倒数计时15分钟时间
			timeFn(d1) { //di作为一个变量传进来
				//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
				var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
				var dateEnd = new Date(); //获取当前时间
				var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
				console.log(dateDiff);
				if (dateDiff > 900000) {
					this.dateDiff = 0
					this.pipeiStatus = true
				} else {
					this.dateDiff = Number((dateDiff - 900000).toString().substring(1))
				}
				console.log(Number((dateDiff - 900000).toString().substring(1)));
			},
			getList() {
				//详情
				order.getOrderInfo(this.id).then(res => {
						console.log(res);
						this.addressVo = res.data.addressVo
						this.addressVo.addressRegion = this.addressVo.addressRegion.replace(/\//g, '')
						var reg = /^(\d{3})\d{4}(\d{4})$/;
						this.addressVo.phone = this.addressVo.phone.replace(reg, "$1****$2");
						this.info = res.data
						this.statusInfo.forEach(item => {
							if (this.info.orderStatus == item.orderStatus) {
								console.log(this.info.orderStatus == item.orderStatus, item.orderStatus);
								this.status = item.status
								this.content = item.content
							}
						})
						if (this.status == '') {
							this.status = this.info.orderStatus
							this.content = this.info.orderStatus
						}
						//获取追踪列表
						order.orderTrackList({
							orderId: this.id
						}).then(res => {
							//	console.log(res);
							res.data.forEach(item => {
								this.step.push({
									name: item.trackStatus,
									time: item.trackTime,
									content: item.trackContent
								})
							})
							console.log(this.content);
							this.step.push({
								name: this.status,
								content: this.info.orderStatus == '待上门' ? this.content + ',预计时间' + this
									.info
									.expectTime : this.content,
							})
							console.log(this.step);
							this.step = this.step.reverse()
						})
						console.log(this.status);
						//算出倒数的时间
						this.info.orderStatus == '待接单' && this.timeFn(this.info.orderTime)

						//this.timeFn('2023-03-09 11:20:18')
						this.info.projectDataVoList.forEach(item => {
							item.projectImg = item.projectImg != '' ? item.projectImg.split(',') : []
							item.projectVideo = item.projectVideo != '' ? item.projectVideo.split(',') : []
							item.projectUrl = item.projectUrl.split(',')
						})
					}),
					//取消原因
					getDict('basic_reason_cancellation').then(res => {
						console.log(res);
						let arr = []
						res.data.forEach(item => {
							arr.push(item.dictLabel)
						})
						this.columns = [arr]
					}),
					//订单详情中新材料
					order.getNewMaterial(this.id).then(res => {
						//console.log(res);
					})

				if (this.info.orderStatus == '待评价') {
					//获取评论
					order.appraiseList({
						orderId: this.id
					}).then(res => {
						console.log(res);
						res.rows[0].imgs = res.rows[0].appraiseImg != null ? res.rows[0].appraiseImg.split(
							',') : []
						this.appraise = res.rows[0]
						console.log(this.appraise);
					})
				}


			},
			//评价
			appraiseHandle() {
				uni.navigateTo({
					url: '../appraise/appraise?item=' + JSON.stringify(this.info)
				})
			},
			//投诉
			complaint() {
				console.log(this.info);
				uni.navigateTo({
					url: '../complaint/complaint?item=' + JSON.stringify(this.info)
				})
			},
			//支付
			pay(){
				uni.navigateTo({
					url:'../pay/pay?money='+this.info.orderPrice
				})
			},
			//取消
			cancelReason(e){
				console.log(e.value[0]);
				this.show=false
					this.getList()
				this.dateDiff = 0
				this.pipeiStatus = true
				// order.cancelOrder({
				// 	cancelReason:e.value[0],
				// 	orderId:this.info.orderId
				// }).then(res=>{
				// 	uni.showToast({
				// 		title: '取消成功',
				// 		duration: 2000
				// 	});
				// 	this.getList()
				// 	this.dateDiff = 0
				// 	this.pipeiStatus = true
				// 	this.show=false
				// })
			},
			//师傅详情
			workerDetailed() {
				uni.navigateTo({
					url: '../../center/workerDetailed/workerDetailed'
				})
			},
			billViewImage(e, list) {
				console.log(e);
				uni.previewImage({
					urls: list,
					current: e.currentTarget.dataset.url
				});
			},
			//倒计时
			onChange(e) {
				this.timeData = e
				if(e.days==0&&e.hours==0&&e.milliseconds==0&&e.minutes==0&&e.seconds==0){
					this.dateDiff = 0
					this.pipeiStatus = true
					this.getList()
				}
			},

			//生成维修报告
			report(type) {
				let name = type == '生成维修报告' ? '维修报告' : '服务验收'
				let info = {
					name: name,
					id: this.info.orderId
				}
				uni.navigateTo({
					url: '../accept/accept?info=' + JSON.stringify(info)
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
<style lang="scss" scoped>
	.order-detail {
		.bg {
			background: #FFFFFF;
			padding: 30rpx;
			margin-top: 20rpx;
		}

		.title {
			font-size: 31rpx;
			color: #3D3F3E;
			font-weight: bold;
		}

		.status {
			//height: 250rpx;
			background: #FFFFFF;
			padding: 40rpx 30rpx;
			display: flex;

			.left {
				width: 98%;

				view:first-child {
					font-size: 36rpx;
					color: #3D3F3E;
					font-weight: bold;
				}

				view:nth-child(2) {
					margin-top: 14rpx;
					font-size: 25rpx;
					color: #A5A7A7;
				}
			}

		}

		.back {
			display: flex;
			align-items: center;
		}

		.worker {
			.info {
				display: flex;
				margin-top: 20rpx;
			}
		}

		.project {
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

		.info {
			.line {
				margin-top: 15rpx;
				font-size: 29rpx;
				color: #3D3F3E;

				text:first-child {
					width: 28%;
					display: inline-block;
				}

				text:nth-child(2) {
					width: 72%;
					display: inline-block;
					text-align: end;
					color: #A5A7A7;
					vertical-align: text-top;
				}
			}
		}

		.btn-white,
		.btn-green {
			height: 85rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 85rpx;
			font-size: 36rpx;
		}

		.btn-white {
			background: #FFFFFF;
			border: 4rpx solid #9FD6BA;
			color: #9FD6BA;
		}

		.btn-green {
			background: #9FD6BA;
			color: #fff;
		}

		.btns {
			display: flex;
			justify-content: space-evenly;
			height: 150rpx;
		}

		.step {
			.box {
				display: flex;

				.left {

					.circle,
					.circle-green {

						margin: 6rpx;
						border-radius: 50%;
					}

					.circle {
						width: 29rpx;
						height: 29rpx;
						border: 1px solid #9FD6BA;

					}

					.circle-green {
						width: 32rpx;
						height: 32rpx;
						background: #9FD6BA;
					}

					.line,
					.line-xu {
						height: 72rpx;
						margin: 10rpx 22rpx 10rpx 0;
					}

					.line {

						border-right: 2rpx solid #9FD6BA;

					}

					.line-xu {
						border-right: 2rpx dashed #9FD6BA;
					}
				}

				.right {
					margin-left: 10rpx;
					width: 100%;

					.top {
						display: flex;
						justify-content: space-between;
						font-size: 29rpx;

					}

					.bottom {
						font-size: 27rpx;
						color: #A5A7A7;
						margin-top: 10rpx
					}

					;

					.gray {
						color: #A5A7A7;
					}

					.green {
						color: #9FD6BA;
					}
				}
			}
		}


	}
</style>
