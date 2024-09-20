<template>
	<view class="pages">

		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>
				<view class="header-type">
					<view class="filter-row acea-row row-between-wrapper">
						<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
							:class="{on: where.approvalStatus === item.type}" @click="productSort(item.type)">
							{{item.label}}
						</view>
					</view>
				</view>
			</view>
			<view class="pages-lists">
				<view class="box" v-for="(item,index) in dataList" :key="index">
					<view class="">
						<text style="color: #212121; ">
							<text>投资款转出</text>
						</text>
						<text>{{item.amount}}</text>
					</view>
					<view style="color: #999999; font-size: 24rpx;">
						<text>
							{{item.updateTime}}
						</text>
						<view class="acea-row row-middle" @click="oncancel(item.approvalStatus,item.approvalRemark)"
							:style="{'color':item.approvalStatus==1?'#A4D091':item.approvalStatus==2?'#E02020':'#F7B500'}">
							<text>{{item.approvalStatus==1?'审核通过':item.approvalStatus==2?'审核驳回':'待审核'}}</text>
							<u-icon v-if="item.approvalStatus==2" style="margin-left: 4rpx;" name="question-circle"
								color="#E02020" size="16"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		postWithdrawList
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				where: {
					pageSize: 10,
					pageNum: 1,
					approvalStatus: "",
					userId: storage.get('ClientId'),

				},
				dataList: [],
				searchTypes: [{
						type: '',
						label: '全部',

					},
					{
						type: 0,
						label: '待审核',

					},
					{
						type: 1,
						label: '审核通过',

					},
					{
						type: 2,
						label: '审核驳回',

					}
				],
			}
		},
		methods: {
			getList(pageNo, pageSize) {
				this.where.pageNum = pageNo;
				this.where.pageSize = pageSize;
				postWithdrawList(
					this.where
				).then(res => {
					this.$refs.paging.completeByTotal(res.rows, res.total);
					//this.info=res.data
				})
			},
			productSort(status) {
				this.where.approvalStatus = status;
				this.$refs.paging.reload();
			},
			oncancel(i, resoin) {
				if (i != 2) return
				this.$alert('驳回原因', 2, {
					content: resoin,
					confirmText: '我知道了',
				}).then((res) => {
					if (res.confirm) {
						return
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;

		.header-type {
			font-size: 26rpx;
			justify-content: space-between;

			.filter-row {
				box-sizing: border-box;
				height: 88rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
				padding: 0 60rpx;

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

		&-lists {
			background-color: #fff;

			.box {
				background-color: #fff;
				padding: 24rpx;
				border-bottom: 1rpx solid #F8F8F8;
				font-size: 28rpx;

				>view {
					display: flex;
					justify-content: space-between;

					>text:first-child {
						text {
							margin-right: 4rpx;
						}
					}
				}

				>view:nth-child(2) {
					margin-top: 10rpx;
				}
			}
		}
	}
</style>