<template>
	<view class="page">
		<view class="coupon acea-row row-between-wrapper">
			<view class="coupon-type" v-for="(item) in type" :class="{on:item.status==onType}"
				@click="changeType(item.status)" :key="item.status">
				{{item.label}}
			</view>
		</view>
		<view class="coupons ">
			<view class="coupons-every" v-for="(item) in couponList" :key="item.id">
				<view class="coupons-every-one acea-row">
					<view class="coupons-every-one-left acea-row row-column justify-center ">
						<view class="coupons-every-one-left-name">
							{{item.name}}
						</view>
						<view class="coupons-every-one-left-time">
							{{item.couponTimeType=='0'?'长期有效':''}}
						</view>
						<view class="coupons-every-one-left-rule acea-row align-center"
							@click="item.activity=!item.activity">
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
							{{item.minAmount=='0'?'无门槛':''}}
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
						订单类型：仅{{item.orderType=='0'?'个人':item.orderType=='1'?'门店':'品牌'}}可用
					</view>
					<view>
						叠加规则：可与{{item.superpositionRule=='0'?'销售价':'活动价'}}叠加使用
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
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {getCouponList} from '@/api/user.js'
	export default {
		data() {
			return {
				couponList:[],
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
				list: [{
						id: 1,
						name: "优惠卷名字",
						coupon: 100,
						need: "无门槛",
						times: "2024-12-12 12:12到期",
						activity: false,
						types: {
							goods: "全场可以",
							range: "全国/仅浙江省-杭州市、江苏省地区可用",
							type: "仅商家订单可用",
							rule: "不能与活动价叠加使用",
							time: '2024-12-12 12:12:12',
							coup: "123456789"
						}
					},
					{
						id: 2,
						name: "优惠卷名字",
						coupon: 100,
						need: "无门槛",
						times: "2024-12-12 12:12到期",
						activity: false,
						types: {
							goods: "全场可以",
							range: "全国/仅浙江省-杭州市、江苏省地区可用",
							type: "仅商家订单可用",
							rule: "不能与活动价叠加使用",
							time: '2024-12-12 12:12:12',
							coup: "123456789"
						}
					},
					{

						id: 3,
						name: "优惠卷名字",
						coupon: 100,
						need: "无门槛",
						times: "2024-12-12 12:12到期",
						activity: false,
						types: {
							goods: "全场可以",
							range: "全国/仅浙江省-杭州市、江苏省地区可用",
							type: "仅商家订单可用",
							rule: "不能与活动价叠加使用",
							time: '2024-12-12 12:12:12',
							coup: "123456789"
						}
					}
				]
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				getCouponList({
					clientId:storage.get('ClientId'),
					useStatus:this.onType
				}).then(res=>{
					res.rows.forEach(item=>{
						item.activity=false
					})
					this.couponList=res.rows
				})
			},
			changeType(status) {
				this.onType = status
				this.getList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;

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