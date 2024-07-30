<template>
	<view class="cashOutDetailed">
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<!-- 	<view slot='top'>
				<view class="titles-box">
					<view class="box" v-for="(item,index) in title" :key="index">{{item}}</view>
				</view>
			</view> -->
			<view class="box" v-for="(item,index) in dataList" :key="index" @click="goInfo(item.withdrawalId)">
				<view class="">
					<text>
						提现至-{{item.bankName||''}}({{item.cardNumber.substr(-4)}})
					</text>
					<text style="font-weight: bold;">¥{{item.amount}}</text>
				</view>
				<view class="">
					<text>
						{{item.askTime}}
					</text>
					<text
						:style="{'color':item.status=='待审核'||item.status=='审核通过'?'#F3B133':item.status=='已驳回'?'#EC5722':'#A4D091'}">
						{{item.status=='已打款'?'已到账':item.status=='已驳回'?'审核驳回':item.status=='审核通过'?'银行处理中':item.status}}
					</text>

				</view>
			</view>

			<!-- 	<view class="main" style="border-bottom: 2rpx solid  #F8F8F8;">
				<text class='box' style="font-size: 25rpx;color: #A5A7A7;text-align: center;">{{item.askTime}}</text>
				<text class='box'>¥{{item.amount}}</text>
				<text class='box'>¥{{item.commission==null?0:item.commission}}</text>
				<text class='box' :style="{'color':item.status=='待审核'?'#EC5722':''}">{{item.status}}</text>
			</view> -->
		</z-paging>
	</view>
</template>

<script>
	import {
		getUserWithdrawal
	} from '@/api/money.js'
	import storage from '@/utils/storage'
	export default {
		data() {
			return {
				title: ['申请时间', '提现金额', '手续费', '状态'],
				dataList: [],
				query: {
					pageSize: 10,
					pageNum: 1,
					userId: '',
					userType: 'w'

				}
			};
		},
		onLoad() {},
		methods: {
			getInfoHandle() {
				this.getList(1, 10)
			},
			getList(pageNo, pageSize) {
				this.query.pageNum = pageNo;
				this.query.pageSize = pageSize;
				this.query.userId = storage.get('ClientId'),
					getUserWithdrawal(this.query).then(res => {
						this.$refs.paging.completeByTotal(res.rows, res.total);
						//this.info=res.data
					})
			},
			//账单详情
			goInfo(id) {
				console.log(1111111111);
				let info = {
					type: 'cashOut',
					id: id
				}
				uni.navigateTo({
					url: '../paymentInfo/paymentInfo?info=' + JSON.stringify(info)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cashOutDetailed {

		// .titles-box {
		// 	display: flex;
		// 	font-size: 31rpx;
		// 	color: #3D3F3E;
		// 	font-weight: bold;
		// 	background: #fff;
		// 	padding: 20rpx;
		// 	.box{
		// 		width: 40%;
		// 		text-align: center;
		// 	}
		// }

		// .main {
		// 	display: flex;
		// 	background-color: #fff;
		// 	padding: 30rpx 20rpx;
		// 	.box{
		// 		width: 40%;
		// 		display: inline-block;
		// 		text-align: center;

		// 	}
		// }
		.box {
			background-color: #fff;
			padding: 28rpx;
			border-bottom: 2rpx solid #F8F8F8;
			font-size: 31rpx;

			>view {
				display: flex;
				justify-content: space-between;

				>text:first-child {
					text {
						margin-right: 10rpx;
						font-weight: bold;
					}
				}
			}

			>view:nth-child(2) {
				margin-top: 10rpx;
			}
		}
	}
</style>