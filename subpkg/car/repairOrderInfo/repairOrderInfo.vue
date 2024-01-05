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
							工时：{{item.time}}小时
						</view>
					</view>
				</view>
				<view class="remark">
					<view>
						<view style="margin:28rpx 0 10rpx 0">返修问题描述</view>
						<view style='width: 100%'>
							<u--textarea height='72' border='none' maxlength='50' confirmType="done"
								v-model="item.repairRemark" placeholder="请输入内容" count
								@input='textareaInput'></u--textarea>
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
			<view class="time-two" @click="timeShowHandle(index)">
					<text style="color: #3D3F3E;font-weight: bold;padding-left: 15rpx;">选择上门时间</text>
				<view>
					<text
						style='text-align: end;margin-right: 22rpx;'>{{item.expectTime==undefined?'时间':item.expectTime}}</text>
					<image style="width: 14rpx;height: 25rpx;    margin-right: 20rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png"
						mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	const {
		environment
	} = require('../../../config/environment')
	export default {
		data() {
			return {
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				projectList: []
			};
		},
		onLoad(option) {
			let info = JSON.parse(decodeURIComponent(option.info))
			this.projectList = info.list
			console.log(info);
			this.projectList.forEach(item => {
				item.name = info.type == 'new' ? item.serviceProductName : item.productName
				item.type = info.type == 'new' ? item.serviceTypeName : item.typeName
				item.time = info.type == 'new' ? item.serviceTime : item.projectHours
				item.repairRemark = ''
				item.repairImg = []
			})
		},
		methods: {
			onSuccesss(reslut) {
				console.log(reslut);
				this.projectList[index].repairImg.push(reslut.data.url)
			},
			onInput(data) {
				console.log(data);
				this.projectList[data.index].repairImg = data.list
			},
			handelClose(data) {
				this.isShow = false;
				console.log(data);
				this.showListByType[this.timeIndex].expectTime = data.endDate
				console.log(this.showListByType);
				this.info.isUrgent = data.isUrgent && !this.isCar ? 1 : 0
				if (data.isUrgent) {
					this.urgentPriceTotal = this.submitList.reduce((pre, item) => {
						return pre + Number(item.urgentPrice)
					}, 0)
					this.info.orderPrice = this.info.orderPrice + this.urgentPriceTotal
				} else {
					this.info.orderPrice = this.info.orderPrice - this.urgentPriceTotal
					this.urgentPriceTotal = 0
				}
				//this.dateRange = data._dateRange
				console.log(this.submitList);
			},

			timeShowHandle(i) {
				this.isShow = true
				this.timeIndex = i
			},
		}
	}
</script>

<style lang="scss">
	.repair {
		.card {
			.time-two {
				font-size: 30rpx;
				height: 85rpx;
				width: 100%;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.remark {
				font-size: 29rpx;
				color: #3D3F3E;
				font-weight: bold;

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
	}
</style>