<template>
	<view class="page">

		<div class="title">推广收益</div>
		<view class="cell">
			<view class="item">
				<view class="label acea-row row-middle">
					<view style="margin-right: 6rpx;">业务推广分成比 <text class="shenhe"
							v-if="partnerInfo.profitSharingAuditStatus">审核中</text>
					</view>
				</view>
				<view class="value">
					<view class="text acea-row row-middle"> {{partnerInfo.profitSharing||0}}%
						<view class="acea-row row-middle" v-if="!partnerInfo.profitSharingAuditStatus"
							style="color:#3882F1 ; margin-left: 12rpx;" @click="editR(1)">修改 <u-icon name="arrow-right"
								color="#3882F1" style="margin-top: 4rpx;" size="13"></u-icon></view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="label acea-row row-middle">
					<text style="margin-right: 6rpx;">订单消化分成比<text class="shenhe"
							v-if="partnerInfo.orderConsumeSharingAuditStatus">审核中</text></text>
				</view>
				<view class="value">
					<view class="text  acea-row row-middle"> {{partnerInfo.orderConsumeSharing||0}}%
						<view v-if="!partnerInfo.orderConsumeSharingAuditStatus" class="acea-row row-middle"
							style="color:#3882F1 ; margin-left: 12rpx;" @click="editR(2)">修改 <u-icon name="arrow-right"
								color="#3882F1" style="margin-top: 4rpx;" size="13"></u-icon></view>
					</view>
				</view>
			</view>

		</view>
		<div class="title">合作签约信息</div>
		<view class="cell">
			<view class="item" v-for="item in messList" :key="item.id">
				<view class="label">
					{{item.label}}
				</view>
				<view class="value">
					<text class="text"> {{item.value||'-'}}</text>
					<text class="iconfont icon" style="margin:0 -14rpx 0 -12rpx;" v-if="item.id==7">&#xe604;</text>
				</view>
			</view>

		</view>
		<editRatio :show="editRatioShow" @sureEdit="getRadio" :title="radioTitle" :type="editType"
			@close="closeeditRatio"></editRatio>
	</view>
</template>

<script>
	import editRatio from "./components/editRatio.vue"
	import storage from '@/utils/storage'
	import {
		getTeamSharing,
		postEditSharing
	} from "@/api/brand.js"
	export default {
		components: {
			editRatio
		},
		data() {
			return {
				editRatioShow: false,
				editType: "",
				radioTitle: "",
				messList: [{
						id: 1,
						label: "真实姓名",
						value: "",
						key: "realName",
					},
					{
						id: 2,
						label: "联系电话",
						value: "",
						key: "cellPhone",
					}, {
						id: 3,
						label: "合伙人类型",
						value: "",
						key: "partnerType",
					}, {
						id: 4,
						label: "所在城市",
						value: "",
						key: "region",
					}, {
						id: 5,
						label: "上级邀请人",
						value: "",
						key: "superior",
					}
				],
				incomeList: [{
						label: "业务推广分成比",
						tip: "",
						ratio: "0.06",
						active: false,
						key: ""
					},
					{
						label: "订单消化分成比",
						tip: "",
						ratio: "0.06",
						active: false,
						key: "profitSharing"
					},
				],
				partnerInfo: {},
				partnerId: ""

			}
		},
		computed: {},
		onLoad(options) {
			if (options && options.partnerId) {
				this.partnerId = options.partnerId
			}
			this.getInfo()
		},
		methods: {
			getInfo() {
				getTeamSharing(this.partnerId).then(res => {
					this.partnerInfo = res.data
					let data = res.data
					if (data) {
						this.messList.forEach(item => {
							if (item.key == 'partnerType') {
								item.value = data.partnerType == 1 ? '中级合伙人' : data.partnerType == 2 ?
									'高级合伙人' : '初级合伙人'
							} else {
								item.value = data[item.key]
							}
						})
					}
				})
			},
			editR(i) {
				this.editType = '' + i
				console.log(this.editType, "editType");
				if (i == 1) {
					this.radioTitle = '修改业务推广分成比例'
				} else {
					this.radioTitle = '修改订单消化分成比例 '
				}
				this.editRatioShow = true
			},
			closeeditRatio(e) {
				this.editRatioShow = false
			},
			getRadio(e) {
				if (!e || e < 0 || e > 100) return this.$toast('请输入0-100的百分比')
				console.log(e, "ee");
				let data = {
					userId: storage.get('ClientId'),
					editPartnerId: this.partnerId,
					type: this.editType,
					sharing: e
				}
				postEditSharing(data).then(res => {
					this.$toast('操作成功')
					this.editRatioShow = false
					this.getInfo()
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		position: relative;
		padding: 0rpx 30rpx 20rpx;
		box-sizing: border-box;

		.title {
			height: 78rpx;
			font-size: 28rpx;
			color: #646566;
			line-height: 78rpx;
		}

		.kefu {
			height: 90rpx;
			line-height: 86rpx;
			background: #F3B23E;
			border-radius: 16rpx 16rpx 0rpx 0rpx;
			margin-bottom: -10rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			padding-left: 34rpx;
		}

		.cell {
			background-color: #fff;
			padding: 14rpx 30rpx;
			border-radius: 16rpx;



			.item {
				position: relative;
				height: 90rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mask {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
				}

				&:first-of-type {
					border-top: 0;
				}

				.label {
					font-size: 28rpx;
					color: #666666;

					.shenhe {
						padding: 2rpx 14rpx;
						background-color: #A4D091;
						color: #fff;
						border-radius: 30rpx;
						font-size: 24rpx;
						margin-left: 10rpx;
					}
				}

				.value {
					display: flex;
					align-items: center;
					color: #212121;

					.text {
						font-size: 28rpx;
					}

					.null {
						color: #C0C4CC;
					}
				}

				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
				}

				.icon {
					text-align: right;
					color: rgba(192, 196, 204, 1);
					font-size: 40rpx;
					width: 50rpx;
				}
			}
		}
	}

	.bubble {
		width: 400rpx;
		position: absolute;
		bottom: 50rpx;
		left: -186rpx;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		color: #fff;

		&::after {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border: 10rpx solid transparent;
			border-top-color: #000;
			position: absolute;
			bottom: -18rpx;
			right: 230rpx;
		}
	}
</style>