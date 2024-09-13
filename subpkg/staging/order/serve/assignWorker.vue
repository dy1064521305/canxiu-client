<template>
	<view class="page">

		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh="refresh">
			<view slot='top'>
				<u-navbar safeAreaInsetTop placeholder @leftClick='leftClick' title="选择师傅">

				</u-navbar>
				<view class="header">
					<view class="input">
						<u-search :showAction="false" placeholder="请输入师傅姓名或手机号" @clear='onchange'
							v-model="where.keyword" @search="onchange">
						</u-search>
					</view>
					<view class="header-type">
						<view class="filter-row acea-row row-middle">
							<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
								:class="{on: where.orderByColumn == item.value}" @click="productSort(item, index)">
								{{item.label}}
								<template v-if="item.auto" class="sort">
									<image
										v-if="(item.order_by!='asc'||item.order_by!='desc') &&where.orderByColumn !=  item.value"
										class="twosort" :src="item.img0" mode="">
									</image>
									<view v-if="where.orderByColumn ==  item.value">
										<image v-if="item.order_by ==='asc'" :src="item.img_top" mode="">
										</image>
										<image v-else-if="item.order_by ==='desc'" class="bottomsort"
											:src="item.img_bottom" mode="">
										</image>
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="invite_list">
				<view class="invite_list-item" v-for="(item,index) in dataList" :key="index">
					<view class="invite_list-item-top acea-row row-between-wrapper">
						<view class="invite_list-item-top-left acea-row  ">
							<view class="image">
								<image v-if="item.avatarUrl==null||item.avatarUrl==''||item.avatarUrl=='null'"
									src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/02/23d8137225a440f3a4e19e43d527cc32.png"
									mode=""></image>
								<image v-else :src="item.avatarUrl" mode=""></image>
								<view class="mark acea-row row-center-wrapper" v-if="item.isOnline=='N'">
									离线
								</view>
							</view>

							<view class="invite_list-item-top-left-title flex-colum-between">
								<view class="invite_list-item-top-left-title-name  acea-row row-middle">
									<view class="view line1">{{item.workerName||'暂无名称'}}</view>
									<view class="ping">
										<image
											src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/219172487b87402eb433e4f022f1f196.png"
											mode=""></image>
									</view>
								</view>
								<text>{{item.serviceAddress||'暂无'}}</text>
								<text style="max-width:400rpx; display:block;"
									class="line1">工种信息：{{item.workerTypes||'暂无'}}</text>
							</view>
						</view>
						<view class="invite_list-item-top-right acea-row row-middle">
							<view class="yuan acea-row" :class="{on:item.isOnline=='Y'}">
							</view>{{item.isOnline=='Y'?'在线':'离线'}}

						</view>
					</view>
					<view class="invite_list-item-middle acea-row row-between-wrapper">
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.orderCount||0}}
							</view>
							<text>服务次数</text>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.repairCount||0}}
							</view>
							<text>返修次数</text>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.technicalScore||0}}
							</view>
							<text>技能评分</text>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.attitudeScore||0}}
							</view>
							<text>态度评分</text>
						</view>
					</view>

					<view class="invite_list-item-time acea-row">{{item.createTime}}加入
						<view class="invite_list-item-time-btn acea-row" @click="toSelect(item.workerId)">

							<view :class="{on:iszhiList.includes(item.workerId)}">
								{{iszhiList.includes(item.workerId)?'已选择':'选择'}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view slot='bottom' class="bottom acea-row row-between-wrapper">
				仅显示自己所邀请注册的师傅信息
				<u-switch space="2" v-model="where.type" size="26" :activeValue="1" @change="onchange"
					:inactiveValue="0" activeColor="#f9ae3d" inactiveColor="rgb(230, 230, 230)">
				</u-switch>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		getWorkerList
	} from "@/api/car.js"
	import storage from '@/utils/storage'
	const img0 = "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/d7c54d6facf1417f85c6fd7f2153e498.png"
	const sortImg = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/72eb9cbdf6ba47a2bd0c40c22cd579ef.png'
	export default {
		data() {
			return {
				value: true,
				searchTypes: [{
						label: '服务次数',
						value: "orderCount",
						sort_by: 1,
						order_by: 0,
						auto: true,
						img0: img0,
						img_top: sortImg,
						img_bottom: sortImg,
					},
					{
						label: '技能评分',
						value: "technicalScore",
						sort_by: 2,
						order_by: 0,
						auto: true,
						img0: img0,
						img_top: sortImg,
						img_bottom: sortImg,
					},
					{
						label: '态度评分',
						value: "attitudeScore",
						sort_by: 3,
						order_by: 0,
						auto: true,
						img0: img0,
						img_top: sortImg,
						img_bottom: sortImg,
					},

				],
				where: {
					keyword: "",
					pageNum: 1,
					pageSize: 10,
					clientId: storage.get('ClientId'),
					type: 0,
					orderByColumn: "",
					isAsc: "",
					customerId: ""
				},
				dataList: [],
				iszhiList: []
			}
		},

		onLoad(options) {
			let info = JSON.parse(options.info)
			if (info.workerList) {
				this.iszhiList = info.workerList.map(item => item.workerId)
			}
			if (info.customerId) {
				this.where.customerId = info.customerId || ''
			}
		},
		onHide() {
			let arr = []
			this.dataList.forEach(item => {
				if (this.iszhiList.includes(item.workerId)) {
					arr.push(item)
				}
			})
			this.iszhiList = []
			storage.set('workerLists' + storage.get('ClientId'), arr)
			console.log("999离开了了11");
		},
		methods: {
			getList(pageNo, pageSize) {
				this.where.pageNum = pageNo;
				this.where.pageSize = pageSize;
				uni.showLoading({
					mask: true
				});
				getWorkerList(this.where).then(res => {
					uni.hideLoading();
					this.$refs.paging.completeByTotal(res.rows, res.total);
				}).finally(i => {
					uni.hideLoading();
				})
			},
			toSelect(id) {
				let bool = this.iszhiList.includes(id)
				if (bool) {
					console.log(id, this.iszhiList);
					let index = this.iszhiList.findIndex(item => {
						return item == id
					})
					this.iszhiList.splice(index, 1)
					console.log(index);
				} else {
					this.iszhiList.push(id)
				}
				console.log(this.iszhiList, "this.iszhiList");
				// this.$set(this.dataList, index, {
				// 	...this.dataList[index],
				// 	changeShow: !item.changeShow
				// })
				// // this.dataList[index].changeShow = !item.changeShow
				// console.log(this.dataList);
				// this.dataList.forEach(item => {
				// 	if (item.changeShow) {
				// 		this.selectWorker.push(item.)
				// 	}
				// })
			},
			leftClick() {
				console.log('hidehiade');
				// let arr = []
				// this.dataList.forEach(item => {
				// 	if (this.iszhiList.includes(item.workerId)) {
				// 		arr.push(item)
				// 	}
				// })
				let arr = []
				this.dataList.forEach(item => {
					if (this.iszhiList.includes(item.workerId)) {
						arr.push(item)
					}
				})

				this.iszhiList = []
				storage.set('workerLists' + storage.get('ClientId'), arr)
				this.$jump(-1)
				// this.iszhiList = []
				// const pages = uni.$u.pages()
				// pages[pages.length - 2].$vm.getWorkerlist(arr)
				// uni.navigateBack()
			},
			onchange(value) {
				console.log(value, '22');
				this.$refs.paging.reload()
			},
			productSort(item, index) {
				console.log(item);
				if (item.order_by === 0) {
					this.searchTypes[index].order_by = 'asc'
				} else if (item.order_by === 'asc') {
					this.searchTypes[index].order_by = 'desc'
				} else if (item.order_by === 'desc') {
					this.searchTypes[index].order_by = 'asc'
				}
				this.where.orderByColumn = item.value;
				this.where.isAsc = item.order_by
				this.$refs.paging.reload()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;

		.header {
			width: 100%;
			box-sizing: border-box;
			background-color: #FFFFFF;

			.input {
				height: 56rpx;
				color: #333;
				margin: 0rpx 22rpx 0;
			}

			&-type {
				font-size: 26rpx;
				justify-content: space-between;

				.filter-row {
					box-sizing: border-box;
					height: 88rpx;
					margin-top: 30rpx;
					border-top: 1rpx solid #ececec;
					padding: 0 30rpx;

					.filter-row-item {
						color: #3D3F3E;
						margin-right: 80rpx;

						&:last-of-type {
							margin-right: 0;
						}

						&.on {
							color: #000;
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
		}

		.invite_list {
			margin: 26rpx 0 0 0;
			padding: 0 30rpx 60rpx;

			&-item {
				// height: 362rpx;
				background: #FFFFFF;
				border-radius: 14rpx;
				margin-bottom: 22rpx;
				padding: 40rpx 0rpx 0;

				&-top {
					// height: 133rpx;
					padding: 0 50rpx 10rpx 20rpx;

					&-left {
						box-sizing: border-box;

						.image {
							width: 110rpx;
							height: 110rpx;
							border-radius: 14rpx;
							background-color: #fffef3;
							position: relative;

							image {
								width: 100%;
								border-radius: 14rpx;
								height: 100%;
							}

							.mark {
								width: 100%;
								height: 100%;
								position: absolute;
								bottom: 0;
								left: 0;
								background-color: rgba(0, 0, 0, 0.3);
								// background-color: #E5E5E5;
								color: #fffef3;
								font-size: 24rpx;
								border-radius: 16rpx;
							}
						}

						&-title {
							font-size: 30rpx;
							color: #212121;
							// font-weight: bold;
							margin-left: 20rpx;


							&-name {
								display: flex;

								.view {
									max-width: 310rpx;
								}

								.ping {
									width: 140rpx;
									height: 34rpx;
									margin-left: 10rpx;

									image {
										display: block;
										width: 100%;
										height: 100%;
									}
								}
							}

							text {
								font-weight: 400;
								display: block;
								font-size: 22rpx;
								color: #999999;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}

					&-right {
						font-size: 22rpx;
						color: #999999;

						.yuan {
							width: 18rpx;
							height: 18rpx;
							background-color: #999999;
							border-radius: 50%;
							color: #999999;
							margin-right: 10rpx;

							&.on {
								background-color: #A4D091;
								color: #A4D091;
							}
						}


					}
				}

				&-middle {
					height: 134rpx;
					background: #F5F5F5;
					border-radius: 8rpx 8rpx 0 0;
					margin: 20rpx 20rpx 0rpx;

					&-item {
						width: 25%;
						font-size: 25rpx;
						color: #A5A7A7;

						&-num {
							font-family: PingFangSC, PingFang SC;
							font-weight: 500;
							font-size: 29rpx;
							color: #A4D091;
							margin-bottom: 10rpx;
						}
					}
				}

				&-time {
					height: 100rpx;
					line-height: 100rpx;
					font-size: 28rpx;
					color: #999999;
					justify-content: space-between;
					padding: 0 20rpx;
					border-top: 1rpx solid #E5E5E5;
					margin-top: 24rpx;

					&-btn {
						align-items: center;

						view {
							width: 130rpx;
							height: 54rpx;
							background: #FFFFFF;
							border-radius: 16rpx;
							border: 2rpx solid #A4D091;
							color: #A4D091;
							font-size: 28rpx;
							display: flex;
							justify-content: center;
							align-items: center;

							&.on {
								background: #A4D091;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}

	/deep/ .uni-input-placeholder {
		color: rgb(192, 196, 204);
		font-size: 28rpx;
	}

	.bottom {
		padding: 24rpx 28rpx 36rpx;
		background: #212121;
		color: #fffef3;
	}
</style>