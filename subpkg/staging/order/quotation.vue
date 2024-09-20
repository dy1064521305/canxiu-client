<template>
	<view class="page">
		<view class="store">
			<view class="store-top acea-row">
				<image v-if="info.storeImg==null||info.storeImg==''||info.storeImg=='null'"
					src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/02/23d8137225a440f3a4e19e43d527cc32.png">
				</image>
				<image v-else :src="info.storeImg" mode=""></image>
				<view class="store-top-name flex-colum-between">
					<view class="line1">{{info.storeName}}</view>
					<text>{{info.storeType}} ｜{{info.businessDistrict}}</text>
				</view>
			</view>
			<view class="store-con">
				<view class="acea-row row-between-wrapper">
					<text>期望上门时间</text>
					<text>{{info.expectTime}}</text>
				</view>
				<view class="acea-row row-between-wrapper">
					<text>是否加急单</text>
					<text>{{info.isUrgent==0?'不加急':'加急'}}</text>
				</view>
				<view class="acea-row row-between-wrapper">
					<text>服务类型</text>
					<text>{{info.orderType==1?'维保':'维修'}}</text>
				</view>
			</view>
		</view>
		<view class="bg"></view>
		<view class="bill">
			<view class="bill-con">
				<view class="bill-con-name acea-row row-middle">
					<view class="acea-row row-middle">
						<view class="view"></view>账单信息
					</view>
				</view>
				<view class="bill-con-tent">
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>维修服务项 <text>（共2项）</text></view>
						<text class="red"> <text class="red" style="font-size: 20rpx;">¥</text>120</text>
					</view>
					<view class="bill-con-tent-more">
						<view class="acea-row row-between-wrapper">
							<text>服务项名称</text><text>服务起步价</text>
						</view>
						<view class="acea-row row-between-wrapper" v-for="(item) in info.projectDataVoList">
							<text>{{item.projectName}}</text><text>200元</text>
						</view>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>材料费 <text>（共{{info.materialCount}}件）</text></view>
						<text class="red"> <text class="red"
								style="font-size: 20rpx;">¥</text>{{info.materialPrice}}</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>配件费 <text>（共{{info.partsCount}}项）</text></view>
						<text> <text style="font-size: 20rpx;">¥</text>{{info.partsPrice}}</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>其他费用 <text>（共{{info.standardCount}}件）</text></view>
						<text class="red"> <text class="red"
								style="font-size: 20rpx;">¥</text>{{info.standardPrice}}</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>优惠券 <text>（共0件）</text></view>
						<text class="red"> <text class="red"
								style="font-size: 20rpx;">¥</text>{{info.couponDiscountPrice||0}}</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>品牌折扣 <text>（当前折扣：{{info.favorableDiscount||0}}%）</text></view>
						<text class="red"> <text class="red"
								style="font-size: 20rpx;">¥</text>{{info.favorablePrice||0}}</text>
					</view>
				</view>
				<view class="bill-con-price ">
					<view class="bill-con-price-all acea-row row-right row-bottom">费用合计：<view
							class="acea-row row-bottom">
							<view style="font-size: 36rpx; color: #FD5834;">¥</view>
							<text>{{info.orderPrice}}</text>
						</view>
					</view>
					<view class="bill-con-price-jian ">
						优惠减免：-<text style="font-size: 22rpx;">¥</text> {{info.couponDiscountPrice||0}}
					</view>
				</view>
			</view>
			<view class="bill-con" v-if="info.projectDataVoList">
				<view class="bill-con-name acea-row row-middle row-between-wrapper">
					<view class="acea-row row-middle">
						<view class="view"></view>
						服务项（{{info.projectDataVoList.length}}）
					</view>
					<view class="acea-row row-middle">合计：<view class="price"><text style="font-size: 22rpx;">¥</text>
							{{info.preferentialPrice}}
						</view>
					</view>
				</view>
				<view class="bill-con-list">
					<view class="bill-con-list-items acea-row" v-for="(item,index) in info.projectDataVoList"
						:key="index">
						<image :src="item.projectImg" mode=""></image>
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name">{{item.projectName}}</view>
							<view class="hui line2">服务说明：{{item.illustrate}}</view>
							<view class="acea-row row-between-wrapper">
								维修服务费x{{item.projectNumber}}
								<view>小计：<text class="red"><text style="font-size: 22rpx;">¥</text>
										{{Number(item.discountPrice)*Number(item.projectNumber)}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bill-con" v-if="info.workerPartsVoList.length">
				<view class="bill-con-name acea-row row-middle row-between-wrapper">
					<view class="acea-row row-middle">
						<view class="view"></view>
						配件材料（{{info.partsCount}}）
					</view>
					<view class="acea-row row-middle">合计：<view class="price"><text style="font-size: 22rpx;">¥</text>
							{{info.partsPrice}}
						</view>
					</view>
				</view>
				<view class="bill-con-list">
					<view class="bill-con-list-items acea-row" v-for="(item,index) in info.workerPartsVoList"
						:key="index">
						<image :src="item.partsImg" mode=""></image>
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name">{{item.partsName}}</view>
							<view class="hui line2">{{item.partsSpecs}}</view>
							<view class="acea-row row-between-wrapper">
								维修服务费x{{item.partsCount}}
								<view>小计：<text class="red"><text style="font-size: 22rpx;">¥</text>
										{{item.partsPrice}}</text> 金额
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 	<view class="bill-con-bottom acea-row row-between-wrapper">
					<view class="btn">全部移除</view>
					<view class="btn">添加费用项</view>
				</view> -->
			</view>
			<view class="bill-con" v-if="info.standardVoList.length">
				<view class="bill-con-name acea-row row-middle row-between-wrapper">
					<view class="acea-row row-middle">
						<view class="view"></view>
						其他费用（{{info.standardCount}}）
					</view>
					<view class="acea-row row-middle">合计：<view class="price"><text style="font-size: 22rpx;">¥</text>
							{{info.standardPrice}}
						</view>
					</view>
				</view>
				<view class="bill-con-list">
					<view class="bill-con-list-items acea-row" v-for="(item,index) in info.standardVoList" :key="index">
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name name2 acea-row row-between-wrapper">
								{{item.serviceName}}
								<view style="color: #999;"><text
										style="font-size: 22rpx;">¥</text>{{item.standardPrice}}x{{item.serviceCount}}
								</view>
							</view>
							<view class="name name2 acea-row row-between-wrapper">
								<text style="color: #999;">{{item.remark}}</text>
								<view style="color: #999;"><text class="red"><text style="font-size: 22rpx;">¥</text>
										{{Number(item.standardPrice)*Number(item.serviceCount)}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="button acea-row row-between-wrapper">
			<view class="btn" @click="$jump('/subpkg/staging/order/serve/billDetails?orderId='+orderId)">修改账单</view>
			<view class="btn">生成收款码</view>
			<view class="btn">邀客户确认</view>
		</view>

		<!-- k客户确认 -->
		<!-- <view class="bottom ">
			<view class="agreement">
				<view class="fonts acea-row row-middle" @click="checkedLogin = !checkedLogin">
					<view style="margin:3rpx 10rpx 0 0;">
						<view v-if="!checkedLogin" class="check"></view>
						<view v-else>
							<u-icon name="checkmark-circle-fill" color="#A4D091" size="27rpx"></u-icon>
						</view>

					</view>
					我已知晓并确认以上配件及服务报价内容

				</view>
			</view>
			<view class="button acea-row row-between-wrapper">
				<view class="call acea-row row-middle row-center">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/10/6862825801b0410591bc3c1e1f29a5a4.png"
						mode=""></image>
				</view>
				<view class="btn btn1">生成收款码</view>
				<view class="btn btn2">邀客户确认</view>
			</view>

		</view> -->
	</view>
</template>

<script>
	import {
		getServiceQuotation
	} from '@/api/car.js'

	export default {
		data() {
			return {
				checkedLogin: false,
				orderId: "1834830447568150529",
				info: {}
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				getServiceQuotation(this.orderId).then(res => {
					this.info = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		font-size: 24rpx;
		color: #212121;

		.store {
			margin: 22rpx 0;
			padding: 0 24rpx 20rpx;
			background-color: #fff;

			&-top {
				padding: 24rpx 0;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}

				&-name {
					flex: 1;
					font-size: 28rpx;

					view {
						max-width: 300px;
						font-size: 32rpx;
					}

					text {
						color: #999999;
					}
				}
			}

			&-con {
				padding: 24rpx;
				background: rgba(243, 178, 62, 0.08);
				background-color: rgba(164, 208, 145, 0.08);
				border-radius: 12rpx;
				color: #999999;

				view {
					margin-bottom: 12rpx;
				}

				view:nth-last-child(1) {
					margin-bottom: 0;
				}
			}
		}

		.bg {
			width: 720rpx;
			height: 46rpx;
			margin: 0 14rpx;
			background: $pageColor;
			border-radius: 23rpx;
		}

		.bill {
			margin: -24rpx 30rpx 0;

			&-con {
				background-color: #fff;
				border-radius: 16rpx;
				margin-bottom: 20rpx;

				&-name {
					height: 96rpx;
					line-height: 96rpx;
					font-size: 28rpx;
					padding-right: 20rpx;

					.view {
						width: 4rpx;
						height: 36rpx;
						background: $pageColor;
						margin-right: 24rpx;
					}

					.price {
						color: #FD5834;
					}
				}

				&-tent {
					padding: 20rpx;

					&-type {
						margin-bottom: 20rpx;

						text {
							color: #999999;
						}

						.red {
							color: #FD5834;
						}
					}

					&-more {
						padding: 24rpx;
						// background: rgba(243, 178, 62, 0.08);
						background-color: rgba(164, 208, 145, 0.08);
						border-radius: 12rpx;
						color: #999999;
						margin: 20rpx 0;

						view {
							margin-bottom: 12rpx;
						}

						view:nth-last-child(1) {
							margin-bottom: 0;
						}
					}

				}

				&-price {
					margin: 0 24rpx;

					&-all {
						font-size: 28rpx;
						border-top: 1rpx solid #f5f5f5;
						padding: 10rpx 0 18rpx;

						text {
							font-size: 64rpx;
							color: #FD5834;
							position: relative;
							top: 8rpx;
						}
					}

					&-jian {
						font-size: 28rpx;
						text-align: right;
						padding-bottom: 34rpx;
					}
				}

				&-list {
					padding: 0 0 20rpx;

					&-items {
						border-bottom: 1rpx solid #f5f5f5;
						padding: 20rpx;
						margin: 0 20rpx;

						image {
							width: 128rpx;
							height: 128rpx;
							margin-right: 14rpx;
						}

						&-right {
							flex: 1;
							padding: 4rpx 0;

							.name {
								font-size: 28rpx;
							}

							.name2 {
								margin-bottom: 10rpx;
							}

							.hui {
								color: #999;
							}

							.red {
								color: #FD5834;
							}
						}
					}

					&-items:nth-last-child(1) {
						border-bottom: none;
					}
				}

				&-bottom {
					font-size: 28rpx;
					padding: 0 24rpx 30rpx;

					.btn {
						width: 48%;
						height: 70rpx;
						border-radius: 16rpx;
						background-color: rgba(164, 208, 145, 0.08);
						border: 1rpx solid $pageColor;
						color: $pageColor ;
						text-align: center;
						line-height: 70rpx;
					}

					.btn:nth-last-child(1) {
						background: $pageColor;
						border: 1rpx solid $pageColor;
						color: #FFFFFF;
					}
				}
			}
		}

		.button {
			background-color: #fff;
			padding: 24rpx 24rpx 40rpx;

			.btn {
				width: 32%;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				background: $pageColor;
				border-radius: 16rpx;
				border: 1rpx solid $pageColor;
				color: #fff;
			}

			.btn:nth-child(1) {
				border: 1rpx solid #CCCCCC;
				background: #FFFFFF;
				color: #212121;
			}

			.btn2 {
				width: 45%;
			}

			.btn1 {
				width: 35%;
				background-color: rgba(164, 208, 145, 0.08);
				border: 1rpx solid $pageColor;
				color: $pageColor ;
			}

			.call {
				width: 12%;
				height: 78rpx;
				border: 1rpx solid $pageColor;
				border-radius: 16rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}


		}

		.bottom {
			background-color: #fff;

			.agreement {
				font-size: 24rpx;
				color: #212121;

				.fonts {
					display: flex;
					width: 686rpx;
					font-size: 22rpx;
					color: #212121;
					padding-top: 20rpx;
					margin-left: 24rpx;

					.check {
						width: 22rpx;
						height: 22rpx;
						border: 2rpx solid #A5A7A7;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>