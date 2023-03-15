<template>
	<view class="appraise">
		<view v-for="(item,index) in info.projectDataVoList" class="box">
			<view class="">
				<image style="width: 130rpx;height: 130rpx;margin: 20rpx;
border-radius: 14rpx;" :src="item.projectUrl[0]"></image>
			</view>
			<view style="display: flex;flex-direction: column;margin-top:41rpx;height: 100%;width: 100%;">
				<view style="display: flex;">
					<view style="color: #3D3F3E;font-weight: 600;width: 90%;">
						{{item.projectName}}
					</view>
					<view style="color: #A5A7A7;">
						x{{item.projectNumber}}
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
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	import {
		appraise
	} from '@/api/order.js'
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
				}
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.item)
			console.log(this.info);
			this.query.orderId = this.info.orderId
			this.query.clientId = this.info.clientId
			this.query.productIdList = this.info.projectDataVoList.map(item => {
				return item.productId
			})
			console.log(this.query.productIdList);
		},
		methods: {
			getUrl(val) {
				console.log(val);
				this.query.appraiseImg = val.urls.toString()
			},
			fabu() {
				console.log(this.query);


				// appraise(this.query).then(res => {
				// 	console.log(res);
				// 	if (res.code == 200) {
				// 		uni.showToast({
				// 			title: '评论成功',
				// 			duration: 2000
				// 		});
				// 		setTimeout(() => {
				// 			uni.navigateTo({
				// 				url: '../../center/myOrder/myOrder'
				// 			})
				// 		}, 800)
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.appraise {

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
			background: #9FD6BA;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 30rpx auto;
		}
	}
</style>
