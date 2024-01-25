<template>
	<view class="invoicable">
		<z-paging ref="paging" v-model="orderList" @query="getList">
			<view v-for="(item,index) in orderList" :key='index' class="box">
				<view class="box-main" style="height: 100%;">
					<view style="display: flex;align-items: center;margin: 0 20rpx;">
						<view v-if="item.checked" @click="checkHandle(item,false)">
							<image style="width: 33rpx;height: 33rpx;margin-top: 8rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/12/6f382d27520e4c9382df591a76fe29ee.png">
							</image>
						</view>
						<view v-else class="un" @click="checkHandle(item,true)">
							<view class="circle"></view>
						</view>
					</view>
					<view class="right">
						<view style="font-size: 25rpx;color: #3D3F3E;">
							<text>{{item.orderTime}}</text>
						<!-- 	<text class="weixiu">维修</text> -->
						</view>
						<view style="font-size: 29rpx;color: #3D3F3E;font-weight: bold;">
							{{item.projectName}}
						</view>
						<view style="display: flex;font-size: 25rpx;color: #3D3F3E;justify-content: space-between;">
							<view class="">
								订单号：{{item.orderNumber}}
							</view>
							<view style="font-size: 33rpx;color: #3D3F3E;font-weight: bold;">
								¥{{item.orderPrice}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>





		<view class="bottom" :style="{bottom:(tabbarHeight*2-10)+'rpx'}">
			<view v-if="!allCheck" class="check" @click="allCheckHandle">

			</view>
			<view v-if="allCheck" @click="allCheckHandle">
				<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/12/6f382d27520e4c9382df591a76fe29ee.png"
					mode="widthFix"></image>
			</view>
			<text style="font-size: 29rpx;color: #3D3F3E;">全选</text>
			<text
				style="font-size: 22rpx;color: #A5A7A7;   width: 48%;text-align: end;margin-right: 10rpx;">{{checkList.length}}个订单，共¥{{totalMoney}}</text>
			<view class="btn" @click="next">下一步</view>
		</view>
	</view>
</template>
<script>
	import {
		getListOrder
	} from '@/api/invoice.js'
	import storage from '@/utils/storage'
	export default {
		name: 'test',
		components: {},
		mixins: [],
		props: {},
		data() {
			return {
				moren: 0,
				allCheck: false,
				isShow: false,
				maskHide: false,
				closeBtn: true,
				rangeType: true,
				tabbarHeight: 0,
				orderList: [], //订单列表
				queryParams: {
					pageSize: 10,
					pageNum: 1
				},
				allList: [],
				checkList: [],
				moneyTotal:0,//总钱数
			};
		},
		computed: {
			totalMoney: function() {
				let money = 0
				console.log(this.checkList);
				this.checkList.forEach(item => {
					money += Number(item.orderPrice)
				})
				this.moneyTotal=money
				return money
			}
		},
		onShow() {
			// #ifdef APP-PLUS
			this.tabbarHeight = uni.getSystemInfoSync().windowBottom
			console.log();
			// #endif
			// #ifdef H5
			this.tabbarHeight = uni.getSystemInfoSync().windowBottom
			console.log(uni.getSystemInfoSync().windowBottom);
			// #endif

		},
		methods: {
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				this.queryParams.clientId = storage.get('ClientId')
				//查询是否有地址
				getListOrder(this.queryParams).then(res => {
					console.log(res);
					res.rows.forEach(item => {
						item.checked = false
					})
					this.$refs.paging.completeByTotal(res.rows, res.total);
					this.allList = res.rows
				})
			},
			checkHandle(item, boo) {
				console.log(item);
				item.checked = boo
				let index = 0
				this.checkList.forEach((item, indexx) => {
					this.allList.forEach(itemm => {
						if (item.orderId == itemm.orderId) {
							index = indexx
						}
					})
				})
				boo ? this.checkList.push(item) : this.checkList.splice(index, 1)
				console.log(this.checkList);
				this.checkList.length == this.allList.length ? this.allCheck = true : this.allCheck = false
			},

			//全选
			allCheckHandle() {
				this.checkList = []
				this.allCheck = !this.allCheck
				if (this.allCheck) {
					this.allList.forEach(item => {
						item.checked = true
						this.checkList.push(item)
					})

				} else {
					this.allList.forEach(item => {
						item.checked = false
					})

				}

			},
			//下一步
			next() {
				
				if(this.checkList.length!=0){
					let query={
						list:this.checkList,
						money:this.moneyTotal
					}
					uni.navigateTo({
						url: '../drawBill/drawBill?query='+JSON.stringify(query)
					})
				}else{
					uni.showToast({
						title: '请选择订单',
						duration: 2000,
						icon:'none'
					});
				}
			},

		}
	};
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.invoicable {

		.box {
			margin: 20rpx auto;
			width: 707rpx;

			height: 178rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.box-main {
				display: flex;
				position: relative;

				.right {
					width: 86%;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;

					view:first-child {

						text:nth-child(2) {
							right: 0;
							position: absolute;
							width: 76rpx;
							height: 40rpx;
							line-height: 40rpx;

							border-radius: 7px 0px 0px 7px;
							text-align: center;
							font-size: 22rpx;
							color: #383C45;
						}

						.weibao {

							background: #E6F1EB;
						}

						.weixiu {
							background: #E1E9FC;
						}
					}
				}
			}

			.un,
			.moren {
				display: flex;
				font-size: 25rpx;
			}



			.moren {
				color: #A4D091;
			}

			.un {

				color: #A5A7A7;

				.circle {
					width: 29rpx;
					height: 29rpx;
					border: 1px solid #D8DCDB;
					border-radius: 50%;

				}
			}

		}




		.bottom {
			width: 100%;
			height: 100rpx;
			background: #fff;
			position: fixed;
			display: flex;
			align-items: center;
			padding: 10rpx 30rpx 20rpx 30rpx;

			image,
			.check {
				margin-top: 10rpx;
				margin-right: 14rpx;
			}

			image {
				width: 43rpx;
			}

			.check {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #D8DCDB;
				border-radius: 50%;
			}

			.btn {
				width: 199rpx;
				height: 69rpx;
				background: #A4D091 ;
				border-radius: 34rpx;
				font-size: 29rpx;
				color: #FFFFFF;
				line-height: 69rpx;
				text-align: center;
			}
		}

	}
</style>
