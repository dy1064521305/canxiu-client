<template>
	<view class="inviteList">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>

				<view class="data-box">
					<u-search @custom="search" @clear="search" @search="search" :show-action="true"
						placeholder="师傅姓名或手机号" v-model="query.keyWord">
					</u-search>

					<u-tabs :list="statusList" @click="tabClick" lineColor="#A4D091" :scrollable='false'></u-tabs>
				</view>
				<view style='display: flex;margin-left: 20rpx; '>
					<view style='margin: 20rpx 0;display: flex;'>
						<view style="display: flex;align-items: center;" @click="showsDateHandle">
							{{showMonth}}
							<view style="margin-left: 10rpx;">
								<u-icon name="arrow-down-fill" size="10"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="list_box">
				<view v-for="(item,index) in dataList" :key="index" class="list">
					<image v-if="item.avatarUrl!=null" :src="item.avatarUrl"
						style="width: 79rpx;height: 79rpx;margin-right: 26rpx; border-radius: 50%;">
					</image>
					<image v-else
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png"
						style="width: 79rpx;height: 79rpx;margin-right: 26rpx;border-radius: 50%;">
					</image>
					<view class="right">
						<view class="flexs">
							<text>{{item.workerName}}<text class="call"
									@click="callPhone(item.workerPhone)">联系他</text></text>
							<text style="font-size: 28rpx;">{{item.status==0?'未达标':'已达标'}}</text>
						</view>
						<view style="font-size: 24rpx;color: #A5A7A7;" class="flexs">
							<text>{{item.status==0?item.registerDate:item.settleTime}}{{item.status==0?'注册':'结算'}}</text></text>
							<text v-if="item.days>=7" style="color: #F7B500;font-size: 24rpx;">{{item.days}}日未登录</text>

						</view>
					</view>

				</view>
			</view>
		</z-paging>
		<u-popup :show="showsDate" @close="showsDate=false" closeable>
			<view style="font-weight: bold;color:#3D3F3E ;margin: 23rpx;display: flex;">
				按月选择

			</view>
			<view style="margin-bottom: 24rpx;">

				<view class="monthClass">
					{{month==''?'请选择月份':month}}
				</view>
				<view class="datetime">
					<u-datetime-picker :showToolbar='false' :formatter="formatter" :show="true" v-model="value1"
						mode="year-month" @change='dateChange'></u-datetime-picker>


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
		</u-popup>

		<u-toast ref="uToast"></u-toast>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
	</view>
</template>

<script>
	import formatter from '@/utils/formatter.js'
	import {
		inviteRecord
	} from '@/api/invite.js'
	import storage from '@/utils/storage'
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		data() {
			// const currentDate = this.getDate({
			// 	format: true
			// })
			return {
				showPhone: false,
				date: '',
				dataList: [],
				query: {
					pageSize: 10,
					pageNum: 1,
					type: '',
					registerDate: undefined,
					inviterId: '',
					activityId: undefined
				},
				showsDate: false,
				value1: Number(new Date()),
				beginTime: '',
				endTime: '',
				activeTime: 0,
				month: '',
				showMonth: '',
				statusList: [{
					name: '全部',
					value: ''
				}, {
					name: '已达标',
					value: 1
				}, {
					name: '未达标',
					value: 0
				}, {
					name: '不活跃好友',
					value: 2
				}],
				activeStatus: 0,
				actionList: [{
						name: ''
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
				workerPhone: '',
				registerDate: ''

			};
		},
		onLoad(option) {
			this.query.activityId = option.activityId
			this.query.inviterId = option.inviterId
		},
		onShow() {
			this.timestampToYMD(this.value1, 'init')
			// this.getList(1,10)
		},
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
				// this.query.userId = storage.get('workerId'),
				this.query.pageNum = pageNo
				this.query.pageSize = pageSize
				inviteRecord(this.query).then(res => {
					this.$refs.paging.completeByTotal(res.data.rows, res.total);

				})
			},
			search() {
				this.getList(1, 10)
			},

			showsDateHandle() {
				// this.month = this.query.month

				this.showsDate = true
				console.log(this.month);
			},
			tabClick(e) {
				console.log(e);
				this.query.type = e.value
				this.getList(1, 10)
			},
			dateChange(e) {
				this.value1 = e.value
				this.timestampToYMD(e.value)

			},
			timestampToYMD(timestamp, type) {
				var date = new Date(timestamp);
				this.registerDate = formatter.formatDate(date, 'yyyy-MM') + '-01'
				this.month = formatter.formatDate(date, 'yyyy年M月')
				console.log(this.month);
				if (type == 'init') {
					this.query.registerDate = formatter.formatDate(date, 'yyyy-MM') + '-01'
					this.showMonth = this.month
				}

			},


			dateSubmit() {
				this.query.registerDate = this.registerDate
				this.showMonth = this.month
				this.showsDate = false
				this.getList(1, 10)
			},
			dateCancel() {
				this.showsDate = false
			},

			refresh() {
				this.query = {
						pageSize: 10,
						pageNum: 1,
						registerDate: this.query.registerDate,
						keyWord: this.query.keyWord ? this.query.keyWord : '',
						type: this.query.type,
						inviterId: storage.get('ClientId'),
						activityId: this.query.activityId
					},
					this.dateCancel()
			},


			callPhone(phone) {
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				this.actionList[0].name = phone.replace(reg, "$1****$2")
				console.log(phone.replace(reg, "$1****$2"));
				this.workerPhone = phone
				this.showPhone = true
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(this.workerPhone, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(this.workerPhone, 'wx')
					// #endif
					this.showPhone = false
				}
			},
		}

	}
</script>

<style lang="scss" scoped>
	.inviteList {
		.data-box {
			background: #fff;
			padding: 22rpx 22rpx 0 22rpx;


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

		.list_box {
			background-color: #fff;

			.list {
				display: flex;
				margin: 0 30rpx;
				padding: 20rpx 0;
				border-bottom: 2rpx solid #F8F8F8;

				.right {
					display: flex;
					flex-direction: column;
					text-align: left;
					justify-content: space-between;
					width: 84%;

					.flexs {
						display: flex;
						justify-content: space-between;
					}

					.call {
						padding: 4rpx 17rpx;
						border-radius: 14rpx;
						border: 2rpx solid #A4D091;
						font-size: 22rpx;
						color: #A4D091;
						margin-left: 15rpx;


					}
				}
			}
		}

	}
</style>