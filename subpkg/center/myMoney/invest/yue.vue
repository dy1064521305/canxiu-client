<template>
	<view class="pages">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>
				<view style='display: flex;margin: 24rpx 0 24rpx 20rpx;'>
					<view style='display: flex; '>
						<view class="select-left acea-row row-middle">
							<picker @change="dateChange" mode="date" fields="month" :value="where.date">
								<text class="select-left-time">{{showDate}}</text>
							</picker>
							<view style="margin-left: 10rpx;">
								<u-icon name="arrow-down-fill" size="10"></u-icon>
							</view>

						</view>
					</view>
				</view>
			</view>
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
					date: this.getCurrentMonth()
				},
				dataList: []
			}
		},
		onLoad() {

		},
		computed: {
			showDate() {
				const {
					date
				} = this.where
				return this.where.date.split('-')[0] + '年' + '-' + this.where.date.split('-')[1] + '月'
			},
		},
		methods: {
			getList(pageNo, pageSize) {
				this.where.pageNum = pageNo;
				this.where.pageSize = pageSize;
				this.where.userId = storage.get('userId'),
					getListPartnerWithdrawal(this.where).then(res => {
						console.log(res);
						console.log(1111);
						this.$refs.paging.completeByTotal(res.rows, res.total);
						//this.info=res.data
					})
			},
			dateChange(val) {
				this.where.date = val.detail.value
				this.query.registerDate = val.detail.value + '-01'
				this.$refs.paging.reload();
			},
			getCurrentMonth() {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				month = month > 9 ? month : '0' + month
				let day = date.getDate()
				return `${year}-${month}`
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;

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