<template>
	<view class="pages">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view class="pages-lists">
				<view class="box" v-for="(item,index) in dataList" :key="index">
					<view style="font-size: 28rpx;">
						<text style="color: #212121; ">
							<text>{{item.time}}资金补贴</text>
						</text>
						<text style="color:#A4D091 ;"> +￥{{item.capitalSubsidyAmount}}</text>

					</view>
					<view style="color: #969799; font-size: 24rpx;">
						<text>
							当月消耗: ￥{{item.investmentExpend}}
						</text>
						<text>{{item.recipientTime}} 到账</text>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		getSubsidyDetail
	} from '@/api/staging.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				where: {
					pageSize: 10,
					pageNum: 1,
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
				this.where.userId = storage.get('ClientId'),
					getSubsidyDetail(storage.get('ClientId'), this.where).then(res => {
						console.log(res);
						console.log(1111);
						res.rows.forEach(item => {
							let times = item.recipientTime.substring(0, 10)
							item.time = times.substring(0, 4) + '年' + times.substring(5, 7) + '月'
						})
						this.$refs.paging.completeByTotal(res.rows, res.total);
						//this.info=res.data
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;

		&-lists {
			// min-height: 80vh;
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