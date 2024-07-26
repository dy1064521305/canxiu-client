<template>
	<view class="workers">
		<z-paging ref="paging" v-model="workerList" @query="getList">
			<view slot='top'>
				<view class="search">
					<u-search :showAction="false" placeholder="输入师傅名称或手机号" @clear='queryList'
						v-model="queryParams.search" @search="queryList">
					</u-search>
					<view class="status">
						<view :class="['box',index==currentTabIndex?'active':'']" v-for="(item,index) in list1"
							:key="index" @click="statusHandle(index)">
							{{item}}<u-icon v-if="item=='推荐排序'||item=='位置区域'||item=='工种'" name="arrow-down-fill"
								:color="index==currentTabIndex?'#4f5251':'#D8DCDB'" style="margin-left: 6rpx;"></u-icon>
							<view v-if="item=='星级最高'||item=='完单最高'" class="">
								<view style="margin-left: 10rpx;">
									<view @click.stop="sortIconClick('upac')">
										<u-icon size="13" v-if="icon!='upac'" name="arrow-up-fill"
											color="#D8DCDB"></u-icon>
									</view>
									<view @click.stop="sortIconClick('')">
										<u-icon size="13" v-if="icon=='upac'" name="arrow-up-fill"
											color="#A4D091"></u-icon>
									</view>

								</view>
								<view style="margin-left: 10rpx;">
									<view @click.stop="sortIconClick('downac')">
										<u-icon size="13" v-if="icon!='downac'" name="arrow-down-fill"
											color="#D8DCDB"></u-icon>
									</view>
									<view @click.stop="sortIconClick('')">
										<u-icon size="13" v-if="icon=='downac'" name="arrow-down-fill"
											color="#A4D091"></u-icon>
									</view>

								</view>

							</view>
						</view>

					</view>
				</view>
			</view>

			<view v-for="(item,index) in workerList" :key="index" class="swipe-action u-border-top u-border-bottom"
				@click="goInfo(item)">
				<view style="    background-color: #fff;
			margin: 20rpx;
			display: flex;
			padding: 20rpx 0;
			border-radius: 18rpx">
					<view style="margin: 0 30rpx; display:flex;align-items: center;">
						<image v-if="item.avatarUrl==null||item.avatarUrl==''" style="width: 80rpx;height: 80rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/22/ff24d5bb631f4c7ea2882f2d0ab668c1.png">
						</image>
						<image v-else :src="item.avatarUrl" style="width: 80rpx;height: 80rpx;border-radius:50%; ">
						</image>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
						<view class="" style="font-size: 32rpx;">
							{{item.workerName}}
						</view>
						<view class="" style="font-size: 28rpx; color: #999999;">
							{{item.regPhone}}
						</view>
					</view>
					<view class="right acea-row">
						<view class="right-rule acea-row row-column row-center row-middle"
							@click.stop="$jump('/subpkg/staging/workers/set?workerId='+item.workerId+'&day='+item.freezeDay)">
							<image
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/19/96db4164069e4a0fa10d584ac72e97c1.png"
								mode=""></image>
							<view>师傅设置</view>
						</view>
						<view class="right-rule acea-row row-column row-center row-middle"
							@click.stop="showPhoneHandle(item.workerPhone)">
							<image style="width: 38rpx;"
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/24/43530a3a6467447aa6bc35281c6b1271.png"
								mode=""></image>
							<view>联系ta</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
		<!-- 	<u-empty marginTop='80' text='暂无数据' v-if="workerList.length==0"
			icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png">
		</u-empty> -->
		<!-- <u-swipe-action v-else>
			<u-swipe-action-item  :options="options2" autoClose> -->
		<!-- 	<view v-else> -->

		<!-- 	</view> -->

		<!-- 	<view class="custom-action-item" slot="remove">
					<view class="action-item" @click="removehandle(item)">
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/12/4d90b6dfe1d94734b0bbed917ba2b402.png"
							style="width: 88rpx;height: 88rpx;" mode=""></image>
						移除
					</view>
				</view>
				<view v-if="item.status==0" class="custom-action-item" slot="disabled">
					<view class="action-item" @click="handle(item,'disabled')">
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/12/499df8c0b5f24b14b4fb546083c1cd06.png"
							style="width: 88rpx;height: 88rpx;" mode=""></image>
						禁用
					</view>
				</view>
				<view v-if="item.status==1" class="custom-action-item" slot="start">
					<view class="action-item" @click="handle(item,'start')">
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/12/86068fb58d1b4d63b33d8cecac637d2f.png"
							style="width: 88rpx;height: 88rpx;" mode=""></image>
						启用
					</view>
				</view> 
			</u-swipe-action-item>
		</u-swipe-action>-->

		<u-modal :show="showModal" width="500rpx" title="温馨提示" showCancelButton confirmColor='#A4D091'
			@cancel="showModal=false" @confirm="confirmHandle">
			<view style="width: 100%;text-align: center;">
				确认移除该用户？
			</view>
		</u-modal>

		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>

		<!-- 排序选择 -->
		<u-popup :show="showSort" :round='7'>
			<view class="sort">
				<view :class="['sort_box',item.name==activeName?'box_active':'']" v-for='(item,index) in sortList'
					:key="index" @click="sortClick(item)">
					{{item.name}}
				</view>

				<view class="btn">
					<view class="btn-white" @click="showSort=false">
						取 消
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 工种 -->
		<u-popup :show="showWorkerType" :round='18' closeable @close="showWorkerType=false">
			<view class="title">
				工种
			</view>
			<view style="max-height: 800rpx; overflow-y: auto; position: relative; padding-bottom: 120rpx;">
				<view :class="['worker_box',activeTypeName.includes(item.typeName)?'box_active':'']"
					v-for='(item,index) in workerTypeList' :key="index" @click="typeClick(item)">
					{{item.typeName}}
				</view>
				<view class="btn" style="width: 100%; position: fixed; bottom: 20rpx ; left: 0;">
					<view class="btn-white" @click="queryHandle('noType')">
						取消
					</view>
					<view class="btn-green" @click="queryHandle('type')">
						确认
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 工种 -->
		<u-popup :show="showArea" :round='18' closeable @close="showArea=false">
			<view class="title">
				位置区域
			</view>
			<view>
				<view class="area">
					<view style="height: 70vh;overflow: scroll;">
						<view :class="['area_left',activeProvinceIndex==index?'area_left_active':'']"
							v-for="(item,index) in province" :key='index' @click="areaClick(item,index,'p')">
							{{item.name}}<text v-if="item.num!=0"
								style="background: #EC5722;color: #fff;border-radius: 50rpx;font-size: 20rpx; padding: 0 8rpx;position: relative;top: -17rpx;">{{item.num}}</text>
						</view>
					</view>
					<view style="height: 70vh;overflow: scroll;">
						<view :class="['area_center',activeCityIndex==index1?'area_center_active':'']"
							v-for="(item1,index1) in city" :key='index1' @click="areaClick(item1,index1,'c')">
							{{item1.name}}
						</view>
					</view>

					<view style="height: 70vh;overflow: scroll;">
						<view :class="['area_right',item2.check?'area_right_active':'area_right_unactive']"
							v-for="(item2,index2) in area" :key='index2' @click="areaClick(item2,index2,'a')">
							{{item2.name}}
						</view>
					</view>

				</view>

				<view class="btn">
					<view class="btn-white" @click="queryHandle('resetArea')">
						重置
					</view>
					<view class="btn-green" @click="queryHandle('area')">
						确认
					</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import * as customer from '@/api/staging.js'
	import {
		getWorkers
	} from '@/api/staging.js'
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		data() {
			return {
				list1: ['推荐排序', '位置区域', '工种'],
				sortList: [{
						name: '推荐排序',
						value: '推荐'
					},
					{
						name: '星级最高',
						value: '星级'
					},
					{
						name: '完单最高',
						value: '完单'
					}
				],
				showPhone: false,
				showSort: false,
				showWorkerType: false,
				showArea: false,
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
				name: '',
				showModal: false,

				workerList: [],
				options2: [{
						slot: 'remove',
						text: '移除',
						style: {
							backgroundColor: 'transparent',
							padding: '0 10rpx'
						}
					}, {
						slot: 'disabled',
						text: '删除',
						style: {
							backgroundColor: 'transparent',
							padding: '0 10rpx'
						}
					},
					{
						slot: 'start',
						text: '启用',
						style: {
							backgroundColor: 'transparent',
							padding: '0'
						}
					}
				],
				info: {},
				currentTabIndex: 0,
				activeName: '推荐排序',
				activeTypeName: [],
				icon: '',
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					search: '',
					orderByColumn: '推荐'
				},
				workerTypeList: [],
				addressData: [],
				province: [],
				city: [],
				area: [],
				activeProvinceIndex: undefined,
				activeCityIndex: undefined,
				activeAreaIndex: undefined,
			};
		},
		onLoad() {
			this.getArea()
		},
		onShow() {
			this.getList()
		},
		methods: {
			getArea() {
				var that = this
				uni.request({
					url: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/6cfc99b225184b0eafbed58cd5c6ede5.json',
					method: 'GET',
					complete(res) {
						that.addressData = res.data
						that.province = that.addressData.map(it => it)
						that.province.forEach(item => {
							item.num = 0
						})
						console.log(that.province, '11111111111', that.addressData);

					}
				})
			},
			goInfo(item) {
				console.log(item);
				uni.navigateTo({
					url: 'workerInfo/workerInfo?info=' + JSON.stringify(item)
				})
			},
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				console.log(this.queryParams);
				uni.showLoading({
					mask: true
				});
				getWorkers(this.queryParams).then(res => {
					console.log(res)
					var reg = /^(\d{3})\d{4}(\d{4})$/;
					res.rows.forEach(item => {
						item.regPhone = item.workerPhone != null ? item.workerPhone.replace(reg,
							"$1****$2") : ''
					})
					uni.hideLoading()
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
			},
			showPhoneHandle(phone) {
				this.showPhone = true
				this.actionList[0].name = phone
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(this.actionList[0].name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(this.actionList[0].name, 'wx')
					// #endif
					this.showPhone = false
				}
			},

			removehandle(item) {
				this.info = item
				this.showModal = true
			},
			// confirmHandle() {
			// 	this.showModal = false
			// 	customer.removeWorker(this.info).then(res => {
			// 		uni.showToast({
			// 			title: '移除成功',
			// 			duration: 800
			// 		});
			// 		console.log(res);
			// 		this.getList()
			// 	})
			// },
			// handle(item, name) {
			// 	item.status = name == 'disabled' ? 1 : 0
			// 	customer.updateWorkerStatus(item).then(res => {
			// 		console.log(res);
			// 		uni.showToast({
			// 			title: name == 'disabled' ? '禁用成功' : '启用成功',
			// 			duration: 800
			// 		});
			// 		this.getList()
			// 	})
			// },
			queryList() {
				this.$refs.paging.reload();
			},
			//头部类别
			statusHandle(i) {
				if (i == 0) {
					this.showSort = true
				} else if (i == 2) {
					this.showWorkerType = true
					customer.getWorkersTypeList().then(res => {
						console.log(res);
						this.workerTypeList = res.rows
					})
				} else {
					this.showArea = true
					// if (this.addressData.length==0) {
					// 	this.getArea()
					// }
				}
				this.currentTabIndex = i

			},
			//排序类别
			sortClick(item) {
				this.activeName = item.name
				this.list1[0] = item.name
				this.showSort = false
				this.queryParams.orderByColumn = item.value
				this.$refs.paging.reload();
			},
			//升序降序
			sortIconClick(status) {
				this.queryParams.isAsc = status == '' ? '' : status == 'upac' ? 'desc' : 'asc'
				this.icon = status
				this.$refs.paging.reload();
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
					this.queryParams.typeList = this.activeTypeName
					this.showWorkerType = false
				} else if (t == 'noType') {
					this.queryParams.typeList = this.activeTypeName = []
					this.showWorkerType = false
				} else if (t == 'resetArea') {
					this.showArea = false
					this.activeProvinceIndex = this.activeCityIndex = this.activeAreaIndex = -1
					this.province = this.area = this.city = []
					this.queryParams.regionList = []
					this.getArea()
					// this.province.forEach(item=>{
					// 	item.num=0
					// })
					// this.addressData.forEach(yiji=>{

					// 	yiji.children.forEach(erji=>{
					// 		erji.children.forEach(sanji=>{
					// 			sanji.check=false
					// 		})
					// 	})
					// })

				} else {
					let arr = []
					this.addressData.forEach(yiji => {
						yiji.children.forEach(erji => {
							erji.children.forEach(sanji => {
								if (sanji.check) {
									let str = yiji.name + '/' + erji.name + '/' + sanji.name
									arr.push(str)
								}
							})
						})
					})
					console.log(arr);
					this.queryParams.regionList = arr
					this.showArea = false
				}
				this.$refs.paging.reload();
			},
			areaClick(item, i, type) {
				console.log(item);
				if (type == 'p') {
					this.activeProvinceIndex = i
					this.city = item.children
					this.area = []
					this.activeCityIndex = undefined
				} else if (type == 'c') {
					this.activeCityIndex = i

					this.area = item.children
				} else {
					this.activeAreaIndex = i
					if (!item.check) {
						console.log('22222222');
						console.log(this.addressData[this.activeProvinceIndex].num);
						this.addressData[this.activeProvinceIndex].num++
						this.$set(this.addressData[this.activeProvinceIndex].children[this.activeCityIndex].children[i],
							'check', true)

					} else {
						this.addressData[this.activeProvinceIndex].num--
						this.$set(this.addressData[this.activeProvinceIndex].children[this.activeCityIndex].children[i],
							'check', false)
					}

					console.log(this.addressData[this.activeProvinceIndex].children[this.activeCityIndex].children[i]);
				}
				console.log(this.city);

			}
		}
	}
