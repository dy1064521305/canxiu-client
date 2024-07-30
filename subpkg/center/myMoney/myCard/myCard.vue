<template>
	<view class="myCard">

		<z-paging ref="paging" v-model="bankCardList" @query="getList">

			<view slot='top'>
				<u-navbar :title="!type?'我的银行卡':'选择提现账户'" placeholder @leftClick="leftClick">
				</u-navbar>
			</view>
			<view v-for="(item,index) in bankCardList" :key='index' class="box" @click="choseCard(item)">
				<view
					style="padding: 40rpx 34rpx;display: flex;
    align-items: center;
    justify-content: space-between;">

					<view class="left">
						<view class="top">
							<view class="">
								<text style="font-size: 35rpx;font-weight: bold;">{{item.bankName||""}}</text>
								<text v-if='!type' style="margin-left: 20rpx;">{{item.cardTypeName||""}}</text>
								<text v-else>
									<text v-if="item.isSign==1" class="sign">已签约</text>
								</text>

							</view>
							<view v-if="item.isSign==0&&!type" @click.stop="deleteCardHandle(item.cardId)">
								<u-icon name="trash" size="28"></u-icon>
							</view>
						</view>
						<view class="">
							**** **** **** {{item.cardNumber.substr(-4)}}
						</view>
					</view>
					<view v-if="type" @click="choseCard(item)">
						<view v-if="item.cardId==bankId" class="moren">
							<image style="width: 32rpx;margin-right: 11rpx;height: 32rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
							</image>
						</view>
						<view v-else class="un">
							<view class="circle"></view>
						</view>
					</view>
				</view>
				<view class="qian" v-if="item.isSign&&!type">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/11/6752dc9a33a346a9910d341cd9e20691.png"
						mode=""></image>
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
				},
				type: '',
				bankId: ''
			};
		},
		onShow() {
			this.getList(1, 10)
		},
		onLoad(option) {
			console.log(option,'84444');
			if (option.info) {
				let info = JSON.parse(option.info)
				this.type = info.type
				this.bankId = info.bankId
				console.log(this.type);
			} 
		
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
			addCard() {
				uni.navigateTo({
					url: '../addCard/addCard'
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
					confirmColor: '#A4D091',
					success: function(res) {
						if (res.confirm) {
							card.deleteBankCard(id).then(res => {
								if (res.code === 200) {
									uni.showToast({
										title: '删除成功',
										duration: 80
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
				if (this.type == 'cash') {
					uni.navigateBack()
				} else {
					uni.navigateTo({
						url: '../myMoney'
					})
				}
				
				//uni.navigateBack()
			},
			//提现选择银行卡
			choseCard(item) {
				console.log(this.type,111111111);
				if (this.type != 'cash') {
					return
				} else {
					console.log(111111111);
					let pages = getCurrentPages()
					let prevPage = pages[pages.length - 2]
					prevPage.$vm.getCardInfo(item)
					uni.navigateBack()
				}


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
			background: #fff;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
	position: relative;
			// color: #fff;
			.qian {
				position: absolute;
				top: 0;
				right: 0;

				image {
					width: 87rpx;
					height: 87rpx;
				}
			}

			.left {
				width: 100%;
				.top {
					display: flex;
					align-items: flex-end;
					margin-bottom: 30rpx;
					justify-content: space-between;
					.sign {
						border-radius: 5rpx;
						padding: 0 8rpx;
						margin-left: 20rpx;
						background-color: #a5d092;
						color: #fff;
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
					margin-right: 11rpx;
				}
			}

		}


		.btn {
			width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 91rpx;
			margin: 50rpx auto;
		}
	}
</style>