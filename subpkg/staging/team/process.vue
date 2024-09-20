<template>
	<view class="pages">
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<view slot='top'>
				<u-navbar placeholder>
					<view class="u-nav-slot" slot="left">
						<u-icon name="arrow-left" size="19" @click="$jump(-1)"></u-icon>
					</view>
					<!-- 	<view style="display: flex; align-items: center;" slot="center" @click="showAction=true">
						{{type}}<u-icon style="margin-left: 10rpx;" name="arrow-down-fill" size="10"></u-icon>
					</view> -->
					<view class="two_change" style="display: flex; align-items: center;" slot="center">
						<text v-for="(item) in type" :key="item.id" :class="{on:where.auditSource==item.id}"
							@click="typeClick(item)">{{item.label}}</text>
					</view>

				</u-navbar>
				<view class="data-box acea-row row-middle">
					<view class="input acea-row row-middle">
						<view style="display: flex;align-items: center; font-size: 28rpx;"
							@click="showAction_three=true">
							{{whereActType}}
							<view class="acea-row row-middle" style="margin-left: 10rpx;">
								<u-icon name="arrow-down-fill" size="10"></u-icon>
							</view>
						</view>
						<input type="text" @confirm="searchActivity(1)" @input="seachValue" v-model="searchActValue"
							:placeholder="'请输入'+whereActType">
						<view class="" style="position: absolute; top: 17rpx; right: 70rpx;">
							<u-icon v-if="searchActValue" @click="searchActivity()" color="#D8DCDB"
								name="close-circle"></u-icon>
						</view>
						<view class="input-s" @click="searchActivity(1)"></view>

					</view>
					<view class="shaixuan" @click="toSetS()">
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/eb78f3eb65ec46fc92b1245b17c64838.png"
							mode=""></image>
					</view>

				</view>
				<view class="header-type">
					<view class="filter-row acea-row row-between-wrapper">
						<view v-for="(item, index) in searchTypes" :key="index" class="filter-row-item acea-row"
							:class="{on: where.status === item.type}" @click="productSort(item.type)">
							{{item.label}}
						</view>
					</view>
				</view>
			</view>
			<view class="invite_list">
				<view class="invite_list-item" v-for="(item,index) in dataList" :key="index">
					<view class="invite_list-item-top acea-row row-between-wrapper">
						<text v-if="where.auditSource==0">申请人：{{item.applyName}}</text>
						<text v-else>{{item.type==1?'修改业务推广分成比例':item.type==2?"修改订单消化分成比例":'品牌入驻审核'}}</text>
						<view class="invite_list-item-top-status"
							:style="{color:item.status=='1'?'#A4D091':item.status=='2'?'#E02020':'#F3B23E'}">
							{{item.status=='1'?'已通过':item.status=='2'?'已驳回':'待审核'}}
						</view>
					</view>
					<view class="invite_list-item-mess">

						<view class="invite_list-item-mess-evey acea-row"
							v-if="where.auditSource==1&&(item.status==1||item.status==0)">
							<text>审核人：</text>
							<view>{{item.auditName||'-'}}</view>
						</view>
						<view class="invite_list-item-mess-evey acea-row" v-else>
							<text>审核类型：</text>
							<view>{{item.type==1?'修改业务推广分成比例':item.type==2?"修改订单消化分成比例":'品牌入驻审核'}}</view>
						</view>
						<view class="invite_list-item-mess-evey acea-row">
							<text>申请内容：</text>
							<view class="">{{item.content||'-'}}</view>
						</view>
						<view class="invite_list-item-mess-evey acea-row"
							v-if="where.auditSource==1&&(item.status==1||item.status==2)">
							<text>审核时间：</text>
							<view class="">{{item.auditTime||'-'}}</view>
						</view>
						<view class="invite_list-item-mess-evey acea-row" v-else>
							<text>提交时间：</text>
							<view class="">{{item.updateTime||'-'}}</view>
						</view>
						<view class="invite_list-item-mess-evey acea-row" v-if="item.status==1||item.status==2">
							<text>审核备注：</text>
							<view class="">{{item.remark||'-'}}</view>
						</view>
					</view>
					<view class="invite_list-item-time acea-row" v-if="where.auditSource==0&&item.status==0">
						<view class="invite_list-item-time-btn acea-row">
							<view @click="showPhoneHandle(item.cellPhone)">联系ta
							</view>
							<view v-if="item.status==0" @click="toSet(JSON.stringify(item),1)">信息审核</view>
						</view>
					</view>
					<view class="invite_list-item-time acea-row" v-if="where.auditSource==1">
						<view class="invite_list-item-time-btn acea-row">
							<view @click="showPhoneHandle(item.auditPhone)">联系审核人
							</view>
						</view>
					</view>
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
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect_three' :closeOnClickOverlay='false'
			:actions="showActTypeChange" :show="showAction_three"></u-action-sheet>
		<PopupBottom :title="shenheTitle" :show="accountShow" @tap-mask="close()" @close="close()">
			<view class="popMoney" style="margin-top: 30rpx;" v-if="shenheTitle=='立即审核'">
				<view class="popMoney-set acea-row row-middle">
					<text style="margin-right: 50rpx;">审核结果</text>
					<u-radio-group v-model="whereSh.status" placement="row">
						<u-radio activeColor="#F3B23E" :name="1" label="审核通过"></u-radio>
						<text style="margin-right: 50rpx;"></text>
						<u-radio activeColor="#F3B23E" :name="2" label="审核驳回"></u-radio>
					</u-radio-group>
				</view>
				<view class="popMoney-mess">
					<text>信息备注</text>
					<textarea maxlength="1000" v-model="whereSh.remark" placeholder="请输入备注信息（非必填）"
						placeholder-style="color:#CCCCCC;"></textarea>
				</view>
				<view class="btn" @click="edit()">保存编辑</view>
			</view>
			<view class="popContent" v-else>
				<view class="popContent-title">
					审核类型
				</view>
				<view class="popContent-con acea-row row-between-wrapper">
					<view class="popContent-con-item acea-row row-middle row-center" @click="add(item.value)"
						:class="{on:item.activity}" v-for="(item,index) in shenheType" :key="index">
						{{item.label}}
					</view>
				</view>
				<view class="btn" @click="close()">保存编辑</view>
			</view>
		</PopupBottom>
	</view>
