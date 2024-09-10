<template>
	<view class="page">
		<view class="all">
			<view @click="goWorkerList" class="designWorker acea-row row-between-wrapper">
				<view class="designWorker-left acea-row">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/ac000216203a45638ea0841739325d41.png"
						mode=""></image>
					<view class="designWorker-left-name">
						指定师傅上门服务
					</view>
					<u-icon name="question-circle" color="#A4D091"></u-icon>
				</view>
				<view class="designWorker-right acea-row">
					<view v-for="(item, index) in workerList.slice(0, 3)" :key="index">
						<view v-if="!item.workerName" class="designWorker-right-people"></view>
						<view v-if="item.workerName" class="designWorker-right-img">
							<image v-if="item.avatarUrl" :src="item.avatarUrl" mode=""></image>
							<image v-else
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png"
								mode=""></image>
							<view v-if="workerList.length >= 6 && index == 2"
								class="designWorker-right-img-pop acea-row row-middle row-center">
								{{ workerList.length - 6 }}位
							</view>
						</view>
					</view>

					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
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
						<cl-upload :listStyle="{columnGap: '10rpx',columns:'4',rowGap:'10rpx'}"
							:imageFormData="{size:10}" :videoFromData="{size:10}" :index='1' v-model="projectImg"
							:headers="headers" :action="action" @onSuccess="onSuccesss" @input='onInput'
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

		<view class="mess">
			<view class="mess-title">联系信息</view>
			<view class="mess-type acea-row row-middle ">
				<view class="mess-type-name acea-row row-between-wrapper" @click="timeShowHandle(index)">
					<view class="acea-row row-middle">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/e8245f10edc24e888686333e943e7acd.png"
							mode=""></image>

						<text>上门服务时间</text>
					</view>
					<view class="">{{expectTime||'请选择'}} <text class="iconfont icon-iconmore-copy"></text> </view>
				</view>
				<view class="mess-type-name acea-row row-between-wrapper">
					<view class="acea-row">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/8e4a60068dfd46f0954fa7b1eeb8ea44.png"
							mode=""></image>
						<view>订单联系人</view>
					</view>
					<view class="">显示代客下单账号昵称</view>
				</view>
				<view class="mess-type-name acea-row row-between-wrapper">
					<view class="acea-row row-middle">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/09/041c4222dbdc471baa55b8e8b5249743.png"
							mode=""></image>
						<text>订单联系电话</text>
					</view>
					<view class="">显示代客下单账号联系电话</view>
				</view>
			</view>
		</view>
		<view class="mess">
			<view class="mess-title">客户信息</view>
			<view class="mess-store">
				<view class="acea-row row-between-wrapper">
					<view class="acea-row">
						<!-- <view class="" v-if="item.storeImg">
													<image :src="item.storeImg">
													</image>
												</view> -->
						<image src="@/static/logo.png"></image>
						<view class="flex-colum-between" style="padding: 4rpx 0;">
							<view class="">
								222
							</view>
							<view class="acea-row row-middle" style="font-size: 24rpx;color: #A5A7A7">
								222<text style="margin: 0 4rpx;">|
								</text> 111
							</view>
						</view>
					</view>
					<view style="font-size: 24rpx;">
						更换 <text class="iconfont icon-arrow-right" style="font-size: 32rpx;"> </text>
					</view>
				</view>
				<view class="mess-store-mxi">
					<view>所在城市：杭州市-拱墅区</view>
					<view>详细地址：杭州拱墅区新天地商务中心14幢5楼</view>
					<view>客户姓名：浙江万筑装饰…</view>
					<view>客户手机：0571-87928688</view>
				</view>
			</view>
		</view>
		<view class="button acea-row row-between-wrapper">
			<view class="btn">+添加服务项</view>
			<view class="btn">下一步</view>
		</view>
		<hTimeAlert title="选择你期望上门服务时间" rangeStartTime="00:00:00" rangeEndTime="23:59:59"
			defaultTime="2020/3/29 18:00:00" rangeDay="7" :isShow="isShow" :maskHide="false" :isUrgentIndex='3'
			:rangeType="true" :closeBtn="true" @closeAlert="handelClose">
		</hTimeAlert>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	const {
		environment
	} = require('@/config/environment')
	import hTimeAlert from "@/components/h-time-alert/h-time-alert.vue"
	export default {
		components: {
			hTimeAlert,
		},
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
				remark: "",
				isShow: false,
				expectTime: ""
			}
		},
		onLoad() {

		},
		methods: {
			timeShowHandle(i) {
				this.isShow = true
				// this.timeIndex = i
			},
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
			handelClose(data) {
				this.isShow = false;
				// this.showListByType[this.timeIndex].expectTime = data.endDate
				this.expectTime = data.endDate
				console.log(this.expectTime, "this.expectTime ");

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

		// 指定师傅样式
		.designWorker {
			background: #fff;

			&-left {
				image {
					width: 42rpx;
					height: 42rpx;
				}

				&-name {
					font-size: 24rpx;
					color: #000000;
					margin: 0 10rpx 0 10rpx;
				}
			}

			&-right {
				&-people {
					width: 58rpx;
					height: 58rpx;
					background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/1da7451a8b4b43b29950e652acdbf61a.png") no-repeat;
					background-size: 100% 100%;
					margin-right: 15rpx;
				}

				&-img {
					width: 58rpx;
					height: 58rpx;
					// background: #99BF87;
					margin-right: 15rpx;
					border-radius: 50%;
					position: relative;

					&-pop {
						color: #fff;
						width: 58rpx;
						height: 58rpx;
						background-color: rgba(0, 0, 0, 0.2);
						font-size: 29rpx;
						position: absolute;
						top: 0;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}

			}
		}
	}

	.mess {
		margin: 24rpx;

		&-title {
			padding: 0 0 20rpx 4rpx;
			font-size: 28rpx;
			color: #646566;
		}

		&-type {
			padding: 24rpx;
			background-color: #fff;
			border-radius: 16rpx;

			&-name {
				width: 100%;
				padding: 24rpx 0;
				border-bottom: 1rpx solid #f5f5f5;

				image {
					width: 38rpx;
					height: 36rpx;
					margin-right: 12rpx;
				}
			}
		}

		&-store {
			background-color: #fff;
			padding: 24rpx;
			border-radius: 16rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}

			&-mxi {
				color: #666666;
				font-size: 24rpx;
				padding: 24rpx 0 0;
				margin-top: 24rpx;
				border-top: 1rpx solid #f5f5f5;

				view {
					margin-bottom: 10rpx;
				}
			}
		}



	}

	.button {
		background-color: #fff;

		padding: 24rpx 24rpx 40rpx;

		.btn {
			width: 48%;
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