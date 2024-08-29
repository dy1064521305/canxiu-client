<template>
	<view class="page">
		<div class="title">订单归属</div>
		<view class="cell">
			<view class="cell-con acea-row row-between-wrapper">
				<view class="cell-con-item acea-row row-middle row-center" @click="onselect(item.value,1)"
					:class="{on:item.value==where.partnerrderlype}" v-for="(item,index) in type1" :key="index">
					{{item.label}}
				</view>
			</view>
		</view>
		<div class="title">下单时间</div>
		<view class="cell">
			<view class="cell-con acea-row row-between-wrapper">
				<view style="display: flex;flex-wrap: wrap;">
					<view v-for="(ti,index) in times" :key='index' @click="timeChange(ti)"
						:class="[activeTimes==ti?'time-active':'time']">
						{{ti}}
					</view>
				</view>

				<view style="display: flex;margin-top: 20rpx;">
					<view class="date-class">
						<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
							@change="bindDateChangeBegin">
							<text style="color: #A5A7A7;padding-left: 24rpx">{{beginTime}}</text>
						</picker>
						<view style="   display: flex;align-items: center;" @click="dateClear('begin')">
							<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
						</view>
					</view>
					<view
						style="width: 36rpx;height: 4rpx;background: #A5A7A7;border-radius: 2rpx;margin: 30rpx 14rpx;">

					</view>
					<view class="date-class">
						<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
							@change="bindDateChangeEnd">
							<text style="color: #A5A7A7;padding-left: 24rpx">{{endTime}}</text>

						</picker>
						<view style=" display: flex;align-items: center;" @click="dateClear('end')">
							<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<div class="title">师傅工种</div>
		<view class="cell" @click="changeWorder('worder')">
			<view class="cell-select acea-row row-between-wrapper">
				<view v-if="activeTypeName.length" style="width:92%;">
					<view>{{activeTypeName.join(',')}}</view>
				</view>
				<view v-else>全部类型</view>
				<u-icon name="arrow-down" color="#333" size="16"></u-icon>
			</view>
		</view>
		<div class="title">订单来源</div>
		<view class="cell">
			<view class="cell-con acea-row row-between-wrapper">
				<view class="cell-con-item acea-row row-middle row-center" @click="onselect(item.value,2)"
					:class="{on:item.value==where.orderSource}" v-for="(item,index) in type2" :key="index">
					{{item.label}}
				</view>
			</view>
		</view>
		<div class="title">品牌信息</div>
		<view class="cell" @click="changeWorder('brand')">
			<view class="cell-select acea-row row-between-wrapper">
				<view v-if="where.brandId" style="width:92%;">
					{{where.brandName}}
				</view>
				<view v-else>全部品牌</view>
				<u-icon name="arrow-down" color="#333" size="16"></u-icon>
			</view>
		</view>
		<div class="title">服务地址</div>
		<view class="cell">
			<pickers @address="addressHandle">
				<view class="cell-select acea-row row-between-wrapper">
					<text>{{where.addressRegion||'全国'}}</text>
					<u-icon name="arrow-down" color="#333" size="16"></u-icon>
				</view>
			</pickers>

		</view>
		<view class="pageBtn acea-row">
			<view class="btn-white" @click="queryHandle('noAll')">
				重置
			</view>
			<view class="btn-green" @click="queryHandle('all')">
				确认
			</view>
		</view>
		<!-- 师傅工种 -->
		<u-popup :show="showWorkerType" :round='18' closeable @close="showWorkerType=false">
			<view class="workerPop" v-if="selectType=='worder'">
				<view class="title">
					师傅工种
				</view>
				<view style="max-height: 800rpx; overflow-y: auto; position: relative; padding-bottom: 160rpx;">
					<view class=" acea-row">
						<view :class="['worker_box',activeTypeName.includes(item.typeName)?'box_active':'']"
							v-for='(item,index) in workerTypeList' :key="index" @click="typeClick(item)">
							{{item.typeName}}
						</view>
					</view>

					<view class="btn" style="">
						<view class="btn-white" @click="queryHandle('noType')">
							重置
						</view>
						<view class="btn-green" @click="queryHandle('type')">
							确认
						</view>
					</view>
				</view>
			</view>
			<view class="workerPop" v-else-if="selectType=='brand'">
				<view class="title">
					品牌信息
				</view>
				<view style="max-height: 800rpx; overflow-y: auto; position: relative; padding-bottom: 160rpx;">
					<view class=" acea-row">
						<view class="acea-row row-center row-middle"
							:class="['worker_box',item.value==where.brandId?'box_active':'']"
							v-for='(item,index) in brandList' :key="index" @click="brandClick(item)">
							{{item.label}}
						</view>
					</view>
					<view class="btn" style="">
						<view class="btn-white" @click="queryHandle('noBrand')">
							重置
						</view>
						<view class="btn-green" @click="queryHandle('brand')">
							确认
						</view>
					</view>
				</view>
			</view>
		</u-popup>




	</view>
