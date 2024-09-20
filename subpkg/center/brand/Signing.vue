<template>
	<view class="pages">

		<!-- 邀请的门店 -->
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<view slot='top'>
				<Header type="dark" bgTop="#fff" listen-scroll :scroll-top="scrollTop" :offset-top="300" title=""
					no-blank>
					<template #back>
						<u-icon name="arrow-left" size="20" @click="$jump(-1)"></u-icon>
					</template>
					<view class="two_change">
						<text>签约管理</text>
						<!-- 	<text v-for="(item) in type" :key="item.id" :class="{on:typeIndex==item.id}"
							@click="typeClick(item)">{{item.label}}</text> -->
					</view>
				</Header>
				<status-bar></status-bar>
				<view class="header">
					<!-- <input type="text" @confirm="queryList" @clear='queryList' v-model="where.searchValue"
						placeholder="品牌名称或联系人姓名" class="input"> -->
					<view class="input">
						<u-search :showAction="false" placeholder="品牌名称/联系电话" @clear='queryList'
							v-model="where.searchValue" @search="queryList">
						</u-search>
					</view>

					<view class="input-s"></view></input>
					<view class="header-type">
						<view class="filter-row acea-row row-between-wrapper">
							<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
								:class="{on: where.reviewStatus === item.type}" @click="productSort(item.type)">
								{{item.label}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="invite_list">
				<view class="invite_list-item" v-for="item in dataList" :key="item.id">
					<view class="invite_list-item-top acea-row row-between-wrapper">
						<view class="invite_list-item-top-left acea-row">
							<image v-if="item.brandLog==null||item.brandLog==''||item.brandLog=='null'"
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/02/23d8137225a440f3a4e19e43d527cc32.png"
								mode=""></image>
							<image v-else :src="item.brandLog" mode=""></image>
							<view class="invite_list-item-top-left-title flex-colum">
								<view class="invite_list-item-top-left-title-name acea-row row-between-wrapper">
									<view class="acea-row">
										<view class="view">{{item.brandName}} </view>
										<view class="ping acea-row row-center row-middle" v-if="item.isGroup=='y'">集团品牌
										</view>
									</view>
									<view class="list_status" :class="'color-' + item.reviewStatus">
										{{item.reviewStatus==1?'审核通过':item.reviewStatus==-1?'审核驳回':'待审核'}}
									</view>
								</view>
								<text>联系人：{{item.personName}}</text>
							</view>
						</view>
					</view>
					<view class="invite_list-item-time acea-row">{{item.createTime}} 提交
						<view class="invite_list-item-time-btn acea-row">
							<view @click.stop="showPhoneHandle(item.personPhone)">联系ta</view>
							<view v-if="item.reviewStatus==1" @click="toSet(item)">签约设置</view>
						</view>
					</view>
				</view>
				<!-- <empty-page v-if="!list.length" msg="暂无数据"></empty-page> -->
			</view>
			<view slot='bottom' class="bottom acea-row">
				<view class="acea-row row-middle row-center" style="border-right: 1rpx solid #D8D8D8;"
					@click=" toAdd()">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/23/ce1a3b6f81e841ff83fda6e513a86046.png"
						mode=""></image>手动添品牌信息
				</view>
				<view class="acea-row row-middle row-center"
					@click="$jump('/subpkg/center/inviteWorker/inviteRewards?type=推广佣金')">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/23/b2169317f7d044f8bf3debc9acd18f01.png"
						mode=""></image>品牌签约佣金
				</view>
			</view>
		</z-paging>
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
		<u-popup :show="noCardShow" mode="center" :round="10" @close="noCardShow=false">
			<view class="pop_show flex-colum-center" @click="toCard">
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/07/32651409c622489ebbfb814a7d488cb2.png"
					mode=""></image>
				<view class="pop_show-mess">
					您当前的账号未绑定银行卡，请绑定银行卡后再进行后续操作！
				</view>
				<view class="pop_show-btn acea-row row-middle row-center">
					前往绑卡
				</view>
			</view>
		</u-popup>
		<!-- <view class="jsImg" @click="$jump('/subpkg/center/brand/footRewrad')">
			<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/10/803423d8f59340f1b5f57f36525da075.png"
				mode=""></image>
		</view> -->
	</view>
</template>

<script>
	import Header from '@/components/header/index.vue';
	import {
		putQueryList,
		postVerifyBankCard,
		putImmediate
	} from "@/api/brand.js"
	import {
		callPhone
	} from '@/utils/phone.js'
	import storage from '@/utils/storage'
	export default {
		components: {
			Header,
		},
		data() {
			return {
				noCardShow: false,
				showPhone: false,
				dataList: [],
				searchIndex: 0,
				typeIndex: 1,
				typeStatus: 1,
				type: [{
						id: 0,
						label: "品牌"
					},
					// {
					// 	id: 1,
					// 	label: "门店"
					// },
				],
				searchTypes: [{
						type: '',
						label: '全部',

					},
					{
						type: 0,
						label: '待审核',

					},
					{
						type: 1,
						label: '审核通过',

					},
					{
						type: -1,
						label: '审核驳回',

					}
				],
				scrollTop: 0,
				where: {
					userId: storage.get('ClientId'),
					searchValue: "",
					// 审核状态；0-待审核，1审核通过，-1审核驳回
					reviewStatus: "",
					pageNum: 1,
					pageSize: 10,
				},
				actionList: [{
						name: ''
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
				backShow: false,
				moveShow: false,
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getBank()
		},
		onShow() {
			this.getList()
			// uni.$on('listOnshow', show => {
			// 	if (show) {
			// 		this.getList()
			// 	}
			// })
			uni.$on('getBankshow', show => {
				if (show) {
					this.getBank()
				}
			})
		},
		methods: {
			getList() {
				uni.showLoading({
					mask: true
				});
				putQueryList(this.where).then(res => {
					uni.hideLoading();
					this.$refs.paging.completeByTotal(res.rows, res.total);
				}).catch(err => {
					uni.hideLoading();
				})
			},
			getBank() {
				postVerifyBankCard(this.where.userId).then(res => {
					this.backShow = res.msg
				})
			},
			productSort(status) {
				this.where.reviewStatus = status;
				this.$refs.paging.reload();
			},
			typeClick(item) {
				this.typeIndex = item.id
			},
			showPhoneHandle(phone) {
				this.showPhone = true
				this.actionList[0].name = phone
			},
			queryList() {
				this.$refs.paging.reload();
				// this.getList()
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(this.actionList[0].name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(this.actionList[0].name, 'wx')
					// #endif
					this.showPhone = false
				}
			},
			toSet(item) {
				// return
				console.log(this.backShow, "this.backShow");
				if (this.backShow == 'ture') {
					this.$jump('/subpkg/center/brand/settings?id=' + item.id + '&partner=' + item.partner +
						'&partnerId=' + item.partnerId + '&customerId=' + item.customerId)
				} else {
					this.noCardShow = true
				}
			},
			toCard() {
				this.noCardShow = false
				this.$jump('/subpkg/center/myMoney/addCard/addCard?noCard=1')
			},
			toAdd() {
				putImmediate(storage.get('ClientId')).then(res => {
					let data = res.data
					this.$jump('/subpkg/center/brand/inviter?id=' + data.partnerId)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;
	}

	.two_change {
		font-family: PingFangSC, PingFang SC;
		font-size: 32rpx;
		color: #212121;

		text {
			position: relative;
			margin-right: 15rpx;

			&.on {
				position: relative;
			}

			&.on::after {
				content: "";
				position: absolute;
				height: 6rpx;
				background: #A4D091;
				border-radius: 3rpx;
				width: 100%;
				bottom: -10rpx;
				left: 0;

			}
		}

		text:nth-last-child(1) {
			margin-right: 0rpx;
			margin-left: 15rpx;
		}
	}

	.header {
		width: 100%;
		margin-top: 88rpx;
		box-sizing: border-box;

		background-color: #FFFFFF;
		// position: fixed;
		// top: 88rpx;
		// left: 0;
		// z-index: 10;

		.input {

			padding: 0 30rpx;

			// &-s {
			// 	position: absolute;
			// 	top: 15rpx;
			// 	left: 40rpx;
			// 	width: 25rpx;
			// 	height: 25rpx;
			// 	background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;
			// 	background-size: 100% 100%;
			// }
		}

		&-type {
			font-size: 26rpx;
			justify-content: space-between;

			.filter-row {
				box-sizing: border-box;
				height: 88rpx;
				margin-top: 20rpx;
				border-top: 1rpx solid #ececec;
				padding: 0 30rpx;

				.filter-row-item {
					color: #969799;
					font-size: 28rpx;
					margin-right: 30rpx;

					&:last-of-type {
						margin-right: 0;
					}

					&.on {
						color: #323233;
						position: relative;

						&.on::after {
							content: "";
							position: absolute;
							height: 6rpx;
							background: #A4D091;
							border-radius: 3rpx;
							width: 100%;
							bottom: -24rpx;
							left: 0;

						}
					}



					image {
						display: inline-block;
						width: 16rpx;
						height: 20rpx;
						margin: 8rpx 6rpx 0;
					}

					.sort {
						width: 14rpx;
						height: 20rpx;
						color: #999999;
					}

					.bottomsort {
						transform: rotate(180deg)
					}
				}
			}
		}
	}


	.invite_list {
		// margin: 270rpx 0 0 0;
		margin-top: 20rpx;
		padding: 0 30rpx 60rpx;

		.invite_list-item {
			// height: 362rpx;
			background: #FFFFFF;
			border-radius: 14rpx;
			margin-bottom: 22rpx;
			padding: 46rpx 0rpx 0;
			box-sizing: border-box;

			&-top {
				// height: 133rpx;
				padding: 0 20rpx;

				&-left {
					width: 100%;

					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 14rpx;
						background-color: #fafaf3;
						box-sizing: border-box;
					}

					&-title {
						flex: 1;
						font-size: 32rpx;
						color: #212121;
						font-weight: bold;
						margin-left: 20rpx;
						padding: 6rpx 0;
						justify-content: space-between;

						&-name {
							margin: 0rpx 0 10rpx 0;
							display: flex;

							.view {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								max-width: 274rpx;
								margin-right: 10rpx;
							}

							.ping {
								width: 110rpx;
								background: #A4D091;
								padding: 0rpx 4rpx;
								font-size: 24rpx;
								color: #FFFFFF;
								border-radius: 6rpx;
							}
						}

						.list_status {
							font-size: 28rpx;
							color: #FAAB0C;
							font-weight: 400;

							&.color-1 {
								color: #A4D091;
							}

							&.color--1 {
								color: #EE0A24;
							}
						}

						text {
							font-weight: 400;
							display: block;
							font-size: 28rpx;
							color: #999999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}

			}

			&-time {
				// height: 92rpx;
				line-height: 92rpx;
				font-size: 28rpx;
				color: #999999;
				justify-content: space-between;
				padding: 0 20rpx;
				border-top: 1rpx solid #E5E5E5;
				margin-top: 30rpx;

				&-btn {
					align-items: center;

					view {
						width: 140rpx;
						height: 54rpx;
						background: #FFFFFF;
						border-radius: 8rpx;
						border: 2rpx solid #A4D091;
						color: #A4D091;
						font-size: 24rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}


					view:nth-last-child(1) {
						background: #A4D091;
						color: #FFFFFF;
						margin-left: 14rpx;
					}


				}
			}
		}
	}

	/deep/ .uni-input-placeholder {
		color: rgb(192, 196, 204);
		font-size: 24rpx;
	}

	.pop_show {
		width: 596rpx;
		/* #ifndef APP-PLUS */
		padding-bottom: 20rpx;
		/* #endif */
		background: #FFFFFF;
		border-radius: 24rpx;

		image {
			width: 160rpx;
			height: 160rpx;
			margin: 70rpx 0 16rpx 0;
		}

		&-mess {
			width: 504rpx;
			height: 80rpx;
			font-size: 28rpx;
			color: #666666;
			line-height: 40rpx;
			text-align: center;
		}

		&-btn {
			width: 524rpx;
			height: 88rpx;
			background: #A4D091;
			border-radius: 8rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			margin-top: 90rpx;
		}
	}

	.jsImg {
		position: fixed;
		bottom: 158rpx;
		right: 22rpx;

		image {
			width: 180rpx;
			height: 194rpx;
		}
	}

	.bottom {
		padding: 36rpx 0 40rpx;
		background-color: #fff;
		color: #999999;
		font-size: 28rpx;

		view {
			height: 70rpx;
			width: 49%;

			image {
				width: 45rpx;
				height: 48rpx;
				margin-right: 16rpx;
			}
		}
	}
</style>