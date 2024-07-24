<template>
	<view v-show="show">
		<view class="pop acea-row row-center-wrapper">
			<view class="mask" @click="$emit('tap-mask')"></view>
			<slot name="wrapper">
				<view class="wrapper">
					<view class="title">
						<slot name="title">
							<text>{{title}}</text>
						</slot>
						<text class="iconfont icon-x" @click="$emit('close')"></text>
					</view>
					<slot name="content">
						<view class="content">
							<slot>{{content}}</slot>
						</view>
					</slot>
					<!-- <view v-if="btnText" class="btn" @click="$emit('btn-tap')">{{btnText}}</view> -->
					<!-- <view v-if="cancelText || confirmText" class="btns acea-row">
						<view v-if="cancelText" class="btn acea-con" @click="$emit('cancel')">{{cancelText}}</view>
						<view v-if="confirmText" class="btn confirm acea-con" @click="$emit('confirm')">{{confirmText}}</view>
					</view> -->
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Remind',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String
			},
			btnText: {
				type: String
			},
			cancelText:{
				type: String
			},
			confirmText:{
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
			width: 640rpx;
			position: relative;
			background-color: $uni-text-color-inverse;
			border-radius: 24rpx;
			overflow: hidden;

			.title {
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #303133;
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
				padding: 30rpx;
			}

			.btns {
				border-top: 2rpx solid #e8e8e8;
			}

			.btn {
				height: 120rpx;
				font-size: 32rpx;
				line-height: 120rpx;
				text-align: center;
				color: #333;
				font-weight: bold;
				border-left: 2rpx solid #e8e8e8;

				&:first-of-type {
					border-left: 0;
				}

				&.confirm {
					color: $color-theme;
				}
			}

			.btn {
				height: 80rpx;
				margin: 30rpx;
				font-size: 34rpx;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
				background: #F51B45;
				border-radius: 40rpx;
			}
		}
	}
</style>
