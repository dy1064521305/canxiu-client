<template>
	<view class="inviteRewards">

		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>
				<u-navbar placeholder>
					<view class="u-nav-slot" slot="left">
						<u-icon name="arrow-left" size="19" @click="back"></u-icon>
					</view>
					<!-- 	<view style="display: flex; align-items: center;" slot="center" @click="showAction=true">
						{{type}}<u-icon style="margin-left: 10rpx;" name="arrow-down-fill" size="10"></u-icon>
					</view> -->
					<view class="two_change" style="display: flex; align-items: center;" slot="center">
						<text v-for="(item) in typeTab" :key="item.id" :class="{on:type==item.label}"
							@click="typeClick(item)">{{item.label}}</text>
					</view>
				</u-navbar>
				<!-- <view class="data-box" v-if="type=='活动奖励'">
					<u-search @custom="search" @clear="search" @search="search" :show-action="true"
						placeholder="请输入门店名称" v-model="query.keyWord">
					</u-search>
					<u-tabs :list="statusList" @click="tabClick" lineColor="#A4D091" :scrollable='false'></u-tabs>			
				</view> -->
				<view class="data-box acea-row row-middle" v-if="type=='活动奖励'">
					<view class="acea-row row-middle">
						<view class="input acea-row row-middle">
							<view style="display: flex;align-items: center; font-size: 28rpx;"
								@click="showAction_three=true">
								{{whereActType}}
								<view class="acea-row row-middle" style="margin-left: 10rpx;">
									<u-icon name="arrow-down-fill" size="10"></u-icon>
								</view>
							</view>
							<input type="text" @confirm="searchActivity(1)" @input="seachValue" v-model="searchActValue"
								:placeholder="'请输入'+whereActType">
							<view class="" style="position: absolute; top: 17rpx; right: 70rpx;">
								<u-icon v-if="searchActValue" @click="searchActivity()" color="#D8DCDB"
									name="close-circle"></u-icon>
							</view>
							<view class="input-s" @click="searchActivity(1)"></view>

						</view>
						<view class="shaixuan" @click="showAction=true">
							<image
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/eb78f3eb65ec46fc92b1245b17c64838.png"
								mode=""></image>
						</view>
						<view style="width: 100%; margin-top: 16rpx;">
							<u-tabs :list="statusList" @click="tabClick" lineColor="#A4D091"
								:scrollable='false'></u-tabs>
						</view>

					</view>


					<!-- <u-search @custom="search" @clear="search" @search="search" :show-action="true"
						placeholder="好友姓名或手机号" v-model="query.keyWord">
					</u-search> -->

				</view>
				<view class="data-box acea-row row-middle" v-else :class="{on:type=='推广奖励'}">
					<view class="input acea-row row-middle">
						<view style="display: flex;align-items: center; font-size: 28rpx;" @click="showAction_two=true">
							{{whereType}}
							<view class="acea-row row-middle" style="margin-left: 10rpx;">
								<u-icon name="arrow-down-fill" size="10"></u-icon>
							</view>
						</view>
						<input type="text" @confirm="search(1)" v-model="searchValue" @input="seachValue"
							:placeholder="'请输入'+whereType">
						<view class="" style="position: absolute; top: 17rpx; right: 70rpx;">
							<u-icon v-if="searchValue" @click="search()" color="#D8DCDB" name="close-circle"></u-icon>
						</view>
						<view class="input-s" @click="search(1)"></view>


					</view>
					<view class="shaixuan" @click="showAction=true">
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/eb78f3eb65ec46fc92b1245b17c64838.png"
							mode=""></image>
					</view>
					<!-- <u-search @custom="search" @clear="search" @search="search" :show-action="true"
						placeholder="好友姓名或手机号" v-model="query.keyWord">
					</u-search> -->

				</view>
				<view style='display: flex;margin: 10rpx 0 10rpx 20rpx;'>
					<view style='margin-top: 20rpx;display: flex;'>
						<view class="select-left acea-row">
							<picker @change="dateChange" mode="date" fields="month" :value="where.date">
								<text class="select-left-time">{{showDate}}</text>
							</picker>
							<view style="margin-left: 10rpx;">
								<u-icon name="arrow-down-fill" size="10"></u-icon>
							</view>

						</view>
					</view>
				</view>
			</view>

			<view class="list_box" v-show="type=='活动奖励'">
				<view v-for="(item,index) in dataList" :key="index" class="list">
					<!-- <image src="../../../static/logo.png" style="width: 79rpx;height: 79rpx;margin-right: 26rpx;">
					</image> -->
					<view class="box">
						<view class="flexs">
							<text
								style="color: #3D3F3E; font-size:30rpx ;">{{item.activityType==1?'邀请门店注册奖励':'邀请好友注册奖励'}}</text>
							<text class="acea-row row-middle">
								<text :style="{'color':item.status=='0' ?'#A4D091':item.status=='1'
								?'#EC5722':'#A5A7A7','margin-right':'10rpx'}">{{item.status=='0'?'待结算':item.status=='1'?'已结算':'已失效'}}</text>
								<text style="color:#A4D091; margin-right: 8rpx;"> | </text>
								¥{{item.rewardAmount||0}}</text>
						</view>
						<view class="flexs acea-row row-middle"
							style="font-size: 25rpx;color: #A5A7A7;margin-top: 10rpx;">
							<view class=" acea-row row-middle">来源：<image v-if="item.imgUrl!=null" :src="item.imgUrl"
									style="width: 30rpx;height:30rpx; margin-right: 10rpx; border-radius: 50%;">
								</image>
								<image v-else
									src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png"
									style="width: 30rpx;height:30rpx; margin-right: 10rpx;">
								</image> <text style="font-size: 22rpx;">{{item.name||'暂无昵称'}}</text>
							</view>
							<view>
								<text v-if="item.status=='0'">{{item.settleTime}}<text
										v-if="item.settleTime">注册</text></text>
								<text v-else-if="item.status=='1'">{{item.settleTime}} <text
										v-if="item.settleTime">结算</text></text>
								<text v-else> <text v-if="item.reason">失效原因</text>{{item.reason}}</text>
							</view>
						</view>
					</view>

				</view>
			</view>
			<view class="list_box" v-show="type=='推广奖励'">
				<view v-for="(item,index) in dataList" :key="index" class="list">
					<view class="box">
						<view class="flexs">
							<text style="color: #3D3F3E; font-size:30rpx ;">{{item.detailsType}}</text>
							<text class="acea-row row-middle">
								¥{{item.detailsAmount}}</text>
						</view>
						<view class="flexs acea-row row-middle"
							style="font-size: 25rpx;color: #A5A7A7;margin-top: 10rpx;">
							<view class=" acea-row row-middle">关联订单：{{item.orderNumber}}
							</view>
							<view>
								{{item.settlementTime||''}} <text v-if="item.settlementTime">结算</text>
							</view>
						</view>
					</view>

				</view>
			</view>

		</z-paging>
		<!-- <u-popup :show="showsDate" @close="showsDate=false" closeable>
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
					<view class="btn-green" @click="dateSubmit(type)">
						确认
					</view>

				</view>
			</view>
		</u-popup> -->

		<u-toast ref="uToast"></u-toast>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="type=='推广奖励'? actionList:activityList" :show="showAction"></u-action-sheet>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect_two' :closeOnClickOverlay='false'
			:actions="showTypeChange" :show="showAction_two"></u-action-sheet>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect_three' :closeOnClickOverlay='false'
			:actions="showActTypeChange" :show="showAction_three"></u-action-sheet>
	</view>
