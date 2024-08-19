<template>
	<view class="pages">
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<view slot='top'>
				<Header type="dark" bgTop="#fff" listen-scroll :scroll-top="scrollTop" :offset-top="300" title=""
					no-blank>
					<template #back>
						<u-icon name="arrow-left" size="20" @click="$jump(-1)"></u-icon>
					</template>
					<view class="two_change" style="font-size: 32rpx;">
						我推广的品牌
					</view>
				</Header>

				<view class="header">
					<status-bar></status-bar>
					<!-- <input type="text" placeholder="品牌名称或联系人姓名" > -->
					<view class="input">
						<u-search :showAction="false" placeholder="品牌名称或联系人姓名" @clear='queryList'
							v-model="where.searchValue" @search="queryList">
						</u-search>
					</view>
					<view class="input-s"></view></input>
					<!-- <view class="header-type">
				<view class="filter-row acea-row row-between-wrapper">
					<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
						:class="{on: where.orderByColumn == item.label}" @click="productSort(item, index)">
						{{item.label}}
						<template v-if="item.auto" class="sort">
							<image v-if="(item.order_by!=1||item.order_by!=2) &&where.orderByColumn !=  item.label"
								class="twosort" :src="item.img0" mode="">
							</image>
							<view v-if="where.orderByColumn ==  item.label">
								<image v-if="item.order_by === 1" :src="item.img_top" mode="">
								</image>
								<image v-else-if="item.order_by ===2" class="bottomsort" :src="item.img_bottom" mode="">
								</image>
							</view>
						</template>
					</view>
				</view>
			</view> -->
				</view>
			</view>
			<!-- 邀请的门店 -->

			<view class="invite_list">
				<view class="invite_list-item" v-for="(item,index) in dataList" :key="index">
					<view class="invite_list-item-top acea-row row-between-wrapper">
						<view class="invite_list-item-top-left acea-row">
							<image :src="item.brandLog" mode=""></image>
							<view class="invite_list-item-top-left-title">
								<view class="invite_list-item-top-left-title-name">
									<view class="view">{{item.brandName}}</view>
									<view class="ping acea-row row-center row-middle" v-if="item.isGroup=='y'">集团品牌
									</view>
								</view>
								<text>联系人：{{item.personName}}</text>
								<!-- <text>工种信息：张</text> -->
							</view>
						</view>
						<!-- <view class="invite_list-item-top-right acea-row">待配置<u-icon name="arrow-right" color="#969799"
								size="14" style="margin-left: 6rpx;"></u-icon></view> -->
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
					<view class="invite_list-item-time acea-row">{{item.relationTime}} 关联
						<view class="invite_list-item-time-btn acea-row">
							<view @click="showPhoneHandle(item.personPhone)">联系ta</view>
							<view @click="$jump('/subpkg/center/brand/order?id='+item.customerId)">订单管理</view>
						</view>
					</view>
				</view>

				<!-- <empty-page v-if="!list.length" msg="暂无数据"></empty-page> -->
			</view>
		</z-paging>
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
	</view>
</template>

<script>
	import {
		putBrandManageList
	} from "@/api/brand.js"
	import Header from '@/components/header/index.vue';
	import storage from '@/utils/storage'
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		components: {
			Header,
		},
		data() {
			return {
				scrollTop: 0,
				dataList: [],
				showPhone: false,
				searchIndex: 0,
				searchTypes: [{
						label: '订单数',
						value: "orderNum",
						sort_by: 1,
						order_by: 1,
						auto: true,
						img0: "https://img.reduxingke.com/2023/09/12/5f0ac20230912104542960.png",
						img_top: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
						img_bottom: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
					},
					{
						label: '总成本',
						value: "totalCost",
						sort_by: 2,
						order_by: 1,
						auto: true,
						img0: "https://img.reduxingke.com/2023/09/12/5f0ac20230912104542960.png",
						img_top: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
						img_bottom: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
					},
					{
						label: '总利润',
						value: "totalProfit",
						sort_by: 3,
						order_by: 0,
						auto: true,
						img0: "https://img.reduxingke.com/2023/09/12/5f0ac20230912104542960.png",
						img_top: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
						img_bottom: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
					},
					{
						label: '平均利润率',
						value: "averageProfit",
						sort_by: 4,
						order_by: 0,
						auto: true,
						img0: "https://img.reduxingke.com/2023/09/12/5f0ac20230912104542960.png",
						img_top: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
						img_bottom: "https://img.reduxingke.com/2023/09/12/8de81202309121051427548.png",
					}
				],
				where: {
					searchValue: "",
					pageNum: 1,
					pageSize: 10,
					userId: storage.get('ClientId'),
					// orderByColumn: "",
					// isAsc: ""
				},
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
			}
		},
		onLoad() {},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			getList() {
				putBrandManageList(this.where).then(res => {
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
			},
			productSort(item, index) {
				console.log(item);
				if (item.order_by === 0) {
					this.searchTypes[index].order_by = 1
				} else if (item.order_by === 1) {
					this.searchTypes[index].order_by = 2
				} else if (item.order_by === 2) {
					this.searchTypes[index].order_by = 1
				}
				this.where.orderByColumn = item.label;
				this.where.isAsc = item.order_by
				this.getList()
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
			queryList() {
				this.$refs.paging.reload();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100vh;
	}

	.header {
		width: 100%;
		box-sizing: border-box;
		margin-top: 88rpx;
		background-color: #FFFFFF;
		padding-bottom: 30rpx;

		.input {
			height: 56rpx;
			color: #333;
			margin: 10rpx 22rpx 0;

			// &-s {
			// 	position: absolute;
			// 	top: 15rpx;
			// 	left: 40rpx;
			// 	width: 25rpx;
			// 	height: 25rpx;
			// 	background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;
			// 	background-size: 100% 100%;
			// }
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
					margin-right: 30rpx;

					&:last-of-type {
						margin-right: 0;
					}

					&.on {
						color: #FF7700;
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
			padding: 46rpx 0rpx 0;

			&-top {
				// height: 133rpx;
				padding: 0 20rpx;

				&-left {
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 14rpx;
						background-color: #F5F5F5;
					}

					&-title {
						font-size: 30rpx;
						color: #212121;
						font-weight: bold;
						margin-left: 20rpx;
						max-width: 360rpx;

						&-name {
							margin: -6rpx 0 10rpx 0;

							display: flex;

							.view {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.ping {
								width: 100rpx;
								background: #A4D091;
								padding: 0rpx 4rpx;
								font-size: 24rpx;
								color: #FFFFFF;
								border-radius: 6rpx;
								margin-left: 10rpx;
							}
						}

						text {
							font-weight: 400;
							display: block;
							font-size: 28rpx;
							color: #999999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}

				&-right {
					font-size: 28rpx;
					color: #969799;
				}
			}

			&-middle {
				height: 144rpx;
				background: #F5F5F5;
				border-radius: 8rpx;
				margin: 20rpx 20rpx 24rpx;

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

				&-btn {
					align-items: center;

					view {
						width: 140rpx;
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

	/deep/ .uni-input-placeholder {
		color: rgb(192, 196, 204);
		font-size: 28rpx;
	}
</style>