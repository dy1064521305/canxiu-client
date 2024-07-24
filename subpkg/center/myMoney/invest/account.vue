<template>
	<view class="pages">
		<view class="pages-top">
			<view class="acea-row row-between-wrapper">
				<text>投资款余额（元）</text>
				<view class="acea-row row-middle" style="color: #A4D091;" @click="accountShow=true">投资详情<u-icon
						style="margin: 4rpx 0 0 8rpx;" name="arrow-right" color="#A4D091" size="14"></u-icon></view>
			</view>
			<view class="pages-top-yue">4,0240.00</view>
			<view class="pages-top-type acea-row">
				<view class="pages-top-type-1 acea-row row-column row-center">
					<text>待支出费用（元）</text>
					<view>555</view>
				</view>
				<view class="pages-top-type-1 acea-row row-column row-center">
					<text>可转出金额（元）</text>
					<view>555</view>
				</view>
			</view>
			<view class="pages-top-btn acea-row row-between-wrapper">
				<view @click="$jump('/subpkg/center/myMoney/invest/out')">转出</view>
				<view @click="$jump('/subpkg/center/myMoney/invest/into')">转入</view>
			</view>
		</view>
		<view class="pages-bottom">
			<view class="pages-bottom-type acea-row row-column-around">
				<view class="pages-bottom-type-item" v-for="(item,index) in typeList"
					:class="{on:valueIndex==item.value}" @click="onchange(item.value)">
					{{item.label}}
				</view>
			</view>
			<view class="pages-bottom-list">
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
				<view class="pages-bottom-list-item acea-row row-column row-center">
					<view class=" pages-bottom-list-item-name acea-row row-between-wrapper">
						<text>运营增加个人投资款余额</text>
						<text>+5</text>
					</view>
					<view class="pages-bottom-list-item-time acea-row row-between-wrapper">
						<text>2024-12-12 12:12</text>
						<text>余额：0.22</text>
					</view>
				</view>
			</view>

		</view>
		<PopupBottom title="投资详情" :show="accountShow" @close="accountShow=false;" @confirm="confirmSelect">
			<view class="pages-money acea-row row-column row-center">
				<text>总投资款（元）</text>
				<view class="">20,000.00</view>
			</view>
			<view class="pages-money2 acea-row">
				<view class="pages-money2-items acea-row row-column row-center">
					<text>个人投资款（元）</text>
					<view class="">20,000.00</view>
				</view>
				<view class="pages-money2-items acea-row row-column row-center">
					<text>投资分红（元）</text>
					<view class="">20,000.00</view>
				</view>
				<view class="pages-money2-items acea-row row-column row-center">
					<text>公司投资款（元）</text>
					<view class="">20,000.00</view>
				</view>
				<view class="pages-money2-items acea-row row-column row-center">
					<text>资金补贴（元）</text>
					<view class="">20,000.00</view>
				</view>

			</view>
		</PopupBottom>
	</view>
</template>

<script>
	import PopupBottom from "@/components/popup/bottom.vue"
	export default {
		components: {
			PopupBottom
		},
		data() {
			return {
				accountShow: false,
				valueIndex: "",
				typeList: [{
						value: "",
						label: "全部"
					},
					{
						value: "1",
						label: "转入"
					},
					{
						value: "2",
						label: "转出"
					},
					{
						value: "3",
						label: "收益"
					},
					{
						value: "4",
						label: "支付"
					},
					{
						value: "5",
						label: "冻结"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			onchange(value) {
				this.valueIndex = value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;
		padding: 20rpx 20rpx 0;
		font-size: 28rpx;

		&-top {
			// height: 496rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			padding: 34rpx 30rpx 30rpx 42rpx;
			color: #212121;

			&-yue {
				font-family: PingFangSC, PingFang SC;
				font-weight: bold;
				font-size: 64rpx;
				color: #212121;
				margin: 10rpx 0 34rpx 0;
			}

			&-type {
				&-1 {
					width: 50%;

					text {
						color: #666666;
					}

					view {
						font-family: PingFangSC, PingFang SC;
						font-weight: bold;
						font-size: 40rpx;
					}
				}
			}

			&-btn {
				padding: 40rpx 4rpx 20rpx;

				view {
					width: 288rpx;
					height: 70rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					border: 1rpx solid #CCCCCC;
					font-family: PingFangSC, PingFang SC;
					font-weight: bold;
					font-size: 28rpx;
					line-height: 70rpx;
					text-align: center;
				}

				view:nth-child(2) {
					height: 72rpx;
					line-height: 72rpx;
					background: #A4D091;
					color: #FFFFFF;
					border: none;
				}
			}
		}

		&-bottom {
			background: #FFFFFF;
			border-radius: 16rpx;
			margin: 20rpx 0 0 0;

			&-type {
				height: 88rpx;
				text-align: center;
				line-height: 88rpx;
				border-bottom: 1rpx solid #E5E5E5;

				&-item {
					color: #404040;


					&.on {
						color: #A4D091;
						position: relative;
					}

					&.on::after {
						content: "";
						position: absolute;
						width: 56rpx;
						height: 4rpx;
						background: #A4D091;
						border-radius: 2rpx;
						bottom: 1rpx;
						left: 28%;
					}
				}
			}

			&-list {
				height: 660rpx;
				overflow-y: auto;
				padding-bottom: 20rpx;
				box-sizing: border-box;


				&-item {
					height: 144rpx;
					padding: 0 30rpx;
					border-bottom: 1rpx solid #F2F2F2;

					&-name {
						font-family: PingFangSC, PingFang SC;
						font-weight: bold;
						font-size: 30rpx;
						color: #212121;

						text:nth-child(2) {
							font-size: 28rpx;
						}
					}

					&-time {
						font-size: 28rpx;
						color: #999999;
						margin-top: 8rpx;
					}
				}

				&-item:nth-last-child(1) {
					border-bottom: none;
				}
			}
		}

		&-money {
			height: 172rpx;
			border-top: 1rpx solid #EBEDF0;
			border-bottom: 1rpx solid #EBEDF0;
			font-size: 28rpx;
			color: #666666;
			padding-left: 50rpx;

			view {
				font-family: PingFangSC, PingFang SC;
				font-weight: bold;
				font-size: 64rpx;
				color: #212121;
			}
		}

		&-money2 {
			&-items {
				height: 170rpx;
				width: 374rpx;
				border-right: 1rpx solid #EBEDF0;
				border-bottom: 1rpx solid #EBEDF0;
				font-size: 28rpx;
				color: #666666;
				padding-left: 50rpx;
				box-sizing: border-box;

				view {
					font-family: PingFangSC, PingFang SC;
					font-weight: bold;
					font-size: 40rpx;
					color: #212121;
					margin-top: 10rpx;
				}
			}

			&-items:nth-child(2n) {
				border-right: none;
			}

		}
	}
</style>