</template>

<script>
	import formatter from '@/utils/formatter.js'
	import {
		inviteReward,
		getPartnerReward,
		getPromotionalRewardsList
	} from '@/api/invite.js'
	import storage from '@/utils/storage'

	export default {
		data() {
			// const currentDate = this.getDate({
			// 	format: true
			// })
			return {
				showAction: false,
				showAction_two: false,
				showAction_three: false,
				whereType: "订单编号",
				whereActType: "师傅名称",
				typeTab: [{
						id: 0,
						label: "推广奖励"
					},
					{
						id: 1,
						label: "活动奖励"
					},
				],

				showActTypeChange: [{
						name: '师傅名称'
					},
					{
						name: '师傅手机号'
					},
					{
						name: '门店名称'
					},
					{
						name: '门店手机号'
					},
					{
						name: '取消'
					},
				],
				showTypeChange: [{
						name: '订单编号'
					},
					{
						name: '品牌名称'
					},
					{
						name: '取消'
					},
				],
				searchValue: "",
				searchActValue: "",
				date: '',
				dataList: [],
				query: {
					pageSize: 10,
					pageNum: 1,
					type: '',
					registerDate: this.getCurrentMonth() + '-01',
					inviterId: '',
					workerName: "",
					workerPhone: "",
					storeName: "",
					adminPhone: "",
					activityType: ""
				},
				where: {
					userId: storage.get('ClientId'),
					brandName: "",
					orderNumber: "",
					code: "",
					pageSize: 10,
					pageNum: 1,
					date: this.getCurrentMonth()
				},
				value1: Number(new Date()),
				beginTime: '',
				endTime: '',
				activeTime: 0,
				month: '',
				statusList: [{
					name: '全部',
					value: ''
				}, {
					name: '待结算',
					value: 0
				}, {
					name: '已结算',
					value: 1
				}, {
					name: '已失效',
					value: 2
				}],
				activeStatus: 0,
				actionList: [{
						id: '',
						name: '全部类型'
					},
					{
						id: 3,
						name: '销售业绩奖励'
					},
					{
						id: 5,
						name: '区域分红'
					},
					{
						name: '取消'
					},
				],
				activityList: [{
						id: '',
						name: '全部类型'
					},
					{
						id: 1,
						name: '邀请门店奖励'
					},
					{
						id: 0,
						name: '邀请师傅奖励'
					},
					{
						name: '取消'
					},
				],
				type: '活动奖励',
				activityId: '',
				showMonth: '',
				partnerld: "",
				registerDate_2: "",
				typeId: ""

			};
		},
		onShow() {
			// this.timestampToYMD(this.value1, 'init')
			// console.log(this.query.registerDate);
			// this.getList(1, 10)

		},
		watch: {
			typeId: {
				handler: function(newVal, oldVal) {
					if (newVal === 0) {
						this.showActTypeChange = [{
								name: '门店名称'
							},
							{
								name: '门店手机号'
							},
							{
								name: '取消'
							},
						]
						this.whereActType = '门店名称'
					} else if (newVal === 1) {
						this.showActTypeChange = [{
								name: '师傅名称'
							},
							{
								name: '师傅手机号'
							},
							{
								name: '取消'
							},
						]
						this.whereActType = '师傅名称'
					} else if (newVal === '') {
						this.showActTypeChange = [{
								name: '师傅名称'
							},
							{
								name: '师傅手机号'
							},
							{
								name: '门店名称'
							},
							{
								name: '门店手机号'
							},
							{
								name: '取消'
							},
						], this.whereActType = '师傅名称'
					}
				},
				immediate: true, // 组件创建时立即触发
				deep: true // 对象内部属性变化时也触发
			}
		},
		computed: {
			showDate() {
				const {
					date
				} = this.where
				return this.where.date.split('-')[0] + '年' + '-' + this.where.date.split('-')[1] + '月'
			},
		},
		onLoad(option) {
			if (option && option.info) {
				let info = JSON.parse(option.info)
				this.activityId = info.activityId
				this.query.inviterId = info.inviterId
				this.type = info.type == 'customer' ? '活动奖励' : '推广奖励'
			}
			if (option && option.type) {
				this.type = '推广奖励'
			}
			console.log(this.type, '122');

		},
		methods: {
			getCurrentMonth() {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				month = month > 9 ? month : '0' + month
				let day = date.getDate()
				return `${year}-${month}`
			},
			dateChange(val) {
				this.where.date = val.detail.value
				this.query.registerDate = val.detail.value + '-01'
				this.$refs.paging.reload();
			},
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
				this.query.pageNum = pageNo
				this.where.pageNum = pageNo
				this.where.pageSize = pageSize
				this.query.pageSize = pageSize
				this.query.activityId = this.activityId ? this.activityId : ''
				if (this.type == '活动奖励') {
					getPartnerReward(this.query).then(res => {
						if (!res.data) {
							this.dataList = []
						}
						this.$refs.paging.completeByTotal(res.data.rows, res.data.total);
					})
				} else {
					getPromotionalRewardsList(this.where).then(res => {
						if (!res.rows) {
							this.dataList = []
						}
						this.$refs.paging.completeByTotal(res.rows, res.total);
					})

				}
			},
			getListWhere() {

			},
			search(i) {
				if (i) {
					if (this.whereType == '订单编号') {
						this.where.orderNumber = this.searchValue
						this.where.brandName = ""
					} else {
						this.where.brandName = this.searchValue
						this.where.orderNumber = ""
					}
				} else {
					this.searchValue = ""
					this.where.brandName = ""
					this.where.orderNumber = ""
				}
				this.$refs.paging.reload()
			},
			searchActivity(i) {
				if (i) {
					let data = this.whereActType
					switch (data) {
						case '师傅名称':
							this.query.workerName = this.searchActValue
							this.query.workerPhone = ""
							this.query.storeName = ""
							this.query.adminPhone = ""
							break;
						case '师傅手机号':
							this.query.workerPhone = this.searchActValue
							this.query.workerName = ""
							this.query.storeName = ""
							this.query.adminPhone = ""
							break;
						case '门店名称':
							this.query.storeName = this.searchActValue
							this.query.workerName = ''
							this.query.workerPhone = ""
							this.query.adminPhone = ""
							break;
						case '门店手机号':
							this.query.adminPhone = this.searchActValue
							this.query.workerName = ''
							this.query.workerPhone = ""
							this.query.storeName = ""
							break;
						default:
							break;
					}
				} else {
					this.searchActValue = ""
					this.query.adminPhone = ""
					this.query.workerName = ''
					this.query.workerPhone = ""
					this.query.storeName = ""
				}
				this.$refs.paging.reload()
			},
			seachValue(e) {
				if (!e.target.value) {
					this.$refs.paging.reload()
				}
			},
			tabClick(e) {
				this.query.type = e.value
				this.$refs.paging.reload();
			},
			// dateChange(e) {
			// 	this.timestampToYMD(e.value)

			// },
			// timestampToYMD(timestamp, type) {
			// 	var date = new Date(timestamp);
			// 	this.registerDate = formatter.formatDate(date, 'yyyy-MM') + '-01'
			// 	this.registerDate_2 = formatter.formatDate(date, 'yyyy-MM')
			// 	this.month = formatter.formatDate(date, 'yyyy年M月')
			// 	console.log(this.month);
			// 	if (type == 'init') {
			// 		this.query.registerDate = formatter.formatDate(date, 'yyyy-MM') + '-01'
			// 		this.showMonth = this.month
			// 	}
			// },

			// dateSubmit(type) {
			// 	if (type == '推广奖励') {
			// 		this.where.date = this.registerDate_2
			// 	} else {
			// 		this.query.registerDate = this.registerDate
			// 	}
			// 	this.showMonth = this.month
			// 	this.showsDate = false
			// 	this.getList(1, 10)
			// },
			back() {
				uni.navigateBack()
			},
			refresh() {
				this.query = {
						pageSize: 10,
						pageNum: 1,
						registerDate: this.query.registerDate,
						workerId: this.query.inviterId,
						keyWord: this.query.keyWord ? this.query.keyWord : '',
						type: this.query.type,
						inviterId: this.query.inviterId,
					},
					this.where = {
						pageSize: 10,
						pageNum: 1,
						userId: this.where.userId,
						brandName: this.where.brandName,
						orderNumber: this.where.orderNumber,
						code: this.where.code,
						date: this.where.date
					}
				this.$refs.paging.reload()
			},

			actionSelect(e) {
				console.log(e, "type///");
				if (e.name == '取消') {
					this.showAction = false
				} else {
					// this.type = e.name
					if (this.type == '推广奖励') {
						this.where.code = e.id
						this.searchValue = ""
						this.where.orderNumber = ""
						this.where.brandName = ""
						this.showAction = false
						this.$refs.paging.reload()
					} else {
						this.query.activityType = e.id
						this.typeId = e.id
						this.showAction = false
						let data = this.whereActType
						this.searchActValue = ""
						this.query.workerName = ''
						this.query.workerPhone = ""
						this.query.storeName = ""
						this.query.adminPhone = ""
						this.$refs.paging.reload()
					}

				}
			},
			actionSelect_two(e) {
				console.log(e, "type///");
				if (e.name == '取消') {
					this.showAction_two = false
				} else {
					this.whereType = e.name
					console.log(e.name, "22882");
					this.showAction_two = false
				}
			},
			actionSelect_three(e) {
				console.log(e, "type///");
				if (e.name == '取消') {
					this.showAction_three = false
				} else {
					this.whereActType = e.name
					console.log(e.name, "22882");
					this.showAction_three = false
				}
			},

			typeClick(item) {
				if (this.type == item.label) return
				this.dataList = []
				this.type = item.label
				this.query.type = ''
				this.$refs.paging.reload();
			}
		}

	}
