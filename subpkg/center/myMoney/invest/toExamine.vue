<template>
	<view class="pages">
		<view slot='top'>
			<view class="header-type">
				<view class="filter-row acea-row row-between-wrapper">
					<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
						:class="{on: where.reviewStatus === item.type}" @click="productSort(item.type)">
						{{item.label}}
					</view>
				</view>
			</view>
		</view>
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view class="pages-lists">
				<view class="box" v-for="(item,index) in dataList" :key="index">
					<view class="">
						<text style="color: #212121; ">
							<text>提现至-{{item.bankName}}</text>
							（{{item.cardNumber}}）
						</text>
						<text
							:style="{'color':item.status=='待审核'||item.status=='审核通过'?'#F3B133':item.status=='已驳回'?'#EC5722':'#A4D091'}">{{item.status=='待审核'||item.status=='审核通过'?'审核中':item.status=='已驳回'?'提现失败':'提现成功'}}</text>

					</view>
					<view style="color: #999999; font-size: 24rpx;">
						<text>
							{{item.askTime}}
						</text>
						<text>余额：¥{{item.amount}}</text>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		getListPartnerWithdrawal
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				where: {
					brandName: "",
					orderNumber: "",
					code: "",
					pageSize: 10,
					pageNum: 1,
					reviewStatus: ""
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
						type: -1,
						label: '审核驳回',

					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			getList(pageNo, pageSize) {
				this.where.pageNum = pageNo;
				this.where.pageSize = pageSize;
				this.where.userId = storage.get('ClientId'),
					getListPartnerWithdrawal(this.where).then(res => {
						console.log(res);
						console.log(1111);
						this.$refs.paging.completeByTotal(res.rows, res.total);
						//this.info=res.data
					})
			},
			productSort(status) {
				this.where.reviewStatus = status;
				this.$refs.paging.reload();
			},
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

		&-lists {
			min-height: 80vh;
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