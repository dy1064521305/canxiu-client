<template>
	<view class="repair">
		<view class="card">
			<view style="margin-top: 20rpx;background: #fff;    padding: 20rpx 29rpx;" v-for="(item,i) in projectList"
				:key="i">
				<view style="display: flex;height: 156rpx;">
					<view v-if="item.img.length==0||item.img[0]==''" class="no-img">
						<image style="width:110rpx ;height: 77rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
							mode=""></image>
						<text>暂无图片</text>
					</view>
					<view v-else>

						<image style="width: 156rpx;height:100%;border-radius: 11rpx;" :src="item.img[0]">
						</image>
						<!-- 	<view class="weixiu" >
								维修
							</view> -->
					</view>

					<view
						style="width: 76%;display: flex;flex-direction: column; padding-left:20rpx;justify-content: space-between;height: 100%;font-size: 25rpx;">
						<view style="width: 80%;color: #3D3F3E;font-weight: bold;font-size: 35rpx;">
							{{item.name}}
						</view>
						<view style="color: #A5A7A7;">
							{{item.type}}
						</view>
						<view style="color: #A5A7A7;">
							工时：{{item.time}}分钟
						</view>
					</view>
				</view>

				<view class="remark">
					<view v-if="info.finish" >
						<view class="before">
							返修前
						</view>
						<upLoadFile :fileListt='info.finish.deliveryImg!=null?info.finish.deliveryImg.split(",") : []'
							types='image' :isDel='false' :isInfo='true' />
					</view>
					<view v-if="info.finish&&info.finish.remark!=''">
						<view style="margin:28rpx 0 10rpx 0">
							备注
						</view>
						<view class="right" style="color: #707271;">
							{{info.finish.remark}}
						</view>
					</view>
					<view>
						<view style="margin:28rpx 0 10rpx 0">返修问题描述</view>
						<view style='width: 100%'>
							<u--textarea height='72' border='none' maxlength='50' confirmType="done"
								v-model="item.repairRemark" placeholder="请输入内容" count
							></u--textarea>
						</view>
					</view>
					<view>
						<view style="margin:28rpx 0 10rpx 0">
							视频/图片
						</view>

						<view>
							<cl-upload :listStyle="{
											columnGap: '10rpx',
											columns:'4',
											rowGap:'10rpx'
											}" :imageFormData="{
												size:10
											}" :videoFromData="{
												size:10
											}" :index='i' v-model="item.repairImg" :headers="headers" :action="action" @onSuccess="onSuccesss"
								@input='onInput'></cl-upload>

						</view>
					</view>

				</view>


			</view>
			<view class="time-two" @click="isShow=true">
				<text style="color: #3D3F3E;font-weight: bold;">选择上门时间</text>
				<view>
					<text style='text-align: end;margin-right: 22rpx;'>{{!expectTime?'时间':expectTime}}</text>
					<image style="width: 14rpx;height: 25rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
						mode=""></image>
				</view>
			</view>
			<view style="height: 150rpx;">
				<view class="button" @click="repairOrderHandle">
					申请返修
				</view>
			</view>
		</view>


		<hTimeAlert title="选择上门时间" rangeStartTime="00:00:00" rangeEndTime="23:59:59" defaultTime="2020/3/29 18:00:00"
			rangeDay="7" :isShow="isShow" :maskHide="maskHide" :isUrgentIndex='3' :rangeType="rangeType" :isCar='true'
			:closeBtn="closeBtn" @closeAlert="handelClose">
		</hTimeAlert>
		
		
			<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import hTimeAlert from "@/components/h-time-alert/h-time-alert.vue"
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	import {
		repairOrder
	} from '@/api/order.js'
	const {
		environment
	} = require('../../../config/environment')
	export default {
		components: {
			hTimeAlert,
			upLoadFile
		},
		data() {
			return {
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				projectList: [],
				isShow: false,
				maskHide: false,
				closeBtn: true,
				rangeType: true,
				expectTime: undefined,
				info: {}
			};
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.info))
			this.projectList = this.info.list
			console.log(this.info);
			this.projectList.forEach(item => {
				item.name = this.info.type == 'new' ? item.serviceProductName : item.productName
				item.type = this.info.type == 'new' ? item.serviceTypeName : item.typeName
				item.time = this.info.type == 'new' ? item.serviceTime : item.projectHours

				item.repairRemark = ''
				item.repairImg = []
			})
		},
		methods: {
			onSuccesss(reslut) {
				console.log(reslut);
				 this.projectList[reslut.data.index].repairImg.push(reslut.data.url)
				// let arr=this.projectList[reslut.data.index].repairImg
				// arr.push(reslut.data.url)
				// this.$set(this.projectList[reslut.data.index],'repairImg',arr)
				this.$forceUpdate()
			},
			onInput(data) {
				console.log(data);
				this.projectList[data.index].repairImg = data.list
			},
			handelClose(data) {
				this.isShow = false;
				console.log(data);
				this.expectTime = data.endDate
			},
			repairOrderHandle() {
				if (!this.expectTime ) {
					uni.showToast({
						title: '请选择上门时间',
						duration: 800,
						icon: 'none'
					});
					return
				}
				let info = {
					orderId: this.info.orderId,
					appointmentTime: this.expectTime+ ':00',
				}
				let arr = []
				this.projectList.forEach(item => {
					item.remark = item.repairRemark
					item.projectImg =item.repairImg.length==0?'':item.repairImg.toString()
				})
				
				info.projectBoList = this.projectList
				console.log(info, '1700000000');
				repairOrder(info).then(res => {
					console.log(res);
					this.$refs.uToast.show({
						type: 'default',
						message: res.data.msg,
					});
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/order/order'
						})
					},1000)


				})
			}

		}
	}
</script>

<style lang="scss">
	.repair {
		.card {
			.time-two {
				margin-top: 18rpx;
				font-size: 30rpx;
				height: 85rpx;
				padding: 0 29rpx;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.remark {
				font-size: 29rpx;
				color: #3D3F3E;
				font-weight: bold;

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

			.no-img {
				width: 170rpx;
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

		.button {
			width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 48rpx auto;
		}

	}
</style>