<template>
	<view v-show="show">
		<view class="pop acea-row row-bottom">
			<view class="mask" @click="$emit('tap-mask')"></view>
			<slot name="wrapper">
				<view class="wrapper acea-row row-column">
					<!-- <view class="title">
						<slot name="title">
							<text>{{title}}</text>
						</slot>
						<text class="iconfont icon-x" @click="$emit('close')"></text>
					</view> -->
					<slot name="content">
						<view class="content acea-con">
							<slot>{{content}}</slot>
						</view>
					</slot>
					<!-- <view v-if="cancelText || confirmText" class="btns acea-row">
						<view v-if="cancelText" class="btn acea-con" @click="$emit('cancel')">{{cancelText}}</view>
						<view v-if="confirmText" class="btn confirm acea-con" @click="$emit('confirm')">{{confirmText}}
						</view>
					</view> -->
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'DetailBottom',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '温馨提示'
			},
			content: {
				type: String
			},
			cancelText: {
				type: String
			},
			confirmText: {
				type: String
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.pop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: $uni-bg-color-mask;
		}

		.wrapper {
			width: 100%;
			position: relative;
			background-color: $uni-text-color-inverse;
			border-radius: 24rpx 24rpx 0 0;
			overflow: hidden;

			.title {
				font-size: 36rpx;
				text-align: center;
				padding: 36rpx;
				position: relative;

				.icon-x {
					position: absolute;
					top: 36rpx;
					right: 36rpx;
					color: #C0C4CC;
				}
			}

			.content {
				// padding: 30rpx;
				padding-bottom: 30rpx;
				padding-bottom: calc(30rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
				padding-bottom: calc(30rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/				
				min-height: 50vw;
				// max-height: 75vh;
				box-sizing: border-box;
				overflow: scroll;
			}

			.btns {
				padding: 20rpx;
			}

			.btn {
				height: 76rpx;
				font-size: 32rpx;
				line-height: 76rpx;
				text-align: center;
				color: #333;
				letter-spacing: 20rpx;
				text-indent: 20rpx;
				background-color: #e8e8e8;
				margin-left: 20rpx;
				border-radius: 8rpx;

				&:first-of-type {
					margin-left: 0;
				}

				&.confirm {
					color: #fff;
					background: -webkit-linear-gradient(left, #ff7701, #fb4228);
				}
			}
		}
	}
</style>
