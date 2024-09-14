<template>
	<view class="complaint" v-if="projectData.length">
		<view v-for="(item,index) in projectData" :key="index" class="box">
			<view class="" v-if="item.projectUrl">
				<image style="width: 130rpx;height: 130rpx;margin: 20rpx;
border-radius: 14rpx;" :src="item.projectUrl[0]"></image>
			</view>
			<view style="display: flex;flex-direction: column;margin-top:41rpx;height: 100%;width: 100%;">
				<view style="display: flex;">
					<view style="color: #3D3F3E;font-weight: 600;width: 90%;">
						{{item.name}}
					</view>
					<!-- 	<view style="color: #A5A7A7;">
						x{{item.projectNumber}}
					</view> -->

				</view>
			</view>
		</view>
		<view class="main">
			<text style="margin: 20rpx;">订单编号：{{info.orderNumber}}</text>
			<view class="content">
				<u--textarea confirmType='done' height='70' v-model="value1" border='none'
					placeholder="请详细描述您所投诉的内容，方便工作人员核查"></u--textarea>
				<view style="margin-left: 20rpx;">
					<upLoadFile :isOrder='true' :limit='9' :fileListt="fileList" types='image' @getUrl='getUrl' />
				</view>
				<view style="color: #A5A7A7;font-size: 25rpx;margin-left: 20rpx;padding-bottom: 20rpx;">
					如有照片为证，核查将会更快速
				</view>
			</view>
		</view>

		<view class="button" @click="tousu">
			确认投诉
		</view>

		<u-modal width="280" :show="show" title="投诉成功" :content='content' confirmText='知道了' confirmColor='#72DAA4'
			@confirm="confirm"></u-modal>
	</view>
</template>

<script>
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	import {
		orderComplaint
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
				query: {},
				show: false,
				projectData: [],
				content: '我们已经收到您的投诉并会尽快处理，请耐心等待客服与您联系'
			};
		},
		onLoad(option) {
			this.info = JSON.parse(option.item)
			this.query.orderId = this.info.orderId
			if (!this.info.dkDetail) {
				this.projectData = this.info.newProject.length != 0 ? this.info.newProject : this.info.projectDataVoList
				this.projectData.forEach(item => {
					item.name = this.info.newProject.length != 0 ? item.serviceProductName : item.productName
					item.projectUrl = this.info.newProject.length != 0 ? item.projectImg.split(
						',') : item.img
				})
			} else {
				this.projectData = JSON.parse(JSON.stringify(this.info.projectDataVoList))
				this.projectData.forEach(item => {
					item.name = item.productName
					item.projectUrl = item.img || item.projectImg.split(
						',')
				})
			}

		},
		methods: {
			getUrl(val) {
				let str = val.urls.toString()
				this.query.complaintImg = str
			},
			tousu() {
				this.query.complaintContent = this.value1
				orderComplaint(this.query).then(res => {
					if (res.code == 200) {
						this.show = true
					}
				})
			},
			confirm() {
				this.show = false
				uni.navigateBack({
					delta: 2
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.complaint {

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
			margin: 150rpx auto;
		}
	}
</style>