<template>
	<view class="cashOutDetailed">
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<view slot='top'>
				<view class="titles-box">
					<view class="box" v-for="(item,index) in title" :key="index">{{item}}</view>
				</view>
			</view>

			<view v-for="(item,index) in dataList" :key="index" class="main"
				style="border-bottom: 2rpx solid  #F8F8F8;">
				<text class='box'  style="font-size: 25rpx;color: #A5A7A7;text-align: center;">{{item.askTime}}</text>
				<text class='box' >¥{{item.amount}}</text>
				<text class='box' >¥{{item.commission==null?0:item.commission}}</text>
				<text class='box' :style="{'color':item.status=='审核中'?'#EC5722':''}">{{item.status}}</text>
			</view>
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
					userType: 'c'

				}
			};
		},
		onLoad() {},
		methods: {
			getList(pageNo, pageSize) {
				this.query.pageNum = pageNo;
				this.query.pageSize = pageSize;
				this.query.userId = storage.get('ClientId'),
					getUserWithdrawal(this.query).then(res => {
						console.log(res);
						console.log(1111);
						this.$refs.paging.completeByTotal(res.rows, res.total);
						//this.info=res.data
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cashOutDetailed {

		.titles-box {
			display: flex;
			font-size: 31rpx;
			color: #3D3F3E;
			font-weight: bold;
			background: #fff;
			padding: 20rpx;
			.box{
				width: 40%;
				text-align: center;
			}
		}

		.main {
			display: flex;
			background-color: #fff;
			padding: 30rpx 20rpx;
			.box{
				width: 40%;
				display: inline-block;
				text-align: center;
				
			}
		}
	}
</style>
