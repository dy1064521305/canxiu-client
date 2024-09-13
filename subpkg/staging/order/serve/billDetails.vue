<template>
	<view class="page">
		<view class="tip">当前利润 <text> 223.6</text>元，在用户支付前可修改报价信息！</view>
		<!-- 	<view class="store">
			<view class="store-top acea-row">
				<image src="@/static/img/mess.png" mode=""></image>
				<view class="store-top-name flex-colum-between">
					<view class="line1">门店名称</view>
					<text>门店类型 ｜所属商圈</text>
				</view>
			</view>
			<view class="store-con">
				<view class="acea-row row-between-wrapper">
					<text>期望上门时间</text>
					<text>2023/12/12 12:12</text>
				</view>
				<view class="acea-row row-between-wrapper">
					<text>期望上门时间</text>
					<text>2023/12/12 12:12</text>
				</view>
				<view class="acea-row row-between-wrapper">
					<text>期望上门时间</text>
					<text>2023/12/12 12:12</text>
				</view>
			</view>
		</view> -->
		<view class="bill bill2">
			<view class="bill-con">
				<view class="bill-con-name acea-row row-middle row-between-wrapper">
					<view class="acea-row row-middle">
						<view class="view"></view>
						服务项（2）
					</view>
					<view class="acea-row row-middle">合计：<view class="price"><text style="font-size: 22rpx;">¥</text>
							210</view>
					</view>
				</view>
				<view class="bill-con-list">
					<view class="bill-con-list-items acea-row">
						<image src="@/static/img/mess.png" mode=""></image>
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name">服务产品名称</view>
							<view class="hui line2">服务说明：服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明</view>
							<view class="acea-row row-between-wrapper">
								维修服务费x1
								<view>小计：<text class="red"><text style="font-size: 22rpx;">¥</text>
										210</text> 金额
								</view>
							</view>
						</view>
					</view>
					<view class="bill-con-list-items acea-row">
						<image src="@/static/img/mess.png" mode=""></image>
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name">服务产品名称</view>
							<view class="hui line2">服务说明：</view>
							<view class="acea-row row-between-wrapper">
								维修服务费x1
								<view>小计：<text class="red"><text style="font-size: 22rpx;">¥</text>
										210</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bill-con">
				<view class="bill-con-name acea-row row-middle row-between-wrapper">
					<view class="acea-row row-middle">
						<view class="view"></view>
						配件材料（2）
					</view>
					<view class="acea-row row-middle">合计：<view class="price"><text style="font-size: 22rpx;">¥</text>
							210</view>
					</view>
				</view>
				<view class="bill-con-list">
					<view class="bill-con-list-items acea-row">
						<image src="@/static/img/mess.png" mode=""></image>
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name">服务产品名称</view>
							<view class="hui line2">服务说明：服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明服务说明</view>
							<view class="acea-row row-between-wrapper">
								维修服务费x1
								<view>小计：<text class="red"><text style="font-size: 22rpx;">¥</text>
										210</text> 金额
								</view>
							</view>
						</view>
					</view>
					<view class="bill-con-list-items acea-row">
						<image src="@/static/img/mess.png" mode=""></image>
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name">服务产品名称</view>
							<view class="hui line2">服务说明：</view>
							<view class="acea-row row-between-wrapper">
								维修服务费x1
								<view>小计：<text class="red"><text style="font-size: 22rpx;">¥</text>
										210</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bill-con-bottom acea-row row-between-wrapper">
					<view class="btn">全部移除</view>
					<view class="btn">添加费用项</view>
				</view>
			</view>
			<view class="bill-con">
				<view class="bill-con-name acea-row row-middle row-between-wrapper">
					<view class="acea-row row-middle">
						<view class="view"></view>
						其他费用（2）
					</view>
					<view class="acea-row row-middle">合计：<view class="price"><text style="font-size: 22rpx;">¥</text>
							210</view>
					</view>
				</view>
				<view class="bill-con-list">
					<view class="bill-con-list-items acea-row">
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name name2 acea-row row-between-wrapper">
								服务产品名称
								<view style="color: #999;"><text style="font-size: 22rpx;">¥</text>100x1
								</view>
							</view>
							<view class="name name2 acea-row row-between-wrapper">
								<text style="color: #999;">师傅夜间（22:00以后）上门维修</text>
								<view style="color: #999;"><text class="red"><text style="font-size: 22rpx;">¥</text>
										210</text> 金额
								</view>
							</view>
						</view>
					</view>
					<view class="bill-con-list-items acea-row">
						<view class="bill-con-list-items-right flex-colum-between">
							<view class="name name2 acea-row row-between-wrapper">
								服务产品名称
								<view style="color: #999;"><text style="font-size: 22rpx;">¥</text>100x1
								</view>
							</view>
							<view class="name name2 acea-row row-between-wrapper">
								<text style="color: #999;">师傅夜间（22:00以后）上门维修</text>
								<view style="color: #999;"><text class="red"><text style="font-size: 22rpx;">¥</text>
										210</text> 金额
								</view>
							</view>
						</view>
					</view>
					<view class="bill-con-bottom acea-row row-between-wrapper">
						<view class="btn" @click="wenTip()">全部移除</view>
						<view class="btn">添加费用项</view>
					</view>
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
						<view class="acea-row row-between-wrapper">
							<text>奶茶机换温控传感器</text><text>200元</text>
						</view>
						<view class="acea-row row-between-wrapper">
							<text>疏通3M内</text><text>200元</text>
						</view>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>材料费 <text>（共3件）</text></view>
						<text class="red"> <text class="red" style="font-size: 20rpx;">¥</text>120</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>配件费 <text>（共2项）</text></view>
						<text> <text style="font-size: 20rpx;">¥</text>120</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>其他费用 <text>（共3件）</text></view>
						<text class="red"> <text class="red" style="font-size: 20rpx;">¥</text>120</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>优惠券 <text>（共3件）</text></view>
						<text class="red"> <text class="red" style="font-size: 20rpx;">¥</text>120</text>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>品牌折扣 <text>（当前折扣：10%）</text></view>
						<text class="red"> <text class="red" style="font-size: 20rpx;">¥</text>120</text>
					</view>
				</view>
				<view class="bill-con-price ">
					<view class="bill-con-price-all acea-row row-right row-bottom">费用合计：<view
							class="acea-row row-bottom">
							<view style="font-size: 24rpx; color: #FD5834;">¥</view>
							<text>396.4</text>
						</view>
					</view>
					<view class="bill-con-price-jian ">
						优惠减免：-<text style="font-size: 22rpx;">¥</text> 210
					</view>
				</view>
			</view>
			<view class="bill-con">
				<view class="bill-con-name acea-row row-middle">
					<view class="acea-row row-middle">
						<view class="view"></view>订单费用
					</view>
				</view>
				<view class="bill-con-tent">
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>维修服务项 <text>（共2项）</text></view>
						<text class="red"> <text class="red" style="font-size: 20rpx;">¥</text>120 <text
								class="iconfont icon-yiwen-copy" @click="wenTip(1)"
								style="color: #FD5834;margin-left: 10rpx;"></text>
						</text>
					</view>
					<view class="bill-con-tent-more">
						<view class="acea-row row-between-wrapper">
							<text>服务项名称</text><text>服务起步价</text>
						</view>
						<view class="acea-row row-between-wrapper">
							<text>奶茶机换温控传感器</text><text>200元</text>
						</view>
						<view class="acea-row row-between-wrapper">
							<text>疏通3M内</text><text>200元</text>
						</view>
					</view>
					<view class="bill-con-tent-type acea-row row-between-wrapper">
						<view>维修服务项 <text>（共2项）</text></view>
						<text class="red"> <text class="red" style="font-size: 20rpx;">¥</text>120</text>
					</view>
					<view class="bill-con-tent-more">
						<view class="acea-row row-between-wrapper">
							<text>服务项名称</text><text>服务起步价</text>
						</view>
						<view class="acea-row row-between-wrapper">
							<text>奶茶机换温控传感器</text><text>200元</text>
						</view>
						<view class="acea-row row-between-wrapper">
							<text>疏通3M内</text><text>200元</text>
						</view>
					</view>
				</view>
				<view class="bill-con-price ">
					<view class="bill-con-price-all acea-row row-right row-bottom">成本合计：<view
							class="acea-row row-bottom">
							<view style="font-size: 24rpx; color: #FD5834;">¥</view>
							<text>396.4</text>
						</view>
					</view>
					<view class="bill-con-price-jian ">
						优惠减免：-<text style="font-size: 22rpx;">¥</text> 210
					</view>
				</view>
			</view>


		</view>
		<view class="button acea-row row-between-wrapper">
			<view class="btn" @click="showAction=true">修改方案</view>
			<view class="btn">生成报价单</view>
		</view>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="activityList" :show="showAction"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activityList: [{
						id: 1,
						name: '添加配件材料'
					},
					{
						id: 2,
						name: '添加收费项'
					},
					{
						id: 3,
						name: '添加服务项'
					},
					{
						name: '取消'
					},
				],
				showAction: false,
			}
		},
		onLoad(options) {
			// if (options && options.orderId) {
			// 	this.orderId = options.orderId
			// }
			// this.getInfo()
		},
		methods: {

			wenTip(value) {
				console.log(value);
				if (value) {
					this.$alert('温馨提示', 2, {
						content: '未到达服务起步价，按服务起步价结算',
						confirmText: '我知道了',
					}).then((res) => {
						if (res.confirm) {
							return
						}
					})
				} else {
					this.$alert('温馨提示', 1, {
						content: '确定移除吗？',
						confirmText: '确认移除',
						cancelText: '我在想想',
					}).then((res) => {
						if (res.confirm) {
							// let data = {
							// 	userId: this.userId,
							// 	detailsId: item.detailsId
							// }
							// putInvalid(data).then(res => {
							// 	this.$toast('关闭成功')
							// 	this.$refs.paging.reload()
							// })
						}
					})
				}
			},
			actionSelect(e) {
				if (e.name == '取消') {
					this.showAction = false
				} else {
					switch (e.id) {
						case 1:
							break;
						case 2:
							break;
						case 3:
							this.jump('/subpkg/staging/order/serve/select')
							break;

						default:
							break;
					}
					console.log(e, "type///");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		font-size: 24rpx;
		color: #212121;

		.tip {
			height: 72rpx;
			background: #FFFBF2;
			line-height: 72rpx;
			padding-left: 24rpx;

			text {
				color: #FF991C;
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
						background: rgba(243, 178, 62, 0.08);
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
							font-size: 40rpx;
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
					margin-top: 20rpx;

					.btn {
						width: 48%;
						height: 70rpx;
						background: #FFFFFF;
						border-radius: 16rpx;
						border: 1rpx solid #CCCCCC;
						color: #212121;
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

		.bill2 {
			margin: 20rpx 30rpx 0;
		}

		.button {
			background-color: #fff;

			padding: 24rpx 24rpx 40rpx;

			.btn {
				width: 48%;
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
		}
	}
</style>