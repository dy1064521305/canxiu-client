<template>
	<view class="cashout-info">
		<view class="top">
			<img style="width: 120rpx;height: 120rpx;"
				src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/23/b9e50a4a0ad043eb871791448874e3f4.png">
			<view class="">
				余额提现至{{info.bankName||""}}（{{info.cardNumber&&info.cardNumber.substr(-4)}}）
			</view>
			<view class="money">
				{{info.amount}}
			</view>
		</view>
		<view class="line"></view>
		<view class="steps">
			<view class="step" v-for="(item,i) in stepsList" :key="i">
				<view class="left">
					<view :class="[item.isTrue?'circle-green':'circle-grey']"></view>
					<view v-if="i!=(stepsList.length-1)" :class="[item.isTrue?'line-green':'line-grey']"></view>
				</view>
				<view class="right">
					<view class="">
						{{item.content}}
					</view>
					<view class="">
						{{item.time}}
					</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="bottom">
			<view class="">
				<span>提现金额</span>
				<span>{{info.amount}}元</span>
			</view>
			<view class="">
				<span>服务费</span>
				<span style="text-decoration:line-through">{{info.commission}}元</span>
			</view>
			<view class="">
				<span>提现单号</span>
				<span>{{info.withdrawalId}}</span>
			</view>
		
			<view class="">
				<span>提现银行卡</span>
				<span>{{info.bankName||''}}（{{info.cardNumber&&info.cardNumber.substr(-4)}}）</span>
			</view>
			<view v-if="info.status=='已打款'&&info.receipt!=null">
				<span>回执单</span>
				<span style="color:#A4D091;"
					@click='goHuizhidan'>查看详情》</span>
			</view>
		</view>
		<view v-if="info.status=='待审核'"  class="btn" @click="showCancel=true">
			取消申请
		</view>

		<u-modal :show="showCancel" confirmColor='#A4D091' @cancel='showCancel=false' @confirm="cancelConfirm"
			title="提示" showCancelButton>
			<view class="slot-content" style="text-align: center;">
				确定取消申请？
			</view>

		</u-modal>

	<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		queryDetails,
		cancelWithdrawal
	} from '@/api/money.js'
	export default {
		data() {
			return {
				showCancel: false,
				id: undefined,
				info: {},
				receipt: [],
				type: '',
				isGet: false,
				stepsList: [{
					content: '发起提现',
					time: '',
					isTrue: true
				}]
			};
		},
		onLoad(option) {
			let infos = JSON.parse(option.info)
			this.id = infos.id
			this.getInfo()
		},
		methods: {
			getInfo() {
				queryDetails(this.id).then(res => {
					console.log(res);
					this.info = res.data
					this.stepsList[0].time = this.info.askTime
					if (this.info.status == '已驳回') {
						this.stepsList.push({
							content: '提现驳回',
							time: '驳回原因：' + this.info.rejectReason,
							isTrue: true
						})
					} else {
						this.stepsList.push({
							content: '银行处理中',
							time: '',
							isTrue: false
						}, {
							content: '到账',
							time: '',
							isTrue: false
						})
						if (this.info.approvalTime) {
							this.stepsList[1].time = this.info.approvalTime
							this.stepsList[1].isTrue = true
						}
						if (this.info.paymentTime) {
							this.stepsList[2].time = this.info.paymentTime
							this.stepsList[2].isTrue = true
						}
					}

				})
			},

			cancelConfirm() {
				cancelWithdrawal({
					withdrawalId:this.info.withdrawalId,
				}).then(res => {
					this.$refs.uToast.show({
						type:'success',
						message:'取消成功'
					});
					this.showCancel = false
					const pages = uni.$u.pages();
					const len = pages.length
					let prevPage = pages[len - 2]; //上一个页面
					setTimeout(() => {
						uni.navigateBack({
							success: () => {
								prevPage.$vm.getInfoHandle();
							}
						})
					}, 800)
				}).catch((err)=>{	
					this.showCancel = false
					setTimeout(() => {
						uni.navigateBack()
					}, 800)
				})
			},
			goHuizhidan(){
				uni.navigateTo({
					url:'huizhidan/huizhidan?info='+JSON.stringify(this.info)
				})
			}
		}
	}
</script>


<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.cashout-info {
		.top {
			text-align: center;

			img {
				margin: 40rpx 0;
			}

			.content {
				font-weight: 400;
				font-size: 32rpx;
				color: #212121;
			}

			.money {
				font-weight: bold;
				font-size: 48rpx;
				color: #212121;
				margin: 26rpx 0 22rpx;
			}
		}

		.line {
			margin: 0 70rpx;
			height: 1rpx;
			background: #E5E5E5;
		}

		.steps {
			margin: 47rpx 100rpx;

			.step {
				display: flex;

				.left {
					display: flex;
					flex-direction: column;
					align-items: center;

					.line-grey,
					.line-green {
						width: 2rpx;
						height: 112rpx;
						margin: 10rpx 0;
					}

					.line-grey {
						background: #E5E5E5;
					}

					.line-green {
						background: #A4D091;
					}


					.circle-green {
						width: 16rpx;
						height: 16rpx;
						background: #A4D091;
						border: 2rpx solid #A4D091;
						border-radius: 50%;
					}

					.circle-grey {
						width: 14rpx;
						height: 14rpx;
						background: #E5E5E5;
						border: 2rpx solid #979797;
						border-radius: 50%;
					}
				}

				.right {
					margin-top: -8rpx;
					margin-left: 20rpx;

					view:first-child {
						font-weight: 400;
						font-size: 28rpx;
						color: #212121;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						color: #999999;
						margin-top: 10rpx;
					}
				}
			}

		}

		.bottom {
			margin: 42rpx 63rpx;

			view {
				margin-bottom: 20rpx;

				span:first-child {
					display: inline-block;
					width: 171rpx;
					text-align: end;
					margin-right: 30rpx;
				}
			}
		}

		.btn {
			height: 85rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 85rpx;
			font-size: 36rpx;
			background: #A4D091;
			color: #fff;
			width: 35%;
			margin: 158rpx auto 0;
		}
	}
</style>