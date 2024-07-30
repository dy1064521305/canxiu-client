<template>
	<view class="money">
		<u-navbar title="我的余额" placeholder @leftClick="$jump('pages/center/index')">
		</u-navbar>
		<view class="main">
			<view class="top">
				<view style="width: 10%;">
					<image style="width: 36rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/baaacef4cc9f4aecad3f6458f07d7fdf.png"
						mode="widthFix"></image>
				</view>
				<view style="width: 80%;">
					<view class="">
						账户余额(元)
					</view>
					<view style="margin-top: 14rpx;">
						{{info.balance}}
					</view>
				</view>
				<view class="btn" @click="goCashOut">
					去提现
				</view>
			</view>

			<view class="bottom">
				<view class="box">
					<view class="">
						冻结余额(元)
					</view>
					<view class="">
						{{info.freeze}}
					</view>
				</view>
				<view class="box">
					<view class="">
						可提现余额(元)
					</view>
					<view class="">
						{{info.withdrawal}}
					</view>
				</view>
				<view class="box">
					<view class="">
						累计提现(元)
					</view>
					<view class="">
						{{info.accumulate}}
					</view>
				</view>
			</view>
		</view>


		<u-cell-group :customStyle="custom_style" :border="false">
			<u-cell icon='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/27/dc53e0ded5c14a38ac5ff1dd1242656d.png'
				title="订单收支明细" isLink url="paymentsDetailed/paymentsDetailed" :titleStyle="title_style"></u-cell>
			<u-cell icon='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/27/a840b5bb5208411b9021e4f8ebee4dcd.png'
				title="提现记录" isLink url="cashOutDetailed/cashOutDetailed" :titleStyle="title_style"></u-cell>
			<u-cell icon='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/27/424e83c433034661aa3b8790d18d3f10.png'
				title="我的银行卡" isLink url="myCard/myCard" :titleStyle="title_style"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getUserWallet,
		getAsset,
		getListRetention
	} from '@/api/money.js'
	import {
		checkIsSign
	} from '@/api/bankCard.js'
	export default {
		data() {
			return {
				custom_style: {
					backgroundColor: '#fff',
					marginTop: '20rpx',


				},
				title_style: {
					color: '#3D3F3E',
					fontSize: '31rpx',
					height: '55rpx',
					lineHeight: '55rpx'
				},
				info: {}
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				getUserWallet({
					userId: storage.get('ClientId'),
					userType: 'c'
				}).then(res => {
					console.log(res);
					this.info = res.data
				})
			},
			goCashOut() {
				uni.navigateTo({
					url: 'cashOut/cashOut'
				})
				return
				this.getSignStatusHandle().then(res => {
					console.log(res, '<<<<====res');
					if (res) {
						uni.navigateTo({
							url: 'cashOut/cashOut'
						})
					} else {
						console.log('187777777');
						uni.navigateTo({
							url: '../../suiyoubao/suiyoubao'
						})
					}

				})

			},
			getSignStatusHandle() {
				let msg = ''
				return new Promise((r, j) => {
					checkIsSign({
						userId: storage.get('ClientId'),
					}).then(res => {
						console.log(res);
						r(res.data)
					})
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.money {

		color: #432E1A;
		font-weight: 600;
		padding: 20rpx;

		.main {
			padding: 0 24rpx;
			height: 286rpx;
			background: #EBDFC0;
			border-radius: 14rpx;

			.top {
				display: flex;
				padding: 28rpx 0;
				border-bottom: 2rpx solid #432E1A;

				.btn {
					width: 160rpx;
					height: 62rpx;
					background: #432E1A;
					border-radius: 31rpx;
					font-size: 29rpx;
					color: #EBDFC0;
					line-height: 62rpx;
					text-align: center;
				}
			}

			.bottom {
				display: flex;
				padding: 22rpx 12rpx;
				justify-content: space-evenly;

				.box {
					//width: 36%;

					view:first-child {
						margin-bottom: 14rpx;
					}
				}
			}

		}
	}
</style>