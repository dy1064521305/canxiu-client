<template>
	<view class="appraise">
		<view v-for="(item,index) in projectData" :key='index' class="box">

			<view class="no-imgs">
				<image v-if="item.projectUrl.length" style="width: 130rpx;height: 130rpx;margin: 20rpx;
				border-radius: 14rpx;" :src="item.projectUrl[0]"></image>
				<view v-else style="width:100%;height:100%;" class="img-text">
					<image style="width:113rpx ;height:83rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
						mode=""></image>
					<text>暂无图片</text>
				</view>
			</view>


			<view style="display: flex;flex-direction: column;margin-top:41rpx;height: 100%;width: 72%;">
				<view style="display: flex;justify-content: space-between;">
					<view style="color: #3D3F3E;font-weight: 600;">
						{{item.name}}
					</view>
					<view style="color: #A5A7A7;">
						¥{{item.projectPrice}}起
					</view>
				</view>
				<!-- 	<view style="color: #A5A7A7;">
					订单编号：20222251250251
				</view> -->
			</view>
		</view>
		<view class="main">
			<view style="display: flex;font-weight: 600;margin:0 0 20rpx 25rpx;">
				维修技术<u-rate size='23' allowHalf activeColor='#EC5722' count="5" v-model="query.technicalScore"></u-rate>
			</view>
			<view style="display: flex;font-weight: 600;margin:0 0 20rpx 25rpx;">
				维修速度<u-rate size='23' allowHalf activeColor='#EC5722' count="5" v-model="query.velocityScore"></u-rate>
			</view>
			<view style="display: flex;font-weight: 600;margin:0 0 20rpx 25rpx;">
				服务态度<u-rate size='23' allowHalf activeColor='#EC5722' count="5" v-model="query.attitudeScore"></u-rate>
			</view>
			<view class="content">
				<u--textarea confirmType='done' height='95' v-model="query.appraiseContent" border='none'
					placeholder="请说说您对本次服务的看法吧">
				</u--textarea>
				<view style="margin-left: 20rpx;display: flex;">
					<upLoadFile :isOrder='true' :limit='9' :fileListt="fileList" types='image' @getUrl='getUrl' />
					<!-- 		<upLoadFile :isOrder='true' :limit='9' :fileListt="fileList" types='video' @getUrl='getUrl' /> -->
				</view>
			</view>
		</view>

		<view class="button" @click="fabu">
			发布
		</view>
	</view>
</template>

<script>
	import * as order from '@/api/order.js'
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	export default {
		components: {
			upLoadFile
		},
		data() {
			return {
				value1: '',
				fileList: [],
				info: {},
				query: {
					attitudeScore: '0',
					velocityScore: '0',
					technicalScore: '0',
					productIdList: []
				},
				id: '',
				projectData: []
			};
		},
		onLoad(option) {
			this.info = JSON.parse(decodeURIComponent(option.info))
			this.getList()
		},
		methods: {
			getList() {
				console.log(this.info);
				this.query.orderId = this.info.orderId
				this.query.clientId = this.info.clientId
				this.query.workerId = this.info.workerId
				if (!this.info.dkDetail) {
					this.projectData = this.info.newProject.length != 0 ? this.info.newProject : this.info
						.projectDataVoList
					this.query.productIdList = this.projectData.map(item => {
						return item.productId
					})
					this.projectData.forEach(item => {
						item.name = this.info.newProject.length != 0 ? item.serviceProductName : item.productName
						item.projectUrl = this.info.newProject.length != 0 ? (item.projectImg != '' ? item
							.projectImg
							.split(
								',') : []) : item.img
					})
				} else {
					this.projectData = JSON.parse(JSON.stringify(this.info.projectDataVoList))
					this.query.productIdList = this.projectData.map(item => {
						return item.productId
					})
					this.projectData.forEach(item => {
						item.name = item.productName
						item.projectUrl = item.img || (item.projectImg != '' ? item
							.projectImg
							.split(
								',') : [])
					})
				}
				// order.getOrderInfo(this.id).then(res => {
				// 	console.log(res);
				// 	this.info= res.data
				// 	res.data.projectDataVoList.forEach(item=>{
				// 		item.projectUrl=item.projectUrl.split(
				// 			',')
				// 	})

				// 	console.log(res.data.projectDataVoList);
				// 	this.query.productIdList = res.data.projectDataVoList.map(item => {
				// 		return item.productId
				// 	})
				// 	console.log(this.query.productIdList);
				// })
			},
			getUrl(val) {
				console.log(val);
				this.query.appraiseImg = val.urls.toString()
			},
			fabu() {
				order.appraise(this.query).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.showToast({
							title: '评论成功',
							duration: 800
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							});
						}, 800)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.appraise {
		.no-imgs {
			width: 160rpx;
			height: 86%;
			margin: 0 10rpx;

			.img-text {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100%;
				background: #F4F4F4;
				border-radius: 11rpx;

				text {
					font-size: 23rpx;
					color: #A4D091;
				}
			}


		}

		.box,
		.main {
			width: 707rpx;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
			background: #FFFFFF;
			margin: 20rpx auto;
		}

		.box {
			display: flex;
			height: 174rpx;
			font-size: 29rpx;
			align-items: center;
		}

		.main {
			padding: 20rpx 0;

			.content {
				width: 663rpx;
				background: #F5F9FA;
				border-radius: 14rpx;
				margin: 0 auto;

				::v-deep.u-textarea {
					background: #F5F9FA;
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
			margin: 30rpx auto;
		}
	}
</style>