</template>

<script>
	import Header from '@/components/header/index.vue';
	import PopupBottom from "@/components/popup/bottom.vue"
	import {
		putQueryList,
		postVerifyBankCard,
		putImmediate,
		getAuditList,
		putTeamAudit
	} from "@/api/brand.js"
	import {
		callPhone
	} from '@/utils/phone.js'
	import storage from '@/utils/storage'
	export default {
		components: {
			Header,
			PopupBottom
		},
		data() {
			return {
				shenheTitle: "立即审核",
				shenheType: [{
						label: "全部类型",
						value: "",
						activity: false
					},
					{
						label: "品牌入驻",
						value: "0",
						activity: false
					},
					{
						label: "业务推广分成比例",
						value: "1",
						activity: false
					},
					{
						label: "订单消耗分成比例",
						value: "2",
						activity: false
					},
				],
				value: "",
				accountShow: false,
				showAction_three: false,
				noCardShow: false,
				showPhone: false,
				dataList: [],
				type: [{
						id: 0,
						label: "待我审核"
					},
					{
						id: 1,
						label: "我发起的"
					},
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
						label: '已通过',

					},
					{
						type: 2,
						label: '已驳回',

					}
				],
				showActTypeChange: [{
						name: '申请人'
					},
					{
						name: '手机号码'
					},
					{
						name: '取消'
					},
				],
				scrollTop: 0,
				where: {
					userId: storage.get('ClientId'),
					searchValue: "",
					// 审核状态；0-待审核，1审核通过，-1审核驳回
					status: "",
					realName: "",
					cellphone: "",
					auditSource: 0,
					pageNum: 1,
					pageSize: 10,
					typeList: []
				},
				whereSh: {
					status: 1,
					remark: ""
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
				searchActValue: "",
				whereActType: '申请人'
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
				this.where.auditSource = this.where.auditSource
				getAuditList(this.where).then(res => {
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
				this.where.status = status;
				this.$refs.paging.reload();
			},
			typeClick(item) {
				console.log(item, "itemitem");
				this.where.auditSource = item.id
				this.$refs.paging.reload();
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
			toSet(items, id) {
				let item = JSON.parse(items)
				this.shenheTitle = '立即审核'
				this.whereSh.auditId = item.auditId
				this.accountShow = true
			},
			toSetS() {
				this.shenheTitle = '设置筛选条件'
				this.accountShow = true
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
			},
			searchActivity(i) {
				if (i) {
					if (this.whereActType == '申请人') {
						this.where.realName = this.searchActValue
						this.where.cellphone = ""
					} else {
						this.where.cellphone = this.searchActValue
						this.where.realName = ""
					}
				} else {
					this.where.realName = this.where.cellphone = this.searchActValue = ''
				}
				this.$refs.paging.reload()
			},
			actionSelect_three(e) {
				console.log(e, "type///");
				if (e.name == '取消') {
					this.showAction_three = false
				} else {
					this.whereActType = e.name
					console.log(e.name, "22882");
					this.showAction_three = false
				}
			},
			edit() {
				putTeamAudit(this.whereSh).then(res => {
					this.$toast('操作成功')
					this.accountShow = false
					this.$refs.paging.reload();
				})
			},
			add(value) {
				this.shenheType.forEach(item => {
					if (item.value == value) {
						item.activity = !item.activity
						if (item.activity) {
							this.where.typeList.push(item.value)
						} else {
							this.where.typeList = this.where.typeList.filter(i => i != item.value);
						}
					}

				})

			},
			close() {
				if (this.shenheTitle == '立即审核') {
					this.accountShow = false;
				} else {
					this.accountShow = false;
					this.$refs.paging.reload();
				}
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
				background: $pageColor;
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

	.header-type {
		font-size: 26rpx;
		justify-content: space-between;
		background-color: #FFFFFF;

		.filter-row {
			box-sizing: border-box;
			height: 88rpx;
			border-top: 1rpx solid #ececec;
			padding: 0 40rpx;

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
						background: $pageColor;
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

	.invite_list {
		// margin: 270rpx 0 0 0;
		margin-top: 20rpx;
		padding: 0 30rpx 60rpx;

		.invite_list-item {
			// height: 362rpx;
			background: #FFFFFF;
			border-radius: 14rpx;
			margin-bottom: 22rpx;
			box-sizing: border-box;

			&-top {
				height: 96rpx;
				font-size: 28rpx;
				color: #212121;
				padding: 0 26rpx;
				border-bottom: 1rpx solid #f5f5f5;

				&-status {
					font-size: 24rpx;
					color: #F3B23E;
				}
			}

			&-mess {
				font-size: 24rpx;
				color: #999999;
				padding: 20rpx 26rpx;

				&-evey {
					margin-bottom: 10rpx;
				}
			}


			&-time {
				height: 112rpx;
				font-size: 28rpx;
				color: #999999;
				justify-content: flex-end;
				padding: 0 26rpx;


				&-btn {
					align-items: center;

					view {
						width: 140rpx;
						height: 54rpx;
						background: #FFFFFF;
						border-radius: 8rpx;
						border: 2rpx solid $pageColor;
						color: $pageColor;
						font-size: 24rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}


					view:nth-last-child(1) {
						background: $pageColor;
						color: #FFFFFF;
						margin-left: 14rpx;
					}


				}
			}
		}
	}

	.data-box {
		background: #fff;
		padding: 22rpx 22rpx 20rpx 22rpx;

		&.on {
			padding: 22rpx 22rpx 22rpx 22rpx;
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
				width: 340rpx;
				height: 62rpx;
				margin-left: 20rpx;
				font-size: 26rpx;
			}

			.input-s {
				position: absolute;
				top: 19rpx;
				right: 30rpx;
				width: 25rpx;
				height: 25rpx;
				background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;
				background-size: 100% 100%;
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
			background: $pageColor;
			border-radius: 8rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			margin-top: 90rpx;
		}
	}


	.shaixuan {
		margin: 0 10rpx 0 16rpx;

		image {
			width: 30rpx;
			height: 30rpx;
		}
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

		.btn {
			height: 88rpx;
			background: $pageColor;
			border-radius: 8rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 88rpx;
			text-align: center;
			margin-top: 42rpx;
		}

	}

	.popContent {
		&-title {
			height: 96rpx;
			font-size: 32rpx;
			color: #212121;
			line-height: 96rpx;
			text-align: left;
			font-style: normal;
			border-bottom: 1rpx solid #f5f5f5;
			padding-left: 30rpx;
		}

		&-con {
			padding: 32rpx 24rpx;
			font-size: 24rpx;
			color: #212121;

			&-item {
				width: 212rpx;
				height: 56rpx;
				background: #F2F2F2;
				border-radius: 8rpx;
				margin-bottom: 20rpx;

				&.on {
					background: $pageColor;
					color: #FFFFFF;
				}
			}
		}

		.btn {
			height: 80rpx;
			background: $pageColor;
			border-radius: 8rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
			margin-top: 42rpx;
			margin: 200rpx 30rpx 0rpx;
		}
	}
</style>