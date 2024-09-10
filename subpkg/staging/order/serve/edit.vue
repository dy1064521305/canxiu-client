<template>
	<view class="page">
		<view class="all" v-for="(item) in [1,2]">
			<view class="all-top acea-row row-between-wrapper">
				#1 服务项
				<text>
					<text class="iconfont icon-shanchu"></text>
					移除此项</text>
			</view>
			<view class="all-type">
				<view class="all-type-price acea-row row-between-wrapper">
					疏通3M内
					<text>38元/个
						<text class="iconfont icon-iconmore-copy"></text>
					</text>
				</view>
				<text>分类：水龙头/排水管</text>
			</view>
			<view class="all-price  acea-row row-between-wrapper">
				<view class="">服务数量 <text>（单位：个）</text> </view>
				<view class="right">
					<u-number-box min='1' v-model="projectNumber" class='number' button-size="26px" color="#ffffff"
						bgColor="#A4D091" @change='val=>numChange(item,val,index)' iconStyle="color: #fff">
					</u-number-box>
				</view>
			</view>
			<view class="all-remark">
				<view>
					<view class="">
						<text style="color: red">*</text><text style="margin:0 30rpx 14rpx 10rpx;">上传视频/图片</text>
					</view>
					<view style="color: #A5A7A7;font-size: 22rpx;margin: 17rpx 0;">
						请上传1-9张现场环境或设备故障视频/图片信息
					</view>
					<view style="width: 100%;margin: 20rpx 0">
						<cl-upload :listStyle="{
						columnGap: '10rpx',
						columns:'4',
						rowGap:'10rpx'
						}" :imageFormData="{
							size:10
						}" :videoFromData="{
							size:10
						}" :index='1' v-model="projectImg" :headers="headers" :action="action" @onSuccess="onSuccesss" @input='onInput'
							:carId='carId'></cl-upload>
					</view>
				</view>
				<view style="align-items: center;">
					<view style="margin-bottom: 10rpx;">故障描述</view>
					<view style="font-size: 22rpx;color: #A5A7A7;">请简单描述故障或特殊需求备注信息</view>
					<view style='width: 100%; border: 1rpx solid #f5f5f5;border-radius: 10rpx;margin-top: 20rpx;'>
						<u--textarea height='72' border='none' maxlength='200' confirmType="done" v-model="remark"
							placeholder="请输入内容" count @input='textareaInput'></u--textarea>
					</view>
				</view>
			</view>
		</view>


		<view class="button acea-row row-between-wrapper">
			<view class="left">
				<view class=""> <text style="font-size: 22rpx;">￥</text>15.8 </view>
				<view style="font-size: 24rpx;">共3项</view>
			</view>
			<view class="btn">保存并提交审核</view>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	const {
		environment
	} = require('@/config/environment')
	export default {
		data() {
			return {
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				workerList: [{}, {}, {}],
				projectNumber: 1,
				projectImg: [],
				carId: ' 1',
				remark: ""
			}
		},
		onLoad() {

		},
		methods: {
			//获取指派师傅
			getWorkerlist(arr) {
				this.workerList = [{}, {}, {}]
				this.workerList = [...arr, ...this.workerList]
				console.log(this.workerList);
			},
			onSuccesss(reslut) {
				console.log(reslut);
				let index = reslut.data.index
				console.log(this.dataList[index].projectImg);
				this.dataList[index].projectImg.push(reslut.data.url)
			},
			onInput(data) {
				console.log(data);
				this.dataList[data.index].projectImg = data.list
			},
			textareaInput() {

			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		font-size: 28rpx;
	}

	.all {
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 24rpx;
		margin: 24rpx;

		&-top {
			color: #666666;

			text {
				color: #212121;
			}

			.iconfont {
				color: $pageColor;
				margin-right: 4rpx;
			}
		}

		&-type {
			margin: 20rpx 0;

			text {
				color: #999;
				font-size: 24rpx;
			}

			&-price {
				font-size: 28rpx;

				text {
					color: #212121;
				}
			}
		}

		&-price {
			text {
				color: #999;
			}
		}

		&-remark {
			font-size: 28rpx;
			color: #3D3F3E;
			padding: 24rpx 0rpx;
			border-top: 1rpx solid #f5f5f5;
			margin-top: 24rpx;
		}
	}

	.button {
		background-color: #fff;

		padding: 24rpx 24rpx 40rpx;

		.left {
			font-size: 28rpx;
			text-align: center;
		}

		.btn {
			width: 50%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background: $pageColor;
			border-radius: 16rpx;
			border: 1rpx solid $pageColor;
			color: #fff;
		}

		.btn:nth-child(1) {
			border: 1rpx solid #CCCCCC;
			background: #FFFFFF;
			color: #212121;
		}
	}
</style>