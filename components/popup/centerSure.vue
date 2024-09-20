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
						<text v-if="iconX" class="iconfont icon-x" @click="$emit('close')"></text>
					</view>
					<slot name="content">
						<view class="content">
							<slot>{{content}}</slot>
						</view>
					</slot>
					<view v-if="cancelText || confirmText" class="btns acea-row">
						<view v-if="cancelText" class="btn acea-con" @click="$emit('cancel')">{{cancelText}}</view>
						<view v-if="confirmText" :style="{color: sizeColor}" class="btn confirm acea-con"
							@click="$emit('confirm')">{{confirmText}}
						</view>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Popup',
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
			},
			iconX: {
				type: Boolean,
				default: true
			},
			sizeColor: {
				type: String,
				default: '',
			},
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
				padding-top: 20rpx;
			}

			.btns {
				border-top: 2rpx solid #e8e8e8;
			}

			.btn {
				height: 100rpx;
				font-size: 32rpx;
				line-height: 100rpx;
				text-align: center;
				color: #333;
				// font-weight: bold;
				border-left: 2rpx solid #e8e8e8;

				&:first-of-type {
					border-left: 0;
				}

				&.confirm {
					color: $color-theme;
				}
			}
		}
	}
</style>