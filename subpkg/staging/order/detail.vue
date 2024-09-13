<template>
	<view class="page">
		<view class="page-all page-allTop" @click="$jump('/subpkg/staging/order/other/process')">
			<view class="page-all-top acea-row row-between-wrapper">温馨提示：如发现师傅无故加价，请联系我们核对信息！<view
					class="acea-row row-middle row-center">联系ta</view>
			</view>
			<!-- <view class="page-all-top acea-row row-between-wrapper">温馨提示：服务方案已调整，需系统审核之后才能进行后续服务！
			</view> -->
			<view class="page-all-top-status">
				<view class="acea-row row-middle">
					<view>待接单</view> <u-icon name="arrow-right" color="#212121" size="16"></u-icon>
				</view>
				<!-- <text>正在为匹配合适的师傅，请耐心等待</text> -->
				<text>请尽快确认报价方案，如有疑问可联系业务员！</text>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-con">
				<view class="page-all-con-t acea-row row-middle ">客户信息</view>
				<view class="page-all-con-mess acea-row row-middle ">
					<view class="page-all-con-mess-name acea-row row-middle">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/8e4a60068dfd46f0954fa7b1eeb8ea44.png"
							mode=""></image>
						<text>{{info.orderPerson}}｜{{info.orderPersonPhone}}</text>
					</view>
					<view class="page-all-con-mess-name acea-row">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/34e349ea77104880b7c917b0ec5d86d8.png"
							mode=""></image>
						<view>
							<view>{{info.customerName}}</view>
							<text style="font-size: 24rpx;">{{info.addressDetailed}}</text>
						</view>
					</view>
					<view class="page-all-con-mess-name acea-row row-middle">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/e8245f10edc24e888686333e943e7acd.png"
							mode=""></image>
						<text>期望上门时间：{{info.expectTime}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单指派师傅 -->
		<view class="page-all" v-if="info.appointWorkers">
			<view class="page-all-overImg">
				<view class="acea-row row-bottom" style="font-size: 32rpx; margin-bottom: 10rpx;">
					<image style="width: 50rpx; height: 50rpx; margin-right: 10rpx;"
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/07/901b7bd28cf448bf8adc0bb16104077f.png"
						mode=""></image> 订单指派师傅
				</view>
				<view class="page-all-overImg-type">如指派师傅超30分钟未响应，订单将由其他师傅接单服务</view>
				<view class="page-all-overImg-img acea-row" style="padding: 24rpx 0;">
					<!-- <view class="page-all-overImg-img-items" v-for="(item) in info.appointWorkers" :key="item.id">
						{{item}}
					</view> -->
					<view class="flex-colum-center" v-for="(item) in info.appointWorkers" :key="item.id"
						style="width: 20%;margin: 20rpx 0;">
						<image v-if="item.avatarUrl" :src="item.avatarUrl" mode=""></image>
						<image v-else
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png"
							mode=""></image>
						<text>{{item.userName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-worder acea-row row-between-wrapper">
				<view class="page-all-worder-left">
					<view class="page-all-worder-left-top">
						李师傅<text style="font-size: 24rpx; color: #A0A0A0;"> /水电师傅</text>
					</view>
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/219172487b87402eb433e4f022f1f196.png"
						mode=""></image>
				</view>
				<view class="page-all-worder-right acea-row">
					<image src="../../../static/img/wechat.png" mode=""></image>
					<u-icon name="arrow-right" color="#959595" size="18"></u-icon>
				</view>
			</view>

			<!-- 接单且已完工 -->
			<!-- <view class="page-all-overImg">
				<view class="">服务完工图片</view>
				<view class="page-all-overImg-type">装修维修/打胶/打胶</view>
				<view class="page-all-overImg-img acea-row">
					<view class="page-all-overImg-img-items" v-for="item in [1,2,3,4,5,6,7]">
						{{item}}
					</view>
				</view>
				<view class="page-all-overImg-call acea-row">
					<view class="acea-row row-middle row-center" style="border-right: 1rpx solid #D8D8D8;">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/11c66bd5416c4410a7880f801ea804d2.png"
							mode=""></image>投诉师傅
					</view>
					<view class="acea-row row-middle row-center">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/11c66bd5416c4410a7880f801ea804d2.png"
							mode=""></image>评价师傅
					</view>
				</view>
			</view> -->
			<!-- 接单当前未完工 -->
			<!-- 	<view class="acea-row row-middle row-center" style="height: 100rpx; border-top: 1rpx solid #f5f5f5;">
				<image style="width: 36rpx; height: 36rpx;margin-right: 10rpx;"
					src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/59c4d5c484fb42379d34ad25c9aed048.png"
					mode="">
				</image>联系师傅
			</view> -->
		</view>
		<view class="page-all">
			<view class="page-all-name acea-row  row-between-wrapper">
				<text>服务信息</text>
				<!-- <view class="page-all-pro-name-icon">有新方案待审核</view> -->
			</view>
			<view class="page-all-pro" v-for="(item,index) in info.projectDataVoList" :key="item.orderId">
				<view class="page-all-pro-list acea-row">
					<view class="page-all-pro-list-img">
						<image :src="item.projectImg" mode=""></image>
					</view>
					<view class="page-all-pro-list-right flex-colum-between">
						<view class="page-all-pro-list-righ-title acea-row row-between-wrapper">
							<view style="color: #212121; font-size: 32rpx;">{{item.typeName}}</view>
							<text><text style="font-size: 22rpx;">¥</text> {{item.orderPrice}}</text>
						</view>
						<view class="page-all-pro-list-righ-title acea-row row-between-wrapper">
							<text>{{item.workerType}}</text>
							<text><text style="font-size: 22rpx;">x</text>{{item.projectNumber}}</text>
						</view>
						<view class="acea-row row-right"><text><text style="font-size: 22rpx;">¥</text> 151</text>
						</view>
					</view>
				</view>
				<view class="page-all-pro-list-mark" v-if="item.remark">
					订单备注
					<view class="page-all-pro-list-mark-m">
						{{item.remark}}
					</view>
				</view>
				<view class="page-all-pro-price">
					<view class="acea-row row-right row-bottom">
						订单费用：
						<view class="color">
							<text style="font-size: 30rpx;">¥</text> 396.4
						</view>
					</view>
					<view class="page-all-pro-price-k acea-row row-right row-middle">
						<text style="margin-right: 10rpx;">展开详情</text> <u-icon name="arrow-down" color="#959595"
							size="15"></u-icon>
					</view>
				</view>
				<view class="page-all-pro-priceMxi">
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						服务起步价
						<view> <text style="font-size: 22rpx;">¥</text>{{item.startingFree}}</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						维修服务费
						<view> <text style="font-size: 22rpx;">¥</text>{{item.preferentialPrice}}</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper"
						@click="$jump('/subpkg/staging/order/other/cailiao')">
						材料费
						<view class="acea-row row-middle" style="margin-right: -8rpx;">
							<text style="font-size: 22rpx; margin-top: 4rpx;">¥ </text> {{item.materialPrice}}
							<text style="margin-bottom: 4rpx;">｜</text> 共{{item.startingFree}}件<u-icon
								name="arrow-right" color="#959595" size="13"></u-icon>
						</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper"
						@click="$jump('/subpkg/staging/order/other/peiliao')">
						配件费
						<view class="acea-row row-middle" style="margin-right: -8rpx;">
							<text style="font-size: 22rpx; margin-top: 4rpx;">¥ </text> {{item.startingFree}}
							<text style="margin-bottom: 4rpx;">｜</text> 共{{item.startingFree}}件<u-icon
								name="arrow-right" color="#959595" size="13"></u-icon>
						</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper"
						@click="$jump('/subpkg/staging/order/other/otherPrice')">
						其他费用
						<view class=" acea-row row-middle" style="margin-right: -8rpx;">
							<text style="font-size: 22rpx; margin-top: 4rpx;">¥ </text> {{item.startingFree}}
							<text style="margin-bottom: 4rpx;">｜</text> 共{{item.startingFree}}件<u-icon
								name="arrow-right" color="#959595" size="13"></u-icon>
						</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						优惠券
						<view> -<text style="font-size: 22rpx;">¥</text>{{item.startingFree}}</view>
					</view>
					<view class="page-all-pro-priceMxi-item acea-row row-between-wrapper">
						品牌折扣
						<view class="acea-row row-middle" style="margin-right: -8rpx;">
							<text style="font-size: 22rpx; margin-top: 4rpx;">¥ </text> {{item.startingFree}}
							<text style="margin-bottom: 4rpx;">｜</text>折扣:{{item.startingFree}}%
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-weihu">
				<view class="page-all-weihu-name">品牌维护信息</view>
				<view class="page-all-weihu-people acea-row row-between-wrapper" v-for="(item,index) in peopleList"
					:key="index">
					<view>{{item.label}}</view>
					<view class="acea-row">{{item.naame}}（ID:{{item.id}}） <view
							class="call acea-row row-center-wrapper">
							联系TA</view>
					</view>
				</view>
				<view class="page-all-weihu-mark">
					<view class="page-all-weihu-mark-mess acea-row row-between-wrapper">
						<text>备注信息</text>
						<view class="acea-row row-middle">全部信息<u-icon name="arrow-right" color="#232323"
								size="13"></u-icon>
						</view>
					</view>
					<view class="page-all-weihu-mark-con acea-row row-between-wrapper">
						<view class="page-all-weihu-mark-con-left">
							<text>这里显示备注内容 </text>
							<view class="">周微 ｜2023-12-12 12:12:12</view>
						</view>
						<image src="../../../static/img/tabbar/index-unactive.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-table">
				<view class="page-all-table-top acea-row row-between-wrapper">
					<text>费用明细</text>
					<view class="">
						<text class="iconfont icon-tongyi" style="color:#A4D091; margin: 2rpx 10rpx 0 0;"></text>
						已达到起步价
					</view>
				</view>
				<view class="vant-table">
					<table cellspacing="0" style="width:100%" class="table">
						<tr class="acea-row row-middle row-center" style="box-sizing: border-box;">
							<th class="th">费用项</th>
							<th class="th">订单费用</th>
							<th class="th">订单成本</th>
						</tr>
						<tr class="list-tr">
							<td class="td">起步价</td>
							<td class="td"> <text>¥</text>90 </td>
							<td class="td"> <text>¥</text>90 </td>
						</tr>
						<tr class="list-tr">
							<td class="td">服务费</td>
							<td class="td"> <text>¥</text>90 </td>
							<td class="td"> <text>¥</text>90 </td>
						</tr>
						<tr class="list-tr ">
							<td class="td">材料费</td>
							<td class="td acea-row row-center row-middle"> <text style="padding-top: 2rpx;">¥</text>90
								<view class="acea-row row-middle" style="margin-left: 4rpx;">
									详情<u-icon name="arrow-right" color="#3882F1" size="12"></u-icon>
								</view>
							</td>
							<td class="td"> <text>¥</text>90 </td>
						</tr>
						<tr class="list-tr ">
							<td class="td">配件费</td>
							<td class="td acea-row row-center row-middle"> <text style="padding-top: 2rpx;">¥</text>90
								<view class="acea-row row-middle" style="margin-left: 4rpx;">
									详情<u-icon name="arrow-right" color="#3882F1" size="12"></u-icon>
								</view>
							</td>
							<td class="td"> <text>¥</text>90 </td>
						</tr>
						<tr class="list-tr ">
							<td class="td">其他费用</td>
							<td class="td acea-row row-center row-middle"> <text style="padding-top: 2rpx;">¥</text>90
								<view class="acea-row row-middle" style="margin-left: 4rpx;">
									详情<u-icon name="arrow-right" color="#3882F1" size="12"></u-icon>
								</view>
							</td>
							<td class="td"> <text>¥</text>90 </td>
						</tr>
						<tr class="list-tr">
							<td class="td">优惠金额</td>
							<td class="td"> <text>¥</text>90 </td>
							<td class="td"> <text>¥</text>90 </td>
						</tr>
						<tr class="list-tr">
							<td class="td">合计</td>
							<td class="td"> <text>¥</text>90 </td>
							<td class="td"> <text>¥</text>90 </td>
						</tr>
					</table>
				</view>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-pj">
				<view class="page-all-pj-top acea-row row-between-wrapper">
					<text>客户评价</text>
					<view class="acea-row row-middle">
						显示评论 <text style="margin-right: 10rpx;"></text>
						<u-switch space="2" v-model="value" size="15" activeColor="#f9ae3d"
							inactiveColor="rgb(230, 230, 230)">
						</u-switch>
					</view>
				</view>
				<view class="page-all-pj-con">
					<view class="page-all-pj-con-mess">平台工作负责，师傅处理高效，用心，值得推荐</view>
					<image src="../../../static/center/zc.png" mode=""></image>
					<view class="page-all-pj-con-fen acea-row row-between-wrapper">
						<view class="">维修技术: <text>4.5 </text> 分</view>
						<view class="">维修速度: <text>4.5 </text> 分</view>
						<view class="">服务速度: <text>4.5 </text> 分</view>
					</view>
				</view>
			</view>
		</view>
		<view class="page-all">
			<view class="page-all-orderMess">
				<view class="page-all-orderMess-top">订单信息</view>
				<view class="page-all-orderMess-center acea-row row-between-wrapper">
					订单编号
					<view @click="$copy(info.orderNumber)">{{info.orderNumber}} 丨 复制</view>
				</view>
				<view class="page-all-orderMess-center acea-row row-between-wrapper">
					下单时间
					<view>{{info.orderTime}}</view>
				</view>
				<view class="page-all-orderMess-center acea-row row-between-wrapper">
					期望上门时间
					<view>{{info.expectTime}}</view>
				</view>
				<view class="page-all-orderMess-center acea-row row-between-wrapper">
					是否加急单
					<view>{{info.isUrgent==0?'不加急':'加急'}}</view>
				</view>
				<view class="page-all-orderMess-center acea-row row-between-wrapper">
					服务类型
					<view>{{info.orderType=='1'?'维保':'维修'}}服务</view>
				</view>
			</view>
		</view>
		<view class="page-bottom acea-row row-between-wrapper">
			<text>更多</text>
			<view class="acea-row">
				<view class="btn">次2操作</view>
				<view class="btn">次1操作</view>
				<view class="btn">主操作</view>
			</view>
		</view>
	</view>
</template>

<script>
	import
	Table
	from '@/components/table.vue'
	import {
		getOrderIdDetail
	} from '@/api/car.js'
	export default {
		components: {
			Table
		},
		data() {
			return {
				value: false,
				peopleList: [{
						id: 1,
						label: "品牌合伙人",
						name: "周维",
						phone: "15705622318",
					},
					{
						id: 1,
						label: "下单人",
						name: "周维",
						phone: "15705622318",
					}
				],
				tableData: [{
					region: "22",
					bonusRatio: "22",
					createTime: "22",
				}],
				//th
				option: {
					column: [{
							label: '费用项',
							prop: 'region',
							width: "40%"
						},
						{
							label: '订单费用',
							prop: 'bonusRatio',
							width: "30%"
						},
						{
							label: '订单成本',
							prop: 'createTime',
							width: "30%"
						}

					]
				},
				orderId: '1834549231493259266',
				info: {}
			}
		},
		onLoad(options) {
			if (options && options.orderId) {
				this.orderId = options.orderId
			}
			this.getInfo()
		},
		methods: {
			getInfo() {
				getOrderIdDetail(this.orderId).then(res => {
					this.info = res.data
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;

		&-all {
			// width: 100%;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			font-size: 28rpx;
			margin: 0 20rpx 20rpx 20rpx;

			&-top {
				padding: 16rpx 20rpx;
				background: #FBF3E3;
				font-size: 24rpx;
				color: #D19B2C;

				view {
					width: 96rpx;
					height: 40rpx;
					background: #D3B87E;
					border-radius: 20rpx;
					font-size: 24rpx;
					color: #FFFFFF;
				}

				&-status {
					padding: 20rpx 24rpx;
					font-size: 24rpx;
					color: #999999;

					view {
						font-size: 32rpx;
						color: #212121;
						margin-bottom: 8rpx;
					}

					text {}
				}
			}

			&-con {
				&-t {
					border-bottom: 1rpx solid #f5f5f5;
					padding: 24rpx;
				}

				&-mess {
					padding: 0 24rpx;
					font-size: 28rpx;
					color: #212121;

					&-name {
						width: 100%;
						padding: 24rpx 0;
						border-bottom: 1rpx solid #f5f5f5;

						image {
							width: 38rpx;
							height: 36rpx;
							margin-right: 12rpx;
						}
					}

					&-name:nth-last-child(1) {}
				}
			}

			&-worder {
				padding: 24rpx 0;
				margin: 0 24rpx;

				&-left {
					image {
						width: 152rpx;
						height: 36rpx;
						margin-top: 8rpx;
					}
				}

				&-right {
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

				}
			}

			&-overImg {
				padding: 24rpx 24rpx 0 24rpx;
				border-top: 1rpx solid #f5f5f5;

				&-type {
					font-size: 24rpx;
					color: #999999;
					margin: 8rpx 0 14rpx;
				}

				&-img {
					&-items {
						width: 112rpx;
						height: 112rpx;
						margin: 0 20rpx 10rpx 0;
						background-color: #FBF3E3;

						image {
							width: 100%;
							height: 100%;
							border-radius: 8rpx;
						}
					}
				}

				&-call {
					padding: 38rpx 0;
					margin-top: 20rpx;
					color: #212121;
					border-top: 1rpx solid #f5f5f5;

					view {
						width: 49%;

						image {
							width: 36rpx;
							height: 36rpx;
							margin-right: 16rpx;
						}
					}
				}
			}

			&-name {
				font-size: 32rpx;
				padding: 24rpx 0 14rpx 24rpx;

				// &-icon {
				// 	height: 40rpx;
				// 	background: #F3B23E;
				// 	border-radius: 24rpx 0rpx 24rpx 0rpx;
				// 	font-size: 20rpx;
				// 	color: #FFFFFF;
				// 	line-height: 40rpx;
				// 	padding: 0 30rpx;
				// }
			}

			&-pro {
				padding: 24rpx;



				&-list {
					margin-bottom: 20rpx;

					&-img {
						width: 128rpx;
						height: 128rpx;
						margin-right: 20rpx;
						background-color: #D3B87E;
						border-radius: 10rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}

					&-right {
						color: #999999;
						flex: 1;

						&-title {
							font-size: 28rpx;
						}
					}

					&-mark {
						padding: 20rpx;
						background: rgba(243, 178, 62, 0.08);
						border-radius: 16rpx;
						color: #b8b8b8;
						margin-top: 20rpx;

						&-m {
							font-size: 24rpx;
							margin-top: 6rpx;
						}
					}
				}

				&-price {
					margin: 24rpx 0 20rpx;

					.color {
						color: #FD5834;
						font-size: 40rpx;
						position: relative;
						top: 6rpx;
					}

					&-k {
						color: #999999;
						margin-top: 10rpx;
					}
				}

				&-priceMxi {
					border-top: 1rpx solid #f5f5f5;
					padding: 30rpx 10rpx 0rpx;

					&-item {
						margin-bottom: 14rpx;

						view {
							color: #A4A4A4;
						}
					}
				}
			}

			&-weihu {
				padding: 0 24rpx;

				&-name {
					font-size: 32rpx;
					padding-top: 26rpx;
					padding-bottom: 10rpx;
				}

				&-people {
					padding: 24rpx 0;

					.call {
						background-color: $pageColor;
						padding: 0rpx 10rpx;
						border-radius: 10rpx;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				&-mark {
					border-top: 1rpx solid #f5f5f5;

					&-mess {
						padding: 24rpx 0;

						text {
							font-size: 32rpx;
						}
					}

					&-con {
						padding-bottom: 30rpx;

						&-left {
							view {
								color: #A4A4A4;
							}
						}

						image {
							width: 80rpx;
							height: 80rpx;
						}
					}
				}
			}

			&-table {
				padding-bottom: 24rpx;

				&-top {
					padding: 0 24rpx;
					height: 96rpx;
					line-height: 96rpx;

					text {
						font-size: 32rpx;
					}
				}

				.table {
					border-radius: 10rpx;
					font-family: PingFangSC, PingFang SC;
					box-sizing: border-box;
					font-size: 24rpx;

					.th {
						width: 33%;
						background-color: #ccc;
						text-align: center;
						border-right: 1rpx solid #f1f1f1;
						border-bottom: 1rpx solid #f1f1f1;
						box-sizing: border-box;
						background-color: rgb(255, 251, 232);
						color: #F3B23E;
						padding: 10rpx 0;
					}

					.th:nth-last-child(1) {
						border-right: none;
					}

					.list-tr {
						display: flex;
					}

					.td {
						padding: 10rpx 0;
						width: 33%;
						text-align: center;
						border-right: 1rpx solid #f1f1f1;
						border-bottom: 1rpx solid #f1f1f1;
						box-sizing: border-box;

						view {
							color: #3882F1;
						}

						text {
							font-size: 22rpx;
						}
					}

					.td:nth-last-of-type(1) {
						border-right: none;
					}

					// .list-tr:nth-last-child(1) {
					// 	.td {
					// 		border-bottom: none;
					// 	}
					// }
				}

			}

			&-pj {
				padding: 0 24rpx 24rpx;

				&-top {
					height: 96rpx;
					line-height: 96rpx;

					text {
						font-size: 32rpx;
					}
				}

				&-con {
					&-mess {
						font-size: 24rpx;
						color: #999999;
					}

					image {
						width: 112rpx;
						height: 112rpx;
						border-radius: 10rpx;
						background: #FD5834;
						margin: 20rpx 0;
					}

					&-fen {
						background: rgba(243, 178, 62, 0.08);
						border-radius: 10rpx;
						padding: 16rpx;

						text {
							color: #F3B23E;
						}
					}

				}
			}

			&-orderMess {
				padding: 0 24rpx 14rpx;

				&-top {
					font-size: 32rpx;
					padding: 24rpx 0;
				}

				&-center {
					margin-bottom: 14rpx;

					view {
						color: #A4A4A4;
					}
				}
			}
		}

		&-allTop {
			margin: 0 0 20rpx 0;
		}

		&-bottom {
			padding: 24rpx 24rpx 40rpx;
			background: #FFFFFF;

			text {
				color: #F3B23E;
			}

			.btn {
				padding: 14rpx 28rpx;
				border: 1rpx solid #F3B23E;
				border-radius: 50rpx;
				background-color: #FFFFFF;
				font-size: 28rpx;
				color: #F3B23E;
				margin-left: 10rpx;
			}

			.btn:nth-last-child(1) {
				padding: 14rpx 50rpx;
				background-color: #F3B23E;
				border: 1rpx solid #F3B23E;
				color: #fff;

			}
		}
	}
</style>