</script>

<style lang="scss" scoped>
	.workers {
		.search {
			background: #fff;
			padding: 20rpx;

			.status {
				display: flex;
				margin-top: 20rpx;
				background: #F5F9FA;
				padding: 11rpx 11rpx;

				.box {
					padding: 11rpx 0rpx;
					flex: 1;
					color: #A5A7A7;
					justify-content: center;
					display: flex;
				}

				.active {
					background: #fff;
					color: #3D3F3E;
					font-weight: bold;
					border-radius: 7rpx;

				}

			}

		}

		.u-page {
			padding: 0;
		}

		.u-demo-block__title {
			padding: 10px 0 2px 15px;
		}

		::v-deep.u-swipe-action-item {
			border-radius: 20rpx;
			margin: 30rpx 10rpx;

			.u-swipe-action-item__right {
				color: #000 !important;
			}
		}

		::v-deep.u-border-bottom {
			border: none;
		}

		::v-deep.u-border-top {
			border: none;
		}

		.swipe-action {
			&__content {
				padding: 35rpx 0;
				display: flex;

				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					width: 60%;
				}

				&__text {
					font-size: 15px;
					color: $u-main-color;
					padding-left: 30rpx;
				}
			}

			.right {
				&-rule {
					text-align: center;
					margin-right: 30rpx;
					font-size: 28rpx;
					color: #999999;

					image {
						width: 44rpx;
						height: 40rpx;
						margin-bottom: 14rpx;
					}
				}
			}
		}

		.custom-action-item {
			.action-item {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

		}

		::v-deep.u-swipe-action-item {
			.u-swipe-action-item__content {
				border-radius: 14rpx;
			}
		}

		.forbidden,
		.normal {
			width: 72rpx;
			height: 38rpx;
			text-align: center;
			line-height: 38rpx;
			font-size: 20rpx;
		}

		.normal {
			background: #F0FBF5;
			border: 2rpx solid #72DAA4;
			color: #72DAA4;
		}

		.forbidden {
			color: #fff;
			background: #EC5722;
		}

		.sort {
			.sort_box {
				text-align: center;
				padding: 28rpx;
				font-size: 33rpx;
				border-bottom: 2rpx solid #F8F8F8;
			}






		}

		.title {
			font-size: 34rpx;
			color: #3D3F3E;
			margin: 28rpx 31rpx;
			font-weight: bold;

		}

		.worker_box {
			width: 692rpx;
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
			background: rgba(159, 214, 163, 0.2);
			border-radius: 7rpx;
			border: 2rpx solid #A4D091;
			color: #A4D091;
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
			border: 4rpx solid #A4D091;
			color: #A4D091;
		}

		.btn-green {
			background: #A4D091;
			color: #fff;
		}

		.btn {
			display: flex;
			justify-content: space-evenly;
			margin: 15rpx 0;

		}

		.area {
			height: 70vh;
			display: flex;

			.area_left,
			.area_center {
				width: 236rpx;
				height: 91rpx;
				text-align: center;
				line-height: 91rpx;
				color: #A5A7A7;
			}

			.area_left {

				position: relative;
				background-color: #F5F9FA;
			}

			.area_left_active {
				color: #3D3F3E;
				font-weight: bold;
				background: #FFFFFF;
			}

			.area_center {
				background-color: #fff;
			}

			.area_center_active {
				color: #A4D091;
				font-weight: bold;
				border-top: 2rpx solid #F8F8F8;
				border-bottom: 2rpx solid #F8F8F8;

			}

			.area_right_active {
				background: rgba(159, 214, 163, 0.2);
				border: 2rpx solid #A4D091;
				color: #A4D091;
			}

			.area_right_unactive {
				background: #FFFFFF;
				border: 2rpx solid #D8DCDB;
				color: #A5A7A7;
			}

			.area_right {
				width: 254rpx;
				padding: 20rpx 0;
				text-align: center;

				border-radius: 7rpx;

				margin-top: 10rpx;
			}
		}

	}
</style>