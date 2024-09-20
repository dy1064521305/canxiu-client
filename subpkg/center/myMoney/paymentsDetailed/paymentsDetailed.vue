<template>
	<view class="paymentsDetailed">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>

				<view class="data-box">
					<u-search @custom="getList" @search="getList" :show-action="true" placeholder="搜索订单"
						v-model="query.orderNumber">
					</u-search>
					<view style='margin-top: 20rpx;display: flex;'>
						<view style="display: flex;align-items: center;" @click="showsDateHandle">
							<view v-if="isMonth">{{query.month==''?'按月':query.month}}</view>
							<view v-else>{{query.beginTime==''?'开始时间':query.beginTime}} 至
								{{query.endTime==''?'结束时间':query.endTime}}
							</view>
							<view style="margin-left: 10rpx;">
								<u-icon name="arrow-down-fill" size="10"></u-icon>
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



		<u-popup :show="showsDate" @close="showsDate=false" closeable>
			<view style="font-weight: bold;color:#3D3F3E ;margin: 23rpx;display: flex;">
				{{isMonth?'按月选择':'自定义时间'}}
				<view @click="choseType">
					<image style="width: 30rpx;height: 25rpx;margin-left: 14rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/26/f1177af07eab4539a0f45ce662b858e1.png">
					</image>
				</view>
			</view>
			<view style="height:614rpx;">
				<view v-if="!isMonth" class="date">
					<view @click="activeTime=0" class="date-class"
						:style="{'border-bottom':activeTime==0?'2rpx solid #A4D091':'2rpx solid #D8DCDB','fontSize':'33rpx'}">
						<view class="picker">
							<text v-if="beginTime!=''"
								:style="{'padding-left':'24rpx','color':activeTime==0?'#A4D091':'#A5A7A7'}">{{beginTime}}</text>
							<text v-else :style="{'color':activeTime==0?'#A4D091':'#A5A7A7'}">开始时间</text>
						</view>
						<view v-if="beginTime!=''" style="display: flex;align-items: center;"
							@click="dateClear('begin')">
							<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
						</view>
					</view>
					<text style="color: #A5A7A7;">至</text>
					<view @click="activeTime=1" class="date-class"
						:style="{'border-bottom':activeTime==1?'2rpx solid #A4D091':'2rpx solid #D8DCDB','fontSize':'33rpx',}">
						<view class="picker">
							<text v-if="endTime!=''"
								:style="{'padding-left':'24rpx','color':activeTime==1?'#A4D091':'#A5A7A7'}">{{endTime}}</text>
							<text v-else
								:style="{'fontSize':'33rpx','color':activeTime==1?'#A4D091':'#A5A7A7'}">结束时间</text>
						</view>
						<view v-if="endTime!=''" style=" display: flex;align-items: center;" @click="dateClear('end')">
							<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
						</view>
					</view>


				</view>
				<view v-else class="monthClass">
					{{month==''?'请选择月份':month}}
				</view>
				<view class="datetime">
					<u-datetime-picker :showToolbar='false' :formatter="formatter" :show="true" v-model="value1"
						:mode="isMonth?'year-month':'date'" @change='dateChange'></u-datetime-picker>

					</picker>
				</view>

				<view class="btn two-btn">
					<view class="btn-white" @click="dateCancel">
						取消
					</view>
					<view class="btn-green" @click="dateSubmit">
						确认
					</view>

				</view>
			</view>
			<u-toast ref="uToast"></u-toast>
		</u-popup>


	</view>
</template>

<script>
	import {
		getWalletDetails
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	import formatter from '@/utils/formatter.js'
	export default {
		data() {
			return {
				date: '',
				dataList: [],
				query: {
					pageSize: 10,
					pageNum: 1,
					userId: '',
					userType: 'c',
					orderNumber: '',
					month: '',
					beginTime: '',
					endTime: ''
				},
				isMonth: true,
				showsDate: false,
				value1: Number(new Date()),
				beginTime: '',
				endTime: '',
				activeTime: 0,
				month: ''
			};
		},
		onLoad() {},
		methods: {
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			getList(pageNo, pageSize) {

				this.query.userId = storage.get('ClientId'),
					getWalletDetails(this.query).then(res => {
						console.log(res);
						console.log(1111);
						this.$refs.paging.completeByTotal(res.rows, res.total);
						//this.info=res.data
					})
			},
			//日期格式切换
			choseType() {
				this.isMonth = !this.isMonth
				if (!this.isMonth && this.beginTime == '') {
					this.beginTime = this.timestampToYMD(this.value1)
				}
			},
			showsDateHandle() {
				this.showsDate = true
				this.month = this.month == '' ? this.timestampToYMD(this.value1) : this.month
				console.log(this.month);
			},
			dateChange(e) {
				if (this.isMonth) {
					this.month = this.timestampToYMD(e.value)
				} else {
					if (this.activeTime == 0) {
						this.beginTime = this.timestampToYMD(e.value)
					} else {
						this.endTime = this.timestampToYMD(e.value)
					}
				}


			},
			timestampToYMD(timestamp) {
				var date = new Date(timestamp);
				let type = this.isMonth ? 'yyyy-MM' : ''
				let dateYMD = formatter.formatDate(date, type)
				console.log(dateYMD);

				return dateYMD
			},
			dateSubmit() {
				if (this.isMonth) {
					this.query.month = this.month
				} else {
					this.query.endTime = this.endTime
					this.query.beginTime = this.beginTime
				}
				this.showsDate = false
				this.$refs.paging.reload();
			},
			dateCancel() {
				this.endTime = this.beginTime = this.month = ''
				this.activeTime = 0
				this.isMonth = true
				this.showsDate = false
			},
			dateClear(type) {
				type == 'begin' ? this.beginTime = '' : this.endTime = ''
			},
			refresh() {

				this.query = {
						pageSize: 10,
						pageNum: 1,
						userId: '',
						userType: 'c',
						orderNumber: '',
						month: '',
						beginTime: '',
						endTime: ''
					},
					this.dateCancel()
			}
		}

	}
</script>

<style lang="scss" scoped>
	.paymentsDetailed {
		.data-box {
			background: #fff;
			padding: 22rpx;
		}

		.monthClass {
			border-bottom: 2rpx solid #A4D091;
			color: #A4D091;
			margin: 0 23rpx;
			text-align: center;
			padding: 21rpx 0;
		}

		.datetime {
			/deep/.u-fade-enter-active {
				display: none;
			}



			/deep/.u-transition {
				position: initial !important;
			}
		}

		.date {
			display: flex;
			align-items: baseline;
			margin-top: 20rpx;

			.date-class {
				margin: 0 20rpx;
				width: 100%;
				display: flex;
				padding-bottom: 18rpx;


				.picker {
					width: 100%;
					text-align: center;
				}
			}
		}

		.one-btn {
			position: fixed;
			left: 0;
			bottom: 72rpx;
		}

		.btn {
			display: flex;

			width: 100%;

			justify-content: space-around;

			.btn-white,
			.btn-green {
				// width: 199rpx;
				width: 45%;
				border-radius: 50rpx;
				text-align: center;
				font-weight: bold;
				font-size: 32rpx;
			}

			.btn-white {
				height: 70rpx;
				line-height: 70rpx;
				background: #FFFFFF;
				border: 4rpx solid #A4D091;
				color: #A4D091;
			}

			.btn-green {
				height: 76rpx;
				line-height: 76rpx;
				background: #A4D091;
				color: #fff;
			}
		}

		.content {
			background: #fff;
			padding: 30rpx;
		}
	}
</style>