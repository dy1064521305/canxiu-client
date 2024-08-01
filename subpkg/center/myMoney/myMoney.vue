<!-- <template>
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
						{{info.totalAmount}}
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
				// uni.navigateTo({
				// 	url: 'cashOut/cashOut'
				// })
				// return
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
</style> -->
<template>
	<view class="money">
		<Header listen-scroll :scroll-top="scrollTop" :offset-top="400" title="我的资产" no-blank>
			<template #back>
				<u-icon name="arrow-left" size="20" color="#fff" @click="$jump(-1)"></u-icon>
				<!-- <text class="iconfont icon-zuo" style="font-size: 42rpx;"></text> -->
			</template>
			<text style="font-size: 34rpx;">我的资产</text>
		</Header>
		<view class="money-image">
			<view class="money-image-name">总资产（元）</view>
			<view class="money-image-money acea-row row-between-wrapper">
				<text class="money-image-money-left">8852</text>
				<view class="money-image-money-right acea-row">
					<text @click="goCashOut">提现</text>
					<text @click="$jump('/subpkg/center/myMoney/invest/into')">去转入</text>
				</view>
			</view>
			<view class="money-image-name">可投资现金：¥20,000.00</view>
			<view class="money-image-type acea-row row-between-wrapper">
				<view class="money-image-type-item acea-row flex-colum-center">
					<text>投资余款</text>
					<view>11</view>
				</view>
				<view class="money-image-type-item  acea-row flex-colum-center">
					<text>本月消耗</text>
					<view>22</view>
				</view>
				<view class="money-image-type-item  acea-row flex-colum-center">
					<text>预计补贴</text>
					<view>33</view>
				</view>
			</view>
		</view>
		<view class="money-get acea-row">
			<view class="money-get-item acea-row row-column row-center">
				<text>累计收益（元）</text>
				<view>33</view>
			</view>
			<view class="money-get-item  acea-row row-column row-center">
				<text>待结算收益（元）</text>
				<view>33</view>
			</view>
			<view class="money-get-item acea-row row-column row-center">
				<text>累计活动奖励（元）</text>
				<view>33</view>
			</view>
			<view class="money-get-item acea-row row-column row-center">
				<text>推广累计收益（元）</text>
				<view>33</view>
			</view>
			<view class="money-get-item acea-row row-column row-center">
				<text>团队累计奖励（元）</text>
				<view>33</view>
			</view>
			<view class="money-get-item acea-row row-column row-center"
				@click="$jump('/subpkg/center/myMoney/invest/butie')">
				<text>资金补贴合计（元）</text>
				<view>33</view>
			</view>
		</view>
		<view class="setUp">
			<view class="setUp-list acea-row row-between-wrapper" @click="$jump(item.url)" v-for="(item) in typeList"
				:key="item.id">
				<view class="setUp-list-left">
					<image :src="item.img" :class="'img2-'+item.id" mode=""></image>
					<text>{{item.label}}</text>
				</view>
				<view class="setUp-list-right acea-row">
					<text v-if="item.look"
						style="color: #999;font-size: 28rpx;margin-right: 20rpx;margin-bottom: 6rpx;">
						{{item.look}}</text>
					<u-icon name="arrow-right" color="#959595" size="16"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/header/index.vue';
	import storage from '@/utils/storage'
	import {
		getUserWallet,
	} from '@/api/money.js'
	export default {
		components: {
			Header,
		},
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
				info: {},
				typeList: [{
						id: 0,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/19/e00d15c6bd304321891efa0812b0fc4d.png",
						label: "我的投资款",
						url: "/subpkg/center/myMoney/invest/account",
						look: "查看详情"
					},
					{
						id: 1,
						img: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/17/2ef64048d3f448478cad59a6da885884.png",
						label: "余额明细",
						url: "/subpkg/center/myMoney/invest/yue"
					},
					{
						id: 2,
						img: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/17/38ce513f4441405d8ef35da741a2bb4c.png",
						label: "提现记录",
						url: "/subpkg/center/myMoney/cashOutDetailed/cashOutDetailed"
					},
					{
						id: 3,
						img: "http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/17/d5861d8fa0714f9cb46e3d45956a4a28.png",
						label: "我的银行卡",
						url: "/subpkg/center/myMoney/myCard/myCard"
					},
				],
				scrollTop: 0
			};
		},
		onShow() {
			this.getList()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
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
				// uni.navigateTo({
				// 	url: 'cashOut/cashOut?amount=' + this.info.totalAmount
				// })
				uni.navigateTo({
					url: 'cashOut/cashOut'
				})
			},
			leftClick() {
				uni.switchTab({
					url: '/pages/center/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.money {
		color: #3D3F3E;

		&-image {
			// height: 528rpx;
			background: linear-gradient(180deg, #B3D9A3 0%, #A4D091 48%, #A4D091 100%);
			padding: 184rpx 0rpx 0;
			color: #FFFFFF;
			box-sizing: border-box;

			&-name {
				font-size: 28rpx;
				margin-left: 32rpx;
			}

			&-money {
				margin: 10rpx 16rpx 10rpx 28rpx;

				&-left {
					font-family: PingFangSC, PingFang SC;
					font-weight: bold;
					font-size: 64rpx;
				}

				&-right {
					font-size: 28rpx;

					text {
						display: block;
						width: 128rpx;
						height: 64rpx;
						text-align: center;
						line-height: 64rpx;
						background-color: #97BF85;
						border-radius: 10rpx;
					}

					text:nth-child(1) {
						background-color: #fff;
						color: #A4D091;
						margin-right: 20rpx;
					}
				}
			}

			&-type {
				height: 120rpx;
				background: rgba(0, 0, 0, 0.08);
				margin-top: 50rpx;

				&-item {
					width: 33%;

					text {
						font-size: 28rpx;
					}

					view {
						font-family: PingFangSC, PingFang SC;
						font-weight: bold;
						font-size: 32rpx;
						margin-top: 4rpx;
					}
				}
			}
		}

		&-get {
			background-color: #fff;

			&-item {
				width: 374rpx;
				height: 168rpx;
				// width: 50%;
				border-bottom: 1rpx solid #EBEDF0;
				border-right: 1rpx solid #EBEDF0;
				padding-left: 50rpx;
				box-sizing: border-box;

				text {
					font-size: 28rpx;
					color: #666666;
				}

				view {
					font-family: PingFangSC, PingFang SC;
					font-weight: bold;
					font-size: 40rpx;
					color: #212121;
					margin-top: 12rpx;
				}
			}

			&-item:nth-child(2n) {
				border-right: none;
			}

			&-item:nth-last-child(1) {
				border-bottom: none;
			}

			&-item:nth-last-child(2) {
				border-bottom: none;
			}
		}

		.cell-group .icon {
			width: 57rpx;
			height: 57rpx;
		}

		.box_style {
			padding: 23rpx 26rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
		}

		.myMoney {

			font-size: 25rpx;
			color: #A5A7A7;

			.top {
				border-bottom: 1rpx solid #E5E5E5;
				padding-bottom: 20rpx;
				font-size: 29rpx;
				color: #3D3F3E;
			}

			view:nth-child(2) {
				margin: 20rpx 0 15rpx;
			}

			view:nth-child(3),
			view:nth-child(4) {
				margin: 15rpx 0;
			}
		}

		.box {
			margin-top: 20rpx;
			color: #3D3F3E;

			.left {
				font-size: 38rpx;
				margin-top: 20rpx;
			}
		}

		.btn {
			width: 160rpx;
			height: 62rpx;
			background: #A4D091;
			border-radius: 31rpx;
			font-size: 29rpx;
			color: #fff;
			line-height: 62rpx;
			text-align: center;
		}

		.main {
			padding: 0 24rpx;
			// height: 286rpx;
			background: #EBDFC0;
			border-radius: 14rpx;

			.top {
				display: flex;
				padding: 28rpx 0;
				border-bottom: 2rpx solid #432E1A;

			}


			.bottom {
				display: flex;
				padding: 22rpx 14rpx;
				justify-content: space-between;

				.box {
					//width: 36%;

					view:first-child {
						margin-bottom: 14rpx;
					}
				}
			}

		}
	}

	.setUp {
		padding: 0 20rpx;
		background-color: #fff;
		border-radius: 14rpx;
		margin-top: 22rpx;

		&-list {
			height: 100rpx;
			border-bottom: 1rpx solid #ececec;

			&-left {
				display: flex;
				align-items: center;

				image {
					width: 58rpx;
					height: 58rpx;
				}

				text {
					font-size: 28rpx;
					color: #333333;
					margin-left: 14rpx;
				}
			}

			&-right {}
		}

		&-list:nth-last-child(1) {
			border-bottom: none;
		}
	}
</style>