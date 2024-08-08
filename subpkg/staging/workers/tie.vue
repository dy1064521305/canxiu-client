 <template>
 	<view class="pages" :style="{height: clientHeight+'px'}">

 		<view>
 			<view class="pages-tip  acea-row row-middle">
 				<u-icon name="info-circle" color="#fb7274" size="18"></u-icon> <text style="margin-left: 14rpx;">
 					请仔细核对订单结算金额，确认结算后不可撤回！</text>
 			</view>
 			<view class="pages-money">
 				<view>实付金额</view>
 				<view class="value price-font">
 					<text class="value-icon" style="margin-top: 14rpx;">￥</text>
 					<input v-model="where.detailsAmount" placeholder="请输入实付金额" placeholder-style="color:#999999;"
 						type="digit" />
 					<text v-if="where.detailsAmount!=amount"
 						style="color: #212121; font-size: 28rpx; margin-top: 14rpx;margin-right: 20rpx;"
 						@click="allOut">恢复默认</text>
 				</view>
 				<view class="wenan acea-row row-middle">
 					<text style="color: #212121;">信息备注</text>
 					<textarea maxlength="1000" v-model="where.remark" placeholder="请输入（非必填）"
 						placeholder-style="color:#CCCCCC;"></textarea>
 				</view>
 			</view>
 			<view class="title">付款方式</view>
 			<view class="popMent-type-items acea-row row-middle row-between-wrapper" v-for="(item,index) in payList"
 				:key="item.type" @click="checkAll(item,index)" :class="{on:item.check}">
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
 		</view>

 		<view class="btn">
 			<view class="tit acea-row row-middle" @click="$jump('/subpkg/center/myMoney/invest/into')"
 				v-show="Number(investmentBalance)<Number(where.detailsAmount)">
 				<u-icon name="info-circle" color="#ED6A0C" size="18"></u-icon> <text style="margin-left: 14rpx;">
 					账户余额不足，请充值后再操作！</text>
 			</view>
 			<view class="view" @click="sureSet"> 保存设置</view>

 		</view>
 	</view>
 </template>

 <script>
 	import {
 		putImmediateSettlement
 	} from "@/api/staging.js"
 	import storage from '@/utils/storage'
 	const img_no = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/73f7603eb003465fa5198a7fb04cd22e.png'
 	// const img_yes = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/0533ff643a9b40acaa0fb32980d58842.png'
 	const img_yes = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/08/2c0a1488ef51413089810b138ebd6379.png'
 	export default {
 		data() {
 			return {
 				radio: [{
 					value: '0',
 					label: "自动结算"
 				}],
 				where: {
 					userId: storage.get('ClientId'),
 					detailId: "",
 					isRepairOrder: "",
 					detailsAmount: "",
 					remark: ""
 				},
 				clientHeight: "",
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
 				investmentBalance: 0,
 				amount: ""
 			}
 		},
 		onLoad(options) {
 			if (options && options.data) {
 				let data = JSON.parse(options.data)
 				this.where.detailId = data.detailId
 				this.where.isRepairOrder = data.isRepairOrder
 				this.where.detailsAmount = data.orderCost
 				this.investmentBalance = data.investmentBalance || ''
 				this.amount = data.orderCost
 			}
 			this.getClineHeight()
 		},
 		methods: {
 			sureSet() {
 				if (Number(this.where.detailsAmount) <= 0) return this.$toast('实付金额不能小于等于0')
 				if (Number(this.investmentBalance) < Number(this.where.detailsAmount)) return this.$toast('余额不足')
 				putImmediateSettlement(this.where).then(res => {
 					this.$toast('支付成功')
 					setTimeout(() => {
 						this.$jump(-1)
 					}, 1000)
 				})
 			},
 			//获取可视区域高度
 			getClineHeight() {
 				const res = uni.getSystemInfo({
 					success: (res => {
 						this.clientHeight = res.windowHeight;
 						// this.clientHeight = res.windowHeight - uni.upx2px(80) - this.getBarHeight();
 					})
 				});
 			},
 			allOut() {
 				this.where.detailsAmount = this.amount
 			}
 		}
 	}
 </script>

 <style lang="scss" scoped>
 	.pages {
 		// height: 100%;
 		display: flex;
 		flex-direction: column;
 		justify-content: space-between;

 		// padding: 0 22rpx;
 		&-tip {
 			line-height: 80rpx;
 			height: 80rpx;
 			background: #FFF2F4;
 			font-size: 28rpx;
 			color: #fb7274;
 			line-height: 80rpx;
 			padding-left: 32rpx;
 		}

 		&-money {
 			background: #FFFFFF;
 			border-radius: 16rpx;
 			padding: 24rpx 22rpx 0;
 			font-size: 28rpx;
 			color: #212121;
 			margin: 20rpx 22rpx 0;

 			.value {
 				display: flex;
 				align-items: center;
 				margin-top: 54rpx;

 				input {
 					font-size: 70rpx;
 					// height: 66rpx;
 					height: 100%;
 					flex: 1;
 					display: flex;
 					align-items: center;
 					font-size: 40rpx;
 					margin-left: 24rpx;
 				}
 			}

 			.wenan {
 				min-height: 90rpx;
 				line-height: 90rpx;
 				font-size: 28rpx;
 				color: #999999;
 				border-top: 1rpx solid #E5E5E5;
 				margin-top: 20rpx;

 				textarea {
 					flex: 1;
 					height: 90rpx;
 					// line-height: 90rpx;
 					padding-top: 26rpx;
 					margin-left: 30rpx;
 					box-sizing: border-box;
 				}
 			}
 		}

 		.title {
 			font-size: 28rpx;
 			color: #646566;
 			margin: 22rpx 0 22rpx 26rpx;
 		}

 		.popMent-type-items {
 			height: 128rpx;
 			background: #F5F5F5;
 			border-radius: 16rpx;
 			border: 1rpx solid #fff;
 			padding: 0 34rpx;
 			font-size: 28rpx;
 			color: #212121;
 			box-sizing: border-box;
 			margin: 0 22rpx 20rpx;

 			&.on {
 				background: #Fff;
 				border: 1rpx solid #FFFBE8;
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

 	.btn {
 		width: 100%;
 		background: #fff;
 		border-radius: 8rpx;
 		font-size: 32rpx;
 		color: #FFFFFF;
 		padding: 20rpx 0 40rpx;
 		position: relative;

 		.tit {
 			position: absolute;
 			width: 750rpx;
 			height: 80rpx;
 			background: #FFFBE8;
 			border-radius: 16rpx 16rpx 0rpx 0rpx;
 			top: -80rpx;
 			left: 0;
 			font-size: 28rpx;
 			color: #ED6A0C;
 			line-height: 80rpx;
 			padding-left: 34rpx;
 		}

 		.view {
 			width: 686rpx;
 			height: 88rpx;
 			background: #F3B23E;
 			line-height: 88rpx;
 			border-radius: 8rpx;
 			color: #FFFFFF;
 			text-align: center;
 			font-size: 28rpx;
 			margin: 0 auto;
 		}
 	}
 </style>