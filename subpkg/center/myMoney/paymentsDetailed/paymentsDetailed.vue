<template>
	<view class="paymentsDetailed">
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<view slot='top'>

				<view class="data-box">
					<u-search @custom="search" @search="search" :show-action="true" placeholder="搜索订单"
						v-model="query.detailsType">
					</u-search>
					<view style='margin-top: 20rpx;display: flex;'>
						<view :style="{'width': date==''?'':'25%'}">
							<picker mode="date" :value="date" fields="month" :start="startDate" :end="endDate"
								@change="bindDateChange">
								<view style="display: flex;">
									<view style="margin-right: 10rpx;">{{date==''?'按月':date}}</view>
									<u-icon name="arrow-down-fill" size="10"></u-icon>
								</view>
							</picker>
						</view>

						<view class="date">
							<view class="date-class"
								:style="{'border-bottom':beginTime!=''?'2rpx solid #A4D091':'2rpx solid #D8DCDB'}">
								<picker class="picker" mode="date" :value="date1" :start="startDate" :end="endDate"
									@change="bindDateChangeBegin">
									<text v-if="beginTime!=''" style="color: #A4D091;">{{beginTime}}</text>
									<text v-else style="color:#A5A7A7  ;">开始时间</text>
								</picker>
								<!-- 	<view style="   display: flex;align-items: center;" @click="dateClear('begin')">
									<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
								</view> -->
							</view>
							<text style="color: #A5A7A7;">至</text>
							<view class="date-class"
								:style="{'border-bottom':endTime!=''?'2rpx solid #A4D091':'2rpx solid #D8DCDB'}">
								<picker class="picker" mode="date" :value="date2" :start="startDate" :end="endDate"
									@change="bindDateChangeEnd">
									<text v-if="endTime!=''" style="color: #A4D091;">{{endTime}}</text>
									<text v-else style="color:#A5A7A7  ;">结束时间</text>
								</picker>
								<!-- 	<view style=" display: flex;align-items: center;" @click="dateClear('end')">
									<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
								</view> -->
							</view>
							<view @click="dateClear('clear')">
								<image
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/b45cb670cda941bab45e6146ae1619bf.png"
									style="width: 40rpx;height: 27rpx;"></image>
							</view>
						</view>


					</view>
				</view>
			</view>

			<view class="content" v-for="(item,index) in dataList" :key="index">
				<view style="display: flex;font-size: 31prx;justify-content: space-between;font-weight: bold;">
					<text>{{item.detailsType}}</text>
					<text>{{item.detailsAmount}}</text>
				</view>
				<view v-if="item.orderNumber!=null">
					工单编号:{{item.orderNumber}}
				</view>
				<view style="align-items: center;margin-top: 20rpx;display: flex;justify-content: space-between;">
					<text style="font-size: 25rpx;color: #A5A7A7;">{{item.createTime}}</text>
					<text style="font-size: 31rpx;">{{item.detailsStatus}}</text>
				</view>
			</view>
		</z-paging>

		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	import {
		getWalletDetails
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			// const currentDate = this.getDate({
			// 	format: true
			// })
			return {
				date: '',
				dataList: [],
				query: {
					pageSize: 10,
					pageNum: 1,
					userId: '',
					userType: 'c',
					detailsType: ''

				},
				endTime: '',
				beginTime: '',
				showEndTime: '', //显示的时间
				showBeginTime: '',
				date2: '',
				date1: '',
			};
		},
		onLoad() {},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
		},
		methods: {
			getList(pageNo, pageSize) {
				this.query.pageNum = pageNo;
				this.query.pageSize = pageSize;
				this.query.userId = storage.get('ClientId'),
					this.query.month = this.date,
					this.query.endTime = this.endTime,
					this.query.beginTime = this.beginTime,
					getWalletDetails(this.query).then(res => {
						console.log(res);
						console.log(1111);
						this.$refs.paging.completeByTotal(res.rows, res.total);
						//this.info=res.data
					})
			},
			bindDateChange: function(e) {
				console.log(e);
				this.date = e.detail.value
					this.dateClear('all')
				this.getList(1, 10)
			
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			},
			bindDateChangeBegin: function(e) {
				console.log(e.detail.value);
				this.beginTime = e.detail.value
				this.showBeginTime = e.detail.value
				this.date = ''
			},
			bindDateChangeEnd: function(e) {
				this.endTime = e.detail.value
				this.showEndTime = e.detail.value
				this.date = ''
			},
			//日期清空
			dateClear(type) {
				console.log(11111);
				if (type == 'begin') {
					this.beginTime = ''
					this.showBeginTime = ''
				} else if (type == 'end') {
					this.endTime = ''
					this.showEndTime = ''
				} else if (type == 'all') {
					this.beginTime = ''
					this.showBeginTime = ''
					this.endTime = ''
					this.showEndTime = ''

				} else {
					this.beginTime = ''
					this.showBeginTime = ''
					this.endTime = ''
					this.showEndTime = ''
					this.date = ''
				}
			},
			search() {
				this.getList(1, 10)
			}
		}

	}
</script>

<style lang="scss" scoped>
	.paymentsDetailed {
		.data-box {
			background: #fff;
			padding: 30rpx;

			.date {
				display: flex;
				align-items: baseline;
				width: 85%;

				.date-class {
					margin: 0 20rpx;
					width: 35%;
					.picker {
						//	width: 85%;
						text-align: center;
					}
				}
			}
		}

		.content {
			background: #fff;
			padding: 30rpx;
		}
	}
</style>
