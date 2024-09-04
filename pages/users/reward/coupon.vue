<template>
	<view class="page">
		<view class="coupon acea-row row-between-wrapper">
			<view class="coupon-type" v-for="(item) in type" :class="{on:item.status==onType}"
				@click="changeType(item.status)" :key="item.status">
				{{item.label}}
			</view>
		</view>
		<view class="coupons">
			<view @click="getCoupon(item)" class="coupons-every" v-for="(item,i) in couponList" :key="item.id">

				<view class="coupons-every-one acea-row">
					<view v-if="choseInfo.type=='order'&&item.useStatus!=1&&item.useStatus!=2&&item.isGet"
						style="display: flex;align-items: center;margin-left: 16rpx;">
						<view v-if="choseInfo.couponId!=item.couponId" class="check"></view>
						<view v-else>
							<u-icon name="checkmark-circle-fill" color="#A4D091" size="23"></u-icon>
						</view>

					</view>
					<view class="coupons-every-one-left acea-row row-column justify-center ">
						<view class="coupons-every-one-left-name">
							{{item.name}}
						</view>
						<view class="coupons-every-one-left-time">
							{{item.couponTimeType=='0'?'长期有效':`${item.endTime}到期`}}
						</view>
						<view class="coupons-every-one-left-rule acea-row align-center"
							@click.stop="activeHandle(item,i)">
							使用规则
							<u-icon :name="!item.activity?'arrow-down':'arrow-up'" color="#A5A7A7"
								style="margin: 2rpx 0 0 5rpx;"></u-icon>
						</view>
					</view>
					<view class="coupons-every-one-right acea-row row-column align-center ">
						<view class="coupons-every-one-right-money">
							¥
							<text>{{item.couponAmount}}</text>
						</view>
						<view>
							{{item.minAmount=='0.00'?'无门槛':`满${item.minAmount}减${item.couponAmount}`}}
						</view>
					</view>
				</view>
				<view class="coupons-every-type" v-show="item.activity">
					<view>
						适用商品：{{item.suitableProduct=='0'?'全部产品':''}}
					</view>
					<view>
						使用范围：{{item.suitableScope=='0'?'不限区域':''}}
					</view>
					<view>
						订单类型：{{item.orderTypeName}}
					</view>
					<view>
						叠加规则：{{item.superpositionRuleName}}
					</view>
					<view>
						发放时间：{{item.startTime}}
					</view>
					<!-- <view>
						券码：{{item.types.coup}}
					</view> -->
				</view>
			</view>
			<empty-page v-if="!couponList.length" msg="暂无数据"></empty-page>

		</view>
		<view v-if="choseInfo.type=='order'&&onType!=1&&onType!=2" class="button" @click="choseOk">
			确定
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getCouponList
	} from '@/api/user.js'
	export default {
		data() {
			return {
				choseInfo: {},
				couponList: [],
				onType: 0,
				type: [{
						label: "未使用",
						status: 0
					},
					{
						label: "已使用",
						status: 1
					},
					{
						label: "已过期",
						status: 2
					},
				],

			}
		},
		onLoad(option) {

			if (JSON.stringify(option) != '{}') {
				this.choseInfo = JSON.parse(option.info)
			}
			this.getList()
		},
		methods: {
			getList() {
				getCouponList({
					clientId: storage.get('ClientId'),
					useStatus: this.onType
				}).then(res => {
					res.rows.forEach(item => {
						item.activity = false
						let arr = item.orderType.split(',')
						let arr1 = item.superpositionRule.split(',')
						// item.couponAmount=100
						item.isGet = Number(this.choseInfo.orderPrice) > Number(item.minAmount)
						item.orderTypeName =
							`${arr.includes('0')?'个人':''}${arr.includes('1')?'门店':''}${arr.includes('2')?'品牌':''}可用`
						item.superpositionRuleName =
							`可与${arr1.includes('0')?'销售价':''}${arr.includes('1')?'活动价':''}叠加使用`
					})
					this.couponList = res.rows
				})
			},
			changeType(status) {
				this.onType = status
				this.getList()
			},
			activeHandle(item, i) {
				this.$set(this.couponList[i], 'activity', !item.activity)
			},
			getCoupon(item) {
				if (item.couponId == this.choseInfo.couponId) {
					this.choseInfo = {
						type: 'order'
					}
				} else {
					this.choseInfo = {
						...item,
						type: 'order'
					}
				}


			},
			choseOk() {
				const pages = uni.$u.pages()
				pages[pages.length - 2].$vm.getCoupon(this.choseInfo)
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;

		.button {
			//width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 0 40rpx;

		}

		.coupon {
			height: 94rpx;
			line-height: 94rpx;
			background-color: #fff;

			&-type {
				font-size: 29rpx;
				color: #3D3F3E;
				padding: 0 76rpx;

				&.on {
					color: #3D3F3E;
					position: relative;
				}

				&.on::after {
					content: "";
					position: absolute;
					top: 84%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 58rpx;
					height: 7rpx;
					background: #3D3F3E;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border-radius: 4rpx;
				}
			}
		}

		.coupons {
			padding: 22rpx;
			height: 81vh;
			overflow: scroll;

			.check {
				width: 33rpx;
				height: 33rpx;
				border: 2rpx solid #A5A7A7;
				border-radius: 50%;
			}

			&-every {
				width: 100%;
				background: #FFFFFF;
				color: #A5A7A7;
				font-size: 26rpx;

				&-one {
					height: 219rpx;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border-radius: 14rpx;
					margin-bottom: 30rpx;

					&-left {
						flex: 1;
						padding-left: 44rpx;

						&-name {
							color: #3D3F3E;
							font-size: 44rpx;
						}

						&-time {
							margin: 14rpx 0;
						}
					}

					&-right {
						width: 248rpx;
						height: 100%;
						background: #FEF2F4;
						box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
						border-radius: 14rpx;
						color: #C5291C;
						font-size: 32rpx;

						&-money {
							margin-top: 40rpx;

							text {
								font-size: 65rpx;
								position: relative;
								top: 2rpx;
							}
						}
					}
				}

				&-type {
					padding: 0 36rpx 30rpx 44rpx;

					view {
						margin-bottom: 16rpx;
					}
				}
			}
		}
	}
</style>