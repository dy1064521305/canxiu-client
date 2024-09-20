<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh="refresh">
			<view slot='top'>
				<view class="tip acea-row row-between-wrapper" v-show="tipShow">
					仅显示你所邀请及负责区域内且激活的门店信息！
					<text class="iconfont icon-wode-137" @click="tipShow=false"></text>
				</view>
				<view class="header">
					<view class="input">
						<u-search :showAction="false" placeholder="请输入门店名称" @clear='search' v-model="query.keyword"
							@search="search">
						</u-search>
					</view>
				</view>
				<view class="last" v-if="storeList.length">
					<div class="last-tit">最近操作门店</div>
					<div class="last-items">
						<view class="product">
							<view class="scroll-view_H" v-if="storeList.length==1">
								<view v-for="(item,index) in storeList"
									@click="$jump('/subpkg/staging/order/serve/select?id='+item.customerId)"
									:key="item.id" class="swiper-item">
									<view class="pro_list" :class="{'pro':storeList.length==1 }">
										<view style="display: flex;">
											<view style="display: flex;align-items:center">
												<view class="" v-if="item.storeImg">
													<image :src="item.storeImg">
													</image>
												</view>
												<image v-else src="../../../static/logo.png"></image>
											</view>
											<view class="flex-colum-between" style="padding: 4rpx 0;">
												<view class="">
													{{item.storeName||'暂无名称'}}
												</view>
												<view class="acea-row row-middle"
													style="font-size: 25rpx;color: #A5A7A7;margin-top: 14rpx;">
													{{item.storeType}}<text style="margin: 0 4rpx;"
														v-if="item.businessDistrict">|
													</text> {{item.businessDistrict}}
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<swiper class="scroll-view_H" v-else
								:next-margin="!(storeList.length==1 || currentIndex == storeList.length - 1) ? '100rpx' : '0rpx'"
								@change="changeIndex">
								<swiper-item v-for="(item,index) in storeList" :key="item.id"
									@click="$jump('/subpkg/staging/order/serve/select?id='+item.customerId)"
									class="swiper-item">
									<view class="pro_list"
										:class="{'pro':storeList.length==1 || index == storeList.length - 1}">
										<view style="display: flex;">
											<view style="display: flex;align-items:center">
												<view class="" v-if="item.storeImg">
													<image :src="item.storeImg">
													</image>
												</view>
												<image v-else src="../../../static/logo.png"></image>
											</view>
											<view class="flex-colum-between" style="padding: 4rpx 0;">
												<view class="">
													{{item.storeName}}
												</view>
												<view class="acea-row row-middle"
													style="font-size: 25rpx;color: #A5A7A7;margin-top: 14rpx;">
													{{item.storeType}}<text style="margin: 0 4rpx;"
														v-if="item.businessDistrict">|
													</text> {{item.businessDistrict}}
												</view>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</div>
				</view>
			</view>
			<view class="boxs" v-for="(item,i) in dataList" :key="i"
				@click="$jump('/subpkg/staging/order/serve/select?id='+item.customerId)">
				<view class="box_top">
					<view style="display: flex;">
						<view style="display: flex;align-items:center">
							<view class="" v-if="item.storeImg">
								<image :src="item.storeImg">
								</image>
							</view>
							<image v-else src="../../../static/logo.png"></image>
						</view>
						<view class="flex-colum-between" style="padding: 4rpx 0;">
							<view class="">
								{{item.storeName||'暂无门店名称'}}
							</view>
							<view class="acea-row row-middle"
								style="font-size: 25rpx;color: #A5A7A7;margin-top: 14rpx;">
								{{item.storeType||'暂无类型'}}<text style="margin: 0 4rpx;"
									v-if="item.businessDistrict&&item.businessDistrict!=null">|
								</text> {{item.businessDistrict}}
							</view>
						</view>
					</view>
				</view>
				<view class="box_main">
					<view class="">
						<view class="price">{{item.waitConfirmCount}}</view>
						<view class="title">待确认</view>
					</view>
					<view class="">
						<view class="price">{{item.grabOrderCount}}</view>
						<view class="title">待接单</view>
					</view>
					<view class="">
						<view class="price">{{item.waitAccCount}}</view>
						<view class="title">待验收</view>
					</view>
					<view class="">
						<view class="price">{{item.waitPayCount}}</view>
						<view class="title">待付款</view>
					</view>
				</view>
				<view class="box_bottom">
					<text style="color: #A5A7A7;" v-if="item.createTime">注册时间：{{item.createTime}}</text>
					<!-- <text style="color: #F40000;">*超过30日未登录</text> -->
				</view>
			</view>

		</z-paging>
	</view>
