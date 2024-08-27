<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh()'>
			<view slot='top'>
				<view class="data-box acea-row row-middle">
					<view class="input acea-row row-middle">
						<view class=" acea-row row-middle">
							<view style="display: flex;align-items: center; font-size: 28rpx;" @click="showAction=true">
								{{whereType}}
								<view class="acea-row row-middle" style="margin-left: 10rpx;">
									<u-icon name="arrow-down-fill" size="10"></u-icon>
								</view>
							</view>
							<input type="text" @confirm="search()" v-model="searchValue" @input="seachValue"
								:placeholder="'请输入'+whereType">
							<view class="" style="position: absolute; top: 17rpx; right: 70rpx;">
								<u-icon v-if="searchValue" @click="search(1)" color="#D8DCDB"
									name="close-circle"></u-icon>
							</view>
							<view class="input-s" @click="search()"></view>
						</view>
					</view>
					<view style="font-size: 26rpx;color: #555; margin-left: 16rpx;" @click="refresh()">
						重置
					</view>
					<view style="width: 100%; margin-top: 16rpx;">
						<view class="header-type">
							<view class="filter-row acea-row row-between-wrapper">
								<view v-for="(item, index) in changeList" :key="index" class="filter-row-item acea-row"
									@click="tabClick(item)">
									<!-- <picker v-if="item.value==1" @change="dateChange" mode="date" fields="month"
										:value="where.date">
										<text class="select-left-time">{{item.name}}</text>
									</picker> -->
									<pickers v-if="item.value==2" @address="addressHandle"
										style="flex: 1;text-align: right ;">
										<text>{{item.name}}</text>

									</pickers>
									<text v-else> {{item.name}}</text>
									<u-icon name="arrow-down" style="margin: 4rpx 0 0 4rpx;" color="#666666"
										size="15"></u-icon>
								</view>
							</view>
						</view>
						<!-- <u-tabs :list="changeList" @click="tabClick" lineColor="#A4D091" :scrollable='false'></u-tabs> -->
					</view>
				</view>
				<view class="changeTypes">
					<view class="changeTypes-change acea-row row-middle row-center">
						<view :class="{on:type==0}" @click="onChange(0)">卡片</view>
						<view :class="{on:type==1}" @click="onChange(1)">表格</view>
					</view>
				</view>
			</view>
			<view class="list_box" v-if="type==0">
				<view class="list" v-for="(item,index) in dataList" :key="index">
					<view class="box acea-row row-middle">
						<view class="box-image">
							<image v-if="item.avatarUrl" :src="baseInfo.avatarUrl" mode=""></image>
							<image v-else
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/14/0fc1c13f76864515bd2c314287d11154.png"
								mode=""></image>
						</view>
						<view class="box-right">
							<view class="acea-row row-between-wrapper">
								<view class="top acea-row row-middle">
									<view class="line1">{{item.realName}}</view>
									<view class="color acea-row row-middle row-center">
										{{item.partnerType==1?'中级':item.partnerType==2?'高级':'初级'}}合伙人
									</view>
								</view>
								<view class="types acea-row row-middle">
									{{item.relationType==1?'区域关系':'直属关系'}} <u-icon name="arrow-right"
										style="margin-top:4rpx;" color="#666666" size="14"></u-icon>
								</view>
							</view>
							<view class="bottom">
								{{item.region}}
							</view>
						</view>
					</view>
					<view class="box-get acea-row">
						<view class="box-get-item flex-colum">
							<text>团队人数</text>
							<view>{{item.teamCount||0}}人</view>
						</view>
						<view class="box-get-item flex-colum">
							<text>团队师傅</text>
							<view>{{item.teamWorkerCount||0}}人</view>
						</view>
						<view class="box-get-item flex-colum">
							<text>品牌数</text>
							<view>{{item.brandCount||0}}家</view>
						</view>
						<view class="box-get-item flex-colum">
							<text>投资款余额</text>
							<view>￥{{item.investmentBalance||0}}</view>
						</view>
						<view class="box-get-item flex-colum">
							<text>累计销售业绩</text>
							<view>￥{{item.totalSaleAmount||0}}</view>
						</view>
						<view class="box-get-item flex-colum">
							<text>累计分红收益</text>
							<view>￥{{item.totalRevenueAmount||0}}</view>
						</view>
					</view>
					<view class="box-bottom acea-row row-between-wrapper">
						<text>{{item.joinTeamTime||'暂无时间'}}加入</text>
						<view class="btn" @click="$jump('/subpkg/staging/team/setMessage?partnerId='+item.partnerId)">
							信息编辑
						</view>
					</view>
				</view>
			</view>
			<Table v-else="type==1" :tableData='tableData' :total="total" @changeTable="changeTable" :where="where"
				:option="option"></Table>
		</z-paging>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect_two' :closeOnClickOverlay='false'
			:actions="showTypeChange" :show="showAction"></u-action-sheet>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="showTypeChangeOne" :show="showActionOne"></u-action-sheet>
		<!-- 筛选 -->
		<u-popup :show="showScreen" @close="showScreen=false" closeable zIndex='100'>
			<view style="margin:70rpx 50rpx;">
				<view style="text-align: center;margin-bottom: 40rpx;font-weight: bold;">
					筛选
				</view>
				<view class="screen">
					<view class="title" style="margin-top: 20rpx;">
						时间
					</view>
					<view style="display: flex;margin-top: 20rpx;">
						<view class="date-class">
							<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChangeBegin">
								<text style="color: #A5A7A7;padding-left: 24rpx">{{startTime}}</text>
							</picker>
							<view style="display: flex;align-items: center;" @click="dateClear('begin')">
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

					<view class="btns" style="justify-content: space-evenly;margin-top: 80rpx;">

						<view class="btn-white" @click="refresh(1)">重置</view>
						<view @click="queryList" class="btn-green">确认</view>
					</view>
				</view>
			</view>
		</u-popup>


	</view>
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import
	Table
	from '@/components/table.vue'
	import {
		getPartnerRegion
	} from "@/api/appUpdate.js"
	import storage from '@/utils/storage'
	import formatter from '@/utils/formatter.js'
	import {
		getTeamList
	} from "@/api/brand.js"
	export default {
		components: {
			Table,
			pickers
		},
		data() {
			return {
				date: '年月日',
				showScreen: false,
				whereType: '姓名',
				dataList: [],
				//th
				changeList: [{
					name: '时间筛选',
					value: 1
				}, {
					name: '全部区域',
					value: 2
				}, {
					name: '组织关系',
					value: 3
				}],
				option: {
					column: [{
							label: '姓名',
							prop: 'realName',
							width: "20%"
						},
						{
							label: '所在城市',
							prop: 'region',
							width: "50%"
						},
						{
							label: '合伙人级别',
							prop: 'partnerType',
							width: "30%"
						}

					]
				},
				showTypeChange: [{
						name: '姓名'
					},
					{
						name: '手机号'
					},
					{
						name: '取消'
					},
				],
				showTypeChangeOne: [{
						name: '直属关系'
					},
					{
						name: '区域关系'
					},
					{
						name: '取消'
					},
				],
				where: {
					realName: "",
					cellPhone: "",
					startTime: "",
					endTime: "",
					regionList: [],
					relationType: "",
					userId: storage.get('ClientId'),
					pageSize: 1,
					pageNum: 10
				},
				startTime: "",
				endTime: "",
				showAction: false,
				showActionOne: false,
				searchValue: "",
				type: 0,
				total: 0,
				tableData: []

			}
		},
		onLoad() {},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getList(pageNo, pageSize) {
				this.showScreen = false
				this.where.pageNum = pageNo
				this.where.pageSize = pageSize
				getTeamList(this.where).then(res => {
					if (!res.data) {
						this.dataList = []
					}
					this.$refs.paging.completeByTotal(res.rows, res.total);
					this.total = res.total
					this.tableData = res.rows
					this.tableData.forEach((item) => {
						item.partnerType = item.partnerType == 1 ? '中级合伙人' : item.partnerType == 2 ?
							'高级合伙人' :
							'初级合伙人'
					})

				})
			},
			changeTable(e) {
				console.log(e, "2");
				this.getList(e, 10)
			},
			actionSelect_two(e) {
				if (e.name == '取消') {
					this.showAction = false
				} else {
					this.whereType = e.name
					this.showAction = false
				}
			},
			actionSelect(e) {
				if (e.name == '取消') {
					this.showActionOne = false
				} else {
					this.where.relationType = e.name == "直属关系" ? 0 : 1
					this.showActionOne = false
				}
				this.$refs.paging.reload()
			},
			search(i) {
				if (i) {
					this.searchValue = ''
					this.where.realName = ''
					this.where.cellPhone = ""
				} else {
					if (this.whereType == '姓名') {
						this.where.realName = this.searchValue
						this.where.cellPhone = ""
					} else {
						this.where.cellPhone = this.searchValue
						this.where.realName = ""
					}
				}

				this.$refs.paging.reload()
			},
			tabClick(e) {
				switch (e.value) {
					case 1:
						this.showScreen = true
						break;
					case 2:
						break;
					case 3:
						this.showActionOne = true
						break;
					default:
						break;
				}

			},
			addressHandle(e) {
				this.where.region = e.value1.toString().replace(/,/g, "/")
				this.where.regionList = e.value1
				this.$refs.paging.reload()
				console.log(e, "eee");
			},
			//条件查询
			queryList() {
				// this.getNum()
				this.$refs.paging.reload();
			},
			dateChange(val) {
				this.where.date = val.detail.value
				this.query.registerDate = val.detail.value + '-01'
				this.$refs.paging.reload();
			},
			onChange(t) {
				if (t == this.type) return
				this.type = this.type == 0 ? 1 : 0
				if (this.type) {
					this.where.pageSize = 1000
					this.$refs.paging.reload();
				} else {
					this.$refs.paging.reload();
					this.where.pageSize = 10
				}
			},
			bindDateChangeBegin: function(e) {
				this.where.startTime = e.detail.value + ' 00:00:00'
				this.startTime = e.detail.value
			},
			bindDateChangeEnd: function(e) {
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
				var date = new Date()
				var list = formatter.getDateByCode(time)

				console.log(list);
				this.where.startTime = list.startTime + ' 00:00:00'
				this.where.endTime = list.endTime + ' 23:59:59'
			},
			//日期清空
			dateClear(type) {
				if (type == 'begin') {
					this.where.startTime = ''
					this.startTime = ''
				} else {
					this.where.endTime = ''
					this.endTime = ''
				}
			},
			refresh(i) {
				if (i) {
					this.where.endTime = ''
					this.where.startTime = ''
					this.endTime = ''
					this.startTime = ''
				} else {
					this.where.endTime = ''
					this.where.startTime = ''
					this.endTime = ''
					this.startTime = ''
					this.where.relationType = ''
					this.where.regionList = ""
					this.where.region = ''
					this.where.realName = ''
					this.where.cellPhone = ''
					this.searchValue = ''
				}
				// this.getNum()
				this.$refs.paging.reload();
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		min-height: 100vh;
		// background-color: #fff;
		padding: 20rpx 20rpx 40rpx;

		.data-box {
			background: #fff;
			padding: 22rpx 22rpx 0 22rpx;

			&.on {
				padding: 22rpx 22rpx 22rpx 22rpx;
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
		}

		.changeTypes {
			width: 100%;
			height: 124rpx;
			position: relative;

			&-change {
				position: absolute;
				top: 24rpx;
				right: 32rpx;
				width: 224rpx;
				height: 80rpx;
				text-align: center;
				background: #F3B23E;
				color: #FFFFFF;
				font-size: 32rpx;
				border-radius: 16rpx;
				padding: 0 10rpx;

				view {
					width: 50%;

					&.on {
						height: 64rpx;
						background-color: #FFFFFF;
						line-height: 64rpx;
						border-radius: 18rpx;
						color: #F3B23E;
					}
				}
			}
		}
	}

	.list_box {
		background-color: #fff;
		font-size: 26rpx;
		border-radius: 20rpx 20rpx 0 0;

		.list {
			// margin: 0 30rpx;
			border-bottom: 1rpx solid #F8F8F8;

			.box {
				padding: 34rpx 30rpx;
				border-bottom: 1rpx solid #f5f5f5;

				&-image {
					width: 80rpx;
					height: 80rpx;
					margin-right: 22rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				&-right {
					flex: 1;
					font-size: 24rpx;

					.top {
						.line1 {
							display: block;
							max-width: 300rpx;
							color: #212121;
							margin-right: 20rpx;
							font-size: 32rpx;
						}

						.color {
							height: 32rpx;
							display: inline-block;
							background: #F3B23E;
							padding: 0 8rpx;
							color: #fff;
							border-radius: 6rpx;
						}

					}

					.types {
						color: #212121;
					}

					.bottom {
						font-size: 28rpx;
						color: #999999;
						margin-top: 4rpx;
					}
				}

				&-get {
					background-color: #fff;
					margin: 18rpx 0;
					box-sizing: border-box;

					&-item {
						width: 33.2%;
						border-right: 1rpx solid #f5f5f5;
						margin: 18rpx 0;
						padding-left: 32rpx;
						box-sizing: border-box;


						text {
							font-size: 24rpx;
							color: #666666;
						}

						view {
							font-family: PingFangSC, PingFang SC;
							// font-weight: bold;
							font-size: 32rpx;
							color: #212121;
							margin-top: 12rpx;
						}
					}

					&-item:nth-child(3n) {
						border-right: none;
					}
				}

				&-bottom {
					height: 94rpx;
					border-top: 1rpx solid #f5f5f5;
					padding: 0 26rpx;
					font-size: 28rpx;
					color: #999999;
					line-height: 94rpx;

					.btn {
						width: 176rpx;
						height: 64rpx;
						background: #F3B23E;
						border-radius: 8rpx;
						color: #FFFFFF;
						line-height: 64rpx;
						text-align: center;
					}
				}

				.flexs {
					display: flex;
					justify-content: space-between;
				}

			}
		}
	}

	.header-type {
		font-size: 26rpx;
		justify-content: space-between;

		.filter-row {
			box-sizing: border-box;
			height: 88rpx;
			margin-top: 20rpx;
			border-top: 1rpx solid #ececec;
			padding: 0 40rpx;

			.filter-row-item {
				color: #666666;
				font-size: 28rpx;
				margin-right: 30rpx;

				&:last-of-type {
					margin-right: 0;
				}

				image {
					display: inline-block;
					width: 16rpx;
					height: 20rpx;
					margin: 8rpx 6rpx 0;
				}

				.sort {
					width: 14rpx;
					height: 20rpx;
					color: #999999;
				}

				.bottomsort {
					transform: rotate(180deg)
				}
			}
		}
	}

	.screen {
		height: 380rpx;

		.title {
			font-size: 29rpx;
			color: #3D3F3E;
			font-weight: bold;
			margin-bottom: 30rpx;
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
			background: #f0fbf5;
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
	}

	::v-deep.u-transition,
	.u-fade-enter-to,
	.u-fade-enter-active {
		z-index: 99 !important;
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

		::v-deep.u-transition,
		.u-fade-enter-to,
		.u-fade-enter-active {
			z-index: 99 !important;
		}
	}
</style>