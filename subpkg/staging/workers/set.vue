 <template>
 	<view class="pages" :style="{height: clientHeight+'px'}">
 		<view>
 			<view class="title">结算规则</view>
 			<view class="box">
 				<view class="box-top acea-row row-middle">
 					<image
 						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/19/2a62ece157694edcb8ca9f621384fa6f.png"
 						mode=""></image>
 					自动结算
 					<!-- <view class="acea-row ">
						<radio-group @change="radioChange" class="acea-row">
							<label style="width: 280rpx;" class="acea-row row-middle" v-for="(item, index) in radio"
								:key="item.value">
								<view style="position: relative; top:4rpx;">
									<radio :value="item.value" style="transform:scale(0.7)" color="#A4D091"
										:checked="item.value == where.settlementRule" />
								</view>
								<view>{{item.label}}</view>
							</label>
						</radio-group>
					</view> -->
 				</view>
 				<view class="box-me">
 					<view style="margin-bottom: 10rpx;"> 用户完成验收后，超过工费冻结时长后系统会自动将服务 费结算给到接单师傅钱包账号中；</view>
 					<text style="color:#ED6A0C ; margin-top: 10rpx;">*当您的钱包余额不足时，将无法自动结算</text>
 				</view>
 			</view>
 			<view class="title">规则设置</view>
 			<view class="box">
 				<view style="margin-bottom: 20rpx; color: #646566; font-size: 28rpx;">冻结天数</view>
 				<view class="input">
 					<u--input style="width: 564rpx;" v-model="where.freezeDay" type="number" placeholder="请输入(1天及以上）"
 						border="surround" clearable></u--input>
 					<view class="input_s">天</view>
 				</view>
 				<view style="color: #999999;font-size: 24rpx; margin-top: 16rpx;">编辑后，仅针对新产生的订单生效，已产生的订单不变</view>
 			</view>
 		</view>

 		<view class="btn" @click="sureSet">
 			保存设置
 		</view>
 	</view>
 </template>

 <script>
 	import {
 		putSettlementRule,
 		getOrderSetList
 	} from "@/api/staging.js"
 	export default {
 		data() {
 			return {
 				radio: [{
 					value: '0',
 					label: "自动结算"
 				}],
 				where: {
 					workerId: "",
 					settlementRule: 0,
 					freezeDay: '',
 				},
 				clientHeight: "",
 				afterTimeout: "",
 			}
 		},
 		onLoad(options) {
 			if (options && options.workerId) {
 				this.where.workerId = options.workerId
 			}
 			if (options && options.day) {
 				this.where.freezeDay = options.day == 'null' ? '' : options.day
 			}
 			this.getClineHeight()
 			this.getSet()
 		},
 		methods: {
 			getSet() {
 				getOrderSetList({
 					pageNum: 1,
 					pageSize: 10
 				}).then(res => {
 					let row = res.rows;
 					if (row.length > 0) {
 						let rowOne = res.rows[0]
 						this.afterTimeout = rowOne.afterTimeout || ''
 					}
 				});
 			},
 			sureSet() {
 				if (Number(this.where.freezeDay) < 1) return this.$toast('冻结时间不能小于1天')
 				if (Number(this.where.freezeDay) <= this.afterTimeout) {
 					this.$alert('温馨提示', 1, {
 						content: '所设置的冻结天数小于订单售后有效期（' + this.afterTimeout +
 							'天），如用户发起售后服务已结算的订单金额将无法追回。',
 						confirmText: '保存设置',
 						cancelText: '重新设置',
 					}).then((res) => {
 						if (res.confirm) {
 							putSettlementRule(this.where).then(res => {
 								this.$toast('设置成功')
 								setTimeout(() => {
 									this.$jump(-1)
 								}, 1000)
 							})
 						}

 					}).catch((res) => {
 						return
 					})
 				} else {
 					putSettlementRule(this.where).then(res => {
 						this.$toast('设置成功')
 						setTimeout(() => {
 							this.$jump(-1)
 						}, 1000)
 					})
 				}

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
 		}
 	}
 </script>

 <style lang="scss" scoped>
 	.pages {
 		// height: 100%;
 		display: flex;
 		flex-direction: column;
 		justify-content: space-between;
 		padding: 0 22rpx;

 		.title {
 			font-size: 28rpx;
 			color: #646566;
 			margin: 22rpx 0 22rpx 26rpx;
 		}

 		.box {
 			background: #FFFFFF;
 			border-radius: 16rpx;
 			padding: 30rpx 26rpx 34rpx 26rpx;

 			.input {
 				position: relative;

 				.input_s {
 					position: absolute;
 					top: 0;
 					right: 0;
 					width: 64rpx;
 					height: 100%;
 					background: #A4D091;
 					font-size: 32rpx;
 					text-align: center;
 					line-height: 64rpx;
 					color: #FFFFFF;
 					border-radius: 0rpx 10rpx 10rpx 0rpx;
 				}
 			}

 			&-top {
 				font-size: 28rpx;
 				color: #646566;

 				image {
 					width: 36rpx;
 					height: 36rpx;
 					margin-right: 8rpx;
 					;
 				}
 			}

 			&-me {
 				margin: 20rpx 0 0 40rpx;
 				color: #999999;
 				font-size: 24rpx;
 			}
 		}
 	}

 	.btn {
 		margin: 0rpx auto 70rpx;
 		width: 622rpx;
 		height: 88rpx;
 		background: #A4D091;
 		border-radius: 8rpx;
 		font-size: 32rpx;
 		color: #FFFFFF;
 		text-align: center;
 		line-height: 88rpx;
 	}
 </style>