</template>

<script>
	import {
		getStoreList,
		getCustomerRecord
	} from '@/api/car.js'
	import $cache from '@/utils/cache.js';
	export default {
		data() {
			return {
				query: {
					pageSize: 10,
					pageNum: 1,
					clientId: $cache.get('ClientId'),
					keyword: '',
				},
				currentIndex: 0,
				storeList: [],
				dataList: [],
				tipShow: true
			}
		},
		onLoad() {
			this.getLastList()
		},
		methods: {
			getList(pageNo, pageSize) {
				this.query.pageNum = pageNo
				this.query.pageSize = pageSize
				getStoreList(this.query).then(res => {
					this.$refs.paging.completeByTotal(res.rows, res.total);

				})
			},
			getLastList() {
				getCustomerRecord($cache.get('ClientId')).then(res => {
					this.storeList = res.data.slice(0, 3)
				})
			},
			changeIndex(e) {
				this.currentIndex = e.detail.current;
			},
			search() {
				this.$refs.paging.reload();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		color: #212121;
		font-size: 28rpx;

		.tip {
			height: 72rpx;
			background: #FFFBF2;
			line-height: 72rpx;
			padding: 0 28rpx;
			font-size: 24rpx;
			color: #FF991C;
			border-bottom: 1rpx solid #f5f5f5;

			.iconfont {
				font-size: 24px;
			}
		}

		.header {
			width: 100%;
			box-sizing: border-box;
			background-color: #FFFFFF;
			padding: 10rpx 0 20rpx;

			.input {
				height: 56rpx;
				color: #333;
				margin: 10rpx 22rpx 0;
			}
		}

		.last {
			padding: 10rpx 24rpx 24rpx;
			background-color: #FFFFFF;

			&-tit {
				margin-bottom: 20rpx;
			}

			&-items {
				padding-bottom: 10rpx;

				.product {
					.scroll-view_H {
						width: 100%;
						// white-space: nowrap;
						height: 122rpx;

					}

					.swiper-item {
						width: 100%;

					}

					.pro_list {
						// height: 122rpx;
						padding: 22rpx;
						background: rgba(243, 178, 62, 0.08);
						align-items: center;
						width: 98%;
						border-radius: 16rpx;
						box-sizing: border-box;
						position: relative;

						&.pro {
							width: 100% !important;
						}

						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 20rpx;
							border-radius: 10rpx;
						}

						// .itemDianpu {
						// 	position: absolute;
						// 	top: 0;
						// 	left: 0;

						// 	image {
						// 		width: 24rpx;
						// 		height: 62rpx;
						// 		display: block;
						// 	}

						// 	text {
						// 		height: 45rpx;
						// 		background-color: #FF9216;
						// 		font-size: 22rpx;
						// 		color: #FFFFFF;
						// 		line-height: 44rpx;
						// 		text-align: center;
						// 		padding: 0 4rpx;
						// 	}
						// }
					}
				}

			}
		}

		.boxs {
			background: #FFFFFF;
			border-radius: 14rpx;
			margin: 20rpx 24rpx 0rpx;
			padding: 20rpx 30rpx;

			.box_top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 10rpx;
				}
			}


			.box_main {
				display: flex;
				justify-content: space-between;
				background: rgba(243, 178, 62, 0.08);
				border-radius: 7rpx;
				padding: 25rpx 32rpx;
				margin: 20rpx 0;
				text-align: center;

				.price {
					color: #303030;
				}

				.title {
					font-size: 25rpx;
					color: #A5A7A7;
					margin-top: 7rpx;
				}
			}

			.box_bottom {
				font-size: 25rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>