 <template>
 	<view class="pages">
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
 			<text style="color: #212121;">冻结天数</text>
 			<view class="input">
 				<u--input style="margin: 24rpx 0  14rpx; width: 564rpx;" v-model="where.freezeDay" type="number"
 					placeholder="请输入(1天及以上）" border="surround" clearable></u--input>
 				<view class="input_s">天</view>
 			</view>
 			<text style="color: #999999;font-size: 24rpx;">编辑后，仅针对新产生的订单生效，已产生的订单不变</text>
 		</view>
 		<view class="btn" @click="sureSet">
 			保存设置
 		</view>
 	</view>
 </template>

 <script>
 	import {
 		putSettlementRule
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
 				}
 			}
 		},
 		onLoad(options) {
 			if (options && options.workerId) {
 				this.where.workerId = options.workerId
 			}
 		},
 		methods: {
 			sureSet() {

 				if (this.where.freezeDay < 1) return this.$toast('冻结时间不能小于1天')
 				putSettlementRule(this.where).then(res => {
 					this.$toast('设置成功')
 					setTimeout(() => {
 						this.$jump(-1)
 					}, 1000)
 				})
 			}
 		}
 	}
 </script>

 <style lang="scss" scoped>
 	.pages {
 		height: 100%;
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
 		width: 622rpx;
 		height: 88rpx;
 		background: #A4D091;
 		border-radius: 8rpx;
 		font-size: 32rpx;
 		color: #FFFFFF;
 		text-align: center;
 		line-height: 88rpx;
 		margin: 450rpx auto;
 	}
 </style>