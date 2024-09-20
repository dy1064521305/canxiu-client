<template>
	<view class="pages">

		<!-- 邀请的门店 -->
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<view slot='top'>
				<view class="header">
					<!-- <input type="text" @confirm="queryList" @clear='queryList' v-model="where.searchValue"
						placeholder="品牌名称或联系人姓名" class="input"> -->
					<view class="input">
						<u-search :showAction="false" placeholder="搜索品牌名称" @clear='queryList' v-model="where.brandName"
							@search="queryList">
						</u-search>
					</view>

					<view class="input-s"></view></input>
					<view class="header-type">
						<view class="filter-row acea-row row-between-wrapper">
							<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
								:class="{on: where.approvalStatus === item.type}" @click="productSort(item.type)">
								{{item.label}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="invite_list">
				<view class="invite_list-it" v-for="item in dataList" :key="item.id">
					<view class="invite_list-it-top">
						<view class="acea-row row-between-wrapper">
							<view class="acea-row row-middle">
								<image :src="item.brandLog" mode=""></image>{{item.brandName||'暂无名称'}}
							</view>
							<text>{{item.approvalStatus==2?'已打款':item.approvalStatus==1?'转账中':item.approvalStatus==-1?'已作废':'待处理'}}</text>
						</view>
						<view class="yuany acea-row row-middle " v-if="item.approvalStatus==-1">
							原因:{{item.approvalRemark||'暂无'}}
						</view>
						<view class="acea-row row-middle row-between-wrapper" style="margin-top: 20rpx;	">
							<view class="prices">¥{{item.commission||0}}</view>
							<view class="details" @click="$jump('/subpkg/center/brand/footDetail?id='+item.id)">签约详情>
							</view>
						</view>
					</view>
					<view class="invite_list-it-bottom">
						<view>合同编号：{{item.contractNo||'-'}}</view>
						<text>签约时间：{{item.signTime||'-'}}</text>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		putQueryList,
		postVerifyBankCard,
		getSettlementRecordsList
	} from "@/api/brand.js"
	import {
		callPhone
	} from '@/utils/phone.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				dataList: [],
				searchTypes: [{
						type: '',
						label: '全部',
					},
					{
						type: 0,
						label: '待处理',
					},
					{
						type: 1,
						label: '转账中',
					},
					{
						type: 2,
						label: '已打款',
					},
					{
						type: -1,
						label: '已作废',
					}
				],
				scrollTop: 0,
				where: {
					userId: storage.get('ClientId'),
					brandName: "",
					// 发放状态；-1-已驳回，0-待处理，1-转账中，2已打款
					approvalStatus: "",
					pageNum: 1,
					pageSize: 10,
				},
			}
		},
		methods: {
			getList() {
				uni.showLoading({
					mask: true
				});
				getSettlementRecordsList(this.where).then(res => {
					uni.hideLoading();
					this.$refs.paging.completeByTotal(res.rows, res.total);
				}).catch(err => {
					uni.hideLoading();
				})
			},
			productSort(status) {
				this.where.approvalStatus = status;
				this.$refs.paging.reload();
			},
			queryList() {
				this.$refs.paging.reload();
				// this.getList()
			},


		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;
	}

	.two_change {
		font-family: PingFangSC, PingFang SC;
		font-weight: bold;
		font-size: 36rpx;
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
				bottom: -10rpx;
				left: 0;

			}
		}

		text:nth-last-child(1) {
			margin-right: 0rpx;
			margin-left: 15rpx;
		}
	}

	.header {
		width: 100%;
		box-sizing: border-box;

		background-color: #FFFFFF;
		// position: fixed;
		// top: 88rpx;
		// left: 0;
		// z-index: 10;

		.input {
			padding: 20rpx 30rpx 0;

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
				margin-top: 20rpx;
				border-top: 1rpx solid #ececec;
				padding: 0 30rpx;

				.filter-row-item {
					color: #969799;
					font-size: 28rpx;
					margin-right: 30rpx;

					&:last-of-type {
						margin-right: 0;
					}

					&.on {
						color: #323233;
						position: relative;

						&.on::after {
							content: "";
							position: absolute;
							height: 6rpx;
							background: #A4D091;
							border-radius: 3rpx;
							width: 100%;
							bottom: -24rpx;
							left: 0;

						}
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
		// margin: 270rpx 0 0 0;
		margin-top: 20rpx;
		padding: 0 30rpx 60rpx;


		.invite_list-it {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin-bottom: 20rpx;

			&-top {
				font-size: 28rpx;
				padding: 26rpx 22rpx 26rpx 22rpx;
				box-sizing: border-box;

				view {
					color: #999999;

					image {
						width: 64rpx;
						height: 64rpx;
						margin-right: 12rpx;
						border-radius: 10rpx;
					}
				}

				text {
					color: #404040;
				}

				.yuany {
					height: 72rpx;
					background: rgba(164, 208, 145, 0.16);
					color: #A4D091;
					padding: 0 32rpx;
					margin: 20rpx 0 0rpx;
					border-radius: 10rpx;
				}

				.prices {
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 48rpx;
					color: #212121;
					margin-top: 16rpx;
				}

				.details {
					color: #A4D091;
				}

			}

			&-bottom {
				// height: 164rpx;
				border-top: 1rpx solid #E5E5E5;
				font-size: 28rpx;
				color: #999999;
				padding: 22rpx;

				view {
					margin: 0rpx 0 8rpx;
				}
			}
		}


	}

	/deep/ .uni-input-placeholder {
		color: rgb(192, 196, 204);
		font-size: 24rpx;
	}

	.pop_show {
		width: 596rpx;
		height: 562rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		flex-direction: column;
		align-items: center;

		image {
			width: 160rpx;
			height: 160rpx;
			margin: 70rpx 0 16rpx 0;
		}

		&-mess {
			width: 504rpx;
			height: 80rpx;
			font-size: 28rpx;
			color: #666666;
			line-height: 40rpx;
			text-align: center;
		}

		&-btn {
			width: 524rpx;
			height: 88rpx;
			background: #A4D091;
			border-radius: 8rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			margin-top: 90rpx;
		}
	}
</style>