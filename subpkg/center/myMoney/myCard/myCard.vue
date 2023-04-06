<template>
	<view class="myCard">
		<z-paging ref="paging" v-model="bankCardList" @query="getList" >
			<view slot='top'>
				<u-navbar title="我的银行卡" placeholder @leftClick="leftClick">
				</u-navbar>
			</view>
			<view v-for="(item,index) in bankCardList" :key='index' class="box">
				<view style="padding: 40rpx 34rpx;">
					<view class="left">
						
					</view>
					<view class="right">
						<view class="top">
							<view class="">
								<text style="font-size: 35rpx;font-weight: bold;">{{item.bankName}}</text>
								<text style="margin-left: 20rpx;">{{item.cardTypeName}}</text>
							</view>
							<view @click="deleteCardHandle(item.cardId)">
								<u-icon name="trash" color="#fff" size="28"></u-icon>
							</view>
						</view>
						<view class="">
							**** **** **** {{item.cardNumber.slice(12, 16)}}
						</view>
					</view>
				</view>
			</view>
			<view slot="bottom">
				<view class="btn" @click="addCard">
					添加银行卡
				</view>
			</view>


		</z-paging>




	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import * as card from '@/api/bankCard.js'
	export default {
		data() {
			return {
				list: 1,
				bankCardList: [],
				queryParams: {
					pageSize: 10,
					pageNum: 1,
				}
			};
		},
		onShow() {
			this.getList(1, 10)
		},
		methods: {
			getList(pageNo, pageSize) {
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				this.queryParams.userId = storage.get('ClientId'),
					console.log(this.queryParams);
				card.getBankCardList(this.queryParams).then(res => {
					console.log(res);
					this.$refs.paging.completeByTotal(res.rows, res.total);
					//this.$refs.paging.complete(res.rows,res.total);
					//	this.bankCardList = res.rows
				})
			},
			addCard(){
				uni.navigateTo({
					url:'../addCard/addCard'
				})
			},
			//修改地址
			// editAndAddAddress(id) {
			// 	console.log(111);
			// 	uni.navigateTo({
			// 		url: '../addAddress/addAddress?id=' + id,
			// 		fail(res) {
			// 			console.log(res);
			// 		}
			// 	})
			// },
			//删除银行卡
			deleteCardHandle(id) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '是否删除此银行卡？',
					confirmColor: '#9FD6BA',
					success: function(res) {
						if (res.confirm) {
							card.deleteBankCard(id).then(res => {
								if (res.code === 200) {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									that.$refs.paging.reload();
								
								}
								console.log(res);
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			leftClick() {
				uni.switchTab({
					url: '/pages/center/index'
				})
			}

		}
	}
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.myCard {
		.box {
			margin: 20rpx auto;
			width: 707rpx;
			background:#62B6E5;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
			color: #fff;
			.right{
			
				.top{
				display: flex;
				align-items: flex-end;
				margin-bottom: 30rpx;
				justify-content: space-between;
			}

			}
			

		}
		
		
		.btn {
			width: 663rpx;
			height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 91rpx;
			margin: 50rpx auto;
		}
	}
</style>
