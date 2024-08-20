<template>
	<view class="inviteRewards">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>
				<u-navbar placeholder>
					<view class="u-nav-slot" slot="left">
						<u-icon name="arrow-left" size="19" @click="$jump(-1)"></u-icon>
					</view>
					<!-- :class="{on:type==item.label}" -->
					<view class="two_change" style="display: flex; align-items: center;" slot="center">
						<text v-for="(item) in typeTab" :key="item.id" @click="typeClick(item)">{{item.label}}</text>
					</view>
				</u-navbar>
				<view class="data-box acea-row row-middle">
					<view class="input acea-row row-middle">
						<view style="display: flex;align-items: center; font-size: 28rpx;" @click="showAction_two=true">
							{{whereType}}
							<view class="acea-row row-middle" style="margin-left: 10rpx;">
								<u-icon name="arrow-down-fill" size="10"></u-icon>
							</view>
						</view>
						<input type="text" @confirm="search(1)" @clear='search(1)' v-model="searchValue"
							:placeholder="'请输入'+whereType">
						<view class="" style="position: absolute; top: 17rpx; right: 80rpx;">
							<u-icon v-if="searchValue" @click="search()" color="#D8DCDB" name="close-circle"></u-icon>
						</view>
						<view class="input-s" @click="search(1)"></view>
					</view>
				</view>
				<view class="header-type">
					<view class="filter-row acea-row row-between-wrapper">
						<view class="acea-row row-between-wrapper" style="flex: 1;margin:0 26rpx 0 6rpx;">
							<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item"
								:class="{on: status === item.type}" @click="productSort(item)">
								{{item.label}}
							</view>
						</view>
						<view class="filter-row-yichang" @click="productSort(item,1)" :class="{on:where.normalStatus}">
							结算异常
							<view class="bumber" v-if="exceptionCount">
								{{exceptionCount}}
							</view>
						</view>
					</view>

				</view>
			</view>
			<view class="invite_list">
				<view class="invite_list-item" v-for="(item,index) in dataList" :key="index">
					<view class="invite_list-item-top acea-row row-middle row-between-wrapper">
						<view class="invite_list-item-top-left acea-row row-middle" @click="workerDetailed(item)">
							<image v-if="item.avatarUrl==null"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/10/38405b13b68b4ac3be692e812874e648.png">
							</image>
							<image v-else :src="item.avatarUrl" mode=""></image>
							<view class="invite_list-item-top-left-title">
								<view class="invite_list-item-top-left-title-name ">
									<view class="view">{{item.workerName}}</view>
									<u-icon name="arrow-right" size="14" style="margin-top: 2rpx;"></u-icon>
								</view>
							</view>
						</view>
						<view class="invite_list-item-top-right acea-row row-middle">
							<view class="status" v-if="item.normalStatus">异常</view> 自动-{{item.status}}
						</view>
					</view>
					<view class="cause  acea-row row-middle" v-if="item.normalStatus">
						<u-icon style="margin: 0 10rpx 0 16rpx;" name="info-circle" color="#FB2323"
							size="20"></u-icon>异常原因：{{item.reason||'暂无原因'}}
					</view>
					<view class="invite_list-item-middle acea-row row-between-wrapper">
						<view class="invite_list-item-middle-item flex-colum-center">
							<text>订单金额（元）</text>
							<view class="invite_list-item-middle-item-num">
								{{item.orderPrice}}
							</view>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<text>师傅工费</text>
							<view class="invite_list-item-middle-item-num">
								{{item.orderCost}}
							</view>
						</view>
						<view class="invite_list-item-middle-item flex-colum-center">
							<text>订单利润（元）</text>
							<view class="invite_list-item-middle-item-num">
								{{item.orderProfit}}
							</view>
						</view>
					</view>
					<view class="invite_list-item-mess">
						<view class="top acea-row row-between-wrapper">
							<text>订单编号：{{item.orderNumber}}</text>
							<view class="acea-row row-middle">
								<view @click="toDetail(item)">详情</view>
								<text></text>
								<view @click="$copy(item.orderNumber)">复制</view>
							</view>
						</view>
						<view class="bottom acea-row">
							<view class="acea-row row-middle" v-if="item.status=='已失效'">
								订单归属：
								<image v-if="item.avatarUrl==null"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/10/38405b13b68b4ac3be692e812874e648.png">
								</image>
								<image v-else :src="item.avatarUrl" mode=""></image>
								{{item.workerName}}
								<view class="benren" v-if="item.isSelf">本人</view>
							</view>
							<view v-else>
								完成服务时间：{{item.completeTime||'暂无'}}
							</view>
						</view>
						<template v-if="item.status=='已失效'">
							<view class="top">
								<text>失效原因：{{item.reason||'暂无原因'}}</text>
							</view>
							<view class="top" style="margin: 14rpx 0;">
								<text>失效时间：{{item.invalidTime||'-'}}</text>
							</view>
						</template>
					</view>
					<view class="invite_list-item-time acea-row" v-if="item.status=='待结算'">
						<view class="invite_list-item-time-btn acea-row">
							<view @click="close(1,item)">关闭结算</view>
							<!-- <view @click="close(2,item)">调整金额</view> -->
							<view @click="close(3,item)">立即结算</view>
						</view>
					</view>
					<view class="invite_list-item-time acea-row" style="justify-content: flex-start; color: #646566;"
						v-if="item.status=='已结算'">
						实际结算：¥{{item.orderCost}}
					</view>
				</view>
			</view>
		</z-paging>
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect_two' :closeOnClickOverlay='false'
			:actions="showTypeChange" :show="showAction_two"></u-action-sheet>
		<PopupBottom :title="popTitle==1?'支付订单结算金额':'调整金额'" :show="accountShow" @close="accountShow=false;"
			@confirm="confirmSelect">
			<view class="popMent" v-if="popTitle" style="margin-top: 30rpx;">
				<view class="error acea-row row-between-wrapper"
					v-show="Number(investmentBalance)<Number(info.orderCost)">
					<view class="error-left acea-row row-middle">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/9d02cce963824ced916a8e5551c7e0cb.png"
							mode=""></image>账户余额不足，请充值后再操作！
					</view>
					<view class="acea-row row-middle" @click="$jump('/subpkg/center/myMoney/invest/into')">
						去充值 <u-icon name="arrow-right" color="#FF991C" size="12" style="margin-top: 4rpx;"></u-icon>
					</view>
				</view>
				<view class="popMent-price">
					<view class="popMent-price-t acea-row row-center row-middle">
						<text style="margin: 18rpx 4rpx 0 0;">¥</text>
						<view>{{info.orderCost}}</view>
					</view>
					<view class="popMent-price-b">共1单，合计</view>
				</view>
				<view class="popMent-type">
					<view class="text">支付方式</view>
					<view class="popMent-type-items acea-row row-middle row-between-wrapper"
						v-for="(item,index) in payList" :key="item.type" @click="checkAll(item,index)"
						:class="{on:item.check}">
						<view class="popMent-type-items-left acea-row row-middle">
							<image :src="item.img" mode=""></image>
							<view class="acea-row" style="flex-direction: column;">
								<view class="">{{item.title}}</view>
								<text class="mess" v-if="item.type=='yue'">余额；{{investmentBalance}}</text>
								<text class="mess" v-else>由你所在团队负责人审核并进行付款结算</text>
							</view>
						</view>
						<view class="popMent-type-items-right acea-row row-middle">
							<image v-if="!item.check" :src="item.img_no" mode=""></image>
							<image v-else :src="item.img_yes" mode=""></image>
						</view>
					</view>
					<view class="btn" @click="surePay()">确认支付</view>
				</view>
			</view>
			<view class="popMoney" v-else style="margin-top: 30rpx;">
				<view class="popMoney-set acea-row row-middle">
					<text style="color:#FB2323; margin:6rpx 10rpx 0 0 ;">*</text>调整金额
					<input v-model="adjustDetailAmount" type="number" style=" margin-left: 22rpx; padding-left: 20rpx;"
						placeholder="请输入修改金额" />
				</view>
				<view class="popMoney-mess">
					<text>信息备注</text>
					<textarea maxlength="1000" v-model="remark" placeholder="请输入备注信息（非必填）"
						placeholder-style="color:#CCCCCC;"></textarea>
				</view>
				<view class="btn" @click="edit()">保存编辑</view>
			</view>
		</PopupBottom>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getWorkerSettlementList,
		putInvalid,
		putAdjust,
		putSettlement,
		getInvestmentClient
	} from "@/api/staging.js"
	import PopupBottom from "@/components/popup/bottom.vue"
	// const userId = '1813153736056799234'
	const img_no = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/73f7603eb003465fa5198a7fb04cd22e.png'
	const img_yes = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/0533ff643a9b40acaa0fb32980d58842.png'
	export default {
		components: {
			PopupBottom
		},
		data() {
			return {
				accountShow: false,
				type: '结算记录',
				typeTab: [{
						id: 0,
						label: "结算记录"
					},
					// {
					// 	id: 1,
					// 	label: "审核记录"
					// },
				],
				showTypeChange: [{
						type: 0,
						name: '师傅信息'
					},
					{
						type: 1,
						name: '订单号'
					},
					{
						type: '',
						name: '取消'
					},
				],
				status: 0,
				searchTypes: [{
						type: 0,
						label: '全部',
					},
					{
						type: 1,
						label: '待结算',
					},
					{
						type: 2,
						label: '已结算',
					},
					{
						type: 3,
						label: '已失效',
					}
				],
				payList: [{
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/3edae2d9dbea4d55809a7b86f0a6558d.png",
						type: "yue",
						title: "投资款账户余额",
						img_no: img_no,
						img_yes: img_yes,
						check: true
					},
					// {
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/a8f6b40b96af494e8ed5bc029cfc6e1f.png",
					// 	type: "pay",
					// 	title: "团队负责人代付",
					// 	img_no: img_no,
					// 	img_yes: img_yes,
					// 	check: false
					// },
				],
				showAction_two: false,
				searchValue: "",
				whereType: "师傅信息",
				dataList: [],
				where: {
					pageSize: 10,
					pageNum: 1,
					// 关键字类型：0 - 师傅信息； 1 - 订单号
					type: 0,
					keyword: "",
					userId: storage.get('ClientId'),
					status: "",
					// 状态: 0- 正常: 1 异常
					normalStatus: "",
					reviewStatus: ""
				},
				exceptionCount: "",
				popTitle: 0,
				info: {},
				adjustDetailAmount: "",
				remark: "",
				investmentBalance: "",
				userId: '',
			}
		},
		onLoad(options) {
			if (options && options.partnerId) {
				this.userId = options.partnerId
			}
		},
		onShow() {
			this.getList(1, 10)
		},
		methods: {
			getList(pageNo, pageSize) {
				this.where.pageNum = pageNo
				this.where.pageSize = pageSize
				// return
				getWorkerSettlementList(this.where).then(res => {
					if (res.pair) {
						this.exceptionCount = res.pair.value
					}
					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
			},
			refresh() {
				this.where = {
					pageSize: 10,
					pageNum: 1,
					// 关键字类型：0 - 师傅信息； 1 - 订单号
					type: this.where.type,
					keyword: this.where.keyword,
					userId: storage.get('ClientId'),
					status: this.where.status,
					// 状态: 0- 正常: 1 异常
					normalStatus: this.where.normalStatus,
					reviewStatus: this.where.normalStatus
				}
				this.$refs.paging.reload()
			},
			productSort(row, id) {
				if (id) {
					this.where.normalStatus = 1
					this.where.status = ""
					this.status = ''
				} else {
					if (row.type == 0) {
						this.where.status = ''
					} else {
						this.where.status = row.label;
					}
					this.status = row.type
					this.where.normalStatus = ''
				}

				this.$refs.paging.reload();
			},
			search(i) {
				if (i) {
					this.where.keyword = this.searchValue
				} else {
					this.where.keyword = this.searchValue = ''
				}
				this.$refs.paging.reload()
			},
			actionSelect_two(e) {
				console.log(e, "type///");
				if (e.name == '取消') {
					this.showAction_two = false
				} else {
					this.whereType = e.name
					this.where.type = e.type
					console.log(e.name, "22882");
					this.showAction_two = false
				}
			},
			yiCat() {
				this.where.normalStatus = this.where.normalStatus == 1 ? 0 : 1
				this.getList(1, 10)
			},
			close(type, item) {
				this.info = item
				switch (type) {
					case 1:
						this.$alert('关闭结算', 1, {
							content: '关闭后不能再次发起结算且记录失效，失效订单师傅工费无法通过系统进行结算！',
							confirmText: '确认关闭',
							cancelText: '我在想想',

						}).then((res) => {
							if (res.confirm) {
								let data = {
									userId: this.userId,
									detailsId: item.detailsId
								}
								putInvalid(data).then(res => {
									this.$toast('关闭成功')
									this.$refs.paging.reload()
								})
							}
						})
						break;
					case 2:
						// this.popTitle = 0
						// this.accountShow = true
						// this.adjustDetailAmount = this.info.orderCost || ''
						// this.remark = ''
						break;
					case 3:
						// this.popTitle = 1
						// this.accountShow = true
						if (item.orderStatus == '售后中') return this.$toast('该笔订单正处于售后中，不可结算')
						getInvestmentClient(this.userId).then(res => {
							this.investmentBalance = res.data.investmentBalance || ''
							let data = {
								investmentBalance: this.investmentBalance || '',
								isRepairOrder: item.isRepairOrder,
								detailId: item.detailsId || '',
								orderCost: item.orderCost || '',
								// partnerId: this.userId
							}
							this.$jump('/subpkg/staging/workers/tie?data=' + JSON.stringify(data))
						})
						break;
					default:
						break;
				}

			},
			// 调整金额
			edit() {
				if (!this.adjustDetailAmount) return this.$toast('金额不能为空')
				if (this.adjustDetailAmount <= 0) return this.$toast('金额不能小于0')
				let data = {
					userId: this.userId,
					detailsId: this.info.detailsId,
					adjustDetailAmount: this.adjustDetailAmount,
					remark: this.remark

				}
				putAdjust(data).then(res => {
					this.$toast('调整成功')
					this.accountShow = false
					this.$refs.paging.reload()
				})

			},
			surePay() {
				if (Number(this.investmentBalance) < Number(this.info.orderCost)) return this.$toast('余额不足')
				let data = {
					userId: this.userId,
					detailIds: [this.info.detailsId]
				}
				putSettlement(data).then(res => {
					this.$toast('支付成功')
					this.accountShow = false
					this.$refs.paging.reload()
				})

			},
			checkAll(i, index) {
				this.payList.forEach((item) => {
					if (item.type == i.type) {
						item.check = true
					} else {
						item.check = false
					}
				})
			},
			//师傅详情
			workerDetailed(item) {
				switch (item.levelName) {
					case '一星匠人':
						item.value = 1
						break;
					case '二星匠人':
						item.value = 2
						break;
					case '三星匠人':
						item.value = 3
						break;
					case '四星匠人':
						item.value = 4
						break;
					case '五星匠人':
						item.value = 5
						break;
				}
				let info = {
					workerId: item.workerId,
					info: {
						avatarUrl: item.avatarUrl,
						workerName: item.workerName,
						value: item.value,
					}
				}
				uni.navigateTo({
					url: '../../center/workerDetailed/workerDetailed?info=' + JSON.stringify(info)
				})

			},
			// 去详情
			toDetail(item) {
				if (item.isRepairOrder) {
					let info = {
						id: item.orderId,
						type: '返修'
					}
					this.$jump('/subpkg/car/repairingOrder/repairingOrder?info=' + JSON.stringify(info))
				} else {
					this.$jump('/subpkg/car/orderDetail/orderDetail?id=' + item.orderId)
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.inviteRewards {
		.two_change {
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
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
					bottom: -14rpx;
					left: 0;

				}
			}

			text:nth-last-child(1) {
				margin-right: 0rpx;
				margin-left: 15rpx;
			}
		}

		.data-box {
			background: #fff;
			padding: 22rpx 22rpx 0 22rpx;

			&.on {
				padding: 22rpx 22rpx 22rpx 22rpx;
			}

		}

		.input {
			// width: 563rpx;
			flex: 1;
			padding: 0 30rpx;
			background-color: rgb(242, 242, 242);
			border-radius: 50rpx;
			height: 62rpx;
			position: relative;

			input {
				width: 400rpx;
				height: 62rpx;
				margin-left: 20rpx;
				font-size: 26rpx;

			}

			.input-s {
				position: absolute;
				top: 19rpx;
				right: 40rpx;
				width: 25rpx;
				height: 25rpx;
				background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;
				background-size: 100% 100%;
			}

		}

		.header-type {
			background-color: #fff;
			font-size: 26rpx;
			justify-content: space-between;
			color: #969799;

			.filter-row {
				padding: 40rpx 30rpx 30rpx;
				font-size: 28rpx;

				&-yichang {
					border-left: 1rpx solid #969799;
					padding-left: 26rpx;
					position: relative;

					&.on {
						color: #A4D091;
					}

					&.on::after {
						content: "";
						width: 100rpx;
						position: absolute;
						height: 6rpx;
						background: #A4D091;
						border-radius: 3rpx;
						bottom: -24rpx;
						left: 30rpx;

					}

					.bumber {
						position: absolute;
						top: -14rpx;
						right: -14rpx;
						background-color: #FB2323;
						padding: 2rpx 10rpx;
						color: #fff;
						border-radius: 100rpx;
						font-size: 16rpx;
					}
				}

				.filter-row-item {
					font-size: 28rpx;
					margin-right: 30rpx;

					&:last-of-type {
						margin-right: 0;
					}

					&.on {
						color: #A4D091;
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

				.filter-row-item:nth-last-child(1) {
					margin-right: none;
				}


			}
		}

		/deep/ .uni-input-placeholder {
			color: rgb(192, 196, 204);
			font-size: 24rpx;
		}

		.invite_list {
			margin: 26rpx 0 0 0;
			padding: 0 30rpx 60rpx;

			&-item {
				// height: 362rpx;
				background: #FFFFFF;
				border-radius: 14rpx;
				margin-bottom: 22rpx;

				&-top {
					height: 96rpx;
					padding: 0 20rpx;
					line-height: 96rpx;

					&-left {
						image {
							width: 48rpx;
							height: 48rpx;
							border-radius: 50%;
							background-color: #F5F5F5;
						}

						&-title {
							font-size: 28rpx;
							color: #646566;
							font-weight: bold;
							margin-left: 10rpx;
							max-width: 360rpx;

							&-name {
								display: flex;

								.view {
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
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

					&-right {
						font-size: 24rpx;
						color: #404040;

						.status {
							width: 64rpx;
							height: 32rpx;
							background-color: #FB2323;
							line-height: 32rpx;
							text-align: center;
							color: #fff;
							border-radius: 6rpx;
							margin-right: 6rpx;
						}
					}
				}

				.cause {
					background: #FFF2F4;
					border-radius: 14rpx;
					font-size: 24rpx;
					color: #FB2323;
					margin: 0rpx 24rpx;
					padding: 16rpx 0;
				}

				&-middle {
					height: 144rpx;
					background: #F5F5F5;
					border-radius: 14rpx;
					margin: 20rpx 20rpx 24rpx;

					&-item {
						width: 33%;
						font-size: 25rpx;
						color: #A5A7A7;
						border-right: 1rpx solid rgba(0, 0, 0, 0.1);

						&-num {
							font-family: PingFangSC, PingFang SC;
							font-weight: 500;
							font-size: 29rpx;
							color: #A4D091;
							margin-top: 10rpx;
						}
					}

					&-item:nth-last-child(1) {
						border-right: none;
					}
				}

				&-mess {
					font-size: 26rpx;
					color: #646566;
					margin: 28rpx 22rpx 0;
					padding-bottom: 20rpx;

					.top {
						view {
							color: #A4D091;

							text {
								display: block;
								width: 3rpx;
								height: 30rpx;
								background-color: #A4D091;
								margin: 0 14rpx;
							}
						}
					}

					.bottom {
						margin: 13rpx 0;

						image {
							width: 40rpx;
							height: 40rpx;
							display: inline;
							border-radius: 50%;
							margin-right: 10rpx;
						}

						.benren {
							width: 66rpx;
							height: 34rpx;
							line-height: 34rpx;
							text-align: center;
							border: 1rpx solid #A4D091;
							background: #f0fff7;
							border-radius: 8rpx;
							font-size: 24rpx;
							color: #A4D091;
							margin-left: 14rpx;
						}
					}
				}

				&-time {
					height: 100rpx;
					line-height: 100rpx;
					font-size: 28rpx;
					color: #999999;
					justify-content: flex-end;
					padding: 0 20rpx;
					border-top: 1rpx solid #E5E5E5;

					&-btn {
						align-items: center;

						view {
							width: 140rpx;
							height: 54rpx;
							background: #FFFFFF;
							border-radius: 16rpx;
							border: 2rpx solid #A4D091;
							color: #A4D091;
							font-size: 28rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-left: 14rpx;
						}


						view:nth-last-child(1) {
							background: #A4D091;
							color: #FFFFFF;

						}

					}
				}
			}
		}
	}

	.popMent {
		padding: 0 30rpx;

		.error {
			height: 72rpx;
			background: #FDF3DC;
			border-radius: 8rpx;
			font-size: 24rpx;
			color: #FF991C;
			padding: 0 20rpx;

			&-left {
				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 6rpx;
				}
			}
		}

		&-price {
			text-align: center;
			width: 100%;
			color: #212121;
			margin: 40rpx 0 16rpx;

			&-t {
				margin: 0rpx 0 4rpx 0;

				text {
					font-size: 40rpx;
				}

				view {
					font-size: 64rpx;
				}
			}

			&-b {
				font-size: 28rpx;
				color: #999999;
			}
		}

		&-type {
			.text {
				font-size: 28rpx;
				color: #999999;
				margin-bottom: 20rpx;
			}

			&-items {
				height: 128rpx;
				background: #F5F5F5;
				border-radius: 16rpx;
				border: 1rpx solid #fff;
				padding: 0 34rpx;
				font-size: 28rpx;
				color: #212121;
				box-sizing: border-box;
				margin-bottom: 20rpx;

				&.on {
					background: #Fff;
					border: 1rpx solid #A4D091;
				}

				&-left {
					image {
						width: 64rpx;
						height: 64rpx;
						margin-right: 22rpx;
					}

					.mess {
						font-size: 24rpx;
						color: #999999;
					}
				}

				&-right {
					image {
						width: 32rpx;
						height: 32rpx;
					}
				}

			}


		}
	}

	.btn {
		height: 88rpx;
		background: #A4D091;
		border-radius: 8rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: bold;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 88rpx;
		text-align: center;
		margin-top: 42rpx;
	}

	.popMoney {
		padding: 0 22rpx;

		&-set {
			height: 96rpx;
			line-height: 96rpx;
			border-bottom: 1rpx solid #f5f5f5;

			/deep/ .uni-input-placeholder {
				color: #CCCCCC;
				font-size: 28rpx;
			}
		}

		&-mess {
			margin-top: 52rpx;

			text {
				font-size: 28rpx;
				color: #212121;
			}

			textarea {
				width: 100%;
				border: 1rpx solid #f5f5f5;
				margin-top: 10rpx;
				padding: 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>