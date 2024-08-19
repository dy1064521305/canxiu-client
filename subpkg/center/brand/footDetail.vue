<template>
	<view class="pages">
		<view class="title">签约信息</view>
		<view class="box">
			<view class="box-item acea-row row-between-wrapper">
				<text>签约人</text>
				<text>{{info.partner||'-'}}（ID：{{info.partnerId}}）</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>佣金结算方式</text>
				<text>{{info.settlementMethod==1?'一次性结算':'订单分成结算'||'-'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>佣金金额</text>
				<text>{{info.commission||'-'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>收款账号</text>
				<text>{{info.cardNumber||'-'}}</text>
			</view>
		</view>
		<view class="title">合同信息</view>
		<view class="box">
			<view class="box-item acea-row row-between-wrapper">
				<text>维保优惠比例</text>
				<text>{{info.maintenanceRatio||'-'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>维修优惠比例</text>
				<text>{{info.repairRatio||'-'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>集团支付</text>
				<text>{{info.groupPay==true?'是':'否'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>合同编码</text>
				<text>{{info.contractNo||'-'}}</text>
			</view>
			<view class="box-item ">
				<text>合同内容</text>
				<view class="box-item-img" v-if="info.contractImg&&info.contractImg.length>0">
					<image v-for="(item,index) in info.contractImg" :key="index" :src="item" mode=""></image>

				</view>
				<view style="margin-top: 20rpx;" v-else>-</view>
			</view>
		</view>
		<view class="title">服务团队</view>
		<view class="box">
			<view class="box-item acea-row row-between-wrapper">
				<text>业务经理</text>
				<text>{{info.exclusiveSale||'-'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>客服人员</text>
				<text>{{info.customerService||'-'}}</text>
			</view>
			<view class="box-item acea-row row-between-wrapper">
				<text>维修班长</text>
				<text>{{info.maintenanceSupervisor||'-'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getContractDetails
	} from "@/api/brand.js"
	export default {
		data() {
			return {
				id: '',
				info: {}
			}
		},
		onLoad(options) {
			if (options && options.id) {
				this.id = options.id
			}
			this.getList()
		},
		methods: {
			getList() {
				getContractDetails(this.id).then(res => {
					this.info = res.data
					let data = this.info
					if (data.contractImg && data.contractImg.length > 0) {
						data.contractImg = data.contractImg.split(',')
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100%;
		padding: 0 32rpx 50rpx;

		.title {
			font-size: 32rpx;
			color: #323233;
			margin: 20rpx 0;
			font-weight: bold;
		}

		.box {
			background: #FFFFFF;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #323233;

			&-item {
				border-bottom: 1rpx solid #f5f5f5;
				padding: 24rpx 20rpx;


				text:nth-child(1) {
					color: #969799;
				}

				&-img {
					width: 100%;
					display: flex;

					image {
						width: 144rpx;
						height: 144rpx;
						margin: 30rpx 20rpx 20rpx 0;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
</style>