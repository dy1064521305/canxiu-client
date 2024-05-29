<template>
	<view class="order-detail">
		<view class="status" @click="showStep=true">
			<view class="left">
				<view style="display: flex;">
					{{status}}
				</view>

			</view>
			<view style="display: flex;align-items: center;">
				<image style="width:14rpx;height: 25rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
				</image>
			</view>
		</view>
		<view class="bg info">
			<view class="title">
				服务信息
			</view>
			<view class="line">
				<text class="ziduan">报修门店</text>
				<text>{{info.warrantyStore}}</text>
			</view>
			<!-- 	<view class="line">
			<text class="ziduan">下单人</text>
			<text>{{info.warrantyStore}}</text>
		</view> -->
			<view class="line">
				<text class="ziduan">预约上门时间</text>
				<text>{{info.expectTime}}</text>
			</view>
			<view class="line">
				<text class="ziduan">服务地址</text>
				<text>{{addressVo.addressRegion}}{{addressVo.addressDetailed}}</text>

			</view>
			<view class="line">
				<text class="ziduan"></text>
				<text>{{addressVo.contact}} {{addressVo.showPhone}}</text>

			</view>

		</view>
		<view class="worker bg" @click="workerDetailed" v-if="workerInfo.workerName">
			<view class="title">
				本单维修师
			</view>
			<view class="info">
				<view style="display: flex;    flex-direction: column;
    width: 21%;
    align-items: center;">
					<image v-if="workerInfo.avatarUrl==null" style="width:98rpx;height: 98rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/10/38405b13b68b4ac3be692e812874e648.png">
					</image>
					<image v-else style="width:98rpx;height: 98rpx;" :src="workerInfo.avatarUrl"></image>
					<view class="logo">
						{{workerType}}
					</view>
				</view>

				<view style="margin-left:14rpx ;width: 85%;">
					<view style="font-size: 31rpx;color: #3D3F3E;font-weight: bold;margin: 10rpx 0;display: flex;">
						<text style="margin-right: 20rpx;"> {{workerInfo.workerName}}</text>
						<!-- 	<img :src="workerInfo.levelIcon" style='width: 140rpx;height: 34rpx;margin-left: 20rpx;'> -->

					</view>
					<view style="margin-left: -9rpx;">
						<u-rate count="5" v-model="workerInfo.value" activeColor='#ec9322' size='48rpx' readonly>
						</u-rate>
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

			<view v-for="(item,index) in info.projectDataVoList" :key="index" style="margin: 15rpx 0;">
				<project-card :pro='item' />

				<view v-if="info.deliveryVo!=null&&info.deliveryVo.deliveryImg.length!=0">
					<view>
						<view style="background-color: #A4D091;" class="before">
							服务后
						</view>
						<cl-upload :listStyle="{
											columnGap: '10rpx',
											columns:'4',
											rowGap:'10rpx'
											}" :imageFormData="{
												size:10
											}" :videoFromData="{
												size:10
											}" v-model="info.deliveryVo.deliveryImg" :add="false" :remove="false"></cl-upload>
					</view>
					<view v-if="info.deliveryVo.remark!=''">
						<view style="margin:28rpx 0 10rpx 0">
							备注
						</view>
						<view class="right" style="color: #707271;">
							{{info.deliveryVo.remark}}
						</view>
					</view>
				</view>
				<view>
					<view>
						<view class="before">
							返修前
						</view>
						<cl-upload :listStyle="{
						columnGap: '10rpx',
						columns:'4',
						rowGap:'10rpx'
						}" :imageFormData="{
							size:10
						}" :videoFromData="{
							size:10
						}" v-model="item.projectImg" :add="false" :remove="false"></cl-upload>

					</view>
					<view v-if="item.remark!=''">
						<view style="margin:28rpx 0 10rpx 0">
							备注
						</view>
						<view class="right" style="color: #707271;">
							{{item.remark}}
						</view>
					</view>
				</view>
				<view v-if="info.orderStatus=='待验收'&&item.repairImgg.length!=0">
					<view>
						<view style="background-color: #A4D091;" class="before">
							返修后
						</view>
						<cl-upload :listStyle="{
															columnGap: '10rpx',
															columns:'4',
															rowGap:'10rpx'
															}" :imageFormData="{
																size:10
															}" :videoFromData="{
																size:10
															}" v-model="item.repairImgg" :add="false" :remove="false"></cl-upload>
					</view>
					<view v-if="item.repairRemark!=''&&item.repairRemark!=null">
						<view style="margin:28rpx 0 10rpx 0">
							备注
						</view>
						<view class="right" style="color: #707271;">
							{{item.repairRemark}}
						</view>
					</view>

				</view>
			</view>
		</view>



		<view class="bg info" style="margin-top: -20rpx;">
			<view class="title" style="display: flex;justify-content: space-between;align-items: center;">
				<view class="">
					订单费用
				</view>
				<view class="img" v-if="isGet">
					<image style="width: 32rpx;height: 32rpx;margin-right: 10rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/a5a0b58c2d674bacb335cb758d4fca3d.png">
					</image>
					未达标按起步价收取
				</view>
				<view v-else class="img">
					<image style="width: 32rpx;height: 32rpx;margin-right: 10rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
					</image>已达到起步价
				</view>
			</view>
			<view class="line">
				<text class="ziduan">起步价</text>
				<text
					:style="{'text-decoration':!isGet?'line-through':'','color':!isGet?'#A5A7A7':'#EC5722'}">¥{{info.beforeStartingFree}}</text>
			</view>

			<view class="line">
				<text class="ziduan">服务费</text>
				<text
					:style="{'text-decoration':isGet?'line-through':'','color':isGet?'#A5A7A7':'#EC5722'}">¥{{info.servicePrice}}</text>
			</view>
			<view v-if="info.additionalPrice!=null&&info.additionalPrice!=0" class="line">
				<text class="ziduan">加急费</text>
				<text style="color: #EC5722;">¥{{info.additionalPrice}}</text>
			</view>
			<view v-if="info.materialPrice!=null&&info.materialPrice!=0" class="line">
				<text class="ziduan">材料费</text>
				<text style="color: #EC5722;">¥{{info.materialPrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">小计：</text>

				<text
					style="color: #EC5722;">¥{{Number(info.orderPrice)+Number(info.favorablePrice)+Number(info.subsidyPrice)}}</text>
			</view>
			<view v-if="info.favorablePrice!=0" style="margin-left: 20rpx;color: #A5A7A7;" class="line">
				<text class="ziduan" style="width:58%;">品牌折扣：<text
						v-if="info.favorableDiscount!=null">({{info.favorableDiscount}}折)</text></text>
				<text style="color: #EC5722;width:42%;">-¥{{info.favorablePrice}}</text>
			</view>
			<view v-if="info.subsidyPrice!=0&&info.subsidyPrice!=null" style="margin-left: 20rpx;color: #A5A7A7;"
				class="line">
				<text class="ziduan">价格优惠：</text>
				<text style="color: #EC5722;">-¥{{info.subsidyPrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">实付金额</text>
				<!-- info.additionalPrice!=null?Number(info.additionalPrice)+Number(info.preferentialPrice):Number(info.preferentialPrice) -->
				<text style="color: #EC5722;">¥{{info.orderPrice}}</text>
			</view>
		</view>

		<view class="info" style="background-color: #fff;margin: 20rpx 0 20rpx;">
			<u-collapse>
				<u-collapse-item title="订单信息" name="Docs guide">
					<view style="margin:-10rpx 0;">
						<view v-if="info.repairNumber" class="line">
							<text class="ziduan">返修编号</text>
							<text>{{info.repairNumber}}</text>
						</view>
						<view class="line">
							<text class="ziduan">订单编号</text>
							<text>{{info.orderNumber}}</text>
						</view>
						<view class="line">
							<text class="ziduan">订单类型</text>
							<text><text style="width:14% ;" class="fanxiu">返修</text>维修</text>
						</view>
						<view class="line">
							<text class="ziduan">订单状态</text>
							<text
								style="color: #EC5722;">{{info.isUrgent=='0'?'不加急':info.isUrgent=='1'?'客户加急':'实际加急'}}</text>
						</view>
						<view class="line">
							<text class="ziduan">下单时间</text>
							<text>{{info.orderTime}}</text>
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>

		<view v-if="rollBackProject.length!=0||rollBackMel.length!=0">
			<view class="bg">
				<view class="title">
					推荐服务方案
				</view>

				<view v-for="(pro,proi) in rollBackProject" :key="proi" style="margin: 10rpx 0;">
					<project-card :pro='pro' />
				</view>

				<view v-if="rollBackMel.length!=0" class="info">
					<view class="mel-title">
						<text>材料费合计</text>
						<view style="font-size: 33rpx;color: #EC5722">
							¥{{rollBackTotalMel}}
						</view>
					</view>
					<view class="thumb-box" v-for="(mel,mi) in rollBackMel" :key="mi">
						<view class="no-imgs">
							<image v-if="mel.materialImg!=null&&mel.materialImg!=''" :src="mel.materialImg"
								style="width:100%;height:100%;border-radius: 10rpx;">
							</image>
							<view v-else style="width:100%;height:100%;" class="img-text">
								<image style="width:90rpx ;height:68rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
									mode=""></image>
								<text>暂无图片</text>
							</view>
						</view>
						<view class="right flexCss">
							<view class="flexCss" style="align-items: center;">
								<text style="font-weight: bold;color: #3D3F3E;">{{mel.materialName}}</text>
								<text style="color: #A5A7A7;">{{mel.materialCount}}{{mel.materialUnit}}</text>
							</view>
							<view style="color: #A5A7A7;">
								<text v-if="mel.specsId==null"></text>
								<text v-else class="mel_style">
									<text v-for="(s,si) in Object.values(JSON.parse(mel.materialSpecs))" :key="si">
										<text v-if="s">{{s}}</text>
									</text>
								</text>

							</view>
							<view style="color:#EC5722 ;" class="flexCss">
								<view class="">
									¥{{mel.materialPrice}}
								</view>
								<view style="font-weight: bold;margin-left: 21rpx;">
									小计:¥{{Number(mel.materialPrice)*Number(mel.materialCount)}}
								</view>
							</view>
						</view>

					</view>

				</view>

			</view>
			<view class="bg info">
				<view class="title" style="display: flex;justify-content: space-between;align-items: center;">
					<view class="">
						订单费用
					</view>
					<view class="img" v-if="!isRollBackGet">
						<image style="width: 32rpx;height: 32rpx;margin-right: 10rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/a5a0b58c2d674bacb335cb758d4fca3d.png">
						</image>
						未达标按起步价收取
					</view>
					<view v-else class="img">
						<image style="width: 32rpx;height: 32rpx;margin-right: 10rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
						</image>已达到起步价
					</view>
				</view>
				<view class="line">
					<text class="ziduan">起步价</text>
					<text
						:style="{'text-decoration':isRollBackGet?'line-through':'','color':isRollBackGet?'#A5A7A7':'#EC5722'}">¥{{info.beforeStartingFree}}</text>
				</view>

				<view v-if="rollBackTotalPro!=0" class="line">
					<text class="ziduan">服务费</text>
					<text
						:style="{'text-decoration':!isRollBackGet?'line-through':'','color':!isRollBackGet?'#A5A7A7':'#EC5722'}">¥{{rollBackTotalPro}}</text>
				</view>

				<view v-if="rollBackTotalMel!=0" class="line">
					<text class="ziduan">材料费</text>
					<text style="color: #EC5722;">¥{{rollBackTotalMel}}</text>
				</view>

				<view class="line">
					<text class="ziduan">合计</text>
					<!-- info.additionalPrice!=null?Number(info.additionalPrice)+Number(info.preferentialPrice):Number(info.preferentialPrice) -->
					<text
						style="color: #EC5722;">¥{{(isRollBackGet?Number(rollBackTotalPro):Number(info.startingFree))+Number(rollBackTotalMel)}}</text>
				</view>
			</view>

		</view>




		<view v-if="info.orderStatus=='待验收'" class="btns">
			<!-- 	<view style="width:166rpx;" class="btn-white" @click='complaint'>
			投诉
		</view> -->

		</view>




		<view style="display: flex;justify-content: flex-end;margin-top: 20rpx;">
			<view v-if="info.orderStatus=='待接单'" class="btn-white" @click="show=true">
				取消订单
			</view>
			<view v-if="info.orderStatus=='服务中【退回订单】'" class="btn-green" @click="goSubmit">
				生成订单
			</view>

			<view v-if="info.orderStatus=='待验收'" class="btn-green" @click='report("验收")'>
				验收
			</view>
			<view v-if="info.orderStatus=='待支付'" class="btn-white" @click="report('待支付')">
				生成维修报告
			</view>
			<view v-if="info.orderStatus=='待支付'" class="btn-green" @click='pay'>
				去支付
			</view>
			<view v-if="info.orderStatus=='待评价'||info.orderStatus=='已完成'" class="btn-white" @click="report('待评价')">
				生成维修报告
			</view>
			<view v-if="info.orderStatus=='待评价'" class="btn-green" @click="appraiseHandle">
				评价
			</view>
		</view>

		<!-- 取消订单 -->
		<u-modal :show="show" title="温馨提示" showCancelButton confirmColor='#A4D091' @cancel="show=false"
			@confirm="cancelOrder">
			<view style="width: 100%;text-align: center;">
				是否确认取消订单?
			</view>
		</u-modal>


		<!-- 进度 -->
		<u-popup :overlayStyle="{'touch-action':'none'}" :show="showStep" @close="showStep=false" closeable>
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



		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import * as order from '@/api/order.js'
	import projectCard from '@/components/projectCard/projectCard.vue'
	import {
		listByIds
	} from '@/api/oss.js'
	export default {
		components: {
			projectCard,
		},
		data() {
			return {
				step: [],
				info: {}, //详细信息
				addressVo: {}, //地址信息
				showStep: false,
				show: false,
				workerInfo: {}, //师傅信息
				status: '', //服务状态
				content: '', //服务状态内容
				id: '', //订单id
				isGet: false, //是否达到起步价
				workerType: undefined,

				rollBackProject: [], //返修服务
				rollBackMel: [], //返修材料
				rollBackTotalMel: 0, //材料总钱数,
				rollBackTotalPro: 0, //服务价格
				isRollBackGet: false, //返修方案是否达到起步价

				optionInfo: {}
			};
		},
		onLoad(option) {
			console.log(JSON.parse(option.info));
			this.optionInfo = JSON.parse(option.info)
			// this.id = option.id
			this.getList()
		},
		onShow() {
			this.getList()
		},

		methods: {

			getList() {
				//详情
				this.optionInfo.type == '返修' ? order.getRepairOrderInfo(this.optionInfo.id).then(res => {
					console.log(res);
					this.info = res.data
					this.getInfo()
				}) : order.getOrderInfo(this.optionInfo.id).then(res => {
					console.log(res);
					this.info = res.data
					this.getInfo()

				})


			},
			getInfo() {
				if (this.info.addressVo != null) {
					this.addressVo = this.info.addressVo
					this.addressVo.addressRegion = this.addressVo.addressRegion.replace(/\//g, '')
					var reg = /^(\d{3})\d{4}(\d{4})$/;
					this.addressVo.showPhone = this.addressVo.phone.replace(reg, "$1****$2");

				}


				this.rollBackMel = this.info.newRepairMaterial != null ? this.info.newRepairMaterial : []
				this.info.newRepairProject != null && this.info.newRepairProject.forEach(item => {
					item.img = item.projectImg != null ? item.projectImg.split(',') : []
				})
				this.rollBackProject = this.info.newRepairProject != null ? this.info.newRepairProject : []
				this.getRollBackTotal()
				this.isGet = Number(this.info.startingFree) >= Number(this.info.preferentialPrice)
				if (this.info.deliveryVo != null) {
					this.info.deliveryVo.deliveryImg = this.info.deliveryVo.deliveryImg != null && this.info
						.deliveryVo.deliveryImg != '' ? this.info.deliveryVo.deliveryImg.split(',') : []
				} else {
					this.info.deliveryVo = {
						'deliveryImg': [],
						'remark': ''
					}
					// this.info.deliveryVo.deliveryImg=[]
					// this.info.deliveryVo.remark=''
					console.log(this.info.deliveryVo);
				}

				if (this.status == '') {
					this.status = this.info.orderStatus
					this.content = this.info.orderStatus
					console.log(this.status, '7066666666666');
				}
				//师傅信息
				this.info.workerId != null && order.getWorkerInfo(this.info.workerId).then(res => {
					this.workerInfo = res.data
					switch (this.workerInfo.levelName) {
						case '一星匠人':
							this.workerInfo.value = 1
							break;
						case '二星匠人':
							this.workerInfo.value = 2
							break;
						case '三星匠人':
							this.workerInfo.value = 3
							break;
						case '四星匠人':
							this.workerInfo.value = 4
							break;
						case '五星匠人':
							this.workerInfo.value = 5
							break;
					}
				})
				console.log(this.info.orderStatus);

				//获取追踪列表
				order.orderTrackList({
					orderId: this.info.orderId
				}).then(res => {
					//	console.log(res);
					this.step = []
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
						content: this.content,
					})
					console.log(this.step);
					this.step = this.step.reverse()
				})
				console.log(this.status);

				console.log(this.info.projectDataVoList[0].workerType, '8000000000000000');
				this.workerType = this.info.projectDataVoList[0].workerType
				this.info.projectDataVoList.forEach(item => {
					item.projectImg = item.projectImg != null && item.projectImg != '' ? item
						.projectImg.split(',') : [],
						item.repairImgg = item.repairImg != null && item.repairImg != '' ? item
						.repairImg.split(',') : [],
						// item.projectVideo = item.projectVideo != '' ? item.projectVideo.split(',') : []
						item.img = item.projectUrl != null ? item.projectUrl.split(',') : []
				})
			},
			//计算返修方案价格
			getRollBackTotal() {
				console.log(this.rollBackProject);
				this.rollBackTotalPro = this.rollBackProject.length != 0 && (this.rollBackProject.reduce((pre, item) => {
					return pre + Number(item.projectPrice) * Number(item.projectNumber)
				}, 0)).toFixed(0)
				this.isRollBackGet = this.rollBackTotalPro >= Number(this.info.startingFree)

				this.rollBackTotalMel = this.rollBackMel.length != 0 && (this.rollBackMel.reduce((pre, item) => {
					return pre + Number(item.materialPrice) * Number(item.materialCount)
				}, 0)).toFixed(0)

			},
			//取消
			cancelOrder() {

				order.cancelOrder({
					orderId: this.info.orderId,
					repairId: this.info.repairId
				}).then(res => {
					uni.showToast({
						title: '取消成功',
						duration: 2000
					});
					setTimeout(()=>{
							uni.navigateBack()
					},800)
				
				
					this.show = false
				})
			},
			//师傅详情
			workerDetailed() {
				let info = {
					workerId: this.info.workerId,
					info: this.workerInfo
				}
				uni.navigateTo({
					url: '../../center/workerDetailed/workerDetailed?info=' + JSON.stringify(info)
				})
			},
			//生成订单
			goSubmit() {
				console.log(this.info);
				let item = {
					isCar: true,
					isAgain: false,
					isRepair: true,
					info: this.info,
					checkedList: this.rollBackProject
				}
				uni.navigateTo({
					url: '../submitOrder/submitOrder?item=' + encodeURIComponent(JSON.stringify(
						item))
				})
			},
			//生成维修报告
			report(type) {
				console.log(this.newProject);
				let name = type == '待评价' || type == '待支付' ? '维修报告' : '服务验收'
				this.info.addressVo = this.addressVo

				let info = {
					name: name,
					type: type,
					id: this.info.orderId,
					info: this.info,
					isGet: this.isGet,
					repairId: this.info.repairId
				}
				console.log(info);

				uni.navigateTo({
					url: '../accept/accept?info=' + JSON.stringify(info)
				})
			},
			//支付
			pay() {
				uni.navigateTo({
					url: '../pay/pay?item=' + encodeURIComponent(JSON.stringify(this.info))
				})
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
	.order-detail {
		.bg {
			background: #FFFFFF;
			padding: 20rpx 30rpx;
			margin-top: 20rpx;
		}

		.title {
			font-size: 31rpx;
			color: #3D3F3E;
			font-weight: bold;

			.img {
				align-items: center;
				display: flex;
				font-size: 24rpx;

			}
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

			.logo {
				z-index: 10;
				background: #FFFFFF;
				border-radius: 7rpx;
				border: 2rpx solid #A4D091;
				font-size: 18rpx;
				color: #A4D091;
				padding: 6rpx 14rpx;
				margin-top: -15rpx;
			}
		}

		.fanxiu {
			height: 36rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			border: 2rpx solid #A4D091;
			font-size: 22rpx;
			color: #A4D091;
			line-height: 36rpx;
			text-align: center;
			margin-right: 8rpx;
		}

		.project {

			font-size: 29rpx;
			color: #3D3F3E;
			// font-weight: bold;

			.before {
				width: 130rpx;
				height: 47rpx;
				text-align: center;
				line-height: 47rpx;
				background: #F3B133;
				border-radius: 24rpx;
				font-size: 29rpx;
				color: #FFFFFF;
				margin: 28rpx 0 10rpx 0
			}

			::v-deep.u-textarea {
				background: rgba(165, 167, 167, 0.05);
				margin-top: 10.87rpx;
			}



		}

		.mel-title {
			height: 72rpx;
			line-height: 72rpx;
			font-weight: bold;
			background: rgba(159, 214, 186, 0.2);
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
		}

		.mel_style {
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			width: 95%;
			margin-right: 10rpx;
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
			height: 72rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 72rpx;
			font-size: 31rpx;
			width: 326rpx;
			margin-bottom: 53rpx;
			margin-right: 20rpx;
		}

		.btn-white {
			background: #FFFFFF;
			border: 4rpx solid #A4D091;
			color: #A4D091;
		}

		.btn-green {
			background: #A4D091;
			color: #fff;
		}



		.step {
			height: 55vh;
			overflow: scroll;
			overscroll-behavior: none;

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
						border: 1px solid #A4D091;

					}

					.circle-green {
						width: 32rpx;
						height: 32rpx;
						background: #A4D091;
					}

					.line,
					.line-xu {
						height: 72rpx;
						margin: 10rpx 22rpx 10rpx 0;
					}

					.line {

						border-right: 2rpx solid #A4D091;

					}

					.line-xu {
						border-right: 2rpx dashed #A4D091;
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
						color: #A4D091;
					}
				}
			}
		}


		.thumb-box {
			// height: 130rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			.right {
				height: 100%;
				flex-direction: column;
				margin-left: 14rpx;
				width: 79%;
			}

			.flexCss {
				display: flex;
				justify-content: space-between;
			}


			.no-imgs {
				width: 130rpx;
				height: 130rpx;


				.img-text {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 100%;
					background: #F4F4F4;
					border-radius: 11rpx;

					text {
						font-size: 21rpx;
						color: #A4D091;
					}
				}


			}


		}

	}
</style>