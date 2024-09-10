<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh="refresh">
			<view slot='top'>
				<view class="header">
					<view class="input">
						<u-search :showAction="false" placeholder="请输入师傅姓名或手机号" @clear='queryList'
							v-model="where.searchValue" @search="queryList">
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
								<image v-if="item.brandLogo==null||item.brandLogo==''||item.brandLogo=='null'"
									src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/02/23d8137225a440f3a4e19e43d527cc32.png"
									mode=""></image>
								<image v-else="item.brandLogo" :src="item.brandLogo" mode=""></image>
								<view class="mark acea-row row-center-wrapper">
									离线
								</view>
							</view>

							<view class="invite_list-item-top-left-title flex-colum-between">
								<view class="invite_list-item-top-left-title-name  acea-row row-middle">
									<view class="view line1">{{item.brandName||'暂无名称'}}</view>
									<!-- 	<view class="ping acea-row row-center row-middle" v-if="item.isGroup=='y'">集团品牌
									</view> -->
									<view class="ping">
										<image
											src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/219172487b87402eb433e4f022f1f196.png"
											mode=""></image>
									</view>
								</view>
								<text>{{item.region||'暂无区域信息'}}</text>
								<text>工种信息：张</text>
							</view>
						</view>
						<view class="invite_list-item-top-right acea-row">
							<!-- <text class="iconfont icon-yuanxingweixuanzhong"></text> -->
							<text class="iconfont icon-selectfill" style="font-size: 36rpx;"></text>
						</view>
					</view>
					<view class="invite_list-item-middle acea-row row-between-wrapper">
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.orderNum||0}}
							</view>
							<text>订单数</text>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.totalCost||0}}
							</view>
							<text>总成本</text>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.totalProfit||0}}
							</view>
							<text>总利润</text>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<view class="invite_list-item-middle-item-num">
								{{item.averageProfit||0}}%
							</view>
							<text>平均利润率</text>
						</view>
					</view>

					<view class="invite_list-item-time acea-row">{{item.relationTime}}加入
						<view class="invite_list-item-time-btn acea-row">
							<view @click="showPhoneHandle(item.personPhone)">联系ta</view>
							<view>服务记录</view>
						</view>
					</view>
				</view>
			</view>
			<view slot='bottom' class="bottom acea-row row-between-wrapper">
				仅显示自己所邀请注册的师傅信息
				<u-switch space="2" v-model="value" size="26" activeColor="#f9ae3d" inactiveColor="rgb(230, 230, 230)">
				</u-switch>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		putBrandManageList
	} from "@/api/brand.js"
	import storage from '@/utils/storage'
	const img0 = "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/d7c54d6facf1417f85c6fd7f2153e498.png"
	const sortImg = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/72eb9cbdf6ba47a2bd0c40c22cd579ef.png'
	export default {
		data() {
			return {
				value: true,
				searchTypes: [{
						label: '完成服务',
						value: "orderNum",
						sort_by: 1,
						order_by: 0,
						auto: true,
						img0: img0,
						img_top: sortImg,
						img_bottom: sortImg,
					},
					{
						label: '履约率',
						value: "totalCost",
						sort_by: 2,
						order_by: 0,
						auto: true,
						img0: img0,
						img_top: sortImg,
						img_bottom: sortImg,
					},
					{
						label: '返修率',
						value: "totalProfit",
						sort_by: 3,
						order_by: 0,
						auto: true,
						img0: img0,
						img_top: sortImg,
						img_bottom: sortImg,
					},

				],
				where: {
					searchValue: "",
					pageNum: 1,
					pageSize: 10,
					userId: storage.get('ClientId'),
					queryType: 0,
					orderByColumn: "",
					isAsc: ""
				},
				dataList: []
			}
		},
		onLoad() {

		},
		methods: {
			getList(pageNo, pageSize) {
				this.where.pageNum = pageNo;
				this.where.pageSize = pageSize;
				uni.showLoading({
					mask: true
				});
				putBrandManageList(this.where).then(res => {
					uni.hideLoading();
					this.$refs.paging.completeByTotal(res.rows, res.total);
				}).finally(i => {
					uni.hideLoading();
				})
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
						font-size: 28rpx;
						color: $pageBorder;
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
						}


						view:nth-last-child(1) {
							background: #A4D091;
							color: #FFFFFF;
							margin-left: 14rpx;
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