</template>

<script>
	import {
		getTeamBrand
	} from "@/api/brand.js"
	import * as customer from '@/api/staging.js'
	import storage from '@/utils/storage'
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import formatter from '@/utils/formatter.js'
	export default {
		components: {
			pickers
		},
		data() {
			return {
				type1: [{
						label: "全部订单",
						value: "",
						activity: false
					},
					{
						label: "直邀订单",
						value: "0",
						activity: false
					},
					{
						label: "团队订单",
						value: "1",
						activity: false
					},
					{
						label: "区域订单",
						value: "2",
						activity: false
					},
				],
				type2: [{
						label: "全部类型",
						value: "",
						activity: false
					},
					{
						label: "门店报修",
						value: "0",
						activity: false
					},
					{
						label: "品牌报修",
						value: "1",
						activity: false
					}
					// {
					// 	label: "代客报修",
					// 	value: "2",
					// 	activity: false
					// },
				],
				showWorkerType: false,
				workerTypeList: [],
				activeTypeName: [],
				where: {
					partnerrderlype: "",
					workerTypeldList: [],
					orderSource: "",
					brandId: "",
					brandName: "",
					addressRegion: "",
					beginTime: "",
					endTime: ""
				},
				selectType: "",
				brandList: [],

				times: ['最近三天', '最近7天', '最近15天', '近1月', '近2月', '近3月'],
				activeTimes: '',
				date: '年月日',
				beginTime: "",
				endTime: ""
			}

		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(options) {
			if (options) {
				let info = JSON.parse(options.info)

				if (info) {
					this.where = {
						partnerrderlype: info.partnerrderlype,
						workerTypeldList: [...info.workerTypeldList],
						orderSource: info.orderSource,
						brandId: info.brandId,
						addressRegion: info.addressRegion,
						brandName: info.brandName,
						beginTime: info.beginTime,
						endTime: info.endTime,
					}
					this.beginTime = formatter.formatDate(info.beginTime),
						this.endTime = formatter.formatDate(info.endTime),
						this.activeTypeName = [...info.workerTypeldList]
				}
				console.log(this.where, "this.where");
			}

		},
		methods: {
			changeWorder(t) {
				this.selectType = t
				if (t == 'worder') {
					this.showWorkerType = true
					customer.getWorkersTypeList().then(res => {
						this.workerTypeList = res.rows
					})
				} else if (t == 'brand') {
					this.showWorkerType = true
					getTeamBrand(storage.get('ClientId')).then(res => {
						this.brandList = res.data
					})
				}

			},
			brandClick(item) {
				this.where.brandId = item.value
				this.where.brandName = item.label
			},
			onselect(value, type) {
				if (type == 1) {
					this.where.partnerrderlype = value
				} else {
					this.where.orderSource = value
				}
			},
			//工种选择
			typeClick(item) {
				console.log(item)
				var i = this.activeTypeName.findIndex(c => c == item.typeName)
				if (i == -1) {
					this.activeTypeName.push(item.typeName)
				} else {
					this.activeTypeName.splice(i, 1)
				}
				console.log(this.activeTypeName);
			},

			//筛选确认
			queryHandle(t) {
				if (t == 'type') {
					this.where.workerTypeldList = [...this.activeTypeName]
					this.showWorkerType = false
				} else if (t == 'noType') {
					this.where.workerTypeldList = this.activeTypeName = []
					this.showWorkerType = false
				} else if (t == 'brand') {
					// this.where.brandId
					this.showWorkerType = false
				} else if (t == 'noBrand') {
					this.where.brandId = ''
					this.where.brandName = ''
					this.showWorkerType = false
				} else if (t == 'all') {
					uni.$emit('selectAll', this.where)
					//返回上一页
					uni.navigateBack({
						delta: 1,
					});
				} else if (t == 'noAll') {
					this.where = {
						partnerrderlype: "",
						workerTypeldList: [],
						orderSource: "",
						brandId: "",
						brandName: "",
						addressRegion: "",
						beginTime: "",
						endTime: ""
					}
					this.where.beginTime = ''
					this.where.endTime = ''
					this.beginTime = ''
					this.endTime = ''
				}
			},
			addressHandle(e) {
				this.where.addressRegion = e.value1.toString().replace(/,/g, "/")
			},
			bindDateChangeBegin: function(e) {
				console.log(e.detail.value);
				this.activeTimes = ''
				this.where.beginTime = e.detail.value + ' 00:00:00'
				this.beginTime = e.detail.value
			},
			bindDateChangeEnd: function(e) {
				this.activeTimes = ''
				this.where.endTime = e.detail.value + ' 23:59:59'
				this.endTime = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			timeChange(time) {
				console.log(time, "2");
				this.activeTimes = time
				var date = new Date()
				var list = formatter.getDateByCode(time)

				console.log(list);
				this.where.beginTime = list.startTime + ' 00:00:00'
				this.where.endTime = list.endTime + ' 23:59:59'
				this.beginTime = ''
				this.endTime = ''
			},
			//日期清空
			dateClear(type) {
				if (type == 'begin') {
					this.where.beginTime = ''
					this.beginTime = ''
				} else {
					this.where.endTime = ''
					this.endTime = ''
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		position: relative;
		padding: 0rpx 30rpx 20rpx;
		box-sizing: border-box;
		background-color: #fff;

		.title {
			height: 78rpx;
			font-size: 28rpx;
			color: #646566;
			line-height: 78rpx;
			margin-bottom: 6px;
		}

		.cell {
			&-con {
				font-size: 24rpx;
				color: #212121;

				&-item {
					width: 212rpx;
					height: 56rpx;
					background: #F2F2F2;
					border-radius: 8rpx;
					margin-bottom: 20rpx;

					&.on {
						background: #F3B23E;
						color: #FFFFFF;
					}
				}
			}

			&-select {
				border: 1rpx solid #f1f1f1;
				padding: 14rpx 16rpx;
				font-size: 26rpx;
				margin-bottom: 10rpx;
			}

			.date-class {
				width: 290rpx;
				height: 60rpx;
				background: #F5F9FA;
				border-radius: 30rpx;
				line-height: 60rpx;
				text-align: center;
				display: flex;
				font-size: 25rpx;

				.picker {
					width: 80%;
				}
			}

			.time,
			.time-active {
				margin: 5rpx 7rpx 20rpx 7rpx;
				width: 203rpx;
				border-radius: 50rpx;
				line-height: 60rpx;
				text-align: center;
				height: 60rpx;
			}

			.time-active {
				background: #fbfaec;
				border: 2rpx solid #F3B23E;
			}

			.time {

				background: #f5f9fa;

			}

			.btn {
				display: flex;

				image {
					width: 337rpx;
					height: 71rpx;
					margin: 69rpx 10rpx;
				}
			}

			.btns {
				width: 100%;
				display: flex;
				justify-content: flex-end;

				.btn-white,
				.btn-green {
					width: 199rpx;
					border-radius: 45rpx;
					text-align: center;
					font-size: 30rpx;
					margin: 15rpx 0 0 10rpx;
				}

				.btn-white {
					height: 55rpx;
					background: #FFFFFF;
					border: 4rpx solid #F3B23E;
					color: #F3B23E;

					line-height: 55rpx;
				}

				.btn-green {
					line-height: 60rpx;
					height: 60rpx;
					background: #F3B23E;
					color: #fff;
				}
			}
		}
	}

	.workerPop {
		.title {
			font-size: 34rpx;
			color: #3D3F3E;
			margin: 28rpx 31rpx;
			font-weight: bold;

		}

		.worker_box {
			width: 200rpx;
			height: 71rpx;
			line-height: 71rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			border: 2rpx solid #D8DCDB;
			color: #A5A7A7;
			margin: 20rpx auto;
			text-align: center;
		}

		.box_active {
			// width: 692rpx;
			// height: 71rpx;
			// background: rgba(159, 214, 163, 0.2);
			border-radius: 7rpx;
			border: 2rpx solid #F3B23E;
			color: #F3B23E;
			background: #ffffe9;
		}

		.btn-white,
		.btn-green {
			height: 72rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 72rpx;
			font-size: 30rpx;
			margin: 10rpx 15rpx;
			flex: 1;

		}

		.btn-white {
			background: #FFFFFF;
			border: 4rpx solid #F3B23E;
			color: #F3B23E;
		}

		.btn-green {
			background: #F3B23E;
			color: #fff;
		}

		.btn {
			display: flex;
			justify-content: space-evenly;
			background-color: #fff;
			width: 100%;
			position: fixed;
			bottom: 0rpx;
			left: 0;
			padding: 20rpx 0 40rpx;
		}
	}

	.screen {
		height: 500rpx;

		.title {
			font-size: 29rpx;
			color: #3D3F3E;
			font-weight: bold;
			margin-bottom: 30rpx;
		}



	}

	::v-deep.u-transition,
	.u-fade-enter-to,
	.u-fade-enter-active {
		z-index: 99 !important;
	}

	.pageBtn {
		// margin-top: 40rpx;
		padding: 40rpx 0;

		.btn-white,
		.btn-green {
			height: 72rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 72rpx;
			font-size: 30rpx;
			margin: 10rpx 10rpx;
			flex: 1;

		}

		.btn-white {
			background: #FFFFFF;
			border: 2rpx solid #F3B23E;
			color: #F3B23E;
		}

		.btn-green {
			background: #F3B23E;
			border: 4rpx solid #F3B23E;
			color: #fff;
		}

	}
</style>