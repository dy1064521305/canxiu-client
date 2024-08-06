<template>
	<view class="pages">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>
				<view style='display: flex;margin: 24rpx 0 24rpx 20rpx;'>
					<view style='display: flex; '>
						<view class="select-left acea-row row-middle">
							<picker @change="dateChange" mode="date" fields="month" :value="where.createDate">
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
							<text>{{item.detailName}}</text>
						</text>
						<text :style="{color:item.type==1?'#FA6400':'#A4D091'}"><text v-if="item.type==1">-</text> <text
								v-else>+</text>
							{{item.adjustAmount}}</text>

					</view>
					<view style="color: #999999; font-size: 24rpx;">
						<text>
							{{item.updateTime}}
						</text>
						<text>余额：¥{{item.balance}}</text>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		getBalanceDetail
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				where: {
					pageSize: 10,
					pageNum: 1,
					createDate: this.getCurrentMonth(),
					userId: storage.get('ClientId'),
				},
				dataList: []
			}
		},
		onLoad() {

		},
		computed: {
			showDate() {
				const {
					createDate
				} = this.where
				return this.where.createDate.split('-')[0] + '年' + '-' + this.where.createDate.split('-')[1] + '月'
			},
		},
		methods: {
			getList(pageNo, pageSize) {
				this.where.pageNum = pageNo;
				this.where.pageSize = pageSize;
				getBalanceDetail(this.where).then(res => {
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
			},
			dateChange(val) {
				this.where.createDate = val.detail.value + '-01'
				this.$refs.paging.reload();
			},
			getCurrentMonth() {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				month = month > 9 ? month : '0' + month
				let day = date.getDate()
				return `${year}-${month}` + '-01'
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;

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
					margin-top: 10rpx
				}
			}
		}
	}
</style>