</script>

<style lang="scss" scoped>
	.two_change {
		font-family: PingFangSC, PingFang SC;
		font-weight: bold;
		font-size: 32rpx;
		color: #212121;

		text {
			position: relative;
			margin-right: 15rpx;

			&.on {
				position: relative;
			}

			&.on::after {
				content: "";
				position: absolute;
				height: 6rpx;
				background: #A4D091;
				border-radius: 3rpx;
				width: 100%;
				bottom: -14rpx;
				left: 0;

			}
		}

		text:nth-last-child(1) {
			margin-right: 0rpx;
			margin-left: 15rpx;
		}
	}

	.inviteRewards {
		.data-box {
			background: #fff;
			padding: 22rpx 22rpx 0 22rpx;

			&.on {
				padding: 22rpx 22rpx 22rpx 22rpx;
			}

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
			font-size: 26rpx;
			border-radius: 20rpx 20rpx 0 0;

			.list {
				display: flex;
				margin: 0 30rpx;
				padding: 25rpx 0;
				border-bottom: 1rpx solid #F8F8F8;

				.box {
					width: 100%;

					.flexs {
						display: flex;
						justify-content: space-between;
					}

				}
			}
		}

	}

	.input {
		// width: 563rpx;
		flex: 1;
		padding: 0 30rpx;
		background-color: rgb(242, 242, 242);
		border-radius: 50rpx;
		height: 62rpx;
		position: relative;

		input {
			width: 340rpx;
			height: 62rpx;
			margin-left: 20rpx;
			font-size: 26rpx;
		}

		.input-s {
			position: absolute;
			top: 19rpx;
			right: 30rpx;
			width: 25rpx;
			height: 25rpx;
			background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;
			background-size: 100% 100%;
		}

	}

	.shaixuan {
		margin: 0 10rpx 0 16rpx;

		image {
			width: 30rpx;
			height: 30rpx;
		}
	}

	/deep/ .uni-input-placeholder {
		color: rgb(192, 196, 204);
		font-size: 24rpx;
	}

	.select {
		height: 164rpx;
		padding-top: 26rpx;
		box-sizing: border-box;

		&-left {
			width: 222rpx;
			height: 44rpx;
			// background: #FFFFFF;
			color: #333;
			border-radius: 22rpx;
			font-size: 28rpx;
			align-items: center;
			margin-bottom: 16rpx;


			&-time {
				font-size: 28rpx;
				margin: 0 4rpx 0 16rpx;
			}

			&-icon {
				// margin: 0 37rpx 0 20rpx;
				color: #999999;
				border-radius: 10rpx;
			}


		}
	}
</style>