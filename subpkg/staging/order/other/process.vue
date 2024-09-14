<template>
	<view class="page">
		<view style="margin:0rpx 50rpx ; padding: 40rpx 0;">
			<!-- 	<view style="text-align: center;margin-bottom: 40rpx;font-weight: bold;">
				订单跟踪
			</view> -->
			<view class="step">
				<view v-for="(item,index) in step" :key='index' class="box">
					<view class="left">
						<view :class="[index==0?'circle':'circle-green']">

						</view>
						<view :class="[index==0?'line-xu':'line']" v-if="index!=step.length-1">

						</view>
					</view>
					<view class="right">
						<view class="top">
							<text :class="[index==0?'green':'']">{{item.name}}</text><text
								:class="[index==0?'green':'gray']" style="font-size: 27rpx;">{{item.time}}</text>
						</view>
						<view class="bottom">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as order from '@/api/order.js'
	export default {
		data() {
			return {
				step: [],
				orderId: ""
			}
		},
		onLoad(options) {
			if (options && options.orderId) {
				this.orderId = options.orderId
			}
			this.getMess()
		},
		methods: {
			getMess() {
				//获取追踪列表
				order.orderTrackList({
					orderId: '1828720678350249985',
					requester: 'c'
				}).then(res => {
					//	console.log(res);
					this.step = []
					res.data.forEach(item => {
						this.step.push({
							name: item.trackStatus,
							time: item.trackTime,
							content: item.trackContent
						})
					})
					// this.step.push({
					// 	name: this.status,
					// 	content: this.info.orderStatus == '待上门' ? this.content + ',预计时间' + this
					// 		.info
					// 		.expectTime : this.content,
					// })
					this.step = this.step.reverse()
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		background-color: #fff;

		.step {
			overflow: scroll;
			overscroll-behavior: none;

			.box {
				display: flex;

				.left {

					.circle,
					.circle-green {

						margin: 6rpx;
						border-radius: 50%;
					}

					.circle {
						width: 29rpx;
						height: 29rpx;
						border: 1px solid #A4D091;

					}

					.circle-green {
						width: 32rpx;
						height: 32rpx;
						background: #A4D091;
					}

					.line,
					.line-xu {
						height: 72rpx;
						margin: 10rpx 22rpx 10rpx 0;
					}

					.line {

						border-right: 2rpx solid #A4D091;

					}

					.line-xu {
						border-right: 2rpx dashed #A4D091;
					}
				}

				.right {
					margin-left: 10rpx;
					width: 100%;

					.top {
						display: flex;
						justify-content: space-between;
						font-size: 29rpx;

					}

					.bottom {
						font-size: 27rpx;
						color: #A5A7A7;
						margin-top: 10rpx
					}

					;

					.gray {
						color: #A5A7A7;
					}

					.green {
						color: #A4D091;
					}
				}
			}
		}

	}
</style>